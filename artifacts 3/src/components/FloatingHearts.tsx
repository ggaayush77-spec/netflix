import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const COLORS = ["text-red-500", "text-rose-400", "text-pink-500", "text-red-400"];
const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    let heartId = 0;
    
    const handleClick = (e: MouseEvent) => {
      const numHearts = Math.floor(Math.random() * 3) + 3; // 3 to 5 hearts
      
      const newHearts = Array.from({ length: numHearts }).map(() => ({
        id: heartId++,
        x: e.clientX + (Math.random() * 40 - 20),
        y: e.clientY + (Math.random() * 20 - 10),
        size: Math.random() * 14 + 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
      
      setHearts(prev => [...prev, ...newHearts]);
      
      // Auto cleanup
      setTimeout(() => {
        setHearts(prev => prev.filter(h => !newHearts.map(nh => nh.id).includes(h.id)));
      }, 2000);
    };

    let konamiIndex = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI_CODE[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI_CODE.length) {
          konamiIndex = 0;
          // Trigger explosion
          const numHearts = 50;
          const newHearts = Array.from({ length: numHearts }).map(() => ({
            id: heartId++,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 12 + 12, // 12-24px
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          }));
          setHearts(prev => [...prev, ...newHearts]);
          setTimeout(() => {
            setHearts(prev => prev.filter(h => !newHearts.map(nh => nh.id).includes(h.id)));
          }, 3000);
        }
      } else {
        konamiIndex = 0;
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ 
              opacity: 1, 
              scale: 0,
              x: heart.x, 
              y: heart.y 
            }}
            animate={{ 
              opacity: 0, 
              scale: 1.5,
              y: heart.y - 100 - Math.random() * 50,
              x: heart.x + (Math.random() * 40 - 20)
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`absolute ${heart.color}`}
            style={{ fontSize: heart.size }}
          >
            ❤
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
