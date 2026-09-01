"use client";

import { useState, useEffect } from 'react';
import { RoadmapCategory } from '@/data/roadmap';
import Link from 'next/link';

export default function LearnView({ category }: { category: RoadmapCategory }) {
  const [activeNodeId, setActiveNodeId] = useState<string>(category.nodes[0]?.id || '');
  const [enrollmentDate, setEnrollmentDate] = useState<string | null>(null);

  useEffect(() => {
    // If they reach this page, make sure they have an enrollment date set. 
    // If not, auto-enroll them now.
    let savedEnrollment = localStorage.getItem(`loopcraft-enrollment-${category.id}`);
    if (!savedEnrollment) {
      savedEnrollment = new Date().toISOString();
      localStorage.setItem(`loopcraft-enrollment-${category.id}`, savedEnrollment);
    }
    setEnrollmentDate(savedEnrollment);
  }, [category.id]);

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

  const [selectedResource, setSelectedResource] = useState<any>(null);

  // Reset selected resource when changing modules
  useEffect(() => {
    setSelectedResource(null);
  }, [activeNodeId]);

  return (
    <div className="w-full min-h-screen bg-bg-main flex flex-col md:flex-row border-t border-border-main">
      
      {/* SIDEBAR: Table of Contents */}
      <aside className="w-full md:w-80 border-r border-border-main bg-bg-sec shrink-0 flex flex-col h-[calc(100vh-64px)] md:sticky md:top-16 overflow-y-auto">
        <div className="p-6 border-b border-border-main">
          <Link href={`/roadmaps/${category.id}`} className="text-text-muted hover:text-text-primary text-[11px] font-mono tracking-widest uppercase mb-4 block">
            &larr; Back to Overview
          </Link>
          <h2 className="text-xl font-sans font-bold text-text-primary uppercase leading-tight">
            {category.title}
          </h2>
        </div>

        <nav className="flex-1 p-4">
          <div className="flex flex-col gap-2">
            {category.nodes.map((node, index) => (
              <button
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`text-left p-4 border transition-all ${
                  activeNodeId === node.id 
                    ? 'border-accent bg-[#6385f015] shadow-[inset_4px_0_0_var(--color-accent)]' 
                    : 'border-border-main bg-bg-main hover:border-text-muted hover:bg-bg-panel'
                }`}
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">
                  Module {index + 1}
                </div>
                <strong className="font-sans text-[13px] text-text-primary block mb-2 leading-snug">
                  {node.title}
                </strong>
                
                {enrollmentDate && schedule[index] && (
                  <div className="font-mono text-[9px] text-accent mt-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full inline-block"></span>
                    {formatDate(schedule[index].start)} - {formatDate(schedule[index].end)}
                  </div>
                )}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-12 lg:p-16 overflow-y-auto relative">
        <div className="max-w-4xl mx-auto">
          
          <div className="font-mono text-[11px] tracking-widest uppercase text-text-muted mb-6 flex items-center gap-3">
            <span>Module {activeNodeIndex + 1}</span>
            <span className="text-border-main">|</span>
            <span>{activeNode?.duration}</span>
            <span className="text-border-main">|</span>
            {enrollmentDate && schedule[activeNodeIndex] && (
              <span className="text-success">
                {formatDate(schedule[activeNodeIndex].start)} - {formatDate(schedule[activeNodeIndex].end)}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-sans font-normal text-text-primary mb-8 uppercase tracking-tight">
            {activeNode?.title}
          </h1>

          {selectedResource ? (
            /* LOCAL RESOURCE READER VIEW */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <button 
                onClick={() => setSelectedResource(null)}
                className="mb-6 font-mono text-[11px] text-accent hover:text-text-primary uppercase tracking-widest flex items-center gap-2 transition-colors"
              >
                &larr; Back to Module Overview
              </button>
              
              <div className="p-8 border border-border-main bg-bg-sec">
                <div className="font-mono text-[10px] uppercase text-text-muted mb-4 tracking-widest">
                  Reading Material &middot; {selectedResource.type}
                </div>
                <h2 className="text-2xl font-sans text-text-primary mb-8">{selectedResource.title}</h2>
                
                <div className="prose prose-invert max-w-none text-text-secondary font-serif leading-relaxed space-y-6">
                  {selectedResource.content ? (
                    <div className="whitespace-pre-wrap text-[15px]">{selectedResource.content}</div>
                  ) : (
                    <>
                      <p>
                        This is a native reading view for text materials and assignments.
                      </p>
                      <p>
                        <strong>Original Source:</strong> <a href={selectedResource.url} target="_blank" rel="noreferrer" className="text-accent underline">{selectedResource.url}</a>
                      </p>
                      <div className="p-6 border-l-2 border-accent bg-bg-main mt-8">
                        <p className="font-sans text-sm text-text-muted mb-2 uppercase tracking-widest">System Message</p>
                        <p className="m-0">No direct text content provided for this resource. Please read it from the original source.</p>
                      </div>
                    </>
                  )}
                  
                  {selectedResource.content && (
                    <div className="mt-12 pt-6 border-t border-border-main">
                      <p className="text-sm">
                        <strong>Original Source:</strong> <a href={selectedResource.url} target="_blank" rel="noreferrer" className="text-accent underline">{selectedResource.url}</a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* DEFAULT MODULE OVERVIEW */
            <div className="animate-in fade-in duration-300">
              <div className="p-6 border border-border-main bg-bg-sec mb-12">
                <p className="text-lg text-text-secondary font-serif leading-relaxed">
                  {activeNode?.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Core Topics */}
                <section>
                  <h3 className="font-mono text-[13px] uppercase tracking-widest text-text-primary mb-6 border-b border-border-main pb-2">
                    Core Topics to Master
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {activeNode?.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-3 text-text-secondary text-sm font-sans">
                        <span className="text-accent mt-1">&#9632;</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Resources and Assignments */}
                <section>
                  <h3 className="font-mono text-[13px] uppercase tracking-widest text-text-primary mb-6 border-b border-border-main pb-2">
                    Learning Materials & Assignments
                  </h3>
                  
                  <div className="flex flex-col gap-4">
                    {activeNode?.resources.map((resource, i) => {
                      const isExternal = resource.type === 'video' || resource.type === 'course' || resource.url.includes('github');
                      
                      const CardContent = (
                        <>
                          <div className="shrink-0 mt-0.5">
                            {resource.type === 'video' && <span className="text-accent font-mono text-xs">[VIDEO]</span>}
                            {resource.type === 'article' && <span className="text-text-muted font-mono text-xs">[READ]</span>}
                            {resource.type === 'course' && <span className="text-success font-mono text-xs">[COURSE]</span>}
                            {resource.type === 'assignment' && <span className="text-error font-mono text-xs font-bold">[TASK]</span>}
                          </div>
                          <div className="flex-1 text-left">
                            <strong className={`font-sans text-[14px] block mb-1 ${resource.type === 'assignment' ? 'text-error' : 'text-text-primary'}`}>
                              {resource.title}
                            </strong>
                            <span className="font-mono text-[10px] text-text-muted break-all">
                              {isExternal ? resource.url.replace('https://', '') : 'Read in workspace'}
                            </span>
                          </div>
                        </>
                      );

                      const className = `flex items-start gap-4 p-4 border transition-colors ${
                        resource.type === 'assignment' 
                          ? 'border-error bg-[#ff4d4f05] hover:bg-[#ff4d4f10] hover:border-error' 
                          : 'border-border-main bg-bg-main hover:border-text-muted hover:bg-bg-panel'
                      }`;

                      return isExternal ? (
                        <a key={i} href={resource.url} target="_blank" rel="noreferrer" className={className}>
                          {CardContent}
                        </a>
                      ) : (
                        <button key={i} onClick={() => setSelectedResource(resource)} className={className}>
                          {CardContent}
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-border-main flex justify-between items-center">
             <button 
                disabled={activeNodeIndex === 0}
                onClick={() => setActiveNodeId(category.nodes[activeNodeIndex - 1]?.id)}
                className="border border-border-main text-text-secondary px-6 py-3 hover:bg-bg-sec hover:text-text-primary disabled:opacity-50 font-mono text-[10px] uppercase tracking-widest transition-colors"
             >
               &larr; Prev Module
             </button>

             <button 
                className="border border-success bg-[#22c55e10] text-success px-6 py-3 hover:bg-success hover:text-bg-main font-mono text-[10px] uppercase tracking-widest transition-colors"
             >
               Mark Complete
             </button>

             <button 
                disabled={activeNodeIndex === category.nodes.length - 1}
                onClick={() => setActiveNodeId(category.nodes[activeNodeIndex + 1]?.id)}
                className="border border-accent text-accent px-6 py-3 hover:bg-accent hover:text-bg-main disabled:opacity-50 font-mono text-[10px] uppercase tracking-widest transition-colors"
             >
               Next Module &rarr;
             </button>
          </div>
        </div>
      </main>
    </div>
  );
}
