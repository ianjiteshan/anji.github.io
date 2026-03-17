import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { timeline } from '@/data/timeline'
import { useWindowStore } from '@/core/store/useWindowStore'
import { soundManager } from '@/core/utils/sounds'

export default function SystemLogs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const openWindow = useWindowStore((s) => s.openWindow)

  // Auto-reveal logs one by one
  useEffect(() => {
    if (visibleCount >= timeline.length) return
    const timer = setTimeout(
      () => setVisibleCount((c) => c + 1),
      visibleCount === 0 ? 300 : 400
    )
    return () => clearTimeout(timer)
  }, [visibleCount])

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [visibleCount])

  const handleLogClick = (projectId?: string) => {
    if (!projectId) return
    soundManager.playClick()
    openWindow({
      id: 'projects',
      title: 'My Projects',
      component: 'projects',
      x: 100,
      y: 50,
      width: 800,
      height: 550,
    })
  }

  const typeColors: Record<string, string> = {
    education: 'text-blue-400',
    work: 'text-yellow-400',
    project: 'text-green-400',
    achievement: 'text-purple-400',
  }

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto bg-[#0a0a0a] p-5 font-mono text-sm"
    >
      <div className="text-cyan-400/60 mb-4">
        ╔═══════════════════════════════════════════╗{'\n'}
        ║  SYSTEM LOGS — Experience Timeline        ║{'\n'}
        ╚═══════════════════════════════════════════╝
      </div>

      <div className="space-y-2">
        {timeline.slice(0, visibleCount).map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleLogClick(entry.projectId)}
            className={`group ${entry.projectId ? 'cursor-pointer' : ''}`}
          >
            <div className="flex items-start gap-2">
              <span className="text-white/20 shrink-0 text-xs mt-0.5">
                [{entry.year}]
              </span>
              <div className="flex-1">
                <span className={`${typeColors[entry.type]} font-medium`}>
                  {entry.label}
                </span>
                {entry.projectId && (
                  <span className="text-blue-400/40 text-xs ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗ click to open
                  </span>
                )}
              </div>
            </div>
            <div className="ml-[68px] text-white/30 text-xs leading-relaxed mt-0.5">
              {entry.detail}
            </div>
          </motion.div>
        ))}
      </div>

      {visibleCount < timeline.length && (
        <div className="mt-3 flex items-center gap-2 text-green-400/50">
          <span className="inline-block w-2 h-3 bg-green-400/60 cursor-blink" />
          <span className="text-xs">Loading logs...</span>
        </div>
      )}

      {visibleCount >= timeline.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 pt-3 border-t border-white/5 text-white/20 text-xs"
        >
          ── End of system logs. All services operational. ──
        </motion.div>
      )}
    </div>
  )
}
