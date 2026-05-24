import { Link } from "wouter";
import { Play, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useSettings } from "@/hooks/useSettings";

export default function Episodes() {
  const { settings } = useSettings();
  const episodes = settings.content.episodes;

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="px-6 md:px-12 py-8 pt-10">
        <Link href="/home">
          <span className="flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer mb-8 w-fit">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </span>
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white">Season 1: How It Started</h1>
          <p className="text-lg text-gray-400 font-medium">6 Episodes • 6 Months of Love</p>
        </div>

        <div className="flex flex-col gap-6 max-w-5xl">
          {episodes.map((ep, i) => (
            <motion.div
              key={ep.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center bg-zinc-900/40 p-4 rounded-lg hover:bg-zinc-800/60 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="text-2xl md:text-3xl font-bold text-zinc-600 group-hover:text-red-500 transition-colors w-8 text-center">
                  {ep.id}
                </span>
                <div className={`relative w-full md:w-64 aspect-video rounded-md bg-gradient-to-br ${ep.gradient} overflow-hidden shadow-lg flex-shrink-0`}>
                  {ep.imageUrl ? (
                    <img src={ep.imageUrl} alt={ep.title} className="absolute inset-0 h-full w-full object-cover" />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-black/40">
                      <Play className="w-6 h-6 text-white ml-1 fill-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 mt-2 md:mt-0">
                <h3 className="text-xl font-bold mb-2 text-white">{ep.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  {ep.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
