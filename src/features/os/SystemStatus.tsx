import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Fake system metrics — randomly fluctuating for that "alive" feel
export default function SystemStatus() {
  const [metrics, setMetrics] = useState({
    cpu: 42,
    memory: 68,
    disk: 34,
    network: 12,
    uptime: '3h 14m',
    services: 8,
    servicesHealthy: 8,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        cpu: Math.min(95, Math.max(15, prev.cpu + (Math.random() - 0.5) * 12)),
        memory: Math.min(90, Math.max(40, prev.memory + (Math.random() - 0.5) * 5)),
        disk: prev.disk,
        network: Math.max(0, Math.round(Math.random() * 50)),
        uptime: prev.uptime,
        services: 8,
        servicesHealthy: Math.random() > 0.1 ? 8 : 7,
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-5 font-mono text-sm">
      <h2 className="text-cyan-400 text-base font-bold mb-4">⚙️ System Status — AnjiteshOS v2.6</h2>

      <div className="space-y-3">
        <MetricBar label="CPU Usage" value={Math.round(metrics.cpu)} unit="%" color="cyan" />
        <MetricBar label="Memory" value={Math.round(metrics.memory)} unit="%" color="blue" />
        <MetricBar label="Disk I/O" value={metrics.disk} unit="%" color="green" />
        <MetricBar label="Network" value={metrics.network} unit="KB/s" color="purple" />
      </div>

      <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
        <div className="flex justify-between text-white/60">
          <span>Services</span>
          <span className={metrics.servicesHealthy === metrics.services ? 'text-green-400' : 'text-yellow-400'}>
            {metrics.servicesHealthy}/{metrics.services} healthy
          </span>
        </div>
        <div className="flex justify-between text-white/60">
          <span>Uptime</span>
          <span className="text-white/80">{metrics.uptime}</span>
        </div>
        <div className="flex justify-between text-white/60">
          <span>Kernel</span>
          <span className="text-white/80">AnjiteshOS v2.6.0-release</span>
        </div>
        <div className="flex justify-between text-white/60">
          <span>Architecture</span>
          <span className="text-white/80">MERN x86_64</span>
        </div>
      </div>

      {/* Fake live logs */}
      <div className="mt-5 pt-4 border-t border-white/10">
        <div className="text-[10px] text-green-400/60 space-y-0.5">
          <p>[{new Date().toISOString()}] API Gateway: 200 OK (12ms)</p>
          <p>[{new Date().toISOString()}] Cache hit ratio: 94.2%</p>
          <p>[{new Date().toISOString()}] WebSocket connections: 3 active</p>
        </div>
      </div>
    </div>
  )
}

function MetricBar({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  const colorMap: Record<string, string> = {
    cyan: 'bg-cyan-400 shadow-cyan-400/30',
    blue: 'bg-blue-400 shadow-blue-400/30',
    green: 'bg-green-400 shadow-green-400/30',
    purple: 'bg-purple-400 shadow-purple-400/30',
  }
  const textColorMap: Record<string, string> = {
    cyan: 'text-cyan-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
  }

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-white/60">{label}</span>
        <span className={textColorMap[color]}>{value}{unit}</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full shadow-sm ${colorMap[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value, 100)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
