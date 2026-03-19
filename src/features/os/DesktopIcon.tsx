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
      className="desktop-icon w-[90px] flex flex-col items-center gap-1.5 cursor-pointer relative z-10"
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon.startsWith('data:image') || icon.startsWith('http') ? (
        <img
          src={icon}
          alt={title}
          className="w-14 h-14 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] pointer-events-none select-none"
          draggable={false}
        />
      ) : (
        <div className="text-5xl drop-shadow-lg">{icon}</div>
      )}
      <span className="text-[13px] text-white text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-medium px-1 rounded-sm selection:bg-transparent">
        {title}
      </span>
    </motion.div>
  )
}
