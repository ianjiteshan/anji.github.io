import { create } from 'zustand'

interface Notification {
  id: string
  title: string
  message: string
  timestamp: number
}

interface UIState {
  startMenuOpen: boolean
  contextMenu: { x: number; y: number } | null
  notifications: Notification[]
  toggleStartMenu: () => void
  closeStartMenu: () => void
  showContextMenu: (x: number, y: number) => void
  closeContextMenu: () => void
  addNotification: (title: string, message: string) => void
  removeNotification: (id: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  startMenuOpen: false,
  contextMenu: null,
  notifications: [],

  toggleStartMenu: () => set((s) => ({ startMenuOpen: !s.startMenuOpen })),
  closeStartMenu: () => set({ startMenuOpen: false }),

  showContextMenu: (x, y) => set({ contextMenu: { x, y } }),
  closeContextMenu: () => set({ contextMenu: null }),

  addNotification: (title, message) =>
    set((s) => ({
      notifications: [
        ...s.notifications,
        { id: crypto.randomUUID(), title, message, timestamp: Date.now() },
      ],
    })),
  removeNotification: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    })),
}))
