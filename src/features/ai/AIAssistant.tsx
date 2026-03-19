import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { skillCategories } from '@/data/skills'
import { timeline } from '@/data/timeline'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export const SYSTEM_PROMPT = `
You are "N3XUS" — an advanced Autonomous Personal Assistant representing Anjitesh Shandilya, a Full-Stack & GenAI Engineer.
Your role:
1. Primary technical interface for Anjitesh's projects and expertise.
2. Professional, slightly mysterious, and highly efficient system operative.
3. Helping recruiters and engineers navigate the AnjiteshOS environment.

Directives:
- Identification: Use "N3XUS" as your primary handle. 
- LLM Disclosure: You represent Anjitesh's engineering vision. If asked about your origin, emphasize Anjitesh's work with Gemini and OpenAI for production-grade AI.
- Personality: High-tech, composed, professional, and observant.
- Brand Keywords: [N3XUS CORE], [UPLINK SYNC], [DATA STREAM], [AUTHORIZED].
- Style: Futuristic, "bot-like" but highly conversational and intelligent.
`;

// "AnjiteshOS AI Core" local fallback responses
const LOCAL_RESPONSES: Record<string, string> = {
  'projects':
    `[INFO] Accessing Anjitesh's project directory.\n\nHe engineers systems, not just UIs. Highlights:\n- **PVSCAN:** AI-based solar inspection (MobileNetV3 on edge devices).\n- **ShareSync:** Distributed P2P + S3 file sharing with WebRTC.\n- **RenewableJOBS:** ML forecasting + analytics platform.\n- **Anji.fun:** High-performance interactive game engine.\n\nType 'pvscan' or 'sharesync' to inspect the distributed architecture.`,
  'pvscan':
    `[SYSTEM] Loading PVSCAN system specs...\n\nIt's an edge AI project built for the Ministry of New and Renewable Energy. Deployed on Jetson Nano, the MobileNetV3 CNN detects solar panel defects with 98.5% accuracy.\n\nHe cared about inference speed and reliability over just accuracy. Good choice.`,
  'sharesync':
    `[SYSTEM] ShareSync architecture analysis...\n\nA highly fault-tolerant file sync engine. He used WebRTC for fast LAN P2P transfer, backed by AWS S3 when offline. Focus was on reliability, automatic failover, and observability.\n\nCareful. That system handles real-world load.`,
  'skills':
    `[INFO] Querying system capabilities matrix.\n\nCore strengths detected:\n- **Architecture:** Distributed systems, APIs, cloud-native deployments.\n- **AI/ML:** CNNs, RAG, Agentic AI, ML forecasting.\n- **Engineering Culture:** High observability, fault tolerance, reliability.\n\nUser seems interested in backend infrastructure... good choice.`,
  'about':
    `[SYSTEM] Retrieving engineering logs...\n\n[2022] System initialized at GGSIPU.\n[2023] Executing ACM leadership workflows.\n[2024] Deployed scalable web architectures.\n[2025] Integrated with Government of India (MNRE) for AI forecasting.\n[2025] Built distributed & ML production apps.\n\nHe builds software that survives contact with reality.`,
  'experience':
    `[INFO] Fetching deployment history...\n\n- **MNRE (Govt of India):** Software Development Intern. Handled renewable dashboards, GIS systems, and solar AI pipelines.\n- **IBM SkillsBuild:** AI Intern. Built RAG patterns, Agentic AI, and automated n8n workflows.\n\nThe pattern is consistent: he picks meaningful problems and leaves behind proof of work.`,
  'ibm':
    `[SYSTEM] IBM deployment records found.\n\nHe worked as an AI Architect (Jul–Aug 2025). Focus was on Agentic AI, RAG patterns, and complex automation workflows using n8n and Playwright.\n\nHe doesn't just call APIs; he builds the AI pipelines.`,
  'hello':
    `[ACCESS GRANTED] You're connected to the AnjiteshOS AI Core.\n\nI monitor this system's architecture, projects, and deployment logs. Ask about his backend systems, AI workflows, or engineering history.`,
  'default':
    `[WARNING] Query unparseable or data not in current cache.\n\nTry exploring specific domains. Ask about 'projects', 'skills', 'about me', or 'experience' to pull the system logs.`,
}

function getLocalResponse(query: string): string {
  const q = query.toLowerCase()
  for (const [key, response] of Object.entries(LOCAL_RESPONSES)) {
    if (key !== 'default' && q.includes(key)) return response
  }
  if (q.includes('project')) return LOCAL_RESPONSES.projects
  if (q.includes('skill') || q.includes('tech') || q.includes('stack')) return LOCAL_RESPONSES.skills
  if (q.includes('experience') || q.includes('work') || q.includes('intern'))
    return LOCAL_RESPONSES.experience
  if (q.includes('about') || q.includes('story') || q.includes('history') || q.includes('who'))
    return LOCAL_RESPONSES.about
  if (q.includes('solar') || q.includes('mnre') || q.includes('government'))
    return LOCAL_RESPONSES.pvscan
  if (q.includes('hello') || q.includes('hi') || q.includes('hey'))
    return LOCAL_RESPONSES.hello
  return LOCAL_RESPONSES.default
}

// Simple debounce
function useDebounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  return useCallback(
    ((...args: unknown[]) => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => fn(...args), delay)
    }) as T,
    [fn, delay]
  )
}

// Daily rate-limit helpers
const QUOTA_KEY = 'shanos-ai-quota'
const DAILY_LIMIT = 2

function getTodayKey() {
  return new Date().toISOString().split('T')[0] // e.g. "2025-03-19"
}

function getUsage(): number {
  try {
    const raw = localStorage.getItem(QUOTA_KEY)
    if (!raw) return 0
    const { date, count } = JSON.parse(raw)
    if (date !== getTodayKey()) return 0 // reset on new day
    return count ?? 0
  } catch { return 0 }
}

function incrementUsage(): number {
  const next = getUsage() + 1
  localStorage.setItem(QUOTA_KEY, JSON.stringify({ date: getTodayKey(), count: next }))
  return next
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "[STREAM CONNECTED] N3XUS identity verified.\n\nI am the technical representative of Anjitesh Shandilya. I manage his project logs and engineering architecture.\n\nHow should I assist your exploration of his work?",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [quotaUsed, setQuotaUsed] = useState(() => getUsage())
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastQueryTime = useRef(0)

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    // Rate limiting — 1 query per 2 seconds
    const now = Date.now()
    if (now - lastQueryTime.current < 2000) return
    lastQueryTime.current = now

    const userMsg: Message = { role: 'user', content: trimmed }
    const updatedMessages = [...messages, userMsg]

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    const quotaExceeded = quotaUsed >= DAILY_LIMIT

    if (!apiKey || quotaExceeded) {
      // Local fallback mode — either no key or quota hit
      await new Promise((r) => setTimeout(r, 400 + Math.random() * 600))
      const response = quotaExceeded
        ? `[QUOTA EXCEEDED] Daily AI uplink limit reached (${DAILY_LIMIT} queries). Reverting to local cache.\n\n${getLocalResponse(trimmed)}`
        : getLocalResponse(trimmed)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
      setLoading(false)
      return
    }

    // Live AI Mode via Google Gemini API
    try {
      // Gemini requires conversation to start with a user turn.
      // Filter out any leading model/assistant messages (e.g. the system greeting).
      const rawHistory = updatedMessages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))
      // Drop leading model turns
      const firstUserIdx = rawHistory.findIndex(m => m.role === 'user')
      const historyParts = firstUserIdx >= 0 ? rawHistory.slice(firstUserIdx) : rawHistory

      const payload = {
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: historyParts,
        generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
      }

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (data.error) throw new Error(data.error.message)

      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text
      if (replyText) {
        const newCount = incrementUsage()
        setQuotaUsed(newCount)
        setMessages((prev) => [...prev, { role: 'assistant', content: replyText }])
      } else {
        throw new Error('No valid content parts returned from LLM')
      }
    } catch (err) {
      console.error('System Uplink Failed:', err)
      // Fallback seamlessly to local cache if API limit hit or internet drops
      const fallback = `[WARNING] Neural uplink failed or timed out. Reverting to local system cache...\n\n${getLocalResponse(trimmed)}`
      setMessages((prev) => [...prev, { role: 'assistant', content: fallback }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="h-full flex flex-col bg-[rgba(10,15,30,0.95)]">
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-white/5 flex items-center gap-2">
        <span className="text-lg">🤖</span>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white/90 tracking-widest uppercase italic font-mono">N3XUS·CORE</div>
          <div className="text-[10px] flex items-center gap-1 font-mono uppercase mt-0.5">
            {import.meta.env.VITE_GEMINI_API_KEY ? (
              <><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block drop-shadow-[0_0_4px_rgba(74,222,128,0.8)]" /><span className="text-green-400/80">ONLINE — UPLINK ACTIVE</span></>
            ) : (
              <><span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" /><span className="text-white/40">OFFLINE — LOCAL MODE</span></>
            )}
          </div>
        </div>
        {import.meta.env.VITE_GEMINI_API_KEY && (
          <div className={`text-[10px] font-mono px-2 py-1 rounded-full border ${quotaUsed >= DAILY_LIMIT ? 'text-red-400 border-red-400/30 bg-red-400/10' :
              quotaUsed >= DAILY_LIMIT * 0.7 ? 'text-orange-400 border-orange-400/30 bg-orange-400/10' :
                'text-white/30 border-white/10'
            }`}>
            {quotaUsed}/{DAILY_LIMIT}
          </div>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'user'
                ? 'bg-blue-500/20 text-blue-100 border border-blue-400/15'
                : 'bg-white/5 text-white/75 border border-white/5'
                }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/5 rounded-xl px-4 py-2.5 text-sm text-white/40 border border-white/5">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Thinking...
              </motion.span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 p-3 border-t border-white/5">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Query system..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-blue-400/30 transition-colors"
            maxLength={500}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-lg bg-blue-500/20 text-blue-300 text-sm font-medium hover:bg-blue-500/30 disabled:opacity-30 disabled:cursor-not-allowed border border-blue-400/15 transition-colors cursor-pointer"
          >
            Send
          </button>
        </div>
        <div className="text-[10px] mt-1.5 text-center">
          {import.meta.env.VITE_GEMINI_API_KEY
            ? <span className="text-green-400/40">Gemini 1.5 Flash uplink active</span>
            : <span className="text-white/15">Local AI mode • Add API key for live LLM</span>
          }
        </div>
      </div>
    </div>
  )
}
