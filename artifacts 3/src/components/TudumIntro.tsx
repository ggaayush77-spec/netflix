import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "@/hooks/useSettings";

export function TudumIntro() {
  const { settings } = useSettings();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const introShown = sessionStorage.getItem("intro_shown");
    if (!introShown) {
      setShow(true);
      sessionStorage.setItem("intro_shown", "true");
      const timer = setTimeout(() => setShow(false), 2500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 1.5, 
              ease: [0.22, 1, 0.36, 1], // easeOutQuint like
            }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-extrabold tracking-tighter text-red-600 mb-2 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]"
              style={{ fontFamily: "Impact, sans-serif" }}
            >
              N
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-2xl md:text-4xl font-bold tracking-[0.3em] text-white/90 uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            >
              {settings.siteTitle}
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
