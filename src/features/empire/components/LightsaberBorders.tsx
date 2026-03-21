import React from 'react'
import { motion } from 'framer-motion'

export default function LightsaberBorders() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden mix-blend-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-[4px] rounded-lg border-[2px] border-white/20 bg-transparent"
        style={{
          boxShadow: `
            inset 0 0 calc(20px + var(--empire-bass-glow, 0) * 20px) rgba(255, 42, 42, 0.6),
            inset 0 0 calc(50px + var(--empire-bass-glow, 0) * 40px) rgba(138, 43, 226, 0.3),
            0 0 calc(20px + var(--empire-bass-glow, 0) * 20px) rgba(255, 42, 42, 0.8),
            0 0 calc(60px + var(--empire-bass-glow, 0) * 60px) rgba(91, 0, 255, 0.6),
            0 0 calc(120px + var(--empire-bass-glow, 0) * 100px) rgba(25, 0, 100, 0.4)
          `,
          animation: 'lightsaber-flicker 0.1s infinite'
        }}
      />
      
      {/* Dark Force Corner Nodes (Gemini Colors but corrupted) */}
      <div className="absolute top-0 left-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff2a2a] blur-[40px] mix-blend-screen" style={{ opacity: 'calc(0.4 + var(--empire-bass-glow, 0))' }} />
      <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8a2be2] blur-[40px] mix-blend-screen" style={{ opacity: 'calc(0.4 + var(--empire-bass-glow, 0))' }} />
      <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#0000bf] blur-[40px] mix-blend-screen" style={{ opacity: 'calc(0.4 + var(--empire-bass-glow, 0))' }} />
      <div className="absolute bottom-0 right-0 h-32 w-32 translate-x-1/2 translate-y-1/2 rounded-full bg-[#d600ff] blur-[40px] mix-blend-screen" style={{ opacity: 'calc(0.4 + var(--empire-bass-glow, 0))' }} />

      <style>{`
        @keyframes lightsaber-pulse {
          0% { opacity: 0.8; transform: scale(1); filter: brightness(1); }
          100% { opacity: 1; transform: scale(1.002); filter: brightness(1.2); }
        }
        @keyframes lightsaber-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.95; }
        }
      `}</style>
    </div>
  )
}
