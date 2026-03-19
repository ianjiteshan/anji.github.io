import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useSystemStore } from '@/core/store/useSystemStore'
import { useIsMobile } from '@/core/hooks/useIsMobile'
import BootScreen from '@/features/boot/BootScreen'
import LoginScreen from '@/features/boot/LoginScreen'
import FlashlightCursor from '@/features/effects/FlashlightCursor'

// Lazy load heavy components
const Desktop = lazy(() => import('@/features/os/Desktop'))
const ShutdownScreen = lazy(() => import('@/features/effects/ShutdownScreen'))
const RecruiterMode = lazy(() => import('@/features/recruiter/RecruiterMode'))
const FORCE_OS_MODE_KEY = 'shanos-force-os-mode'

function LoadingFallback() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-blue-400/50 text-sm font-mono">Loading module...</div>
    </div>
  )
}

export default function App() {
  const bootPhase = useSystemStore((s) => s.bootPhase)
  const isPhone = useIsMobile(640)
  const [isRecruiterHashActive, setIsRecruiterHashActive] = useState(() => window.location.hash.startsWith('#recruiter'))
  const [forceOSMode, setForceOSMode] = useState(() => sessionStorage.getItem(FORCE_OS_MODE_KEY) === 'true')

  useEffect(() => {
    const syncModeState = () => {
      setIsRecruiterHashActive(window.location.hash.startsWith('#recruiter'))
      setForceOSMode(sessionStorage.getItem(FORCE_OS_MODE_KEY) === 'true')
    }

    // Disable Right-Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    // Disable Inspect Element / View Source shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault()
      }
      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault()
      }
      // Cmd+Option+I, Cmd+Option+J, Cmd+Option+C (Mac)
      if (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'j' || e.key === 'c' || e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault()
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
      }
      // Cmd+Option+U (Mac View Source)
      if (e.metaKey && e.altKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault()
      }
    }

    window.addEventListener('hashchange', syncModeState)
    window.addEventListener('focus', syncModeState)
    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('hashchange', syncModeState)
      window.removeEventListener('focus', syncModeState)
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Phones auto-redirect to Recruiter Mode
  // Also check URL hash for manual recruiter mode
  const isRecruiterMode = isRecruiterHashActive || (isPhone && !forceOSMode)

  if (isRecruiterMode) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <RecruiterMode />
      </Suspense>
    )
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {bootPhase === 'pre-boot' && <BootScreen key="boot" />}
        {bootPhase === 'booting' && <BootScreen key="boot" />}
        {bootPhase === 'login' && <LoginScreen key="login" />}
        {bootPhase === 'desktop' && (
          <Suspense key="desktop" fallback={<LoadingFallback />}>
            <Desktop />
          </Suspense>
        )}
        {bootPhase === 'shutdown' && (
          <Suspense key="shutdown" fallback={<LoadingFallback />}>
            <ShutdownScreen />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Flashlight overlay — always mounted, toggleable */}
      <FlashlightCursor />
    </>
  )
}
