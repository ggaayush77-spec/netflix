import { useLang } from "@/hooks/useLang";
import { Globe } from "lucide-react";

export function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "hi" : "en")}
      data-testid="button-lang-toggle"
      className="flex items-center gap-1.5 border border-white/60 text-white text-sm font-medium px-3 py-1.5 rounded hover:border-white transition-colors bg-transparent cursor-pointer"
    >
      <Globe className="w-4 h-4" />
      <span>{lang === "en" ? "English" : "हिन्दी"}</span>
      <svg className="w-3 h-3 opacity-70" viewBox="0 0 10 6" fill="currentColor">
        <path d="M0 0l5 6 5-6z" />
      </svg>
    </button>
  );
}
