"use client";

import { useState, useEffect, useMemo } from 'react';
import { platformCategories, Roadmap, RoadmapNode } from '@/data/roadmap';
import Link from 'next/link';
import { 
  Terminal, ArrowRight, BookOpen, Clock, CheckCircle, 
  Circle, Target, Code2, ListChecks, PlayCircle, Check, AlertTriangle, Calendar
} from 'lucide-react';
import { generateSchedule, adjustScheduleToStartToday } from '@/utils/schedule';

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

  // Force re-render for schedule adjustment
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
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
  }, [refreshTrigger]);

  const handleAdjustSchedule = (targetNodeId: string) => {
    if (!activeRoadmap) return;
    const newEnrollment = adjustScheduleToStartToday(activeRoadmap.roadmap, targetNodeId);
    const dateStr = newEnrollment.toISOString();
    localStorage.setItem(`loopcraft-enrollment-${activeRoadmap.roadmap.id}`, dateStr);
    
    // Auto-navigate to learn view
    window.location.href = `/roadmap/${activeRoadmap.roadmap.id}/learn`;
  };

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

  // Use new utility to calculate schedule
  const schedule = generateSchedule(roadmap, enrollmentDate, completedNodes);

  // Group schedule status
  const missedTasks = schedule.filter(s => s.status === 'MISSED');
  const upcomingTasks = schedule.filter(s => s.status === 'UPCOMING');
  const currentTask = schedule.find(s => s.status === 'CURRENT') || (missedTasks.length > 0 ? missedTasks[0] : upcomingTasks[0]);
  
  const totalNodes = roadmap.nodes.length;
  const completedNodesCount = Object.keys(completedNodes).filter(k => completedNodes[k]).length;
  const progressPercent = totalNodes > 0 ? Math.round((completedNodesCount / totalNodes) * 100) : 0;
  const isFullyCompleted = completedNodesCount === totalNodes;

  const activeFocusNode = schedule.find(s => !s.isCompleted)?.node || roadmap.nodes[roadmap.nodes.length - 1];

  // Current Node Analysis
  const assignments = activeFocusNode.resources?.filter(r => r.type === 'assignment') || [];
  const topics = activeFocusNode.topics || [];
  const nodeAssignmentsDone = completedAssignments[activeFocusNode.id] || [];
  const nodeTopicsDone = reviewedTopics[activeFocusNode.id] || [];

  const pendingAssignments = assignments.length - nodeAssignmentsDone.length;
  const pendingTopics = topics.length - nodeTopicsDone.length;

  let primaryAction = "Continue Lesson";
  let primaryActionDesc = `Dive into ${activeFocusNode.title} and explore the materials.`;

  if (missedTasks.length > 0) {
    primaryAction = "Resume & Catch Up";
    primaryActionDesc = `You have ${missedTasks.length} missed module(s). Resume where you left off.`;
  } else if (pendingAssignments > 0) {
    primaryAction = "Complete Pending Assignment";
    primaryActionDesc = `You have ${pendingAssignments} pending assignments in the current module.`;
  } else if (pendingTopics > 0) {
    primaryAction = "Complete Module Review";
    primaryActionDesc = `You need to review ${pendingTopics} topics before completing this module.`;
  } else if (completedNodesCount === 0 && nodeAssignmentsDone.length === 0 && nodeTopicsDone.length === 0) {
    primaryAction = "Start Roadmap";
  }

  if (isFullyCompleted) {
    primaryAction = "Review Roadmap";
    primaryActionDesc = "You have completed all modules in this roadmap.";
  }

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
              Current Focus: <span className="text-accent">{isFullyCompleted ? 'Course Completed' : activeFocusNode.title}</span>
            </p>
          </div>
          
          <div className="w-full md:w-auto shrink-0 flex flex-col items-start md:items-end">
            <div className="font-mono text-3xl font-bold text-text-primary mb-1">{progressPercent}%</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-4">Overall Progress</div>
            <Link 
              href={`/roadmap/${roadmap.id}/learn`}
              className={`w-full md:w-auto border px-8 py-3 hover:opacity-90 font-mono text-[12px] font-bold uppercase tracking-widest transition-opacity flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(99,133,240,0.3)] ${
                missedTasks.length > 0 
                ? 'border-error bg-[#ff4d4f15] text-error'
                : 'border-accent bg-accent text-bg-main'
              }`}
            >
              <PlayCircle size={18} /> {isFullyCompleted ? 'Review Material' : missedTasks.length > 0 ? 'Catch Up Now' : 'Continue Learning'}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Main Dashboard Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* WHAT SHOULD I DO NEXT? */}
            {!isFullyCompleted && (
              <section className={`border p-6 md:p-8 ${missedTasks.length > 0 ? 'border-error bg-[#ff4d4f05]' : 'border-accent bg-[#6385f005]'}`}>
                <div className={`font-mono text-[11px] uppercase tracking-widest mb-6 flex items-center gap-2 ${missedTasks.length > 0 ? 'text-error' : 'text-accent'}`}>
                  {missedTasks.length > 0 ? <AlertTriangle size={14} /> : <Target size={14} />} 
                  {missedTasks.length > 0 ? 'Action Required' : 'Primary Action'}
                </div>
                <h2 className="text-2xl font-sans text-text-primary mb-2">{primaryAction}</h2>
                <p className="text-text-secondary text-sm mb-8">
                  {primaryActionDesc}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href={`/roadmap/${roadmap.id}/learn`}
                    className="inline-flex border border-border-main bg-bg-sec hover:bg-bg-panel text-text-primary px-6 py-3 font-mono text-[11px] uppercase tracking-widest transition-colors items-center gap-2"
                  >
                    Go to Action <ArrowRight size={14} />
                  </Link>
                  
                  {missedTasks.length > 0 && (
                    <button 
                      onClick={() => handleAdjustSchedule(activeFocusNode.id)}
                      className="inline-flex border border-border-main bg-bg-main text-text-muted hover:text-text-primary px-6 py-3 font-mono text-[11px] uppercase tracking-widest transition-colors items-center gap-2"
                    >
                      <Calendar size={14} /> Adjust Schedule
                    </button>
                  )}
                </div>
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
                  <div className="text-text-secondary text-sm break-all truncate">
                    {activeFocusNode.title}
                  </div>
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

            {/* SCHEDULE / TODAY / UPCOMING */}
            <section className="border border-border-main bg-bg-main p-6 md:p-8">
              <div className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-6 flex justify-between items-center border-b border-border-main pb-4">
                <div className="flex items-center gap-2"><Clock size={14} /> Schedule</div>
                {missedTasks.length > 0 && <span className="text-error font-bold">{missedTasks.length} Missed</span>}
              </div>
              
              <div className="space-y-6">
                
                {missedTasks.length > 0 && (
                  <div className="flex gap-4 items-start">
                    <div className="w-24 shrink-0 pt-1">
                      <div className="font-mono text-[10px] text-error uppercase tracking-widest">Missed</div>
                    </div>
                    <div>
                      <div className="font-sans text-[15px] text-text-primary mb-1">{missedTasks[0].node.title}</div>
                      <div className="font-mono text-[11px] text-text-muted">
                        Due: {formatDate(missedTasks[0].end)}
                      </div>
                    </div>
                  </div>
                )}
                
                {currentTask && !isFullyCompleted && currentTask.status !== 'MISSED' && (
                  <div className="flex gap-4 items-start">
                    <div className="w-24 shrink-0 pt-1">
                      <div className="font-mono text-[10px] text-accent uppercase tracking-widest">Current</div>
                    </div>
                    <div>
                      <div className="font-sans text-[15px] text-text-primary mb-1">{currentTask.node.title}</div>
                      <div className="font-mono text-[11px] text-text-muted">
                        {formatDate(currentTask.start)} - {formatDate(currentTask.end)}
                      </div>
                    </div>
                  </div>
                )}
                
                {upcomingTasks.length > 0 && !isFullyCompleted && (
                  <div className="flex gap-4 items-start opacity-60">
                    <div className="w-24 shrink-0 pt-1">
                      <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Upcoming</div>
                    </div>
                    <div>
                      <div className="font-sans text-[15px] text-text-primary mb-1">{upcomingTasks[0].node.title}</div>
                      <div className="font-mono text-[11px] text-text-muted">
                        {formatDate(upcomingTasks[0].start)} - {formatDate(upcomingTasks[0].end)}
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
                {schedule.map((s) => {
                  const isDone = s.isCompleted;
                  const isCurrent = !isDone && activeFocusNode.id === s.node.id;
                  const isMissed = s.status === 'MISSED';
                  
                  return (
                    <div key={s.node.id} className="relative flex gap-4">
                      {/* Tree visual line */}
                      {s.index < schedule.length - 1 && (
                        <div className={`absolute left-[7px] top-6 bottom-[-16px] w-[2px] ${isDone ? 'bg-success' : isMissed ? 'bg-error' : 'bg-border-main'}`} />
                      )}
                      
                      <div className="relative z-10 pt-1">
                        {isDone ? (
                          <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center">
                            <Check size={10} className="text-bg-main font-bold" />
                          </div>
                        ) : isMissed ? (
                          <div className="w-4 h-4 rounded-full bg-error border-2 border-error" />
                        ) : isCurrent ? (
                          <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center animate-pulse">
                            <div className="w-2 h-2 rounded-full bg-bg-main" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-bg-main border-2 border-border-main" />
                        )}
                      </div>
                      
                      <div className={`flex-1 pb-4 ${isCurrent || isMissed ? 'opacity-100' : isDone ? 'opacity-70' : 'opacity-40'}`}>
                        <div className="font-mono text-[10px] uppercase tracking-widest mb-1 text-text-muted">
                          Module {s.index + 1}
                        </div>
                        <div className={`font-sans text-[14px] leading-tight ${isCurrent ? 'text-accent font-bold' : isMissed ? 'text-error font-bold' : 'text-text-primary'}`}>
                          {s.node.title}
                        </div>
                        {isMissed && (
                          <div className="font-mono text-[9px] uppercase tracking-widest text-error mt-1">Overdue</div>
                        )}
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
