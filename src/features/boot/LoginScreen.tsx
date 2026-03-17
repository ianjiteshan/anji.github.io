import { motion } from 'framer-motion'
import { useSystemStore } from '@/core/store/useSystemStore'
import { soundManager } from '@/core/utils/sounds'

export default function LoginScreen() {
  const setBootPhase = useSystemStore((s) => s.setBootPhase)

  const enterDesktop = () => {
    soundManager.playClick()
    setBootPhase('desktop')
  }

  const enterRecruiterMode = () => {
    soundManager.playClick()
    // Store the mode preference and switch
    setBootPhase('desktop')
    // Recruiter mode will be handled by App.tsx checking URL or store
    window.location.hash = '#recruiter'
    window.location.reload()
  }

  return (
    <div className="fixed inset-0 login-bg flex flex-col items-center justify-center z-[9999]">
      {/* Subtle animated particles/stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent mb-2">
          AnjiteshOS
        </div>
        <div className="text-sm text-blue-300/40 font-mono">v2.6 — All systems operational</div>
      </motion.div>

      {/* User card — MitchIvin XP style */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {/* Avatar */}
        <motion.button
          onClick={enterDesktop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="group relative mb-6 cursor-pointer"
        >
          <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-blue-400/40 shadow-xl shadow-blue-500/20 group-hover:border-blue-400/70 transition-all duration-300">
            <img
              src="/images/hero-banner.jpg"
              alt="Anjitesh Shandilya"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-[#132744] shadow-lg shadow-green-400/50" />
        </motion.button>

        <h2 className="text-xl font-semibold text-white mb-1">Anjitesh Shandilya</h2>
        <p className="text-blue-300/60 text-sm mb-6">Backend Engineer · AI/ML · Systems</p>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 w-64">
          <motion.button
            onClick={enterDesktop}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-6 rounded-lg win7-glass text-white font-medium text-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 cursor-pointer"
          >
            🖥️ Enter AnjiteshOS
          </motion.button>

          <motion.button
            onClick={enterRecruiterMode}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-6 rounded-lg bg-white/5 border border-white/10 text-blue-200/70 font-medium text-sm hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
          >
            📄 Recruiter Mode (Clean View)
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 text-center text-xs text-blue-300/30"
      >
        <p>Click on the profile to enter the system.</p>
        <p className="mt-1">Every detail has been designed with purpose.</p>
      </motion.div>
    </div>
  )
}
