export default function JSPaint() {
  return (
    <div className="w-full h-full bg-[#c0c0c0] flex flex-col">
      <iframe 
        src="https://jspaint.app" 
        className="w-full flex-1 border-none"
        title="JS Paint"
        sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups"
      />
    </div>
  )
}
