import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useSettings } from "@/hooks/useSettings";

export default function Letter() {
  const [text, setText] = useState("");
  const { settings } = useSettings();
  const fullText = settings.content.letterText;

  useEffect(() => {
    let i = 0;
    setText("");
    const intervalId = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(intervalId);
      }
    }, 40); // typing speed
    
    return () => clearInterval(intervalId);
  }, [fullText]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-4xl z-10 self-start mb-8 md:absolute md:top-8 md:left-12">
        <Link href="/home">
          <span className="flex items-center text-gray-500 hover:text-gray-300 transition-colors cursor-pointer w-fit">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </span>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-10 w-full max-w-2xl bg-zinc-900/60 backdrop-blur-md border border-zinc-800 p-8 md:p-12 rounded-lg shadow-2xl shadow-black/50"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-3xl md:text-4xl font-serif italic text-red-200/80 mb-8 text-center"
        >
          {settings.content.letterTitle}
        </motion.h1>

        <div className="text-gray-300 text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-serif" style={{ minHeight: "300px" }}>
          {text}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-5 bg-red-500/50 ml-1 translate-y-1"
          />
        </div>
      </motion.div>
    </div>
  );
}
