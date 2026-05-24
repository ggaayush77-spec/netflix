import { Link } from "wouter";
import { ArrowLeft, Camera } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSettings } from "@/hooks/useSettings";

const POLAROID_DEFAULTS = [
  { caption: "First date vibes", gradient: "from-rose-900 to-pink-800", rotate: -3 },
  { caption: "So in love", gradient: "from-pink-800 to-purple-900", rotate: 1 },
  { caption: "The best night", gradient: "from-purple-900 to-indigo-900", rotate: -1 },
  { caption: "Us, always", gradient: "from-indigo-900 to-blue-900", rotate: 2 },
  { caption: "Your smile", gradient: "from-blue-900 to-emerald-900", rotate: -2 },
  { caption: "Late night us", gradient: "from-emerald-900 to-teal-900", rotate: 3 },
  { caption: "Coffee moments", gradient: "from-red-900 to-orange-900", rotate: -1 },
  { caption: "Our little chaos", gradient: "from-orange-900 to-amber-900", rotate: 2 },
  { caption: "Worth it", gradient: "from-amber-900 to-yellow-900", rotate: -3 },
  { caption: "You + me", gradient: "from-rose-800 to-red-900", rotate: 1 },
  { caption: "Pure bliss", gradient: "from-fuchsia-900 to-pink-900", rotate: -2 },
  { caption: "6 months strong", gradient: "from-purple-800 to-rose-900", rotate: 3 },
];

const filmStrip = [
  { label: "Smiles", gradient: "from-red-900 to-rose-800" },
  { label: "Laughter", gradient: "from-purple-900 to-fuchsia-800" },
  { label: "Quiet Moments", gradient: "from-indigo-900 to-blue-800" },
  { label: "Adventures", gradient: "from-emerald-900 to-teal-800" },
  { label: "Stargazing", gradient: "from-blue-900 to-indigo-800" },
  { label: "Road Trips", gradient: "from-rose-900 to-pink-800" },
  { label: "Cozy Afternoons", gradient: "from-amber-900 to-orange-800" },
  { label: "Late Nights", gradient: "from-zinc-800 to-zinc-900" },
  { label: "Celebrations", gradient: "from-yellow-700 to-amber-600" },
  { label: "Just Us", gradient: "from-red-800 to-rose-900" },
];

const SectionTitle = ({ title }: { title: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold text-white mb-10 text-center"
    >
      {title}
    </motion.h2>
  );
};

export default function Gallery() {
  const { settings, openSettings } = useSettings();
  const userPhotos = settings.content.galleryPhotos.length > 0 ? settings.content.galleryPhotos : settings.galleryPhotos;
  const doubledFilmStrip = [...filmStrip, ...filmStrip];

  const hasPhotos = userPhotos.length > 0;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6 md:px-12 overflow-x-hidden">
      <div className="flex items-center justify-between mb-12">
        <Link href="/home" className="inline-flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <button
          onClick={openSettings}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-all text-sm cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          {hasPhotos ? "Edit Photos" : "Add Photos"}
        </button>
      </div>

      <div className="max-w-6xl mx-auto mb-32">
        <SectionTitle title="Our Polaroids" />

        {!hasPhotos && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <p className="text-zinc-500 text-sm">
              Add your photos via the gear icon on the home page or the button above
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {POLAROID_DEFAULTS.map((p, i) => {
            const photo = userPhotos[i];
            const caption = photo?.caption || p.caption;
            const photoUrl = photo?.url || "";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, zIndex: 50 }}
                className="bg-white p-3 pb-10 rounded shadow-xl relative group transition-shadow duration-300 hover:shadow-2xl hover:shadow-rose-900/20 cursor-pointer"
                style={{ transform: `rotate(${p.rotate}deg)` }}
              >
                <div className="w-full aspect-square overflow-hidden rounded-sm shadow-inner relative">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={caption}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        const parent = (e.target as HTMLImageElement).parentElement;
                        if (parent) parent.classList.add(`bg-gradient-to-br`, ...p.gradient.split(" "));
                      }}
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${p.gradient}`} />
                  )}
                </div>
                <p className="absolute bottom-3 left-0 w-full text-center font-mono text-xs text-zinc-600 px-2 truncate">
                  {caption}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="max-w-[100vw] -mx-6 md:-mx-12 overflow-hidden mb-20 relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
        <SectionTitle title="Moments in Time" />
        <div className="bg-zinc-950 py-8 border-y-8 border-zinc-900 relative">
          <div className="flex gap-4 w-max animate-marquee">
            {doubledFilmStrip.map((frame, i) => (
              <div key={i} className="flex-none w-[160px] h-[120px] bg-zinc-800 p-1 rounded-sm relative shadow-inner overflow-hidden border-x-4 border-black">
                {userPhotos[i % userPhotos.length] && userPhotos.length > 0 ? (
                  <img
                    src={userPhotos[i % userPhotos.length].url}
                    alt=""
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${frame.gradient} opacity-80 mix-blend-overlay`} />
                )}
                <div className="absolute inset-0 flex items-end justify-center pb-2 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-white text-[10px] uppercase tracking-wider font-bold">
                    {userPhotos[i % userPhotos.length]?.caption || frame.label}
                  </span>
                </div>
                <div className="absolute top-0 left-0 w-full flex justify-between px-1 py-0.5 opacity-30">
                  {[0,1,2,3].map((b) => <div key={b} className="w-1.5 h-2 bg-black rounded-[1px]" />)}
                </div>
                <div className="absolute bottom-0 left-0 w-full flex justify-between px-1 py-0.5 opacity-30">
                  {[0,1,2,3].map((b) => <div key={b} className="w-1.5 h-2 bg-black rounded-[1px]" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
