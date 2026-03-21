import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAssetPath } from '@/core/utils/assets'

type LoadingSequenceProps = {
  phase: number
}

export default function LoadingSequence({ phase }: LoadingSequenceProps) {
  const [loadingText, setLoadingText] = useState('Initializing takeover...')

  useEffect(() => {
    if (phase === 2) {
      const texts = ['Initializing takeover...', 'Bypassing security protocols...', 'Loading Empire Modules...', 'Takeover complete.']
      let i = 0
      const interval = setInterval(() => {
        i++
        if (i < texts.length) {
          setLoadingText(texts[i])
        }
      }, 800)
      return () => clearInterval(interval)
    }
  }, [phase])

  return (
    <AnimatePresence>
      {phase > 0 && phase < 3 && (
        <motion.div
          key="empire-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Global Scanlines & Noise */}
          <div className="pointer-events-none absolute inset-0 z-10 opacity-20 pointer-events-none"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               }}
          />
          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40 mix-blend-overlay" />

          {/* Phase 1: Interruption */}
          {phase === 1 && (
            <motion.div
              initial={{ filter: 'blur(10px)', scale: 1.1, x: -10 }}
              animate={{ filter: 'blur(0px)', scale: 1, x: 0 }}
              exit={{ opacity: 0, filter: 'blur(5px)', scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative z-20 text-center"
            >
              <div className="font-mono text-xl text-red-500 tracking-widest uppercase"
                   style={{
                     textShadow: '2px 0 2px rgba(255,0,0,0.8), -2px 0 2px rgba(0,255,0,0.3)',
                     animation: 'glitch-skew 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite'
                   }}>
                [SYSTEM WARNING]
              </div>
              <div className="mt-4 font-mono text-sm text-red-400/80 tracking-widest uppercase"
                   style={{
                     textShadow: '0 0 10px rgba(255,0,0,0.5)',
                     animation: 'glitch-flash 0.5s ease infinite alternate'
                   }}>
                Unauthorized override detected...
              </div>
            </motion.div>
          )}

          {/* Phase 2: Rockstar-style Loading */}
          {phase === 2 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: 'brightness(0) blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'brightness(1) blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="relative z-20 flex flex-col items-center"
            >
              {/* SHAN Logo with severe bloom/glow */}
              <div className="relative">
                <h1 className="text-7xl md:text-9xl font-black uppercase text-[#ff2a2a] tracking-tight"
                    style={{
                      fontFamily: 'impact, sans-serif',
                      textShadow: `
                        0 0 20px rgba(255,42,42,0.8),
                        0 0 40px rgba(255,42,42,0.6),
                        0 0 80px rgba(255,42,42,0.4),
                        0 0 120px rgba(255,42,42,0.2)
                      `,
                      animation: 'logo-pulse 2s ease-in-out infinite alternate, logo-flicker 0.15s infinite'
                    }}>
                  SHAN
                </h1>
                {/* Internal Glow Overlay */}
                <h1 className="absolute inset-0 text-7xl md:text-9xl font-black uppercase text-white mix-blend-overlay opacity-80 pointer-events-none tracking-tight"
                    style={{ fontFamily: 'impact, sans-serif' }}>
                  SHAN
                </h1>
              </div>

              {/* Loading Bar & Text */}
              <div className="mt-16 w-64 max-w-full flex flex-col items-center">
                <div className="h-0.5 w-full bg-red-900/40 rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(255,0,0,0.3)]">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#ff2a2a] shadow-[0_0_10px_rgba(255,42,42,1)]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: 'easeInOut' }}
                  />
                </div>
                <div className="mt-4 font-mono text-[10px] text-red-500/70 tracking-[0.3em] uppercase opacity-80"
                     style={{ animation: 'text-flicker 3s infinite' }}>
                  {loadingText}
                </div>
              </div>
            </motion.div>
          )}
          
          <style>{`
            @keyframes glitch-skew {
              0% { transform: skew(0deg); }
              20% { transform: skew(-10deg); }
              21% { transform: skew(0deg); }
              40% { transform: skew(10deg); }
              41% { transform: skew(0deg); }
              100% { transform: skew(0deg); }
            }
            @keyframes glitch-flash {
              0% { opacity: 0.7; }
              100% { opacity: 1; }
            }
            @keyframes logo-pulse {
              0% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(255,42,42,0.6)); }
              100% { transform: scale(1.05); filter: drop-shadow(0 0 40px rgba(255,42,42,1)); }
            }
            @keyframes logo-flicker {
              0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
              20%, 24%, 55% { opacity: 0.8; }
            }
            @keyframes text-flicker {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
