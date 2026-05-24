import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SkipBack, SkipForward, Play, Pause, Music, Volume2 } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PlaylistPlayer() {
  const { settings } = useSettings();
  const songs = settings.content.playlistSongs;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(songs[0]?.seconds ?? 0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const song = songs[currentIdx] ?? songs[0];
  if (!song) return null;
  const activeDuration = Number.isFinite(duration) && duration > 0 ? duration : song.seconds;
  const progress = (elapsed / activeDuration) * 100;
  const hasAudio = Boolean(song.src);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song.src) {
      setIsPlaying(false);
      setElapsed(0);
      setDuration(song.seconds);
      return;
    }

    audio.load();
    setElapsed(0);
    setDuration(song.seconds);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentIdx, song.src, song.seconds]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song.src) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, song.src]);

  function selectTrack(idx: number) {
    setCurrentIdx(idx);
    setElapsed(0);
    setIsPlaying(Boolean(songs[idx].src));
  }

  function skipPrev() {
    setCurrentIdx((i) => (i - 1 + songs.length) % songs.length);
    setElapsed(0);
  }

  function skipNext() {
    setCurrentIdx((i) => (i + 1) % songs.length);
    setElapsed(0);
  }

  function handleProgressClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const nextTime = Math.floor(ratio * activeDuration);
    setElapsed(nextTime);
    if (audioRef.current && song.src) {
      audioRef.current.currentTime = nextTime;
    }
  }

  function togglePlayback() {
    if (!song.src) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying((p) => !p);
  }

  return (
    <div className="px-6 md:px-12 mb-20">
      <audio
        ref={audioRef}
        src={song.src || undefined}
        onLoadedMetadata={(e) => {
          const nextDuration = e.currentTarget.duration;
          if (Number.isFinite(nextDuration)) setDuration(nextDuration);
        }}
        onTimeUpdate={(e) => setElapsed(e.currentTarget.currentTime)}
        onEnded={skipNext}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[800px] mx-auto bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Our Playlist</h3>
          <motion.div
            animate={isPlaying ? { scale: [1, 1.05, 1] } : { scale: 1 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="inline-block bg-red-900/30 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-900/50 uppercase tracking-wider"
          >
            {isPlaying ? "Now Playing" : hasAudio ? "Paused" : "Add Audio File"}
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="relative w-48 h-48 flex-shrink-0">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${song.gradient} shadow-2xl border-4 border-zinc-800`}
              style={{
                animation: isPlaying ? "spin 12s linear infinite" : "none",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[30%] h-[30%] bg-zinc-900 rounded-full border-2 border-zinc-700 shadow-inner flex items-center justify-center">
                <Music className="w-4 h-4 text-zinc-500" />
              </div>
            </div>
          </div>

          <div className="flex-1 w-full text-center md:text-left">
            <motion.h4
              key={song.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white mb-1"
            >
              {song.title}
            </motion.h4>
            <motion.p
              key={song.artist}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 mb-6 flex items-center gap-2 justify-center md:justify-start"
            >
              <Volume2 className="w-3 h-3" />
              {song.artist}
            </motion.p>
            {!hasAudio && (
              <p className="text-xs text-amber-300/80 mb-4">
                Add this track under <span className="font-mono">public/audio</span> and set its <span className="font-mono">src</span> in PlaylistPlayer.tsx.
              </p>
            )}

            <div className="mb-6">
              <div
                className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-2 cursor-pointer group relative"
                onClick={handleProgressClick}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-red-700 to-rose-500 rounded-full relative"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow -mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 font-mono">
                <span>{formatTime(elapsed)}</span>
                <span>{hasAudio ? formatTime(activeDuration) : song.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-6">
              <button
                onClick={skipPrev}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer hover:scale-110 active:scale-95"
              >
                <SkipBack className="w-6 h-6 fill-current" />
              </button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={togglePlayback}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform shadow-lg ${
                  hasAudio
                    ? "bg-white text-black hover:scale-105 cursor-pointer"
                    : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-1" />
                )}
              </motion.button>
              <button
                onClick={skipNext}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer hover:scale-110 active:scale-95"
              >
                <SkipForward className="w-6 h-6 fill-current" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-4 space-y-1">
          {songs.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 4 }}
              onClick={() => selectTrack(i)}
              className={`flex items-center gap-4 p-3 rounded-lg transition-colors cursor-pointer group ${
                i === currentIdx
                  ? "bg-zinc-800 border border-zinc-700"
                  : "hover:bg-zinc-800/50"
              }`}
            >
              <div className="w-6 text-center flex-shrink-0">
                {i === currentIdx && isPlaying ? (
                  <motion.div
                    className="flex gap-0.5 items-end h-4 justify-center"
                    animate={{}}
                  >
                    {[0, 1, 2].map((b) => (
                      <motion.div
                        key={b}
                        className="w-0.5 bg-red-500 rounded-full"
                        animate={{ height: ["4px", "14px", "4px"] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: b * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <span className={`font-mono text-sm ${i === currentIdx ? "text-red-400" : "text-gray-500 group-hover:text-white"}`}>
                    {s.num}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className={`font-medium truncate ${i === currentIdx ? "text-red-400" : "text-white group-hover:text-red-400 transition-colors"}`}>
                  {s.title}
                </h5>
                <p className="text-xs text-gray-400 truncate">{s.artist}</p>
              </div>
              <span className="text-gray-500 font-mono text-sm flex-shrink-0">{s.duration}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
