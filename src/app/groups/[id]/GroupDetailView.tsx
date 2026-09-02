"use client";

import { useState, useEffect, useMemo } from 'react';
import { StudyGroup, groupService, getCurrentUserId } from '@/services/groupService';
import { getRoadmapById } from '@/data/roadmap';
import Link from 'next/link';
import { 
  Users, ChevronLeft, ArrowRight, UserMinus, User, CheckCircle, 
  AlertTriangle, Copy, Check, Clock, BookOpen, Flag, Target, Settings, X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { generateSchedule } from '@/utils/schedule';

export default function GroupDetailView({ groupId }: { groupId: string }) {
  const [group, setGroup] = useState<StudyGroup | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState('');
  const [copied, setCopied] = useState(false);
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneNodeId, setMilestoneNodeId] = useState('');
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  
  const router = useRouter();

  const loadGroup = () => {
    const g = groupService.getGroupById(groupId);
    if (!g) {
      router.push('/groups');
      return;
    }
    setGroup(g);
  };

  useEffect(() => {
    setUserId(getCurrentUserId());
    loadGroup();
    setIsLoaded(true);
  }, [groupId]);

  if (!isLoaded || !group) return <div className="min-h-screen bg-bg-main"></div>;

  const roadmap = getRoadmapById(group.roadmapId);
  if (!roadmap) return <div className="min-h-screen bg-bg-main p-12 text-error">Roadmap not found.</div>;

  const isOwner = group.members.find(m => m.id === userId)?.role === 'OWNER';
  const currentUser = group.members.find(m => m.id === userId);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(group.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeave = () => {
    if (confirm("Are you sure you want to leave this group?")) {
      groupService.leaveGroup(group.id, userId);
      router.push('/groups');
    }
  };

  const handleRemoveMember = (memberId: string) => {
    if (confirm("Remove this member from the group?")) {
      groupService.removeMember(group.id, userId, memberId);
      loadGroup();
    }
  };

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneTitle || !milestoneNodeId) return;
    groupService.addMilestone(group.id, userId, milestoneNodeId, milestoneTitle);
    setShowMilestoneForm(false);
    setMilestoneTitle('');
    setMilestoneNodeId('');
    loadGroup();
  };

  const handleCompleteMilestone = (milestoneId: string) => {
    groupService.completeMilestone(group.id, userId, milestoneId);
    loadGroup();
  };

  // Determine current user's actual progress to display (mocked as 100% accurate for "me")
  const currentUserEnrollment = localStorage.getItem(`loopcraft-enrollment-${roadmap.id}`);
  const currentUserCompletedRaw = localStorage.getItem(`loopcraft-completed-${roadmap.id}`);
  const currentUserCompletedNodes = currentUserCompletedRaw ? JSON.parse(currentUserCompletedRaw) : {};
  const mySchedule = generateSchedule(roadmap, currentUserEnrollment || '', currentUserCompletedNodes);
  
  const myCompletedCount = Object.keys(currentUserCompletedNodes).filter(k => currentUserCompletedNodes[k]).length;
  const myProgressPercent = roadmap.nodes.length > 0 ? Math.round((myCompletedCount / roadmap.nodes.length) * 100) : 0;
  
  const missedTasks = mySchedule.filter(s => s.status === 'MISSED');
  const myStatus = myProgressPercent === 100 ? 'COMPLETED' : missedTasks.length > 0 ? 'BEHIND' : 'ON TRACK';
  const myActiveNode = mySchedule.find(s => !s.isCompleted)?.node?.title || 'Completed';

  // Remove Group Average Progress since we cannot access others' real data yet
  // Once the DB is integrated, this will be calculated from real shared state
  
  return (
    <div className="min-h-[calc(100vh-64px)] bg-bg-main p-6 md:p-12 lg:p-16">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-border-main pb-8">
          <div>
            <Link href="/groups" className="text-text-muted hover:text-text-primary font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 mb-6 transition-colors">
              <ChevronLeft size={14} /> Back to Groups
            </Link>
            <h1 className="text-3xl md:text-5xl font-sans font-normal text-text-primary uppercase tracking-tight mb-2">
              {group.name}
            </h1>
            <p className="text-text-secondary font-mono text-sm flex items-center gap-3">
              <BookOpen size={14} className="text-accent" /> {roadmap.title}
            </p>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <div className="border border-border-main bg-bg-sec px-6 py-3 flex items-center gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-1">Invite Code</div>
                <div className="font-mono text-lg text-text-primary tracking-widest">{group.inviteCode}</div>
              </div>
              <button onClick={handleCopyCode} className="text-accent hover:text-text-primary transition-colors p-2">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
            {isOwner && (
              <button className="border border-border-main bg-bg-sec hover:bg-bg-panel text-text-primary px-4 py-3 font-mono text-[11px] uppercase tracking-widest transition-colors flex items-center gap-2">
                <Settings size={14} /> Manage
              </button>
            )}
            <button onClick={handleLeave} className="border border-error bg-[#ff4d4f10] hover:bg-[#ff4d4f20] text-error px-4 py-3 font-mono text-[11px] uppercase tracking-widest transition-colors flex items-center gap-2">
              <UserMinus size={14} /> Leave
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* MAIN CONTENT: MEMBERS */}
          <div className="lg:col-span-2 space-y-8">
            <section className="border border-border-main bg-bg-sec p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 border-b border-border-main pb-4">
                <div className="font-mono text-[11px] uppercase tracking-widest text-text-muted flex items-center gap-2">
                  <Users size={14} /> Group Members ({group.members.length}/5)
                </div>
                <div className="font-mono text-[11px] text-text-secondary">
                  Avg Progress: <span className="text-text-primary font-bold">Awaiting Sync</span>
                </div>
              </div>

              <div className="space-y-4">
                {group.members.map(member => {
                  const isMe = member.id === userId;
                  const progress = isMe ? myProgressPercent : 0;
                  const status = isMe ? myStatus : 'UNAVAILABLE';
                  const activeMod = isMe ? myActiveNode : 'Progress unavailable';

                  return (
                    <div key={member.id} className="border border-border-main bg-bg-main p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-bg-panel border border-border-main flex items-center justify-center text-text-muted">
                          <User size={18} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-sans text-text-primary font-bold">{member.displayName}</span>
                            {isMe && <span className="bg-accent/20 text-accent px-2 py-0.5 text-[9px] uppercase tracking-widest font-mono">You</span>}
                            {member.role === 'OWNER' && <span className="bg-border-main text-text-secondary px-2 py-0.5 text-[9px] uppercase tracking-widest font-mono">Owner</span>}
                          </div>
                          <div className={`font-mono text-[11px] mt-1 truncate max-w-[200px] ${!isMe ? 'text-text-muted/60 italic' : 'text-text-muted'}`}>
                            {activeMod}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className={`flex-1 md:w-32 ${!isMe ? 'opacity-30' : ''}`}>
                          <div className="flex justify-between font-mono text-[10px] mb-1">
                            <span className="text-text-muted">Progress</span>
                            <span className="text-text-primary">{isMe ? `${progress}%` : '--'}</span>
                          </div>
                          <div className="h-1.5 w-full bg-bg-panel overflow-hidden">
                            <div className="h-full bg-accent" style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                        
                        <div className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 border flex items-center gap-1 w-28 justify-center
                          ${status === 'ON TRACK' ? 'border-success text-success bg-success/10' : 
                            status === 'BEHIND' ? 'border-error text-error bg-error/10' : 
                            status === 'UNAVAILABLE' ? 'border-border-main text-text-muted bg-bg-panel' :
                            'border-accent text-accent bg-accent/10'}
                        `}>
                          {status === 'BEHIND' && <AlertTriangle size={12} />}
                          {status === 'ON TRACK' && <CheckCircle size={12} />}
                          {status === 'UNAVAILABLE' && <Clock size={12} />}
                          {status}
                        </div>

                        {isOwner && !isMe && (
                          <button onClick={() => handleRemoveMember(member.id)} className="text-text-muted hover:text-error transition-colors" title="Remove Member">
                            <X size={16} className="lucide-x" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {group.members.length < 5 && (
                  <div className="border border-dashed border-border-main p-4 flex items-center justify-center text-text-muted font-mono text-[11px] uppercase tracking-widest">
                    {5 - group.members.length} slot(s) available
                  </div>
                )}
              </div>
            </section>
            
            {/* GROUP MILESTONES */}
            <section className="border border-border-main bg-bg-sec p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 border-b border-border-main pb-4">
                <div className="font-mono text-[11px] uppercase tracking-widest text-text-muted flex items-center gap-2">
                  <Flag size={14} /> Group Milestones
                </div>
                {isOwner && !showMilestoneForm && (
                  <button onClick={() => setShowMilestoneForm(true)} className="text-accent hover:text-text-primary font-mono text-[11px] uppercase tracking-widest transition-colors">
                    + New Milestone
                  </button>
                )}
              </div>
              
              {showMilestoneForm && (
                <form onSubmit={handleCreateMilestone} className="mb-6 p-4 border border-border-main bg-bg-main">
                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">Milestone Goal</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Finish Machine Learning Basics" 
                        value={milestoneTitle}
                        onChange={e => setMilestoneTitle(e.target.value)}
                        className="w-full bg-bg-sec border border-border-main px-3 py-2 font-sans text-sm text-text-primary focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">Target Module</label>
                      <select 
                        value={milestoneNodeId}
                        onChange={e => setMilestoneNodeId(e.target.value)}
                        className="w-full bg-bg-sec border border-border-main px-3 py-2 font-sans text-sm text-text-primary focus:outline-none focus:border-accent"
                      >
                        <option value="">Select a Module...</option>
                        {roadmap.nodes.map(n => (
                          <option key={n.id} value={n.id}>{n.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-accent text-bg-main px-4 py-2 font-mono text-[11px] uppercase tracking-widest hover:opacity-90">Add Milestone</button>
                      <button type="button" onClick={() => setShowMilestoneForm(false)} className="text-text-muted hover:text-text-primary font-mono text-[11px] uppercase tracking-widest px-4">Cancel</button>
                    </div>
                  </div>
                </form>
              )}

              {group.milestones.length === 0 ? (
                <div className="text-center p-8 text-text-muted font-mono text-sm">
                  <Target size={24} className="mx-auto mb-3 opacity-50" />
                  No group milestones set yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {group.milestones.map(m => (
                    <div key={m.id} className={`p-4 border flex justify-between items-center ${m.isCompleted ? 'border-success/30 bg-success/5' : 'border-border-main bg-bg-main'}`}>
                      <div className="flex items-center gap-3">
                        {m.isCompleted ? <CheckCircle size={18} className="text-success" /> : <Target size={18} className="text-accent" />}
                        <div>
                          <div className={`font-sans text-[15px] ${m.isCompleted ? 'text-text-secondary line-through' : 'text-text-primary'}`}>{m.title}</div>
                          <div className="font-mono text-[10px] text-text-muted">Target: {roadmap.nodes.find(n => n.id === m.targetNodeId)?.title}</div>
                        </div>
                      </div>
                      {isOwner && !m.isCompleted && (
                        <button onClick={() => handleCompleteMilestone(m.id)} className="border border-border-main px-3 py-1 font-mono text-[10px] uppercase tracking-widest hover:bg-success hover:text-bg-main hover:border-success transition-colors">
                          Complete
                        </button>
                      )}
                      {m.isCompleted && <span className="font-mono text-[10px] uppercase tracking-widest text-success">Done</span>}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN: Group Roadmap Reference */}
          <div className="lg:col-span-1">
            <section className="border border-border-main bg-bg-sec p-6 md:p-8 h-full">
              <div className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2 border-b border-border-main pb-4">
                <BookOpen size={14} /> Roadmap Reference
              </div>
              
              <div className="space-y-4">
                {roadmap.nodes.map((node, index) => {
                  // We show the "Group" status conceptually. We can use the current user's schedule as reference.
                  const s = mySchedule.find(sch => sch.node.id === node.id);
                  const isDone = s?.isCompleted;
                  const isCurrent = s?.status === 'CURRENT';
                  
                  return (
                    <div key={node.id} className="relative flex gap-4">
                      {index < roadmap.nodes.length - 1 && (
                        <div className={`absolute left-[7px] top-6 bottom-[-16px] w-[2px] ${isDone ? 'bg-border-main' : 'bg-border-main'}`} />
                      )}
                      
                      <div className="relative z-10 pt-1">
                        {isDone ? (
                          <div className="w-4 h-4 rounded-full bg-border-main flex items-center justify-center">
                            <Check size={10} className="text-text-secondary font-bold" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-bg-main" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-bg-main border-2 border-border-main" />
                        )}
                      </div>
                      
                      <div className={`flex-1 pb-4 ${isCurrent ? 'opacity-100' : isDone ? 'opacity-50' : 'opacity-40'}`}>
                        <div className="font-mono text-[10px] uppercase tracking-widest mb-1 text-text-muted">
                          Module {index + 1}
                        </div>
                        <div className={`font-sans text-[13px] leading-tight ${isCurrent ? 'text-accent font-bold' : 'text-text-primary'}`}>
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
