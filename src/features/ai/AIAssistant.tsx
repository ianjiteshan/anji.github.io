import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { skillCategories } from '@/data/skills'
import { timeline } from '@/data/timeline'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Local fallback responses when no API key is set
const LOCAL_RESPONSES: Record<string, string> = {
  'projects':
    `Anjitesh has built ${projects.length} notable projects:\n\n` +
    projects.map((p) => `• **${p.name}** — ${p.tagline}`).join('\n'),
  'skills':
    `Here are Anjitesh's key skills:\n\n` +
    skillCategories.map((c) => `**${c.name}:** ${c.skills.join(', ')}`).join('\n\n'),
  'experience':
    `Timeline:\n\n` +
    timeline.map((t) => `[${t.year}] ${t.label}`).join('\n'),
  'mnre':
    'Anjitesh interned at the Ministry of New and Renewable Energy (MNRE), Government of India from Jul–Sep 2025. He built **PVSCAN**, an AI solar panel inspection tool achieving 98.5% accuracy using MobileNetV3, and **RenewableJOBS**, a green energy job forecasting platform.',
  'pvscan':
    'PVSCAN is an AI-powered solar panel defect detection system built for MNRE. It uses MobileNetV3 for edge inference on drone-captured images, achieving 98.5% accuracy while keeping the model under 15MB for Jetson Nano deployment.',
  'sharesync':
    'ShareSync is a hybrid cloud + P2P file sharing platform. It combines AWS S3 for reliability with WebRTC for LAN speed, featuring real-time sync, end-to-end encryption, and automatic failover.',
  'ibm':
    'During IBM SkillsBuild internship (Jul–Aug 2025), Anjitesh worked as an Agentic AI Architect. He designed NeoShiksha — a multi-agent learning platform using LangChain + RAG with ChromaDB.',
  'education':
    'B.Tech in Information Technology at USICT, GGSIPU (2022–2026), CGPA: 7.99/10.',
  'leetcode':
    'Anjitesh is active on LeetCode (https://leetcode.com/u/ianjiteshan) with 200+ problems solved. He also practices on GeeksforGeeks (https://geeksforgeeks.org/profile/ianjiteshan).',
  'default':
    "I'm Anjitesh's AI assistant. I can tell you about his **projects**, **skills**, **experience**, **education**, or specific projects like **PVSCAN**, **ShareSync**, **NeoShiksha**. What would you like to know?",
}

function getLocalResponse(query: string): string {
  const q = query.toLowerCase()
  for (const [key, response] of Object.entries(LOCAL_RESPONSES)) {
    if (key !== 'default' && q.includes(key)) return response
  }
  if (q.includes('project')) return LOCAL_RESPONSES.projects
  if (q.includes('skill') || q.includes('tech')) return LOCAL_RESPONSES.skills
  if (q.includes('experience') || q.includes('work') || q.includes('intern'))
    return LOCAL_RESPONSES.experience
  if (q.includes('education') || q.includes('college') || q.includes('gpa'))
    return LOCAL_RESPONSES.education
  if (q.includes('leet') || q.includes('coding') || q.includes('gfg'))
    return LOCAL_RESPONSES.leetcode
  if (q.includes('solar') || q.includes('mnre') || q.includes('government'))
    return LOCAL_RESPONSES.mnre
  if (q.includes('hello') || q.includes('hi') || q.includes('hey'))
    return "Hello! I'm Anjitesh's AI portfolio assistant. Ask me about his projects, skills, experience, or anything else!"
  return LOCAL_RESPONSES.default
}

// Simple debounce
function useDebounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  return useCallback(
    ((...args: unknown[]) => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => fn(...args), delay)
    }) as T,
    [fn, delay]
  )
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "👋 Hi! I'm Anjitesh's AI assistant. Ask me anything about his projects, skills, or experience.\n\nTry: \"What is PVSCAN?\" or \"Show me his skills\"",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
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
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Simulate typing delay then return local response
    await new Promise((r) => setTimeout(r, 500 + Math.random() * 800))

    const response = getLocalResponse(trimmed)
    setMessages((prev) => [...prev, { role: 'assistant', content: response }])
    setLoading(false)
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
        <span className="text-lg">🧠</span>
        <div>
          <div className="text-sm font-semibold text-white/90">NeoShiksha AI Agent</div>
          <div className="text-[10px] text-green-400/60 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Online — Local Mode
          </div>
        </div>
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
              className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
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
            placeholder="Ask about Anjitesh..."
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
        <div className="text-[10px] text-white/15 mt-1.5 text-center">
          Local AI mode • Add API key for live LLM responses
        </div>
      </div>
    </div>
  )
}
