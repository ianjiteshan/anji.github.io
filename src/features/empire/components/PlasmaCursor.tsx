import React, { useEffect, useRef, useState } from 'react'

export default function PlasmaCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const aura1Ref = useRef<HTMLDivElement>(null)
  const aura2Ref = useRef<HTMLDivElement>(null)
  const aura3Ref = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>(0)
  
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const cursorDotPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const aura1Pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const aura2Pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const aura3Pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  const [clicked, setClicked] = useState(false)

  // Track mouse movement
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
    }
    
    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  // Animation Loop for Physics Lag
  useEffect(() => {
    const render = () => {
      // Linear Interpolation for trailing effect
      // Dot moves fast (the core) - Snappy!
      cursorDotPos.current.x += (mousePos.current.x - cursorDotPos.current.x) * 0.9
      cursorDotPos.current.y += (mousePos.current.y - cursorDotPos.current.y) * 0.9
      
      // Aura 1 follows dot closely
      aura1Pos.current.x += (cursorDotPos.current.x - aura1Pos.current.x) * 0.7
      aura1Pos.current.y += (cursorDotPos.current.y - aura1Pos.current.y) * 0.7

      // Aura 2 follows Aura 1
      aura2Pos.current.x += (aura1Pos.current.x - aura2Pos.current.x) * 0.5
      aura2Pos.current.y += (aura1Pos.current.y - aura2Pos.current.y) * 0.5

      // Aura 3 follows Aura 2 (tail end)
      aura3Pos.current.x += (aura2Pos.current.x - aura3Pos.current.x) * 0.3
      aura3Pos.current.y += (aura2Pos.current.y - aura3Pos.current.y) * 0.3

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${cursorDotPos.current.x}px, ${cursorDotPos.current.y}px, 0) translate(-50%, -50%) ${clicked ? 'scale(0.8)' : 'scale(1)'}`
      }
      if (aura1Ref.current) {
        aura1Ref.current.style.transform = `translate3d(${aura1Pos.current.x}px, ${aura1Pos.current.y}px, 0) translate(-50%, -50%) ${clicked ? 'scale(1.2)' : 'scale(1)'}`
      }
      if (aura2Ref.current) {
        aura2Ref.current.style.transform = `translate3d(${aura2Pos.current.x}px, ${aura2Pos.current.y}px, 0) translate(-50%, -50%) ${clicked ? 'scale(1.5)' : 'scale(1)'}`
      }
      if (aura3Ref.current) {
        aura3Ref.current.style.transform = `translate3d(${aura3Pos.current.x}px, ${aura3Pos.current.y}px, 0) translate(-50%, -50%) ${clicked ? 'scale(1.8)' : 'scale(1)'}`
      }

      requestRef.current = requestAnimationFrame(render)
    }

    requestRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(requestRef.current!)
  }, [clicked])

  return (
    <>
      {/* Hide default cursor via styled injection (since applying it to body via class won't auto-override all elements due to specificity) */}
      <style>{`
        body.empire-active, body.empire-active * {
          cursor: none !important;
        }
      `}</style>
      
      <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
        {/* The trailing Auras */}
        <div
          ref={aura3Ref}
          className="absolute top-0 left-0 h-24 w-24 rounded-full bg-red-900/10 mix-blend-screen transition-transform duration-75"
          style={{ filter: 'blur(16px)', willChange: 'transform' }}
        />
        <div
          ref={aura2Ref}
          className="absolute top-0 left-0 h-16 w-16 rounded-full bg-red-600/30 mix-blend-screen transition-transform duration-75"
          style={{ filter: 'blur(10px)', willChange: 'transform' }}
        />
        <div
          ref={aura1Ref}
          className="absolute top-0 left-0 h-8 w-8 rounded-full bg-red-500/50 mix-blend-screen transition-transform duration-75"
          style={{
            filter: 'blur(4px)',
            willChange: 'transform',
            boxShadow: '0 0 20px rgba(255,0,0,0.8), inset 0 0 10px rgba(255,100,100,0.6)'
          }}
        />
        {/* The sharp Dot */}
        <div
          ref={dotRef}
          className="absolute top-0 left-0 h-2 w-2 rounded-full bg-white mix-blend-screen transition-transform duration-75"
          style={{
            willChange: 'transform',
            boxShadow: '0 0 10px #fff, 0 0 20px #ff2a2a, 0 0 30px #ff2a2a'
          }}
        />
        {/* Ripple effect on click */}
        {clicked && (
          <div 
            className="absolute top-0 left-0 h-32 w-32 rounded-full border-2 border-red-500/80 -translate-x-1/2 -translate-y-1/2 animate-ping"
            style={{
              left: mousePos.current.x,
              top: mousePos.current.y,
              willChange: 'transform',
              animationDuration: '0.4s'
            }}
          />
        )}
      </div>
    </>
  )
}
