import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);

      // Log the contact submission (in production, this would send an email)
      console.log("📧 New Contact Submission:", {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        company: contact.company,
        service: contact.service,
        message: contact.message,
        createdAt: contact.createdAt,
      });

      // In production, you would send an email here using nodemailer or similar
      // Example:
      // await sendEmail({
      //   to: 'saeta.producciones@gmail.com',
      //   subject: `Nuevo contacto: ${validatedData.service}`,
      //   html: generateEmailTemplate(contact)
      // });

      res.json({ 
        success: true, 
        message: "Mensaje recibido correctamente",
        contactId: contact.id 
      });
    } catch (error) {
      console.error("Error processing contact submission:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Error al procesar la solicitud" 
      });
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ 
        error: "Error al obtener las solicitudes de contacto" 
      });
    }
  });

  // Get single contact submission
  app.get("/api/contact/:id", async (req, res) => {
    try {
      const submission = await storage.getContactSubmission(req.params.id);
      if (!submission) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
      }
      res.json(submission);
    } catch (error) {
      console.error("Error fetching contact submission:", error);
      res.status(500).json({ 
        error: "Error al obtener la solicitud de contacto" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
