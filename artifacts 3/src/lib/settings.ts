import { DEFAULT_CONTENT } from "@/lib/storyContent";

export interface GalleryPhoto {
  url: string;
  caption: string;
}

export interface PlaylistSong {
  num: number;
  title: string;
  artist: string;
  duration: string;
  seconds: number;
  src: string;
  gradient: string;
}

export interface MemoryCard {
  key: string;
  title: string;
  desc: string;
  date: string;
  quote: string;
  gradient: string;
  imageUrl?: string;
}

export interface ProgressCard {
  title: string;
  progress: number;
  desc: string;
  imageUrl?: string;
}

export interface EpisodeCard {
  id: number;
  title: string;
  desc: string;
  gradient: string;
  imageUrl?: string;
}

export interface FuturePlan {
  title: string;
  desc: string;
  gradient: string;
  imageUrl?: string;
}

export interface TopPick {
  reason: string;
  reveal: string;
  imageUrl?: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  desc: string;
  imageUrl?: string;
}

export interface SiteContent {
  heroTitle: string;
  heroDesc: string;
  heroImageUrl?: string;
  galleryPhotos: GalleryPhoto[];
  playlistSongs: PlaylistSong[];
  memories: MemoryCard[];
  continueWatching: ProgressCard[];
  episodes: EpisodeCard[];
  futurePlans: FuturePlan[];
  topPicks: TopPick[];
  timeline: TimelineEntry[];
  letterTitle: string;
  letterText: string;
}

export interface SiteSettings {
  herName: string;
  myName: string;
  herProfileImageUrl: string;
  myProfileImageUrl: string;
  startDate: string;
  siteTitle: string;
  memoryNotes: Record<string, string>;
  galleryPhotos: GalleryPhoto[];
  content: SiteContent;
}

const STORAGE_KEY = "hk_settings";

export const DEFAULT_SETTINGS: SiteSettings = {
  herName: "YOU",
  myName: "ME",
  herProfileImageUrl: "",
  myProfileImageUrl: "",
  startDate: "2025-11-25",
  siteTitle: "NETFLIX",
  memoryNotes: {},
  galleryPhotos: [],
  content: DEFAULT_CONTENT,
};

export function loadSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const stored = JSON.parse(raw) as Partial<SiteSettings>;
    if (stored.startDate === "2024-11-15" || stored.startDate === "2025-11-01") {
      stored.startDate = "2025-11-25";
    }
    if (!stored.siteTitle || stored.siteTitle === "Hamari Kahani") {
      stored.siteTitle = "NETFLIX";
    }
    if (!stored.herName || stored.herName === "Tum") {
      stored.herName = "YOU";
    }
    if (!stored.myName || stored.myName === "Main") {
      stored.myName = "ME";
    }
    const { content: _content, ...storedSettings } = stored;
    return { ...DEFAULT_SETTINGS, ...storedSettings, content: DEFAULT_CONTENT };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(s: SiteSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export function updateMemoryNote(cardKey: string, note: string): void {
  const s = loadSettings();
  s.memoryNotes = { ...s.memoryNotes, [cardKey]: note };
  saveSettings(s);
}
