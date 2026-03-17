import { useRef, useCallback, type ReactNode } from 'react'
import Draggable, { type DraggableEvent, type DraggableData } from 'react-draggable'
import { motion, AnimatePresence } from 'framer-motion'
import { useWindowStore } from '@/core/store/useWindowStore'
import { soundManager } from '@/core/utils/sounds'

interface WindowProps {
  id: string
  title: string
  children: ReactNode
  width?: number
  height?: number
}

export default function Window({ id, title, children, width = 700, height = 500 }: WindowProps) {
  const nodeRef = useRef<HTMLDivElement>(null!)
  const win = useWindowStore((s) => s.windows.find((w) => w.id === id))
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow)
  const maximizeWindow = useWindowStore((s) => s.maximizeWindow)
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const updateWindowPosition = useWindowStore((s) => s.updateWindowPosition)

  const handleClose = useCallback(() => {
    soundManager.playClose()
    closeWindow(id)
  }, [id, closeWindow])

  const handleMinimize = useCallback(() => {
    soundManager.playClick()
    minimizeWindow(id)
  }, [id, minimizeWindow])

  const handleMaximize = useCallback(() => {
    soundManager.playClick()
    maximizeWindow(id)
  }, [id, maximizeWindow])

  const handleFocus = useCallback(() => {
    focusWindow(id)
  }, [id, focusWindow])

  const handleDragStop = useCallback(
    (_e: DraggableEvent, data: DraggableData) => {
      updateWindowPosition(id, data.x, data.y)
    },
    [id, updateWindowPosition]
  )

  if (!win || win.minimized) return null

  const isMaximized = win.maximized

  return (
    <AnimatePresence>
      <Draggable
        nodeRef={nodeRef}
        handle=".window-titlebar"
        bounds="parent"
        position={isMaximized ? { x: 0, y: 0 } : { x: win.x, y: win.y }}
        onStop={handleDragStop}
        disabled={isMaximized}
      >
        <motion.div
          ref={nodeRef}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute"
          style={{
            zIndex: win.zIndex,
            width: isMaximized ? '100%' : width,
            height: isMaximized ? 'calc(100% - 48px)' : height,
          }}
          onMouseDown={handleFocus}
        >
          <div className="w-full h-full flex flex-col rounded-lg overflow-hidden shadow-2xl shadow-black/40 win7-glass">
            {/* Title bar */}
            <div className="window-titlebar flex items-center justify-between px-3 py-1.5 bg-gradient-to-b from-[rgba(120,170,240,0.4)] to-[rgba(60,110,190,0.3)] border-b border-white/10 cursor-move select-none shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs">🖥️</span>
                <span className="text-sm text-white/90 font-medium truncate max-w-[300px]">
                  {title}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleMinimize}
                  className="titlebar-btn titlebar-btn-minimize"
                  title="Minimize"
                >
                  ─
                </button>
                <button
                  onClick={handleMaximize}
                  className="titlebar-btn titlebar-btn-maximize"
                  title={isMaximized ? 'Restore' : 'Maximize'}
                >
                  {isMaximized ? '❐' : '□'}
                </button>
                <button
                  onClick={handleClose}
                  className="titlebar-btn titlebar-btn-close"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-[rgba(10,15,30,0.85)]">
              {children}
            </div>
          </div>
        </motion.div>
      </Draggable>
    </AnimatePresence>
  )
}
