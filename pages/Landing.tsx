import { useLang } from "@/hooks/useLang";
import { LangToggle } from "@/components/LangToggle";
import { Link, useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useSettings } from "@/hooks/useSettings";

const mosaicCards = [
  { bg: "from-rose-900 to-pink-800", label: "First Meeting" },
  { bg: "from-red-900 to-rose-700", label: "First Date" },
  { bg: "from-purple-900 to-indigo-800", label: "Movie Night" },
  { bg: "from-pink-900 to-red-800", label: "First Trip" },
  { bg: "from-indigo-900 to-purple-800", label: "Candlelight" },
  { bg: "from-rose-800 to-pink-700", label: "Stargazing" },
  { bg: "from-red-800 to-rose-900", label: "100 Days" },
  { bg: "from-pink-800 to-purple-900", label: "6 Months" },
  { bg: "from-purple-800 to-rose-900", label: "Morning Walk" },
  { bg: "from-rose-700 to-red-900", label: "Late Night" },
  { bg: "from-indigo-800 to-pink-900", label: "Date Night" },
  { bg: "from-red-700 to-purple-900", label: "Our Story" },
  { bg: "from-pink-700 to-rose-800", label: "First Kiss" },
  { bg: "from-rose-900 to-indigo-800", label: "Anniversary" },
  { bg: "from-purple-700 to-red-800", label: "Forever" },
  { bg: "from-red-900 to-pink-700", label: "Just Us" },
  { bg: "from-pink-900 to-indigo-700", label: "Memories" },
  { bg: "from-rose-800 to-purple-700", label: "Together" },
  { bg: "from-indigo-700 to-rose-800", label: "Love" },
  { bg: "from-purple-900 to-red-700", label: "Magic" },
  { bg: "from-red-800 to-pink-900", label: "Dream" },
  { bg: "from-pink-800 to-rose-700", label: "Smile" },
  { bg: "from-rose-700 to-purple-800", label: "Warmth" },
  { bg: "from-indigo-800 to-red-900", label: "Home" },
  { bg: "from-purple-700 to-pink-800", label: "Bliss" },
  { bg: "from-red-700 to-rose-800", label: "Heart" },
  { bg: "from-pink-700 to-purple-700", label: "Trust" },
  { bg: "from-rose-900 to-red-700", label: "Always" },
];

export default function Landing() {
  const { t } = useLang();
  const { settings } = useSettings();
  const [email, setEmail] = useState("");
  const [, setLocation] = useLocation();

  function handleGetStarted(e: React.FormEvent) {
    e.preventDefault();
    setLocation("/signup");
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* Mosaic background */}
      <div className="fixed inset-0 z-0">
        <div className="grid grid-cols-7 gap-1 w-full h-full p-1 rotate-[-5deg] scale-110 origin-center opacity-80">
          {mosaicCards.map((card, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${card.bg} rounded aspect-[2/3] flex items-end p-2 select-none`}
            >
              <span className="text-white/70 text-[10px] font-semibold truncate">{card.label}</span>
            </div>
          ))}
        </div>
        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/95" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-6 md:px-12 lg:px-16 py-5">
        <Link href="/">
          <span
            className="text-3xl font-extrabold text-primary tracking-tight cursor-pointer select-none"
            data-testid="link-logo-home"
          >
            {settings.siteTitle}
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <LangToggle />
          <Link href="/signin">
            <button
              className="bg-primary hover:bg-red-700 text-white font-semibold px-4 py-1.5 rounded text-sm transition-colors cursor-pointer"
              data-testid="button-signin-nav"
            >
              {t("landing.signin")}
            </button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 min-h-[calc(100vh-80px)]">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-5 leading-tight drop-shadow-lg max-w-3xl">
          {t("landing.title")}
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-medium mb-2">
          {t("landing.subtitle")}
        </p>
        <p className="text-base text-white/70 mb-8">
          {t("landing.ready")}
        </p>

        <form onSubmit={handleGetStarted} className="flex flex-col sm:flex-row gap-2 w-full max-w-xl">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("auth.email")}
            className="flex-1 h-14 px-4 text-white bg-black/60 border border-white/40 rounded text-base placeholder:text-gray-400 focus:outline-none focus:border-white backdrop-blur-sm"
            data-testid="input-email-hero"
          />
          <button
            type="submit"
            className="h-14 px-6 bg-primary hover:bg-red-700 text-white font-bold text-lg rounded flex items-center gap-1 justify-center transition-colors cursor-pointer whitespace-nowrap"
            data-testid="button-get-started"
          >
            {t("landing.cta.start")}
            <ChevronRight className="w-5 h-5" />
          </button>
        </form>
      </main>

      {/* Divider */}
      <div className="relative z-10 border-t-8 border-zinc-800">

        {/* Feature 1 */}
        <div className="bg-black py-16 px-6 md:px-16 lg:px-24 border-b-8 border-zinc-800">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{t("landing.feature1.title")}</h2>
              <p className="text-xl text-gray-300">{t("landing.feature1.desc")}</p>
            </div>
            <div className="flex-1">
              <div className="aspect-video bg-gradient-to-br from-rose-900 to-pink-800 rounded-lg overflow-hidden flex items-center justify-center shadow-2xl">
                <div className="grid grid-cols-3 gap-2 p-4 w-full h-full">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`rounded bg-gradient-to-br ${mosaicCards[i].bg} opacity-80`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-black py-16 px-6 md:px-16 lg:px-24 border-b-8 border-zinc-800">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{t("landing.feature2.title")}</h2>
              <p className="text-xl text-gray-300">{t("landing.feature2.desc")}</p>
            </div>
            <div className="flex-1">
              <div className="aspect-video bg-gradient-to-br from-purple-900 to-rose-800 rounded-lg overflow-hidden flex items-center justify-center shadow-2xl">
                <div className="flex gap-2 p-4 w-full h-full items-center">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`flex-1 h-full rounded bg-gradient-to-br ${mosaicCards[i + 6].bg} opacity-80`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-black py-16 px-6 md:px-16 lg:px-24 border-b-8 border-zinc-800">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{t("landing.feature3.title")}</h2>
              <p className="text-xl text-gray-300">{t("landing.feature3.desc")}</p>
            </div>
            <div className="flex-1">
              <div className="aspect-video bg-gradient-to-br from-indigo-900 to-red-800 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center">
                <div className="grid grid-cols-2 gap-2 p-4 w-full h-full">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`rounded bg-gradient-to-br ${mosaicCards[i + 10].bg} opacity-80`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-zinc-500 py-10 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm mb-6">{t("footer.questions")}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-8">
            <Link href="/signin"><span className="hover:underline cursor-pointer">{t("footer.faq")}</span></Link>
            <Link href="/signin"><span className="hover:underline cursor-pointer">{t("footer.privacy")}</span></Link>
            <Link href="/signin"><span className="hover:underline cursor-pointer">{t("footer.terms")}</span></Link>
            <Link href="/signin"><span className="hover:underline cursor-pointer">{t("footer.contact")}</span></Link>
          </div>
          <div className="mb-4">
            <LangToggle />
          </div>
          <p className="text-sm">{settings.siteTitle} &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
