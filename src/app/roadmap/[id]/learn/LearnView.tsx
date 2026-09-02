"use client";

import { useState, useEffect } from 'react';
import { Roadmap, RoadmapNode, Resource } from '@/data/roadmap';
import Link from 'next/link';
import { CheckCircle, PlayCircle, BookOpen, FileText, Code2, MonitorPlay, ListChecks, Target, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function LearnView({ category }: { category: Roadmap }) {
  const [activeNodeId, setActiveNodeId] = useState<string>(category.nodes[0]?.id || '');
  const [enrollmentDate, setEnrollmentDate] = useState<string | null>(null);
  const [completedNodes, setCompletedNodes] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'overview' | 'lesson'>('overview');

  useEffect(() => {
    // If they reach this page, make sure they have an enrollment date set. 
    let savedEnrollment = localStorage.getItem(`loopcraft-enrollment-${category.id}`);
    if (!savedEnrollment) {
      savedEnrollment = new Date().toISOString();
      localStorage.setItem(`loopcraft-enrollment-${category.id}`, savedEnrollment);
    }
    setEnrollmentDate(savedEnrollment);

    // Load completed modules
    const savedCompleted = localStorage.getItem(`loopcraft-completed-${category.id}`);
    if (savedCompleted) {
      setCompletedNodes(JSON.parse(savedCompleted));
    }
  }, [category.id]);

  const markComplete = (nodeId: string) => {
    const updated = { ...completedNodes, [nodeId]: true };
    setCompletedNodes(updated);
    localStorage.setItem(`loopcraft-completed-${category.id}`, JSON.stringify(updated));
    setViewMode('overview');
    
    // Auto-advance to next module if available
    const currentIndex = category.nodes.findIndex(n => n.id === nodeId);
    if (currentIndex < category.nodes.length - 1) {
      setActiveNodeId(category.nodes[currentIndex + 1].id);
    }
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
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const activeNode = category.nodes.find(n => n.id === activeNodeId) || category.nodes[0];
  const activeNodeIndex = category.nodes.findIndex(n => n.id === activeNodeId);

  // Group resources for the Lesson View
  const articles = activeNode?.resources?.filter(r => r.type === 'article') || [];
  const docs = activeNode?.resources?.filter(r => r.type === 'course' || r.type === 'other') || [];
  const videos = activeNode?.resources?.filter(r => r.type === 'video') || [];
  const assignments = activeNode?.resources?.filter(r => r.type === 'assignment') || [];

  if (!activeNode) {
    return (
      <div className="w-full min-h-screen bg-bg-main flex flex-col items-center justify-center border-t border-border-main p-8 text-center">
        <h1 className="text-2xl font-sans text-text-primary mb-4">Content Coming Soon</h1>
        <p className="text-text-secondary mb-8">This roadmap is currently being populated with modules.</p>
        <Link href={`/roadmap/${category.id}`} className="border border-accent text-accent px-6 py-3 font-mono text-sm tracking-widest uppercase hover:bg-accent hover:text-bg-main transition-colors">
          &larr; Back to Roadmap
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-bg-main flex flex-col md:flex-row border-t border-border-main">
      
      {/* SIDEBAR: Table of Contents */}
      <aside className="w-full md:w-80 border-r border-border-main bg-bg-sec shrink-0 flex flex-col h-[calc(100vh-64px)] md:sticky md:top-16 overflow-y-auto z-10">
        <div className="p-6 border-b border-border-main">
          <Link href={`/roadmap/${category.id}`} className="text-text-muted hover:text-text-primary text-[11px] font-mono tracking-widest uppercase mb-4 block">
            &larr; Back to Roadmap
          </Link>
          <h2 className="text-xl font-sans font-bold text-text-primary uppercase leading-tight">
            {category.title}
          </h2>
        </div>

        <nav className="flex-1 p-4">
          <div className="flex flex-col gap-2">
            {category.nodes.map((node, index) => {
              const isCompleted = completedNodes[node.id];
              return (
                <button
                  key={node.id}
                  onClick={() => {
                    setActiveNodeId(node.id);
                    setViewMode('overview');
                  }}
                  className={`text-left p-4 border transition-all relative ${
                    activeNodeId === node.id 
                      ? 'border-accent bg-[#6385f015] shadow-[inset_4px_0_0_var(--color-accent)]' 
                      : 'border-border-main bg-bg-main hover:border-text-muted hover:bg-bg-panel'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      Module {index + 1}
                    </div>
                    {isCompleted && <CheckCircle size={14} className="text-success" />}
                  </div>
                  <strong className={`font-sans text-[13px] block mb-2 leading-snug ${isCompleted ? 'text-text-muted' : 'text-text-primary'}`}>
                    {node.title}
                  </strong>
                  
                  {enrollmentDate && schedule[index] && (
                    <div className="font-mono text-[9px] mt-2 flex items-center gap-1 text-text-muted">
                      {formatDate(schedule[index].start)} - {formatDate(schedule[index].end)}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-12 lg:p-16 overflow-y-auto relative">
        <div className="max-w-4xl mx-auto">
          
          {viewMode === 'overview' ? (
            /* MODULE OVERVIEW */
            <div className="animate-in fade-in duration-300">
              <div className="font-mono text-[11px] tracking-widest uppercase text-text-muted mb-6 flex items-center gap-3">
                <span>Module {activeNodeIndex + 1}</span>
                <span className="text-border-main">|</span>
                <span>{activeNode?.duration}</span>
                {activeNode?.id && completedNodes[activeNode.id] && (
                  <>
                    <span className="text-border-main">|</span>
                    <span className="text-success flex items-center gap-1"><Check size={14}/> Completed</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-sans font-normal text-text-primary mb-8 uppercase tracking-tight">
                {activeNode?.title}
              </h1>

              <div className="p-6 border border-border-main bg-bg-sec mb-8">
                <p className="text-lg text-text-secondary font-serif leading-relaxed">
                  {activeNode?.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="border border-border-main p-6 bg-bg-main">
                  <h3 className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                    <Target size={16} /> Learning Objectives
                  </h3>
                  <div className="text-2xl font-sans font-bold text-text-primary">
                    {activeNode.topics.length} <span className="text-sm font-normal text-text-muted">Topics</span>
                  </div>
                </div>
                <div className="border border-border-main p-6 bg-bg-main">
                  <h3 className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                    <BookOpen size={16} /> Learning Materials
                  </h3>
                  <div className="text-2xl font-sans font-bold text-text-primary">
                    {activeNode.resources.length} <span className="text-sm font-normal text-text-muted">Resources</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-12 border-t border-border-main">
                 <button 
                    onClick={() => setViewMode('lesson')}
                    className="w-full sm:w-auto border border-accent bg-accent text-bg-main px-12 py-4 hover:opacity-90 font-mono text-[13px] font-bold uppercase tracking-widest transition-opacity flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(99,133,240,0.3)]"
                 >
                   <PlayCircle size={20} /> {activeNode?.id && completedNodes[activeNode.id] ? 'Review Lesson' : 'Start Lesson'}
                 </button>
              </div>
            </div>
          ) : (
            /* LESSON VIEW FLOW */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <button 
                onClick={() => setViewMode('overview')}
                className="mb-8 font-mono text-[11px] text-accent hover:text-text-primary uppercase tracking-widest flex items-center gap-2 transition-colors"
              >
                <ChevronLeft size={16} /> Back to Module Overview
              </button>
              
              <div className="font-mono text-[10px] uppercase text-text-muted mb-4 tracking-widest flex justify-between items-center">
                <span>Lesson Experience</span>
                <span>{activeNodeIndex + 1} / {category.nodes.length}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-sans text-text-primary mb-12">
                {activeNode.title}
              </h1>

              <div className="space-y-16">
                
                {/* 1. INTRODUCTION */}
                <section>
                  <h2 className="font-mono text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                    <BookOpen size={18} className="text-accent" /> 1. Introduction & Objectives
                  </h2>
                  <p className="text-[15px] text-text-secondary font-serif leading-relaxed mb-6">
                    {activeNode.description}
                  </p>
                  <div className="bg-bg-sec border border-border-main p-6 rounded-sm">
                    <strong className="block font-mono text-[11px] uppercase tracking-widest text-text-muted mb-4">Core Topics to Master:</strong>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeNode.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-secondary text-sm font-sans">
                          <span className="text-accent mt-1">&#9632;</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* 2. READING / ARTICLES */}
                {articles.length > 0 && (
                  <section>
                    <h2 className="font-mono text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                      <FileText size={18} className="text-accent" /> 2. Required Reading
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {articles.map((res, i) => (
                        <a key={i} href={res.url} target="_blank" rel="noreferrer" className="flex items-start gap-4 p-5 border border-border-main bg-bg-sec hover:border-accent hover:bg-[#6385f005] transition-all group">
                          <div className="flex-1">
                            <strong className="font-sans text-[15px] block mb-2 text-text-primary group-hover:text-accent transition-colors">{res.title}</strong>
                            <span className="font-mono text-[11px] text-text-muted break-all">{res.url}</span>
                          </div>
                          <ChevronRight size={18} className="text-text-muted group-hover:text-accent" />
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                {/* 3. DOCUMENTATION / COURSES */}
                {docs.length > 0 && (
                  <section>
                    <h2 className="font-mono text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                      <BookOpen size={18} className="text-success" /> 3. Reference & Documentation
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {docs.map((res, i) => (
                        <a key={i} href={res.url} target="_blank" rel="noreferrer" className="flex items-start gap-4 p-5 border border-border-main bg-bg-sec hover:border-success hover:bg-[#22c55e05] transition-all group">
                          <div className="flex-1">
                            <strong className="font-sans text-[15px] block mb-2 text-text-primary group-hover:text-success transition-colors">{res.title}</strong>
                            <span className="font-mono text-[11px] text-text-muted break-all">{res.url}</span>
                          </div>
                          <ChevronRight size={18} className="text-text-muted group-hover:text-success" />
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                {/* 4. YOUTUBE / VIDEO */}
                {videos.length > 0 && (
                  <section>
                    <h2 className="font-mono text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                      <MonitorPlay size={18} className="text-[#ff0000]" /> 4. Video Lectures
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {videos.map((res, i) => (
                        <a key={i} href={res.url} target="_blank" rel="noreferrer" className="flex items-start gap-4 p-5 border border-border-main bg-bg-sec hover:border-[#ff0000] hover:bg-[#ff000005] transition-all group">
                          <div className="flex-1">
                            <strong className="font-sans text-[15px] block mb-2 text-text-primary group-hover:text-[#ff0000] transition-colors">{res.title}</strong>
                            <span className="font-mono text-[11px] text-text-muted break-all">{res.url}</span>
                          </div>
                          <PlayCircle size={18} className="text-text-muted group-hover:text-[#ff0000]" />
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                {/* 5. PRACTICE / ASSIGNMENT */}
                {assignments.length > 0 ? (
                  <section>
                    <h2 className="font-mono text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                      <Code2 size={18} className="text-error" /> 5. Practice & Assignments
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {assignments.map((res, i) => (
                        <a key={i} href={res.url} target="_blank" rel="noreferrer" className="flex items-start gap-4 p-6 border border-error bg-[#ff4d4f05] hover:bg-[#ff4d4f10] transition-all group relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
                          <div className="flex-1">
                            <strong className="font-sans text-[16px] block mb-2 text-error">{res.title}</strong>
                            <span className="font-mono text-[12px] text-text-muted break-all block mb-4">{res.url}</span>
                            <div className="font-mono text-[10px] uppercase tracking-widest text-text-primary bg-bg-main px-3 py-1.5 border border-border-main inline-block">
                              Open Assignment Workspace &rarr;
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                ) : (
                  <section>
                    <h2 className="font-mono text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                      <Code2 size={18} className="text-text-muted" /> 5. Practice & Assignments
                    </h2>
                    <div className="p-8 border border-dashed border-border-main flex flex-col items-center justify-center text-center text-text-muted bg-[#ffffff02]">
                      <Code2 size={32} className="mb-4 opacity-50" />
                      <p className="font-mono text-[11px] uppercase tracking-widest mb-2">No active assignments</p>
                      <p className="text-sm font-sans">Practice materials for this module are coming soon.</p>
                    </div>
                  </section>
                )}

                {/* 6. REVIEW / QUIZ */}
                <section>
                  <h2 className="font-mono text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                    <ListChecks size={18} className="text-accent" /> 6. Knowledge Check
                  </h2>
                  <div className="p-8 border border-border-main bg-bg-main flex flex-col items-center text-center">
                    <ListChecks size={48} className="text-accent mb-6" />
                    <h3 className="text-xl font-sans font-bold text-text-primary mb-3">Module Quiz</h3>
                    <p className="text-text-secondary text-sm max-w-md mb-8 leading-relaxed">
                      Test your understanding of the core concepts covered in this module before moving forward.
                    </p>
                    <button disabled className="border border-border-main bg-bg-sec text-text-muted px-8 py-3 font-mono text-[11px] uppercase tracking-widest cursor-not-allowed">
                      Quiz Coming Soon
                    </button>
                  </div>
                </section>
                
                {/* 7. COMPLETION */}
                <section className="pt-8 border-t-2 border-border-main mt-16 text-center">
                  <h2 className="text-2xl font-sans font-bold text-text-primary mb-4">
                    Ready to complete this module?
                  </h2>
                  <p className="text-text-secondary text-sm mb-10">
                    Make sure you've reviewed all materials and completed the assignments.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <button 
                      onClick={() => setViewMode('overview')}
                      className="border border-border-main text-text-secondary hover:text-text-primary hover:bg-bg-sec px-8 py-4 font-mono text-[12px] uppercase tracking-widest transition-colors"
                    >
                      Not Yet
                    </button>
                    <button 
                      onClick={() => markComplete(activeNode.id)}
                      className="border border-success bg-[#22c55e10] text-success hover:bg-success hover:text-bg-main px-8 py-4 font-mono text-[12px] uppercase tracking-widest font-bold transition-all flex items-center gap-3"
                    >
                      <CheckCircle size={18} /> Mark as Complete
                    </button>
                  </div>
                </section>

              </div>
              
              {/* LESSON NAVIGATION FOOTER */}
              <div className="mt-20 pt-8 border-t border-border-main flex justify-between items-center">
                <button 
                  disabled={activeNodeIndex === 0}
                  onClick={() => {
                    setActiveNodeId(category.nodes[activeNodeIndex - 1]?.id);
                    setViewMode('overview');
                  }}
                  className="text-text-muted hover:text-text-primary disabled:opacity-30 font-mono text-[11px] uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  <ChevronLeft size={16} /> Prev Lesson
                </button>

                <button 
                  disabled={activeNodeIndex === category.nodes.length - 1}
                  onClick={() => {
                    setActiveNodeId(category.nodes[activeNodeIndex + 1]?.id);
                    setViewMode('overview');
                  }}
                  className="text-text-muted hover:text-text-primary disabled:opacity-30 font-mono text-[11px] uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  Next Lesson <ChevronRight size={16} />
                </button>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}
