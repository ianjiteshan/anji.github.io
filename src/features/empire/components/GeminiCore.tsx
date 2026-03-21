import React from 'react'

export default function GeminiCore() {
  return (
    <div className="pointer-events-auto fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center">
      
      {/* Container for the fluid auras */}
      <div 
        className="relative flex items-center justify-center"
        style={{
          // React to audio bass
          transform: 'scale(calc(1 + var(--empire-bass-glow, 0) * 0.4))',
          transition: 'transform 0.1s linear'
        }}
      >
        {/* The fluid rotating gradients behind the star */}
        <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 h-32 w-32 scale-0 group-hover:scale-100 transition-transform">
           {/* These blur layers create the Gemini effect */}
           <div className="absolute top-0 left-0 h-24 w-24 bg-[#4285f4] rounded-full mix-blend-screen animate-blob filter blur-[20px] opacity-80" />
           <div className="absolute top-0 right-0 h-24 w-24 bg-[#ea4335] rounded-full mix-blend-screen animate-blob animation-delay-2000 filter blur-[20px] opacity-80" />
           <div className="absolute bottom-4 left-6 h-24 w-24 bg-[#fbbc05] rounded-full mix-blend-screen animate-blob animation-delay-4000 filter blur-[20px] opacity-80" />
           <div className="absolute bottom-0 right-0 h-24 w-24 bg-[#9f65f6] rounded-full mix-blend-screen animate-blob animation-delay-6000 filter blur-[20px] opacity-80" />
           
           {/* Intense audio-reactive core glow */}
           <div 
            className="absolute inset-0 bg-white rounded-full mix-blend-overlay filter blur-[15px]"
            style={{ opacity: 'calc(0.2 + var(--empire-bass-glow, 0) * 0.8)' }}
           />
        </div>

        {/* The 4-pointed star (Gemini shape) */}
        <div className="relative z-10 w-10 h-10 animate-pulse-slow">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
            <defs>
              <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbc05" />
                <stop offset="30%" stopColor="#ea4335" />
                <stop offset="70%" stopColor="#9f65f6" />
                <stop offset="100%" stopColor="#4285f4" />
              </linearGradient>
            </defs>
            <path
              d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z"
              fill="url(#geminiGrad)"
            />
          </svg>
        </div>
      </div>

      {/* Tiny text underneath */}
      <div 
        className="mt-6 font-mono text-[9px] uppercase tracking-[0.3em] text-white/50"
        style={{
          textShadow: '0 0 5px rgba(255,255,255,0.3)',
          opacity: 'calc(0.4 + var(--empire-bass-glow, 0) * 0.6)'
        }}
      >
        Neural Core Active
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(15px, -25px) scale(1.1); }
          66% { transform: translate(-10px, 10px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 4s infinite alternate ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}
