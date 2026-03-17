import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { skillCategories, codingProfiles } from '@/data/skills'
import { timeline } from '@/data/timeline'

export default function RecruiterMode() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-blue-400/20 shrink-0">
              <img src="/images/hero-banner.jpg" alt="Anjitesh" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Anjitesh Shandilya</h1>
              <p className="text-blue-300/60 mt-1">Backend Engineer · AI/ML · Distributed Systems</p>
              <div className="flex gap-3 mt-2 flex-wrap">
                {Object.values(codingProfiles).map((p) => (
                  <a
                    key={p.label}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400/60 hover:text-blue-400 transition-colors"
                  >
                    {p.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <a
              href="/Resume.pdf"
              target="_blank"
              className="px-4 py-2 rounded-lg bg-blue-500/15 text-blue-300 text-sm font-medium border border-blue-400/15 hover:bg-blue-500/25 transition-colors"
            >
              📄 Download Resume
            </a>
            <button
              onClick={() => {
                window.location.hash = ''
                window.location.reload()
              }}
              className="px-4 py-2 rounded-lg bg-white/5 text-white/50 text-sm border border-white/10 hover:bg-white/10 hover:text-white/70 transition-colors cursor-pointer"
            >
              🖥️ Enter OS Mode
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        {/* Skills */}
        <section>
          <h2 className="text-lg font-bold text-white/80 mb-4">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skillCategories.map((cat) => (
              <div key={cat.name} className="p-4 rounded-lg bg-white/3 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span>{cat.icon}</span>
                  <h3 className="text-sm font-semibold text-white/70">{cat.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  {cat.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded text-[11px] bg-blue-500/10 text-blue-300/60">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-lg font-bold text-white/80 mb-4">Projects</h2>
          <div className="space-y-3">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-4 rounded-lg bg-white/3 border border-white/5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white/80 flex items-center gap-2">
                      <span>{p.icon}</span> {p.name}
                    </h3>
                    <p className="text-xs text-blue-300/50 mt-0.5">{p.tagline}</p>
                  </div>
                  <div className="flex gap-2">
                    {p.links?.github && (
                      <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-white/60">
                        GitHub ↗
                      </a>
                    )}
                    {p.links?.live && (
                      <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400/60 hover:text-blue-400">
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-white/40 mt-2 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.techStack.map((t) => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/30">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-lg font-bold text-white/80 mb-4">Experience Timeline</h2>
          <div className="space-y-3 border-l border-white/10 pl-4">
            {timeline.map((entry, i) => (
              <div key={i}>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/25 font-mono">{entry.year}</span>
                  <span className="text-sm text-white/60 font-medium">{entry.label}</span>
                </div>
                <p className="text-xs text-white/30 ml-[62px] mt-0.5">{entry.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 text-center text-xs text-white/20">
        <p>Built with AnjiteshOS v2.6 • © 2025 Anjitesh Shandilya</p>
      </footer>
    </div>
  )
}
