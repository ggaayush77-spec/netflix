import { useState, useCallback } from "react";
import { SiteSettings, loadSettings, saveSettings, updateMemoryNote } from "@/lib/settings";
import { SettingsContext } from "@/context/settingsContext";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(() => loadSettings());
  const [isOpen, setIsOpen] = useState(false);

  const updateSettings = useCallback((partial: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  }, []);

  const saveNote = useCallback((cardKey: string, note: string) => {
    updateMemoryNote(cardKey, note);
    setSettings((prev) => ({
      ...prev,
      memoryNotes: { ...prev.memoryNotes, [cardKey]: note },
    }));
  }, []);

  const openSettings = useCallback(() => setIsOpen(true), []);
  const closeSettings = useCallback(() => setIsOpen(false), []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, saveNote, isOpen, openSettings, closeSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
