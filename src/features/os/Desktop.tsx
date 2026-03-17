import { lazy, Suspense } from 'react'
import DesktopIcon from './DesktopIcon'
import Taskbar from './Taskbar'
import StartMenu from './StartMenu'
import Window from './Window'
import { useWindowStore } from '@/core/store/useWindowStore'
import { useUIStore } from '@/core/store/useUIStore'
import { useSystemStore } from '@/core/store/useSystemStore'

// Lazy load heavy components — only loaded when their window opens
const ProjectViewer = lazy(() => import('@/features/projects/ProjectViewer'))
const Terminal = lazy(() => import('@/features/terminal/Terminal'))
const AIAssistant = lazy(() => import('@/features/ai/AIAssistant'))
const ResumeViewer = lazy(() => import('@/features/resume/ResumeViewer'))
const SystemLogs = lazy(() => import('@/features/timeline/SystemLogs'))
const SystemStatus = lazy(() => import('@/features/os/SystemStatus'))

const DESKTOP_ICONS = [
  { id: 'projects', title: 'My Projects', icon: '📁', component: 'projects', width: 800, height: 550 },
  { id: 'terminal', title: 'Terminal', icon: '⬛', component: 'terminal', width: 750, height: 450 },
  { id: 'ai', title: 'AI Agent', icon: '🧠', component: 'ai', width: 500, height: 550 },
  { id: 'resume', title: 'Resume.pdf', icon: '📄', component: 'resume', width: 650, height: 550 },
  { id: 'timeline', title: 'System Logs', icon: '📋', component: 'timeline', width: 650, height: 500 },
  { id: 'status', title: 'System Status', icon: '📊', component: 'status', width: 420, height: 380 },
]

// Map component keys to lazy-loaded components
const COMPONENT_MAP: Record<string, React.ComponentType> = {
  projects: ProjectViewer,
  terminal: Terminal,
  ai: AIAssistant,
  resume: ResumeViewer,
  timeline: SystemLogs,
  status: SystemStatus,
}

export default function Desktop() {
  const windows = useWindowStore((s) => s.windows)
  const closeStartMenu = useUIStore((s) => s.closeStartMenu)

  const handleDesktopClick = () => {
    closeStartMenu()
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      onClick={handleDesktopClick}
      style={{
        backgroundImage: 'url(/images/hero-banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Desktop icons */}
      <div className="relative z-10 p-4 pt-6 flex flex-col gap-4 h-[calc(100%-48px)]">
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIcon key={icon.id} {...icon} />
        ))}
      </div>

      {/* Windows */}
      <div className="absolute inset-0 z-20 pointer-events-none pb-12">
        <div className="relative w-full h-full pointer-events-auto">
          {windows.map((win) => {
            const Component = COMPONENT_MAP[win.component]
            if (!Component) return null
            return (
              <Window
                key={win.id}
                id={win.id}
                title={win.title}
                width={win.width}
                height={win.height}
              >
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-full text-white/40 text-sm font-mono">
                      Loading module...
                    </div>
                  }
                >
                  <Component />
                </Suspense>
              </Window>
            )
          })}
        </div>
      </div>

      {/* Start Menu */}
      <StartMenu />

      {/* Taskbar */}
      <Taskbar />
    </div>
  )
}
