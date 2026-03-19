import { useState, useEffect } from 'react'

export default function SystemStatus() {
  const [metrics, setMetrics] = useState({
    cpu: 18,
    memoryPct: 45,
    disk: 34,
    netSpeed: 12,
  })

  const [hwInfo, setHwInfo] = useState({
    cores: '2 Cores',
    ram: '1024 MB',
    network: 'Ethernet'
  })

  // Grab static browser hardware data once
  useEffect(() => {
    let coresStr = '2 Cores'
    let ramStr = '1024 MB'
    let netStr = 'Ethernet'

    if (typeof navigator !== 'undefined') {
      const nav = navigator as any
      if (nav.hardwareConcurrency) coresStr = `${nav.hardwareConcurrency} Cores`
      if (nav.deviceMemory) ramStr = `${nav.deviceMemory} GB`
      if (nav.connection) {
        const type = nav.connection.effectiveType
        netStr = type ? `${type.toUpperCase()} Net` : 'Connected'
      }
    }
    setHwInfo({ cores: coresStr, ram: ramStr, network: netStr })
  }, [])

  // Live telemetry loop
  useEffect(() => {
    const interval = setInterval(() => {
      // Memory
      let mPct = metrics.memoryPct
      const perf = window.performance as any
      if (perf && perf.memory) {
        mPct = (perf.memory.usedJSHeapSize / perf.memory.jsHeapSizeLimit) * 100
      } else {
        mPct = Math.min(90, Math.max(30, Number(mPct) + (Math.random() - 0.5) * 5))
      }

      // Network Downlink
      let speed = metrics.netSpeed
      if (typeof navigator !== 'undefined') {
        const nav = navigator as any
        if (nav.connection && nav.connection.downlink) {
          speed = Math.round(nav.connection.downlink * 1024 / 8) // pseudo KB/s
        } else {
          speed = Math.max(0, Math.round(Math.random() * 50))
        }
      }

      setMetrics(prev => ({
        cpu: Math.min(95, Math.max(2, prev.cpu + (Math.random() - 0.5) * 15)),
        memoryPct: mPct,
        disk: Math.min(100, Math.max(5, prev.disk + (Math.random() - 0.5) * 10)),
        netSpeed: speed,
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [metrics])

  return (
    <div className="w-full bg-black/30 dark:bg-black/50 backdrop-blur-3xl rounded-[32px] p-5 border border-white/20 shadow-2xl font-sans">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
          <span className="text-blue-400 text-lg">⚙️</span>
        </div>
        <div className="flex justify-between items-center flex-1">
          <h2 className="text-white font-bold text-lg tracking-tight">System</h2>
          <span className="text-xs text-green-400 uppercase font-black tracking-widest bg-green-400/10 px-2 py-0.5 rounded-md border border-green-500/20 animate-pulse">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* CPU */}
        <div className="bg-white/10 rounded-2xl p-3 flex flex-col justify-between border border-white/5 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <div className="text-cyan-400 text-sm overflow-hidden rounded-full w-6 h-6 bg-cyan-400/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </div>
            <div className="text-[10px] text-cyan-300 font-bold bg-black/20 px-1.5 py-0.5 rounded border border-white/5">{hwInfo.cores}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-black text-white tracking-tighter drop-shadow-md leading-none">
              {Math.round(metrics.cpu)}<span className="text-xs text-white/50 ml-0.5">%</span>
            </div>
            <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider mt-1">CPU Load</div>
          </div>
        </div>

        {/* Memory */}
        <div className="bg-white/10 rounded-2xl p-3 flex flex-col justify-between border border-white/5 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <div className="text-purple-400 text-sm overflow-hidden rounded-full w-6 h-6 bg-purple-400/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
            </div>
            <div className="text-[10px] text-purple-300 font-bold bg-black/20 px-1.5 py-0.5 rounded border border-white/5">{hwInfo.ram}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-black text-white tracking-tighter drop-shadow-md leading-none">
              {Math.round(metrics.memoryPct)}<span className="text-xs text-white/50 ml-0.5">%</span>
            </div>
            <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider mt-1">Memory</div>
          </div>
        </div>

        {/* Disk */}
        <div className="bg-white/10 rounded-2xl p-3 flex flex-col justify-between border border-white/5 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <div className="text-green-400 text-sm overflow-hidden rounded-full w-6 h-6 bg-green-400/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6H4c-1.11 0-2 .89-2 2v8c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-2 9H6v-6h12v6z"/></svg>
            </div>
            <div className="text-[10px] text-green-300 font-bold bg-black/20 px-1.5 py-0.5 rounded border border-white/5">Virtual</div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-black text-white tracking-tighter drop-shadow-md leading-none">
              {Math.round(metrics.disk)}<span className="text-xs text-white/50 ml-0.5">%</span>
            </div>
            <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider mt-1">Disk I/O</div>
          </div>
        </div>

        {/* Network */}
        <div className="bg-white/10 rounded-2xl p-3 flex flex-col justify-between border border-white/5 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <div className="text-orange-400 text-sm overflow-hidden rounded-full w-6 h-6 bg-orange-400/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.5c-1.6 0-3.15-.3-4.57-.88l1.39-2.4c1 .4 2.06.6 3.18.6 4.7 0 8.5-3.8 8.5-8.5v-1h2v1c0 5.8-4.7 10.5-10.5 10.5zM20 9V7h-2V5h-2v2h2v2h2V9h2zM4.5 10.5C4.5 6.36 7.86 3 12 3c1.12 0 2.18.2 3.18.6l1.39-2.4C15.15 1.5 13.6 1.2 12 1.2 6.48 1.2 2 5.68 2 11.2v1h2v-1.7z"/></svg>
            </div>
            <div className="text-[10px] text-orange-300 font-bold bg-black/20 px-1.5 py-0.5 rounded border border-white/5 truncate max-w-[60px]">{hwInfo.network}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-black text-white tracking-tighter drop-shadow-md leading-none flex items-baseline">
              {metrics.netSpeed}<span className="text-xs text-white/50 ml-1 font-semibold">K/s</span>
            </div>
            <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider mt-1">Network</div>
          </div>
        </div>
      </div>
    </div>
  )
}
