-- Run this in Supabase SQL Editor to seed the database

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'ai-engineering',
  'AI Engineering',
  'Master Machine Learning, Deep Learning, Generative AI, and Agentic workflows.',
  'role-based',
  'Intermediate',
  '6 Months',
  'PUBLISHED'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'full-stack',
  'Full-Stack Development',
  'Master front-end and back-end web development.',
  'role-based',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'backend',
  'Backend Engineering',
  'Focus on server-side architecture, databases, and APIs.',
  'role-based',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'frontend',
  'Frontend Engineering',
  'Build beautiful, responsive, and accessible user interfaces.',
  'role-based',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'data-engineer',
  'Data Engineering',
  'Design, build, and manage data pipelines and infrastructure.',
  'role-based',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'devops-cloud',
  'DevOps / Cloud Engineering',
  'Automate deployments and manage cloud infrastructure.',
  'role-based',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'cybersecurity',
  'Cybersecurity Engineering',
  'Secure applications, networks, and systems from threats.',
  'role-based',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'python',
  'Python',
  'Master the Python programming language.',
  'programming-data',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'javascript-typescript',
  'JavaScript / TypeScript',
  'Learn JS and typed JS for modern web dev.',
  'programming-data',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'dsa',
  'Data Structures & Algorithms',
  'Master core CS concepts for interviews and performance.',
  'programming-data',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'sql',
  'SQL',
  'Master relational databases and querying.',
  'programming-data',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'git-github',
  'Git & GitHub',
  'Version control mastery.',
  'programming-data',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'api-development',
  'API Development',
  'REST, GraphQL, and gRPC.',
  'api-dev',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'web-security',
  'Web Security',
  'OWASP Top 10 and securing web apps.',
  'web-sec',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'gen-ai',
  'Generative AI',
  'Learn Generative models and Prompt Engineering.',
  'ai-ml',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'llm-engineering',
  'LLM Engineering',
  'Fine-tune and deploy Large Language Models.',
  'ai-ml',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'rag',
  'RAG',
  'Build Retrieval-Augmented Generation systems.',
  'ai-ml',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'ai-agents',
  'AI Agents',
  'Build autonomous agents with LangGraph and CrewAI.',
  'ai-ml',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'linux',
  'Linux',
  'Master the Linux command line.',
  'devops-cloud-cat',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'docker',
  'Docker',
  'Containerize your applications.',
  'devops-cloud-cat',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'cloud',
  'Cloud',
  'AWS, Azure, and GCP basics.',
  'devops-cloud-cat',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'software-architecture',
  'Software Architecture',
  'Project Architecture and code structuring.',
  'computer-science',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'db-design',
  'Database Design',
  'Relational and NoSQL database modeling.',
  'computer-science',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'zero-to-developer',
  'ZERO → DEVELOPER',
  'The ultimate path for someone who has never written code before.',
  'absolute-beginner',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'clean-code',
  'Clean Code',
  '',
  'best-practices',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'debugging',
  'Debugging',
  '',
  'best-practices',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'testing',
  'Testing',
  '',
  'best-practices',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'code-review',
  'Code Review',
  '',
  'best-practices',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'documentation',
  'Documentation',
  '',
  'best-practices',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'api-design',
  'API Design',
  '',
  'best-practices',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'security',
  'Security',
  '',
  'best-practices',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'ci-cd',
  'CI/CD',
  '',
  'best-practices',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'deployment',
  'Deployment',
  '',
  'best-practices',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'production',
  'Production Readiness',
  '',
  'best-practices',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'ai-assisted',
  'AI-Assisted Development',
  '',
  'best-practices',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  'ai-code-verify',
  'AI Code Verification',
  '',
  'best-practices',
  'Intermediate',
  '6 Months',
  'UPCOMING'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
  status = EXCLUDED.status;

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-1',
  'ai-engineering',
  'Week 1: AI Basics + Beginners Python',
  'Understand the AI landscape and learn Python, THE programming language for AI.',
  'Week 1',
  0
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-1', 'AI Basics: Understand AI landscape (ML, DL, NLP, Gen AI and Agentic AI)', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-1' AND topic = 'AI Basics: Understand AI landscape (ML, DL, NLP, Gen AI and Agentic AI)'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-1', 'Python: Variables, Numbers, Strings', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-1' AND topic = 'Python: Variables, Numbers, Strings'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-1', 'Python: Lists, Dictionaries, Sets, Tuples', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-1' AND topic = 'Python: Lists, Dictionaries, Sets, Tuples'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-1', 'Python: If condition, for loop', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-1' AND topic = 'Python: If condition, for loop'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-1', 'Python: Functions, Lambda Functions', 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-1' AND topic = 'Python: Functions, Lambda Functions'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-1', 'Python: Modules (pip install), Read, Write files', 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-1' AND topic = 'Python: Modules (pip install), Read, Write files'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-1', 'Python: Exception handling, Classes, Objects', 6
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-1' AND topic = 'Python: Exception handling, Classes, Objects'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-1', 'video'::public.resource_type, 'AI Basics', 'https://www.youtube.com/watch?v=VGFpV3Qj4as', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-1' AND title = 'AI Basics'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-1', 'video'::public.resource_type, 'Python Tutorials (Codebasics) - first 16 videos', 'https://bit.ly/3X6CCC7', NULL, 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-1' AND title = 'Python Tutorials (Codebasics) - first 16 videos'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-1', 'video'::public.resource_type, 'Corey''s Python Tutorials', 'https://bit.ly/3uqUgaZ', NULL, 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-1' AND title = 'Corey''s Python Tutorials'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-1', 'video'::public.resource_type, 'Codebasics python HINDI tutorials', 'https://bit.ly/3vmXrgw', NULL, 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-1' AND title = 'Codebasics python HINDI tutorials'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-1', 'course'::public.resource_type, 'AI Bootcamp (Affordable Fees)', 'https://codebasics.io/bootcamps/ai-data-science-bootcamp-with-virtual-internship', NULL, 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-1' AND title = 'AI Bootcamp (Affordable Fees)'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-1', 'assignment'::public.resource_type, 'Track A: Finish all these exercises', 'https://bit.ly/3k1mof5', NULL, 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-1' AND title = 'Track A: Finish all these exercises'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-2',
  'ai-engineering',
  'Week 2: Data Structures and Algorithms in Python',
  'Learn core data structures and algorithms, and begin developing communication skills.',
  'Week 2',
  1
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-2', 'Data structures basics, Big O notation', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-2' AND topic = 'Data structures basics, Big O notation'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-2', 'Data structures: Arrays, Hash Table, Linked List, Stack, Queue, Tree, Graph', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-2' AND topic = 'Data structures: Arrays, Hash Table, Linked List, Stack, Queue, Tree, Graph'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-2', 'Algorithms: Binary search, Bubble sort', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-2' AND topic = 'Algorithms: Binary search, Bubble sort'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-2', 'Recursion', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-2' AND topic = 'Recursion'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-2', 'Core Skill: Communication (Toastmasters)', 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-2' AND topic = 'Core Skill: Communication (Toastmasters)'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-2', 'video'::public.resource_type, 'DSA YouTube Playlist (Skip 15-19)', 'https://bit.ly/3uiW2Lf', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-2' AND title = 'DSA YouTube Playlist (Skip 15-19)'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-2', 'other'::public.resource_type, 'Toastmasters for communication', 'https://www.toastmasters.org/', NULL, 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-2' AND title = 'Toastmasters for communication'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-2', 'video'::public.resource_type, 'Motivation: Conversation with Senior director of Fractal', 'https://www.youtube.com/watch?v=BaAA7kNjeZw', NULL, 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-2' AND title = 'Motivation: Conversation with Senior director of Fractal'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-2', 'assignment'::public.resource_type, 'Finish all exercises in the DSA playlist', 'https://bit.ly/3uiW2Lf', NULL, 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-2' AND title = 'Finish all exercises in the DSA playlist'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-3',
  'ai-engineering',
  'Week 3: Advance Python',
  'Master advanced Python concepts, networking on LinkedIn, and business fundamentals.',
  'Week 3',
  2
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-3', 'Inheritance, Generators, Iterators', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-3' AND topic = 'Inheritance, Generators, Iterators'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-3', 'List Comprehensions, Decorators', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-3' AND topic = 'List Comprehensions, Decorators'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-3', 'Multithreading, Multiprocessing', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-3' AND topic = 'Multithreading, Multiprocessing'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-3', 'Core Skill: LinkedIn Networking & following AI influencers', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-3' AND topic = 'Core Skill: LinkedIn Networking & following AI influencers'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-3', 'Business Fundamentals: Learn business concepts (ThinkSchool)', 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-3' AND topic = 'Business Fundamentals: Learn business concepts (ThinkSchool)'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-3', 'video'::public.resource_type, 'Python Tutorials (17th to 27th video)', 'https://bit.ly/3X6CCC7', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-3' AND title = 'Python Tutorials (17th to 27th video)'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-3', 'video'::public.resource_type, 'How Amul beat competition (ThinkSchool)', 'https://youtu.be/nnwqtZiYMxQ', NULL, 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-3' AND title = 'How Amul beat competition (ThinkSchool)'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-3', 'other'::public.resource_type, 'Codebasics Discord Server', 'https://discord.gg/r42Kbuk', NULL, 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-3' AND title = 'Codebasics Discord Server'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-3', 'assignment'::public.resource_type, 'Finish exercises in playlist', 'https://bit.ly/3X6CCC7', NULL, 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-3' AND title = 'Finish exercises in playlist'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-3', 'assignment'::public.resource_type, 'Write meaningful comments on 10 AI LinkedIn posts', NULL, NULL, 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-3' AND title = 'Write meaningful comments on 10 AI LinkedIn posts'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-3', 'assignment'::public.resource_type, 'Note down key learnings from 3 case studies', NULL, NULL, 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-3' AND title = 'Note down key learnings from 3 case studies'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-4',
  'ai-engineering',
  'Week 4: Version Control (Git, Github)',
  'Learn Git, GitHub, and presentation skills.',
  'Week 4',
  3
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-4', 'What is the version control system? Git and GitHub', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-4' AND topic = 'What is the version control system? Git and GitHub'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-4', 'Basic commands: add, commit, push', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-4' AND topic = 'Basic commands: add, commit, push'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-4', 'Branches, reverting change, HEAD, Diff and Merge', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-4' AND topic = 'Branches, reverting change, HEAD, Diff and Merge'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-4', 'Pull requests', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-4' AND topic = 'Pull requests'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-4', 'Core Skill: Presentation skills', 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-4' AND topic = 'Core Skill: Presentation skills'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-4', 'video'::public.resource_type, 'Git YT playlist (codebasics)', 'https://bit.ly/3SECQQ7', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-4' AND title = 'Git YT playlist (codebasics)'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-4', 'video'::public.resource_type, 'Git YT playlist (Corey)', 'https://bit.ly/3T0Yrmb', NULL, 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-4' AND title = 'Git YT playlist (Corey)'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-4', 'video'::public.resource_type, 'Death by PowerPoint', 'https://youtu.be/Iwpi1Lm6dFo', NULL, 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-4' AND title = 'Death by PowerPoint'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-4', 'assignment'::public.resource_type, 'Write 2 meaningful blog posts on an AI tech topic', NULL, NULL, 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-4' AND title = 'Write 2 meaningful blog posts on an AI tech topic'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-5',
  'ai-engineering',
  'Week 5: Numpy, Pandas, Data Visualization, SQL',
  'Data manipulation, visualization, and databases.',
  'Week 5',
  4
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-5', 'Numpy, Pandas, Matplotlib, Seaborn', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-5' AND topic = 'Numpy, Pandas, Matplotlib, Seaborn'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-5', 'Basics of relational databases', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-5' AND topic = 'Basics of relational databases'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-5', 'Basic Queries: SELECT, WHERE LIKE, DISTINCT, BETWEEN, GROUP BY, ORDER BY', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-5' AND topic = 'Basic Queries: SELECT, WHERE LIKE, DISTINCT, BETWEEN, GROUP BY, ORDER BY'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-5', 'Joins: Left, Right, Inner, Full', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-5' AND topic = 'Joins: Left, Right, Inner, Full'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-5', 'course'::public.resource_type, 'Numpy & Pandas Course (Chapters 4 & 5)', 'https://codebasics.io/courses/math-and-statistics-for-data-science', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-5' AND title = 'Numpy & Pandas Course (Chapters 4 & 5)'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-5', 'video'::public.resource_type, 'SQL Tutorial on YouTube', 'https://www.youtube.com/watch?v=Rm0xH2Vpfi0', NULL, 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-5' AND title = 'SQL Tutorial on YouTube'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-6-8',
  'ai-engineering',
  'Week 6, 7, 8: Math & Statistics for AI',
  'The mathematical foundations required for Machine Learning.',
  'Week 6-8',
  5
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-6-8', 'Descriptive vs inferential statistics, continuous vs discrete data', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-6-8' AND topic = 'Descriptive vs inferential statistics, continuous vs discrete data'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-6-8', 'Linear Algebra: Vectors, Matrices, Eigenvalues', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-6-8' AND topic = 'Linear Algebra: Vectors, Matrices, Eigenvalues'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-6-8', 'Calculus: Basics of integral and differential calculus', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-6-8' AND topic = 'Calculus: Basics of integral and differential calculus'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-6-8', 'Basic plots: Histograms, pie charts, scatter plot', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-6-8' AND topic = 'Basic plots: Histograms, pie charts, scatter plot'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-6-8', 'Measures of central tendency & dispersion', 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-6-8' AND topic = 'Measures of central tendency & dispersion'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-6-8', 'Probability & Distributions (Normal)', 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-6-8' AND topic = 'Probability & Distributions (Normal)'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-6-8', 'Correlation, covariance, Central limit theorem', 6
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-6-8' AND topic = 'Correlation, covariance, Central limit theorem'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-6-8', 'Hypothesis testing: p value, confidence interval, Z test', 7
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-6-8' AND topic = 'Hypothesis testing: p value, confidence interval, Z test'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-6-8', 'course'::public.resource_type, 'Khan Academy Statistics and Probability', 'https://www.khanacademy.org/math/statistics-probability', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-6-8' AND title = 'Khan Academy Statistics and Probability'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-6-8', 'video'::public.resource_type, 'StatQuest YouTube Channel', 'https://www.youtube.com/@statquest', NULL, 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-6-8' AND title = 'StatQuest YouTube Channel'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-6-8', 'video'::public.resource_type, 'Math Playlist', 'https://bit.ly/3QrSXis', NULL, 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-6-8' AND title = 'Math Playlist'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-6-8', 'video'::public.resource_type, '3Blue1Brown YouTube Channel', 'https://www.youtube.com/@3blue1brown', NULL, 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-6-8' AND title = '3Blue1Brown YouTube Channel'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-6-8', 'assignment'::public.resource_type, 'Finish all exercises in playlist', 'https://bit.ly/3QrSXis', NULL, 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-6-8' AND title = 'Finish all exercises in playlist'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-9-11',
  'ai-engineering',
  'Week 9, 10, 11: Machine Learning',
  'Core machine learning concepts, models, and evaluation.',
  'Week 9-11',
  6
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-9-11', 'Preprocessing: NA values, outliers, normalization, encoding, feature engineering', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-9-11' AND topic = 'Preprocessing: NA values, outliers, normalization, encoding, feature engineering'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-9-11', 'Train test split, Cross validation', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-9-11' AND topic = 'Train test split, Cross validation'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-9-11', 'Supervised vs Unsupervised (Regression vs Classification)', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-9-11' AND topic = 'Supervised vs Unsupervised (Regression vs Classification)'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-9-11', 'Linear models (Regression, Logistic, Gradient descent)', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-9-11' AND topic = 'Linear models (Regression, Logistic, Gradient descent)'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-9-11', 'Nonlinear models (Decision tree, Random forest, XGBoost)', 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-9-11' AND topic = 'Nonlinear models (Decision tree, Random forest, XGBoost)'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-9-11', 'Model evaluation (MSE, MAE, Accuracy, F1 Score, ROC Curve, Confusion matrix)', 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-9-11' AND topic = 'Model evaluation (MSE, MAE, Accuracy, F1 Score, ROC Curve, Confusion matrix)'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-9-11', 'Hyperparameter tuning (GridSearchCV, RandomSearchCV)', 6
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-9-11' AND topic = 'Hyperparameter tuning (GridSearchCV, RandomSearchCV)'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-9-11', 'Unsupervised: K means, DBScan, PCA', 7
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-9-11' AND topic = 'Unsupervised: K means, DBScan, PCA'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-9-11', 'video'::public.resource_type, 'Machine Learning Playlist', 'https://bit.ly/3io5qqX', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-9-11' AND title = 'Machine Learning Playlist'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-9-11', 'video'::public.resource_type, 'Feature Engineering Playlist', 'https://bit.ly/3IFa3Yf', NULL, 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-9-11' AND title = 'Feature Engineering Playlist'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-9-11', 'other'::public.resource_type, 'Project Management - Scrum', 'https://scrumtrainingseries.com/', NULL, 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-9-11' AND title = 'Project Management - Scrum'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-9-11', 'video'::public.resource_type, 'Project Management - Kanban', 'https://youtu.be/jf0tlbt9lx0', NULL, 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-9-11' AND title = 'Project Management - Kanban'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-9-11', 'assignment'::public.resource_type, 'Work on 2 Kaggle ML notebooks', NULL, NULL, 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-9-11' AND title = 'Work on 2 Kaggle ML notebooks'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-9-11', 'assignment'::public.resource_type, 'Write 2 LinkedIn posts on ML', NULL, NULL, 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-9-11' AND title = 'Write 2 LinkedIn posts on ML'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-9-11', 'assignment'::public.resource_type, 'Help people on Discord with at least 10 answers', NULL, NULL, 6
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-9-11' AND title = 'Help people on Discord with at least 10 answers'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-12-13',
  'ai-engineering',
  'Week 12, 13: DevOps, ML Ops, FastAPI',
  'Deploying and managing machine learning models.',
  'Week 12-13',
  7
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-12-13', 'What is API? FastAPI for Python server development', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-12-13' AND topic = 'What is API? FastAPI for Python server development'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-12-13', 'What is ML Ops? Experiment Tracking with MLFlow', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-12-13' AND topic = 'What is ML Ops? Experiment Tracking with MLFlow'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-12-13', 'DevOps Fundamentals: CI/CD, Docker, Kubernetes', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-12-13' AND topic = 'DevOps Fundamentals: CI/CD, Docker, Kubernetes'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-12-13', 'Familiarity with at least one cloud platform (AWS or Azure)', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-12-13' AND topic = 'Familiarity with at least one cloud platform (AWS or Azure)'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-12-13', 'Open-source contribution (GitHub issues)', 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-12-13' AND topic = 'Open-source contribution (GitHub issues)'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-12-13', 'video'::public.resource_type, 'FastAPI tutorial', 'https://bit.ly/497p6Ex', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-12-13' AND title = 'FastAPI tutorial'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-12-13', 'video'::public.resource_type, 'What is ML Ops', 'https://bit.ly/3R4uGA0', NULL, 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-12-13' AND title = 'What is ML Ops'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-12-13', 'video'::public.resource_type, 'MLFlow Tutorial', 'https://www.youtube.com/watch?v=6ngxBkx05Fs', NULL, 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-12-13' AND title = 'MLFlow Tutorial'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-12-13', 'video'::public.resource_type, 'Docker Tutorial', 'https://bit.ly/3uCNpeE', NULL, 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-12-13' AND title = 'Docker Tutorial'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-12-13', 'other'::public.resource_type, 'MindSQL Issues (Open Source)', 'https://github.com/Mindinventory/MindSQL/issues', NULL, 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-12-13' AND title = 'MindSQL Issues (Open Source)'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-14',
  'ai-engineering',
  'Week 14: Machine Learning Projects',
  'Build end-to-end ML projects.',
  'Week 14',
  8
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-14', 'Regression Project: Bangalore property price prediction', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-14' AND topic = 'Regression Project: Bangalore property price prediction'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-14', 'Data cleaning & Feature engineering', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-14' AND topic = 'Data cleaning & Feature engineering'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-14', 'Model building and tuning', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-14' AND topic = 'Model building and tuning'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-14', 'Write flask server as a web backend', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-14' AND topic = 'Write flask server as a web backend'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-14', 'Building website for price prediction & Deployment to AWS', 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-14' AND topic = 'Building website for price prediction & Deployment to AWS'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-14', 'ATS Resume Preparation', 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-14' AND topic = 'ATS Resume Preparation'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-14', 'Portfolio Building (GitHub)', 6
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-14' AND topic = 'Portfolio Building (GitHub)'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-14', 'video'::public.resource_type, 'Regression Project Playlist', 'https://bit.ly/3ivycWr', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-14' AND title = 'Regression Project Playlist'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-14', 'video'::public.resource_type, 'Resume Tips Video', 'https://www.youtube.com/watch?v=buQSI8NLOMw', NULL, 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-14' AND title = 'Resume Tips Video'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-14', 'other'::public.resource_type, 'Student Portfolio Example', 'https://codebasics.io/portfolio/Lalith-kumar-Dabilpuram', NULL, 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-14' AND title = 'Student Portfolio Example'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-14', 'assignment'::public.resource_type, 'Use FastAPI instead of flask', 'https://youtu.be/Wr1JjhTt1Xg', NULL, 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-14' AND title = 'Use FastAPI instead of flask'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-14', 'assignment'::public.resource_type, 'Classification project deployment to AWS/Azure', NULL, NULL, 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-14' AND title = 'Classification project deployment to AWS/Azure'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-15-18',
  'ai-engineering',
  'Week 15, 16, 17, 18: Deep Learning',
  'Neural networks, architectures, and deep learning frameworks.',
  'Week 15-18',
  9
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-15-18', 'What is a neural network? Forward & back propagation', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-15-18' AND topic = 'What is a neural network? Forward & back propagation'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-15-18', 'Building multilayer perceptron', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-15-18' AND topic = 'Building multilayer perceptron'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-15-18', 'Special neural network architectures', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-15-18' AND topic = 'Special neural network architectures'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-15-18', 'Convolutional neural network (CNN)', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-15-18' AND topic = 'Convolutional neural network (CNN)'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-15-18', 'Sequence models: RNN, LSTM', 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-15-18' AND topic = 'Sequence models: RNN, LSTM'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-15-18', 'Transformers', 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-15-18' AND topic = 'Transformers'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-15-18', 'video'::public.resource_type, 'Deep Learning playlist (TensorFlow)', 'https://bit.ly/3vOZ3zV', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-15-18' AND title = 'Deep Learning playlist (TensorFlow)'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-15-18', 'video'::public.resource_type, 'End to end potato disease classification project', 'https://bit.ly/3QzkVJi', NULL, 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-15-18' AND title = 'End to end potato disease classification project'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-15-18', 'video'::public.resource_type, 'CampusX PyTorch playlist', 'https://bit.ly/3K353Qg', NULL, 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-15-18' AND title = 'CampusX PyTorch playlist'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-15-18', 'assignment'::public.resource_type, 'Use tomato plant images instead of potato', NULL, NULL, 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-15-18' AND title = 'Use tomato plant images instead of potato'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-15-18', 'assignment'::public.resource_type, 'Deploy to Azure instead of GCP', NULL, NULL, 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-15-18' AND title = 'Deploy to Azure instead of GCP'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-15-18', 'assignment'::public.resource_type, 'Create a stakeholder presentation for LinkedIn', NULL, NULL, 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-15-18' AND title = 'Create a stakeholder presentation for LinkedIn'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-19-21',
  'ai-engineering',
  'Week 19, 20, 21: NLP or Computer Vision',
  'Specialize in either Natural Language Processing or Computer Vision.',
  'Week 19-21',
  10
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-19-21', 'NLP: Regex, Count vectorizer, TF-IDF, BOW, Word2Vec, Embeddings', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-19-21' AND topic = 'NLP: Regex, Count vectorizer, TF-IDF, BOW, Word2Vec, Embeddings'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-19-21', 'NLP: Text classification (Naïve Bayes), Spacy & NLTK', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-19-21' AND topic = 'NLP: Text classification (Naïve Bayes), Spacy & NLTK'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-19-21', 'CV: Filtering, Edge Detection, Image Scaling, Rotation', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-19-21' AND topic = 'CV: Filtering, Edge Detection, Image Scaling, Rotation'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-19-21', 'CV: OpenCV, CNNs, YOLO, Data preprocessing', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-19-21' AND topic = 'CV: OpenCV, CNNs, YOLO, Data preprocessing'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-19-21', 'video'::public.resource_type, 'NLP YouTube playlist', 'https://bit.ly/3XnjfEZ', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-19-21' AND title = 'NLP YouTube playlist'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-19-21', 'video'::public.resource_type, 'Log Classification System Project', 'https://bit.ly/4hu5EoL', NULL, 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-19-21' AND title = 'Log Classification System Project'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-19-21', 'assignment'::public.resource_type, 'NLP Track Exercises', 'https://bit.ly/3XnjfEZ', NULL, 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-19-21' AND title = 'NLP Track Exercises'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-22-24',
  'ai-engineering',
  'Week 22, 23, 24: Gen AI and Agentic AI',
  'Modern Generative AI and AI Agents.',
  'Week 22-24',
  11
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-22-24', 'What is LLM, Vector databases, Embeddings', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-22-24' AND topic = 'What is LLM, Vector databases, Embeddings'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-22-24', 'RAG (Retrieval Augmented Generation)', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-22-24' AND topic = 'RAG (Retrieval Augmented Generation)'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-22-24', 'Langchain framework', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-22-24' AND topic = 'Langchain framework'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-22-24', 'MCP (Model Context Protocol)', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-22-24' AND topic = 'MCP (Model Context Protocol)'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-22-24', 'Agentic frameworks: LangGraph, CrewAI', 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-22-24' AND topic = 'Agentic frameworks: LangGraph, CrewAI'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-22-24', 'LLM Fine Tuning', 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-22-24' AND topic = 'LLM Fine Tuning'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-22-24', 'video'::public.resource_type, 'Gen AI crash course', 'https://bit.ly/3Fn7Zoh', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-22-24' AND title = 'Gen AI crash course'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-22-24', 'video'::public.resource_type, 'What is MCP', 'https://youtu.be/tzrwxLNHtRY', NULL, 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-22-24' AND title = 'What is MCP'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-22-24', 'video'::public.resource_type, 'Build your MCP server', 'https://youtu.be/jLM6n4mdRuA', NULL, 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-22-24' AND title = 'Build your MCP server'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-22-24', 'video'::public.resource_type, 'Agentic AI Tutorial using LangGraph', 'https://www.youtube.com/watch?v=CnXdddeZ4tQ', NULL, 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-22-24' AND title = 'Agentic AI Tutorial using LangGraph'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-22-24', 'video'::public.resource_type, 'Crew AI', 'https://www.youtube.com/watch?v=G42J2MSKyc8', NULL, 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-22-24' AND title = 'Crew AI'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-22-24', 'video'::public.resource_type, 'LLM Fine Tuning', 'https://youtu.be/IIvORO248Zs', NULL, 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-22-24' AND title = 'LLM Fine Tuning'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-25-27',
  'ai-engineering',
  'Week 25, 26, 27: Gen AI, Agentic AI Projects',
  'Solve real-life problems using LLMs and Agents.',
  'Week 25-27',
  12
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-25-27', 'Projects that include using LLMs, RAG, Agents to solve real life problems', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-25-27' AND topic = 'Projects that include using LLMs, RAG, Agents to solve real life problems'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-25-27', 'video'::public.resource_type, 'Gen AI project playlist', 'https://bit.ly/4ilzEnX', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-25-27' AND title = 'Gen AI project playlist'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-28-29',
  'ai-engineering',
  'Week 28, 29: Unguided AI Projects',
  'Build end-to-end unguided projects to add to your resume with confidence.',
  'Week 28-29',
  13
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-28-29', 'Build RAG Chatbot using Role Based Access Control (RBAC)', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-28-29' AND topic = 'Build RAG Chatbot using Role Based Access Control (RBAC)'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-28-29', 'Use NLP to detect adverse drug events', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-28-29' AND topic = 'Use NLP to detect adverse drug events'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-28-29', 'article'::public.resource_type, 'Build RAG Chatbot', 'https://bit.ly/47SttUq', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-28-29' AND title = 'Build RAG Chatbot'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-28-29', 'article'::public.resource_type, 'Use NLP to detect adverse drug events', 'https://bit.ly/43oup1y', NULL, 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-28-29' AND title = 'Use NLP to detect adverse drug events'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-30-32',
  'ai-engineering',
  'Week 30, 31, 32: Azure or AWS',
  'Cloud skills essential for experienced AI engineer roles.',
  'Week 30-32',
  14
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-30-32', 'Azure fundamentals: Resource groups, subscriptions, regions, IAM', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-30-32' AND topic = 'Azure fundamentals: Resource groups, subscriptions, regions, IAM'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-30-32', 'Azure Compute: Functions, App Service, Kubernetes (AKS)', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-30-32' AND topic = 'Azure Compute: Functions, App Service, Kubernetes (AKS)'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-30-32', 'Azure AI, ML: Azure ML, OpenAI service, Cognitive services', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-30-32' AND topic = 'Azure AI, ML: Azure ML, OpenAI service, Cognitive services'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-30-32', 'Azure MLOps: Azure ML Pipelines, Devops/GitHub actions', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-30-32' AND topic = 'Azure MLOps: Azure ML Pipelines, Devops/GitHub actions'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-30-32', 'AWS fundamentals: Accounts, regions, S3, IAM', 4
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-30-32' AND topic = 'AWS fundamentals: Accounts, regions, S3, IAM'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-30-32', 'AWS Compute: Lambda, App Runner, EKS', 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-30-32' AND topic = 'AWS Compute: Lambda, App Runner, EKS'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-30-32', 'AWS AI: SageMaker, Bedrock, AWS AI Services', 6
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-30-32' AND topic = 'AWS AI: SageMaker, Bedrock, AWS AI Services'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-30-32', 'Optional: No-code agentic tool (N8N, Make, Zapier), No-SQL database (MongoDB)', 7
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-30-32' AND topic = 'Optional: No-code agentic tool (N8N, Make, Zapier), No-SQL database (MongoDB)'
);

INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  'week-33-onwards',
  'ai-engineering',
  'Week 33 onwards...',
  'Continue building projects and your online presence.',
  'Week 33+',
  15
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-33-onwards', 'More projects', 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-33-onwards' AND topic = 'More projects'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-33-onwards', 'Online brand building through LinkedIn, Kaggle, Discord, Open-source contribution', 1
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-33-onwards' AND topic = 'Online brand building through LinkedIn, Kaggle, Discord, Open-source contribution'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-33-onwards', 'Job application and Success', 2
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-33-onwards' AND topic = 'Job application and Success'
);
INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT 'week-33-onwards', 'Group learning and accountability', 3
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = 'week-33-onwards' AND topic = 'Group learning and accountability'
);
INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT 'week-33-onwards', 'other'::public.resource_type, 'Codebasics Discord Server', 'https://discord.gg/r42Kbuk', NULL, 0
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = 'week-33-onwards' AND title = 'Codebasics Discord Server'
);

-- ==========================================
-- FINAL VALIDATION SECTION
-- Run these queries to verify the seed data
-- ==========================================

-- 1. Total roadmap count (Expected: 36)
-- SELECT count(*) AS total_roadmaps FROM public.roadmaps;

-- 2. PUBLISHED roadmap count (Expected: 1)
-- SELECT count(*) AS published_roadmaps FROM public.roadmaps WHERE status = 'PUBLISHED';

-- 3. UPCOMING roadmap count (Expected: 35)
-- SELECT count(*) AS upcoming_roadmaps FROM public.roadmaps WHERE status = 'UPCOMING';

-- 4. AI Engineering node count (Expected: 16)
-- SELECT count(*) AS ai_eng_nodes FROM public.roadmap_nodes WHERE roadmap_id = 'ai-engineering';

-- 5. AI Engineering topic count (Expected: 85)
-- SELECT count(*) AS ai_eng_topics FROM public.roadmap_topics rt JOIN public.roadmap_nodes rn ON rt.node_id = rn.id WHERE rn.roadmap_id = 'ai-engineering';

-- 6. AI Engineering resource count (Expected: 63)
-- SELECT count(*) AS ai_eng_resources FROM public.resources r JOIN public.roadmap_nodes rn ON r.node_id = rn.id WHERE rn.roadmap_id = 'ai-engineering';

-- 7. AI Engineering assignment count (Expected: 16)
-- SELECT count(*) AS ai_eng_assignments FROM public.resources r JOIN public.roadmap_nodes rn ON r.node_id = rn.id WHERE rn.roadmap_id = 'ai-engineering' AND r.type = 'assignment';

-- 8. Confirmation that no non-AI-Engineering roadmap has nodes (Expected: 0)
-- SELECT count(*) AS non_ai_eng_nodes FROM public.roadmap_nodes WHERE roadmap_id != 'ai-engineering';

