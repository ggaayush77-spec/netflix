import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Heart, Calendar, User, Image, Plus, Trash2, Link } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { GalleryPhoto } from "@/lib/settings";

type Tab = "profile" | "photos";

export function SettingsModal() {
  const { settings, updateSettings, isOpen, closeSettings } = useSettings();

  const [tab, setTab] = useState<Tab>("profile");
  const [herName, setHerName] = useState(settings.herName);
  const [myName, setMyName] = useState(settings.myName);
  const [herProfileImageUrl, setHerProfileImageUrl] = useState(settings.herProfileImageUrl);
  const [myProfileImageUrl, setMyProfileImageUrl] = useState(settings.myProfileImageUrl);
  const [siteTitle, setSiteTitle] = useState(settings.siteTitle);
  const [startDate, setStartDate] = useState(settings.startDate);
  const [photos, setPhotos] = useState<GalleryPhoto[]>(settings.galleryPhotos);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHerName(settings.herName);
      setMyName(settings.myName);
      setHerProfileImageUrl(settings.herProfileImageUrl);
      setMyProfileImageUrl(settings.myProfileImageUrl);
      setSiteTitle(settings.siteTitle);
      setStartDate(settings.startDate);
      setPhotos(settings.galleryPhotos);
      setSaved(false);
      setTab("profile");
    }
  }, [isOpen, settings]);

  function handleSave() {
    updateSettings({ herName, myName, herProfileImageUrl, myProfileImageUrl, siteTitle, startDate, galleryPhotos: photos });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      closeSettings();
    }, 1200);
  }

  function addPhoto() {
    if (photos.length < 12) {
      setPhotos((p) => [...p, { url: "", caption: "" }]);
    }
  }

  function updatePhoto(i: number, field: keyof GalleryPhoto, val: string) {
    setPhotos((p) => p.map((ph, idx) => idx === i ? { ...ph, [field]: val } : ph));
  }

  function removePhoto(i: number) {
    setPhotos((p) => p.filter((_, idx) => idx !== i));
  }

  const daysTogether = Math.floor(
    (Date.now() - new Date(startDate + "T00:00:00").getTime()) / 86400000
  );

  const tabs: { id: Tab; label: string; icon: typeof Settings }[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "photos", label: "Gallery Photos", icon: Image },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSettings}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 280 }}
            className="relative w-full max-w-xl rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-950 to-zinc-900 px-8 py-5 border-b border-zinc-800 rounded-t-2xl flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center">
                    <Settings className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg tracking-tight">Personalize</h2>
                    <p className="text-zinc-400 text-xs mt-0.5">Make this story yours</p>
                  </div>
                </div>
                <button
                  onClick={closeSettings}
                  className="rounded-full p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mt-5">
                {tabs.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                        tab === t.id
                          ? "bg-white/10 text-white border border-white/10"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Body — scrollable */}
            <div className="overflow-y-auto flex-1 px-8 py-6">
              {tab === "profile" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                        <User className="w-3 h-3 inline mr-1.5" />
                        You
                      </label>
                      <input
                        value={herName}
                        onChange={(e) => setHerName(e.target.value)}
                        placeholder="YOU"
                        maxLength={20}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-red-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                        <User className="w-3 h-3 inline mr-1.5" />
                        Me
                      </label>
                      <input
                        value={myName}
                        onChange={(e) => setMyName(e.target.value)}
                        placeholder="ME"
                        maxLength={20}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-red-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                        <Image className="w-3 h-3 inline mr-1.5" />
                        You Photo
                      </label>
                      <input
                        value={herProfileImageUrl}
                        onChange={(e) => setHerProfileImageUrl(e.target.value)}
                        placeholder="/images/story/first-meeting.jpg"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-red-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                        <Image className="w-3 h-3 inline mr-1.5" />
                        Me Photo
                      </label>
                      <input
                        value={myProfileImageUrl}
                        onChange={(e) => setMyProfileImageUrl(e.target.value)}
                        placeholder="/images/story/started-dating.jpg"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-red-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                      Site Title
                    </label>
                    <input
                      value={siteTitle}
                      onChange={(e) => setSiteTitle(e.target.value)}
                      placeholder="NETFLIX"
                      maxLength={40}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
                      <Calendar className="w-3 h-3 inline mr-1.5" />
                      Together Since
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-600 transition-colors [color-scheme:dark]"
                    />
                  </div>

                  <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-900/30 border border-rose-800/40 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs uppercase tracking-widest">Preview</p>
                      {startDate && !isNaN(new Date(startDate + "T00:00:00").getTime()) && daysTogether >= 0 ? (
                        <p className="text-white font-bold text-sm mt-0.5">
                          {herName || "YOU"} &amp; {myName || "ME"} — {daysTogether} days of {siteTitle || "NETFLIX"}
                        </p>
                      ) : (
                        <p className="text-zinc-500 text-sm mt-0.5">Enter a valid date to preview</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {tab === "photos" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-white font-semibold text-sm">Polaroid Photos</p>
                      <p className="text-zinc-500 text-xs mt-0.5">Paste any image URL — from Google Photos, iCloud, or anywhere</p>
                    </div>
                    <span className="text-zinc-500 text-xs font-mono">{photos.length}/12</span>
                  </div>

                  {photos.length === 0 && (
                    <div className="border border-dashed border-zinc-700 rounded-xl p-8 text-center">
                      <Image className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                      <p className="text-zinc-400 text-sm">No photos yet</p>
                      <p className="text-zinc-600 text-xs mt-1">Add your first photo below</p>
                    </div>
                  )}

                  {photos.map((photo, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 items-start bg-zinc-900/60 border border-zinc-800 rounded-xl p-3"
                    >
                      {/* Thumbnail */}
                      <div className="w-14 h-14 rounded-lg bg-zinc-800 flex-shrink-0 overflow-hidden border border-zinc-700">
                        {photo.url ? (
                          <img
                            src={photo.url}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Link className="w-5 h-5 text-zinc-600" />
                          </div>
                        )}
                      </div>

                      {/* Inputs */}
                      <div className="flex-1 space-y-2 min-w-0">
                        <input
                          value={photo.url}
                          onChange={(e) => updatePhoto(i, "url", e.target.value)}
                          placeholder="Paste image URL (https://...)"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-red-600 transition-colors"
                        />
                        <input
                          value={photo.caption}
                          onChange={(e) => updatePhoto(i, "caption", e.target.value)}
                          placeholder="Caption (e.g. First date vibes)"
                          maxLength={40}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-red-600 transition-colors"
                        />
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removePhoto(i)}
                        className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}

                  {photos.length < 12 && (
                    <button
                      onClick={addPhoto}
                      className="w-full py-3 border border-dashed border-zinc-700 rounded-xl text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Photo ({12 - photos.length} slots remaining)
                    </button>
                  )}

                  <div className="rounded-xl bg-zinc-900/40 border border-zinc-800/50 p-4">
                    <p className="text-zinc-500 text-xs leading-relaxed">
                      <span className="text-zinc-300 font-medium">Tip:</span> To get a direct image URL from Google Photos, open the photo, right-click and copy image address. For iCloud or other services, look for a "share link" option that ends in .jpg or .png.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="px-8 pb-6 pt-4 border-t border-zinc-800 flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className="w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer text-white"
                style={{
                  background: saved
                    ? "linear-gradient(135deg, #16a34a, #15803d)"
                    : "linear-gradient(135deg, #dc2626, #9f1239)",
                }}
              >
                {saved ? "Saved!" : "Save Changes"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
