import { create } from 'zustand'

type BootPhase = 'pre-boot' | 'booting' | 'login' | 'desktop' | 'shutdown'

interface SystemState {
  bootPhase: BootPhase
  soundEnabled: boolean
  flashlightMode: boolean
  setBootPhase: (phase: BootPhase) => void
  toggleSound: () => void
  toggleFlashlight: () => void
}

export const useSystemStore = create<SystemState>((set) => ({
  bootPhase: 'pre-boot',
  soundEnabled: true,
  flashlightMode: false,
  setBootPhase: (phase) => set({ bootPhase: phase }),
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
  toggleFlashlight: () => set((s) => ({ flashlightMode: !s.flashlightMode })),
}))
