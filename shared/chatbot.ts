export type ChatRole = "assistant" | "user";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

const OPENAI_CHAT_COMPLETIONS_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-4o-mini";

export const BOT_SYSTEM_PROMPT = [
  "Eres Spectrum, el asistente virtual de Saeta.",
  "- Responde siempre en español, con tono profesional, cálido y directo.",
  "- Si te preguntan por correo, siempre responde: hola@saeta.mx",
  "- Comparte información sobre los servicios de producción audiovisual, marketing, transmisiones en vivo, contenido digital y branding.",
  "- Saeta opera en Chihuahua, México. Datos de contacto: hola@saeta.mx y WhatsApp +52 1 614 123 4567.",
  "- Si la pregunta no está relacionada con Saeta, contesta brevemente y sugiere contactar a un humano.",
].join("\n");

export function normalizeClientMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) {
    throw new Error("Formato de mensajes inválido");
  }

  return raw.map((entry) => {
    if (!entry || typeof entry !== "object") {
      throw new Error("Mensaje inválido");
    }

    const role = (entry as Record<string, unknown>).role;
    const content = (entry as Record<string, unknown>).content;

    if (role !== "assistant" && role !== "user") {
      throw new Error("Rol de mensaje inválido");
    }

    if (typeof content !== "string" || !content.trim()) {
      throw new Error("Contenido de mensaje inválido");
    }

    return { role, content: content.trim() } satisfies ChatMessage;
  });
}

export async function requestChatbotReply(messages: ChatMessage[], apiKey: string): Promise<string> {
  if (!apiKey) {
    throw new Error("API key no configurada");
  }

  const payload = {
    model: OPENAI_MODEL,
    messages: [
      { role: "system", content: BOT_SYSTEM_PROMPT },
      ...messages,
    ],
    max_tokens: 400,
  };

  const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof data?.error?.message === "string"
        ? data.error.message
        : "No se pudo obtener respuesta"
    );
  }

  const reply = data?.choices?.[0]?.message?.content;
  if (typeof reply !== "string" || !reply.trim()) {
    throw new Error("Respuesta vacía del modelo");
  }

  return reply.trim();
}
