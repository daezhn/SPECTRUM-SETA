import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useMagneticHover, pulsingGlowVariants } from "@/hooks/use-animations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const services = [
  "Live & Streaming 4K",
  "Content & StoryStudio",
  "Brand & Digital Experience",
  "Social & Community",
  "Paquete Integral",
  "Consultoría",
];

export function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const sheetData = {
        data: {
          Nombre: data.name,
          Email: data.email,
          Empresa: data.company || "N/A",
          Telefono: data.phone || "N/A",
          Servicio: data.service,
          Mensaje: data.message,
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

      const response = await fetch("https://sheetdb.io/api/v1/y7kb31t5vwtv4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sheetData),
      });

      console.log("Respuesta de SheetDB:", response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error de SheetDB:", errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("Resultado exitoso:", result);
      return result;
    },
    onSuccess: () => {
      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error al enviar",
        description: "Por favor intenta de nuevo más tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contacto" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Inicia tu <span className="text-accent">Proyecto</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cuéntanos sobre tu visión y descubre cómo podemos transformarla en resultados medibles
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="border border-border/30 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:border-primary/30 transition-all duration-500">
              <div className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Tu nombre"
                              {...field}
                              data-testid="input-name"
                              className="h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="tu@email.com"
                              {...field}
                              data-testid="input-email"
                              className="h-12"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Empresa</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nombre de empresa"
                                {...field}
                                data-testid="input-company"
                                className="h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+52 614 123 4567"
                                {...field}
                                data-testid="input-phone"
                                className="h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Servicio de interés *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger data-testid="select-service" className="h-12">
                                <SelectValue placeholder="Selecciona un servicio" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Cuéntanos sobre tu proyecto..."
                              {...field}
                              data-testid="input-message"
                              className="min-h-32 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <motion.div 
                      className="relative"
                      variants={pulsingGlowVariants}
                      animate="animate"
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Shimmer effect for submit button */}
                      <motion.div
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 4,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                        style={{ pointerEvents: 'none' }}
                      />
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 gap-2 relative overflow-hidden"
                        disabled={contactMutation.isPending}
                        data-testid="button-submit-contact"
                      >
                        {contactMutation.isPending ? (
                          "Enviando..."
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Enviar mensaje
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Información de contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:saeta.producciones@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-email"
                    >
                      saeta.producciones@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">WhatsApp</h4>
                    <a
                      href="https://wa.me/526141318497"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors"
                      data-testid="link-whatsapp"
                    >
                      +52 (614) 131 8497
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Ubicación</h4>
                    <p className="text-muted-foreground">Chihuahua, México</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl backdrop-blur-sm hover:border-primary/40 transition-all duration-500">
              <div className="p-8">
                <h4 className="text-xl font-bold mb-4">Horario de atención</h4>
                <div className="space-y-2 text-muted-foreground">
                  <p>Lunes a Viernes: 9:00 AM - 7:00 PM</p>
                  <p>Sábado: 10:00 AM - 2:00 PM</p>
                  <p>Domingo: Cerrado</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
