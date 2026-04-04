import { create } from 'zustand';

export type AppMode = 'city-pulse' | 'eco-pulse';

interface UIStore {
  activeMode: AppMode;
  setActiveMode: (mode: AppMode) => void;
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
  ecoOverlayOnMap: boolean;
  setEcoOverlayOnMap: (enabled: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  rightPanelOpen: boolean;
  setRightPanelOpen: (open: boolean) => void;
  oracleMode: boolean;
  setOracleMode: (enabled: boolean) => void;
  companionMode: boolean;
  setCompanionMode: (enabled: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  activeMode: 'city-pulse',
  setActiveMode: (mode) => set({ activeMode: mode }),
  selectedEventId: null,
  setSelectedEventId: (id) => set({ selectedEventId: id }),
  ecoOverlayOnMap: false,
  setEcoOverlayOnMap: (enabled) => set({ ecoOverlayOnMap: enabled }),
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  rightPanelOpen: true,
  setRightPanelOpen: (open) => set({ rightPanelOpen: open }),
  oracleMode: false,
  setOracleMode: (enabled) => set({ oracleMode: enabled }),
  companionMode: false,
  setCompanionMode: (enabled) => set({ companionMode: enabled }),
}));
