"use client";

import { useState, useEffect } from 'react';
import { platformCategories, Roadmap, RoadmapNode } from '@/data/roadmap';
import Link from 'next/link';
import { 
  Terminal, ArrowRight, BookOpen, Clock, CheckCircle, 
  Circle, Target, Code2, ListChecks, PlayCircle, Check
} from 'lucide-react';

interface ActiveRoadmapState {
  roadmap: Roadmap;
  enrollmentDate: string;
  completedNodes: Record<string, boolean>;
  completedAssignments: Record<string, string[]>;
  reviewedTopics: Record<string, string[]>;
}

export default function DashboardView() {
  const [activeRoadmap, setActiveRoadmap] = useState<ActiveRoadmapState | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Scan all roadmaps to find active ones
    let latestRoadmap: ActiveRoadmapState | null = null;
    let latestEnrollmentTime = 0;

    platformCategories.forEach(category => {
      category.roadmaps.forEach(r => {
        const enrollKey = `loopcraft-enrollment-${r.id}`;
        const enrollDateStr = localStorage.getItem(enrollKey);
        
        if (enrollDateStr) {
          const enrollTime = new Date(enrollDateStr).getTime();
          
          if (enrollTime > latestEnrollmentTime) {
            latestEnrollmentTime = enrollTime;
            
            // Full roadmap object is needed. We need to cast it since Category.roadmaps is Partial<Roadmap>
            // but wait, we can just use getRoadmapById
            const fullRoadmap = require('@/data/roadmap').getRoadmapById(r.id);
            if (!fullRoadmap) return;

            const completedStr = localStorage.getItem(`loopcraft-completed-${r.id}`);
            const assignmentsStr = localStorage.getItem(`loopcraft-assignments-${r.id}`);
            const topicsStr = localStorage.getItem(`loopcraft-topics-${r.id}`);

            latestRoadmap = {
              roadmap: fullRoadmap,
              enrollmentDate: enrollDateStr,
              completedNodes: completedStr ? JSON.parse(completedStr) : {},
              completedAssignments: assignmentsStr ? JSON.parse(assignmentsStr) : {},
              reviewedTopics: topicsStr ? JSON.parse(topicsStr) : {}
            };
          }
        }
      });
    });

    setActiveRoadmap(latestRoadmap);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center">
        <div className="font-mono text-sm text-text-muted animate-pulse">Initializing Workspace...</div>
      </div>
    );
  }

  if (!activeRoadmap) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-bg-main flex flex-col items-center justify-center p-8 text-center">
        <Terminal size={48} className="text-text-muted mb-6" />
        <h1 className="text-3xl font-sans font-bold text-text-primary mb-4">No Active Workspace</h1>
        <p className="text-text-secondary font-mono text-sm mb-8 max-w-md">
          You haven't started any learning roadmaps yet. Explore our curriculum to begin your journey.
        </p>
        <Link 
          href="/roadmaps" 
          className="border border-accent bg-[#6385f010] text-accent hover:bg-accent hover:text-bg-main px-8 py-4 font-mono text-[12px] uppercase tracking-widest font-bold transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(99,133,240,0.15)]"
        >
          Explore Roadmaps <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const { roadmap, enrollmentDate, completedNodes, completedAssignments, reviewedTopics } = activeRoadmap;

  // Calculate Progress
  const totalNodes = roadmap.nodes.length;
  const completedNodesCount = Object.keys(completedNodes).filter(k => completedNodes[k]).length;
  const progressPercent = totalNodes > 0 ? Math.round((completedNodesCount / totalNodes) * 100) : 0;

  // Find Current Node
  const currentNodeIndex = roadmap.nodes.findIndex(n => !completedNodes[n.id]);
  const currentNode = currentNodeIndex !== -1 ? roadmap.nodes[currentNodeIndex] : roadmap.nodes[roadmap.nodes.length - 1];
  const isFullyCompleted = completedNodesCount === totalNodes;

  // Current Node Analysis
  const assignments = currentNode.resources?.filter(r => r.type === 'assignment') || [];
  const topics = currentNode.topics || [];
  
  const nodeAssignmentsDone = completedAssignments[currentNode.id] || [];
  const nodeTopicsDone = reviewedTopics[currentNode.id] || [];

  const pendingAssignments = assignments.length - nodeAssignmentsDone.length;
  const pendingTopics = topics.length - nodeTopicsDone.length;

  let primaryAction = "Continue Lesson";
  if (pendingAssignments > 0) primaryAction = "Complete Pending Assignment";
  else if (pendingTopics > 0) primaryAction = "Complete Module Review";
  else if (currentNodeIndex === 0 && nodeAssignmentsDone.length === 0 && nodeTopicsDone.length === 0) primaryAction = "Start Module";

  if (isFullyCompleted) {
    primaryAction = "Review Roadmap";
  }

  // Schedule Logic (reused from LearnView)
  const getDaysFromDuration = (duration: string) => {
    const match = duration.match(/Week\s+(\d+)(?:-(\d+))?/i);
    if (match) {
      const startWeek = parseInt(match[1]);
      const endWeek = match[2] ? parseInt(match[2]) : startWeek;
      return ((endWeek - startWeek) + 1) * 7;
    }
    const num = parseInt(duration) || 1;
    if (duration.toLowerCase().includes('week')) return num * 7;
    if (duration.toLowerCase().includes('month')) return num * 30;
    if (duration.toLowerCase().includes('day')) return num;
    return 7;
  };

  const schedule: { start: Date; end: Date }[] = [];
  let currentDate = new Date(enrollmentDate);
  roadmap.nodes.forEach(node => {
    const days = getDaysFromDuration(node.duration);
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + Math.max(1, days - 1));
    schedule.push({ start: startDate, end: endDate });
    currentDate = new Date(endDate);
    currentDate.setDate(currentDate.getDate() + 1);
  });

  const currentNodeSchedule = currentNodeIndex !== -1 ? schedule[currentNodeIndex] : null;
  const nextNodeSchedule = currentNodeIndex !== -1 && currentNodeIndex + 1 < schedule.length ? schedule[currentNodeIndex + 1] : null;

  const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-bg-main p-6 md:p-12 lg:p-16">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HEADER / CURRENT LEARNING */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border-main pb-8">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
              <Terminal size={14} /> Active Workspace
            </div>
            <h1 className="text-3xl md:text-5xl font-sans font-normal text-text-primary uppercase tracking-tight mb-2">
              {roadmap.title}
            </h1>
            <p className="text-text-secondary font-mono text-sm">
              Current Focus: <span className="text-accent">{isFullyCompleted ? 'Course Completed' : currentNode.title}</span>
            </p>
          </div>
          
          <div className="w-full md:w-auto shrink-0 flex flex-col items-start md:items-end">
            <div className="font-mono text-3xl font-bold text-text-primary mb-1">{progressPercent}%</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-4">Overall Progress</div>
            <Link 
              href={`/roadmap/${roadmap.id}/learn`}
              className="w-full md:w-auto border border-accent bg-accent text-bg-main px-8 py-3 hover:opacity-90 font-mono text-[12px] font-bold uppercase tracking-widest transition-opacity flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(99,133,240,0.3)]"
            >
              <PlayCircle size={18} /> {isFullyCompleted ? 'Review Material' : 'Continue Learning'}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Main Dashboard Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* WHAT SHOULD I DO NEXT? */}
            {!isFullyCompleted && (
              <section className="border border-accent bg-[#6385f005] p-6 md:p-8">
                <div className="font-mono text-[11px] uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                  <Target size={14} /> Primary Action
                </div>
                <h2 className="text-2xl font-sans text-text-primary mb-2">{primaryAction}</h2>
                <p className="text-text-secondary text-sm mb-8">
                  {primaryAction === "Complete Pending Assignment" 
                    ? `You have ${pendingAssignments} pending assignments in the current module.` 
                    : primaryAction === "Complete Module Review" 
                    ? `You need to review ${pendingTopics} topics before completing this module.`
                    : `Dive into ${currentNode.title} and explore the materials.`}
                </p>
                <Link 
                  href={`/roadmap/${roadmap.id}/learn`}
                  className="inline-flex border border-border-main bg-bg-sec hover:bg-bg-panel text-text-primary px-6 py-3 font-mono text-[11px] uppercase tracking-widest transition-colors items-center gap-2"
                >
                  Go to Action <ArrowRight size={14} />
                </Link>
              </section>
            )}

            {/* INCOMPLETE WORK / MODULE DETAILS */}
            {!isFullyCompleted && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border-main bg-bg-sec p-6">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                    <Code2 size={14} className={pendingAssignments > 0 ? "text-error" : "text-success"} /> Practice Status
                  </div>
                  <div className="text-2xl font-sans font-bold text-text-primary mb-1">
                    {nodeAssignmentsDone.length} / {assignments.length}
                  </div>
                  <div className="text-text-secondary text-sm">Assignments Done</div>
                </div>

                <div className="border border-border-main bg-bg-sec p-6">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                    <ListChecks size={14} className={pendingTopics > 0 ? "text-accent" : "text-success"} /> Review Status
                  </div>
                  <div className="text-2xl font-sans font-bold text-text-primary mb-1">
                    {nodeTopicsDone.length} / {topics.length}
                  </div>
                  <div className="text-text-secondary text-sm">Topics Reviewed</div>
                </div>
              </section>
            )}

            {/* TODAY / UPCOMING */}
            <section className="border border-border-main bg-bg-main p-6 md:p-8">
              <div className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2 border-b border-border-main pb-4">
                <Clock size={14} /> Schedule
              </div>
              
              <div className="space-y-6">
                {currentNodeSchedule && !isFullyCompleted && (
                  <div className="flex gap-4 items-start">
                    <div className="w-24 shrink-0 pt-1">
                      <div className="font-mono text-[10px] text-accent uppercase tracking-widest">Current</div>
                    </div>
                    <div>
                      <div className="font-sans text-[15px] text-text-primary mb-1">{currentNode.title}</div>
                      <div className="font-mono text-[11px] text-text-muted">
                        {formatDate(currentNodeSchedule.start)} - {formatDate(currentNodeSchedule.end)}
                      </div>
                    </div>
                  </div>
                )}
                
                {nextNodeSchedule && !isFullyCompleted && (
                  <div className="flex gap-4 items-start opacity-60">
                    <div className="w-24 shrink-0 pt-1">
                      <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Upcoming</div>
                    </div>
                    <div>
                      <div className="font-sans text-[15px] text-text-primary mb-1">{roadmap.nodes[currentNodeIndex + 1].title}</div>
                      <div className="font-mono text-[11px] text-text-muted">
                        {formatDate(nextNodeSchedule.start)} - {formatDate(nextNodeSchedule.end)}
                      </div>
                    </div>
                  </div>
                )}
                
                {isFullyCompleted && (
                  <div className="text-success font-mono text-sm uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle size={16} /> All Scheduled Modules Completed
                  </div>
                )}
              </div>
            </section>

          </div>
          
          {/* RIGHT COLUMN: Roadmap Progress Tree */}
          <div className="lg:col-span-1">
            <section className="border border-border-main bg-bg-sec p-6 md:p-8 h-full">
              <div className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2 border-b border-border-main pb-4">
                <BookOpen size={14} /> Roadmap Structure
              </div>
              
              <div className="space-y-4">
                {roadmap.nodes.map((node, index) => {
                  const isDone = completedNodes[node.id];
                  const isCurrent = node.id === currentNode.id && !isFullyCompleted;
                  
                  return (
                    <div key={node.id} className="relative flex gap-4">
                      {/* Tree visual line */}
                      {index < roadmap.nodes.length - 1 && (
                        <div className={`absolute left-[7px] top-6 bottom-[-16px] w-[2px] ${isDone ? 'bg-success' : 'bg-border-main'}`} />
                      )}
                      
                      <div className="relative z-10 pt-1">
                        {isDone ? (
                          <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center">
                            <Check size={10} className="text-bg-main font-bold" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center animate-pulse">
                            <div className="w-2 h-2 rounded-full bg-bg-main" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-bg-main border-2 border-border-main" />
                        )}
                      </div>
                      
                      <div className={`flex-1 pb-4 ${isCurrent ? 'opacity-100' : isDone ? 'opacity-70' : 'opacity-40'}`}>
                        <div className="font-mono text-[10px] uppercase tracking-widest mb-1 text-text-muted">
                          Module {index + 1}
                        </div>
                        <div className={`font-sans text-[14px] leading-tight ${isCurrent ? 'text-accent font-bold' : 'text-text-primary'}`}>
                          {node.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
          
        </div>
      </div>
    </div>
  );
}
