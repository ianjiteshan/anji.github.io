import { useState, useRef, useEffect } from 'react'
import { soundManager } from '@/core/utils/sounds'

// Using reliable royalty-free audio streams for the portfolio
const DEFAULT_PLAYLIST = [
  {
    id: 1,
    title: "Lofi Study",
    artist: "FASSounds",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400&auto=format&fit=crop",
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: 2,
    title: "Good Night",
    artist: "FASSounds",
    cover: "https://images.unsplash.com/photo-1493225457224-ca2e830e5f2c?q=80&w=400&auto=format&fit=crop",
    src: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=good-night-160166.mp3"
  },
  {
    id: 3,
    title: "Chillout",
    artist: "QubeSounds",
    cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=400&auto=format&fit=crop",
    src: "https://cdn.pixabay.com/download/audio/2021/11/25/audio_91b3cbdb01.mp3?filename=chillout-26173.mp3"
  }
];

export default function MusicPlayer() {
  const [playlist, setPlaylist] = useState(DEFAULT_PLAYLIST)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = playlist[currentTrackIndex] || playlist[0]

  const searchMusic = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    soundManager.playClick()
    setIsSearching(true)
    try {
      // Using iTunes Search API (free, robust, returns previews and artwork)
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&entity=song&limit=15`)
      const data = await res.json()
      
      if (data.results && data.results.length > 0) {
        const newTracks = data.results.map((t: any) => ({
          id: t.trackId,
          title: t.trackName,
          artist: t.artistName,
          cover: t.artworkUrl100.replace('100x100bb.jpg', '600x600bb.jpg'), // request high-res artwork
          src: t.previewUrl
        }))
        setPlaylist(newTracks)
        setCurrentTrackIndex(0)
        setIsPlaying(true)
      }
    } catch (err) {
      console.error('Failed to fetch music:', err)
    } finally {
      setIsSearching(false)
    }
  }

  const togglePlay = () => {
    soundManager.playClick()
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {})
      }
    }
    setIsPlaying(!isPlaying)
  }

  const playNext = () => {
    soundManager.playClick()
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length)
    setIsPlaying(true)
  }

  const playPrev = () => {
    soundManager.playClick()
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
    setIsPlaying(true)
  }

  // Handle track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.pause()
      audioRef.current.src = currentTrack.src
      if (isPlaying) {
        audioRef.current.play().catch(() => setHasError(true))
      }
    }
  }, [currentTrackIndex, playlist])

  // Sync state and progress
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => playNext()
    const handleTimeUpdate = () => setProgress(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [currentTrackIndex])

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
      setProgress(seekTo);
    }
  };

  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#18181A] to-[#0A0A0C] w-full h-full select-none overflow-hidden relative">
      
      {/* Search Bar / Music Finder Tab */}
      <div className="w-full pt-6 px-6 lg:px-10 flex justify-center z-20 shrink-0">
        <form onSubmit={searchMusic} className="w-full max-w-[500px] flex gap-2">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Explore iTunes (e.g. Daft Punk, Synthwave...)" 
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-white placeholder-white/40 text-sm backdrop-blur-xl outline-none focus:bg-white/10 focus:border-white/30 transition-all shadow-xl"
          />
          <button 
            type="submit"
            disabled={isSearching}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-5 py-3 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xl border border-blue-400/30 flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : 'Search'}
          </button>
        </form>
      </div>

      {/* Main Content (Player) */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16 p-6 sm:p-10 min-h-0 overflow-y-auto">
        <audio ref={audioRef} preload="auto" />
        
        {/* Visualizer / Cover Art Area */}
        <div className="flex flex-col items-center gap-6 w-full max-w-[280px]">
        {/* Album Cover */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 bg-black group shrink-0">
          <img 
            src={currentTrack.cover} 
            alt="Album Cover" 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[10000ms] ease-linear ${isPlaying ? 'scale-110' : 'scale-100'}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=400&auto=format&fit=crop';
            }}
          />
          
          {/* Glass Overlay for Track Info */}
          <div className="absolute inset-x-0 bottom-0 bg-black/50 backdrop-blur-md p-4 border-t border-white/10 transform transition-transform">
            <p className="text-white font-bold text-lg truncate drop-shadow-md tracking-wide">{currentTrack.title}</p>
            <p className="text-white/60 text-sm truncate font-medium mt-0.5">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between text-xs font-medium text-white/50 px-1">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden group">
            <input 
              type="range" 
              min="0" 
              max={duration || 100} 
              value={progress}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {/* Filled Progress */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              style={{ width: `${(progress / (duration || 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* iPod Click Wheel */}
      <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-[#1A1C1E] shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_2px_15px_rgba(255,255,255,0.08)] border border-[#2A2A2A] relative flex items-center justify-center shrink-0">
        <button 
          className="absolute top-6 sm:top-8 text-white/50 hover:text-white text-xs sm:text-sm font-bold tracking-[0.2em] transition-colors" 
          onClick={() => {
            soundManager.playClick();
          }}
        >
          MENU
        </button>
        <button 
          className="absolute bottom-6 sm:bottom-8 text-white/50 hover:text-white p-2 transition-colors flex items-center justify-center w-8 h-8" 
          onClick={togglePlay}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
        <button 
          className="absolute left-6 sm:left-8 text-white/50 hover:text-white p-2 transition-colors flex items-center justify-center w-8 h-8" 
          onClick={playPrev}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
        </button>
        <button 
          className="absolute right-6 sm:right-8 text-white/50 hover:text-white p-2 transition-colors flex items-center justify-center w-8 h-8" 
          onClick={playNext}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
        </button>
        
        {/* Center Button */}
        <div 
          className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#111] shadow-[inset_0_2px_8px_rgba(0,0,0,0.6),0_1px_1px_rgba(255,255,255,0.05)] border border-black/50 cursor-pointer hover:bg-[#151515] transition-colors flex items-center justify-center active:scale-95 z-10" 
          onClick={togglePlay} 
        >
          <div className="w-12 h-12 rounded-full border border-white/5" />
        </div>
      </div>
      
      </div>
    </div>
  )
}
