import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'

export default function ProjectViewer() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedProject = projects.find((p) => p.id === selected)

  return (
    <div className="h-full flex">
      {/* Sidebar — project list */}
      <div className="w-56 shrink-0 border-r border-white/10 overflow-y-auto bg-black/20">
        <div className="p-3 border-b border-white/5">
          <h3 className="text-xs text-white/40 font-semibold uppercase tracking-wider">
            Projects ({projects.length})
          </h3>
        </div>
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className={`w-full text-left px-3 py-2.5 border-b border-white/3 transition-colors duration-100 cursor-pointer ${
              selected === p.id
                ? 'bg-blue-500/15 text-white border-l-2 border-l-blue-400'
                : 'text-white/60 hover:bg-white/5 border-l-2 border-l-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{p.icon}</span>
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-[10px] text-white/30 truncate">{p.tagline}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedProject ? (
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{selectedProject.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-white">{selectedProject.name}</h2>
                <p className="text-sm text-blue-300/60">{selectedProject.tagline}</p>
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-5">
              {selectedProject.description}
            </p>

            {/* Tech stack */}
            <div className="mb-5">
              <h3 className="text-xs text-white/40 uppercase tracking-wider mb-2 font-semibold">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-xs bg-blue-500/15 text-blue-300/80 border border-blue-400/15"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div className="mb-5">
              <h3 className="text-xs text-white/40 uppercase tracking-wider mb-2 font-semibold">
                Architecture
              </h3>
              <p className="text-white/60 text-sm leading-relaxed bg-white/3 rounded-lg p-3 border border-white/5">
                {selectedProject.architecture}
              </p>
            </div>

            {/* Challenges */}
            <div className="mb-5">
              <h3 className="text-xs text-white/40 uppercase tracking-wider mb-2 font-semibold">
                Challenges Solved
              </h3>
              <p className="text-white/60 text-sm leading-relaxed bg-white/3 rounded-lg p-3 border border-white/5">
                {selectedProject.challenges}
              </p>
            </div>

            {/* Links */}
            {selectedProject.links && (
              <div className="flex gap-3">
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 text-sm text-white/70 border border-white/10 transition-colors"
                  >
                    🐙 GitHub
                  </a>
                )}
                {selectedProject.links.live && (
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md bg-blue-500/15 hover:bg-blue-500/25 text-sm text-blue-300 border border-blue-400/15 transition-colors"
                  >
                    🔗 Live Demo
                  </a>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-white/20">
            <span className="text-5xl mb-4">📁</span>
            <p className="text-sm">Select a project to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}
