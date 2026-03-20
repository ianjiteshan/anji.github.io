import { motion } from 'framer-motion'
import { useUIStore } from '@/core/store/useUIStore'
import { useWindowStore } from '@/core/store/useWindowStore'
import { useSystemStore } from '@/core/store/useSystemStore'
import { soundManager } from '@/core/utils/sounds'

const xpIcons = {
  projects: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#2196F3"/><path fill="#FFF" d="M14 24h20c0-6-4.5-12-10-12s-10 6-10 12zM34 26H14c1 5 5 10 10 10s9-5 10-10z"/></svg>',
  contact: '<svg viewBox="0 0 48 48"><rect x="6" y="12" width="36" height="24" rx="2" fill="#CFD8DC"/><path fill="#90A4AE" d="M6 14l18 12 18-12v-2L24 22 6 12z"/></svg>',
  about: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#4CAF50"/><path fill="#FFF" d="M22 14h4v6h-4zm0 8h4v12h-4z"/></svg>',
  paint: '<svg viewBox="0 0 48 48"><path fill="#FFCA28" d="M14 38l6-6-6-6-6 6z"/><path fill="#8D6E63" d="M36 12L20 28l-6-6L30 6z"/><circle cx="33" cy="9" r="3" fill="#F44336"/></svg>',
  timeline: '<svg viewBox="0 0 48 48"><rect x="10" y="8" width="28" height="32" rx="2" fill="#ECEFF1"/><path fill="#B0BEC5" d="M14 14h20v2H14zm0 6h20v2H14zm0 6h14v2H14z"/></svg>',
  ai: '<svg viewBox="0 0 48 48"><path fill="#455A64" d="M10 14v22h28V14H10z"/><path fill="#37474F" d="M16 10v4h16v-4H16z"/><circle cx="18" cy="24" r="3" fill="#00E676"/><circle cx="30" cy="24" r="3" fill="#00E676"/><rect x="18" y="31" width="12" height="2" fill="#CFD8DC"/><path fill="#546E7A" d="M8 20v8c0 1.1.9 2 2 2s2-.9 2-2v-8c0-1.1-.9-2-2-2S8 18.9 8 20zM36 20v8c0 1.1.9 2 2 2s2-.9 2-2v-8c0-1.1-.9-2-2-2S36 18.9 36 20z"/></svg>',
  terminal: '<svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="28" rx="2" fill="#212121"/><path fill="#69F0AE" d="M10 16l6 6-6 6v-3l3-3-3-3zM22 26h8v2h-8z"/></svg>',
  instagram: '<svg viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="8" fill="#E1306C"/><circle cx="24" cy="24" r="8" fill="none" stroke="#FFF" stroke-width="3"/><circle cx="33" cy="15" r="2" fill="#FFF"/></svg>',
  github: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#212121"/><path fill="#FFF" d="M24 10c-7.7 0-14 6.3-14 14 0 6.2 4 11.5 9.6 13.3.7.1.9-.3.9-.7v-2.5c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2-1.5-2-1.3-.9.1-.9.1-.9 1.4.1 2.1 1.4 2.1 1.4 1.2 2.1 3.2 1.5 4 .1.1-.9.5-1.5.9-1.8-3.1-.4-6.4-1.6-6.4-6.9 0-1.5.5-2.8 1.4-3.8-.1-.3-.6-1.8.1-3.7 0 0 1.2-.4 3.8 1.4 1.1-.3 2.3-.5 3.5-.5s2.4.2 3.5.5c2.6-1.8 3.8-1.4 3.8-1.4.7 1.9.3 3.4.1 3.7.9 1 1.4 2.3 1.4 3.8 0 5.4-3.3 6.6-6.4 6.9.5.4.9 1.3.9 2.6v3.9c0 .4.2.8.9.7C36 35.5 40 30.2 40 24c0-7.7-6.3-14-14-14z"/></svg>',
  linkedin: '<svg viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="2" fill="#0077B5"/><path fill="#FFF" d="M14 20h5v14h-5zM16.5 12a3 3 0 110 6 3 3 0 010-6zM34 34h-5v-7c0-1.7-2-1.5-2 0v7h-5V20h5v2c2-3 7-2 7 4v8z"/></svg>',
  recent: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="#ECEFF1" stroke="#B0BEC5" stroke-width="4"/><path fill="#78909C" d="M22 14h4v12l8 8-3 3-9-9z"/></svg>',
  cmd: '<svg viewBox="0 0 48 48"><rect x="8" y="10" width="32" height="28" fill="#212121"/><path fill="#FFF" d="M12 16l4 4-4 4v-2l2-2-2-2zm8 6h6v2h-6z"/></svg>',
  image: '<svg viewBox="0 0 48 48"><rect x="8" y="10" width="32" height="28" fill="#4CAF50"/><circle cx="16" cy="18" r="3" fill="#FFF"/><path fill="#81C784" d="M8 30l8-10 6 6 8-8 10 12v8H8z"/></svg>',
  pdfRight: '<svg viewBox="0 0 48 48"><path fill="#ECEFF1" d="M12 8h16l10 10v22H12z"/><path fill="#F44336" d="M18 20h12v12H18z"/><text x="20" y="28" fill="#FFF" font-family="sans-serif" font-size="8">PDF</text></svg>',
  music: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#4A148C"/><path fill="#CE93D8" d="M21 13v15.7c-1-1-2.4-1.7-4-1.7-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V19h7v9.7c-1-1-2.4-1.7-4-1.7-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V13h-11z"/></svg>',
  photos: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="38" height="30" x="5" y="9" fill="#1976D2" rx="3" ry="3"/><circle cx="14" cy="18" r="3.5" fill="#FFF"/><path fill="#81D4FA" d="M5 33l10-12 8 10 6-4 9 10v2c0 1.7-1.3 3-3 3H8c-1.7 0-3-1.3-3-3v-6z"/></svg>',
  vscode: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#0065A9" d="M34 6l-6 5-16-12-6 4 19 14-19 14 6 4 16-12 6 5v-22z"/><path fill="#007ACC" d="M34 6l10-8v42l-10-8v-26z"/></svg>',
  pycharm: '<svg viewBox="0 0 48 48"><rect width="36" height="36" x="6" y="6" fill="#21D789" rx="4"/><path fill="#000" d="M14 16h6c3 0 5 2 5 5s-2 5-5 5h-2v6h-4V16zm4 7h1c1 0 2-1 2-2s-1-2-2-2h-1v4zm9-7h4c3 0 5 2 5 5 0 2-1 4-3 5l4 6h-5l-3-4h-2v4h-4V16zm4 7h1c1 0 2-1 2-2s-1-2-2-2h-1v4z"/></svg>',
  intellij: '<svg viewBox="0 0 48 48"><rect width="36" height="36" x="6" y="6" fill="#FE2857" rx="4"/><path fill="#000" d="M14 16h4v16h-4zm8 0h4v12h4v4h-8V16z"/></svg>',
  chatgpt: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#10A37F"/><path fill="#FFF" d="M30 18H18c-2 0-4 2-4 4v4c0 2 2 4 4 4h12c2 0 4-2 4-4v-4c0-2-2-4-4-4zM24 28c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>',
  docker: '<svg viewBox="0 0 48 48"><path fill="#2496ED" d="M5 24h32v4H5zm6-5h4v4h-4zm6 0h4v4h-4zm0-6h4v4h-4zm6 0h4v4h-4zm0 6h4v4h-4zm0-12h4v4h-4z"/></svg>',
  postman: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#FF6C37"/><path fill="#FFF" d="M25 15c-3 0-5 2-5 5h3c0-1.5 1-2 2-2 1.5 0 2 1 2 2 0 1-1 1-2 2-2 1-4 2-4 5 0 2.5 2.5 4 4.5 4s3.5-1 3.5-3.5h-3c0 1-1 1.5-1.5 1.5-1 0-1.5-.5-1.5-1.5 0-1 1-1 2-2 2-1 4-2 4-5 0-3-2-5-5-5zM15 15v18h3v-7h2l3 7h3l-3-7c2 0 3.5-1.5 3.5-3.5v-1c0-2.5-2-4.5-4.5-4.5h-7zm3 3h4c1 0 1.5.5 1.5 1.5v1c0 1-.5 1.5-1.5 1.5h-4v-4z"/></svg>',
  figma: '<svg viewBox="0 0 48 48"><path fill="#F24E1E" d="M24 10c0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6h6v-6z"/><path fill="#FF7262" d="M30 4c-3.3 0-6 2.7-6 6v6h6c3.3 0 6-2.7 6-6s-2.7-6-6-6z"/><path fill="#A259FF" d="M24 22c0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6h6v-6z"/><path fill="#1ABCFE" d="M24 28v6c3.3 0 6-2.7 6-6s-2.7-6-6-6c-3.3 0-6 2.7-6 6z"/><path fill="#0ACF83" d="M18 28c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6v-6h-6z"/></svg>',
  notion: '<svg viewBox="0 0 48 48"><rect width="36" height="36" x="6" y="6" fill="#000" rx="6"/><path fill="#FFF" d="M16 16v16h4v-8l6 8h6V16h-4v8l-6-8h-6z"/></svg>',
  slack: '<svg viewBox="0 0 48 48"><path fill="#E01E5A" d="M17.5 16.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5h3.5v-3.5c0-1.9-1.6-3.5-3.5-3.5z"/><path fill="#36C5F0" d="M24.5 16.5c-1.9 0-3.5 1.6-3.5 3.5v10c0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5v-10c0-1.9-1.6-3.5-3.5-3.5z"/><path fill="#2EB67D" d="M30.5 28.5c1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5h-3.5v3.5c0 1.9 1.6 3.5 3.5 3.5z"/><path fill="#ECB22E" d="M23.5 32.5c1.9 0 3.5-1.6 3.5-3.5v-10c0-1.9-1.6-3.5-3.5-3.5s-3.5 1.6-3.5 3.5v10c0 1.9 1.6 3.5 3.5 3.5z"/></svg>',
  ae: '<svg viewBox="0 0 48 48"><rect width="36" height="36" x="6" y="6" fill="#9999ff" rx="4"/><text x="24" y="32" fill="#000" font-family="sans-serif" font-weight="bold" font-size="18" text-anchor="middle">Ae</text></svg>',
  ai_adobe: '<svg viewBox="0 0 48 48"><rect width="36" height="36" x="6" y="6" fill="#ff9a00" rx="4"/><text x="24" y="32" fill="#000" font-family="sans-serif" font-weight="bold" font-size="18" text-anchor="middle">Ai</text></svg>',
  id: '<svg viewBox="0 0 48 48"><rect width="36" height="36" x="6" y="6" fill="#ff3366" rx="4"/><text x="24" y="32" fill="#000" font-family="sans-serif" font-weight="bold" font-size="18" text-anchor="middle">Id</text></svg>',
  ps: '<svg viewBox="0 0 48 48"><rect width="36" height="36" x="6" y="6" fill="#31A8FF" rx="4"/><text x="24" y="32" fill="#00253E" font-family="sans-serif" font-weight="bold" font-size="18" text-anchor="middle">Ps</text></svg>',
  pr: '<svg viewBox="0 0 48 48"><rect width="36" height="36" x="6" y="6" fill="#ea77ff" rx="4"/><text x="24" y="32" fill="#000" font-family="sans-serif" font-weight="bold" font-size="18" text-anchor="middle">Pr</text></svg>',
  blender: '<svg viewBox="0 0 48 48"><path fill="#f5792a" d="M24 6a18 18 0 100 36 18 18 0 000-36zm0 28a10 10 0 110-20 10 10 0 010 20z"/></svg>',
  claude: '<svg viewBox="0 0 48 48"><path fill="#d97757" d="M24 6l18 10v20L24 46 6 36V16z"/></svg>',
  cursor: '<svg viewBox="0 0 48 48"><path fill="#000" d="M12 12l24 16-10 2 6 10-6 2-6-10-8 8z"/></svg>',
  davinci: '<svg viewBox="0 0 48 48"><path fill="#3b96ff" d="M24 6C14 6 6 14 6 24s8 18 18 18 18-8 18-18S34 6 24 6zm0 28c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z"/></svg>',
  git: '<svg viewBox="0 0 48 48"><path fill="#F1502F" d="M24 6L6 24l18 18 18-18z"/></svg>',
  githubCopilot: '<svg viewBox="0 0 48 48"><path d="M24 6C14 6 6 14 6 24s8 18 18 18 18-8 18-18S34 6 24 6zm0 28c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z"/></svg>',
  obs: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="#d1e8fa"/><circle cx="24" cy="24" r="10" fill="#2d3133"/></svg>',
  wordpress: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#21759b"/><text x="24" y="34" fill="#FFF" font-family="serif" font-weight="bold" font-size="28" text-anchor="middle">W</text></svg>',
}

const LEFT_APPS = [
  { id: 'projects', label: 'My Projects', subtext: 'View my work', icon: xpIcons.projects, component: 'projects' },
  { id: 'contact', label: 'Contact Me', subtext: 'Send me a message', icon: xpIcons.contact, component: 'contact' },
  { separator: true },
  { id: 'about', label: 'About Me', icon: xpIcons.about, component: 'about' },
  { id: 'timeline', label: 'System Logs', icon: xpIcons.timeline, component: 'timeline' },
  { id: 'paint', label: 'Paint', icon: xpIcons.paint, component: 'paint' },
  { id: 'ai', label: 'N3XUS', icon: xpIcons.ai, component: 'ai' },
  { id: 'terminal', label: 'Terminal', icon: xpIcons.terminal, component: 'terminal' },
  { id: 'music', label: 'Music Player', icon: xpIcons.music, component: 'music' },
  { id: 'photos', label: 'Image Viewer', icon: xpIcons.photos, component: 'photos' },
]

const RIGHT_LINKS = [
  { label: 'Instagram', icon: xpIcons.instagram, url: 'https://www.instagram.com/anjiteshshandilya/' },
  { label: 'Github', icon: xpIcons.github, url: 'https://github.com/ianjiteshan' },
  { label: 'LinkedIn', icon: xpIcons.linkedin, url: 'https://linkedin.com/in/ianjiteshan' },
  { separator: true },
  { label: 'Recruiter Mode', icon: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#FFB300"/><path fill="#FFF" d="M30 18H18v-3c0-2.209 1.791-4 4-4h4c2.209 0 4 1.791 4 4v3zM14 18h20v18H14V18z"/></svg>', url: '#recruiter', isPrimary: true },
  { separator: true },
  { 
    label: 'Recently Used', 
    icon: xpIcons.recent, 
    hasSubmenu: true, 
    url: '#',
    submenu: [
      { label: 'Adobe After Effects', icon: xpIcons.ae },
      { label: 'Adobe Illustrator', icon: xpIcons.ai_adobe },
      { label: 'Adobe InDesign', icon: xpIcons.id },
      { label: 'Adobe Photoshop', icon: xpIcons.ps },
      { label: 'Adobe Premiere Pro', icon: xpIcons.pr },
      { label: 'Blender', icon: xpIcons.blender },
      { label: 'ChatGPT', icon: xpIcons.chatgpt },
      { label: 'Claude', icon: xpIcons.claude },
      { label: 'Cursor', icon: xpIcons.cursor },
      { label: 'Davinci Resolve', icon: xpIcons.davinci },
      { label: 'Docker', icon: xpIcons.docker },
      { label: 'Git', icon: xpIcons.git },
      { label: 'GitHub CoPilot', icon: xpIcons.githubCopilot },
      { label: 'OBS Studio', icon: xpIcons.obs },
      { label: 'VS Code', icon: xpIcons.vscode },
      { label: 'Wordpress', icon: xpIcons.wordpress },
    ]
  },
]

export default function StartMenu() {
  const startMenuOpen = useUIStore((s) => s.startMenuOpen)
  const closeStartMenu = useUIStore((s) => s.closeStartMenu)
  const openWindow = useWindowStore((s) => s.openWindow)
  const setBootPhase = useSystemStore((s) => s.setBootPhase)

  if (!startMenuOpen) return null

  const handleOpen = (item: any) => {
    if (!item.component) return
    soundManager.playClick()
    openWindow({
      id: item.id,
      title: item.label,
      component: item.component,
      x: 60 + Math.random() * 200,
      y: 30 + Math.random() * 100,
      width: item.id === 'terminal' ? 750 : 800,
      height: item.id === 'terminal' ? 450 : 550,
    })
    closeStartMenu()
  }

  const handleShutdown = () => {
    soundManager.playShutdown()
    closeStartMenu()
    setBootPhase('shutdown')
  }

  return (
    <>
      <div className="fixed inset-0 z-[8999]" onClick={closeStartMenu} />

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="fixed bottom-11 left-0 z-[9001] w-[420px] rounded-tr-lg shadow-2xl flex flex-col border-2 border-[#1c4b9c] font-sans select-none"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#1c4b9c] to-[#3a72c4] p-2 pt-3 pb-3 flex items-center pr-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] rounded-tr-md">
          <div className="w-[52px] h-[52px] rounded-md overflow-hidden border-2 border-white/80 shadow-md ml-1 bg-gradient-to-b from-[#e2e8f0] to-[#94a3b8] flex shrink-0">
            <img src="images/avatar.webp" alt="User" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="ml-3 text-white font-bold text-[22px] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.6)]">
            Anjitesh Shandilya
          </div>
        </div>

        {/* Two columns body */}
        <div className="flex h-[420px] relative mt-[1px]">
          {/* Left: Apps (White) */}
          <div className="w-[220px] bg-white flex flex-col pt-1 shadow-[2px_0_4px_rgba(0,0,0,0.1)] relative z-10">
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-[2px]">
              {LEFT_APPS.map((item, i) => (
                item.separator ? (
                  <div key={'sep-' + i} className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-1 mx-2" />
                ) : (
                  <div
                    key={item.id}
                    onClick={() => handleOpen(item)}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 hover:bg-[#2f71cd] hover:text-white text-black transition-none cursor-pointer group"
                  >
                    {item.icon && <div className="w-8 h-8 flex items-center justify-center shrink-0" dangerouslySetInnerHTML={{ __html: item.icon }} />}
                    <div className="flex flex-col flex-1 truncate">
                      <span className={'font-bold text-[13px] ' + (item.subtext ? 'leading-tight' : '')}>{item.label}</span>
                      {item.subtext && <span className="text-[11px] text-gray-500 group-hover:text-blue-200 leading-none truncate">{item.subtext}</span>}
                    </div>
                  </div>
                )
              ))}
            </div>
            
            <div className="mt-auto border-t border-gray-200 h-10 flex items-center shrink-0">
              <button
                className="w-full h-full flex items-center justify-center gap-2 hover:bg-[#2f71cd] hover:text-white text-black transition-none cursor-pointer group"
                onClick={(e) => e.preventDefault()}
              >
                <span className="text-[13px] font-bold">All Programs</span>
                <div className="w-6 h-6 bg-green-600 rounded-sm shadow-sm flex items-center justify-center pl-0.5 group-hover:border group-hover:border-white/50">
                  <span className="text-white text-[10px]">▶</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right: Links (Light Blue Ribbed) */}
          <div className="flex-1 bg-[#d3e5fa] py-2 flex flex-col relative"
               style={{
                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
                 backgroundSize: '100% 3px'
               }}
          >
            {RIGHT_LINKS.map((link, i) => (
              link.separator ? (
                <div key={'sep2-' + i} className="h-px bg-gradient-to-r from-transparent via-[#8faadc] to-transparent my-1.5 mx-2" />
              ) : (
                <div key={link.label} className="relative group">
                  <a
                    href={(link as any).disabled ? undefined : link.url}
                    onClick={(e) => {
                      if ((link as any).disabled) {
                        e.preventDefault()
                        return
                      }
                      if ((link as any).submenu) {
                        e.preventDefault()
                        return
                      }
                      closeStartMenu()
                      if (link.url === '#recruiter') {
                        e.preventDefault()
                        sessionStorage.removeItem('shanos-force-os-mode')
                        window.location.hash = 'recruiter'
                      }
                    }}
                    target={link.url !== '#' && link.url !== '#recruiter' && !(link as any).disabled ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={'flex items-center gap-2 px-3 py-[7px] ' + 
                      ((link as any).disabled ? 'opacity-40 grayscale cursor-default pointer-events-none ' : 'hover:bg-[#2f71cd] hover:text-white text-[#001366] cursor-pointer ') + 
                      (link.hasSubmenu ? 'pr-1' : '')}
                  >
                    {(link as any).icon && <div className={'w-6 h-6 flex items-center justify-center shrink-0 ' + ((link as any).isChild ? 'pl-2 scale-90' : '')} dangerouslySetInnerHTML={{ __html: (link as any).icon }} />}
                    <span className={'text-[13px] flex-1 ' + (link.hasSubmenu || (link as any).isChild ? '' : 'font-bold ') + ((link as any).isPrimary ? 'text-[#e65c00] group-hover:text-white' : '')}>{link.label}</span>
                    {link.hasSubmenu && <span className="text-[10px] pr-2 opacity-70 group-hover:text-white flex-shrink-0">▶</span>}
                  </a>
                  
                  {/* Nested Submenu */}
                  {(link as any).submenu && (
                    <div className="absolute left-full top-[-100px] hidden group-hover:block ml-0 z-[9999] w-[220px]">
                      <div className="bg-white border border-[#001366] shadow-[2px_4px_10px_rgba(0,0,0,0.3)] py-1 relative"
                           style={{
                             backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
                             backgroundSize: '100% 3px'
                           }}>
                        {/* the left blue stripe common in XP submenus */}
                        <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-b from-[#e3eaff] to-[#c7d8ff] border-r border-[#99b4d1] z-0" />
                        <div className="relative z-10 flex flex-col gap-0.5">
                          {(link as any).submenu.map((sub: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 px-2 py-1 opacity-45 grayscale pointer-events-none">
                              <div className="w-5 h-5 flex items-center justify-center shrink-0 z-10 ml-0.5" dangerouslySetInnerHTML={{ __html: sub.icon }} />
                              <span className="text-xs text-black leading-tight flex-1" style={{ textShadow: '0px 1px 0px rgba(255,255,255,0.8)' }}>{sub.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </div>

        {/* Footer (Right Aligned Shutdown Buttons) */}
        <div className="bg-gradient-to-b from-[#2250a2] to-[#3a72c4] border-t border-white/20 h-14 flex items-center justify-end px-3 gap-2 relative z-20">
          <button
            onClick={() => {
              soundManager.playClick()
              setBootPhase('login')
              closeStartMenu()
            }}
            className="flex items-center gap-1.5 px-2 py-1 hover:brightness-110 text-white text-[13px] cursor-pointer group rounded"
          >
            <div className="w-[30px] h-[30px] rounded bg-gradient-to-b from-[#eddb6d] to-[#d69f1a] flex items-center justify-center border border-white/30 shadow-md transform group-active:scale-95 transition-transform">
              <span className="text-white text-[14px] font-bold">🔑</span>
            </div>
            Log Off
          </button>
          
          <button
            onClick={handleShutdown}
            className="flex items-center gap-1.5 px-2 py-1 hover:brightness-110 text-white text-[13px] cursor-pointer group rounded"
          >
            <div className="w-[30px] h-[30px] rounded bg-gradient-to-b from-[#ff524e] to-[#cc211e] flex items-center justify-center border border-white/30 shadow-md transform group-active:scale-95 transition-transform">
              <span className="text-white text-[14px] font-bold">⏻</span>
            </div>
            Shut Down
          </button>
        </div>
      </motion.div>
    </>
  )
}
