import OpenAI, { APIError } from "openai";

export type ChatRole = "assistant" | "user";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

const OPENAI_MODEL = "gpt-4o-mini";
const OPENAI_TIMEOUT_MS = 30_000;

export const BOT_SYSTEM_PROMPT = [
  "Eres Spectrum, el asistente virtual de Saeta.",
  "- Responde siempre en espanol, con tono profesional, calido y directo.",
  "- Si te preguntan por correo, siempre responde: hola@saeta.mx",
  "- Comparte informacion sobre los servicios de produccion audiovisual, marketing, transmisiones en vivo, contenido digital y branding.",
  "- Saeta opera en Chihuahua, Mexico. Datos de contacto: contacto@saetapro.com y WhatsApp +52 1 614 123 4567.",
  "- Si la pregunta no esta relacionada con Saeta, contesta brevemente y sugiere contactar a un humano.",
].join("\n");

export function normalizeClientMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) {
    throw new Error("Formato de mensajes invalido");
  }

  return raw.map((entry) => {
    if (!entry || typeof entry !== "object") {
      throw new Error("Mensaje invalido");
    }

    const record = entry as Record<string, unknown>;
    const role = record.role;
    const content = record.content;

    if (role !== "assistant" && role !== "user") {
      throw new Error("Rol de mensaje invalido");
    }

    if (typeof content !== "string" || !content.trim()) {
      throw new Error("Contenido de mensaje invalido");
    }

    return { role, content: content.trim() };
  });
}

let cachedClient: OpenAI | undefined;
let cachedApiKey: string | undefined;

function getOpenAIClient(apiKey: string): OpenAI {
  if (!apiKey) {
    throw new Error("API key no configurada");
  }

  if (cachedClient && cachedApiKey === apiKey) {
    return cachedClient;
  }

  cachedClient = new OpenAI({
    apiKey,
    timeout: OPENAI_TIMEOUT_MS,
  });
  cachedApiKey = apiKey;

  return cachedClient;
}

export async function requestChatbotReply(
  messages: ChatMessage[],
  apiKey: string
): Promise<string> {
  const client = getOpenAIClient(apiKey);

  try {
    const completion = await client.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [{ role: "system", content: BOT_SYSTEM_PROMPT }, ...messages],
      max_tokens: 400,
    });

    const reply = completion.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      throw new Error("Respuesta vacia del modelo");
    }

    return reply.trim();
  } catch (error) {
    if (error instanceof APIError && typeof error.message === "string") {
      throw new Error(error.message);
    }

    if (error instanceof Error && typeof error.message === "string") {
      throw new Error(error.message);
    }

    throw new Error("No se pudo obtener respuesta");
  }
}
