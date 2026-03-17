import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWindowStore } from '@/core/store/useWindowStore'
import { useUIStore } from '@/core/store/useUIStore'
import { useSystemStore } from '@/core/store/useSystemStore'
import { soundManager } from '@/core/utils/sounds'

export default function Taskbar() {
  const windows = useWindowStore((s) => s.windows)
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const restoreWindow = useWindowStore((s) => s.restoreWindow)
  const toggleStartMenu = useUIStore((s) => s.toggleStartMenu)
  const startMenuOpen = useUIStore((s) => s.startMenuOpen)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setClock(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleWindowClick = (id: string, minimized: boolean) => {
    soundManager.playClick()
    if (minimized) {
      restoreWindow(id)
    }
    focusWindow(id)
  }

  return (
    <div className="taskbar fixed bottom-0 left-0 right-0 h-12 flex items-center px-1 z-[9000]">
      {/* Start Orb */}
      <button
        className="start-orb shrink-0 ml-1"
        onClick={() => {
          soundManager.playClick()
          toggleStartMenu()
        }}
        title="Start"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="1" y="1" width="8" height="8" rx="1" fill="#ff6b35" />
          <rect x="11" y="1" width="8" height="8" rx="1" fill="#4ecb71" />
          <rect x="1" y="11" width="8" height="8" rx="1" fill="#4ca6e8" />
          <rect x="11" y="11" width="8" height="8" rx="1" fill="#ffc533" />
        </svg>
      </button>

      {/* Open windows in taskbar */}
      <div className="flex-1 flex items-center gap-1 ml-2 overflow-x-auto">
        {windows.map((win) => (
          <motion.button
            key={win.id}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            onClick={() => handleWindowClick(win.id, win.minimized)}
            className={`h-9 px-3 rounded-sm text-xs font-medium truncate max-w-[160px] transition-all duration-150 cursor-pointer ${
              win.minimized
                ? 'bg-white/5 text-white/50 border border-white/5'
                : 'bg-white/10 text-white/90 border border-white/15 shadow-inner shadow-white/5'
            }`}
          >
            {win.title}
          </motion.button>
        ))}
      </div>

      {/* System tray */}
      <div className="flex items-center gap-3 mr-3 shrink-0">
        {/* System status mini indicator */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-blue-200/50 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-sm shadow-green-400/50" />
            OK
          </span>
        </div>

        {/* Sound toggle */}
        <SoundToggle />

        {/* Clock */}
        <div className="text-xs text-white/80 font-medium min-w-[65px] text-right">
          {clock}
        </div>
      </div>
    </div>
  )
}

function SoundToggle() {
  const soundEnabled = useSystemStore((s) => s.soundEnabled)
  const toggleSound = useSystemStore((s) => s.toggleSound)

  return (
    <button
      onClick={() => {
        toggleSound()
        soundManager.playClick()
      }}
      className="text-white/50 hover:text-white/80 text-sm cursor-pointer"
      title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
    >
      {soundEnabled ? '🔊' : '🔇'}
    </button>
  )
}
