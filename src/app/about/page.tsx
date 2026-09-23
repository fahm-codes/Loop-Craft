import Link from 'next/link';
import { ArrowRight, BookOpen, PenTool, RefreshCcw, CheckCircle, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-main">
      
      {/* Header section */}
      <section className="border-b border-border-main bg-bg-sec pt-24 pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-text-muted mb-6 inline-block border-b border-border-main pb-2">
            ABOUT LOOPCRAFT
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-text-primary uppercase tracking-tight leading-none mb-8">
            A professional workspace for structured self-study.
          </h1>
          <p className="text-lg md:text-xl text-text-secondary font-serif leading-relaxed max-w-2xl">
            LoopCraft exists to bridge the gap between chaotic self-teaching and structured computer science curricula. We build developer-focused roadmaps that enforce rigorous practice, regular review, and real-world mastery.
          </p>
        </div>
      </section>

      {/* Philosophy section */}
      <section className="py-20 px-6 lg:px-12 border-b border-border-main relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-display font-normal text-text-primary uppercase tracking-wide mb-12 flex items-center gap-4">
            <span className="text-accent bg-accent/10 p-2 border border-accent">01</span>
            The Learning Philosophy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-border-main">
            {[
              { title: 'LEARN', desc: 'Acquire knowledge through structured, high-quality resources.', icon: BookOpen },
              { title: 'PRACTICE', desc: 'Apply concepts immediately through coding assignments.', icon: PenTool },
              { title: 'REVIEW', desc: 'Consolidate understanding with targeted knowledge checks.', icon: CheckCircle },
              { title: 'REPEAT', desc: 'Iterate on weaknesses and tackle increasingly complex problems.', icon: RefreshCcw },
              { title: 'MASTER', desc: 'Achieve unconscious competence and build production-ready systems.', icon: Target }
            ].map((step, idx) => (
              <div key={idx} className="p-8 border-b md:border-b-0 md:border-r border-border-main last:border-0 hover:bg-bg-sec transition-colors flex flex-col items-center text-center">
                <step.icon size={24} className="text-accent mb-6" strokeWidth={1.5} />
                <h3 className="font-display text-xl uppercase text-text-primary tracking-wide mb-3">{step.title}</h3>
                <p className="font-serif text-sm text-text-secondary leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator section */}
      <section className="py-20 px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-normal text-text-primary uppercase tracking-wide mb-12 flex items-center gap-4">
            <span className="text-accent bg-accent/10 p-2 border border-accent">02</span>
            Creator Credit
          </h2>
          
          <div className="border border-border-main bg-bg-sec p-8 md:p-12 relative">
            <div className="font-mono text-xs uppercase tracking-widest text-text-muted mb-4">
              Designed & Built By
            </div>
            <h3 className="text-3xl font-display uppercase text-text-primary tracking-tight mb-6">
              Fahmid Hasan Sunny
            </h3>
            
            <div className="flex flex-wrap gap-4 mt-8 font-mono text-sm">
              <a href="https://github.com/fahm-codes" target="_blank" rel="noopener noreferrer" className="border border-border-main bg-bg-main px-4 py-2 text-text-secondary hover:text-accent hover:border-accent transition-colors">
                GitHub &rarr;
              </a>
              <a href="https://linkedin.com/in/me_fahmid" target="_blank" rel="noopener noreferrer" className="border border-border-main bg-bg-main px-4 py-2 text-text-secondary hover:text-accent hover:border-accent transition-colors">
                LinkedIn &rarr;
              </a>
              <a href="https://instagram.com/fahm.codes" target="_blank" rel="noopener noreferrer" className="border border-border-main bg-bg-main px-4 py-2 text-text-secondary hover:text-accent hover:border-accent transition-colors">
                Code Inst. &rarr;
              </a>
              <a href="mailto:fahmidsunny59@gmail.com" className="border border-border-main bg-bg-main px-4 py-2 text-text-secondary hover:text-accent hover:border-accent transition-colors">
                Email &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
