import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Howl } from 'howler'
import { getAssetPath } from '@/core/utils/assets'
import LoadingSequence from './components/LoadingSequence'
import LightsaberBorders from './components/LightsaberBorders'
import PlasmaCursor from './components/PlasmaCursor'
import SystemNodeMap from './components/SystemNodeMap'
import TerminalUnlock from './components/TerminalUnlock'
import GeminiCore from './components/GeminiCore'
import { motion, AnimatePresence } from 'framer-motion'
import { useSystemStore } from '@/core/store/useSystemStore'

type EmpireManagerProps = {
  onExit: () => void
}

/**
 * Phases:
 * 0: Inactive
 * 1: System Interruption (Glitch + Warning) -> ~1.5s
 * 2: Loading Sequence (SHAN logo + Progress) -> ~3s
 * 3: Active Takeover UI (Lightsabers, Cursor, Transformed DOM)
 */
export default function EmpireManager({ onExit }: EmpireManagerProps) {
  const [phase, setPhase] = useState<number>(0)
  const audioRef = useRef<Howl | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const requestRef = useRef<number>(0)

  // Start sequence natively
  useEffect(() => {
    // Prevent scrolling while in phase 1 & 2
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    setPhase(1)

    // Setup glitch sound
    const glitchSfx = new Howl({
      src: [getAssetPath('sounds/glitch.mp3')],
      volume: 0.4,
      loop: false,
    })
    
    // We might not have a glitch.mp3, ignore if it fails
    glitchSfx.play()

    const phase1Timer = setTimeout(() => {
      setPhase(2)
      
      const phase2Timer = setTimeout(() => {
        setPhase(3)
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
      }, 3500) // Phase 2 lasts 3.5 seconds

      return () => clearTimeout(phase2Timer)
    }, 1500) // Phase 1 lasts 1.5 seconds

    return () => {
      clearTimeout(phase1Timer)
      glitchSfx.unload()
    }
  }, [])

  // Start MP3 Music on Phase 3
  useEffect(() => {
    if (phase === 3) {
      // Add global class for CSS transformations
      document.body.classList.add('empire-active')

      audioRef.current = new Howl({
        src: [getAssetPath('sounds/Empire.mp3')],
        html5: false, // Must be false to use Web Audio API routing for the Analyser
        volume: 0.0,
        loop: true,
        onload: () => {
          // Setup Audio Analyser
          try {
            const howlerContext = Howler.ctx
            const howlerMaster = Howler.masterGain
            if (howlerContext && howlerMaster) {
              const analyser = howlerContext.createAnalyser()
              analyser.fftSize = 64
              howlerMaster.connect(analyser)
              analyserRef.current = analyser
              dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
            }
          } catch (e) {
            console.warn('Audio visualization not supported on this device/browser')
          }
        }
      })

      audioRef.current.play()
      audioRef.current.fade(0, 0.7, 2000)

      // Audio Reactivity Loop + Mouse Tracking
      const onMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20 // -10 to 10
        const y = (e.clientY / window.innerHeight - 0.5) * 20
        document.documentElement.style.setProperty('--empire-mouse-x', `${x}px`)
        document.documentElement.style.setProperty('--empire-mouse-y', `${y}px`)
      }
      window.addEventListener('mousemove', onMouseMove)

      const loop = () => {
        if (analyserRef.current && dataArrayRef.current) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          analyserRef.current.getByteFrequencyData(dataArrayRef.current as any)
          
          // Focus on bass frequencies (first few bins)
          const bassIn = dataArrayRef.current.slice(0, 4)
          const bassAverage = bassIn.reduce((a, b) => a + b, 0) / bassIn.length
          // Normalize to 0 - 1
          const bassIntensity = Math.min(bassAverage / 255 * 1.5, 1)

          document.documentElement.style.setProperty('--empire-bass-glow', `${bassIntensity}`)
          document.documentElement.style.setProperty('--empire-bass-scale', `${1 + (bassIntensity * 0.03)}`)
        }
        requestRef.current = requestAnimationFrame(loop)
      }
      loop()

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        cancelAnimationFrame(requestRef.current)
      }
    }

    return () => {
      if (phase === 3) {
        document.body.classList.remove('empire-active')
      }
    }
  }, [phase])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.fade(0.7, 0, 1500)
        setTimeout(() => {
          audioRef.current?.unload()
        }, 1500)
      }
      document.body.classList.remove('empire-active')
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  const handleExit = () => {
    // Trigger fade out
    if (audioRef.current) {
      audioRef.current.fade(0.7, 0, 1000)
    }
    // Remove global classes early
    document.body.classList.remove('empire-active')
    setTimeout(() => {
      onExit()
    }, 1000)
  }

  return (
    <>
      {createPortal(<LoadingSequence phase={phase} />, document.body)}

      {phase === 3 && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="pointer-events-none fixed inset-0 z-40 transition-transform duration-75"
            style={{
              transform: 'translate(var(--empire-mouse-x, 0px), var(--empire-mouse-y, 0px)) perspective(1000px) scale(var(--empire-bass-scale, 1))',
            }}
          >
            {/* Dark Glitch Overlay (Extreme Premium detail) */}
            <div className="absolute inset-0 mix-blend-overlay opacity-50 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,0,0.1)_3px,rgba(255,0,0,0.1)_4px)] pointer-events-none z-0" />
            
            <LightsaberBorders />
            <PlasmaCursor />
            <div className="pointer-events-auto absolute bottom-6 right-6 z-50">
              <button
                onClick={handleExit}
                className="group flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/60 px-4 py-2 font-mono text-xs uppercase text-red-400 backdrop-blur-md transition-all hover:border-red-500 hover:bg-red-900/80 hover:text-white"
                style={{
                  boxShadow: '0 0 15px rgba(255,42,42,0.2)'
                }}
              >
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Disengage Empire
              </button>
            </div>

            {/* System Node Map can be interactive within */}
            <SystemNodeMap />
            
            <GeminiCore />
            
            <TerminalUnlock />
          </motion.div>
        </AnimatePresence>,
        document.body
      )}

      {/* Global Styles for Transformed UI */}
      {phase === 3 && (
        <style dangerouslySetInnerHTML={{__html: `
          .empire-active {
            --tw-bg-opacity: 1 !important;
            background-color: #030000 !important;
            color: #ff2a2a !important;
            transition: all 0.3s ease-out;
          }
          
          /* Full Page Hacked Parallax - The whole DOM shakes slightly based on mouse and audio! */
          .empire-active > div:first-child {
            transition: transform 0.1s linear;
            transform: translate(calc(var(--empire-mouse-x, 0px) * -0.5), calc(var(--empire-mouse-y, 0px) * -0.5)) scale(var(--empire-bass-scale, 1));
            filter: saturate(calc(1 + var(--empire-bass-glow, 0) * 0.5));
          }

          /* Empire Scrollbar Overrides */
          .empire-active::-webkit-scrollbar-thumb,
          .empire-active ::-webkit-scrollbar-thumb {
            background: rgba(255, 42, 42, calc(0.3 + var(--empire-bass-glow, 0) * 0.5)) !important;
            box-shadow: inset 0 0 4px rgba(255,42,42,0.8);
            border-radius: 10px;
          }
          .empire-active::-webkit-scrollbar-thumb:hover,
          .empire-active ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 42, 42, 0.8) !important;
            box-shadow: inset 0 0 10px rgba(255,42,42,1);
          }
          .empire-active * {
            border-color: rgba(255, 42, 42, calc(0.2 + var(--empire-bass-glow, 0) * 0.2)) !important;
          }
          .empire-active h1, .empire-active h2, .empire-active h3 {
            color: #ff0000 !important;
            text-shadow: 0 0 calc(10px + var(--empire-bass-glow, 0) * 20px) rgba(255, 0, 0, 0.8),
                         2px 2px 0px rgba(100,0,0,0.5) !important;
          }
          .empire-active p, .empire-active span {
            color: rgba(255, 80, 80, 0.9) !important;
          }
          .empire-active .bg-white, .empire-active .bg-black, .empire-active .bg-[#111111] {
            background-color: rgba(15, 0, 0, 0.85) !important;
          }
          
          /* Extreme Buttons Glow */
          .empire-active a:hover, .empire-active button:hover, .empire-active .group:hover {
            color: #fff !important;
            text-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 30px #ff2a2a !important;
            box-shadow: inset 0 0 30px rgba(255, 0, 0, 0.4), 0 0 40px rgba(255, 0, 0, 0.9) !important;
            background-color: rgba(220, 0, 0, 0.2) !important;
            border-color: rgba(255, 0, 0, 1) !important;
            transform: scale(1.02) translateY(-2px);
            z-index: 10;
          }

          /* Global Intense Vignette and Pulse */
          .empire-active::before {
            content: '';
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: radial-gradient(circle at calc(50% + var(--empire-mouse-x, 0px)) calc(50% + var(--empire-mouse-y, 0px)), 
                        rgba(200, 0, 0, calc(0.05 + var(--empire-bass-glow, 0) * 0.05)) 0%, 
                        rgba(0,0,0,0.8) 120%);
            pointer-events: none;
            z-index: 20;
            mix-blend-mode: multiply;
          }

        `}} />
      )}
    </>
  )
}
