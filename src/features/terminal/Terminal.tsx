import { useEffect, useRef, useCallback, useState } from 'react'
import { projects } from '@/data/projects'
import { skillCategories } from '@/data/skills'
import { timeline } from '@/data/timeline'
import { useWindowStore } from '@/core/store/useWindowStore'
import { useSystemStore } from '@/core/store/useSystemStore'

// Dynamic command registry — each command is a function
type CommandFn = (args: string[], ctx: CommandContext) => string[]

interface CommandContext {
  openWindow: (id: string, title: string, component: string, w?: number, h?: number) => void
  setBootPhase: (phase: 'shutdown') => void
  setMatrixMode: (v: boolean) => void
}

const COMMANDS: Record<string, CommandFn> = {
  help: () => [
    '╔══════════════════════════════════════════╗',
    '║     ShanOS Terminal — v2.6           ║',
    '╠══════════════════════════════════════════╣',
    '║  help          Show this menu            ║',
    '║  about         About Anjitesh            ║',
    '║  projects      List all projects         ║',
    '║  skills        Show skill categories     ║',
    '║  experience    Show timeline             ║',
    '║  open <name>   Open a project window     ║',
    '║  run agent     Launch AI Assistant       ║',
    '║  whoami        User info                 ║',
    '║  ls            List desktop items        ║',
    '║  cat resume    View resume summary       ║',
    '║  neofetch      System info               ║',
    '║  matrix        Toggle matrix rain        ║',
    '║  flashlight    Toggle flashlight mode    ║',
    '║  clear         Clear terminal            ║',
    '║  shutdown      Shut down system          ║',
    '╚══════════════════════════════════════════╝',
  ],

  about: () => [
    '',
    '  Anjitesh Shandilya',
    '  ──────────────────',
    '  Backend Engineer • AI/ML • Distributed Systems',
    '  B.Tech IT @ USICT, GGSIPU (CGPA: 8.0/10)',
    '',
    '  Current Focus:',
    '    → Backend-heavy software & API-driven architecture',
    '    → AI workflows & intelligent automation',
    '    → Production-ready systems at scale',
    '',
    '  "If you need someone who can build the API, explain',
    '   the ML system, and present the work clearly,',
    '   I fit that lane well."',
    '',
  ],

  projects: () => {
    const lines = ['', '  ╔═══ Project Registry ═══╗', '']
    projects.forEach((p) => {
      lines.push(`  ${p.icon} ${p.name}`)
      lines.push(`    ${p.tagline}`)
      lines.push(`    Tech: ${p.techStack.slice(0, 4).join(', ')}`)
      lines.push('')
    })
    lines.push('  Type: open <project-id> to view details')
    lines.push('')
    return lines
  },

  skills: () => {
    const lines = ['', '  ╔═══ Skill Matrix ═══╗', '']
    skillCategories.forEach((cat) => {
      lines.push(`  ${cat.icon} ${cat.name}`)
      lines.push(`    ${cat.skills.join(' · ')}`)
      lines.push('')
    })
    return lines
  },

  experience: () => {
    const lines = ['', '  ╔═══ System Logs ═══╗', '']
    timeline.forEach((entry) => {
      lines.push(`  [${entry.year}] ${entry.label}`)
      lines.push(`           ${entry.detail.substring(0, 70)}...`)
      lines.push('')
    })
    return lines
  },

  open: (args, ctx) => {
    const target = args[0]?.toLowerCase()
    if (!target) return ['  Usage: open <project-id>', '  Example: open pvscan']

    const project = projects.find(
      (p) => p.id === target || p.name.toLowerCase().includes(target)
    )
    if (project) {
      ctx.openWindow(project.id, project.name, 'projects', 800, 550)
      return [`  Opening ${project.name}...`]
    }

    if (target === 'resume') {
      ctx.openWindow('resume', 'Resume.pdf', 'resume', 650, 550)
      return ['  Opening Resume...']
    }

    return [`  Error: "${target}" not found. Type "projects" to see available.`]
  },

  run: (args, ctx) => {
    if (args[0] === 'agent') {
      ctx.openWindow('ai', 'AI Agent', 'ai', 500, 550)
      return ['  Launching AI Agent...']
    }
    return ['  Usage: run agent']
  },

  whoami: () => [
    '  anjitesh@shanos',
    '  Backend Engineer | AI/ML | Distributed Systems',
    '  Location: New Delhi, India',
    '  Open to: SDE / ML roles',
  ],

  ls: () => [
    '  drwxr-xr-x  projects/',
    '  drwxr-xr-x  terminal/',
    '  -rw-r--r--  Resume.pdf',
    '  drwxr-xr-x  ai-agent/',
    '  drwxr-xr-x  system-logs/',
    '  -rwxr-xr-x  shutdown',
  ],

  cat: (args) => {
    if (args[0] === 'resume' || args.join(' ') === 'resume.md') {
      return [
        '',
        '  # Anjitesh Shandilya',
        '  Backend Engineer | AI/ML | Distributed Systems',
        '',
        '  ## Education',
        '  • B.Tech IT — USICT, GGSIPU (2022–2026)',
        '    CGPA: 8.0/10',
        '',
        '  ## Experience',
        '  • MNRE, Gov of India — Software Development Engineer Intern',
        '  • IBM SkillsBuild / IBM — AI Intern',
        '',
        '  ## Top Projects',
        '  • PVSCAN — 98.5% accuracy solar inspection',
        '  • ShareSync — Hybrid cloud + P2P architecture',
        '  • WithU247 — AI mental health platform',
        '',
        '  Type "open resume" for full PDF',
        '',
      ]
    }
    return [`  cat: ${args[0] || ''}: No such file or directory`]
  },

  neofetch: () => [
    '',
    '       ╔══════════╗',
    '       ║ ShanOS ║     anjitesh@shanos',
    '       ╚══════════╝     ─────────────────',
    '         ╱╲              OS: ShanOS v2.6',
    '        ╱  ╲             Host: Anjitesh Shandilya',
    '       ╱    ╲            Role: Backend & AI Engineer',
    '      ╱______╲           Shell: zsh + node',
    '     ╱________╲          Uptime: ~3 years',
    '    ╱__________╲         Packages: 417+ DSA Solved',
    '                         CPU: Backend Systems',
    '                         GPU: AI/ML Core',
    '                         Memory: 8.0 CGPA / 10',
    '',
  ],

  matrix: (_args, ctx) => {
    ctx.setMatrixMode(true)
    return ['  Matrix mode activated. Click anywhere to exit.']
  },

  flashlight: () => {
    // This will be handled by the component
    return ['  Flashlight mode toggled.']
  },

  shutdown: (_args, ctx) => {
    setTimeout(() => ctx.setBootPhase('shutdown'), 1000)
    return ['  Shutting down ShanOS...', '  Goodbye.']
  },

  'sudo': (args) => {
    if (args.join(' ').includes('rm -rf')) {
      return [
        '',
        '  ⚠️  CRITICAL SYSTEM ERROR',
        '  ════════════════════════',
        '  Deleting /system/core... ██████████ 100%',
        '  Deleting /user/data...   ██████████ 100%',
        '  Deleting /boot/kernel... ██████░░░░  60%',
        '',
        '  Just kidding 😉',
        '  Nice try though. System is safe.',
        '',
      ]
    }
    return ['  sudo: permission denied (this is a portfolio, not a server)']
  },

  clear: () => [],
}

export default function Terminal() {
  const termRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [history, setHistory] = useState<string[]>([
    'ShanOS Terminal v2.6',
    'Type "help" for available commands.',
    '',
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [matrixMode, setMatrixMode] = useState(false)

  const openWindow = useWindowStore((s) => s.openWindow)
  const setBootPhase = useSystemStore((s) => s.setBootPhase)
  const toggleFlashlight = useSystemStore((s) => s.toggleFlashlight)

  const ctx: CommandContext = {
    openWindow: (id, title, component, w = 700, h = 500) => {
      openWindow({
        id,
        title,
        component,
        x: 80 + Math.random() * 150,
        y: 40 + Math.random() * 80,
        width: w,
        height: h,
      })
    },
    setBootPhase,
    setMatrixMode,
  }

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    const parts = trimmed.split(/\s+/)
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    const promptLine = `anjitesh@shanos:~$ ${trimmed}`

    if (command === 'clear') {
      setHistory([])
      return
    }

    if (command === 'flashlight') {
      toggleFlashlight()
      setHistory((prev) => [...prev, promptLine, '  Flashlight mode toggled.', ''])
      return
    }

    const handler = COMMANDS[command]
    if (handler) {
      const output = handler(args, ctx)
      setHistory((prev) => [...prev, promptLine, ...output, ''])
    } else {
      setHistory((prev) => [
        ...prev,
        promptLine,
        `  Command not found: ${command}. Type "help" for available commands.`,
        '',
      ])
    }

    setCmdHistory((prev) => [trimmed, ...prev])
    setHistoryIndex(-1)
  }, [toggleFlashlight, openWindow, setBootPhase])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1)
        setHistoryIndex(newIndex)
        setInput(cmdHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(cmdHistory[newIndex])
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  // Auto-scroll to bottom
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight
    }
  }, [history])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div
      className="h-full flex flex-col bg-[#0a0a0a] font-mono text-sm cursor-text relative"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Matrix overlay */}
      {matrixMode && (
        <div
          className="absolute inset-0 z-50 cursor-pointer"
          onClick={() => setMatrixMode(false)}
        >
          <MatrixCanvas />
        </div>
      )}

      {/* Terminal output */}
      <div ref={termRef} className="flex-1 overflow-y-auto p-4 space-y-0">
        {history.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap leading-relaxed ${line.startsWith('anjitesh@')
                ? 'text-green-400'
                : line.includes('Error') || line.includes('CRITICAL')
                  ? 'text-red-400'
                  : line.includes('╔') || line.includes('╚') || line.includes('║')
                    ? 'text-cyan-400/80'
                    : 'text-green-300/70'
              }`}
          >
            {line}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center text-green-400">
          <span className="shrink-0">anjitesh@shanos:~$&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-300 caret-green-400"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
}

// Inline Matrix Canvas — triggered by "matrix" command
function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(1)
    const chars = 'アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#0f0'
      ctx.font = `${fontSize}px monospace`

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, y * fontSize)
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      })
    }

    const interval = setInterval(draw, 35)
    return () => clearInterval(interval)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'black' }}
    />
  )
}
