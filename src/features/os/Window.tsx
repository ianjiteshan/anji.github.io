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
  const updateWindowSize = useWindowStore((s) => s.updateWindowSize)

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
  const currentWidth = win.width || width
  const currentHeight = win.height || height

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation()
    e.preventDefault()

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = currentWidth
    const startHeight = currentHeight
    const startWinX = win.x || 0
    const startWinY = win.y || 0

    const handleMouseMove = (moveEvent: MouseEvent) => {
      let newWidth = startWidth
      let newHeight = startHeight
      let newX = startWinX
      let newY = startWinY

      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY

      if (direction.includes('e')) newWidth += deltaX
      if (direction.includes('w')) {
        newWidth -= deltaX
        newX += deltaX
      }
      if (direction.includes('s')) newHeight += deltaY
      if (direction.includes('n')) {
        newHeight -= deltaY
        newY += deltaY
      }

      const minW = win.minWidth || 300
      const minH = win.minHeight || 200

      if (newWidth < minW) {
        if (direction.includes('w')) {
          newX += newWidth - minW
        }
        newWidth = minW
      }
      if (newHeight < minH) {
        if (direction.includes('n')) {
          newY += newHeight - minH
        }
        newHeight = minH
      }

      updateWindowSize(id, newWidth, newHeight, newX, newY)
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const renderResizeHandles = () => {
    if (isMaximized) return null
    return (
      <>
        <div className="absolute top-0 left-0 w-full h-[6px] hover:bg-blue-400/30 cursor-n-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'n')} />
        <div className="absolute bottom-0 left-0 w-full h-[6px] hover:bg-blue-400/30 cursor-s-resize z-50" onMouseDown={(e) => handleResizeStart(e, 's')} />
        <div className="absolute top-0 left-0 w-[6px] h-full hover:bg-blue-400/30 cursor-w-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'w')} />
        <div className="absolute top-0 right-0 w-[6px] h-full hover:bg-blue-400/30 cursor-e-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'e')} />
        <div className="absolute top-0 left-0 w-3 h-3 hover:bg-blue-400/50 cursor-nw-resize z-[60]" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
        <div className="absolute top-0 right-0 w-3 h-3 hover:bg-blue-400/50 cursor-ne-resize z-[60]" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
        <div className="absolute bottom-0 left-0 w-3 h-3 hover:bg-blue-400/50 cursor-sw-resize z-[60]" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
        <div className="absolute bottom-0 right-0 w-3 h-3 hover:bg-blue-400/50 cursor-se-resize z-[60]" onMouseDown={(e) => handleResizeStart(e, 'se')} />
      </>
    )
  }

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
          className="absolute pointer-events-auto"
          style={{
            zIndex: win.zIndex,
            width: isMaximized ? '100vw' : currentWidth,
            height: isMaximized ? 'calc(100vh - 44px)' : currentHeight,
          }}
          onMouseDown={handleFocus}
        >
          {renderResizeHandles()}
          <div className="w-full h-full flex flex-col rounded-lg overflow-hidden shadow-2xl shadow-black/40 win7-glass">
            {/* Title bar */}
            <div 
              className="window-titlebar flex items-center justify-between px-3 py-1.5 bg-gradient-to-b from-[rgba(120,170,240,0.6)] to-[rgba(60,110,190,0.8)] border-b border-white/20 cursor-move select-none shrink-0"
              onDoubleClick={handleMaximize}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs">🖥️</span>
                <span className="text-sm text-white font-medium truncate max-w-[300px] drop-shadow-md">
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
                  className="titlebar-btn titlebar-btn-close bg-red-500/80 hover:bg-red-500"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-[rgba(10,15,30,0.85)] relative">
              {children}
            </div>
          </div>
        </motion.div>
      </Draggable>
    </AnimatePresence>
  )
}
