import React, { useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

const SYSTEM_NODES = [
  { id: 'root', name: 'ROOT_CORE', x: 0, y: 0, type: 'hub', desc: 'Central Processing Network' },
  { id: 'db', name: 'DATA_NEXUS', x: 300, y: -200, type: 'storage', desc: 'Secure Data Archives' },
  { id: 'ai', name: 'NEURAL_WEB', x: -400, y: -100, type: 'process', desc: 'Machine Learning Pipelines' },
  { id: 'auth', name: 'SECURITY_GATE', x: 150, y: 300, type: 'wall', desc: 'Authentication Relays' },
  { id: 'ui', name: 'FRONTEND_PAYLOAD', x: -250, y: 250, type: 'interface', desc: 'User Facing Shell' },
]

export default function SystemNodeMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  const [scale, setScale] = useState(1)
  const [activeNode, setActiveNode] = useState<string | null>(null)

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden mix-blend-screen"
      ref={containerRef}
    >
      <div className="absolute top-6 left-6 font-mono text-xs text-red-500/60 uppercase tracking-widest z-40 bg-black/40 p-2 rounded border border-red-500/20 backdrop-blur-sm">
        [SYSTEM MAP BACKGROUND]
      </div>

      <motion.div
        ref={mapRef}
        className="absolute left-1/2 top-1/2 h-0 w-0"
        style={{ scale }}
      >
        {/* Connection Lines (SVGs drawing from root) */}
        <svg className="absolute inset-0 overflow-visible pointer-events-none" style={{ width: 0, height: 0 }}>
          {SYSTEM_NODES.filter(n => n.id !== 'root').map((node) => (
            <line
              key={`line-${node.id}`}
              x1={0} y1={0} x2={node.x} y2={node.y}
              stroke="rgba(255,42,42,0.3)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          ))}
          {/* A secondary connection */}
          <line
            x1={SYSTEM_NODES[2].x} y1={SYSTEM_NODES[2].y}
            x2={SYSTEM_NODES[4].x} y2={SYSTEM_NODES[4].y}
            stroke="rgba(255,42,42,0.2)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        </svg>

        {/* Nodes */}
        {SYSTEM_NODES.map((node) => {
          const isActive = activeNode === node.id

          return (
            <motion.div
              key={node.id}
              className="absolute group z-10 pointer-events-auto"
              style={{ x: node.x, y: node.y }}
              onHoverStart={() => setActiveNode(node.id)}
              onHoverEnd={() => setActiveNode(null)}
            >
              <div
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${isActive ? 'bg-red-500 scale-125' : 'bg-red-900 border border-red-500'
                  }`}
                style={{
                  width: node.type === 'hub' ? 32 : 16,
                  height: node.type === 'hub' ? 32 : 16,
                  boxShadow: isActive ? '0 0 20px rgba(255,42,42,0.8)' : '0 0 10px rgba(255,42,42,0.3)',
                  cursor: 'pointer' // Overridden by global none, but semantically correct
                }}
              />

              {/* Radar Ping on Hub */}
              {node.type === 'hub' && (
                <div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-red-500/50 animate-ping" />
              )}

              {/* Tooltip / Label */}
              <div
                className={`absolute left-6 top-1/2 -translate-y-1/2 w-48 transition-opacity duration-300 min-w-max ${isActive ? 'opacity-100' : 'opacity-30'
                  }`}
              >
                <div className="font-mono text-xs font-bold text-red-500 mb-1" style={{ textShadow: '0 0 5px rgba(255,0,0,0.8)' }}>
                  [{node.name}]
                </div>
                <div className="font-mono text-[10px] text-red-300">
                  {node.desc}
                </div>
                {/* Coordinates */}
                <div className="font-mono text-[8px] text-red-600/60 mt-0.5">
                  POS: {node.x}.{Math.abs(node.y)} // STAT: OK
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
