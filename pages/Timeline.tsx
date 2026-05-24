import { useLang } from "@/hooks/useLang";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSettings } from "@/hooks/useSettings";

const TimelineEntry = ({ item, index, align }: { item: any, index: number, align: "left"|"right" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className={`flex w-full items-center justify-between mb-16 ${align === "right" ? "md:flex-row-reverse" : ""}`} ref={ref}>
      <div className="order-1 w-5/12 hidden md:block"></div>
      
      <div className="z-20 flex items-center order-1 bg-red-600 shadow-xl w-6 h-6 rounded-full shadow-red-500/50 flex-shrink-0">
        <motion.div 
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-3 h-3 mx-auto bg-white rounded-full" 
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, x: align === "left" ? -50 : 50, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: align === "left" ? -50 : 50, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="order-1 w-full md:w-5/12 px-6 md:px-0 mt-4 md:mt-0"
      >
        <div className={`bg-zinc-900/80 p-6 rounded-xl border border-zinc-800 backdrop-blur-sm ${align === "left" ? "md:text-right" : "text-left"}`}>
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="mb-4 aspect-video w-full rounded-lg object-cover"
            />
          ) : null}
          <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-red-200 bg-red-950/50 rounded-full border border-red-900/50">
            {item.date}
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default function Timeline() {
  const { lang } = useLang();
  const { settings } = useSettings();
  const entries = settings.content.timeline;

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-rose-900 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-red-900 blur-[120px]" />
      </div>

      <div className="relative z-10 px-6 md:px-12 py-8 pt-10">
        <Link href="/home">
          <span className="flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer mb-12 w-fit">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </span>
        </Link>
        
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-600 mb-4"
          >
            {lang === 'hi' ? "हमारी टाइमलाइन" : "Our Timeline"}
          </motion.h1>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-900 via-rose-600 to-transparent rounded-full opacity-30 shadow-[0_0_15px_rgba(225,29,72,0.5)]"></div>
          
          <div className="relative z-10 pl-12 md:pl-0">
            {entries.map((item, i) => (
              <TimelineEntry key={i} item={item} index={i} align={i % 2 === 0 ? "left" : "right"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
