import { useState, useEffect } from 'react'

export default function DevMetrics() {
  const [leetcode, setLeetcode] = useState<any>(null)
  const [gfg, setGfg] = useState<any>(null)
  const [github, setGithub] = useState<any>(null)

  useEffect(() => {
    // LeetCode Fetch with 3s timeout
    const lcController = new AbortController();
    const lcTimeout = setTimeout(() => lcController.abort(), 3000);
    
    Promise.all([
      fetch('https://leetcode-api-f60z.onrender.com/ianjiteshan', { signal: lcController.signal }).then(res => res.json()).catch(() => ({})),
      fetch('https://alfa-leetcode-api.onrender.com/ianjiteshan/contest', { signal: lcController.signal }).then(res => res.json()).catch(() => ({}))
    ])
      .then(([data, contestData]) => { 
        clearTimeout(lcTimeout);
        if (data.status === 'success' && typeof data.totalSolved === 'number') {
          const totalSubs = data.submissionCalendar 
            ? Object.values(data.submissionCalendar).reduce((a: any, b: any) => a + b, 0)
            : 522
          const rating = contestData?.contestRating ? Math.round(contestData.contestRating) : 1413;
          setLeetcode({ ...data, totalSubmissions: totalSubs, contestRating: rating })
        } else {
          setLeetcode({ totalSolved: 307, easySolved: 79, mediumSolved: 196, hardSolved: 32, contestRating: 1413, totalSubmissions: 522 })
        }
      })
      .catch(() => setLeetcode({ totalSolved: 307, easySolved: 79, mediumSolved: 196, hardSolved: 32, contestRating: 1413, totalSubmissions: 522 }))

    // GFG Fetch with 3s timeout
    const gfgController = new AbortController();
    const gfgTimeout = setTimeout(() => gfgController.abort(), 3000);
    
    fetch('https://geeks-for-geeks-api.vercel.app/ianjiteshan', { signal: gfgController.signal })
      .then(res => { clearTimeout(gfgTimeout); return res.json(); })
      .then(data => { 
        if (data.info?.totalProblemsSolved) {
          setGfg(data.info) 
        } else {
          setGfg({ totalProblemsSolved: 110, score: 341, instituteRank: 348, podtStreak: '41/0/0' })
        }
      })
      .catch(() => setGfg({ totalProblemsSolved: 110, score: 341, instituteRank: 348, podtStreak: '41/0/0' }))

    // GitHub Fetch with 3s timeout
    const ghController = new AbortController();
    const ghTimeout = setTimeout(() => ghController.abort(), 3000);

    Promise.all([
      fetch('https://api.github.com/users/ianjiteshan', { signal: ghController.signal }).then(res => res.json()),
      fetch('https://api.github.com/users/ianjiteshan/repos?per_page=100', { signal: ghController.signal }).then(res => res.json())
    ])
      .then(([userData, reposData]) => {
        clearTimeout(ghTimeout);
        // Fallback naturally if GitHub hits an API rate limit or returns weird data
        if (userData.message && userData.message.includes('API rate limit')) throw new Error('Rate limit');
        if (typeof userData.public_repos !== 'number') throw new Error('Invalid data');
        
        const stars = Array.isArray(reposData) ? reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0) : 0;
        setGithub({ ...userData, total_stars: stars })
      })
      .catch(() => setGithub({ public_repos: 32, followers: 18, total_stars: 45, following: 10 }))
      
    return () => {
      clearTimeout(lcTimeout);
      clearTimeout(gfgTimeout);
      clearTimeout(ghTimeout);
    }
  }, [])

  return (
    <div className="w-full flex flex-col gap-4 font-sans select-none">
      
      {/* GitHub - Wide Widget */}
      <div className="w-full bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-[32px] p-5 shadow-xl border border-white/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 blur-xl">
          <svg className="w-40 h-40 fill-white" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </div>
        <div className="flex justify-between items-start relative z-10">
          <div className="bg-white/10 rounded-full w-10 h-10 flex items-center justify-center border border-white/20">
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </div>
          <div className="text-right">
            <h3 className="text-white/70 text-sm font-semibold uppercase tracking-wider">GitHub</h3>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-4 gap-2 text-center relative z-10">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-black text-white">{github?.public_repos || '...'}</div>
            <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-0.5">Repos</div>
          </div>
          <div className="flex flex-col items-center border-l border-white/10">
            <div className="text-2xl font-black text-white">{github?.followers || '...'}</div>
            <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-0.5">Flwrs</div>
          </div>
          <div className="flex flex-col items-center border-l border-white/10">
            <div className="text-2xl font-black text-white">{github?.following || '...'}</div>
            <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-0.5">Flwng</div>
          </div>
          <div className="flex flex-col items-center border-l border-white/10">
            <div className="text-2xl font-black text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">{github?.total_stars !== undefined ? github.total_stars : '...'}</div>
            <div className="text-[10px] text-[#FFD700]/70 font-bold uppercase tracking-widest mt-0.5">Stars</div>
          </div>
        </div>
      </div>

      {/* LeetCode Apple Card */}
      <div className="w-full bg-gradient-to-r from-[#FFA726] to-[#F57C00] rounded-[32px] p-5 shadow-lg shadow-orange-500/20 border border-white/20 relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent mix-blend-overlay pointer-events-none" />
         
         <div className="relative z-10 flex items-center justify-between mb-5">
           <div className="flex items-center gap-4">
             <div className="bg-white/20 rounded-[18px] w-14 h-14 flex items-center justify-center border border-white/30 backdrop-blur-md shadow-sm shrink-0">
               <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" className="w-7 h-7 object-contain" style={{ filter: 'brightness(0) invert(1)' }} draggable={false} />
             </div>
             <div>
               <h3 className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-0.5">Leetcode</h3>
               <div className="text-4xl font-semibold text-white tracking-tight leading-none">
                 {leetcode?.totalSolved || '...'}
               </div>
             </div>
           </div>
         </div>
         
         {/* Sub-stats Grid */}
         <div className="relative z-10 grid grid-cols-2 gap-2.5">
           <div className="flex items-center justify-between text-[13px] font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
             <span className="text-white/80">Easy</span>
             <span className="text-white font-bold">{leetcode?.easySolved || '-'}</span>
           </div>
           <div className="flex items-center justify-between text-[13px] font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
             <span className="text-white/80">Med</span>
             <span className="text-white font-bold">{leetcode?.mediumSolved || '-'}</span>
           </div>
           <div className="flex items-center justify-between text-[13px] font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
             <span className="text-white/80">Hard</span>
             <span className="text-white font-bold">{leetcode?.hardSolved || '-'}</span>
           </div>
           <div className="col-span-2 flex items-center justify-between text-[13px] font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
             <span className="text-white/80">Contest Rating</span>
             <span className="text-white font-bold">{leetcode?.contestRating ? `${leetcode.contestRating}` : '-'}</span>
           </div>
         </div>
      </div>

      {/* GFG Apple Card */}
      <div className="w-full bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] rounded-[32px] p-5 shadow-lg shadow-green-500/20 border border-white/20 relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent mix-blend-overlay pointer-events-none" />
         
         <div className="relative z-10 flex items-center justify-between mb-5">
           <div className="flex items-center gap-4">
             <div className="bg-white/20 rounded-[18px] w-14 h-14 flex items-center justify-center border border-white/30 backdrop-blur-md shadow-sm shrink-0">
               <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg" alt="GFG" className="w-[30px] h-[30px] object-contain pb-0.5" style={{ filter: 'brightness(0) invert(1)' }} draggable={false} />
             </div>
             <div>
               <h3 className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-0.5">GeeksForGeeks</h3>
               <div className="text-4xl font-semibold text-white tracking-tight leading-none">
                 {gfg?.totalProblemsSolved || '...'}
               </div>
             </div>
           </div>
         </div>
         
         {/* Sub-stats Grid */}
         <div className="relative z-10 grid grid-cols-2 gap-2.5">
           <div className="col-span-2 flex items-center justify-between text-[13px] font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
             <span className="text-white/80">Score</span>
             <span className="text-white font-bold">{gfg?.score || '-'}</span>
           </div>
           <div className="flex items-center justify-between text-[13px] font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
             <span className="text-white/80">Rank</span>
             <span className="text-white font-bold">{gfg?.instituteRank ? `#${gfg.instituteRank}` : '-'}</span>
           </div>
           <div className="flex items-center justify-between text-[13px] font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
             <span className="text-white/80">Streak</span>
             <span className="text-white font-bold">{gfg?.podtStreak ? `${gfg.podtStreak.split('/')[0]} days` : '-'}</span>
           </div>
         </div>
      </div>
      
    </div>
  )
}
