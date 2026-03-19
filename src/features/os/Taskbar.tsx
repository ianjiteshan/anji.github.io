import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWindowStore } from '@/core/store/useWindowStore'
import { useUIStore } from '@/core/store/useUIStore'
import { useSystemStore } from '@/core/store/useSystemStore'
import { soundManager } from '@/core/utils/sounds'

// Helper component for XP-style yellow tooltips
function XpTooltip({ text, children, className = '' }: { text: string; children: React.ReactNode; className?: string }) {
  const [show, setShow] = useState(false)
  
  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, delay: 0.2 }}
            className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#ffffe1] border border-black/80 px-1.5 py-0.5 text-[11px] leading-tight text-black shadow-sm z-[10000] pointer-events-none font-sans"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Taskbar() {
  const windows = useWindowStore((s) => s.windows)
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const restoreWindow = useWindowStore((s) => s.restoreWindow)
  const openWindow = useWindowStore((s) => s.openWindow)
  const toggleStartMenu = useUIStore((s) => s.toggleStartMenu)
  const startMenuOpen = useUIStore((s) => s.startMenuOpen)
  const bootPhase = useSystemStore((s) => s.bootPhase)
  const [clock, setClock] = useState('')
  const [showWelcomeBalloon, setShowWelcomeBalloon] = useState(false)

  // Timer to show balloon after OS is ready
  useEffect(() => {
    if (bootPhase === 'desktop') {
      const timer = setTimeout(() => {
        setShowWelcomeBalloon(true)
        soundManager.playClick() // Subtle pop sound
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [bootPhase])

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

  const openAboutMe = () => {
    soundManager.playClick()
    setShowWelcomeBalloon(false)
    openWindow({
      id: 'about', title: 'About Me', component: 'about', x: 100, y: 100, width: 800, height: 550
    })
  }

  const openProjects = () => {
    soundManager.playClick()
    setShowWelcomeBalloon(false)
    openWindow({
      id: 'projects', title: 'My Projects', component: 'projects', x: 200, y: 150, width: 800, height: 550
    })
  }

  const [crtEnabled, setCrtEnabled] = useState(document.body.classList.contains('crt'))

  return (
    <div className="taskbar fixed bottom-0 left-0 right-0 h-11 flex items-center pr-1 z-[9000] select-none">
      {/* XP Start Button */}
      <XpTooltip text="Click here to begin">
        <button
          className="h-11 px-5 flex items-center justify-center gap-2 rounded-r-[14px] shadow-[inset_-1px_0_2px_rgba(255,255,255,0.4)] cursor-pointer active:shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] transition-all"
          style={{
            background: 'linear-gradient(180deg, #3c9d4e 0%, #4bad5b 8%, #368e46 40%, #247531 88%, #1a5c24 100%)',
            borderRight: '1px solid #1a5c24',
            borderTop: '1px solid #7de38d',
          }}
          onClick={(e) => {
            e.stopPropagation()
            soundManager.playClick()
            toggleStartMenu()
          }}
        >
          <div className="grid grid-cols-2 gap-[1.5px] rotate-[-5deg] scale-100 origin-center">
            <div className="w-3 h-3 bg-gradient-to-br from-red-500 to-red-600 rounded-tl-[3px] shadow-sm shadow-red-500/20" style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 85%)' }} />
            <div className="w-3 h-3 bg-gradient-to-br from-green-500 to-green-600 rounded-tr-[3px] shadow-sm shadow-green-500/20" style={{ clipPath: 'polygon(0 0, 100% 15%, 100% 85%, 0 100%)' }} />
            <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-bl-[3px] shadow-sm shadow-blue-500/20" style={{ clipPath: 'polygon(0 0, 100% 15%, 100% 100%, 0 85%)' }} />
            <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-br-[3px] shadow-sm shadow-yellow-500/20" style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0 100%)' }} />
          </div>
          <span className="text-white font-bold italic text-lg drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)] tracking-wide pt-0.5">start</span>
        </button>
      </XpTooltip>

      {/* Open windows in taskbar */}
      <div className="flex-1 flex items-center gap-1 ml-2 h-full py-1 overflow-x-auto">
        {windows.map((win) => (
          <motion.button
            key={win.id}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            onClick={() => handleWindowClick(win.id, win.minimized)}
            className={`h-full min-w-[120px] max-w-[160px] px-2 rounded-sm text-xs font-semibold truncate flex items-center transition-all duration-75 cursor-pointer ${
              win.minimized
                ? 'bg-blue-600/50 text-white/80 border border-blue-400/20 hover:bg-blue-500/60'
                : 'bg-blue-400 text-white border border-blue-200/50 shadow-[inset_0_0_4px_rgba(255,255,255,0.4)]'
            }`}
          >
            {win.title}
          </motion.button>
        ))}
      </div>

      {/* System tray */}
      <div className="flex items-center gap-2 mr-3 shrink-0 h-full border-l border-[#1a5c24]/30 pl-3 relative">
        
        {/* The Welcome Balloon (Absolute positioning relative to system tray) */}
        <AnimatePresence>
          {showWelcomeBalloon && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-11 right-[100px] w-[300px] bg-[#ffffe1] border border-black/70 rounded-md shadow-md p-3 z-[10000] text-black/90 cursor-default"
            >
              <button 
                onClick={() => setShowWelcomeBalloon(false)}
                className="absolute top-1.5 right-1.5 w-4 h-4 text-black/40 hover:text-black hover:bg-black/10 flex items-center justify-center rounded-sm font-bold text-xs leading-none pb-0.5"
              >
                x
              </button>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-serif italic font-bold shadow-sm pb-1 leading-none text-sm">
                  i
                </div>
                <div className="font-bold text-[13px]">Welcome to ShanOS</div>
              </div>
              <div className="text-xs leading-relaxed ml-7">
                A faithful XP-inspired interface, custom-built to showcase my work and attention to detail.
                <div className="mt-2 text-black/80">
                  Get Started: <button onClick={openAboutMe} className="text-blue-700 hover:underline cursor-pointer">About Me</button> | <button onClick={openProjects} className="text-blue-700 hover:underline cursor-pointer">My Projects</button>
                </div>
              </div>
              
              {/* Pointing triangle below balloon */}
              <div className="absolute -bottom-[8px] right-6 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-black/70" />
              <div className="absolute -bottom-[7px] right-[25px] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-transparent border-t-[#ffffe1]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* System tray static XP icons (Mocked aesthetics from user screenshot) */}
        <XpTooltip text="System Information">
          <div className="w-[18px] h-[18px] relative rounded-full bg-blue-100 flex items-center justify-center shadow-inner cursor-pointer" onClick={() => setShowWelcomeBalloon(true)}>
            <div className="w-[16px] h-[16px] rounded-full bg-gradient-to-b from-blue-300 to-blue-600 text-white flex items-center justify-center font-serif italic text-[11px] font-bold shadow-sm pb-1 leading-none">
              i
            </div>
          </div>
        </XpTooltip>

        <XpTooltip text="Windows Security Alerts">
          <div className="w-[18px] h-[18px] relative flex items-center justify-center drop-shadow-sm cursor-help">
            <div className="w-4 h-4 bg-gradient-to-b from-green-400 to-green-700 text-white flex items-center justify-center shadow-sm pb-1 pt-0.5 leading-none" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
               <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
               </svg>
            </div>
          </div>
        </XpTooltip>

        <XpTooltip text="Safely Remove Hardware">
          <div className="w-[18px] h-[18px] relative flex shadow-sm items-center justify-center cursor-help">
             {/* Tiny block icon with blue circle overlap */}
             <div className="w-3.5 h-3.5 bg-gray-200 border-b-2 border-r-2 border-gray-400 absolute top-0 left-0" />
             <div className="w-3 h-3 rounded-full bg-blue-500 text-white flex items-center justify-center font-serif italic text-[8px] font-bold absolute bottom-0 right-0 z-10 pb-0.5">
               i
             </div>
          </div>
        </XpTooltip>

        <div className="w-px h-6 bg-green-900/40 mx-1" />

        {/* Utility Buttons */}
        <XpTooltip text="Toggle Fullscreen">
          <button
            onClick={() => {
              soundManager.playClick();
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              } else {
                if (document.exitFullscreen) document.exitFullscreen();
              }
            }}
            className="w-5 h-5 flex items-center justify-center hover:bg-white/20 rounded cursor-pointer group relative"
          >
            <svg className="w-3.5 h-3.5 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </XpTooltip>

        <XpTooltip text={`CRT Effects: ${crtEnabled ? 'ON' : 'OFF'}`}>
          <button
            onClick={() => {
              soundManager.playClick();
              document.body.classList.toggle('crt');
              setCrtEnabled(!crtEnabled);
            }}
            className="w-5 h-5 flex items-center justify-center hover:bg-white/20 rounded cursor-pointer relative"
          >
            <svg className={`w-3.5 h-3.5 drop-shadow-sm transition-colors ${crtEnabled ? 'text-green-300' : 'text-white/80'}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
          </button>
        </XpTooltip>

        <SoundToggle />

        {/* Clock */}
        <div className="text-[12px] text-white/90 font-bold min-w-[65px] text-right ml-1 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] cursor-default">
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
    <XpTooltip text={soundEnabled ? 'Volume: ON' : 'Volume: Muted'}>
      <button
        onClick={() => {
          toggleSound()
          soundManager.playClick()
        }}
        className="w-5 h-5 flex items-center justify-center hover:bg-white/20 rounded cursor-pointer"
      >
        <span className="text-xs drop-shadow-sm">{soundEnabled ? '🔊' : '🔇'}</span>
      </button>
    </XpTooltip>
  )
}
