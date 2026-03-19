import { useState, KeyboardEvent } from 'react'

export default function ImageViewer() {
  const [zoom, setZoom] = useState(1)
  const [hasPhoto, setHasPhoto] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [images, setImages] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const searchImages = async () => {
    if (!searchQuery.trim()) return
    setIsLoading(true)
    try {
      const res = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(searchQuery)}&media_type=image`)
      const data = await res.json()
      if (data.collection?.items?.length > 0) {
        setImages(data.collection.items)
        setCurrentIndex(0)
        setZoom(1)
        setHasPhoto(true)
      } else {
        setImages([])
      }
    } catch (e) {
      console.error('Failed to fetch images', e)
    }
    setIsLoading(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') searchImages()
  }

  const handleNext = () => {
    if (images.length > 0) {
      setCurrentIndex((prev) => Math.min(images.length - 1, prev + 1))
      setZoom(1)
    } else {
      setZoom(z => Math.min(2.5, z + 0.2)) // default to zoom if no array
    }
  }

  const handlePrev = () => {
    if (images.length > 0) {
      setCurrentIndex((prev) => Math.max(0, prev - 1))
      setZoom(1)
    } else {
      setZoom(z => Math.max(0.4, z - 0.2)) // default to zoom if no array
    }
  }

  // Get current image source
  const currentSrc = images.length > 0 
    ? (images[currentIndex]?.links?.[0]?.href || '') 
    : "/os-media/photos/photo1.jpg";
    
  const currentTitle = images.length > 0 
    ? images[currentIndex]?.data?.[0]?.title 
    : "Local: photo1.jpg";

  return (
    <div className="w-full h-full flex flex-col bg-[#F5F5F0] text-black text-sm select-none font-sans overflow-hidden">
      {/* Menubar */}
      <div className="flex items-center px-1 py-0.5 border-b border-[#D4D0C8] bg-[#F5F5F0] text-xs">
        <span className="px-2 py-1 hover:bg-blue-600 hover:text-white cursor-pointer">File</span>
        <span className="px-2 py-1 hover:bg-blue-600 hover:text-white cursor-pointer">Edit</span>
        <span className="px-2 py-1 hover:bg-blue-600 hover:text-white cursor-pointer">View</span>
        <span className="px-2 py-1 hover:bg-blue-600 hover:text-white cursor-pointer">Help</span>
        <div className="ml-auto w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-700 rounded-sm mr-1 shadow-inner" />
      </div>

      {/* Address Bar */}
      <div className="flex items-center px-2 py-1.5 border-b border-[#D4D0C8] bg-[#F5F5F0] gap-2">
        <span className="text-[#808080] text-xs">Search</span>
        <div className="flex-1 bg-white border border-[#7F9DB9] px-2 py-0.5 flex items-center gap-1 shadow-[inset_1px_1px_1px_rgba(0,0,0,0.1)] focus-within:ring-1 focus-within:ring-blue-400">
          <span className="text-xs">🪐</span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search NASA Image Library (e.g. Apollo, Mars...)"
            className="flex-1 text-xs text-black border-none outline-none w-full"
          />
        </div>
        <button 
          onClick={searchImages}
          disabled={isLoading}
          className="flex items-center gap-1 border border-[#D4D0C8] bg-[#F5F5F0] px-3 py-0.5 hover:bg-[#E0DFE3] active:bg-[#B5B5B5] shadow-sm text-xs disabled:opacity-50"
        >
          {isLoading ? <span className="text-gray-500">...</span> : <span className="text-green-600 font-bold">→</span>} 
          Go
        </button>
      </div>

      {/* Image Content Area */}
      <div className="flex-1 bg-[#808080] relative overflow-hidden flex items-center justify-center">
        {/* Checkerboard background for transparency simulation */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }} />
        
        {/* The "Image" */}
        <div 
          className="relative transition-transform duration-200 flex items-center justify-center p-8"
          style={{ transform: `scale(${zoom})` }}
        >
          {hasPhoto ? (
            <div className="flex flex-col items-center">
              <img 
                src={currentSrc} 
                alt="Viewer" 
                className="max-w-[80vw] max-h-[70vh] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 transition-opacity"
                onError={() => {
                  if (images.length === 0) setHasPhoto(false)
                }}
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {currentTitle}
              </div>
            </div>
          ) : (
            /* Simulated iPod Graphic Fallback */
            <div className="w-48 h-[22rem] bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 rounded-[2rem] border-2 border-gray-400 shadow-2xl flex flex-col items-center p-3 gap-6 relative overflow-hidden">
              {/* Gloss reflection overlay */}
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent rounded-t-[2rem] pointer-events-none" />
              
              {/* Screen */}
              <div className="w-full h-36 bg-white border-4 border-black rounded-md flex flex-col overflow-hidden shadow-inner mt-2">
                <div className="bg-gradient-to-b from-blue-400 to-blue-600 text-white font-bold text-center py-0.5 border-b border-blue-800 text-xs shadow-sm">iPod</div>
                <div className="flex-1 flex flex-col text-black font-semibold text-xs leading-5">
                  <div className="px-2 py-0.5 bg-gradient-to-b from-blue-500 to-blue-600 text-white mt-1 relative"><span className="absolute right-1">▶</span>Music</div>
                  <div className="px-2 py-0.5 border-b border-black/5">Photos</div>
                  <div className="px-2 py-0.5 border-b border-black/5">Videos</div>
                  <div className="px-2 py-0.5 border-b border-black/5">Extras</div>
                  <div className="px-2 py-0.5">Settings</div>
                </div>
              </div>
              
              {/* Wheel */}
              <div className="w-28 h-28 rounded-full bg-white border border-gray-300 shadow-[inset_0_-2px_10px_rgba(0,0,0,0.05),0_2px_5px_rgba(0,0,0,0.1)] flex items-center justify-center relative mt-auto mb-4">
                <div className="absolute top-2.5 text-gray-500 text-[9px] font-bold tracking-widest">MENU</div>
                <div className="absolute bottom-2.5 text-gray-500 text-xs">▶‖</div>
                <div className="absolute left-3 text-gray-500 text-xs">⏮</div>
                <div className="absolute right-3 text-gray-500 text-xs">⏭</div>
                <div className="w-9 h-9 rounded-full bg-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_1px_2px_rgba(255,255,255,1)] border border-gray-300" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toolbar / Status */}
      <div className="h-11 border-t border-[#D4D0C8] bg-gradient-to-b from-[#F5F5F0] to-[#E3E2D5] flex items-center justify-between px-2 sm:px-4 text-blue-900 font-medium text-xs shadow-[inset_0_1px_0_white]">
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="flex flex-col sm:flex-row items-center gap-1 hover:text-blue-600 transition-colors p-1" onClick={handlePrev}>
            <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs shadow-sm shadow-green-900/20">←</div> 
            <span className="hidden sm:inline">{images.length > 0 ? 'Prev Image' : 'Zoom Out'}</span>
          </button>
          <button className="flex flex-col sm:flex-row items-center gap-1 hover:text-blue-600 transition-colors p-1" onClick={handleNext}>
            <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs shadow-sm shadow-green-900/20">→</div> 
            <span className="hidden sm:inline">{images.length > 0 ? 'Next Image' : 'Zoom In'}</span>
          </button>
          
          <div className="w-px h-6 bg-gray-400 mx-1 sm:mx-2" />
          
          <button className="flex flex-col sm:flex-row items-center gap-1 hover:text-blue-600 transition-colors p-1" onClick={() => setZoom(1)}>
            <span className="text-base">🔍</span> 
            <span className="hidden sm:inline">Reset Zoom</span>
          </button>
          <button className="flex flex-col sm:flex-row items-center gap-1 hover:text-blue-600 transition-colors p-1">
            <span className="text-base">💾</span> 
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>

        {images.length > 0 && (
          <div className="text-gray-500 text-xs hidden sm:block">
            Image {currentIndex + 1} of {images.length}
          </div>
        )}
      </div>
    </div>
  )
}
