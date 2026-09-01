export interface Resource {
  type: "video" | "article" | "course" | "assignment" | "other";
  title: string;
  url: string;
  content?: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  topics: string[];
  resources: Resource[];
  duration: string;
}

export interface RoadmapCategory {
  id: string;
  title: string;
  description: string;
  nodes: RoadmapNode[];
}

export const aiEngineeringRoadmap: RoadmapCategory = {
  id: "ai-engineering",
  title: "AI Engineer Roadmap 2026",
  description: "Comprehensive roadmap for AI Engineer, ML Engineer or Gen AI Engineer based on 8 months of study.",
  nodes: [
    {
      id: "week-1",
      title: "Week 1: AI Basics + Beginners Python",
      description: "Understand the AI landscape and learn basic Python, which is THE programming language for AI.",
      topics: [
        "AI Basics (ML, DL, NLP, Gen AI, Agentic AI)",
        "Variables, Numbers, Strings",
        "Lists, Dictionaries, Sets, Tuples",
        "If condition, for loop",
        "Functions, Lambda Functions",
        "Modules (pip install)",
        "Read, Write files",
        "Exception handling",
        "Classes, Objects"
      ],
      resources: [
        { type: "video", title: "AI Basics", url: "https://www.youtube.com/watch?v=VGFpV3Qj4as" },
        { 
          type: "article", 
          title: "What is Generative AI? (IBM)", 
          url: "https://www.ibm.com/topics/generative-ai",
          content: "Generative AI refers to deep-learning models that can take raw data and 'learn' to generate probabilistically probable outputs when prompted.\n\n### Key Concepts to Master:\n1. Discriminative vs Generative Models\n2. How Large Language Models (LLMs) predict the next token\n3. Common use cases (Code Generation, Writing, Image generation)\n\nTake 30 minutes to review these core concepts before moving on to the Python tutorials."
        },
        { type: "video", title: "Python Tutorials (Codebasics)", url: "https://bit.ly/3X6CCC7" },
        { type: "course", title: "Corey's Python Tutorials", url: "https://bit.ly/3uqUgaZ" },
        { 
          type: "article", 
          title: "Python Official Documentation", 
          url: "https://docs.python.org/3/",
          content: "The official Python documentation is your best friend.\n\nFor this week, you don't need to read the whole thing! Focus specifically on:\n- Built-in Types (Strings, Lists, Dictionaries)\n- Control Flow (if statements, for loops)\n- Defining Functions\n\nWhenever you get stuck on syntax, check the official docs first!"
        },
        { 
          type: "assignment", 
          title: "Track A Exercises", 
          url: "https://bit.ly/3k1mof5",
          content: "TASK: Complete Track A Exercises\n\nInstructions:\n1. Write a Python script that takes a string input and reverses it.\n2. Create a dictionary of 5 items and write a loop to print keys and values.\n3. Write a function that handles a ZeroDivisionError gracefully.\n\nSave your work in your local repository."
        }
      ],
      duration: "Week 1"
    },
    {
      id: "week-2",
      title: "Week 2: Data Structures and Algorithms in Python",
      description: "Learn essential data structures and algorithms in Python.",
      topics: [
        "Data structures basics, Big O notation",
        "Arrays, Hash Table, Linked List, Stack, Queue, Tree, Graph",
        "Binary search, Bubble sort",
        "Recursion"
      ],
      resources: [
        { type: "video", title: "DSA YouTube Playlist", url: "https://bit.ly/3uiW2Lf" }
      ],
      duration: "Week 2"
    },
    {
      id: "week-3",
      title: "Week 3: Advance Python",
      description: "Master advanced Python concepts and soft skills.",
      topics: [
        "Inheritance, Generators, Iterators",
        "List Comprehensions, Decorators",
        "Multithreading, Multiprocessing"
      ],
      resources: [
        { type: "video", title: "Advanced Python Tutorials (17-27)", url: "https://bit.ly/3X6CCC7" }
      ],
      duration: "Week 3"
    },
    {
      id: "week-4",
      title: "Week 4: Version Control (Git, Github)",
      description: "Learn version control systems essential for collaboration.",
      topics: [
        "Git and GitHub Basics",
        "Add, commit, push",
        "Branches, reverting change, HEAD, Diff and Merge",
        "Pull requests"
      ],
      resources: [
        { type: "video", title: "Git Playlist (Codebasics)", url: "https://bit.ly/3SECQQ7" },
        { type: "video", title: "Git Playlist (Corey)", url: "https://bit.ly/3T0Yrmb" }
      ],
      duration: "Week 4"
    },
    {
      id: "week-5",
      title: "Week 5: Numpy, Pandas, Data Visualization, SQL",
      description: "Data manipulation, visualization, and databases.",
      topics: [
        "Numpy, Pandas, Matplotlib, Seaborn",
        "Relational databases basics",
        "SQL Queries (SELECT, WHERE, GROUP BY, etc.)",
        "SQL Joins (Left, Right, Inner, Full)"
      ],
      resources: [
        { type: "course", title: "Math and Statistics (Chap 4 & 5)", url: "https://codebasics.io/courses/math-and-statistics-for-data-science" },
        { type: "video", title: "SQL Tutorial", url: "https://www.youtube.com/watch?v=Rm0xH2Vpfi0" }
      ],
      duration: "Week 5"
    },
    {
      id: "week-6-8",
      title: "Week 6, 7, 8: Math & Statistics for AI",
      description: "The mathematical foundations required for Machine Learning.",
      topics: [
        "Descriptive vs inferential statistics",
        "Linear Algebra (Vectors, Matrices)",
        "Calculus basics",
        "Probability & Distributions",
        "Hypothesis testing"
      ],
      resources: [
        { type: "course", title: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability" },
        { type: "video", title: "StatQuest Channel", url: "https://www.youtube.com/@statquest" },
        { type: "video", title: "3Blue1Brown", url: "https://www.youtube.com/@3blue1brown" }
      ],
      duration: "Week 6-8"
    },
    {
      id: "week-9-11",
      title: "Week 9, 10, 11: Machine Learning",
      description: "Core machine learning concepts, models, and evaluation.",
      topics: [
        "Preprocessing (NA values, encoding, splitting)",
        "Supervised vs Unsupervised ML",
        "Linear models, Tree-based models (XGBoost)",
        "Model evaluation metrics",
        "Hyperparameter tuning"
      ],
      resources: [
        { type: "video", title: "ML Playlist (Codebasics)", url: "https://bit.ly/3io5qqX" },
        { type: "video", title: "Feature Engineering Playlist", url: "https://bit.ly/3IFa3Yf" }
      ],
      duration: "Week 9-11"
    },
    {
      id: "week-12-13",
      title: "Week 12, 13: DevOps, ML Ops, FastAPI",
      description: "Deploying and managing machine learning models.",
      topics: [
        "FastAPI for Python backend",
        "Experiment Tracking with MLFlow",
        "Docker, Kubernetes",
        "Cloud basics (AWS/Azure)"
      ],
      resources: [
        { type: "video", title: "FastAPI Tutorial", url: "https://bit.ly/497p6Ex" },
        { type: "video", title: "What is ML Ops", url: "https://bit.ly/3R4uGA0" },
        { type: "video", title: "MLFlow Tutorial", url: "https://www.youtube.com/watch?v=6ngxBkx05Fs" },
        { type: "video", title: "Docker Tutorial", url: "https://bit.ly/3uCNpeE" }
      ],
      duration: "Week 12-13"
    },
    {
      id: "week-14",
      title: "Week 14: Machine Learning Projects",
      description: "Build end-to-end ML projects.",
      topics: [
        "Data cleaning & Feature engineering",
        "Model building and tuning",
        "Flask/FastAPI backend server",
        "Deployment to AWS"
      ],
      resources: [
        { type: "video", title: "Bangalore Property Price Prediction", url: "https://bit.ly/3ivycWr" }
      ],
      duration: "Week 14"
    },
    {
      id: "week-15-18",
      title: "Week 15-18: Deep Learning",
      description: "Neural networks, architectures, and deep learning frameworks.",
      topics: [
        "Forward & back propagation",
        "Multilayer perceptron",
        "CNNs, RNNs, LSTMs, Transformers"
      ],
      resources: [
        { type: "video", title: "Deep Learning Playlist (TensorFlow)", url: "https://bit.ly/3vOZ3zV" },
        { type: "video", title: "CampusX PyTorch Playlist", url: "https://bit.ly/3K353Qg" }
      ],
      duration: "Week 15-18"
    },
    {
      id: "week-19-21",
      title: "Week 19-21: NLP or Computer Vision",
      description: "Specialize in either Natural Language Processing or Computer Vision.",
      topics: [
        "NLP: Regex, TF-IDF, Embeddings, Naive Bayes",
        "CV: OpenCV, CNNs, YOLO, Image Processing"
      ],
      resources: [
        { type: "video", title: "NLP Playlist", url: "https://bit.ly/3XnjfEZ" },
        { type: "video", title: "CV Project Example", url: "https://bit.ly/4hu5EoL" }
      ],
      duration: "Week 19-21"
    },
    {
      id: "week-22-24",
      title: "Week 22-24: Gen AI and Agentic AI",
      description: "Modern Generative AI and AI Agents.",
      topics: [
        "LLMs, Vector databases, Embeddings",
        "RAG (Retrieval Augmented Generation)",
        "Langchain, MCP, CrewAI, LangGraph",
        "LLM Fine Tuning"
      ],
      resources: [
        { type: "video", title: "Gen AI Crash Course", url: "https://bit.ly/3Fn7Zoh" },
        { type: "video", title: "Agentic AI (LangGraph)", url: "https://www.youtube.com/watch?v=CnXdddeZ4tQ" },
        { type: "video", title: "LLM Fine Tuning", url: "https://youtu.be/IIvORO248Zs" }
      ],
      duration: "Week 22-24"
    },
    {
      id: "week-25-27",
      title: "Week 25-27: Gen AI, Agentic AI Projects",
      description: "Solve real-life problems using LLMs and Agents.",
      topics: [
        "LLM, RAG, and Agent-based projects"
      ],
      resources: [
        { type: "video", title: "Gen AI Project Playlist", url: "https://bit.ly/4ilzEnX" }
      ],
      duration: "Week 25-27"
    },
    {
      id: "week-28-32",
      title: "Week 28-32: Unguided Projects & Cloud",
      description: "Work on unguided projects and learn Cloud Basics (Azure/AWS).",
      topics: [
        "RAG Chatbot using RBAC",
        "Azure Fundamentals / AWS Fundamentals",
        "Compute and deployment services",
        "MLOps and Monitoring"
      ],
      resources: [
        { type: "article", title: "RAG Chatbot Assignment", url: "https://bit.ly/47SttUq" },
        { type: "article", title: "NLP Adverse Drug Events", url: "https://bit.ly/43oup1y" }
      ],
      duration: "Week 28-32"
    },
    {
      id: "week-33-35",
      title: "Week 33-35: Agentic Frameworks & Model Context Protocol (MCP)",
      description: "Go beyond simple prompting. Build autonomous AI agents that can use tools, reason, and interact with external systems using standard protocols.",
      topics: [
        "ReAct Pattern (Reason + Act)",
        "Tool Calling & Function Calling APIs",
        "Model Context Protocol (MCP) Architecture",
        "Building MCP Servers & Clients",
        "Multi-Agent Systems (CrewAI, AutoGen, LangGraph)"
      ],
      resources: [
        { type: "article", title: "Introduction to Model Context Protocol", url: "https://modelcontextprotocol.io" },
        { type: "video", title: "Building AI Agents with LangGraph", url: "https://www.youtube.com/watch?v=agent-demo" },
        { type: "assignment", title: "Build a Custom MCP Server", url: "https://github.com/loopcraft/mcp-lab" }
      ],
      duration: "Week 33-35"
    },
    {
      id: "week-36-38",
      title: "Week 36-38: LLM Fine-Tuning & Production Evaluation",
      description: "Learn how to adapt large models to custom data and rigorously evaluate them before production deployment.",
      topics: [
        "Instruction Fine-Tuning vs Continued Pre-training",
        "PEFT (Parameter-Efficient Fine-Tuning)",
        "LoRA & QLoRA Quantization",
        "Evaluating RAG Systems (Ragas, TruLens)",
        "LLM Observability (LangSmith, Phoenix)"
      ],
      resources: [
        { type: "video", title: "Fine-Tuning LLMs (HuggingFace)", url: "https://www.youtube.com/watch?v=finetune" },
        { type: "article", title: "Evaluating LLM Applications", url: "https://docs.ragas.io" },
        { type: "assignment", title: "Fine-tune a LLaMA model using QLoRA", url: "https://github.com/loopcraft/qlora-lab" }
      ],
      duration: "Week 36-38"
    }
  ]
};

export const categories: RoadmapCategory[] = [aiEngineeringRoadmap];
