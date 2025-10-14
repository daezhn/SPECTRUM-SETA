import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, Users } from "lucide-react";

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
          nombre: data.name,
          email: data.email,
        }
      };

      console.log("Enviando a SheetDB:", sheetData);

      const response = await fetch('https://sheetdb.io/api/v1/wd03jo57ucmxc', {
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-black border border-primary/30 rounded-2xl p-8 md:p-12 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl"
      />

      <div className="relative z-10">
        {/* Header with animated icons */}
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Users className="w-8 h-8 text-primary" />
          </motion.div>
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            UNIRSE A <span className="text-primary">SAETA</span>
          </h3>
        </div>
        
        <p className="text-white/70 mb-8">
          Siempre estamos buscando talento apasionado por la producción audiovisual
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              className="flex-1"
            >
              <Input
                {...form.register("name")}
                placeholder="Nombre completo"
                className="w-full bg-white text-black placeholder:text-gray-500 border-0 h-12 transition-all duration-300"
                data-testid="input-join-name"
              />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              className="flex-1"
            >
              <Input
                {...form.register("email")}
                type="email"
                placeholder="E-mail"
                className="w-full bg-white text-black placeholder:text-gray-500 border-0 h-12 transition-all duration-300"
                data-testid="input-join-email"
              />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                disabled={joinTeamMutation.isPending}
                className="bg-primary hover:bg-primary/90 text-white px-8 h-12 whitespace-nowrap"
                data-testid="button-join-submit"
              >
                {joinTeamMutation.isPending ? "Enviando..." : "Enviar"}
              </Button>
            </motion.div>
          </div>
          {form.formState.errors.name && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary text-sm"
            >
              {form.formState.errors.name.message}
            </motion.p>
          )}
          {form.formState.errors.email && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary text-sm"
            >
              {form.formState.errors.email.message}
            </motion.p>
          )}
        </form>
      </div>
    </motion.div>
  );
}
