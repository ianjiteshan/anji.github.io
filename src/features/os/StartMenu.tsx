import { motion } from 'framer-motion'
import { useUIStore } from '@/core/store/useUIStore'
import { useWindowStore } from '@/core/store/useWindowStore'
import { useSystemStore } from '@/core/store/useSystemStore'
import { soundManager } from '@/core/utils/sounds'

const MENU_ITEMS = [
  { id: 'projects', label: 'My Projects', icon: '📁', component: 'projects' },
  { id: 'terminal', label: 'Terminal', icon: '⬛', component: 'terminal' },
  { id: 'ai', label: 'AI Agent', icon: '🧠', component: 'ai' },
  { id: 'resume', label: 'Resume', icon: '📄', component: 'resume' },
  { id: 'timeline', label: 'System Logs', icon: '📋', component: 'timeline' },
  { id: 'status', label: 'System Status', icon: '📊', component: 'status' },
]

const LINKS = [
  { label: 'GitHub', icon: '🐙', url: 'https://github.com/ianjiteshan' },
  { label: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/ianjiteshan' },
  { label: 'LeetCode', icon: '⚡', url: 'https://leetcode.com/u/ianjiteshan' },
  { label: 'Email', icon: '✉️', url: 'mailto:anjiteshshandilya@gmail.com' },
]

export default function StartMenu() {
  const startMenuOpen = useUIStore((s) => s.startMenuOpen)
  const closeStartMenu = useUIStore((s) => s.closeStartMenu)
  const openWindow = useWindowStore((s) => s.openWindow)
  const setBootPhase = useSystemStore((s) => s.setBootPhase)

  if (!startMenuOpen) return null

  const handleOpen = (item: (typeof MENU_ITEMS)[0]) => {
    soundManager.playClick()
    openWindow({
      id: item.id,
      title: item.label,
      component: item.component,
      x: 60 + Math.random() * 200,
      y: 30 + Math.random() * 100,
      width: item.id === 'terminal' ? 750 : 700,
      height: item.id === 'terminal' ? 450 : 500,
    })
    closeStartMenu()
  }

  const handleShutdown = () => {
    soundManager.playShutdown()
    closeStartMenu()
    setBootPhase('shutdown')
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[8999]" onClick={closeStartMenu} />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="fixed bottom-14 left-2 z-[9001] w-80 rounded-t-xl overflow-hidden win7-glass-dark"
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-blue-400/30">
            <img
              src="/images/hero-banner.jpg"
              alt="Anjitesh"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Anjitesh Shandilya</div>
            <div className="text-[10px] text-blue-300/50">Backend · AI/ML · Systems</div>
          </div>
        </div>

        {/* Two columns */}
        <div className="flex">
          {/* Left: Apps */}
          <div className="flex-1 py-2 border-r border-white/5">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleOpen(item)}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/8 text-left transition-colors duration-100 cursor-pointer"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-white/80">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right: Links */}
          <div className="w-36 py-2">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 hover:bg-white/8 transition-colors duration-100"
                onClick={() => {
                  soundManager.playClick()
                  closeStartMenu()
                }}
              >
                <span className="text-sm">{link.icon}</span>
                <span className="text-xs text-white/60">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer with Shutdown */}
        <div className="border-t border-white/5 px-4 py-2 flex justify-between items-center">
          <button
            onClick={() => {
              closeStartMenu()
              window.location.hash = '#recruiter'
              window.location.reload()
            }}
            className="text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer"
          >
            Recruiter Mode
          </button>
          <button
            onClick={handleShutdown}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs transition-colors cursor-pointer"
          >
            ⏻ Shut Down
          </button>
        </div>
      </motion.div>
    </>
  )
}
