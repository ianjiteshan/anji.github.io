import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSystemStore } from '@/core/store/useSystemStore'

export default function ShutdownScreen() {
  const [phase, setPhase] = useState<'shutting-down' | 'off'>('shutting-down')
  const setBootPhase = useSystemStore((s) => s.setBootPhase)

  useEffect(() => {
    const timer = setTimeout(() => setPhase('off'), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleRestart = () => {
    setBootPhase('pre-boot')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center"
    >
      {phase === 'shutting-down' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-2 border-blue-400/30 border-t-blue-400 rounded-full mx-auto mb-6"
          />
          <div className="text-blue-300/60 text-lg">Shutting down...</div>
          <div className="text-white/20 text-sm mt-2">Saving system state</div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="text-white/20 text-sm mb-6">System powered off.</div>
          <motion.button
            onClick={handleRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10 transition-all cursor-pointer text-sm"
          >
            ⏻ Press to restart
          </motion.button>
          <div className="mt-4 text-white/10 text-xs">
            Thank you for exploring AnjiteshOS
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
