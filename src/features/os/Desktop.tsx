import { lazy, Suspense, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
const AboutMe = lazy(() => import('@/features/about/AboutMe'))
const MusicPlayer = lazy(() => import('@/features/apps/MusicPlayer'))
const ImageViewer = lazy(() => import('@/features/apps/ImageViewer'))

// Importing widgets statically so they render immediately
import SystemLogs from '@/features/timeline/SystemLogs'
import SystemStatus from '@/features/os/SystemStatus'
import DevMetrics from '@/features/metrics/DevMetrics'

const xpIcons = {
  about: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="%234CAF50"/><path fill="%23FFF" d="M22 14h4v6h-4zm0 8h4v12h-4z"/></svg>`,
  projects: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="%23039BE5"/><path fill="%23FFF" d="M24 10c-7.7 0-14 6.3-14 14h5v-3c0-4.4 3.6-8 8-8s8 3.6 8 8v3h5c0-7.7-6.3-14-14-14zM10.8 28c1.3 6.3 6.9 11 13.5 11 4.5 0 8.5-2.1 11.2-5.4l-3.9-3.2C29.6 32.6 27 34 24 34c-4.4 0-8-3.6-8-8H9Z"/><path fill="%23FFC107" d="M42.4 12.3l-4.1 2.8C36 11 30.5 8 24 8V3c8.5 0 16 3.9 20.6 9.9l-2.2-.6z"/></svg>`,
  terminal: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="44" height="34" x="2" y="8" fill="%23212121" rx="2" ry="2"/><path fill="%23ECEFF1" d="M2 8H46V14H2z"/><circle cx="6" cy="11" r="1.5" fill="%23FF5252"/><circle cx="11" cy="11" r="1.5" fill="%23FFCA28"/><circle cx="16" cy="11" r="1.5" fill="%239CCC65"/><path fill="%2369F0AE" d="M6 18l5 5-5 5v-2.8l3-2.2-3-2.2zM12 26h6v2h-6z"/></svg>`,
  ai: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%23455A64" d="M10 14v22h28V14H10z"/><path fill="%2337474F" d="M16 10v4h16v-4H16z"/><circle cx="18" cy="24" r="3" fill="%2300E676"/><circle cx="30" cy="24" r="3" fill="%2300E676"/><rect x="18" y="31" width="12" height="2" fill="%23CFD8DC"/><path fill="%23546E7A" d="M8 20v8c0 1.1.9 2 2 2s2-.9 2-2v-8c0-1.1-.9-2-2-2S8 18.9 8 20zM36 20v8c0 1.1.9 2 2 2s2-.9 2-2v-8c0-1.1-.9-2-2-2S36 18.9 36 20z"/></svg>`,
  resume: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%23ECEFF1" d="M10 60V8A4 4 0 0 1 14 4h14l10 10v26a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z"/><path fill="%23CFD8DC" d="M28 4v10h10"/><path fill="%23F44336" d="M16 26h16v12H16z"/><text x="18" y="34" fill="%23FFF" font-family="sans-serif" font-size="8" font-weight="bold">PDF</text></svg>`,
  timeline: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="%23ECEFF1" d="M10 40V8A2 2 0 0 1 12 6h24a2 2 0 0 1 2 2v32a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2z"/><path fill="%23607D8B" d="M16 4h16v6H16z"/><rect width="20" height="2" x="14" y="16" fill="%23B0BEC5"/><rect width="14" height="2" x="14" y="22" fill="%23B0BEC5"/><rect width="20" height="2" x="14" y="28" fill="%23B0BEC5"/><rect width="10" height="2" x="14" y="34" fill="%23B0BEC5"/></svg>`,
  music: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="%234A148C"/><path fill="%23CE93D8" d="M21 13v15.7c-1-1-2.4-1.7-4-1.7-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V19h7v9.7c-1-1-2.4-1.7-4-1.7-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V13h-11z"/></svg>`,
  photos: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="38" height="30" x="5" y="9" fill="%231976D2" rx="3" ry="3"/><circle cx="14" cy="18" r="3.5" fill="%23FFF"/><path fill="%2381D4FA" d="M5 33l10-12 8 10 6-4 9 10v2c0 1.7-1.3 3-3 3H8c-1.7 0-3-1.3-3-3v-6z"/></svg>`,
}

const DESKTOP_ICONS = [
  { id: 'about', title: 'About Me', icon: xpIcons.about, component: 'about', width: 800, height: 550 },
  { id: 'projects', title: 'My Projects', icon: xpIcons.projects, component: 'projects', width: 800, height: 550 },
  { id: 'terminal', title: 'Terminal', icon: xpIcons.terminal, component: 'terminal', width: 750, height: 450 },
  { id: 'ai', title: 'N3XUS', icon: xpIcons.ai, component: 'ai', width: 500, height: 550 },
  { id: 'resume', title: 'Resume.pdf', icon: xpIcons.resume, component: 'resume', width: 650, height: 550 },
  { id: 'timeline', title: 'System Logs', icon: xpIcons.timeline, component: 'timeline', width: 650, height: 500 },
  { id: 'music', title: 'Music Player', icon: xpIcons.music, component: 'music', width: 600, height: 350 },
  { id: 'photos', title: 'Image Viewer', icon: xpIcons.photos, component: 'photos', width: 750, height: 500 },
]

// Map component keys to lazy-loaded components
const COMPONENT_MAP: Record<string, React.ComponentType> = {
  about: AboutMe,
  projects: ProjectViewer,
  terminal: Terminal,
  ai: AIAssistant,
  resume: ResumeViewer,
  paint: lazy(() => import('@/features/apps/JSPaint')),
  music: MusicPlayer,
  photos: ImageViewer,
}

export default function Desktop() {
  const windows = useWindowStore((s) => s.windows)
  const closeStartMenu = useUIStore((s) => s.closeStartMenu)
  const [wallpaper, setWallpaper] = useState<string>('')

  useEffect(() => {
    // Attempt to fetch from r/wallpaper
    fetch('https://www.reddit.com/r/wallpaper/hot.json?limit=20')
      .then(res => {
        if (!res.ok) throw new Error('Reddit fetch failed')
        return res.json()
      })
      .then(data => {
        const posts = data.data.children
        // Filter for actual images
        const images = posts
          .map((p: any) => p.data.url)
          .filter((url: string) => url.match(/\.(jpeg|jpg|png)$/i))
        
        if (images.length > 0) {
          // Pick a random image from the hot page
          const randomImage = images[Math.floor(Math.random() * images.length)]
          setWallpaper(`url(${randomImage})`)
        } else {
          throw new Error('No images found on Reddit')
        }
      })
      .catch((err) => {
        console.warn('Falling back to default wallpaper:', err)
        // Fallback to high-quality beautiful landscape Unsplash image
        setWallpaper(`url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1920&auto=format&fit=crop)`)
      })
  }, [])

  const handleDesktopClick = () => {
    closeStartMenu()
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-center bg-cover bg-no-repeat transition-all duration-1000"
      onClick={handleDesktopClick}
      style={{
        backgroundColor: '#3083ff',
        backgroundImage: wallpaper || 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1920&auto=format&fit=crop)',
      }}
    >
      {/* iOS Style Floating Dynamic Widgets Sidebar */}
      <div 
        className="absolute top-6 bottom-14 right-4 w-[340px] z-[5] pointer-events-none overflow-y-auto pb-4 flex flex-col gap-5 items-end"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="pointer-events-auto w-[320px] shrink-0 origin-top">
          <SystemStatus />
        </div>
        <div className="pointer-events-auto w-[320px] shrink-0 origin-top">
          <DevMetrics />
        </div>
      </div>

      {/* Desktop icons */}
      <div className="relative z-10 p-4 pt-6 flex flex-col gap-4 h-[calc(100%-48px)]">
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIcon key={icon.id} {...icon} />
        ))}
      </div>

      {/* Windows */}
      <div className="absolute inset-0 z-20 pointer-events-none pb-12">
        <div className="relative w-full h-full pointer-events-none">
          <AnimatePresence>
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
          </AnimatePresence>
        </div>
      </div>

      {/* Start Menu */}
      <StartMenu />

      {/* Taskbar */}
      <Taskbar />
    </div>
  )
}
