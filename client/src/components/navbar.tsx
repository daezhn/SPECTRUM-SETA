import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useTranslation } from "@/hooks/use-translation";
import { motion, AnimatePresence } from "framer-motion";
import saetaLogo from "@assets/Logo Saeta_HZL_Negativo_1760397693781.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
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

  const navLinks = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.services"), href: "#servicios" },
    { label: t("nav.portfolio"), href: "#portafolio" },
    { label: t("nav.team"), href: "#equipo" },
    { label: t("nav.about"), href: "#nosotros" },
    { label: t("nav.contact"), href: "#contacto" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-20">
            {/* Logo */}
            <Link href="/" data-testid="link-home">
              <motion.button
                onClick={() => scrollToSection("hero")}
                className="hover-elevate active-elevate-2 rounded-md p-2 relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={saetaLogo} 
                  alt="SAETA Producciones" 
                  className="h-10 md:h-12 w-auto"
                />
              </motion.button>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  onClick={() => scrollToSection(link.href.replace("#", ""))}
                  data-testid={`link-${link.label.toLowerCase()}`}
                  className="text-sm font-medium"
                >
                  {link.label}
                </Button>
              ))}
            </div>

            {/* Language Switch, Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setLanguage(language === "es" ? "en" : "es")}
                className="relative px-3 py-1.5 rounded-full bg-accent/10 backdrop-blur-md border border-accent/30 hover:bg-accent/20 hover:border-accent/40 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="button-language-toggle"
              >
                <Globe className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">
                  {language === "es" ? "EN" : "ES"}
                </span>
              </motion.button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                data-testid="button-theme-toggle"
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-lg pt-20"
          >
            <nav className="container mx-auto px-4 py-8">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => scrollToSection(link.href.replace("#", ""))}
                      className="w-full justify-start text-lg font-medium h-14"
                      data-testid={`mobile-link-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
