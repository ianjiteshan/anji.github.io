import { useEffect, useRef } from 'react'
import { useSystemStore } from '@/core/store/useSystemStore'

export default function FlashlightCursor() {
  const flashlightMode = useSystemStore((s) => s.flashlightMode)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!flashlightMode) return

    const handleMouseMove = (e: MouseEvent) => {
      if (overlayRef.current) {
        overlayRef.current.style.setProperty('--mouse-x', `${e.clientX}px`)
        overlayRef.current.style.setProperty('--mouse-y', `${e.clientY}px`)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [flashlightMode])

  if (!flashlightMode) return null

  return <div ref={overlayRef} className="flashlight-overlay" />
}
