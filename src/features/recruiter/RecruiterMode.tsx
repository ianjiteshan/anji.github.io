import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { codingProfiles } from '@/data/skills'

const featuredProjects = projects.slice(0, 3)
const additionalProjects = projects.slice(3, 8)

const recruiterSignals = [
  {
    title: 'Backend-first execution',
    detail: 'Production APIs, data-heavy workflows, and systems that are designed beyond the demo layer.',
  },
  {
    title: 'AI with implementation depth',
    detail: 'RAG, model deployment, agentic workflows, NLP pipelines, and measurable outcomes in real projects.',
  },
  {
    title: 'Clear communication',
    detail: 'The work is documented and presented in a way that makes technical value legible to hiring teams.',
  },
]

const availability = [
  'Backend Engineering',
  'AI Product Engineering',
  'Full Stack Roles',
  'Systems-Focused Teams',
]

const fallbackContributionRows = [
  [1, 2, 0, 1, 0, 3, 1, 0, 2, 1, 0, 1, 2, 0, 3, 1, 0, 2, 1, 3, 2, 0, 1, 0, 2, 1],
  [0, 1, 1, 0, 2, 3, 1, 0, 1, 0, 2, 3, 2, 0, 1, 0, 2, 1, 0, 2, 3, 0, 1, 2, 3, 1],
  [2, 0, 1, 0, 1, 2, 3, 1, 0, 2, 1, 0, 3, 1, 0, 2, 1, 0, 1, 3, 2, 1, 0, 1, 2, 0],
  [1, 0, 2, 1, 0, 1, 2, 0, 3, 2, 1, 0, 1, 2, 3, 1, 0, 2, 1, 0, 1, 2, 3, 1, 0, 2],
  [3, 1, 0, 2, 1, 0, 1, 3, 2, 1, 0, 2, 1, 0, 2, 3, 1, 0, 1, 2, 0, 1, 2, 3, 1, 0],
  [0, 1, 0, 2, 1, 3, 2, 1, 0, 1, 2, 0, 1, 2, 3, 1, 0, 2, 1, 0, 3, 2, 1, 0, 1, 2],
  [1, 0, 2, 3, 1, 0, 1, 2, 0, 1, 3, 2, 1, 0, 2, 1, 0, 1, 2, 3, 1, 0, 2, 1, 0, 1],
]

const GITHUB_USERNAME = 'ianjiteshan'
const LEETCODE_USERNAME = 'ianjiteshan'
const GFG_USERNAME = 'ianjiteshan'
const ACTIVITY_WEEKS = 26
const GRID_ROWS = 7
const RECRUITER_VIEWPORT = { once: true, margin: '-50px 0px -50px 0px' }
const sectionReveal = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.64,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
}
const settleCard = {
  hidden: { opacity: 0, y: 36, scale: 0.975, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
}
const settleSoft = {
  hidden: { opacity: 0, y: 26, scale: 0.99, filter: 'blur(2px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.54, ease: [0.22, 1, 0.36, 1] },
  },
}
const footerReveal = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.07,
    },
  },
}

type GitHubEvent = {
  created_at: string
}

type LeetCodeSolvedResponse = {
  totalSolved?: number
  total_solved?: number
  solvedProblem?: number
  solved_problems?: number
  easySolved?: number
  mediumSolved?: number
  hardSolved?: number
  data?: {
    totalSolved?: number
    total_solved?: number
    solvedProblem?: number
    solved_problems?: number
    easySolved?: number
    mediumSolved?: number
    hardSolved?: number
  }
}

type LeetCodeRatingResponse = {
  data?: {
    userContestRanking?: {
      rating?: number
    }
  }
  userContestRanking?: {
    rating?: number
  }
}

type GFGStatsResponse = {
  info?: {
    totalProblemsSolved?: number | string
    total_problems_solved?: number | string
  }
  totalProblemsSolved?: number | string
  total_problems_solved?: number | string
  solved?: number | string
  stats?: {
    totalProblemsSolved?: number | string
    total_problems_solved?: number | string
  }
}

type LinkKind = 'github' | 'linkedin' | 'leetcode' | 'gfg' | 'instagram' | 'x' | 'youtube' | 'mail' | 'phone' | 'external'

function LinkIcon({ kind, className = 'h-4 w-4' }: { kind: LinkKind; className?: string }) {
  if (kind === 'github') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.59 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.15-4.55-5.1 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.31.1-2.74 0 0 .84-.27 2.75 1.06A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.06 2.75-1.06.55 1.43.2 2.48.1 2.74.64.72 1.03 1.64 1.03 2.77 0 3.96-2.34 4.84-4.57 5.09.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.24C22 6.59 17.52 2 12 2Z" />
      </svg>
    )
  }

  if (kind === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3ZM20 12.88c0-3.46-1.84-5.07-4.3-5.07-1.98 0-2.87 1.1-3.37 1.87V8.5H8.96V20h3.37v-6.41c0-1.69.32-3.32 2.4-3.32 2.05 0 2.08 1.94 2.08 3.43V20H20v-7.12Z" />
      </svg>
    )
  }

  if (kind === 'leetcode') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M14.6 4.2 8.3 10.5a2.1 2.1 0 0 0 0 3l6.3 6.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.4 12H10.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12.9 2.8 18.2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (kind === 'gfg') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M6 12.2c0-3.5 2.4-6.2 6-6.2 2.1 0 3.6.7 4.9 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 11.8c0 3.5-2.4 6.2-6 6.2-2.1 0-3.6-.7-4.9-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M15.2 9.2H18v2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.8 14.8H6v-2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (kind === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    )
  }

  if (kind === 'x') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M18.9 3H21l-6.54 7.47L22 21h-5.91l-4.63-6.05L6.16 21H4l6.99-7.98L2 3h6.06l4.19 5.56L18.9 3Z" />
      </svg>
    )
  }

  if (kind === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M20.6 7.2a2.9 2.9 0 0 0-2-2C16.8 4.7 12 4.7 12 4.7s-4.8 0-6.6.5a2.9 2.9 0 0 0-2 2C3 9 3 12 3 12s0 3 .4 4.8a2.9 2.9 0 0 0 2 2c1.8.5 6.6.5 6.6.5s4.8 0 6.6-.5a2.9 2.9 0 0 0 2-2C21 15 21 12 21 12s0-3-.4-4.8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m10 15.5 5-3.5-5-3.5v7Z" fill="currentColor" />
      </svg>
    )
  }

  if (kind === 'mail') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M4 7.5 12 13l8-5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }

  if (kind === 'phone') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M7 4h3l1.2 4.1-1.8 1.8a15 15 0 0 0 4.6 4.6l1.8-1.8L20 14v3a2 2 0 0 1-2.2 2A17.8 17.8 0 0 1 5 6.2 2 2 0 0 1 7 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M14 5h5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14 19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BrandedLink({
  href,
  label,
  kind,
  variant = 'outline',
  targetBlank = true,
  className = '',
}: {
  href: string
  label: string
  kind: LinkKind
  variant?: 'solid' | 'outline' | 'ghost'
  targetBlank?: boolean
  className?: string
}) {
  const baseClassName = 'inline-flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-300'
  const variantClassName =
    variant === 'solid'
      ? 'bg-white text-[#111111] hover:bg-[#f4efe6]'
      : variant === 'ghost'
        ? 'text-inherit hover:translate-x-1'
        : 'border border-current/15 px-4 py-3 hover:-translate-y-0.5'

  return (
    <a
      href={href}
      target={targetBlank ? '_blank' : undefined}
      rel={targetBlank ? 'noopener noreferrer' : undefined}
      className={`${baseClassName} ${variantClassName} ${className}`.trim()}
    >
      <LinkIcon kind={kind} className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </a>
  )
}

function parseLeetCodeSolvedCount(payload: LeetCodeSolvedResponse | null) {
  if (!payload) return 0

  const directTotal =
    payload.totalSolved ??
    payload.total_solved ??
    payload.solvedProblem ??
    payload.solved_problems ??
    payload.data?.totalSolved ??
    payload.data?.total_solved ??
    payload.data?.solvedProblem ??
    payload.data?.solved_problems

  if (typeof directTotal === 'number' && Number.isFinite(directTotal) && directTotal > 0) {
    return directTotal
  }

  const easy = payload.easySolved ?? payload.data?.easySolved ?? 0
  const medium = payload.mediumSolved ?? payload.data?.mediumSolved ?? 0
  const hard = payload.hardSolved ?? payload.data?.hardSolved ?? 0
  const summed = easy + medium + hard

  return Number.isFinite(summed) && summed > 0 ? summed : 0
}

function parseGfgSolvedCount(payload: GFGStatsResponse | null) {
  if (!payload) return 0

  const rawTotal =
    payload.info?.totalProblemsSolved ??
    payload.info?.total_problems_solved ??
    payload.totalProblemsSolved ??
    payload.total_problems_solved ??
    payload.solved ??
    payload.stats?.totalProblemsSolved ??
    payload.stats?.total_problems_solved ??
    0

  const total = typeof rawTotal === 'string' ? Number.parseInt(rawTotal, 10) : rawTotal
  return Number.isFinite(total) && total > 0 ? total : 0
}

function buildActivityGrid(eventDates: string[]) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = new Date(today)
  start.setDate(today.getDate() - (ACTIVITY_WEEKS * GRID_ROWS - 1))

  const countsByDay = new Map<string, number>()
  for (const date of eventDates) {
    const dayKey = new Date(date).toISOString().slice(0, 10)
    countsByDay.set(dayKey, (countsByDay.get(dayKey) ?? 0) + 1)
  }

  const rows = Array.from({ length: GRID_ROWS }, () => [] as number[])
  let maxCount = 0

  for (let index = 0; index < ACTIVITY_WEEKS * GRID_ROWS; index += 1) {
    const day = new Date(start)
    day.setDate(start.getDate() + index)
    const dayKey = day.toISOString().slice(0, 10)
    const count = countsByDay.get(dayKey) ?? 0
    maxCount = Math.max(maxCount, count)
    rows[index % GRID_ROWS].push(count)
  }

  const normalizedRows = rows.map((row) =>
    row.map((count) => {
      if (count === 0) return 0
      if (maxCount <= 1) return 3
      const ratio = count / maxCount
      if (ratio < 0.34) return 1
      if (ratio < 0.67) return 2
      return 3
    }),
  )

  return {
    rows: normalizedRows,
    totalEvents: eventDates.length,
  }
}

const resumeSummary =
  'Aspiring full stack developer with a solid foundation in frontend and backend technologies, experienced in building scalable, user-focused applications. Skilled in modern frameworks, databases, and API-driven architectures, with additional expertise in data analysis and visualization.'

const expertise = [
  'MERN Stack',
  'Web Development',
  'Full Stack Development',
  'Machine Learning',
  'Artificial Intelligence',
  'Agentic AI',
  'Software Development',
  'Software Testing',
  'Frontend Development',
  'React',
  'Angular',
  'HTML',
  'CSS',
  'JavaScript',
  'Backend Development',
  'Node.js',
  'Express',
  'Java',
  'Spring Boot',
  'Python',
  'Flask',
  'API Development',
  'API Integration',
  'Git',
  'GitHub',
  'Data Analysis',
  'SQL',
  'Excel',
  'Tableau',
  'Power BI',
  'Problem Solving',
  'Debugging',
]

const skillGroups = [
  {
    title: 'Engineering',
    items: ['MERN Stack', 'Full Stack Development', 'Web Development', 'Software Development', 'Software Testing'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Angular', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Java', 'Spring Boot', 'Python', 'Flask', 'API Development', 'API Integration'],
  },
  {
    title: 'AI and Data',
    items: ['Machine Learning', 'Artificial Intelligence', 'Agentic AI', 'Data Analysis', 'SQL', 'Excel', 'Tableau', 'Power BI'],
  },
]

const education = [
  {
    school: 'University School of Information, Communication and Technology, GGSIPU',
    detail: 'B.Tech. Information Technology',
    score: 'CGPA: 8.0 / 10',
    year: '2022 - 2026',
  },
  {
    school: 'Kendriya Vidyalaya Viraspuri, New Delhi',
    detail: '12th',
    score: 'Percentage: 90.50 / 100',
    year: '2022',
  },
  {
    school: 'Delhi International School, Sector 23 Dwarka, South West Delhi',
    detail: '10th',
    score: 'Percentage: 90.33 / 100',
    year: '2020',
  },
]

const experience = [
  {
    org: 'Ministry of New and Renewable Energy (Government of India)',
    role: 'Software Development Engineer Intern',
    date: '01 Jul, 2025 - 01 Sep, 2025',
    meta: 'India | Government / PSU / Energy Informatics',
    skills: [
      'Front-End Web Development',
      'Power BI',
      'AI/ML',
      'SQL',
      'Python',
      'JavaScript',
      'React',
      'Flask',
      'API Integration',
      'Data Analysis',
      'GIS',
      'Streamlit',
      'Git',
      'Excel',
      'Computer Vision',
      'Data Structures',
      'Spring Boot',
      'Tableau',
    ],
    bullets: [
      'Worked on initiatives at the intersection of technology, sustainability, and public policy, building data-driven solutions to support clean energy transition.',
      'Contributed to renewable energy dashboards, analytics APIs, and optimization pipelines using GIS-based visualization and asset-performance indicators.',
      'Applied AI/ML for solar forecasting and anomaly detection, and created decision-support systems for policymakers under national renewable energy programs.',
      'Worked with government-grade systems and data governance constraints while building tools for energy policy and public-sector analytics.',
    ],
  },
  {
    org: 'IBM SkillsBuild / IBM',
    role: 'AI Intern',
    date: '04 Jul, 2025 - 07 Aug, 2025',
    meta: 'IBM SkillsBuild x Edunet Foundation',
    skills: ['Retrieval-Augmented Generation', 'Agentic AI', 'AI Pipelines', 'Playwright', 'Automation', 'n8n', 'MCP Servers'],
    bullets: [
      'Built projects as part of IBM SkillsBuild x Edunet AI Agentic Learning Program.',
      'Designed AI pipelines for scalable deployments and implemented automation workflows with Playwright and n8n.',
      'Integrated RAG patterns to improve retrieval quality and knowledge-grounded responses.',
      'Developed hands-on AI projects covering intelligent agents, orchestration patterns, and deployment-oriented workflow design.',
    ],
  },
]

export default function RecruiterMode() {
  const [isNightMode, setIsNightMode] = useState(false)
  const [activityRows, setActivityRows] = useState<number[][]>(fallbackContributionRows)
  const [activityCount, setActivityCount] = useState(0)
  const [activityState, setActivityState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [leetcodeSolved, setLeetcodeSolved] = useState(307)
  const [gfgSolved, setGfgSolved] = useState(110)
  const [leetcodeRating, setLeetcodeRating] = useState(1413)
  const footerSocialProfiles = [
    codingProfiles.github,
    codingProfiles.linkedin,
    codingProfiles.leetcode,
    codingProfiles.gfg,
    codingProfiles.instagram,
    codingProfiles.x,
    codingProfiles.youtube,
  ]
  const playTheme = isNightMode
    ? {
        card: 'bg-[#151a24] border-white/10 text-white',
        muted: 'text-white/62',
      }
    : {
        card: 'bg-white border-[#111111]/8 text-[#111111]',
        muted: 'text-[#111111]/62',
      }
  const theme = isNightMode
    ? {
        root: 'bg-[#0b0d12] text-[#f3efe8]',
        overlay: 'bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.16),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(255,255,255,0.06),_transparent_24%)]',
        glowLeft: 'bg-[#7c3aed]/18',
        glowRight: 'bg-[#c084fc]/10',
        rule: 'via-white/10',
        header: 'border-white/10 bg-[#0b0d12]/80',
        brand: 'text-white',
        nav: 'text-white/70 hover:text-white',
        pill: 'border-white/10 bg-white/5 text-white/72',
        pillSoft: 'border-white/10 bg-[#171c27] text-white',
        primaryButton: 'bg-white text-[#111111] hover:bg-[#f0e7ff]',
        secondaryButton: 'border-white/12 bg-white/5 text-white hover:bg-white hover:text-[#111111]',
        tertiaryButton: 'border-white/12 bg-[#171c27] text-white hover:bg-[#202738]',
        statCard: 'border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.24)]',
        statText: 'text-white',
        statMuted: 'text-white/55',
        heroCard: 'border-white/10 bg-[#121826] shadow-[0_30px_90px_rgba(0,0,0,0.34)]',
        surface: 'border-white/10 bg-[#121826]',
        surfaceSoft: 'bg-[#171d2a]',
        surfaceMuted: 'bg-[#11151d]',
        sectionLabel: 'text-white/42',
        heading: 'text-white',
        body: 'text-white/68',
        bodyStrong: 'text-white/78',
        tag: 'border-white/10 bg-[#171d2a] text-white/70',
        inverseBlock: 'border-white/10 bg-[#05070b] text-white',
        sectionBorder: 'border-white/10',
        marqueeFadeLeft: 'from-[#0b0d12] to-transparent',
        marqueeFadeRight: 'from-[#0b0d12] to-transparent',
        marqueeText: 'text-white/45',
        projectCard: 'border-white/10 bg-[#121826] shadow-[0_20px_60px_rgba(0,0,0,0.22)] hover:shadow-[0_28px_80px_rgba(0,0,0,0.32)]',
        projectIcon: 'bg-white text-[#111111]',
        projectMuted: 'text-white/48',
        projectBody: 'text-white/68',
        techChip: 'border-white/10 bg-[#171d2a] text-white/68',
        secondaryProject: 'border-white/10 bg-[#171d2a] hover:bg-[#1d2433] hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]',
        timelineCard: 'border-white/10 bg-[#121826] shadow-[0_12px_40px_rgba(0,0,0,0.2)]',
        timelineBadge: 'border-white/10 bg-[#171d2a] text-white/60',
        quickPitch: 'border-white/10 bg-[linear-gradient(135deg,#111827_0%,#15192a_60%,#24153a_100%)] shadow-[0_24px_70px_rgba(0,0,0,0.32)]',
        footer: 'border-white/10 bg-[#05070b] text-white',
        contactCard: 'border-white/12 bg-white/4 hover:bg-white hover:text-[#111111]',
        footerLink: 'border-white/12 text-white/72 hover:bg-white hover:text-[#111111]',
        dot: 'bg-[#c084fc]',
      }
    : {
        root: 'bg-[#f4efe6] text-[#111111]',
        overlay: 'bg-[radial-gradient(circle_at_top_left,_rgba(247,147,30,0.14),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(17,17,17,0.08),_transparent_28%)]',
        glowLeft: 'bg-[#f7931e]/10',
        glowRight: 'bg-[#111111]/6',
        rule: 'via-[#111111]/10',
        header: 'border-[#111111]/6 bg-[#f4efe6]/80',
        brand: 'text-[#111111]',
        nav: 'text-[#111111]/70 hover:text-[#111111]',
        pill: 'border-[#111111]/10 bg-white/70 text-[#111111]/60',
        pillSoft: 'border-[#111111]/10 bg-white/80 text-[#111111]',
        primaryButton: 'bg-[#111111] text-white hover:bg-[#222222]',
        secondaryButton: 'border-[#111111]/12 bg-white/80 text-[#111111] hover:bg-white',
        tertiaryButton: 'border-[#111111]/12 bg-[#f8f4ec] text-[#111111] hover:bg-white',
        statCard: 'border-[#111111]/8 bg-white/80 shadow-[0_10px_40px_rgba(17,17,17,0.04)]',
        statText: 'text-[#111111]',
        statMuted: 'text-[#111111]/55',
        heroCard: 'border-[#111111]/10 bg-white shadow-[0_30px_90px_rgba(17,17,17,0.14)]',
        surface: 'border-[#111111]/8 bg-white',
        surfaceSoft: 'bg-[#f8f4ec]',
        surfaceMuted: 'bg-white',
        sectionLabel: 'text-[#111111]/42',
        heading: 'text-[#111111]',
        body: 'text-[#111111]/68',
        bodyStrong: 'text-[#111111]/78',
        tag: 'border-[#111111]/8 bg-white text-[#111111]/65',
        inverseBlock: 'border-[#111111]/8 bg-[#111111] text-white',
        sectionBorder: 'border-[#111111]/10',
        marqueeFadeLeft: 'from-[#f4efe6] to-transparent',
        marqueeFadeRight: 'from-[#f4efe6] to-transparent',
        marqueeText: 'text-[#111111]/48',
        projectCard: 'border-[#111111]/8 bg-white shadow-[0_20px_60px_rgba(17,17,17,0.05)] hover:shadow-[0_28px_80px_rgba(17,17,17,0.10)]',
        projectIcon: 'bg-[#111111] text-white',
        projectMuted: 'text-[#111111]/48',
        projectBody: 'text-[#111111]/64',
        techChip: 'border-[#111111]/8 bg-[#f8f4ec] text-[#111111]/60',
        secondaryProject: 'border-[#111111]/8 bg-[#f8f4ec] hover:bg-white hover:shadow-[0_16px_40px_rgba(17,17,17,0.06)]',
        timelineCard: 'border-[#111111]/8 bg-white/78 shadow-[0_12px_40px_rgba(17,17,17,0.04)]',
        timelineBadge: 'border-[#111111]/8 bg-[#f8f4ec] text-[#111111]/55',
        quickPitch: 'border-[#111111]/8 bg-[linear-gradient(135deg,#111111_0%,#1f1f1f_60%,#2c2c2c_100%)] shadow-[0_24px_70px_rgba(17,17,17,0.22)]',
        footer: 'border-[#111111]/10 bg-[#111111] text-white',
        contactCard: 'border-white/12 bg-white/4 hover:bg-white hover:text-[#111111]',
        footerLink: 'border-white/12 text-white/72 hover:bg-white hover:text-[#111111]',
        dot: 'bg-[#f7931e]',
      }

  useEffect(() => {
    let isCancelled = false

    async function loadGitHubActivity() {
      try {
        setActivityState('loading')
        const responses = await Promise.all(
          [1, 2, 3].map((page) =>
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100&page=${page}`),
          ),
        )

        const successfulResponses = responses.filter((response) => response.ok)
        if (successfulResponses.length === 0) {
          throw new Error('GitHub activity request failed')
        }

        const pages = (await Promise.all(successfulResponses.map((response) => response.json()))) as GitHubEvent[][]
        const eventDates = pages.flat().map((event) => event.created_at)
        const activity = buildActivityGrid(eventDates)

        if (!isCancelled) {
          setActivityRows(activity.rows)
          setActivityCount(activity.totalEvents)
          setActivityState('ready')
        }
      } catch {
        if (!isCancelled) {
          setActivityRows(fallbackContributionRows)
          setActivityCount(200)
          setActivityState('error')
        }
      }
    }

    loadGitHubActivity()

    return () => {
      isCancelled = true
    }
  }, [])

  useEffect(() => {
    let isCancelled = false

    async function loadProblemCounts() {
      try {
        const leetcodeSolvedRequest = fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`)
          .then((response) => (response.ok ? response.json() : null)) as Promise<LeetCodeSolvedResponse | null>
        const leetcodeRatingRequest = fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/contest`)
          .then((response) => (response.ok ? response.json() : null)) as Promise<LeetCodeRatingResponse | null>
        const gfgRequest = fetch(`https://geeks-for-geeks-api.vercel.app/${GFG_USERNAME}`)
          .then((response) => (response.ok ? response.json() : null))
          .catch(() => null) as Promise<GFGStatsResponse | null>

        const [leetcodeSolvedData, leetcodeRatingData, gfgData] = await Promise.allSettled([
          leetcodeSolvedRequest,
          leetcodeRatingRequest,
          gfgRequest,
        ])

        if (isCancelled) return

        if (leetcodeSolvedData.status === 'fulfilled') {
          const total = parseLeetCodeSolvedCount(leetcodeSolvedData.value)
          if (total > 0) {
            setLeetcodeSolved(total)
          }
        }

        if (leetcodeRatingData.status === 'fulfilled' && leetcodeRatingData.value) {
          const rawRating =
            leetcodeRatingData.value.data?.userContestRanking?.rating ??
            leetcodeRatingData.value.userContestRanking?.rating ??
            0

          if (Number.isFinite(rawRating) && rawRating > 0) {
            setLeetcodeRating(Math.round(rawRating))
          }
        }

        if (gfgData.status === 'fulfilled') {
          const total = parseGfgSolvedCount(gfgData.value)
          if (Number.isFinite(total) && total > 0) {
            setGfgSolved(total)
          }
        }
      } catch {
        // keep fallback counts
      }
    }

    loadProblemCounts()

    return () => {
      isCancelled = true
    }
  }, [])

  const totalDsaSolved = leetcodeSolved + gfgSolved
  const stats = [
    { value: '98.5%', label: 'PV defect detection accuracy' },
    { value: `${totalDsaSolved}+`, label: 'DSA problems solved' },
    { value: '2', label: 'Internships across backend and AI' },
    { value: '8', label: 'Current CGPA at USICT' },
  ]

  return (
    <div className={`fixed inset-0 overflow-y-auto overflow-x-hidden transition-colors duration-500 ${theme.root}`}>
      <style>{`
        @keyframes recruiter-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div className="relative min-h-full">
        <div className={`absolute inset-0 ${theme.overlay}`} />
        <div className={`absolute left-[-8rem] top-24 h-56 w-56 rounded-full blur-3xl ${theme.glowLeft}`} />
        <div className={`absolute right-[-4rem] top-0 h-64 w-64 rounded-full blur-3xl ${theme.glowRight}`} />
        <div className={`absolute inset-x-0 top-[28rem] h-px bg-gradient-to-r from-transparent ${theme.rule} to-transparent`} />

        <header className={`sticky top-0 z-20 mx-auto flex max-w-6xl items-center justify-between border-b px-6 py-4 backdrop-blur-xl md:px-10 ${theme.header}`}>
          <a href="#recruiter-home" className={`text-sm font-semibold uppercase tracking-[0.35em] ${theme.brand}`}>
            AS
          </a>

          <nav className={`hidden items-center gap-6 text-sm md:flex`}>
            <a href="#recruiter-about" className={`transition-colors ${theme.nav}`}>
              About
            </a>
            <a href="#recruiter-projects" className={`transition-colors ${theme.nav}`}>
              Projects
            </a>
            <a href="#recruiter-experience" className={`transition-colors ${theme.nav}`}>
              Experience
            </a>
            <a href="#recruiter-contact" className={`transition-colors ${theme.nav}`}>
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNightMode((mode) => !mode)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${isNightMode ? 'border-[#c084fc]/35 bg-[#171c27] text-[#e9d5ff]' : theme.pillSoft}`}
            >
              {isNightMode ? 'Gotham Light' : 'Gotham Dark'}
            </button>
            <a
              href="Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${theme.pillSoft}`}
            >
              Resume
            </a>
            <button
              onClick={() => {
                sessionStorage.setItem('shanos-force-os-mode', 'true')
                window.location.hash = ''
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${theme.primaryButton}`}
            >
              Enter OS Mode
            </button>
          </div>
        </header>

        <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20 md:px-10">
          <motion.section
            id="recruiter-home"
            className="grid min-h-[calc(100vh-96px)] items-center gap-12 py-10 md:grid-cols-[1.15fr_0.85fr] md:py-14"
            variants={sectionReveal}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={settleSoft}
              className="max-w-4xl"
            >
              <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] ${theme.pill}`}>
                Backend Engineer + AI Builder
              </div>

              <p className={`text-sm uppercase tracking-[0.35em] ${theme.sectionLabel}`}>Hi, I&apos;m Anjitesh</p>
              <h1 className={`mt-4 max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.065em] md:text-7xl xl:text-[5.6rem] ${theme.heading}`}>
                Backend engineer building AI products, distributed systems, and software with clear real-world impact.
              </h1>
              <p className={`mt-6 max-w-2xl text-base leading-7 md:text-lg ${theme.body}`}>
                {resumeSummary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#recruiter-projects"
                  className={`rounded-full px-5 py-3 text-sm font-medium transition-colors ${theme.primaryButton}`}
                >
                  View Projects
                </a>
                <a
                  href={codingProfiles.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full border px-5 py-3 text-sm font-medium transition-colors ${theme.secondaryButton}`}
                >
                  <span className="inline-flex items-center gap-2">
                    <LinkIcon kind="linkedin" className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </span>
                </a>
                <a
                  href="#recruiter-contact"
                  className={`rounded-full border px-5 py-3 text-sm font-medium transition-colors ${theme.tertiaryButton}`}
                >
                  Contact
                </a>
              </div>

              <motion.div variants={footerReveal} className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <motion.div key={stat.label} variants={settleCard} className={`rounded-3xl border p-4 ${theme.statCard}`}>
                    <div className={`text-2xl font-semibold tracking-[-0.04em] ${theme.statText}`}>{stat.value}</div>
                    <div className={`mt-1 text-sm leading-6 ${theme.statMuted}`}>{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={settleCard}
              className="relative"
            >
              <div className={`overflow-hidden rounded-[2.25rem] border ${theme.heroCard}`}>
                <div className="relative h-40 bg-[linear-gradient(135deg,#111111_0%,#272727_50%,#f7931e_140%)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_42%)]" />
                  <div className="absolute left-6 top-6 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/75">
                    Open to SDE / ML roles
                  </div>
                </div>
                <div className="relative px-6 pb-6">
                  <div className="-mt-14 flex items-end justify-between gap-4">
                    <div className="flex items-end gap-4">
                      <div className="h-24 w-24 overflow-hidden rounded-[1.5rem] border-4 border-white bg-[#efe7d8] shadow-lg">
                        <img src="images/avatar.webp" alt="Anjitesh" className="h-full w-full object-cover" loading="lazy" />
                      </div>
                      <div
                        className={`rounded-[1.35rem] border px-4 py-3 pb-3.5 backdrop-blur-md ${
                          isNightMode
                            ? 'border-white/12 bg-[#0f1520]/72 text-white shadow-[0_16px_40px_rgba(0,0,0,0.28)]'
                            : 'border-white/45 bg-white/72 text-[#111111] shadow-[0_16px_40px_rgba(17,17,17,0.10)]'
                        }`}
                      >
                        <h2 className={`text-2xl font-semibold tracking-[-0.04em] ${isNightMode ? 'text-white' : 'text-[#111111]'}`}>Anjitesh Shandilya</h2>
                        <p className={`mt-1 text-sm ${isNightMode ? 'text-white/78' : 'text-[#111111]/72'}`}>Backend Engineer • AI/ML • Distributed Systems</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <div className={`rounded-[1.5rem] p-4 ${theme.surfaceSoft}`}>
                      <p className={`text-xs uppercase tracking-[0.25em] ${theme.sectionLabel}`}>Current Focus</p>
                      <p className={`mt-2 text-sm leading-7 ${theme.body}`}>
                        Backend-heavy software, API-driven architecture, AI workflows, data analysis, and recruiter-friendly delivery.
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className={`rounded-[1.5rem] border p-4 ${theme.surface}`}>
                        <p className={`text-xs uppercase tracking-[0.25em] ${theme.sectionLabel}`}>Recruiter Summary</p>
                        <p className={`mt-2 text-sm leading-7 ${theme.body}`}>
                          Strongest in backend execution, full-stack delivery, data-aware engineering, and practical AI implementation.
                        </p>
                        <p className={`mt-3 text-xs uppercase tracking-[0.22em] ${theme.sectionLabel}`}>
                          LeetCode rating: {leetcodeRating}
                        </p>
                      </div>
                      <div className={`rounded-[1.5rem] border p-4 ${theme.surface}`}>
                        <p className={`text-xs uppercase tracking-[0.25em] ${theme.sectionLabel}`}>Recent Domain Work</p>
                        <p className={`mt-2 text-sm leading-7 ${theme.body}`}>
                          WithU247, AI tooling, intelligent automation, recruiter-facing platforms, and analytics products.
                        </p>
                      </div>
                    </div>
                    <div className={`rounded-[1.5rem] border p-4 ${theme.surfaceMuted} ${theme.sectionBorder}`}>
                      <p className={`text-xs uppercase tracking-[0.25em] ${theme.sectionLabel}`}>Open For</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {availability.map((item) => (
                          <span
                            key={item}
                            className={`rounded-full px-3 py-1 text-xs ${isNightMode ? 'bg-white text-[#111111]' : 'bg-[#111111] text-white'}`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>

          <motion.section
            className="py-4"
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={RECRUITER_VIEWPORT}
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {recruiterSignals.map((signal, index) => (
                <motion.div
                  key={signal.title}
                  variants={settleCard}
                  transition={{ delay: index * 0.04 }}
                  className={`rounded-[1.8rem] border p-5 shadow-[0_10px_40px_rgba(17,17,17,0.04)] transition-transform duration-300 hover:-translate-y-1 ${theme.surface}`}
                >
                  <p className={`text-xs uppercase tracking-[0.22em] ${theme.sectionLabel}`}>Why it matters</p>
                  <h3 className={`mt-3 text-xl font-semibold tracking-[-0.03em] ${theme.heading}`}>{signal.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${theme.projectBody}`}>{signal.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <section className={`border-y py-5 ${theme.sectionBorder}`}>
            <div className="relative overflow-hidden">
              <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r ${theme.marqueeFadeLeft}`} />
              <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l ${theme.marqueeFadeRight}`} />
              <div
                className={`flex min-w-max gap-8 text-sm uppercase tracking-[0.2em] ${theme.marqueeText}`}
                style={{ animation: 'recruiter-marquee 32s linear infinite' }}
              >
                {[...expertise, ...expertise].map((skill, index) => (
                  <span key={`${skill}-${index}`} className="whitespace-nowrap">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <motion.section
            className="py-16"
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={RECRUITER_VIEWPORT}
          >
            <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
              <motion.div
                variants={settleCard}
                className={`overflow-hidden rounded-[2rem] border shadow-[0_20px_60px_rgba(17,17,17,0.08)] ${playTheme.card}`}
              >
                <div className={`relative aspect-[9/16] w-full overflow-hidden ${isNightMode ? 'bg-[#050608]' : 'bg-[#f3efe6]'}`}>
                  <video
                    className="absolute inset-0 h-full w-full object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="media-darth-vader.mp4" type="video/mp4" />
                  </video>
                  <div className={`absolute inset-0 ${isNightMode ? 'bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_46%),linear-gradient(180deg,rgba(8,10,16,0.05)_0%,rgba(8,10,16,0.28)_100%)]' : 'bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.1),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(17,17,17,0.12)_100%)]'}`} />
                </div>
              </motion.div>

              <motion.div
                variants={settleCard}
                className={`rounded-[2rem] border p-6 shadow-[0_20px_60px_rgba(17,17,17,0.08)] ${playTheme.card}`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className={`text-sm uppercase tracking-[0.35em] ${playTheme.muted}`}>Playground</p>
                    <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Purple repo energy and one intentionally nerdy corner.</h2>
                  </div>
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-inherit p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl italic tracking-[-0.03em]">GitHub Contributions</h3>
                    <p className={playTheme.muted}>Recent Public Activity</p>
                  </div>
                  <div className="mt-6 grid gap-2">
                    {activityRows.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex flex-wrap gap-2">
                        {row.map((level, cellIndex) => {
                          const shades = isNightMode
                            ? ['bg-white/8', 'bg-[#7c3aed]/25', 'bg-[#8b5cf6]/55', 'bg-[#c084fc]']
                            : ['bg-[#efe7ff]', 'bg-[#d8b4fe]', 'bg-[#a855f7]', 'bg-[#7e22ce]']

                          return (
                            <span
                              key={`${rowIndex}-${cellIndex}`}
                              className={`h-4 w-4 rounded-full ${shades[level]} transition-transform duration-300 hover:scale-110`}
                            />
                          )
                        })}
                      </div>
                    ))}
                  </div>
                  <div className={`mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-sm ${playTheme.muted}`}>
                    <div>
                      {activityState === 'loading' && <span>Loading recent GitHub activity...</span>}
                      {activityState === 'error' && <span>Live GitHub activity unavailable, showing portfolio-mode fallback.</span>}
                      {activityState === 'ready' && <span>{activityCount} public events across the latest fetched window.</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Less</span>
                      <span className={`h-4 w-4 rounded-full ${isNightMode ? 'bg-white/8' : 'bg-[#efe7ff]'}`} />
                      <span className={`h-4 w-4 rounded-full ${isNightMode ? 'bg-[#7c3aed]/25' : 'bg-[#d8b4fe]'}`} />
                      <span className={`h-4 w-4 rounded-full ${isNightMode ? 'bg-[#8b5cf6]/55' : 'bg-[#a855f7]'}`} />
                      <span className={`h-4 w-4 rounded-full ${isNightMode ? 'bg-[#c084fc]' : 'bg-[#7e22ce]'}`} />
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            id="recruiter-about"
            className="grid gap-8 py-20 md:grid-cols-[0.95fr_1.05fr]"
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={RECRUITER_VIEWPORT}
          >
            <motion.div variants={settleSoft}>
              <p className={`text-sm uppercase tracking-[0.35em] ${theme.sectionLabel}`}>About</p>
              <h2 className={`mt-4 max-w-md text-4xl font-semibold tracking-[-0.04em] md:text-5xl ${theme.heading}`}>
                Engineer first. Strongest when the work needs both systems and taste.
              </h2>
              <motion.div variants={settleCard} className={`mt-8 rounded-[1.8rem] border p-6 ${theme.inverseBlock}`}>
                <p className={`text-xs uppercase tracking-[0.22em] ${isNightMode ? 'text-white/42' : 'text-white/42'}`}>Role Fit</p>
                <p className={`mt-3 text-base leading-8 ${isNightMode ? 'text-white/78' : 'text-white/78'}`}>
                  Best fit for backend engineering, platform teams, AI product engineering, and full-stack roles
                  where system design matters more than UI-only polish.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Backend Engineer', 'Software Engineer', 'AI Product Engineer', 'Full Stack Engineer'].map((role) => (
                    <span key={role} className="rounded-full border border-white/12 px-3 py-1 text-xs text-white/72">
                      {role}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={settleSoft} className="grid gap-5">
              <motion.div variants={settleCard} className={`rounded-[2rem] border p-6 shadow-[0_20px_60px_rgba(17,17,17,0.04)] ${theme.surface}`}>
                <p className={`text-base leading-8 ${theme.body}`}>
                  {resumeSummary} Strong collaborator with proven teamwork, leadership, and communication skills,
                  eager to contribute to impactful projects while continuously advancing technical expertise.
                </p>
              </motion.div>
              <div className="grid gap-5 md:grid-cols-2">
                {skillGroups.map((category) => (
                  <motion.div
                    key={category.title}
                    variants={settleCard}
                    className={`rounded-[2rem] border p-5 ${theme.secondaryProject}`}
                  >
                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm font-semibold uppercase tracking-[0.18em] ${theme.body}`}>
                        {category.title}
                      </h3>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {category.items.map((skill) => (
                        <span
                          key={skill}
                          className={`rounded-full border px-3 py-1 text-xs ${theme.tag}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.section>

          <motion.section
            id="recruiter-projects"
            className="py-6"
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={RECRUITER_VIEWPORT}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={`text-sm uppercase tracking-[0.35em] ${theme.sectionLabel}`}>Featured Projects</p>
                <h2 className={`mt-3 text-4xl font-semibold tracking-[-0.04em] md:text-5xl ${theme.heading}`}>
                  Work with clear outcomes, not filler.
                </h2>
              </div>
              <a
                href={codingProfiles.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${theme.nav}`}
              >
                <LinkIcon kind="github" className="h-4 w-4" />
                <span>Browse GitHub</span>
              </a>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  variants={settleCard}
                  transition={{ delay: index * 0.06 }}
                  className={`group flex h-full flex-col rounded-[2rem] border p-6 transition-all duration-300 hover:-translate-y-1 ${theme.projectCard}`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`rounded-2xl px-3 py-2 text-lg transition-transform duration-300 group-hover:scale-105 ${theme.projectIcon}`}>{project.icon}</div>
                    <div className="flex gap-3 text-sm">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 transition-colors ${theme.projectMuted} ${isNightMode ? 'hover:text-white' : 'hover:text-[#111111]'}`}
                        >
                          <LinkIcon kind="github" className="h-3.5 w-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {project.links?.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 transition-colors ${theme.projectMuted} ${isNightMode ? 'hover:text-white' : 'hover:text-[#111111]'}`}
                        >
                          <LinkIcon kind="external" className="h-3.5 w-3.5" />
                          <span>Live</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className={`mt-6 text-2xl font-semibold tracking-[-0.03em] ${theme.heading}`}>{project.name}</h3>
                  <p className={`mt-2 text-sm uppercase tracking-[0.18em] ${theme.sectionLabel}`}>{project.tagline}</p>
                  <p className={`mt-5 text-sm leading-7 ${theme.projectBody}`}>{project.description}</p>

                  <div className={`mt-6 space-y-4 border-t pt-5 ${theme.sectionBorder}`}>
                    <div>
                      <p className={`text-xs uppercase tracking-[0.18em] ${theme.sectionLabel}`}>Architecture</p>
                      <p className={`mt-2 text-sm leading-7 ${theme.body}`}>{project.architecture}</p>
                    </div>
                    <div>
                      <p className={`text-xs uppercase tracking-[0.18em] ${theme.sectionLabel}`}>Challenge Solved</p>
                      <p className={`mt-2 text-sm leading-7 ${theme.body}`}>{project.challenges}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-full border px-3 py-1 text-xs ${theme.techChip}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-12">
              <div className="mb-5 flex items-center justify-between">
                <p className={`text-sm uppercase tracking-[0.25em] ${theme.sectionLabel}`}>More Projects</p>
                <p className={`text-sm ${theme.statMuted}`}>Breadth across product, AI, and systems work</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {additionalProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={settleSoft}
                    className={`rounded-[1.75rem] border p-5 transition-all duration-300 hover:-translate-y-1 ${theme.secondaryProject}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{project.icon}</span>
                      <div>
                        <h3 className={`text-lg font-semibold ${theme.heading}`}>{project.name}</h3>
                        <p className={`text-sm ${theme.statMuted}`}>{project.tagline}</p>
                      </div>
                    </div>
                    <p className={`mt-4 text-sm leading-7 ${theme.projectBody}`}>{project.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            id="recruiter-experience"
            className="grid gap-10 py-20 md:grid-cols-[0.85fr_1.15fr]"
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={RECRUITER_VIEWPORT}
          >
            <motion.div variants={settleSoft}>
              <p className={`text-sm uppercase tracking-[0.35em] ${theme.sectionLabel}`}>Experience</p>
              <h2 className={`mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl ${theme.heading}`}>
                Resume-backed education and internship experience.
              </h2>
              <p className={`mt-6 max-w-md text-sm leading-7 ${theme.body}`}>
                This section is pulled from the resume content: academic track, internships, and the skill clusters
                actually reflected in the document.
              </p>
              <div className="mt-10 space-y-4">
                {education.map((entry, index) => (
                  <motion.div
                    key={entry.school}
                    variants={settleCard}
                    transition={{ delay: index * 0.05 }}
                    className={`rounded-[1.75rem] border p-5 ${theme.timelineCard}`}
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className={`text-xs uppercase tracking-[0.22em] ${theme.sectionLabel}`}>Education</p>
                        <h3 className={`mt-2 text-lg font-semibold ${theme.heading}`}>{entry.school}</h3>
                        <p className={`mt-2 text-sm ${theme.projectBody}`}>{entry.detail}</p>
                        <p className={`mt-1 text-sm ${theme.statMuted}`}>{entry.score}</p>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] ${theme.timelineBadge}`}>
                        {entry.year}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={settleSoft} className="space-y-4">
              {experience.map((entry, index) => (
                <motion.div
                  key={`${entry.org}-${entry.role}`}
                  variants={settleCard}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-[1.75rem] border p-5 ${theme.timelineCard}`}
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className={`text-xs uppercase tracking-[0.22em] ${theme.sectionLabel}`}>{entry.role}</p>
                      <h3 className={`mt-2 text-lg font-semibold ${theme.heading}`}>{entry.org}</h3>
                      <p className={`mt-2 text-sm ${theme.statMuted}`}>{entry.meta}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] ${theme.timelineBadge}`}>
                      {entry.date}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-full border px-3 py-1 text-xs ${theme.techChip}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 space-y-3">
                    {entry.bullets.map((bullet) => (
                      <div key={bullet} className="flex gap-3">
                        <span className={`mt-[0.62rem] h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                        <p className={`text-sm leading-7 ${theme.projectBody}`}>{bullet}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            className="py-4"
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={RECRUITER_VIEWPORT}
          >
            <motion.div variants={settleCard} className={`rounded-[2.25rem] border px-6 py-8 text-white md:px-10 ${theme.quickPitch}`}>
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                    If you need someone who can build the API, explain the ML system, and present the work clearly, I fit that lane well.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white px-5 py-3 text-sm font-medium text-[#111111] transition-colors hover:bg-[#f4efe6]"
                  >
                    Download Resume
                  </a>
                  <a
                    href={codingProfiles.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/14 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#111111]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <LinkIcon kind="github" className="h-4 w-4" />
                      <span>View GitHub</span>
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.section>
        </main>
      </div>

      <motion.footer
        id="recruiter-contact"
        className={`border-t ${theme.sectionBorder} ${theme.footer}`}
        variants={footerReveal}
        initial="hidden"
        whileInView="show"
        viewport={RECRUITER_VIEWPORT}
      >
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
          <motion.div variants={settleSoft}>
            <p className="text-sm uppercase tracking-[0.35em] text-white/40">Contact</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
              Available for software engineering and AI/ML opportunities.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
              Let&apos;s build something exceptional together.
            </p>
            <motion.div variants={footerReveal} className="mt-6 grid gap-3 sm:grid-cols-2">
              <motion.a
                href="mailto:anjiteshshandilya@gmail.com"
                variants={settleCard}
                className="group rounded-[1.5rem] border border-white/12 bg-white/4 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#111111]"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6">
                    <LinkIcon kind="mail" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45 transition-colors group-hover:text-[#111111]/45">Email</p>
                    <p className="mt-2 text-sm text-white/80 transition-colors group-hover:text-[#111111]">anjiteshshandilya@gmail.com</p>
                  </div>
                </div>
              </motion.a>
              <motion.a
                href="tel:+919310666586"
                variants={settleCard}
                className="group rounded-[1.5rem] border border-white/12 bg-white/4 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#111111]"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6">
                    <LinkIcon kind="phone" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45 transition-colors group-hover:text-[#111111]/45">Phone</p>
                    <p className="mt-2 text-sm text-white/80 transition-colors group-hover:text-[#111111]">+91 93106 66586</p>
                  </div>
                </div>
              </motion.a>
            </motion.div>
            <motion.div variants={settleSoft} className="mt-8">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">Social</p>
              <motion.div variants={footerReveal} className="mt-4 flex flex-wrap gap-3">
                {footerSocialProfiles.map((profile) => (
                  <BrandedLink
                    key={profile.label}
                    href={profile.url}
                    label={profile.label}
                    kind={profile.iconKind}
                    className="border-white/12 px-4 py-3 text-white/78 hover:bg-white hover:text-[#111111]"
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
