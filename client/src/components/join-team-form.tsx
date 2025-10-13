import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const joinTeamSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
});

type JoinTeamForm = z.infer<typeof joinTeamSchema>;

export function JoinTeamForm() {
  const { toast } = useToast();

  const form = useForm<JoinTeamForm>({
    resolver: zodResolver(joinTeamSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const joinTeamMutation = useMutation({
    mutationFn: async (data: JoinTeamForm) => {
      // Aquí conectaremos a Google Sheets después
      const sheetData = {
        data: {
          Nombre: data.name,
          Email: data.email,
          Fecha: new Date().toLocaleString('es-MX', { 
            timeZone: 'America/Mexico_City',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      };

      console.log("Enviando a SheetDB:", sheetData);

      // TODO: Conectar con SheetDB para reclutamiento
      const response = await fetch('https://sheetdb.io/api/v1/YOUR_RECRUITMENT_SHEET_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData)
      });

      if (!response.ok) {
        throw new Error('Error al enviar');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Gracias por tu interés!",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu información. Intenta de nuevo.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: JoinTeamForm) => {
    joinTeamMutation.mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-black border border-primary/30 rounded-2xl p-8 md:p-12"
    >
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
        UNIRSE A ATYPICAL
      </h3>
      <p className="text-white/70 mb-8">
        Siempre estamos buscando talento apasionado por la producción audiovisual
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            {...form.register("name")}
            placeholder="Nombre completo"
            className="flex-1 bg-white text-black placeholder:text-gray-500 border-0 h-12"
            data-testid="input-join-name"
          />
          <Input
            {...form.register("email")}
            type="email"
            placeholder="E-mail"
            className="flex-1 bg-white text-black placeholder:text-gray-500 border-0 h-12"
            data-testid="input-join-email"
          />
          <Button
            type="submit"
            disabled={joinTeamMutation.isPending}
            className="bg-primary hover:bg-primary/90 text-white px-8 h-12 whitespace-nowrap"
            data-testid="button-join-submit"
          >
            {joinTeamMutation.isPending ? (
              "Enviando..."
            ) : (
              <>
                Enviar <Send className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </div>
        {form.formState.errors.name && (
          <p className="text-primary text-sm">{form.formState.errors.name.message}</p>
        )}
        {form.formState.errors.email && (
          <p className="text-primary text-sm">{form.formState.errors.email.message}</p>
        )}
      </form>
    </motion.div>
  );
}
