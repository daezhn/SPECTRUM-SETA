import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

const BOT_SYSTEM_PROMPT = `Eres Spectrum, el asistente virtual de Saeta.
- Responde siempre en español, con tono profesional, cálido y directo.
- Comparte información sobre los servicios de producción audiovisual, marketing, transmisiones en vivo, contenido digital y branding.
- Saeta opera en Chihuahua, México. Datos de contacto: hola@saeta.mx y WhatsApp +52 1 614 123 4567.
- Si la pregunta no está relacionada con Saeta, contesta brevemente y sugiere contactar a un humano.`;

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "¡Hola! Soy Spectrum, ¿cómo puedo ayudarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const sendMessage = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: BOT_SYSTEM_PROMPT },
            ...messages,
            userMessage,
          ].map((msg) => ({ role: msg.role, content: msg.content })),
        }),
      });

      if (!response.ok) {
        throw new Error("Respuesta no válida del servidor");
      }

      const data: { reply?: string; error?: string } = await response.json();
      const assistantReply = data.reply?.trim();
      if (assistantReply) {
        setMessages((prev) => [...prev, { role: "assistant", content: assistantReply }]);
      } else {
        throw new Error(data.error ?? "No se recibió respuesta");
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? `Ups, algo salió mal: ${error.message}. ¿Intentamos de nuevo?`
              : "Ups, algo salió mal. ¿Intentamos de nuevo?",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      <div
        ref={containerRef}
        className={cn(
          "fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <header className="flex items-center justify-between bg-primary/10 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-primary">Spectrum Bot</p>
            <p className="text-xs text-muted-foreground">Respuestas en segundos</p>
          </div>
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" aria-hidden />
        </header>

        <div className="flex max-h-80 flex-col space-y-3 overflow-y-auto px-4 py-3">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={cn(
                "max-w-[90%] rounded-2xl px-3 py-2 text-sm",
                message.role === "assistant"
                  ? "self-start bg-muted text-left"
                  : "self-end bg-primary text-primary-foreground text-right"
              )}
            >
              {message.content}
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>

        <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-border bg-background/80 px-3 py-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="flex-1 rounded-full border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            placeholder={isSending ? "Spectrum está pensando…" : "Escribe tu mensaje"}
            disabled={isSending}
            aria-label="Mensaje para Spectrum"
          />
          <button
            type="submit"
            disabled={isSending || !input.trim()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
