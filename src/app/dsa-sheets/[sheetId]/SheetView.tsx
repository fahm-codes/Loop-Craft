"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DSASheet, DSAProblem, DSASheetSection } from '@/data/dsaSheets';
import { ExternalLink, CheckCircle, Circle, ArrowRight, Video, FileText, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

export default function SheetView({ sheet }: { sheet: DSASheet }) {
  const [progress, setProgress] = useState<Record<string, string>>({});
  const [isMounted, setIsMounted] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(`loopcraft-dsa-progress-${sheet.id}`);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
    
    // Auto-expand first section
    if (sheet.sections.length > 0) {
      setExpandedSections({ [sheet.sections[0].id]: true });
    }
  }, [sheet.id, sheet.sections]);

  const updateProgress = (problemId: string, status: string) => {
    const newProgress = { ...progress, [problemId]: status };
    setProgress(newProgress);
    localStorage.setItem(`loopcraft-dsa-progress-${sheet.id}`, JSON.stringify(newProgress));
  };

  const solvedCount = Object.values(progress).filter(s => s === 'SOLVED').length;
  const attemptedCount = Object.values(progress).filter(s => s === 'ATTEMPTED').length;
  const reviewCount = Object.values(progress).filter(s => s === 'REVIEW').length;
  const notStartedCount = sheet.totalProblems - (solvedCount + attemptedCount + reviewCount);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const filteredSections = sheet.sections.map(section => {
    const filteredProblems = section.problems.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const pStatus = progress[p.id] || 'NOT_STARTED';
      const matchesStatus = statusFilter === 'ALL' || pStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
    return { ...section, problems: filteredProblems };
  }).filter(s => s.problems.length > 0);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-bg-main flex flex-col font-sans">
      <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 md:px-12 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-4 uppercase tracking-widest">
            <Link href="/roadmaps" className="hover:text-text-primary transition-colors">Roadmaps</Link>
            <span>/</span>
            <Link href="/dsa-sheets" className="hover:text-text-primary transition-colors">DSA Sheets</Link>
            <span>/</span>
            <span className="text-accent">{sheet.provider}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{sheet.title}</h1>
          <p className="text-text-secondary text-sm max-w-3xl leading-relaxed mb-6">
            {sheet.description}
          </p>
          <div className="flex items-center gap-4 text-xs font-mono">
            <a href={sheet.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:underline">
              <ExternalLink size={14} /> Official Source
            </a>
            <span className="text-text-muted">|</span>
            <span className="text-text-muted">{sheet.versionInfo}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-bg-sec border border-border-main p-4 rounded-md">
            <div className="text-xs font-mono text-text-muted uppercase mb-1">Total</div>
            <div className="text-2xl font-bold text-text-primary">{sheet.totalProblems}</div>
          </div>
          <div className="bg-bg-sec border border-border-main p-4 rounded-md border-b-2 border-b-success">
            <div className="text-xs font-mono text-text-muted uppercase mb-1">Solved</div>
            <div className="text-2xl font-bold text-success">{solvedCount}</div>
          </div>
          <div className="bg-bg-sec border border-border-main p-4 rounded-md border-b-2 border-b-warning">
            <div className="text-xs font-mono text-text-muted uppercase mb-1">Attempted</div>
            <div className="text-2xl font-bold text-warning">{attemptedCount}</div>
          </div>
          <div className="bg-bg-sec border border-border-main p-4 rounded-md border-b-2 border-b-accent">
            <div className="text-xs font-mono text-text-muted uppercase mb-1">Review</div>
            <div className="text-2xl font-bold text-accent">{reviewCount}</div>
          </div>
          <div className="bg-bg-sec border border-border-main p-4 rounded-md">
            <div className="text-xs font-mono text-text-muted uppercase mb-1">Not Started</div>
            <div className="text-2xl font-bold text-text-secondary">{notStartedCount}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search problems..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-bg-sec border border-border-main rounded-md py-2 pl-10 pr-4 text-sm font-mono focus:outline-none focus:border-accent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-text-muted" />
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-bg-sec border border-border-main rounded-md py-2 px-4 text-sm font-mono focus:outline-none focus:border-accent"
            >
              <option value="ALL">All Status</option>
              <option value="NOT_STARTED">Not Started</option>
              <option value="ATTEMPTED">Attempted</option>
              <option value="SOLVED">Solved</option>
              <option value="REVIEW">Review</option>
            </select>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {filteredSections.map(section => (
            <div key={section.id} className="bg-bg-sec border border-border-main rounded-md overflow-hidden">
              <button 
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 bg-bg-sec hover:bg-border-main/20 transition-colors text-left"
              >
                <div>
                  <h3 className="font-bold text-text-primary text-lg">{section.title}</h3>
                  <div className="text-xs font-mono text-text-muted mt-1">{section.problemCount} Problems</div>
                </div>
                {expandedSections[section.id] ? <ChevronUp size={20} className="text-text-muted" /> : <ChevronDown size={20} className="text-text-muted" />}
              </button>
              
              {expandedSections[section.id] && (
                <div className="border-t border-border-main">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-bg-main text-xs font-mono text-text-muted uppercase tracking-wider">
                          <th className="p-4 font-normal w-12">Status</th>
                          <th className="p-4 font-normal">Problem</th>
                          <th className="p-4 font-normal hidden sm:table-cell">Difficulty</th>
                          <th className="p-4 font-normal hidden md:table-cell">Platform</th>
                          <th className="p-4 font-normal text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-main">
                        {section.problems.map(problem => {
                          const pStatus = progress[problem.id] || 'NOT_STARTED';
                          
                          return (
                            <tr key={problem.id} className="hover:bg-bg-main/50 transition-colors group">
                              <td className="p-4 text-center align-middle">
                                <select 
                                  value={pStatus}
                                  onChange={(e) => updateProgress(problem.id, e.target.value)}
                                  className={`appearance-none cursor-pointer w-6 h-6 rounded-full border-2 focus:outline-none flex items-center justify-center \${
                                    pStatus === 'SOLVED' ? 'bg-success border-success text-bg-main' : 
                                    pStatus === 'ATTEMPTED' ? 'bg-warning border-warning text-bg-main' : 
                                    pStatus === 'REVIEW' ? 'bg-accent border-accent text-bg-main' : 
                                    'bg-transparent border-border-main hover:border-text-muted'
                                  }`}
                                  style={{ color: pStatus !== 'NOT_STARTED' ? 'transparent' : 'inherit' }}
                                >
                                  <option value="NOT_STARTED">Not Started</option>
                                  <option value="ATTEMPTED">Attempted</option>
                                  <option value="SOLVED">Solved</option>
                                  <option value="REVIEW">Review</option>
                                </select>
                                {/* Visual indicator overlay since select is tricky to style fully */}
                                <div className="pointer-events-none absolute -mt-[22px] ml-1">
                                  {pStatus === 'SOLVED' && <CheckCircle size={16} className="text-bg-main" />}
                                </div>
                              </td>
                              <td className="p-4">
                                <Link href={`/dsa-sheets/${sheet.id}/${problem.id}`} className="font-medium text-text-primary mb-1 hover:text-accent transition-colors block">
                                  {problem.title}
                                </Link>
                                {problem.companyTags && problem.companyTags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {problem.companyTags.slice(0, 3).map(tag => (
                                      <span key={tag} className="text-[10px] font-mono bg-bg-main border border-border-main px-1.5 py-0.5 rounded text-text-muted">
                                        {tag}
                                      </span>
                                    ))}
                                    {problem.companyTags.length > 3 && (
                                      <span className="text-[10px] font-mono text-text-muted">+{problem.companyTags.length - 3}</span>
                                    )}
                                  </div>
                                )}
                              </td>
                              <td className="p-4 hidden sm:table-cell">
                                <span className={`text-xs font-mono px-2 py-1 rounded \${
                                  problem.difficulty === 'Easy' ? 'text-success bg-success/10' :
                                  problem.difficulty === 'Medium' ? 'text-warning bg-warning/10' :
                                  'text-error bg-error/10'
                                }`}>
                                  {problem.difficulty}
                                </span>
                              </td>
                              <td className="p-4 hidden md:table-cell text-sm text-text-secondary font-mono">
                                {problem.platform}
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {problem.videoUrl && (
                                    <a href={problem.videoUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-text-muted hover:text-accent transition-colors" title="Video Solution">
                                      <Video size={16} />
                                    </a>
                                  )}
                                  <a href={problem.problemUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-accent text-bg-main px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                                    Solve <ExternalLink size={12} />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filteredSections.length === 0 && (
            <div className="text-center py-12 text-text-muted font-mono">
              No problems found matching your criteria.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
