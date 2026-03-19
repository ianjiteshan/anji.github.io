import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSystemStore } from '@/core/store/useSystemStore'
import { soundManager } from '@/core/utils/sounds'

export default function BootScreen() {
  const setBootPhase = useSystemStore((s) => s.setBootPhase)
  const [started, setStarted] = useState(false)
  const [progress, setProgress] = useState(0)

  const startBoot = useCallback(() => {
    if (started) return
    setStarted(true)
    soundManager.playStartupChime()

    // Trigger full screen request if possible
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {})
      }
    } catch (e) {
      // Ignore
    }
  }, [started])

  useEffect(() => {
    if (!started) return

    // Fake loading bar progress
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 10
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => setBootPhase('login'), 800)
      }
      setProgress(current)
    }, 200)

    return () => clearInterval(interval)
  }, [started, setBootPhase])

  return (
    <div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[10000] cursor-pointer selection:bg-transparent"
      onClick={startBoot}
    >
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center absolute inset-0 flex flex-col items-center justify-center"
          >
            <div className="text-white/40 text-sm font-mono tracking-widest uppercase mb-4">
              System Standby
            </div>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-6 py-2.5 rounded-full border border-blue-400/30 text-blue-400/80 text-sm hover:bg-blue-400/10 transition-colors"
            >
              Click anywhere to boot ShanOS
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <>
          {/* Main Logo Center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center -mt-20"
          >
            {/* Fake Windows Logo (using CSS colors matching MitchIvin XP) */}
            <div className="grid grid-cols-2 gap-1 mb-6 rotate-[-5deg] scale-125">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-tl-xl shadow-lg shadow-red-500/20" style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 85%)' }} />
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-tr-xl shadow-lg shadow-green-500/20" style={{ clipPath: 'polygon(0 0, 100% 15%, 100% 85%, 0 100%)' }} />
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-bl-xl shadow-lg shadow-blue-500/20" style={{ clipPath: 'polygon(0 0, 100% 15%, 100% 100%, 0 85%)' }} />
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-br-xl shadow-lg shadow-yellow-500/20" style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0 100%)' }} />
            </div>

            <div className="flex items-baseline gap-1 mt-4">
              <span className="text-5xl font-bold tracking-tight text-white drop-shadow-md">
                Shan
              </span>
              <span className="text-3xl font-light text-white/80 tracking-tighter">
                OS
              </span>
              <span className="text-orange-500 font-bold ml-1 text-2xl -translate-y-4">
                v2.6
              </span>
            </div>
            <div className="text-white/60 font-medium tracking-wide mt-1 text-sm italic">
              Backend Engineer & AI
            </div>

            {/* Windows XP style loading bar */}
            <div className="mt-16 w-36 h-4 rounded border-2 border-white/20 p-0.5 shadow-[0_0_15px_rgba(255,255,255,0.1)] relative overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"
                style={{ width: `${progress}%` }}
              />
              {/* Animated highlight */}
              <motion.div
                className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{ left: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Bottom Left: Full Screen Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-16 left-16 text-white/50 text-sm leading-relaxed"
          >
            For the best experience<br />
            Enter Full Screen (F11)
          </motion.div>

          {/* Bottom Right: Portfolio Mark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-16 right-16 text-4xl font-bold italic tracking-tighter text-white/90 drop-shadow-lg"
          >
            Portfolio<span className="text-sm align-super ml-1">®</span>
          </motion.div>
        </>
      )}
    </div>
  )
}
