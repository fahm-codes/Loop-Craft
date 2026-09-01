import fs from 'fs';
import path from 'path';

const roadmapFile = path.join(process.cwd(), 'src/data/roadmap.ts');
let content = fs.readFileSync(roadmapFile, 'utf-8');

// 1. Rename RoadmapCategory -> Roadmap
content = content.replace(/export interface RoadmapCategory/g, 'export interface Roadmap');
content = content.replace(/export const aiEngineeringRoadmap: RoadmapCategory/g, 'export const aiEngineeringRoadmap: Roadmap');

// 2. Add Category interface and instances
const categoryData = `
export interface Category {
  id: string;
  title: string;
  description: string;
  roadmaps: Partial<Roadmap>[];
}

export const roleBasedRoadmaps: Category = {
  id: 'role-based',
  title: 'Role-Based Roadmaps',
  description: 'Roadmaps designed for specific developer roles.',
  roadmaps: [
    {
      id: 'ai-engineering',
      title: 'AI Engineer',
      description: 'Master Machine Learning, Deep Learning, Generative AI, and Agentic workflows.',
      nodes: aiEngineeringRoadmap.nodes // Use the actual nodes for length/details if needed
    },
    { id: 'full-stack', title: 'Full-Stack Developer', description: 'Master front-end and back-end web development.', nodes: [] },
    { id: 'backend', title: 'Backend Engineer', description: 'Focus on server-side architecture, databases, and APIs.', nodes: [] },
    { id: 'frontend', title: 'Frontend Engineer', description: 'Build beautiful, responsive, and accessible user interfaces.', nodes: [] },
    { id: 'data-engineer', title: 'Data Engineer', description: 'Design, build, and manage data pipelines and infrastructure.', nodes: [] },
    { id: 'devops-cloud', title: 'DevOps / Cloud Engineer', description: 'Automate deployments and manage cloud infrastructure.', nodes: [] },
    { id: 'cybersecurity', title: 'Cybersecurity Engineer', description: 'Secure applications, networks, and systems from threats.', nodes: [] },
  ]
};

export const skillBasedRoadmaps: Category = {
  id: 'skill-based',
  title: 'Skill-Based Roadmaps',
  description: 'Learn in-demand technical skills step by step.',
  roadmaps: [
    { id: 'python', title: 'Python', description: 'Master the Python programming language.', nodes: [] },
    { id: 'javascript-typescript', title: 'JavaScript / TypeScript', description: 'Learn JS and typed JS for modern web dev.', nodes: [] },
    { id: 'sql', title: 'SQL', description: 'Master relational databases and querying.', nodes: [] },
    { id: 'dsa', title: 'Data Structures & Algorithms', description: 'Master core CS concepts for interviews and performance.', nodes: [] },
    { id: 'gen-ai', title: 'Generative AI', description: 'Learn Generative models and Prompt Engineering.', nodes: [] },
    { id: 'llm-engineering', title: 'LLM Engineering', description: 'Fine-tune and deploy Large Language Models.', nodes: [] },
    { id: 'rag', title: 'RAG', description: 'Build Retrieval-Augmented Generation systems.', nodes: [] },
    { id: 'ai-agents', title: 'AI Agents', description: 'Build autonomous agents with LangGraph and CrewAI.', nodes: [] },
    { id: 'git-github', title: 'Git & GitHub', description: 'Version control mastery.', nodes: [] },
    { id: 'linux', title: 'Linux', description: 'Master the Linux command line.', nodes: [] },
    { id: 'docker', title: 'Docker', description: 'Containerize your applications.', nodes: [] },
    { id: 'cloud', title: 'Cloud', description: 'AWS, Azure, and GCP basics.', nodes: [] },
    { id: 'api-development', title: 'API Development', description: 'REST, GraphQL, and gRPC.', nodes: [] },
    { id: 'web-security', title: 'Web Security', description: 'OWASP Top 10 and securing web apps.', nodes: [] }
  ]
};

export const absoluteBeginnerRoadmap: Category = {
  id: 'absolute-beginner',
  title: 'Absolute Beginner',
  description: 'Start your coding journey from absolute zero.',
  roadmaps: [
    { 
      id: 'zero-to-developer', 
      title: 'ZERO → DEVELOPER', 
      description: 'The ultimate path for someone who has never written code before.', 
      nodes: [
        { id: 'comp-fund', title: 'Computer Fundamentals', description: '', topics: [], resources: [], duration: '' },
        { id: 'web-basics', title: 'Internet & Web Basics', description: '', topics: [], resources: [], duration: '' },
        { id: 'terminal', title: 'Terminal / Command Line', description: '', topics: [], resources: [], duration: '' },
        { id: 'git', title: 'Git & GitHub', description: '', topics: [], resources: [], duration: '' },
        { id: 'prog-fund', title: 'Programming Fundamentals', description: '', topics: [], resources: [], duration: '' },
        { id: 'python-basics', title: 'Python', description: '', topics: [], resources: [], duration: '' },
        { id: 'html-css', title: 'HTML & CSS', description: '', topics: [], resources: [], duration: '' },
        { id: 'js-basics', title: 'JavaScript', description: '', topics: [], resources: [], duration: '' },
        { id: 'sql-basics', title: 'SQL', description: '', topics: [], resources: [], duration: '' },
        { id: 'apis-basics', title: 'APIs', description: '', topics: [], resources: [], duration: '' },
        { id: 'projects-basics', title: 'Projects', description: '', topics: [], resources: [], duration: '' },
        { id: 'career-path', title: 'Career Path Selection', description: '', topics: [], resources: [], duration: '' }
      ]
    }
  ]
};

export const bestPracticesRoadmaps: Category = {
  id: 'best-practices',
  title: 'Best Practices',
  description: 'Essential practices every developer should know.',
  roadmaps: [
    { id: 'git-bp', title: 'Git & GitHub', description: '', nodes: [] },
    { id: 'clean-code', title: 'Clean Code', description: '', nodes: [] },
    { id: 'debugging', title: 'Debugging', description: '', nodes: [] },
    { id: 'testing', title: 'Testing', description: '', nodes: [] },
    { id: 'code-review', title: 'Code Review', description: '', nodes: [] },
    { id: 'documentation', title: 'Documentation', description: '', nodes: [] },
    { id: 'api-design', title: 'API Design', description: '', nodes: [] },
    { id: 'db-design', title: 'Database Design', description: '', nodes: [] },
    { id: 'project-arch', title: 'Project Architecture', description: '', nodes: [] },
    { id: 'security-bp', title: 'Security', description: '', nodes: [] },
    { id: 'ci-cd', title: 'CI/CD', description: '', nodes: [] },
    { id: 'deployment', title: 'Deployment', description: '', nodes: [] },
    { id: 'production', title: 'Production Readiness', description: '', nodes: [] },
    { id: 'ai-assisted', title: 'AI-Assisted Development', description: '', nodes: [] },
    { id: 'ai-code-verify', title: 'AI Code Verification', description: '', nodes: [] },
  ]
};

export const platformCategories: Category[] = [
  roleBasedRoadmaps,
  skillBasedRoadmaps,
  absoluteBeginnerRoadmap,
  bestPracticesRoadmaps
];

// Helper functions to get data
export function getCategoryById(id: string): Category | undefined {
  return platformCategories.find(c => c.id === id);
}

export function getRoadmapById(id: string): Roadmap | undefined {
  if (id === 'ai-engineering') return aiEngineeringRoadmap;
  if (id === 'zero-to-developer') {
    return {
      id: 'zero-to-developer',
      title: 'ZERO → DEVELOPER',
      description: 'The ultimate path for someone who has never written code before.',
      nodes: absoluteBeginnerRoadmap.roadmaps[0].nodes!
    };
  }
  // Return dummy structure for others to satisfy the UI for now
  return {
    id,
    title: id.replace(/-/g, ' ').toUpperCase(),
    description: 'Roadmap content coming soon...',
    nodes: []
  };
}
`;

// Remove the old categories array export
content = content.replace(/export const categories: RoadmapCategory\[\] = \[aiEngineeringRoadmap\];/g, '');

fs.writeFileSync(roadmapFile, content + categoryData);
console.log('Successfully updated roadmap.ts');
