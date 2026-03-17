import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useWindowStore } from '@/core/store/useWindowStore'
import { soundManager } from '@/core/utils/sounds'

interface DesktopIconProps {
  id: string
  title: string
  icon: string
  component: string
  x?: number
  y?: number
  width?: number
  height?: number
}

export default function DesktopIcon({
  id,
  title,
  icon,
  component,
  x = 100,
  y = 100,
  width = 700,
  height = 500,
}: DesktopIconProps) {
  const openWindow = useWindowStore((s) => s.openWindow)

  const handleDoubleClick = useCallback(() => {
    soundManager.playClick()
    openWindow({
      id,
      title,
      component,
      x: 60 + Math.random() * 100,
      y: 30 + Math.random() * 60,
      width,
      height,
    })
  }, [id, title, component, openWindow, width, height])

  return (
    <motion.div
      className="desktop-icon w-20 flex flex-col items-center gap-1.5"
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-4xl drop-shadow-lg">{icon}</div>
      <span className="text-[11px] text-white text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-medium">
        {title}
      </span>
    </motion.div>
  )
}
