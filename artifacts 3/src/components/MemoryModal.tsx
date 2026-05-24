import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PenLine } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardKey: string;
  title: string;
  desc: string;
  gradient: string;
  quote: string;
  date: string;
  imageUrl?: string;
}

export function MemoryModal({ isOpen, onClose, cardKey, title, desc, gradient, quote, date, imageUrl }: MemoryModalProps) {
  const { settings, saveNote } = useSettings();
  const [note, setNote] = useState(settings.memoryNotes[cardKey] || "");
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    setNote(settings.memoryNotes[cardKey] || "");
    setNoteSaved(false);
  }, [cardKey, settings.memoryNotes]);

  function handleSaveNote() {
    saveNote(cardKey, note);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 1500);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-zinc-900/90 border border-zinc-700 shadow-2xl backdrop-blur-md z-10 max-h-[90vh] flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 rounded-full bg-black/40 p-2 text-white/70 hover:text-red-400 hover:bg-black/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className={`w-full aspect-video bg-gradient-to-br ${gradient} flex items-center justify-center relative flex-shrink-0 overflow-hidden`}>
              {imageUrl ? (
                <img src={imageUrl} alt={title} className="absolute inset-0 h-full w-full object-cover" />
              ) : null}
              <div className="absolute inset-0 bg-black/30" />
              <span className="relative text-white/30 font-extrabold text-7xl rotate-[-5deg] whitespace-nowrap px-8 text-center overflow-hidden">
                {title}
              </span>
            </div>
            <div className="p-8 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <span className="px-2 py-1 text-xs font-bold bg-red-900/50 text-red-200 rounded border border-red-800/50">
                  {date}
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">{desc}</p>
              <blockquote className="border-l-4 border-red-600 pl-4 py-1 mb-8">
                <p className="text-rose-300 italic text-lg">{quote}</p>
              </blockquote>

              <div className="border-t border-zinc-800 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <PenLine className="w-4 h-4 text-zinc-400" />
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Your Personal Note</span>
                </div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write your memory here — something only you two would know..."
                  rows={3}
                  className="w-full bg-zinc-800/60 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 text-sm resize-none focus:outline-none focus:border-red-600/50 transition-colors leading-relaxed"
                />
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSaveNote}
                  className="mt-3 px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer"
                  style={{
                    background: noteSaved
                      ? "linear-gradient(135deg, #16a34a, #15803d)"
                      : "linear-gradient(135deg, #3f3f46, #27272a)",
                    color: noteSaved ? "white" : "#a1a1aa",
                    border: noteSaved ? "1px solid #16a34a40" : "1px solid #3f3f46",
                  }}
                >
                  {noteSaved ? "Note Saved!" : "Save Note"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
