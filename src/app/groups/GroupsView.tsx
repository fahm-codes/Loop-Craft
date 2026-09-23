"use client";

import { useState, useEffect } from 'react';
import { StudyGroup, groupService, getCurrentUserId } from '@/services/groupService';
import { platformCategories, getAllRoadmaps } from '@/data/roadmap';
import Link from 'next/link';
import { Users, Plus, ArrowRight, UserPlus, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GroupsView() {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState('');
  
  // Create / Join State
  const [mode, setMode] = useState<'LIST' | 'CREATE' | 'JOIN'>('LIST');
  const [joinCode, setJoinCode] = useState('');
  const [createName, setCreateName] = useState('');
  const [createRoadmapId, setCreateRoadmapId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    const uid = getCurrentUserId();
    setUserId(uid);
    setGroups(groupService.getGroupsForUser(uid));
    setIsLoaded(true);
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!joinCode.trim()) return;
    
    const result = groupService.joinGroup(joinCode.trim().toUpperCase(), userId);
    if (result.success && result.group) {
      router.push(`/groups/${result.group.id}`);
    } else {
      setErrorMsg(result.error || 'Failed to join group.');
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!createName.trim() || !createRoadmapId) {
      setErrorMsg('Please provide a name and select a roadmap.');
      return;
    }
    
    const group = groupService.createGroup(createName.trim(), createRoadmapId, userId);
    router.push(`/groups/${group.id}`);
  };

  if (!isLoaded) return <div className="min-h-screen bg-bg-main"></div>;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-bg-main p-6 md:p-12 lg:p-16">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border-main pb-8 mb-12">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
              <Users size={14} /> Accountability
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-normal text-text-primary uppercase tracking-tight mb-2">
              Study Groups
            </h1>
            <p className="text-text-secondary font-mono text-sm">
              Learn together. Stay on track.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setMode('JOIN')}
              className="border border-border-main bg-bg-sec hover:bg-bg-panel text-text-primary px-6 py-3 font-mono text-[11px] uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <UserPlus size={14} /> Join Group
            </button>
            <button 
              onClick={() => setMode('CREATE')}
              className="border border-accent bg-accent-soft text-accent hover:bg-accent hover:text-bg-main px-6 py-3 font-mono text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 "
            >
              <Plus size={14} /> Create Group
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-8 p-4 border border-error bg-[#ff4d4f10] text-error font-mono text-sm flex items-center gap-3">
            <AlertTriangle size={16} /> {errorMsg}
          </div>
        )}

        {mode === 'JOIN' && (
          <div className="border border-border-main bg-bg-sec p-8 mb-12 animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display text-text-primary">Join a Study Group</h2>
              <button onClick={() => { setMode('LIST'); setErrorMsg(''); }} className="text-text-muted hover:text-text-primary font-mono text-[11px] uppercase">Cancel</button>
            </div>
            <form onSubmit={handleJoin} className="flex gap-4">
              <input 
                type="text" 
                placeholder="Enter Invite Code (e.g. LC-A8F2K)" 
                value={joinCode}
                onChange={e => setJoinCode(e.target.value)}
                className="flex-1 bg-bg-main border border-border-main px-4 py-3 font-mono text-sm text-text-primary focus:outline-none focus:border-accent uppercase placeholder:normal-case"
              />
              <button type="submit" className="bg-text-primary text-bg-main px-8 font-mono text-[11px] uppercase tracking-widest hover:opacity-90 transition-opacity">
                Join
              </button>
            </form>
          </div>
        )}

        {mode === 'CREATE' && (
          <div className="border border-border-main bg-bg-sec p-8 mb-12 animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display text-text-primary">Create a Study Group</h2>
              <button onClick={() => { setMode('LIST'); setErrorMsg(''); }} className="text-text-muted hover:text-text-primary font-mono text-[11px] uppercase">Cancel</button>
            </div>
            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="block font-mono text-[10px] text-text-muted uppercase tracking-widest mb-2">Group Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. AI Engineering - Cohort Alpha" 
                  value={createName}
                  onChange={e => setCreateName(e.target.value)}
                  className="w-full bg-bg-main border border-border-main px-4 py-3 font-serif text-sm text-text-primary focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] text-text-muted uppercase tracking-widest mb-2">Roadmap</label>
                <select 
                  value={createRoadmapId}
                  onChange={e => setCreateRoadmapId(e.target.value)}
                  className="w-full bg-bg-main border border-border-main px-4 py-3 font-serif text-sm text-text-primary focus:outline-none focus:border-accent"
                >
                  <option value="" disabled>Select a Roadmap...</option>
                  {getAllRoadmaps().map(r => (
                    <option key={r.id} value={r.id}>{r.title}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full bg-accent text-bg-main py-4 font-mono text-[12px] uppercase font-bold tracking-widest hover:opacity-90 transition-opacity">
                Create Study Group
              </button>
            </form>
          </div>
        )}

        {groups.length === 0 && mode === 'LIST' ? (
          <div className="border border-border-main bg-bg-sec p-16 text-center">
            <Users size={48} className="text-text-muted mb-6 mx-auto" />
            <h2 className="text-2xl font-display text-text-primary mb-3">You're not in a study group yet.</h2>
            <p className="text-text-secondary font-mono text-sm max-w-md mx-auto mb-8">
              Join a small group of up to 5 learners to stay accountable, practice together, and master your roadmap.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setMode('JOIN')} className="border border-border-main bg-bg-main text-text-primary px-6 py-3 font-mono text-[11px] uppercase tracking-widest hover:bg-bg-panel transition-colors">Join Group</button>
              <button onClick={() => setMode('CREATE')} className="border border-accent bg-accent-soft text-accent px-6 py-3 font-mono text-[11px] uppercase tracking-widest hover:bg-accent hover:text-bg-main transition-colors">Create Group</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map(group => {
              const roadmap = require('@/data/roadmap').getRoadmapById(group.roadmapId);
              return (
                <Link key={group.id} href={`/groups/${group.id}`} className="block border border-border-main bg-bg-sec hover:border-accent  transition-all p-6 relative group">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-3">
                    {roadmap?.title || 'Unknown Roadmap'}
                  </div>
                  <h3 className="text-xl font-display text-text-primary mb-6 pr-8">{group.name}</h3>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="font-mono text-2xl text-text-primary mb-1">
                        {group.members.length} <span className="text-text-muted text-sm">/ 5</span>
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-text-muted">Members</div>
                    </div>
                    
                    <div className="text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest">
                      Open <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
