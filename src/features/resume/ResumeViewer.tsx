export default function ResumeViewer() {
  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="shrink-0 px-4 py-2 bg-white/3 border-b border-white/5 flex items-center justify-between">
        <span className="text-xs text-white/50">Resume.pdf</span>
        <a
          href={`${import.meta.env.BASE_URL}Resume.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 rounded text-xs bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 border border-blue-400/15 transition-colors"
        >
          ↗ Open in New Tab
        </a>
      </div>

      {/* PDF embed with fallback */}
      <div className="flex-1 relative">
        <object
          data={`${import.meta.env.BASE_URL}Resume.pdf`}
          type="application/pdf"
          className="w-full h-full"
        >
          {/* Fallback for Safari / mobile */}
          <div className="flex flex-col items-center justify-center h-full text-white/50 gap-4 p-8">
            <span className="text-5xl">📄</span>
            <p className="text-sm text-center">
              PDF preview is not supported in this browser.
            </p>
            <a
              href={`${import.meta.env.BASE_URL}Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-400/20 transition-colors font-medium text-sm"
            >
              📥 Download Resume
            </a>
          </div>
        </object>
      </div>
    </div>
  )
}
