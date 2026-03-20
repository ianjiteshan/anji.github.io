import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSystemStore } from '@/core/store/useSystemStore'
import { soundManager } from '@/core/utils/sounds'

export default function LoginScreen() {
  const setBootPhase = useSystemStore((s) => s.setBootPhase)
  const [showTurnOffDialog, setShowTurnOffDialog] = useState(false)

  const enterDesktop = () => {
    soundManager.playClick()
    sessionStorage.setItem('shanos-force-os-mode', 'true')
    setBootPhase('desktop')
  }

  const enterRecruiterMode = () => {
    soundManager.playClick()
    sessionStorage.removeItem('shanos-force-os-mode')
    setBootPhase('desktop')
    window.location.hash = '#recruiter'
  }

  const handleRestartClick = () => {
    soundManager.playClick()
    setShowTurnOffDialog(true)
  }

  const handleTurnOff = (type: 'restart' | 'shutdown') => {
    soundManager.playClick()
    setShowTurnOffDialog(false)
    if (type === 'restart') {
      window.location.reload()
    } else {
      setBootPhase('shutdown')
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#5a7edc] font-sans selection:bg-transparent">
      {/* Background scanline pattern (imitating the Windows XP blue login background) */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '4px 4px'
        }}
      />
      
      {/* Top and Bottom solid blue bars */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-[#003399]" />
      
      {/* Bottom bar with orange stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-[#003399] flex flex-col justify-between">
        <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500" />
        
        {/* Bottom bar content */}
        <div className="flex-1 flex items-center justify-between px-10">
          <button 
            onClick={handleRestartClick}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center border-2 border-white/20 shadow-md group-hover:brightness-110">
              <span className="text-white text-xl leading-none">⏻</span>
            </div>
            <span className="text-white font-medium text-lg drop-shadow-md group-hover:underline">
              Turn off ShanOS
            </span>
          </button>

          <div className="text-right text-white/80 text-sm leading-tight drop-shadow-md">
            After you log on, the system's yours to explore.<br/>
            Every detail has been designed with a purpose.
          </div>
        </div>
      </div>

      {/* Center Content Layout (Wordmark Left, User Right) */}
      <div className="absolute inset-0 top-24 bottom-28 flex items-center justify-center">
        
        {/* Central divider line */}
        <div className="absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />

        <div className="w-full max-w-5xl flex items-center">
          
          {/* Left Side: Wordmark */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col items-end pr-16 text-right"
          >
            {/* Fake Windows Logo */}
            <div className="grid grid-cols-2 gap-1 mb-2 rotate-[-5deg] scale-110 origin-right">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-tl-xl shadow-md" style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 85%)' }} />
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-tr-xl shadow-md" style={{ clipPath: 'polygon(0 0, 100% 15%, 100% 85%, 0 100%)' }} />
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-bl-xl shadow-md" style={{ clipPath: 'polygon(0 0, 100% 15%, 100% 100%, 0 85%)' }} />
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-br-xl shadow-md" style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0 100%)' }} />
            </div>

            <div className="flex items-baseline mt-2">
              <span className="text-[52px] font-bold tracking-tight text-white drop-shadow-lg">Shan</span>
              <span className="text-4xl font-light text-white/90 tracking-tighter drop-shadow-lg ml-0.5">OS</span>
              <span className="text-orange-500 font-bold ml-1.5 text-2xl -translate-y-4 drop-shadow-lg">v2.6</span>
            </div>
            <div className="text-white/80 font-medium tracking-wide text-lg italic mt-1 drop-shadow-md pr-1">
              Backend Engineer & AI
            </div>

            <div className="mt-12 text-white/70 text-lg drop-shadow-md">
              To begin, click a user to log in
            </div>
          </motion.div>

          {/* Right Side: User Accounts */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 pl-16 flex flex-col justify-center gap-8 border-l border-white/20 py-10"
          >
            {/* Main User: Anjitesh */}
            <div className="flex items-center gap-4 group cursor-pointer" onClick={enterDesktop}>
              <div className="w-[72px] h-[72px] rounded-md overflow-hidden border-2 border-white/80 shadow-lg group-hover:border-[#ff9900] group-hover:shadow-[0_0_15px_rgba(255,153,0,0.6)] transition-all duration-200">
                <img src={`${import.meta.env.BASE_URL}images/avatar.webp`} alt="Anjitesh" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <div className="text-[22px] font-semibold text-white tracking-wide drop-shadow-md group-hover:text-yellow-100 transition-colors">
                  Anjitesh Shandilya
                </div>
                <div className="text-white/60 font-medium text-sm drop-shadow-md mt-0.5">
                  Log on to System
                </div>
              </div>
            </div>

            {/* Second User: Recruiter (Corporate Guy) */}
            <div className="flex items-center gap-4 group cursor-pointer" onClick={enterRecruiterMode}>
              <div className="w-[72px] h-[72px] rounded-md overflow-hidden border-2 border-white/80 shadow-lg group-hover:border-[#ff9900] group-hover:shadow-[0_0_15px_rgba(255,153,0,0.6)] transition-all duration-200 bg-gradient-to-b from-[#e2e8f0] to-[#94a3b8] flex items-center justify-center">
                {/* Corporate Guy SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-[85%] h-[85%] relative top-2">
                  <path fill="#475569" d="M14 48h20V36c0-6.6-5.4-12-12-12H26c-6.6 0-12 5.4-12 12v12z" />
                  <path fill="#cbd5e1" d="M24 38L18 24h12z" />
                  <path fill="#1e293b" d="M22 28h4v12h-4z" />
                  <circle cx="24" cy="18" r="9" fill="#fcd34d" />
                  <path fill="#1e293b" d="M16 16c0-5 3.6-9 8-9s8 4 8 9c0 2-3 2-3 2s1-2 1-4c0-3.3-2.7-6-6-6s-6 2.7-6 6c0 2 1 4 1 4s-3 0-3-2z" />
                </svg>
              </div>
              <div>
                <div className="text-[22px] font-semibold text-white tracking-wide drop-shadow-md group-hover:text-yellow-100 transition-colors">
                  Recruiter Mode
                </div>
                <div className="text-white/60 font-medium text-sm drop-shadow-md mt-0.5">
                  Fast View • No OS Simulation
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Turn Off Computer Dialog Overlay */}
      <AnimatePresence>
        {showTurnOffDialog && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 grayscale"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, filter: 'none' }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-[450px] shadow-2xl overflow-hidden filter-none grayscale-0"
              style={{ filter: 'none' }}
            >
              <div className="bg-[#003399] px-4 py-1.5 flex justify-between items-center border-t border-l border-white/20">
                <span className="text-white font-bold tracking-wide">Turn off ShanOS</span>
                {/* Mini logo */}
                <div className="grid grid-cols-2 gap-[1px] scale-75">
                  <div className="w-2 h-2 bg-red-500 rounded-tl-sm"/>
                  <div className="w-2 h-2 bg-green-500 rounded-tr-sm"/>
                  <div className="w-2 h-2 bg-blue-500 rounded-bl-sm"/>
                  <div className="w-2 h-2 bg-yellow-400 rounded-br-sm"/>
                </div>
              </div>
              
              <div className="bg-gradient-to-b from-[#5a7edc] to-[#3a5ebc] pt-8 pb-4 border-l border-r border-[#003399] relative">
                {/* Dialog scanlines */}
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '3px 3px'
                  }}
                />
                
                <div className="flex justify-center gap-12 relative z-10 px-8">
                  <button 
                    onClick={() => handleTurnOff('restart')}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded bg-green-500 flex items-center justify-center shadow-md border border-white/30 group-hover:brightness-110 group-active:scale-95 transition-all">
                      <span className="text-white text-2xl font-bold">⟳</span>
                    </div>
                    <span className="text-white font-medium drop-shadow text-sm">Restart</span>
                  </button>

                  <button 
                    onClick={() => handleTurnOff('shutdown')}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded bg-red-500 flex items-center justify-center shadow-md border border-white/30 group-hover:brightness-110 group-active:scale-95 transition-all">
                      <span className="text-white text-xl">⏻</span>
                    </div>
                    <span className="text-white font-medium drop-shadow text-sm">Shut Down</span>
                  </button>
                </div>

                <div className="mt-8 pr-4 flex justify-end relative z-10">
                  <button 
                    onClick={() => {
                      soundManager.playClick()
                      setShowTurnOffDialog(false)
                    }}
                    className="px-6 py-1 bg-white border border-gray-400 rounded-sm text-black text-xs hover:bg-gray-100 shadow-sm cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className="h-1 bg-[#003399]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
