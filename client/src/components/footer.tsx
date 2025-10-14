import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const footerLinks = {
    servicios: [
      { label: "Live & Streaming 4K", href: "#servicios" },
      { label: "Content Studio", href: "#servicios" },
      { label: "Brand & Digital", href: "#servicios" },
      { label: "Social & Community", href: "#servicios" },
    ],
    empresa: [
      { label: "Sobre SAETA", href: "#nosotros" },
      { label: "Portafolio", href: "#portafolio" },
      { label: "ISO 9001:2015", href: "#nosotros" },
      { label: "Contacto", href: "#contacto" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary">SAETA</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                    aria-label={social.label}
                    data-testid={`social-${social.label.toLowerCase()}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.services")}</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-accent transition-colors text-left"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-accent transition-colors text-left"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="mailto:saeta.producciones@gmail.com" className="hover:text-accent transition-colors" data-testid="footer-link-email">
                  saeta.producciones@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+526141318497" className="hover:text-accent transition-colors" data-testid="footer-link-phone">
                  +52 (614) 131 8497
                </a>
              </li>
              <li>Chihuahua, México</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} SAETA. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <button className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-privacy">
                Privacidad
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-terms">
                Términos
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
