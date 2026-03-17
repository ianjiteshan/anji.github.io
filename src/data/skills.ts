export interface SkillCategory {
  name: string
  icon: string
  skills: string[]
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

export const codingProfiles = {
  leetcode: { url: 'https://leetcode.com/u/ianjiteshan', label: 'LeetCode' },
  gfg: { url: 'https://www.geeksforgeeks.org/profile/ianjiteshan', label: 'GeeksForGeeks' },
  github: { url: 'https://github.com/ianjiteshan', label: 'GitHub' },
  linkedin: { url: 'https://linkedin.com/in/ianjiteshan', label: 'LinkedIn' },
}
