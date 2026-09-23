"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DSASheet, DSAProblem, DSASheetSection } from '@/data/dsaSheets';
import { ExternalLink, Video, ChevronLeft } from 'lucide-react';

export default function ProblemView({ sheet, section, problem }: { sheet: DSASheet, section: DSASheetSection, problem: DSAProblem }) {
  const [progress, setProgress] = useState<Record<string, string>>({});
  const [isMounted, setIsMounted] = useState(false);

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
  }, [sheet.id]);

  const updateProgress = (status: string) => {
    const newProgress = { ...progress, [problem.id]: status };
    setProgress(newProgress);
    localStorage.setItem(`loopcraft-dsa-progress-${sheet.id}`, JSON.stringify(newProgress));
  };

  const currentStatus = progress[problem.id] || 'NOT_STARTED';

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-bg-main flex flex-col font-sans">
      <main className="flex-grow w-full max-w-screen-md mx-auto px-6 md:px-12 py-12">
        <Link 
          href={`/dsa-sheets/${sheet.id}`}
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-text-primary uppercase tracking-widest transition-colors mb-8"
        >
          <ChevronLeft size={16} /> Back to {sheet.title}
        </Link>
        
        <div className="bg-bg-sec border border-border-main rounded-md p-8 shadow-glow">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">{problem.title}</h1>
              <div className="text-sm font-mono text-text-secondary">{section.title}</div>
            </div>
            <span className={`text-xs font-mono px-3 py-1 rounded \${
              problem.difficulty === 'Easy' ? 'text-success bg-success/10' :
              problem.difficulty === 'Medium' ? 'text-warning bg-warning/10' :
              'text-error bg-error/10'
            }`}>
              {problem.difficulty}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8 border-y border-border-main py-6">
            <div>
              <div className="text-xs font-mono text-text-muted uppercase mb-1">Platform</div>
              <div className="text-sm font-medium text-text-primary">{problem.platform}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-text-muted uppercase mb-1">Your Status</div>
              <select 
                value={currentStatus}
                onChange={(e) => updateProgress(e.target.value)}
                className={`w-full bg-bg-main border border-border-main rounded-md py-1.5 px-3 text-sm font-mono focus:outline-none focus:border-accent \${
                  currentStatus === 'SOLVED' ? 'text-success border-success/30' : 
                  currentStatus === 'ATTEMPTED' ? 'text-warning border-warning/30' : 
                  currentStatus === 'REVIEW' ? 'text-accent border-accent/30' : 
                  'text-text-primary'
                }`}
              >
                <option value="NOT_STARTED">Not Started</option>
                <option value="ATTEMPTED">Attempted</option>
                <option value="SOLVED">Solved</option>
                <option value="REVIEW">Review</option>
              </select>
            </div>
          </div>

          {problem.companyTags && problem.companyTags.length > 0 && (
            <div className="mb-8">
              <div className="text-xs font-mono text-text-muted uppercase mb-3">Company Tags</div>
              <div className="flex flex-wrap gap-2">
                {problem.companyTags.map(tag => (
                  <span key={tag} className="text-xs font-mono bg-bg-main border border-border-main px-2 py-1 rounded text-text-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href={problem.problemUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 bg-accent text-bg-main px-6 py-3 text-sm font-bold uppercase tracking-widest rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Solve Problem <ExternalLink size={16} />
            </a>
            
            {problem.videoUrl && (
              <a 
                href={problem.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 bg-bg-main border border-border-main text-text-primary hover:border-text-muted px-6 py-3 text-sm font-bold uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2"
              >
                <Video size={16} /> Watch Solution
              </a>
            )}
          </div>
          
          <div className="mt-8 text-center text-xs font-mono text-text-muted">
            Practice this problem on the original platform. LoopCraft does not host the problem statement.
          </div>
        </div>
      </main>
    </div>
  );
}
