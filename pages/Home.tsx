import { useLang } from "@/hooks/useLang";
import { LangToggle } from "@/components/LangToggle";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Play, Info, Heart, LogOut, HelpCircle, SkipBack, SkipForward, Pause, Music, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { clearAuth } from "@/lib/auth";
import { motion, useInView } from "framer-motion";
import { MemoryModal } from "@/components/MemoryModal";
import { PlaylistPlayer } from "@/components/PlaylistPlayer";
import { useSettings } from "@/hooks/useSettings";

const AnimatedRow = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="mb-12 px-6 md:px-12" ref={ref}>
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className="text-xl md:text-2xl font-bold mb-4 text-white"
      >
        {title}
      </motion.h3>
      <div className="flex gap-4 overflow-x-auto pb-6 snap-x no-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default function Home() {
  const { t } = useLang();
  const { settings, openSettings } = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [, setLocation] = useLocation();

  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0 });
  
  const [modalState, setModalState] = useState<{isOpen: boolean, card: any}>({
    isOpen: false,
    card: null
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const startDate = new Date(settings.startDate + "T00:00:00").getTime();
    
    const updateCounter = () => {
      const now = new Date().getTime();
      const diff = now - startDate;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeTogether({ days, hours, minutes });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 60000);
    return () => clearInterval(interval);
  }, [settings.startDate]);

  function handleLogout() {
    clearAuth();
    setLocation("/");
  }

  const { content } = settings;
  const galleryPhotos = content.galleryPhotos.length > 0 ? content.galleryPhotos : settings.galleryPhotos;

  return (
    <div className="min-h-screen bg-black text-white pb-0">
      {/* Nav */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 flex items-center justify-between ${
          scrolled ? "bg-black" : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="flex items-center gap-8">
          <Link href="/home">
            <span className="text-2xl font-extrabold text-red-600 tracking-tight cursor-pointer hover:text-red-500 transition-colors">
              {settings.siteTitle}
            </span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/home">
              <span className="text-white font-semibold cursor-pointer hover:text-gray-300 transition-colors">
                {t("nav.home" as any) || "Home"}
              </span>
            </Link>
            <a href="#memories" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              {t("nav.memories" as any) || "Memories"}
            </a>
            <Link href="/episodes">
              <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                {t("nav.episodes" as any) || "Episodes"}
              </span>
            </Link>
            <Link href="/timeline">
              <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                {t("nav.timeline" as any) || "Timeline"}
              </span>
            </Link>
            <a href="#future" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              {t("nav.futurePlans" as any) || "Future Plans"}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LangToggle />
          <button
            onClick={openSettings}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Personalize"
          >
            <Settings className="w-5 h-5" />
          </button>
          <Link href="/profiles">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-rose-600 to-pink-700 cursor-pointer border-2 border-transparent hover:border-white transition-all overflow-hidden">
              {settings.myProfileImageUrl ? (
                <img src={settings.myProfileImageUrl} alt={settings.myName} className="h-full w-full object-cover" />
              ) : null}
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-[85vh] w-full flex items-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-rose-950 via-black to-purple-950">
          {content.heroImageUrl ? (
            <img src={content.heroImageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 px-6 md:px-12 max-w-2xl pt-20"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">
            {content.heroTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-lg">
            {content.heroDesc}
          </p>
          <div className="flex gap-3">
            <Link href="/episodes">
              <Button className="bg-white text-black hover:bg-white/90 font-bold px-7 py-6 text-base rounded cursor-pointer">
                <Play className="mr-2 h-5 w-5 fill-current" />
                {t("home.hero.play")}
              </Button>
            </Link>
            <Button
              variant="secondary"
              className="bg-zinc-600/60 text-white hover:bg-zinc-600/80 font-bold px-7 py-6 text-base rounded backdrop-blur-md border-0"
              onClick={() => document.getElementById("memories")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Info className="mr-2 h-5 w-5" />
              {t("home.hero.more")}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Content rows */}
      <div className="-mt-28 relative z-20 space-y-4 pt-4 pb-20">
        <div id="memories">
          <AnimatedRow title={t("home.trending" as any) || "Trending Now"}>
            {content.memories.map((card, i) => (
              <div
                key={i}
                onClick={() => setModalState({ isOpen: true, card })}
                className="snap-start flex-none w-[280px] md:w-[320px] aspect-video relative group rounded overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-30 shadow-lg"
              >
                <div className={`w-full h-full bg-gradient-to-br ${card.gradient} flex items-center justify-center relative overflow-hidden`}>
                  {card.imageUrl ? (
                    <img src={card.imageUrl} alt={card.title} className="absolute inset-0 h-full w-full object-cover" />
                  ) : null}
                  <div className="absolute inset-0 bg-black/20" />
                  <Heart className="w-12 h-12 text-white/20" />
                  <span className="absolute inset-0 flex items-center justify-center text-white/5 font-extrabold text-5xl rotate-[-10deg] whitespace-nowrap overflow-hidden">
                    {card.title}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h4 className="font-bold text-white text-lg">{card.title}</h4>
                  <p className="text-gray-300 text-sm mt-1 mb-3">{card.desc}</p>
                  <div className="flex gap-2">
                    <button className="h-8 w-8 rounded-full bg-white text-black hover:bg-white/80 flex items-center justify-center transition-colors">
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    </button>
                    <button className="h-8 w-8 rounded-full border border-white/50 text-white hover:border-white hover:bg-white/20 flex items-center justify-center transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </AnimatedRow>
        </div>

        <div>
          <AnimatedRow title={t("home.continueWatching" as any) || "Continue Watching"}>
            {content.continueWatching.map((item, i) => (
              <div key={i} className="snap-start flex-none w-[260px] md:w-[300px] flex flex-col gap-2 group cursor-pointer">
                <div className="aspect-video relative rounded overflow-hidden shadow-lg bg-zinc-800">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-zinc-600 font-bold text-xl">{item.title.split(' ')[0]}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100 duration-300">
                      <Play className="w-6 h-6 text-white ml-1 fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-700">
                    <div className="h-full bg-red-600" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
                <div className="px-1">
                  <h4 className="font-semibold text-white group-hover:text-red-400 transition-colors">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </AnimatedRow>
        </div>

        <div id="episodes-preview">
          <AnimatedRow title={t("home.episodes" as any) || "Our Episodes"}>
            {content.episodes.slice(0, 3).map((ep, i) => (
              <div key={i} className="snap-start flex-none w-[320px] md:w-[380px] group cursor-pointer">
                <div className={`aspect-video relative rounded overflow-hidden shadow-lg bg-gradient-to-br ${ep.gradient} mb-3`}>
                  {ep.imageUrl ? (
                    <img src={ep.imageUrl} alt={ep.title} className="absolute inset-0 h-full w-full object-cover" />
                  ) : null}
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
                    EP {ep.id}
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-6 h-6 text-white ml-1 fill-white" />
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-white text-lg group-hover:text-red-400 transition-colors">{ep.title}</h4>
                <p className="text-gray-400 text-sm">{ep.desc}</p>
              </div>
            ))}
            <div className="snap-start flex-none w-[200px] flex items-center justify-center cursor-pointer group">
              <Link href="/episodes">
                <div className="flex flex-col items-center gap-3 text-gray-400 group-hover:text-white transition-colors">
                  <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Play className="w-8 h-8 ml-1 fill-current" />
                  </div>
                  <span className="font-semibold">View All Episodes</span>
                </div>
              </Link>
            </div>
          </AnimatedRow>
        </div>

        <div id="future">
          <AnimatedRow title={t("home.comingSoon" as any) || "Coming Soon — Future Plans"}>
            {content.futurePlans.map((plan, i) => (
              <div key={i} className="snap-start flex-none w-[240px] md:w-[280px] aspect-[3/4] relative group rounded overflow-hidden cursor-pointer shadow-lg">
                <div className={`w-full h-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center p-6 text-center relative overflow-hidden`}>
                  {plan.imageUrl ? (
                    <img src={plan.imageUrl} alt={plan.title} className="absolute inset-0 h-full w-full object-cover" />
                  ) : null}
                  <div className="absolute inset-0 bg-black/20" />
                  <h4 className="relative font-extrabold text-2xl text-white/50 group-hover:text-white/80 transition-colors drop-shadow-md">
                    {plan.title}
                  </h4>
                </div>
                
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
                  <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-2 py-1 rounded shadow-md uppercase tracking-wider">
                    Coming Soon
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-center">
                  <p className="text-white font-medium">{plan.desc}</p>
                </div>
              </div>
            ))}
          </AnimatedRow>
        </div>

        <div>
          <AnimatedRow title="Top Picks For You">
            <p className="text-sm text-gray-400 mb-4 -mt-2">Curated just for us</p>
            <div className="flex gap-4 overflow-x-auto pb-6 snap-x no-scrollbar">
              {content.topPicks.map((pick, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="snap-start flex-none w-[280px] aspect-[4/5] relative rounded-xl border border-zinc-800 bg-zinc-900 p-6 flex flex-col overflow-hidden group cursor-pointer"
                >
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    PICK
                  </div>
                  <Heart className="absolute top-4 right-4 w-5 h-5 text-zinc-600 group-hover:text-white/20 transition-colors z-10" />
                  {pick.imageUrl ? (
                    <img src={pick.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 transition-opacity duration-300 group-hover:opacity-70" />
                  ) : null}
                  <div className="flex-1 flex items-center justify-center relative z-10">
                    <p className="text-gray-300 italic text-center font-serif text-lg leading-relaxed group-hover:opacity-0 transition-opacity duration-300">
                      "{pick.reason}"
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 text-center z-20">
                    <p className="text-white font-bold text-xl drop-shadow-md">
                      {pick.reveal}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedRow>
        </div>

        <div>
          <AnimatedRow title="Our Gallery">
            <div className="flex items-center gap-6">
              <div className="flex gap-3">
                {[...Array(6)].map((_, i) => {
                  const photo = (galleryPhotos ?? [])[i];
                  const rotations = [-2, 2, -1, 3, -3, 1];
                  return (
                    <Link href="/gallery" key={i}>
                      <div
                        className="w-[120px] aspect-square bg-white p-2 rounded shadow-md hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-pointer overflow-hidden"
                        style={{ transform: `rotate(${rotations[i]}deg)` }}
                      >
                        {photo?.url ? (
                          <img
                            src={photo.url}
                            alt={photo.caption || ""}
                            className="w-full h-full object-cover rounded-sm"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-sm" />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link href="/gallery">
                <Button className="bg-white text-black hover:bg-zinc-200 font-bold ml-4 flex-shrink-0">
                  View Gallery
                </Button>
              </Link>
            </div>
          </AnimatedRow>
        </div>

        <PlaylistPlayer />
      </div>

      {/* Secret Love Letter trigger */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <Link href="/letter">
          <button className="w-8 h-8 rounded-full bg-zinc-900/40 text-zinc-500 hover:text-rose-400 hover:bg-zinc-800/80 border border-zinc-800 hover:border-rose-900/50 flex items-center justify-center transition-all cursor-pointer">
            <HelpCircle className="w-4 h-4" />
          </button>
        </Link>
        <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          A secret waits...
        </div>
      </div>

      {/* Comprehensive Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-10 px-6 md:px-12 text-center md:text-left relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
          <div className="flex flex-col items-center md:items-start gap-4 max-w-md">
            <span className="text-3xl font-extrabold text-red-600 tracking-tight select-none">
              {settings.siteTitle}
            </span>
            <p className="text-gray-400 italic text-sm md:text-base leading-relaxed">
              "{t("footer.quote" as any) || "Every moment with you is a scene worth replaying."}"
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span className="text-sm font-semibold text-gray-300 uppercase tracking-widest">
                {t("footer.tagline" as any) || "Made with love"}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center bg-black/40 border border-zinc-800 p-6 rounded-xl shadow-inner min-w-[280px]">
            <span className="text-sm text-gray-400 mb-3 uppercase tracking-wider font-semibold">
              {t("footer.together" as any) || "Together for"}
            </span>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-white bg-zinc-900 px-3 py-2 rounded-md border border-zinc-800 shadow-md min-w-[60px] text-center">
                  {timeTogether.days}
                </span>
                <span className="text-xs text-gray-500 mt-2 font-medium">
                  {t("footer.days" as any) || "days"}
                </span>
              </div>
              <div className="text-2xl font-bold text-zinc-600 pt-2">:</div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-white bg-zinc-900 px-3 py-2 rounded-md border border-zinc-800 shadow-md min-w-[60px] text-center">
                  {timeTogether.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-xs text-gray-500 mt-2 font-medium">
                  {t("footer.hours" as any) || "hours"}
                </span>
              </div>
              <div className="text-2xl font-bold text-zinc-600 pt-2">:</div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-white bg-zinc-900 px-3 py-2 rounded-md border border-zinc-800 shadow-md min-w-[60px] text-center">
                  {timeTogether.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-xs text-gray-500 mt-2 font-medium">
                  {t("footer.minutes" as any) || "minutes"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <LangToggle />
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} {settings.siteTitle}. All rights reserved.
          </p>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {modalState.card && (
        <MemoryModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ ...modalState, isOpen: false })}
          cardKey={modalState.card.key}
          title={modalState.card.title}
          desc={modalState.card.desc}
          gradient={modalState.card.gradient}
          quote={modalState.card.quote || ""}
          date={modalState.card.date || ""}
          imageUrl={modalState.card.imageUrl || ""}
        />
      )}
    </div>
  );
}
