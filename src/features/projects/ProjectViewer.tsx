import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { soundManager } from '@/core/utils/sounds'

export default function ProjectViewer() {
  const [repos, setRepos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.github.com/users/ianjiteshan/repos?sort=updated&per_page=30')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data.filter(r => !r.fork))
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch github repos:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="h-full flex flex-col bg-white text-black font-sans w-full absolute inset-0">
      {/* IE Toolbar */}
      <div className="bg-[#ece9d8] flex flex-col border-b border-[#aca899] shadow-sm select-none shrink-0 w-full relative z-20">
        
        {/* Top IE Nav Ribbed Background */}
        <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-white/40 shadow-[0_1px_0_rgba(172,168,153,0.3)] bg-gradient-to-r from-[#e7e3d1] to-[#f4f3ec]">
          
          <div className="flex items-center gap-0.5 border-r border-[#aca899] pr-2 shadow-[-1px_0_0_rgba(255,255,255,0.6)_inset]">
            <button className="flex items-center gap-1 px-2 py-1 hover:bg-[#d8d3c1] hover:shadow-[inset_0_0_2px_rgba(0,0,0,0.3)] hover:border-[#aca899] border border-transparent rounded-sm text-xs text-[#333] cursor-pointer group active:bg-[#c6c2b0] active:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]" onClick={() => soundManager.playClick()}>
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-sm border border-green-600 group-hover:brightness-110">
                <span className="text-white text-lg rotate-180 drop-shadow-md">➔</span>
              </div>
              <span className="font-semibold px-1">Back</span>
              <span className="text-[10px] text-gray-500 group-hover:text-black">▼</span>
            </button>
            <button className="flex items-center px-1.5 py-1 hover:bg-[#d8d3c1] hover:shadow-[inset_0_0_2px_rgba(0,0,0,0.3)] hover:border-[#aca899] border border-transparent rounded-sm cursor-pointer opacity-50">
              <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center shadow-sm border border-gray-500">
                <span className="text-white text-lg drop-shadow-md">➔</span>
              </div>
            </button>
          </div>

          <button className="flex flex-col items-center px-2 py-1 hover:bg-[#d8d3c1] border border-transparent hover:border-[#aca899] rounded-sm cursor-pointer">
             <div className="w-6 h-6 bg-[url('https://win98icons.alexmeub.com/icons/png/search_file-2.png')] bg-contain bg-no-repeat bg-center" />
             <span className="text-[10px]">Search</span>
          </button>
          <button className="flex flex-col items-center px-2 py-1 hover:bg-[#d8d3c1] border border-transparent hover:border-[#aca899] rounded-sm cursor-pointer">
             <div className="w-6 h-6 bg-[url('https://win98icons.alexmeub.com/icons/png/directory_favorites-3.png')] bg-contain bg-no-repeat bg-center" />
             <span className="text-[10px]">Favorites</span>
          </button>
          <button className="flex flex-col items-center px-2 py-1 hover:bg-[#d8d3c1] border border-transparent hover:border-[#aca899] rounded-sm cursor-pointer">
             <div className="w-6 h-6 bg-[url('https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png')] bg-contain bg-no-repeat bg-center" />
             <span className="text-[10px]">History</span>
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-2 px-2 py-1.5 bg-[#ece9d8] border-b border-gray-300">
          <span className="text-[11px] text-gray-500 pt-0.5">Address</span>
          <div className="flex-1 flex items-center bg-white border border-[#7f9db9] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] px-1 py-[2px] h-[22px]">
            <span className="mr-1">
              <svg className="w-3.5 h-3.5 text-blue-800" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.84 3.97-2.1 5.39z" /></svg>
            </span>
            <input 
              readOnly 
              value="https://github.com/ianjiteshan/projects" 
              className="w-full text-xs outline-none bg-transparent font-sans"
            />
          </div>
          <button className="flex items-center px-2 py-0.5 text-xs border border-transparent hover:border-[#aca899] hover:bg-[#d8d3c1] rounded-sm cursor-pointer">
            <span className="text-green-600 font-bold mr-1">➔</span> Go
          </button>
        </div>

      </div>

      {/* Modern Inner Content - mimicking the screenshot's 'MyProjects' dark app grid */}
      <div className="flex-1 bg-white relative w-full h-full pb-8">
        <div className="absolute inset-0 w-full h-full overflow-y-auto no-scrollbar pb-10">
          {/* Hero Banner inside IE */}
          <div className="w-full bg-[#111111] px-8 py-5 flex items-center justify-between sticky top-0 z-10 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center border-2 border-white/20 shadow-md">
                <img src="/images/avatar.png" className="w-full h-full object-cover rounded-full" alt="Avatar"/>
              </div>
              <h1 className="text-2xl font-black text-white tracking-widest drop-shadow-md">MyProjects</h1>
            </div>
            
            <div className="bg-[#222] rounded-full px-8 py-2 border border-white/10 hidden md:flex items-center w-80 shadow-inner">
               <span className="text-white/40 text-sm">Search</span>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://linkedin.com/in/ianjiteshan" target="_blank" rel="noreferrer" className="text-white hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6 fill-currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://github.com/ianjiteshan" target="_blank" rel="noreferrer" className="text-white hover:text-gray-400 transition-colors">
                <svg className="w-6 h-6 fill-currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          <div className="flex h-full min-h-[500px] w-full bg-[#111111]">
            <div className="w-56 p-6 flex flex-col gap-4 border-r border-white/5 shrink-0 hidden md:flex">
              <button className="flex items-center text-white gap-3 w-full bg-white/10 px-4 py-2 rounded-lg font-bold">
                <span className="text-xl">🏠</span> All
              </button>
              <button className="flex items-center text-white/50 hover:text-white gap-3 w-full px-4 py-2 font-medium transition-colors">
                <span className="text-xl">🖥️</span> Frontend
              </button>
              <button className="flex items-center text-white/50 hover:text-white gap-3 w-full px-4 py-2 font-medium transition-colors">
                <span className="text-xl">⚙️</span> Backend
              </button>
              <button className="flex items-center text-white/50 hover:text-white gap-3 w-full px-4 py-2 font-medium transition-colors">
                <span className="text-xl">🚀</span> DevOps
              </button>
            </div>
            
            <div className="flex-1 p-6 md:p-8">
              {loading ? (
                <div className="w-full h-40 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[250px]">
                  {repos.map((repo, i) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group flex flex-col h-full bg-[#1c1c1c] rounded-2xl border border-white/10 overflow-hidden hover:border-white/30 hover:scale-[1.02] transition-all shadow-xl cursor-pointer"
                    >
                      <div className={`p-6 flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]`}>
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
                          <span className="text-4xl">
                            {repo.language === 'TypeScript' ? '🍄' : 
                             repo.language === 'JavaScript' ? '⚡' : 
                             repo.language === 'Python' ? '🐍' : '💻'}
                          </span>
                        </div>
                        <h3 className="mt-6 text-xl font-bold text-white text-center truncate w-full px-4">{repo.name}</h3>
                      </div>
                      
                      <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between">
                        <div className="text-white/60 text-xs font-semibold uppercase tracking-wider truncate mr-2">
                          {repo.language || 'Code'} • {repo.stargazers_count} ★
                        </div>
                        <div className="bg-white/10 text-white text-[10px] px-2 py-1 rounded-sm border border-white/10 shrink-0">
                          {repo.size} KB
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
