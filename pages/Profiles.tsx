import { useLang } from "@/hooks/useLang";
import { useSettings } from "@/hooks/useSettings";
import { LangToggle } from "@/components/LangToggle";
import { Link } from "wouter";

const profileColors = [
  { from: "from-rose-600", to: "to-pink-700" },
  { from: "from-purple-600", to: "to-indigo-700" },
];

export default function Profiles() {
  const { t } = useLang();
  const { settings } = useSettings();
  const youName = settings.herName || "YOU";
  const meName = settings.myName || "ME";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="px-6 md:px-12 py-5 flex justify-end">
        <LangToggle />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        <h1
          className="text-4xl md:text-6xl font-semibold mb-14 tracking-tight text-white"
          data-testid="text-profiles-title"
        >
          {t("profiles.title")}
        </h1>

        <div className="flex gap-8 md:gap-16">
          <Link href="/home">
            <div
              className="group flex flex-col items-center cursor-pointer"
              data-testid="link-profile-tum"
            >
              <div
                className={`w-32 h-32 md:w-40 md:h-40 rounded bg-gradient-to-br ${profileColors[0].from} ${profileColors[0].to} flex items-center justify-center text-5xl font-bold text-white border-4 border-transparent group-hover:border-white transition-all duration-200 group-hover:scale-105 overflow-hidden`}
              >
                {settings.herProfileImageUrl ? (
                  <img src={settings.herProfileImageUrl} alt={youName} className="h-full w-full object-cover" />
                ) : (
                  youName[0].toUpperCase()
                )}
              </div>
              <span className="mt-4 text-lg text-zinc-400 group-hover:text-white font-medium transition-colors">
                {youName || t("profiles.tum")}
              </span>
            </div>
          </Link>

          <Link href="/home">
            <div
              className="group flex flex-col items-center cursor-pointer"
              data-testid="link-profile-main"
            >
              <div
                className={`w-32 h-32 md:w-40 md:h-40 rounded bg-gradient-to-br ${profileColors[1].from} ${profileColors[1].to} flex items-center justify-center text-5xl font-bold text-white border-4 border-transparent group-hover:border-white transition-all duration-200 group-hover:scale-105 overflow-hidden`}
              >
                {settings.myProfileImageUrl ? (
                  <img src={settings.myProfileImageUrl} alt={meName} className="h-full w-full object-cover" />
                ) : (
                  meName[0].toUpperCase()
                )}
              </div>
              <span className="mt-4 text-lg text-zinc-400 group-hover:text-white font-medium transition-colors">
                {meName || t("profiles.main")}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
