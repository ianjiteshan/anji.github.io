// Project data for AnjiteshOS
export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  techStack: string[]
  architecture: string
  challenges: string
  links?: { github?: string; live?: string }
  icon: string
}

export const projects: Project[] = [
  {
    id: 'sharesync',
    name: 'ShareSync',
    tagline: 'Hybrid Cloud + P2P File Sharing',
    description:
      'Enterprise-grade file sharing platform combining cloud storage reliability with P2P efficiency. Features real-time sync, end-to-end encryption, and automatic failover between cloud and peer networks.',
    techStack: ['React', 'Node.js', 'WebRTC', 'AWS S3', 'Socket.io', 'MongoDB'],
    architecture:
      'Dual-mode architecture: files sync via cloud (S3) for reliability, and via WebRTC for LAN speed. Smart routing layer decides which path based on network conditions.',
    challenges:
      'Solved NAT traversal for P2P in corporate firewalls using TURN relay servers. Implemented conflict resolution for simultaneous edits using operational transforms.',
    links: { github: 'https://github.com/ianjiteshan/sharesync' },
    icon: '☁️',
  },
  {
    id: 'pvscan',
    name: 'PVSCAN',
    tagline: '98.5% Accuracy Solar Panel Inspector',
    description:
      'AI-powered solar panel defect detection system built for MNRE (Ministry of New and Renewable Energy), Government of India. Uses MobileNetV3 for edge inference on drone-captured images.',
    techStack: ['Python', 'PyTorch', 'MobileNetV3', 'Flask', 'OpenCV', 'Docker'],
    architecture:
      'Edge-optimized CNN pipeline: drone captures → preprocessing → MobileNetV3 inference → defect classification → report generation. Runs on Jetson Nano for field deployment.',
    challenges:
      'Achieved 98.5% accuracy while keeping model under 15MB for edge deployment. Built custom data augmentation pipeline for rare defect types with limited training data.',
    links: { github: 'https://github.com/ianjiteshan/pvscan' },
    icon: '🔬',
  },
  {
    id: 'renewablejobs',
    name: 'RenewableJOBS',
    tagline: 'Green Energy Job Forecasting Platform',
    description:
      'Forecasting platform that predicts renewable energy job market trends using ML models on government datasets. Built during MNRE internship.',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'React', 'Power BI'],
    architecture:
      'ETL pipeline ingests government labor data → ML models forecast demand by sector/region → interactive dashboard visualizes trends. Automated weekly model retraining.',
    challenges:
      'Handled sparse and inconsistent government datasets. Built ensemble model combining ARIMA + Random Forest for robust predictions across different data quality levels.',
    icon: '🌱',
  },
  {
    id: 'anjifun',
    name: 'Anji.fun',
    tagline: '12 Browser Games, 96 Lighthouse Score',
    description:
      'Collection of 12 polished browser-based games with a 96 Lighthouse performance score. Zero dependencies, pure vanilla JS with canvas rendering.',
    techStack: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Web Audio API'],
    architecture:
      'Custom game engine with requestAnimationFrame loop, sprite system, collision detection, and Web Audio for sound. Each game is a standalone module loaded on demand.',
    challenges:
      'Achieved 96 Lighthouse score while running real-time games. Implemented efficient sprite batching and offscreen canvas rendering for smooth 60fps.',
    links: { live: 'https://anji.fun', github: 'https://github.com/ianjiteshan/anji.fun' },
    icon: '🎮',
  },
  {
    id: 'shantio',
    name: 'ShantiO',
    tagline: 'Offline-First Productivity Suite',
    description:
      'Productivity app that works fully offline using Service Workers and IndexedDB. Syncs when connection is restored. Includes notes, tasks, and habit tracker.',
    techStack: ['React', 'IndexedDB', 'Service Workers', 'Workbox', 'Node.js'],
    architecture:
      'Offline-first with CRDTs for conflict-free sync. Service Worker caches all assets. IndexedDB stores data locally. Background Sync API pushes changes when online.',
    challenges:
      'Implemented CRDT-based merge strategy for conflict resolution during sync. Handled edge cases like partial sync failures and storage quota limits.',
    icon: '📋',
  },
  {
    id: 'withu247',
    name: 'WithU247',
    tagline: 'AI Mental Health Companion',
    description:
      'Mental health support platform with AI-powered conversations, therapist matching, mood tracking, and crisis detection. Built with privacy-first architecture.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API', 'Socket.io'],
    architecture:
      'Microservices: Auth service, Chat service (with AI), Therapist matching engine, Analytics dashboard. All PII encrypted at rest and in transit.',
    challenges:
      'Built crisis detection in real-time chat using sentiment analysis. Implemented HIPAA-inspired data handling even though not legally required.',
    links: { github: 'https://github.com/ianjiteshan/withu247' },
    icon: '💚',
  },
  {
    id: 'jobmatcher',
    name: 'JobMatcher AI',
    tagline: 'Resume-to-Job Matching Engine',
    description:
      'AI tool that parses resumes and matches candidates to jobs using NLP similarity scoring. Supports bulk processing for recruiters.',
    techStack: ['Python', 'spaCy', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
    architecture:
      'NLP pipeline: resume parsing → entity extraction → embedding generation → cosine similarity matching against job descriptions. Batch processing via Celery workers.',
    challenges:
      'Handling diverse resume formats (PDF, DOCX, images via OCR). Fine-tuned sentence transformers for domain-specific job matching accuracy.',
    icon: '🤖',
  },
  {
    id: 'neoshiksha',
    name: 'NeoShiksha',
    tagline: 'Agentic AI Learning Platform',
    description:
      'AI-powered adaptive learning platform using agentic AI architecture. Built during IBM SkillsBuild internship. Agents plan, execute, and evaluate learning paths.',
    techStack: ['Python', 'LangChain', 'React', 'FastAPI', 'ChromaDB', 'OpenAI'],
    architecture:
      'Multi-agent system: Planner Agent → Content Agent → Evaluator Agent → Feedback Agent. RAG pipeline with ChromaDB for curriculum knowledge base.',
    challenges:
      'Designed agent orchestration to prevent infinite loops. Implemented guardrails for content quality and factual accuracy in generated learning materials.',
    icon: '🧠',
  },
]
