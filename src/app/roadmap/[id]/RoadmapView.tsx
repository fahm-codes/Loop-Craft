"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Roadmap } from '@/data/roadmap';
import { enrollInRoadmap } from '@/app/actions/enrollment';

export default function RoadmapView({ category }: { category: Roadmap }) {
  const [completedNodes, setCompletedNodes] = useState<Record<string, boolean>>({});
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const [enrollmentDate, setEnrollmentDate] = useState<string | null>(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`loopcraft-progress-${category.id}`);
    if (savedProgress) {
      setCompletedNodes(JSON.parse(savedProgress));
    }
    const savedEnrollment = localStorage.getItem(`loopcraft-enrollment-${category.id}`);
    if (savedEnrollment) {
      setEnrollmentDate(savedEnrollment);
    }
  }, [category.id]);

  const toggleNode = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newCompleted = { ...completedNodes, [nodeId]: !completedNodes[nodeId] };
    setCompletedNodes(newCompleted);
    localStorage.setItem(`loopcraft-progress-${category.id}`, JSON.stringify(newCompleted));
  };

  const toggleExpand = (nodeId: string) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId);
  };

  const handleEnroll = () => {
    const today = new Date().toISOString();
    setEnrollmentDate(today);
    localStorage.setItem(`loopcraft-enrollment-${category.id}`, today);
  };

  const getDaysFromDuration = (duration: string) => {
    const match = duration.match(/Week\s+(\d+)(?:-(\d+))?/i);
    if (match) {
      const startWeek = parseInt(match[1]);
      const endWeek = match[2] ? parseInt(match[2]) : startWeek;
      const numWeeks = (endWeek - startWeek) + 1;
      return numWeeks * 7;
    }
    const num = parseInt(duration) || 1;
    if (duration.toLowerCase().includes('week')) return num * 7;
    if (duration.toLowerCase().includes('month')) return num * 30;
    if (duration.toLowerCase().includes('day')) return num;
    return 7;
  };

  const schedule: { start: Date; end: Date }[] = [];
  if (enrollmentDate) {
    let currentDate = new Date(enrollmentDate);
    category.nodes.forEach(node => {
      const days = getDaysFromDuration(node.duration);
      const startDate = new Date(currentDate);
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + Math.max(1, days - 1));
      schedule.push({ start: startDate, end: endDate });
      currentDate = new Date(endDate);
      currentDate.setDate(currentDate.getDate() + 1);
    });
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const progress = Math.round((Object.values(completedNodes).filter(Boolean).length / category.nodes.length) * 100) || 0;

  return (
    <div className="w-full">
      {/* MANUAL MASTHEAD */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-12 border-b border-border-main relative">
        <div className="flex justify-between items-baseline font-mono text-[11px] tracking-widest uppercase text-text-muted mb-12">
          <span>FIG_001 &middot; CURRICULUM V1.0 &middot; 2026</span>
          <span className="text-accent flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-success"></span> OPEN SOURCE &middot; FREE</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-sans font-normal text-text-primary leading-[0.9] tracking-tight mb-8 uppercase">
              {category.title.replace('2026', '')} <br />
              <span className="text-text-muted text-4xl md:text-6xl">FROM SCRATCH</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-primary mb-2 font-sans leading-relaxed">
              Every critical topic. Every phase. From Python basics to Gen AI and Agentic frameworks.
            </p>
            <p className="text-base text-text-muted mb-8 italic font-serif">
              Based on the analysis of hundreds of AI jobs and experience working on 25+ AI projects. Run on your own machine.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {enrollmentDate ? (
                <Link href={`/roadmap/${category.id}/learn`} className="border border-success text-success bg-[#22c55e10] px-4 py-3 text-[10px] font-mono tracking-widest uppercase text-center hover:bg-success hover:text-bg-main transition-colors block">
                  Enrolled: {formatDate(new Date(enrollmentDate))} <br/> [ Resume ]
                </Link>
              ) : (
                <form action={enrollInRoadmap.bind(null, category.id)}>
                  <button type="submit" className="w-full border border-accent text-accent hover:bg-accent hover:text-bg-main px-4 py-3 text-[11px] font-mono tracking-wider uppercase transition-colors text-center block leading-[2.5]">
                    Start Course
                  </button>
                </form>
              )}
              <button className="border border-border-main text-text-secondary hover:border-text-muted hover:text-text-primary px-4 py-3 text-[11px] font-mono tracking-wider uppercase transition-colors">
                View Paths
              </button>
              <button className="border border-border-main text-text-secondary hover:border-text-muted hover:text-text-primary px-4 py-3 text-[11px] font-mono tracking-wider uppercase transition-colors">
                Discord
              </button>
              <button className="border border-border-main text-text-secondary hover:border-text-muted hover:text-text-primary px-4 py-3 text-[11px] font-mono tracking-wider uppercase transition-colors">
                Newsletter
              </button>
            </div>

            <div className="mt-10 border border-border-main bg-bg-sec font-mono text-[12px]">
              <div className="flex justify-between items-center border-b border-border-main px-4 py-2 text-[10px] text-text-muted uppercase tracking-widest">
                <span>Install Curriculum</span>
                <span className="cursor-pointer hover:text-text-primary">Copy</span>
              </div>
              <div className="p-4 text-text-code overflow-x-auto whitespace-nowrap">
                <span className="text-text-muted mr-3">$</span>
                git clone https://github.com/loopcraft/{category.id}.git
              </div>
              <div className="px-4 py-2 border-t border-border-main flex gap-4 text-[10px] text-text-muted uppercase tracking-widest">
                <span className="flex items-center gap-1 hover:text-accent cursor-pointer"><span className="w-2 h-2 bg-text-muted block"></span> Python</span>
                <span className="flex items-center gap-1 hover:text-accent cursor-pointer"><span className="w-2 h-2 bg-text-muted block"></span> PyTorch</span>
                <span className="flex items-center gap-1 hover:text-accent cursor-pointer"><span className="w-2 h-2 bg-text-muted block"></span> LangChain</span>
              </div>
            </div>
            <p className="text-[11px] text-text-muted mt-3 font-mono">Requires Python 3.10+ and basic programming knowledge.</p>
          </div>

          <div className="lg:col-span-5 hidden lg:flex items-center justify-center border border-border-main h-full min-h-[400px] bg-bg-sec p-6">
            {/* Animated/Minimal Figure Placeholder */}
            <div className="w-full aspect-square border border-border-main relative flex items-center justify-center p-8">
              <div className="absolute inset-0 border border-border-main opacity-20" style={{ backgroundImage: 'radial-gradient(var(--color-border-main) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <svg viewBox="0 0 100 100" className="w-full h-full text-accent opacity-80" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="50" cy="50" r="40" strokeDasharray="2 4" />
                <circle cx="50" cy="50" r="30" />
                <path d="M 50 20 L 50 80 M 20 50 L 80 50" strokeDasharray="1 3" />
                <circle cx="50" cy="50" r="4" fill="currentColor" />
                <rect x="48" y="18" width="4" height="4" fill="currentColor" />
                <rect x="48" y="78" width="4" height="4" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-b border-border-main overflow-hidden py-5 bg-bg-main relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-main to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-main to-transparent z-10"></div>
        <div className="flex whitespace-nowrap animate-marquee font-mono text-[12px] tracking-widest text-text-muted uppercase items-center gap-12">
          <span>+ Python</span> <span><span className="text-accent">&diams;</span> Machine Learning</span> <span>+ Deep Learning</span> <span><span className="text-accent">&diams;</span> OpenCV</span> <span>+ NLP</span> <span><span className="text-accent">&diams;</span> Transformers</span> <span>+ Agentic AI</span> <span><span className="text-accent">&diams;</span> MLOps</span> <span>+ FastAPI</span> <span><span className="text-accent">&diams;</span> AWS</span>
          <span>+ Python</span> <span><span className="text-accent">&diams;</span> Machine Learning</span> <span>+ Deep Learning</span> <span><span className="text-accent">&diams;</span> OpenCV</span> <span>+ NLP</span> <span><span className="text-accent">&diams;</span> Transformers</span> <span>+ Agentic AI</span> <span><span className="text-accent">&diams;</span> MLOps</span> <span>+ FastAPI</span> <span><span className="text-accent">&diams;</span> AWS</span>
        </div>
      </section>

      {/* COURSE PATHS */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-b border-border-main">
        <h2 className="text-3xl font-sans font-normal text-text-primary mb-4 uppercase">Choose the work you want to do</h2>
        <p className="text-base text-text-secondary mb-12 max-w-2xl font-serif">
          AI engineering is larger than model code. Choose one of four core learning paths, then learn from the same source, labs, tests, and artifacts in the browser or on GitHub.
        </p>
        
        {/* Visual Diagram */}
        <div className="border border-border-main p-8 md:p-12 relative overflow-hidden hidden md:block mb-16">
          {/* Top Node */}
          <div className="flex justify-center mb-10 relative z-10">
            <div className="border border-border-main bg-bg-sec px-8 py-4 text-center min-w-[280px]">
              <strong className="font-sans text-lg text-text-primary block mb-2 uppercase tracking-wide">AI Engineering</strong>
              <span className="font-mono text-[10px] text-text-muted lowercase tracking-widest">learn the system, the work, and the build</span>
            </div>
          </div>

          {/* Connecting Lines */}
          <div className="absolute top-[96px] left-[50%] w-[1px] h-10 bg-accent opacity-60 -translate-x-1/2"></div>
          <div className="absolute top-[136px] left-[12.5%] right-[12.5%] h-[1px] bg-accent opacity-60"></div>
          
          {/* Bottom Nodes Container */}
          <div className="grid grid-cols-4 gap-6 relative z-10 pt-10">
            {/* Node 1 */}
            <div className="relative">
              <div className="absolute -top-10 left-1/2 w-[1px] h-10 bg-accent opacity-60 -translate-x-1/2"></div>
              <div className="border border-border-main bg-bg-main p-5 text-center h-full flex flex-col justify-start hover:border-accent hover:shadow-[inset_0_0_0_1px_var(--color-accent)] hover:bg-[#6385f005] cursor-pointer transition-all">
                <strong className="font-sans text-[13px] text-text-primary block mb-5 uppercase tracking-wide">Building and Deploying<br/>AI Applications</strong>
                <span className="font-mono text-[10px] text-text-muted lowercase leading-[1.6]">models, data, evaluation<br/>serving, release, operation</span>
              </div>
            </div>
            
            {/* Node 2 */}
            <div className="relative">
              <div className="absolute -top-10 left-1/2 w-[1px] h-10 bg-accent opacity-60 -translate-x-1/2"></div>
              <div className="border border-border-main bg-bg-main p-5 text-center h-full flex flex-col justify-start hover:border-accent hover:shadow-[inset_0_0_0_1px_var(--color-accent)] hover:bg-[#6385f005] cursor-pointer transition-all">
                <strong className="font-sans text-[13px] text-text-primary block mb-5 uppercase tracking-wide">Software Engineering<br/>Fundamentals</strong>
                <span className="font-mono text-[10px] text-text-muted lowercase leading-[1.6]">repositories, interfaces<br/>tests, security, operations</span>
              </div>
            </div>

            {/* Node 3 */}
            <div className="relative">
              <div className="absolute -top-10 left-1/2 w-[1px] h-10 bg-accent opacity-60 -translate-x-1/2"></div>
              <div className="border border-border-main bg-bg-main p-5 text-center h-full flex flex-col justify-start hover:border-accent hover:shadow-[inset_0_0_0_1px_var(--color-accent)] hover:bg-[#6385f005] cursor-pointer transition-all">
                <strong className="font-sans text-[13px] text-text-primary block mb-5 uppercase tracking-wide">Agent-Assisted<br/>Engineering</strong>
                <span className="font-mono text-[10px] text-text-muted lowercase leading-[1.6]">frame, plan, delegate<br/>verify, review, improve</span>
              </div>
            </div>

            {/* Node 4 */}
            <div className="relative">
              <div className="absolute -top-10 left-1/2 w-[1px] h-10 bg-accent opacity-60 -translate-x-1/2"></div>
              <div className="border border-border-main bg-bg-main p-5 text-center h-full flex flex-col justify-start hover:border-accent hover:shadow-[inset_0_0_0_1px_var(--color-accent)] hover:bg-[#6385f005] cursor-pointer transition-all">
                <strong className="font-sans text-[13px] text-text-primary block mb-5 uppercase tracking-wide">Product Judgment<br/>and Delivery</strong>
                <span className="font-mono text-[10px] text-text-muted lowercase leading-[1.6]">outcomes, evidence, risk<br/>scope, metrics, feedback</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Route List */}
        <div className="border-t border-border-main flex flex-col">
          {/* Route 1 */}
          <article className="grid grid-cols-1 lg:grid-cols-[240px_1fr_auto] gap-6 lg:gap-8 items-center p-5 border-b border-border-main bg-[#6385f015] shadow-[inset_4px_0_0_var(--color-accent)]">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Recommended first</span>
              <strong className="font-sans text-xl font-normal text-text-primary uppercase leading-tight">New to AI Engineering</strong>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-serif">
              Set up a working environment, run the repository, and learn the lesson workflow before choosing a specialization.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-[240px]">
              <a href="#" target="_blank" className="flex-1 border border-accent bg-accent text-bg-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest hover:bg-transparent hover:text-accent transition-colors text-center block">
                Open Lesson
              </a>
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:border-text-muted hover:text-text-primary transition-colors text-center block">
                GitHub Source
              </a>
            </div>
          </article>

          {/* Route 2 */}
          <article className="grid grid-cols-1 lg:grid-cols-[240px_1fr_auto] gap-6 lg:gap-8 items-center p-5 border-b border-border-main">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Core domain</span>
              <strong className="font-sans text-xl font-normal text-text-primary uppercase leading-tight">Building and Deploying AI Applications</strong>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-serif">
              Move from prompts, structured outputs, embeddings, and retrieval through evaluation, serving, observability, and safe release.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-[240px]">
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-accent hover:bg-accent hover:text-bg-main transition-colors text-center block">
                Start Path
              </a>
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:border-text-muted hover:text-text-primary transition-colors text-center block">
                GitHub Path
              </a>
            </div>
          </article>

          {/* Route 3 */}
          <article className="grid grid-cols-1 lg:grid-cols-[240px_1fr_auto] gap-6 lg:gap-8 items-center p-5 border-b border-border-main">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Core domain</span>
              <strong className="font-sans text-xl font-normal text-text-primary uppercase leading-tight">Software Engineering Fundamentals</strong>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-serif">
              Build the repository, environment, interface, debugging, verification, security, release, and operational foundations AI systems depend on.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-[240px]">
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-accent hover:bg-accent hover:text-bg-main transition-colors text-center block">
                Start Path
              </a>
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:border-text-muted hover:text-text-primary transition-colors text-center block">
                GitHub Path
              </a>
            </div>
          </article>

          {/* Route 4 */}
          <article className="grid grid-cols-1 lg:grid-cols-[240px_1fr_auto] gap-6 lg:gap-8 items-center p-5 border-b border-border-main">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Core domain</span>
              <strong className="font-sans text-xl font-normal text-text-primary uppercase leading-tight">Agent-Assisted Engineering</strong>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-serif">
              Frame the task, plan from repository evidence, engineer the loop and harness, isolate delegation, verify the result, and preserve feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-[240px]">
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-accent hover:bg-accent hover:text-bg-main transition-colors text-center block">
                Start Path
              </a>
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:border-text-muted hover:text-text-primary transition-colors text-center block">
                GitHub Path
              </a>
            </div>
          </article>

          {/* Route 5 */}
          <article className="grid grid-cols-1 lg:grid-cols-[240px_1fr_auto] gap-6 lg:gap-8 items-center p-5 border-b border-border-main">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Core domain</span>
              <strong className="font-sans text-xl font-normal text-text-primary uppercase leading-tight">Product Judgment and Delivery</strong>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-serif">
              Turn observed work into outcomes, assumptions, testable slices, executable specifications, measurement plans, staged releases, and owned feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-[240px]">
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-accent hover:bg-accent hover:text-bg-main transition-colors text-center block">
                Start Path
              </a>
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:border-text-muted hover:text-text-primary transition-colors text-center block">
                GitHub Path
              </a>
            </div>
          </article>

          {/* Route 6 */}
          <article className="grid grid-cols-1 lg:grid-cols-[240px_1fr_auto] gap-6 lg:gap-8 items-center p-5 border-b border-border-main">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Focused path</span>
              <strong className="font-sans text-xl font-normal text-text-primary uppercase leading-tight">Model Context Protocol (MCP)</strong>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-serif">
              Build, secure, verify, and operate stateless MCP systems from wire envelopes through release gates.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-[240px]">
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-accent hover:bg-accent hover:text-bg-main transition-colors text-center block">
                Start Path
              </a>
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:border-text-muted hover:text-text-primary transition-colors text-center block">
                GitHub Source
              </a>
            </div>
          </article>

          {/* Route 7 */}
          <article className="grid grid-cols-1 lg:grid-cols-[240px_1fr_auto] gap-6 lg:gap-8 items-center p-5 border-b border-border-main">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Focused path</span>
              <strong className="font-sans text-xl font-normal text-text-primary uppercase leading-tight">Agent Skills</strong>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-serif">
              Build, invoke, route, secure, evaluate, package, and verify portable skills in real agent hosts.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-[240px]">
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-accent hover:bg-accent hover:text-bg-main transition-colors text-center block">
                Start Path
              </a>
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:border-text-muted hover:text-text-primary transition-colors text-center block">
                GitHub Source
              </a>
            </div>
          </article>

          {/* Route 8 */}
          <article className="grid grid-cols-1 lg:grid-cols-[240px_1fr_auto] gap-6 lg:gap-8 items-center p-5 border-b border-border-main">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Practice by evidence</span>
              <strong className="font-sans text-xl font-normal text-text-primary uppercase leading-tight">Certification Preparation</strong>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-serif">
              Choose a certification route, complete practical labs, keep learner-owned artifacts, and use original assessments.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-[240px]">
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-accent hover:bg-accent hover:text-bg-main transition-colors text-center block">
                Explore Paths
              </a>
              <a href="#" target="_blank" className="flex-1 border border-border-main py-2.5 px-3 font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:border-text-muted hover:text-text-primary transition-colors text-center block">
                GitHub Tutor
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* PREFACE */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-b border-border-main">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-3 font-mono text-[11px] tracking-[0.2em] uppercase text-accent">
            Preface
          </div>
          <div className="md:col-span-9" style={{ columnCount: typeof window !== 'undefined' && window.innerWidth > 768 ? 2 : 1, columnGap: '48px' }}>
            <p className="text-base text-text-secondary leading-relaxed mb-6">
              <span className="float-left text-6xl font-sans text-text-primary leading-[0.8] mr-3 mt-1">H</span>
              ave this mindset of an expert handyman, who has strong fundamentals, wide knowledge of tools and a judgement of picking a right tool at the right time. 
            </p>
            <p className="text-base text-text-secondary leading-relaxed mb-6">
              Many people have this wrong mindset that "I will learn technical skills first and work on portfolio at last". Building online credibility takes time, so start from Day 1.
            </p>
            <p className="text-base text-text-secondary leading-relaxed mb-6">
              Spend less time consuming information, and more time digesting, implementing, and sharing.
            </p>
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS (TOC) */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-b border-border-main">
        <div className="mb-10">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent mb-2">Curriculum</div>
          <h2 className="text-3xl font-sans text-text-primary">Table of Contents</h2>
        </div>

        <div className="border-t border-border-main">
          {category.nodes.map((node, index) => {
            const isCompleted = completedNodes[node.id];
            const isExpanded = expandedNode === node.id;
            
            return (
              <div key={node.id} className="border-b border-border-main group">
                <div 
                  className="py-4 flex items-center cursor-pointer hover:bg-bg-sec transition-colors px-2"
                  onClick={() => toggleExpand(node.id)}
                >
                  <div className="font-mono text-[12px] text-accent w-12 shrink-0">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  
                  <h3 className={`font-sans text-xl tracking-tight shrink-0 ${isCompleted ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                    {node.title.replace(/Week \d+(, \d+)*:? /, '')}
                  </h3>
                  
                  <div className="flex-grow border-b border-dotted border-border-main mx-6 opacity-30 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="font-mono text-[11px] text-text-muted tracking-wider w-32 text-right shrink-0 flex flex-col items-end gap-1">
                    <span>{node.duration}</span>
                    {enrollmentDate && schedule[index] && (
                       <span className="text-accent text-[9px]">
                         {formatDate(schedule[index].start)} - {formatDate(schedule[index].end)}
                       </span>
                    )}
                  </div>
                  
                  <div 
                    className="ml-6 w-3 h-3 border shrink-0 transition-colors"
                    style={{ 
                      borderColor: isCompleted ? 'var(--color-success)' : 'var(--color-error)',
                      backgroundColor: isCompleted ? 'var(--color-success)' : 'transparent'
                    }}
                    onClick={(e) => toggleNode(node.id, e)}
                  ></div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="p-8 bg-bg-sec border-t border-border-main mx-2 mb-4 mt-2">
                    <p className="text-sm text-text-secondary mb-8 font-sans leading-relaxed max-w-3xl">
                      {node.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <h4 className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4 border-b border-border-main pb-2">
                          Core Topics
                        </h4>
                        <ul className="space-y-2">
                          {node.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-text-secondary font-sans">
                              <span className="text-text-muted mt-1 text-[8px]">&#9632;</span> {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4 border-b border-border-main pb-2">
                          Resources
                        </h4>
                        <ul className="space-y-3">
                          {node.resources.map((resource, i) => (
                            <li key={i}>
                              <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-accent hover:text-text-primary transition-colors font-sans flex items-start gap-2"
                              >
                                <span className="font-mono text-[10px] mt-1">&rarr;</span> 
                                <span className="underline decoration-border-main underline-offset-4 hover:decoration-accent">{resource.title}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* LEGEND & COLOPHON */}
      <section className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] text-text-muted uppercase tracking-widest gap-6">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-error/20 border border-error"></div>
            <span className="text-error">Planned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-success border border-success"></div>
            <span className="text-success">Complete</span>
          </div>
        </div>
        
        <div>
          LOOPCRAFT &copy; 2026 &middot; OPEN SOURCE MIT LICENSE
        </div>
      </section>
      
    </div>
  );
}
