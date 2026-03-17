import { create } from 'zustand'

export interface OSWindow {
  id: string
  title: string
  component: string // component key to lazy-resolve
  minimized: boolean
  maximized: boolean
  x: number
  y: number
  width: number
  height: number
  zIndex: number
}

interface WindowState {
  windows: OSWindow[]
  nextZIndex: number
  openWindow: (win: Omit<OSWindow, 'zIndex' | 'minimized' | 'maximized'>) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  focusWindow: (id: string) => void
  updateWindowPosition: (id: string, x: number, y: number) => void
}

export const useWindowStore = create<WindowState>((set, get) => ({
  windows: [],
  nextZIndex: 100,

  openWindow: (win) => {
    const { windows, nextZIndex } = get()
    // Don't open duplicate
    if (windows.find((w) => w.id === win.id)) {
      // Just focus it
      get().focusWindow(win.id)
      get().restoreWindow(win.id)
      return
    }
    set({
      windows: [...windows, { ...win, minimized: false, maximized: false, zIndex: nextZIndex }],
      nextZIndex: nextZIndex + 1,
    })
  },

  closeWindow: (id) =>
    set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),

  minimizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    })),

  maximizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w
      ),
    })),

  restoreWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: false } : w)),
    })),

  focusWindow: (id) => {
    const { nextZIndex } = get()
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex } : w
      ),
      nextZIndex: nextZIndex + 1,
    }))
  },

  updateWindowPosition: (id, x, y) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    })),
}))
