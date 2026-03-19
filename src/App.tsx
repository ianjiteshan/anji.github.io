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

    window.addEventListener('hashchange', syncModeState)
    window.addEventListener('focus', syncModeState)

    return () => {
      window.removeEventListener('hashchange', syncModeState)
      window.removeEventListener('focus', syncModeState)
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
