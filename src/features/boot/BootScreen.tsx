import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSystemStore } from '@/core/store/useSystemStore'
import { soundManager } from '@/core/utils/sounds'

const BOOT_LINES = [
  { text: 'AnjiteshOS v2.6 — Kernel Loading...', delay: 0 },
  { text: 'Initializing Backend Systems...        [  OK  ]', delay: 400 },
  { text: 'Loading Distributed Services...        [  OK  ]', delay: 800 },
  { text: 'Starting AI Core Engine...             [  OK  ]', delay: 1200 },
  { text: 'Mounting Project Filesystem...         [  OK  ]', delay: 1600 },
  { text: 'Loading Green Tech Modules...          [  OK  ]', delay: 1900 },
  { text: 'Establishing Network Connections...    [  OK  ]', delay: 2200 },
  { text: 'Starting Window Manager...             [  OK  ]', delay: 2500 },
  { text: '', delay: 2800 },
  { text: 'All systems operational. Welcome, Anjitesh.', delay: 2800 },
]

export default function BootScreen() {
  const setBootPhase = useSystemStore((s) => s.setBootPhase)
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [started, setStarted] = useState(false)

  const startBoot = useCallback(() => {
    if (started) return
    setStarted(true)
    soundManager.playStartupChime()
  }, [started])

  useEffect(() => {
    if (!started) return

    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    })

    // Transition to login after boot completes
    const timer = setTimeout(() => {
      setBootPhase('login')
    }, 3800)

    return () => clearTimeout(timer)
  }, [started, setBootPhase])

  return (
    <div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[10000] cursor-pointer"
      onClick={startBoot}
    >
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              AnjiteshOS
            </div>
            <div className="text-sm text-gray-500 font-mono">
              Click anywhere to boot system
            </div>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 text-blue-400/60 text-xs"
            >
              ▶ PRESS TO START
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-2xl px-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <span className="text-3xl font-bold text-blue-400 font-mono">
              AnjiteshOS
            </span>
            <span className="text-sm text-blue-300/50 ml-2">v2.6</span>
          </motion.div>

          {/* Boot log */}
          <div className="font-mono text-sm space-y-1">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={`boot-text ${
                  line.text.includes('[  OK  ]')
                    ? 'text-green-400'
                    : line.text.includes('Welcome')
                    ? 'text-cyan-300'
                    : 'text-green-500/80'
                }`}
              >
                {line.text}
              </motion.div>
            ))}
            {visibleLines < BOOT_LINES.length && (
              <span className="inline-block w-2 h-4 bg-green-400 cursor-blink" />
            )}
          </div>

          {/* Loading bar */}
          <div className="mt-8 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full loading-bar-fill rounded-full" />
          </div>
        </motion.div>
      )}
    </div>
  )
}
