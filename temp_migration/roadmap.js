"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformCategories = exports.bestPracticesRoadmaps = exports.absoluteBeginnerRoadmap = exports.skillBasedRoadmaps = exports.roleBasedRoadmaps = exports.aiEngineeringRoadmap = void 0;
exports.getCategoryById = getCategoryById;
exports.getAllRoadmaps = getAllRoadmaps;
exports.getRoadmapById = getRoadmapById;
exports.aiEngineeringRoadmap = {
    id: "ai-engineering",
    title: "AI Engineer Roadmap 2026",
    description: "Following is the roadmap for AI Engineer, ML Engineer or Gen AI Engineer. It includes FREE learning resources for technical skills (or tool skills) and soft (or core) skills. This roadmap is designed based on the analysis of hundreds of AI jobs.",
    difficulty: "All Levels",
    estimatedDuration: "8 Months (4 hours of study every day, 6 days a week)",
    objectives: [
        "Master Machine Learning, Deep Learning, Generative AI, and Agentic workflows.",
        "Build a strong portfolio with end-to-end deployed AI projects.",
        "Develop core soft skills including LinkedIn branding, presentation, and open-source contribution."
    ],
    prerequisites: ["None. Valid for freshers and experienced professionals."],
    nodes: [
        {
            id: "week-1",
            title: "Week 1: AI Basics + Beginners Python",
            description: "Understand the AI landscape and learn Python, THE programming language for AI.",
            duration: "Week 1",
            topics: [
                "AI Basics: Understand AI landscape (ML, DL, NLP, Gen AI and Agentic AI)",
                "Python: Variables, Numbers, Strings",
                "Python: Lists, Dictionaries, Sets, Tuples",
                "Python: If condition, for loop",
                "Python: Functions, Lambda Functions",
                "Python: Modules (pip install), Read, Write files",
                "Python: Exception handling, Classes, Objects"
            ],
            resources: [
                { type: "video", title: "AI Basics", url: "https://www.youtube.com/watch?v=VGFpV3Qj4as" },
                { type: "video", title: "Python Tutorials (Codebasics) - first 16 videos", url: "https://bit.ly/3X6CCC7" },
                { type: "video", title: "Corey's Python Tutorials", url: "https://bit.ly/3uqUgaZ" },
                { type: "video", title: "Codebasics python HINDI tutorials", url: "https://bit.ly/3vmXrgw" },
                { type: "course", title: "AI Bootcamp (Affordable Fees)", url: "https://codebasics.io/bootcamps/ai-data-science-bootcamp-with-virtual-internship" },
                { type: "assignment", title: "Track A: Finish all these exercises", url: "https://bit.ly/3k1mof5" }
            ]
        },
        {
            id: "week-2",
            title: "Week 2: Data Structures and Algorithms in Python",
            description: "Learn core data structures and algorithms, and begin developing communication skills.",
            duration: "Week 2",
            topics: [
                "Data structures basics, Big O notation",
                "Data structures: Arrays, Hash Table, Linked List, Stack, Queue, Tree, Graph",
                "Algorithms: Binary search, Bubble sort",
                "Recursion",
                "Core Skill: Communication (Toastmasters)"
            ],
            resources: [
                { type: "video", title: "DSA YouTube Playlist (Skip 15-19)", url: "https://bit.ly/3uiW2Lf" },
                { type: "other", title: "Toastmasters for communication", url: "https://www.toastmasters.org/" },
                { type: "video", title: "Motivation: Conversation with Senior director of Fractal", url: "https://www.youtube.com/watch?v=BaAA7kNjeZw" },
                { type: "assignment", title: "Finish all exercises in the DSA playlist", url: "https://bit.ly/3uiW2Lf" }
            ]
        },
        {
            id: "week-3",
            title: "Week 3: Advance Python",
            description: "Master advanced Python concepts, networking on LinkedIn, and business fundamentals.",
            duration: "Week 3",
            topics: [
                "Inheritance, Generators, Iterators",
                "List Comprehensions, Decorators",
                "Multithreading, Multiprocessing",
                "Core Skill: LinkedIn Networking & following AI influencers",
                "Business Fundamentals: Learn business concepts (ThinkSchool)"
            ],
            resources: [
                { type: "video", title: "Python Tutorials (17th to 27th video)", url: "https://bit.ly/3X6CCC7" },
                { type: "video", title: "How Amul beat competition (ThinkSchool)", url: "https://youtu.be/nnwqtZiYMxQ" },
                { type: "other", title: "Codebasics Discord Server", url: "https://discord.gg/r42Kbuk" },
                { type: "assignment", title: "Finish exercises in playlist", url: "https://bit.ly/3X6CCC7" },
                { type: "assignment", title: "Write meaningful comments on 10 AI LinkedIn posts", url: "#" },
                { type: "assignment", title: "Note down key learnings from 3 case studies", url: "#" }
            ]
        },
        {
            id: "week-4",
            title: "Week 4: Version Control (Git, Github)",
            description: "Learn Git, GitHub, and presentation skills.",
            duration: "Week 4",
            topics: [
                "What is the version control system? Git and GitHub",
                "Basic commands: add, commit, push",
                "Branches, reverting change, HEAD, Diff and Merge",
                "Pull requests",
                "Core Skill: Presentation skills"
            ],
            resources: [
                { type: "video", title: "Git YT playlist (codebasics)", url: "https://bit.ly/3SECQQ7" },
                { type: "video", title: "Git YT playlist (Corey)", url: "https://bit.ly/3T0Yrmb" },
                { type: "video", title: "Death by PowerPoint", url: "https://youtu.be/Iwpi1Lm6dFo" },
                { type: "assignment", title: "Write 2 meaningful blog posts on an AI tech topic", url: "#" }
            ]
        },
        {
            id: "week-5",
            title: "Week 5: Numpy, Pandas, Data Visualization, SQL",
            description: "Data manipulation, visualization, and databases.",
            duration: "Week 5",
            topics: [
                "Numpy, Pandas, Matplotlib, Seaborn",
                "Basics of relational databases",
                "Basic Queries: SELECT, WHERE LIKE, DISTINCT, BETWEEN, GROUP BY, ORDER BY",
                "Joins: Left, Right, Inner, Full"
            ],
            resources: [
                { type: "course", title: "Numpy & Pandas Course (Chapters 4 & 5)", url: "https://codebasics.io/courses/math-and-statistics-for-data-science" },
                { type: "video", title: "SQL Tutorial on YouTube", url: "https://www.youtube.com/watch?v=Rm0xH2Vpfi0" }
            ]
        },
        {
            id: "week-6-8",
            title: "Week 6, 7, 8: Math & Statistics for AI",
            description: "The mathematical foundations required for Machine Learning.",
            duration: "Week 6-8",
            topics: [
                "Descriptive vs inferential statistics, continuous vs discrete data",
                "Linear Algebra: Vectors, Matrices, Eigenvalues",
                "Calculus: Basics of integral and differential calculus",
                "Basic plots: Histograms, pie charts, scatter plot",
                "Measures of central tendency & dispersion",
                "Probability & Distributions (Normal)",
                "Correlation, covariance, Central limit theorem",
                "Hypothesis testing: p value, confidence interval, Z test"
            ],
            resources: [
                { type: "course", title: "Khan Academy Statistics and Probability", url: "https://www.khanacademy.org/math/statistics-probability" },
                { type: "video", title: "StatQuest YouTube Channel", url: "https://www.youtube.com/@statquest" },
                { type: "video", title: "Math Playlist", url: "https://bit.ly/3QrSXis" },
                { type: "video", title: "3Blue1Brown YouTube Channel", url: "https://www.youtube.com/@3blue1brown" },
                { type: "assignment", title: "Finish all exercises in playlist", url: "https://bit.ly/3QrSXis" }
            ]
        },
        {
            id: "week-9-11",
            title: "Week 9, 10, 11: Machine Learning",
            description: "Core machine learning concepts, models, and evaluation.",
            duration: "Week 9-11",
            topics: [
                "Preprocessing: NA values, outliers, normalization, encoding, feature engineering",
                "Train test split, Cross validation",
                "Supervised vs Unsupervised (Regression vs Classification)",
                "Linear models (Regression, Logistic, Gradient descent)",
                "Nonlinear models (Decision tree, Random forest, XGBoost)",
                "Model evaluation (MSE, MAE, Accuracy, F1 Score, ROC Curve, Confusion matrix)",
                "Hyperparameter tuning (GridSearchCV, RandomSearchCV)",
                "Unsupervised: K means, DBScan, PCA"
            ],
            resources: [
                { type: "video", title: "Machine Learning Playlist", url: "https://bit.ly/3io5qqX" },
                { type: "video", title: "Feature Engineering Playlist", url: "https://bit.ly/3IFa3Yf" },
                { type: "other", title: "Project Management - Scrum", url: "https://scrumtrainingseries.com/" },
                { type: "video", title: "Project Management - Kanban", url: "https://youtu.be/jf0tlbt9lx0" },
                { type: "assignment", title: "Work on 2 Kaggle ML notebooks", url: "#" },
                { type: "assignment", title: "Write 2 LinkedIn posts on ML", url: "#" },
                { type: "assignment", title: "Help people on Discord with at least 10 answers", url: "#" }
            ]
        },
        {
            id: "week-12-13",
            title: "Week 12, 13: DevOps, ML Ops, FastAPI",
            description: "Deploying and managing machine learning models.",
            duration: "Week 12-13",
            topics: [
                "What is API? FastAPI for Python server development",
                "What is ML Ops? Experiment Tracking with MLFlow",
                "DevOps Fundamentals: CI/CD, Docker, Kubernetes",
                "Familiarity with at least one cloud platform (AWS or Azure)",
                "Open-source contribution (GitHub issues)"
            ],
            resources: [
                { type: "video", title: "FastAPI tutorial", url: "https://bit.ly/497p6Ex" },
                { type: "video", title: "What is ML Ops", url: "https://bit.ly/3R4uGA0" },
                { type: "video", title: "MLFlow Tutorial", url: "https://www.youtube.com/watch?v=6ngxBkx05Fs" },
                { type: "video", title: "Docker Tutorial", url: "https://bit.ly/3uCNpeE" },
                { type: "other", title: "MindSQL Issues (Open Source)", url: "https://github.com/Mindinventory/MindSQL/issues" }
            ]
        },
        {
            id: "week-14",
            title: "Week 14: Machine Learning Projects",
            description: "Build end-to-end ML projects.",
            duration: "Week 14",
            topics: [
                "Regression Project: Bangalore property price prediction",
                "Data cleaning & Feature engineering",
                "Model building and tuning",
                "Write flask server as a web backend",
                "Building website for price prediction & Deployment to AWS",
                "ATS Resume Preparation",
                "Portfolio Building (GitHub)"
            ],
            resources: [
                { type: "video", title: "Regression Project Playlist", url: "https://bit.ly/3ivycWr" },
                { type: "video", title: "Resume Tips Video", url: "https://www.youtube.com/watch?v=buQSI8NLOMw" },
                { type: "other", title: "Student Portfolio Example", url: "https://codebasics.io/portfolio/Lalith-kumar-Dabilpuram" },
                { type: "assignment", title: "Use FastAPI instead of flask", url: "https://youtu.be/Wr1JjhTt1Xg" },
                { type: "assignment", title: "Classification project deployment to AWS/Azure", url: "#" }
            ]
        },
        {
            id: "week-15-18",
            title: "Week 15, 16, 17, 18: Deep Learning",
            description: "Neural networks, architectures, and deep learning frameworks.",
            duration: "Week 15-18",
            topics: [
                "What is a neural network? Forward & back propagation",
                "Building multilayer perceptron",
                "Special neural network architectures",
                "Convolutional neural network (CNN)",
                "Sequence models: RNN, LSTM",
                "Transformers"
            ],
            resources: [
                { type: "video", title: "Deep Learning playlist (TensorFlow)", url: "https://bit.ly/3vOZ3zV" },
                { type: "video", title: "End to end potato disease classification project", url: "https://bit.ly/3QzkVJi" },
                { type: "video", title: "CampusX PyTorch playlist", url: "https://bit.ly/3K353Qg" },
                { type: "assignment", title: "Use tomato plant images instead of potato", url: "#" },
                { type: "assignment", title: "Deploy to Azure instead of GCP", url: "#" },
                { type: "assignment", title: "Create a stakeholder presentation for LinkedIn", url: "#" }
            ]
        },
        {
            id: "week-19-21",
            title: "Week 19, 20, 21: NLP or Computer Vision",
            description: "Specialize in either Natural Language Processing or Computer Vision.",
            duration: "Week 19-21",
            topics: [
                "NLP: Regex, Count vectorizer, TF-IDF, BOW, Word2Vec, Embeddings",
                "NLP: Text classification (Naïve Bayes), Spacy & NLTK",
                "CV: Filtering, Edge Detection, Image Scaling, Rotation",
                "CV: OpenCV, CNNs, YOLO, Data preprocessing"
            ],
            resources: [
                { type: "video", title: "NLP YouTube playlist", url: "https://bit.ly/3XnjfEZ" },
                { type: "video", title: "Log Classification System Project", url: "https://bit.ly/4hu5EoL" },
                { type: "assignment", title: "NLP Track Exercises", url: "https://bit.ly/3XnjfEZ" }
            ]
        },
        {
            id: "week-22-24",
            title: "Week 22, 23, 24: Gen AI and Agentic AI",
            description: "Modern Generative AI and AI Agents.",
            duration: "Week 22-24",
            topics: [
                "What is LLM, Vector databases, Embeddings",
                "RAG (Retrieval Augmented Generation)",
                "Langchain framework",
                "MCP (Model Context Protocol)",
                "Agentic frameworks: LangGraph, CrewAI",
                "LLM Fine Tuning"
            ],
            resources: [
                { type: "video", title: "Gen AI crash course", url: "https://bit.ly/3Fn7Zoh" },
                { type: "video", title: "What is MCP", url: "https://youtu.be/tzrwxLNHtRY" },
                { type: "video", title: "Build your MCP server", url: "https://youtu.be/jLM6n4mdRuA" },
                { type: "video", title: "Agentic AI Tutorial using LangGraph", url: "https://www.youtube.com/watch?v=CnXdddeZ4tQ" },
                { type: "video", title: "Crew AI", url: "https://www.youtube.com/watch?v=G42J2MSKyc8" },
                { type: "video", title: "LLM Fine Tuning", url: "https://youtu.be/IIvORO248Zs" }
            ]
        },
        {
            id: "week-25-27",
            title: "Week 25, 26, 27: Gen AI, Agentic AI Projects",
            description: "Solve real-life problems using LLMs and Agents.",
            duration: "Week 25-27",
            topics: [
                "Projects that include using LLMs, RAG, Agents to solve real life problems"
            ],
            resources: [
                { type: "video", title: "Gen AI project playlist", url: "https://bit.ly/4ilzEnX" }
            ]
        },
        {
            id: "week-28-29",
            title: "Week 28, 29: Unguided AI Projects",
            description: "Build end-to-end unguided projects to add to your resume with confidence.",
            duration: "Week 28-29",
            topics: [
                "Build RAG Chatbot using Role Based Access Control (RBAC)",
                "Use NLP to detect adverse drug events"
            ],
            resources: [
                { type: "article", title: "Build RAG Chatbot", url: "https://bit.ly/47SttUq" },
                { type: "article", title: "Use NLP to detect adverse drug events", url: "https://bit.ly/43oup1y" }
            ]
        },
        {
            id: "week-30-32",
            title: "Week 30, 31, 32: Azure or AWS",
            description: "Cloud skills essential for experienced AI engineer roles.",
            duration: "Week 30-32",
            topics: [
                "Azure fundamentals: Resource groups, subscriptions, regions, IAM",
                "Azure Compute: Functions, App Service, Kubernetes (AKS)",
                "Azure AI, ML: Azure ML, OpenAI service, Cognitive services",
                "Azure MLOps: Azure ML Pipelines, Devops/GitHub actions",
                "AWS fundamentals: Accounts, regions, S3, IAM",
                "AWS Compute: Lambda, App Runner, EKS",
                "AWS AI: SageMaker, Bedrock, AWS AI Services",
                "Optional: No-code agentic tool (N8N, Make, Zapier), No-SQL database (MongoDB)"
            ],
            resources: []
        },
        {
            id: "week-33-onwards",
            title: "Week 33 onwards...",
            description: "Continue building projects and your online presence.",
            duration: "Week 33+",
            topics: [
                "More projects",
                "Online brand building through LinkedIn, Kaggle, Discord, Open-source contribution",
                "Job application and Success",
                "Group learning and accountability"
            ],
            resources: [
                { type: "other", title: "Codebasics Discord Server", url: "https://discord.gg/r42Kbuk" }
            ]
        }
    ]
};
exports.roleBasedRoadmaps = {
    id: 'role-based',
    title: 'Role-Based Roadmaps',
    description: 'Roadmaps designed for specific developer roles.',
    roadmaps: [
        {
            id: 'ai-engineering',
            title: 'AI Engineering',
            description: 'Master Machine Learning, Deep Learning, Generative AI, and Agentic workflows.',
            nodes: exports.aiEngineeringRoadmap.nodes
        },
        { id: 'full-stack', title: 'Full-Stack Development', description: 'Master front-end and back-end web development.', nodes: [] },
        { id: 'backend', title: 'Backend Engineering', description: 'Focus on server-side architecture, databases, and APIs.', nodes: [] },
        { id: 'frontend', title: 'Frontend Engineering', description: 'Build beautiful, responsive, and accessible user interfaces.', nodes: [] },
        { id: 'data-engineer', title: 'Data Engineering', description: 'Design, build, and manage data pipelines and infrastructure.', nodes: [] },
        { id: 'devops-cloud', title: 'DevOps / Cloud Engineering', description: 'Automate deployments and manage cloud infrastructure.', nodes: [] },
        { id: 'cybersecurity', title: 'Cybersecurity Engineering', description: 'Secure applications, networks, and systems from threats.', nodes: [] },
    ]
};
exports.skillBasedRoadmaps = {
    id: 'skill-based',
    title: 'Skill-Based Roadmaps',
    description: 'Learn in-demand technical skills step by step.',
    categories: [
        {
            id: 'programming-data',
            title: 'Programming / Data',
            roadmaps: [
                { id: 'python', title: 'Python', description: 'Master the Python programming language.', nodes: [] },
                { id: 'javascript-typescript', title: 'JavaScript / TypeScript', description: 'Learn JS and typed JS for modern web dev.', nodes: [] },
                { id: 'dsa', title: 'Data Structures & Algorithms', description: 'Master core CS concepts for interviews and performance.', nodes: [] },
                { id: 'sql', title: 'SQL', description: 'Master relational databases and querying.', nodes: [] },
                { id: 'git-github', title: 'Git & GitHub', description: 'Version control mastery.', nodes: [] },
            ]
        },
        {
            id: 'web-development',
            title: 'Web Development',
            subcategories: [
                {
                    id: 'frontend-dev',
                    title: 'Frontend Development',
                    roadmaps: []
                },
                {
                    id: 'backend-dev',
                    title: 'Backend Development',
                    roadmaps: []
                },
                {
                    id: 'api-dev',
                    title: 'API Development',
                    roadmaps: [
                        { id: 'api-development', title: 'API Development', description: 'REST, GraphQL, and gRPC.', nodes: [] }
                    ]
                },
                {
                    id: 'web-sec',
                    title: 'Web Security',
                    roadmaps: [
                        { id: 'web-security', title: 'Web Security', description: 'OWASP Top 10 and securing web apps.', nodes: [] }
                    ]
                }
            ]
        },
        {
            id: 'ai-ml',
            title: 'AI & Machine Learning',
            roadmaps: [
                { id: 'gen-ai', title: 'Generative AI', description: 'Learn Generative models and Prompt Engineering.', nodes: [] },
                { id: 'llm-engineering', title: 'LLM Engineering', description: 'Fine-tune and deploy Large Language Models.', nodes: [] },
                { id: 'rag', title: 'RAG', description: 'Build Retrieval-Augmented Generation systems.', nodes: [] },
                { id: 'ai-agents', title: 'AI Agents', description: 'Build autonomous agents with LangGraph and CrewAI.', nodes: [] },
            ]
        },
        {
            id: 'devops-cloud-cat',
            title: 'DevOps & Cloud',
            roadmaps: [
                { id: 'linux', title: 'Linux', description: 'Master the Linux command line.', nodes: [] },
                { id: 'docker', title: 'Docker', description: 'Containerize your applications.', nodes: [] },
                { id: 'cloud', title: 'Cloud', description: 'AWS, Azure, and GCP basics.', nodes: [] },
            ]
        },
        {
            id: 'computer-science',
            title: 'Computer Science',
            roadmaps: [
                { id: 'software-architecture', title: 'Software Architecture', description: 'Project Architecture and code structuring.', nodes: [] },
                { id: 'db-design', title: 'Database Design', description: 'Relational and NoSQL database modeling.', nodes: [] }
            ]
        }
    ]
};
exports.absoluteBeginnerRoadmap = {
    id: 'absolute-beginner',
    title: 'Absolute Beginners',
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
exports.bestPracticesRoadmaps = {
    id: 'best-practices',
    title: 'Best Practices',
    description: 'Essential practices every developer should know.',
    roadmaps: [
        { id: 'clean-code', title: 'Clean Code', description: '', nodes: [] },
        { id: 'debugging', title: 'Debugging', description: '', nodes: [] },
        { id: 'testing', title: 'Testing', description: '', nodes: [] },
        { id: 'code-review', title: 'Code Review', description: '', nodes: [] },
        { id: 'documentation', title: 'Documentation', description: '', nodes: [] },
        { id: 'api-design', title: 'API Design', description: '', nodes: [] },
        { id: 'security', title: 'Security', description: '', nodes: [] },
        { id: 'ci-cd', title: 'CI/CD', description: '', nodes: [] },
        { id: 'deployment', title: 'Deployment', description: '', nodes: [] },
        { id: 'production', title: 'Production Readiness', description: '', nodes: [] },
        { id: 'ai-assisted', title: 'AI-Assisted Development', description: '', nodes: [] },
        { id: 'ai-code-verify', title: 'AI Code Verification', description: '', nodes: [] },
    ]
};
exports.platformCategories = [
    exports.roleBasedRoadmaps,
    exports.skillBasedRoadmaps,
    exports.absoluteBeginnerRoadmap,
    exports.bestPracticesRoadmaps
];
// Helper functions to get data
function getCategoryById(id) {
    return exports.platformCategories.find(function (c) { return c.id === id; });
}
function getAllRoadmaps() {
    var all = [];
    var collectRoadmaps = function (roadmaps) {
        roadmaps.forEach(function (r) { return all.push(r); });
    };
    exports.platformCategories.forEach(function (type) {
        if (type.roadmaps)
            collectRoadmaps(type.roadmaps);
        if (type.categories) {
            type.categories.forEach(function (cat) {
                if (cat.roadmaps)
                    collectRoadmaps(cat.roadmaps);
                if (cat.nodes)
                    all.push(cat);
                if (cat.subcategories) {
                    cat.subcategories.forEach(function (sub) {
                        if (sub.roadmaps)
                            collectRoadmaps(sub.roadmaps);
                        if (sub.nodes)
                            all.push(sub);
                    });
                }
            });
        }
    });
    return all;
}
function getRoadmapById(id) {
    if (id === 'ai-engineering')
        return exports.aiEngineeringRoadmap;
    if (id === 'zero-to-developer') {
        return {
            id: 'zero-to-developer',
            title: 'ZERO → DEVELOPER',
            description: 'The ultimate path for someone who has never written code before.',
            nodes: exports.absoluteBeginnerRoadmap.roadmaps[0].nodes
        };
    }
    // Return dummy structure for others to satisfy the UI for now
    var all = getAllRoadmaps();
    var found = all.find(function (r) { return r.id === id; });
    return {
        id: id,
        title: (found === null || found === void 0 ? void 0 : found.title) || id.replace(/-/g, ' ').toUpperCase(),
        description: (found === null || found === void 0 ? void 0 : found.description) || 'Roadmap content coming soon...',
        nodes: []
    };
}
