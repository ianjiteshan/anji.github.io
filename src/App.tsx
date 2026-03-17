import { lazy, Suspense } from 'react'
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

function LoadingFallback() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-blue-400/50 text-sm font-mono">Loading module...</div>
    </div>
  )
}

export default function App() {
  const bootPhase = useSystemStore((s) => s.bootPhase)
  const isMobile = useIsMobile()

  // Mobile auto-redirects to Recruiter Mode
  // Also check URL hash for manual recruiter mode
  const isRecruiterMode = isMobile || window.location.hash === '#recruiter'

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
