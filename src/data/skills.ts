export interface SkillCategory {
  name: string
  icon: string
  skills: string[]
}

export type CodingProfileIconKind =
  | 'github'
  | 'linkedin'
  | 'leetcode'
  | 'gfg'
  | 'instagram'
  | 'x'
  | 'youtube'

export interface CodingProfile {
  url: string
  label: string
  iconKind: CodingProfileIconKind
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Backend & APIs',
    icon: '⚙️',
    skills: ['Node.js', 'Express', 'Flask', 'FastAPI', 'Spring Boot', 'REST', 'GraphQL', 'WebSockets'],
  },
  {
    name: 'Frontend',
    icon: '🎨',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML5 Canvas'],
  },
  {
    name: 'AI / ML',
    icon: '🧠',
    skills: ['PyTorch', 'TensorFlow', 'LangChain', 'RAG', 'Agentic AI', 'OpenAI API', 'spaCy', 'Scikit-learn'],
  },
  {
    name: 'Databases',
    icon: '🗄️',
    skills: ['MongoDB', 'PostgreSQL', 'Redis', 'ChromaDB', 'IndexedDB', 'Firebase'],
  },
  {
    name: 'DevOps & Cloud',
    icon: '☁️',
    skills: ['Docker', 'AWS', 'GitHub Actions', 'Nginx', 'Linux', 'CI/CD'],
  },
  {
    name: 'Tools & Other',
    icon: '🔧',
    skills: ['Git', 'Power BI', 'Figma', 'Postman', 'Jira', 'WebRTC'],
  },
]

export const codingProfiles: Record<string, CodingProfile> = {
  leetcode: { url: 'https://leetcode.com/u/ianjiteshan', label: 'LeetCode', iconKind: 'leetcode' },
  gfg: { url: 'https://www.geeksforgeeks.org/profile/ianjiteshan', label: 'GeeksForGeeks', iconKind: 'gfg' },
  github: { url: 'https://github.com/ianjiteshan', label: 'GitHub', iconKind: 'github' },
  linkedin: { url: 'https://linkedin.com/in/ianjiteshan', label: 'LinkedIn', iconKind: 'linkedin' },
  instagram: { url: 'https://instagram.com/ianjiteshan', label: 'Instagram', iconKind: 'instagram' },
  x: { url: 'https://x.com/ianjiteshan', label: 'X', iconKind: 'x' },
  youtube: { url: 'https://www.youtube.com/channel/UC-LzryGAI5eYEWWWDFce7lQ', label: 'YouTube', iconKind: 'youtube' },
}
