import { createContext, useContext } from "react";
import { SiteSettings } from "@/lib/settings";

export interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (partial: Partial<SiteSettings>) => void;
  saveNote: (cardKey: string, note: string) => void;
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

export const SettingsContext = createContext<SettingsContextType | null>(null);

export function useSettingsContext(): SettingsContextType {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
