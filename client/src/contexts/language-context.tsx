import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import esTranslations from "@/locales/es.json";
import enTranslations from "@/locales/en.json";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: typeof esTranslations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: esTranslations,
  en: enTranslations,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage for saved preference
    const savedLang = localStorage.getItem("language");
    return (savedLang === "en" || savedLang === "es") ? savedLang : "es";
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem("language", language);
    // Update document lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function with nested key support
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key itself if translation not found
      }
    }
    
    return typeof value === "string" ? value : key;
  };

  const value = {
    language,
    setLanguage,
    t,
    translations: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}