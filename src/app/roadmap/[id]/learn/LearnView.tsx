"use client";

import { useState, useEffect, useMemo } from 'react';
import { Roadmap, RoadmapNode, Resource } from '@/data/roadmap';
import Link from 'next/link';
import { CheckCircle, PlayCircle, BookOpen, FileText, Code2, MonitorPlay, ListChecks, Target, ChevronLeft, ChevronRight, Check, Menu, X, AlertTriangle } from 'lucide-react';
import { generateSchedule } from '@/utils/schedule';

export interface AssignmentSubmission {
  url: string;
  submittedAt: string;
}

const safeSetItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }
};

export default function LearnView({ category }: { category: Roadmap }) {
  const [activeNodeId, setActiveNodeId] = useState<string>(category.nodes[0]?.id || '');
  const [enrollmentDate, setEnrollmentDate] = useState<string | null>(null);
  const [completedNodes, setCompletedNodes] = useState<Record<string, boolean>>({});
  
  const [completedAssignments, setCompletedAssignments] = useState<Record<string, string[]>>({});
  const [reviewedTopics, setReviewedTopics] = useState<Record<string, string[]>>({});
  const [submissions, setSubmissions] = useState<Record<string, Record<string, AssignmentSubmission>>>({});
  const [draftUrls, setDraftUrls] = useState<Record<string, string>>({});

  const [viewMode, setViewMode] = useState<'overview' | 'lesson'>('overview');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      let savedEnrollment = localStorage.getItem(`loopcraft-enrollment-${category.id}`);
      if (!savedEnrollment) {
        savedEnrollment = new Date().toISOString();
        safeSetItem(`loopcraft-enrollment-${category.id}`, savedEnrollment);
      }
      setEnrollmentDate(savedEnrollment);

      const savedCompleted = localStorage.getItem(`loopcraft-completed-${category.id}`);
      if (savedCompleted) setCompletedNodes(JSON.parse(savedCompleted));

      const savedAssignments = localStorage.getItem(`loopcraft-assignments-${category.id}`);
      if (savedAssignments) setCompletedAssignments(JSON.parse(savedAssignments));

      const savedTopics = localStorage.getItem(`loopcraft-topics-${category.id}`);
      if (savedTopics) setReviewedTopics(JSON.parse(savedTopics));

      const savedSubmissions = localStorage.getItem(`loopcraft-submissions-${category.id}`);
      if (savedSubmissions) setSubmissions(JSON.parse(savedSubmissions));
    } catch (e) {
      console.warn('Failed to load from localStorage', e);
    }
  }, [category.id]);

  const markComplete = (nodeId: string) => {
    const updated = { ...completedNodes, [nodeId]: true };
    setCompletedNodes(updated);
    safeSetItem(`loopcraft-completed-${category.id}`, JSON.stringify(updated));
    setViewMode('overview');
    
    const currentIndex = category.nodes.findIndex(n => n.id === nodeId);
    if (currentIndex < category.nodes.length - 1) {
      setActiveNodeId(category.nodes[currentIndex + 1].id);
      setSelectedResource(null);
    }
  };

  const toggleAssignment = (nodeId: string, title: string) => {
    const nodeAssignments = completedAssignments[nodeId] || [];
    const isCompleted = nodeAssignments.includes(title);
    const updated = isCompleted 
      ? nodeAssignments.filter(u => u !== title)
      : [...nodeAssignments, title];
    
    const newAssignments = { ...completedAssignments, [nodeId]: updated };
    setCompletedAssignments(newAssignments);
    safeSetItem(`loopcraft-assignments-${category.id}`, JSON.stringify(newAssignments));
  };

  const toggleTopic = (nodeId: string, topic: string) => {
    const nodeTopics = reviewedTopics[nodeId] || [];
    const isCompleted = nodeTopics.includes(topic);
    const updated = isCompleted 
      ? nodeTopics.filter(t => t !== topic)
      : [...nodeTopics, topic];
    
    const newTopics = { ...reviewedTopics, [nodeId]: updated };
    setReviewedTopics(newTopics);
    safeSetItem(`loopcraft-topics-${category.id}`, JSON.stringify(newTopics));
  };

  const schedule = useMemo(() => {
    return generateSchedule(category, enrollmentDate || '', completedNodes);
  }, [enrollmentDate, category, completedNodes]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const activeNode = category.nodes.find(n => n.id === activeNodeId) || category.nodes[0];
  const activeNodeIndex = category.nodes.findIndex(n => n.id === activeNodeId);

  const articles = activeNode?.resources?.filter(r => r.type === 'article') || [];
  const docs = activeNode?.resources?.filter(r => r.type === 'course' || r.type === 'other') || [];
  const videos = activeNode?.resources?.filter(r => r.type === 'video') || [];
  const assignments = activeNode?.resources?.filter(r => r.type === 'assignment') || [];

  if (!activeNode) {
      if (category.id !== 'ai-engineering') {
    return (
      <div className="w-full flex flex-col items-center justify-center h-full px-4 py-20 bg-bg-main">
        <div className="border border-border-main bg-bg-sec p-10 md:p-16 max-w-2xl w-full text-center relative overflow-hidden flex flex-col items-center">
          <div className="font-mono text-xs tracking-widest text-text-muted mb-8 uppercase border-b border-border-main pb-4 inline-block px-8">
            STATUS: UPCOMING
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-normal text-text-primary mb-6 uppercase tracking-tight">
            {category.title}
          </h1>
          <p className="text-base text-text-secondary mb-10 max-w-lg font-serif leading-relaxed">
            This roadmap is currently being prepared for the LoopCraft learning library. We are building it carefully so that every roadmap provides a complete, practical learning experience.
          </p>
          <div className="font-mono text-xs tracking-[0.2em] text-accent border border-accent bg-accent/5 px-6 py-3 uppercase">
            COMING SOON
          </div>
          
          <Link href="/roadmaps" className="mt-12 text-sm font-mono text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-2">
            &larr; BACK TO ROADMAPS
          </Link>
        </div>
      </div>
    );
  }

  return (
      <div className="w-full min-h-screen bg-bg-main flex flex-col items-center justify-center border-t border-border-main p-8 text-center">
        <h1 className="text-2xl font-display text-text-primary mb-4">Content Coming Soon</h1>
        <p className="text-text-secondary mb-8">This roadmap is currently being populated with modules.</p>
        <Link href={`/roadmap/${category.id}`} className="border border-accent text-accent px-6 py-3 font-mono text-sm tracking-widest uppercase hover:bg-accent hover:text-bg-main transition-colors">
          &larr; Back to Roadmap
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-bg-main flex flex-col md:flex-row border-t border-border-main relative">
      
      {/* MOBILE SIDEBAR TOGGLE */}
      <button 
        className="md:hidden sticky top-0 z-20 flex items-center justify-between p-4 bg-bg-sec border-b border-border-main"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span className="font-mono text-[12px] uppercase tracking-widest font-bold">Modules Menu</span>
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* SIDEBAR: Table of Contents */}
      <aside className={`w-full md:w-80 border-r border-border-main bg-bg-sec shrink-0 flex flex-col h-[calc(100vh-64px)] md:sticky top-0 md:top-16 overflow-y-auto z-10 transition-all duration-300 ${isSidebarOpen ? 'block fixed inset-0 mt-14' : 'hidden md:flex'}`}>
        <div className="p-6 border-b border-border-main">
          <Link href={`/roadmap/${category.id}`} className="text-text-muted hover:text-text-primary text-[11px] font-mono tracking-widest uppercase mb-4 block">
            &larr; Back to Roadmap
          </Link>
          <h2 className="text-xl font-display font-bold text-text-primary uppercase leading-tight">
            {category.title}
          </h2>
        </div>

          <nav className="flex-1 p-4">
          <div className="flex flex-col gap-2">
            {category.nodes.map((node, index) => {
              const isCompleted = isMounted && completedNodes[node.id];
              const schedItem = schedule.find(s => s.node.id === node.id);
              const isMissed = isMounted && schedItem?.status === 'MISSED';
              return (
                <button
                  key={node.id}
                  onClick={() => {
                    setActiveNodeId(node.id);
                    setViewMode('overview');
                    setSelectedResource(null);
                    setIsSidebarOpen(false);
                  }}
                  className={`text-left p-4 border transition-all relative ${
                    activeNodeId === node.id 
                      ? 'border-accent bg-accent-soft shadow-[inset_4px_0_0_var(--color-accent)]' 
                      : 'border-border-main bg-bg-main hover:border-text-muted hover:bg-bg-panel'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      Module {index + 1}
                    </div>
                    {isCompleted && <CheckCircle size={14} className="text-success" />}
                    {isMissed && <AlertTriangle size={14} className="text-error" />}
                  </div>
                  <strong className={`font-serif text-[13px] block mb-2 leading-snug ${isCompleted ? 'text-text-muted' : isMissed ? 'text-error' : 'text-text-primary'}`}>
                    {node.title}
                  </strong>
                  
                  {enrollmentDate && schedItem && (
                    <div className={`font-mono text-[9px] mt-2 flex items-center gap-1 ${isMissed ? 'text-error font-bold' : 'text-text-muted'}`}>
                      {formatDate(schedItem.start)} - {formatDate(schedItem.end)}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-6 md:p-12 lg:p-16 overflow-y-auto relative">
        <div className={`max-w-4xl mx-auto transition-opacity duration-300 ${!isMounted ? 'opacity-0' : 'opacity-100'}`}>
          
          {selectedResource ? (
            /* LOCAL RESOURCE READER VIEW */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <button 
                onClick={() => setSelectedResource(null)}
                className="mb-6 font-mono text-[11px] text-accent hover:text-text-primary uppercase tracking-widest flex items-center gap-2 transition-colors"
              >
                <ChevronLeft size={16} /> Back to Lesson Content
              </button>
              
              <div className="p-8 border border-border-main bg-bg-sec">
                <div className="font-mono text-[10px] uppercase text-text-muted mb-4 tracking-widest flex items-center gap-2">
                  <FileText size={14}/> Reading Material
                </div>
                <h2 className="text-2xl font-display text-text-primary mb-8">{selectedResource.title}</h2>
                
                <div className="prose prose-invert max-w-none text-text-secondary font-serif leading-relaxed space-y-6">
                  {selectedResource.content ? (
                    <div className="whitespace-pre-wrap text-[15px]">{selectedResource.content}</div>
                  ) : (
                    <>
                      <p>This is a native reading view for text materials and assignments.</p>
                      <div className="p-6 border-l-2 border-accent bg-bg-main mt-8">
                        <p className="font-serif text-sm text-text-muted mb-2 uppercase tracking-widest">System Message</p>
                        <p className="m-0">No direct text content provided for this resource.</p>
                      </div>
                    </>
                  )}
                  
                  <div className="mt-12 pt-6 border-t border-border-main">
                    <p className="text-sm">
                      <strong>Original Source:</strong> <a href={selectedResource.url} target="_blank" rel="noreferrer" className="text-accent hover:underline break-all">{selectedResource.url}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : viewMode === 'overview' ? (
            /* MODULE OVERVIEW */
            <div className="animate-in fade-in duration-300">
              <div className="font-mono text-[11px] tracking-widest uppercase text-text-muted mb-6 flex items-center gap-3">
                <span>Module {activeNodeIndex + 1}</span>
                <span className="text-border-main">|</span>
                <span>{activeNode?.duration}</span>
                {activeNode?.id && isMounted && completedNodes[activeNode.id] && (
                  <>
                    <span className="text-border-main">|</span>
                    <span className="text-success flex items-center gap-1"><Check size={14}/> Completed</span>
                  </>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-display font-normal text-text-primary mb-8 uppercase tracking-tight">
                {activeNode?.title}
              </h1>

              <div className="p-6 border border-border-main bg-bg-sec mb-8">
                <p className="text-lg text-text-secondary font-serif leading-relaxed">
                  {activeNode?.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="border border-border-main p-6 bg-bg-main">
                  <h3 className="font-display text-[11px] uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                    <Target size={16} /> Learning Objectives
                  </h3>
                  <div className="text-2xl font-serif font-bold text-text-primary">
                    {activeNode.topics.length} <span className="text-sm font-normal text-text-muted">Topics</span>
                  </div>
                </div>
                <div className="border border-border-main p-6 bg-bg-main">
                  <h3 className="font-display text-[11px] uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                    <BookOpen size={16} /> Learning Materials
                  </h3>
                  <div className="text-2xl font-serif font-bold text-text-primary">
                    {activeNode.resources.length} <span className="text-sm font-normal text-text-muted">Resources</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-12 border-t border-border-main">
                 <button 
                    onClick={() => setViewMode('lesson')}
                    className="w-full sm:w-auto border border-accent bg-accent text-bg-main px-6 py-3 md:px-12 md:py-4 hover:opacity-90 font-mono text-[13px] font-bold uppercase tracking-widest transition-opacity flex items-center justify-center gap-3 "
                 >
                   <PlayCircle size={20} /> {activeNode?.id && isMounted && completedNodes[activeNode.id] ? 'Review Lesson' : 'Start Lesson'}
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
              
              <h1 className="text-3xl md:text-4xl font-display text-text-primary mb-12">
                {activeNode.title}
              </h1>

              <div className="space-y-16">
                
                {/* 1. INTRODUCTION */}
                <section>
                  <h2 className="font-display text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                    <BookOpen size={18} className="text-accent" /> 1. Introduction & Objectives
                  </h2>
                  <p className="text-[15px] text-text-secondary font-serif leading-relaxed mb-6">
                    {activeNode.description}
                  </p>
                  <div className="bg-bg-sec border border-border-main p-6 rounded-sm">
                    <strong className="block font-mono text-[11px] uppercase tracking-widest text-text-muted mb-4">Core Topics to Master:</strong>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeNode.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-secondary text-sm font-serif">
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
                    <h2 className="font-display text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                      <FileText size={18} className="text-accent" /> 2. Required Reading
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {articles.map((res, i) => {
                        const isExternal = res.url.includes('http');
                        return (
                          <div key={i} className="flex items-start gap-4 p-5 border border-border-main bg-bg-sec hover:border-accent hover:bg-accent-soft transition-all group cursor-pointer" onClick={() => isExternal ? window.open(res.url, '_blank') : setSelectedResource(res)}>
                            <div className="flex-1">
                              <strong className="font-display text-xl block mb-2 text-text-primary group-hover:text-accent transition-colors">{res.title}</strong>
                              <span className="font-mono text-[11px] text-text-muted break-all">{isExternal ? res.url : 'Read in workspace'}</span>
                            </div>
                            <ChevronRight size={18} className="text-text-muted group-hover:text-accent" />
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* 3. DOCUMENTATION / COURSES */}
                {docs.length > 0 && (
                  <section>
                    <h2 className="font-display text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                      <BookOpen size={18} className="text-success" /> 3. Reference & Documentation
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {docs.map((res, i) => (
                        <a key={i} href={res.url} target="_blank" rel="noreferrer" className="flex items-start gap-4 p-5 border border-border-main bg-bg-sec hover:border-success hover:bg-bg-hover transition-all group">
                          <div className="flex-1">
                            <strong className="font-display text-xl block mb-2 text-text-primary group-hover:text-success transition-colors">{res.title}</strong>
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
                    <h2 className="font-display text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                      <MonitorPlay size={18} className="text-text-primary" /> 4. Video Lectures
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {videos.map((res, i) => (
                        <a key={i} href={res.url} target="_blank" rel="noreferrer" className="flex items-start gap-4 p-5 border border-border-main bg-bg-sec hover:border-accent hover:bg-bg-hover transition-all group">
                          <div className="flex-1">
                            <strong className="font-display text-xl block mb-2 text-text-primary group-hover:text-text-primary transition-colors">{res.title}</strong>
                            <span className="font-mono text-[11px] text-text-muted break-all">{res.url}</span>
                          </div>
                          <PlayCircle size={18} className="text-text-muted group-hover:text-text-primary" />
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                {/* 5. PRACTICE / ASSIGNMENT */}
                {assignments.length > 0 ? (
                  <section>
                    <h2 className="font-display text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                      <Code2 size={18} className="text-error" /> 5. Practice & Assignments
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {assignments.map((res, i) => {
                        const isCompleted = isMounted && (completedAssignments[activeNode.id] || []).includes(res.title);
                        const isExternal = res.url.includes('http');
                        const submission = (isMounted && submissions[activeNode.id]) ? submissions[activeNode.id][res.title] : null;
                        const draftUrl = draftUrls[`${activeNode.id}-${res.title}`] || '';
                        
                        return (
                          <div key={i} className={`flex flex-col sm:flex-row sm:items-start gap-4 p-6 border transition-all relative overflow-hidden ${isCompleted ? 'border-success bg-bg-hover' : 'border-error bg-bg-hover'}`}>
                            <div className={`absolute top-0 left-0 w-1 h-full ${isCompleted ? 'bg-success' : 'bg-error'}`}></div>
                            
                            <button 
                              onClick={() => toggleAssignment(activeNode.id, res.title)} 
                              className={`shrink-0 mt-1 flex items-center justify-center w-6 h-6 border rounded-sm transition-colors ${isCompleted ? 'bg-success border-success text-bg-main' : 'border-error text-transparent hover:bg-bg-hover'}`}
                              title={isCompleted ? "Mark incomplete" : "Mark complete"}
                            >
                              <Check size={14} />
                            </button>

                            <div className="flex-1 w-full">
                              <strong className={`font-display text-xl block mb-2 ${isCompleted ? 'text-success' : 'text-error'}`}>{res.title}</strong>
                              
                              {isExternal ? (
                                <a href={res.url} target="_blank" rel="noreferrer" className="font-mono text-[12px] text-text-muted break-all block mb-4 hover:text-text-primary hover:underline">{res.url}</a>
                              ) : (
                                <div className="font-mono text-[12px] text-text-muted break-all block mb-4">Internal Workspace Assignment</div>
                              )}
                              
                              <button onClick={() => isExternal ? window.open(res.url, '_blank') : setSelectedResource(res)} className="font-mono text-[10px] uppercase tracking-widest text-text-primary bg-bg-main px-3 py-1.5 border border-border-main inline-block hover:border-text-muted transition-colors">
                                {isExternal ? 'Open External Assignment' : 'Open Local Assignment'} &rarr;
                              </button>

                              <div className="mt-4 pt-4 border-t border-border-main">
                                {submission ? (
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono text-[10px] uppercase tracking-widest text-bg-main bg-success px-2 py-0.5 rounded-sm font-bold">Submitted</span>
                                      <span className="text-text-muted text-[11px] font-mono">{new Date(submission.submittedAt).toLocaleDateString()}</span>
                                    </div>
                                    <a href={submission.url} target="_blank" rel="noreferrer" className="text-[13px] text-blue hover:underline break-all mb-2 inline-block">
                                      {submission.url}
                                    </a>
                                    <button 
                                      onClick={() => {
                                        const updated = { ...submissions };
                                        if (updated[activeNode.id]) {
                                          delete updated[activeNode.id][res.title];
                                          setSubmissions(updated);
                                          safeSetItem(`loopcraft-submissions-${category.id}`, JSON.stringify(updated));
                                        }
                                        setDraftUrls(prev => ({...prev, [`${activeNode.id}-${res.title}`]: submission.url}));
                                      }}
                                      className="font-mono text-[10px] uppercase tracking-widest text-text-secondary hover:text-text-primary self-start underline underline-offset-4"
                                    >
                                      Edit URL
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex flex-col gap-2 w-full max-w-md">
                                    {isCompleted && (
                                      <div className="mb-1">
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Completed — No project link provided</span>
                                      </div>
                                    )}
                                    <label className="font-mono text-[10px] uppercase tracking-widest text-text-secondary block mb-1">
                                      {isCompleted ? 'Add Project URL (Optional)' : 'Submit Project URL (Optional)'}
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                      <input 
                                        type="url"
                                        value={draftUrl}
                                        onChange={(e) => setDraftUrls(prev => ({...prev, [`${activeNode.id}-${res.title}`]: e.target.value}))}
                                        placeholder="https://github.com/..."
                                        className="flex-1 bg-bg-main border border-border-main px-3 py-2 text-sm text-text-primary font-mono focus:outline-none focus:border-accent"
                                      />
                                      <button 
                                        onClick={() => {
                                          const url = draftUrl.trim();
                                          if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
                                            const updated = { ...submissions };
                                            if (!updated[activeNode.id]) updated[activeNode.id] = {};
                                            updated[activeNode.id][res.title] = { url, submittedAt: new Date().toISOString() };
                                            setSubmissions(updated);
                                            safeSetItem(`loopcraft-submissions-${category.id}`, JSON.stringify(updated));
                                            setDraftUrls(prev => {
                                              const next = {...prev};
                                              delete next[`${activeNode.id}-${res.title}`];
                                              return next;
                                            });
                                          } else {
                                            alert('Please enter a valid URL starting with http:// or https://');
                                          }
                                        }}
                                        className="bg-bg-sec border border-border-main hover:border-accent hover:text-accent px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors shrink-0"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ) : (
                  <section>
                    <h2 className="font-display text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                      <Code2 size={18} className="text-text-muted" /> 5. Practice & Assignments
                    </h2>
                    <div className="p-8 border border-dashed border-border-main flex flex-col items-center justify-center text-center text-text-muted bg-bg-sec">
                      <Code2 size={32} className="mb-4 opacity-50" />
                      <p className="font-mono text-[11px] uppercase tracking-widest mb-2">No active assignments</p>
                      <p className="text-sm font-serif">Practice materials for this module are coming soon.</p>
                    </div>
                  </section>
                )}

                {/* 6. REVIEW / QUIZ */}
                <section>
                  <h2 className="font-display text-[13px] uppercase tracking-widest text-text-primary mb-6 flex items-center gap-3 border-b border-border-main pb-4">
                    <ListChecks size={18} className="text-accent" /> 6. Self-Review Checklist
                  </h2>
                  <div className="p-8 border border-border-main bg-bg-sec">
                    <p className="text-text-secondary text-sm mb-6">
                      Before moving forward, honestly review your understanding of the core concepts covered in this module. Check off each topic you feel confident about.
                    </p>
                    <div className="flex flex-col gap-3">
                      {activeNode.topics.map((topic, i) => {
                        const isReviewed = isMounted && (reviewedTopics[activeNode.id] || []).includes(topic);
                        return (
                          <button 
                            key={i}
                            onClick={() => toggleTopic(activeNode.id, topic)}
                            className={`flex items-start text-left gap-4 p-4 border transition-colors ${isReviewed ? 'border-accent bg-accent-soft' : 'border-border-main bg-bg-main hover:border-text-muted'}`}
                          >
                            <div className={`shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 border rounded-sm transition-colors ${isReviewed ? 'bg-accent border-accent text-bg-main' : 'border-text-muted text-transparent'}`}>
                              <Check size={12} />
                            </div>
                            <span className={`font-display text-xl ${isReviewed ? 'text-text-primary' : 'text-text-secondary'}`}>
                              {topic}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </section>
                
                {/* 7. COMPLETION */}
                {(() => {
                  const nodeAssignments = completedAssignments[activeNode.id] || [];
                  const nodeTopics = reviewedTopics[activeNode.id] || [];
                  
                  // Fix: check that every actual resource title is included in the state
                  const allAssignmentsDone = assignments.length === 0 || assignments.every(res => nodeAssignments.includes(res.title));
                  const allTopicsDone = activeNode.topics.every(t => nodeTopics.includes(t));
                  const isReadyToComplete = isMounted && allAssignmentsDone && allTopicsDone;
                  
                  return (
                    <section className="pt-8 border-t-2 border-border-main mt-8 md:mt-16 text-center">
                      <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
                        Ready to complete this module?
                      </h2>
                      
                      <div className="flex justify-center gap-8 mb-8">
                        <div className="text-center">
                          <div className={`font-mono text-2xl font-bold ${allTopicsDone ? 'text-accent' : 'text-text-primary'}`}>
                            {nodeTopics.length} / {activeNode.topics.length}
                          </div>
                          <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mt-2">Topics Reviewed</div>
                        </div>
                        {assignments.length > 0 && (
                          <div className="text-center">
                            <div className={`font-mono text-2xl font-bold ${allAssignmentsDone ? 'text-success' : 'text-text-primary'}`}>
                              {nodeAssignments.length} / {assignments.length}
                            </div>
                            <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mt-2">Assignments Done</div>
                          </div>
                        )}
                      </div>

                      {!isReadyToComplete && (
                        <div className="mb-6">
                          <p className="text-error text-sm bg-bg-sec p-4 inline-block border border-error">
                            Please complete all assignments and review all topics to unlock completion.
                          </p>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap justify-center gap-4">
                        <button 
                          onClick={() => setViewMode('overview')}
                          className="border border-border-main text-text-secondary hover:text-text-primary hover:bg-bg-sec px-4 py-3 md:px-8 md:py-4 font-mono text-[12px] uppercase tracking-widest transition-colors"
                        >
                          Not Yet
                        </button>
                        <button 
                          disabled={!isReadyToComplete}
                          onClick={() => markComplete(activeNode.id)}
                          className={`border px-4 py-3 md:px-8 md:py-4 font-mono text-[12px] uppercase tracking-widest font-bold transition-all flex items-center gap-3 ${
                            isReadyToComplete 
                              ? 'border-success bg-bg-main text-success hover:bg-success hover:text-bg-main ' 
                              : 'border-border-main bg-bg-sec text-text-muted opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <CheckCircle size={18} /> Mark as Complete
                        </button>
                      </div>
                    </section>
                  );
                })()}

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
