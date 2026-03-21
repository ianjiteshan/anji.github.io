import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = [
  { text: 'ACCESS LEVEL: ROOT', delay: 1000 },
  { text: 'Hidden modules unlocked.', delay: 2500 },
  { text: 'Decrypting classified projects...', delay: 5000 },
  { text: 'Monitoring user behavior...', delay: 12000, type: 'warning' },
  { text: 'You were not supposed to find this.', delay: 20000, type: 'critical' }
]

export default function TerminalUnlock() {
  const [logs, setLogs] = useState<{ id: number; text: string; type?: string }[]>([])

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []

    MESSAGES.forEach((msg, i) => {
      const t = setTimeout(() => {
        setLogs(prev => [...prev, { id: i, text: msg.text, type: msg.type }])
      }, msg.delay)
      timeouts.push(t)
    })

    return () => timeouts.forEach(clearTimeout)
  }, [])

  return (
    <div className="pointer-events-none absolute bottom-24 left-6 z-50 flex flex-col justify-end gap-2 max-w-sm">
      <AnimatePresence>
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.4 }}
            className={`font-mono text-xs tracking-widest uppercase border-l-2 pl-3 py-1 bg-black/40 backdrop-blur-sm shadow-md ${
              log.type === 'critical' 
                ? 'border-red-600 text-red-500 shadow-red-600/20' 
                : log.type === 'warning' 
                  ? 'border-orange-500 text-orange-400 shadow-orange-500/20' 
                  : 'border-red-500/50 text-red-400/80 shadow-red-500/10'
            }`}
            style={{ textShadow: log.type === 'critical' ? '0 0 8px rgba(255,0,0,0.8)' : 'none' }}
          >
            {'>'} {log.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
