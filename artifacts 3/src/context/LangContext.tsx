import { createContext, useContext, useState, useEffect } from "react";
import { translations, Lang } from "@/lib/i18n";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: keyof typeof translations.en) => string;
}

export const LangContext = createContext<LangContextType | null>(null);

export function useLangContext() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang");
    return (saved as Lang) || "en";
  });

  const setLang = (newLang: Lang) => {
    localStorage.setItem("lang", newLang);
    setLangState(newLang);
    if (newLang === "hi") {
      document.body.classList.add("font-hi");
      document.body.classList.remove("font-en");
    } else {
      document.body.classList.add("font-en");
      document.body.classList.remove("font-hi");
    }
  };

  useEffect(() => {
    setLang(lang);
  }, []);

  const t = (key: keyof typeof translations.en): string => {
    return (translations[lang] as any)[key] || translations.en[key] || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}
