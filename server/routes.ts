import type { Express, RequestHandler } from "express";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { normalizeClientMessages, requestChatbotReply } from "@shared/chatbot";

const ROUTE_PREFIXES = ["/api", ""];

function buildPaths(path: string, handler: RequestHandler): Array<[string, RequestHandler]> {
  return ROUTE_PREFIXES.map((prefix) => {
    const normalized = `${prefix}${path}`.replace(/\/{2,}/g, "/");
    return [normalized || "/", handler];
  });
}

export async function registerRoutes(app: Express): Promise<void> {
  const chatbotHandler: RequestHandler = async (req, res) => {
    try {
      const normalizedMessages = normalizeClientMessages(req.body?.messages);

      console.log(
        "[chatbot] request received",
        JSON.stringify({
          messageCount: normalizedMessages.length,
          lastRole: normalizedMessages.at(-1)?.role,
          path: req.path,
        })
      );

      const reply = await requestChatbotReply(
        normalizedMessages,
        process.env.OPENAI_API_KEY ?? ""
      );

      console.log(
        "[chatbot] reply generated",
        JSON.stringify({ characters: reply.length, path: req.path })
      );

      res.status(200).json({ reply });
    } catch (error) {
      console.error("Error generating chatbot reply:", error);

      const message = error instanceof Error ? error.message : "Error desconocido";
      const status = message.includes("API key") ? 401 : 400;

      res.status(status).json({ error: message });
    }
  };

  buildPaths("/chatbot", chatbotHandler).forEach(([path, handler]) => {
    app.post(path, handler);
  });

  const contactSubmitHandler: RequestHandler = async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);

      console.log("[contact] submission created", {
        id: contact.id,
        email: contact.email,
        service: contact.service,
        path: req.path,
      });

      res.json({
        success: true,
        message: "Mensaje recibido correctamente",
        contactId: contact.id,
      });
    } catch (error) {
      console.error("Error processing contact submission:", error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Error al procesar la solicitud",
      });
    }
  };

  buildPaths("/contact", contactSubmitHandler).forEach(([path, handler]) => {
    app.post(path, handler);
  });

  const contactListHandler: RequestHandler = async (_req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({
        error: "Error al obtener las solicitudes de contacto",
      });
    }
  };

  buildPaths("/contact", contactListHandler).forEach(([path, handler]) => {
    app.get(path, handler);
  });

  const contactSingleHandler: RequestHandler = async (req, res) => {
    try {
      const submission = await storage.getContactSubmission(req.params.id);
      if (!submission) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
      }
      res.json(submission);
    } catch (error) {
      console.error("Error fetching contact submission:", error);
      res.status(500).json({
        error: "Error al obtener la solicitud de contacto",
      });
    }
  };

  buildPaths("/contact/:id", contactSingleHandler).forEach(([path, handler]) => {
    app.get(path, handler);
  });
}
