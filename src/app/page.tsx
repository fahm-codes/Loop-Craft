import Link from 'next/link';
import { 
  BookOpen, Code2, FileText, Repeat, Star, 
  GraduationCap, Briefcase, Code, Rocket, Shield,
  MoveRight, Bot, Layers, TerminalSquare, BarChart3, 
  Users, Award, MessageSquare, ShieldCheck,
  ChevronRight, Play
} from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full relative min-h-screen pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Hero Left */}
          <div>
            <div className="font-mono text-success text-[13px] mb-8">
              &gt; ./loopcraft --start
            </div>
            
            <h1 className="text-6xl md:text-7xl font-sans font-bold text-text-primary mb-6 tracking-tight leading-[1.1]">
              Learn Better.<br />
              Build Faster.
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary font-mono mb-6">
              Self-study platform for developers.
            </p>
            
            <div className="font-mono text-accent text-[13px] mb-12 tracking-wide">
              Learn &rarr; Practice &rarr; Review &rarr; Repeat &rarr; Master
            </div>
            
            <div className="flex flex-wrap gap-4 font-mono text-[13px] uppercase tracking-wider">
              <Link href="/roadmaps/ai-engineering" className="bg-accent text-bg-main px-8 py-4 font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                START LEARNING <ChevronRight size={16} />
              </Link>
              <button className="border border-border-main text-text-secondary px-8 py-4 hover:border-text-muted hover:text-text-primary transition-colors flex items-center gap-2">
                EXPLORE ROADMAPS <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Hero Right - Diagram */}
          <div className="relative h-[400px] hidden lg:flex items-center justify-center font-mono text-[11px] uppercase tracking-widest text-accent">
            {/* Center Star */}
            <div className="absolute flex flex-col items-center gap-2 z-10">
              <Star size={32} className="text-text-primary fill-text-primary" />
              <span className="text-text-primary">MASTER</span>
            </div>
            
            {/* Nodes */}
            <div className="absolute top-0 flex flex-col items-center gap-3">
              <span className="text-accent">LEARN</span>
              <div className="border border-accent rounded-sm p-4 bg-bg-main">
                <BookOpen size={24} className="text-accent" />
              </div>
            </div>

            <div className="absolute right-0 flex flex-col items-center gap-3">
              <span className="text-accent">PRACTICE</span>
              <div className="border border-accent rounded-sm p-4 bg-bg-main">
                <Code2 size={24} className="text-accent" />
              </div>
            </div>

            <div className="absolute bottom-0 flex flex-col items-center gap-3">
              <span className="text-accent">REVIEW</span>
              <div className="border border-accent rounded-sm p-4 bg-bg-main">
                <FileText size={24} className="text-accent" />
              </div>
            </div>

            <div className="absolute left-0 flex flex-col items-center gap-3">
              <span className="text-accent">REPEAT</span>
              <div className="border border-accent rounded-sm p-4 bg-bg-main">
                <Repeat size={24} className="text-accent" />
              </div>
            </div>

            {/* Connecting dashed lines SVG */}
            <svg className="absolute w-full h-full -z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="140" stroke="#292929" strokeWidth="1.5" strokeDasharray="6 6" />
              {/* Arrow heads can be approximated or left as dashed circle for simplicity */}
              {/* Top right arrow */}
              <path d="M 299 101 L 290 100 L 295 108" stroke="#4A4A4A" strokeWidth="1.5" fill="none"/>
              {/* Bottom right arrow */}
              <path d="M 299 299 L 308 290 L 300 285" stroke="#4A4A4A" strokeWidth="1.5" fill="none"/>
              {/* Bottom left arrow */}
              <path d="M 101 299 L 110 300 L 105 292" stroke="#4A4A4A" strokeWidth="1.5" fill="none"/>
              {/* Top left arrow */}
              <path d="M 101 101 L 92 110 L 100 115" stroke="#4A4A4A" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>

        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-8">
        
        {/* 2. AVAILABLE CATEGORIES */}
        <section className="border border-border-main p-8 bg-bg-sec rounded-sm">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-mono text-[13px] tracking-widest uppercase text-accent font-bold">
              &gt; AVAILABLE CATEGORIES
            </h2>
            <Link href="#" className="font-mono text-[11px] text-text-muted hover:text-text-primary tracking-widest flex items-center gap-1">
              VIEW ALL CATEGORIES <ChevronRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: GraduationCap, title: 'University Courses', desc: 'Structured learning paths inspired by university-level study.' },
              { icon: Briefcase, title: 'Role-Based Roadmaps', desc: 'Roadmaps designed for specific developer roles.', link: '/roadmaps/ai-engineering' },
              { icon: Code, title: 'Skill-Based Roadmaps', desc: 'Learn in-demand technical skills step by step.' },
              { icon: Rocket, title: 'Absolute Beginner', desc: 'Start your coding journey from absolute zero.' },
              { icon: Shield, title: 'Best Practices', desc: 'Essential practices every developer should know.' },
            ].map((cat, i) => (
              <Link key={i} href={cat.link || "#"} className="group block border border-border-main bg-bg-main p-6 hover:border-accent transition-colors rounded-sm flex flex-col items-center text-center relative h-full">
                <cat.icon size={32} className="text-accent mb-6" strokeWidth={1.5} />
                <h3 className="font-sans font-bold text-text-primary text-[15px] mb-4 leading-tight">{cat.title}</h3>
                <p className="font-mono text-[11px] text-text-secondary leading-relaxed mb-8 flex-grow">{cat.desc}</p>
                <div className="absolute bottom-4 right-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoveRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. WHY LOOPCRAFT */}
        <section className="border border-border-main p-8 bg-bg-sec rounded-sm">
          <h2 className="font-mono text-[13px] tracking-widest uppercase text-accent font-bold mb-12">
            &gt; WHY LOOPCRAFT?
          </h2>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-4 relative">
            {[
              { icon: BookOpen, title: 'LEARN', desc: 'Understand concepts through structured paths.' },
              { icon: Code2, title: 'PRACTICE', desc: 'Solve problems and build real projects.' },
              { icon: FileText, title: 'REVIEW', desc: 'Reinforce learning and identify gaps.' },
              { icon: Repeat, title: 'REPEAT', desc: 'Use repetition to build long-term memory.' },
              { icon: Star, title: 'MASTER', desc: 'Turn consistent practice into real skill.' },
            ].map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center relative z-10 w-full">
                <div className="border border-border-main bg-bg-main rounded-sm p-4 mb-4">
                  <step.icon size={28} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-bold text-text-primary text-[14px] mb-3 uppercase tracking-wider">{step.title}</h3>
                <p className="font-mono text-[11px] text-text-secondary leading-relaxed max-w-[160px]">{step.desc}</p>
              </div>
            ))}
            
            {/* Connecting Arrows for desktop */}
            <div className="hidden lg:flex absolute top-8 left-[10%] right-[10%] justify-between z-0 px-8">
               <MoveRight size={24} className="text-text-muted opacity-50" strokeWidth={1} />
               <MoveRight size={24} className="text-text-muted opacity-50" strokeWidth={1} />
               <MoveRight size={24} className="text-text-muted opacity-50" strokeWidth={1} />
               <MoveRight size={24} className="text-text-muted opacity-50" strokeWidth={1} />
            </div>
          </div>
        </section>

        {/* 4. ROADMAP GUIDE & AI TUTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Roadmap Guide */}
          <section className="border border-border-main p-8 bg-bg-sec rounded-sm relative overflow-hidden flex flex-col">
            <h2 className="font-mono text-[13px] tracking-widest uppercase text-accent font-bold mb-6">
              &gt; ROADMAP GUIDE
            </h2>
            <p className="font-mono text-[11px] text-text-secondary leading-relaxed mb-8 max-w-sm">
              Structured roadmaps to take you from where you are to where you want to be.
            </p>
            
            <div className="flex flex-col gap-3 relative z-10 flex-grow">
              {['University Courses', 'Role-Based Roadmaps', 'Skill-Based Roadmaps', 'Absolute Beginner', 'Best Practices'].map((item, i) => (
                <div key={i} className="border border-border-main bg-bg-main px-4 py-3 font-mono text-[12px] text-text-primary flex justify-between items-center max-w-[280px]">
                  {item}
                  <ChevronRight size={14} className="text-text-muted" />
                </div>
              ))}
            </div>

            {/* Faint Path Graphic */}
            <div className="absolute right-0 bottom-0 w-64 h-64 opacity-20 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-accent" strokeWidth="1" strokeDasharray="2 2">
                 <path d="M 80,20 C 60,40 20,40 20,60 C 20,80 80,80 80,90" />
                 <circle cx="80" cy="20" r="3" className="fill-bg-main" strokeDasharray="0"/>
                 <circle cx="20" cy="60" r="3" className="fill-bg-main" strokeDasharray="0"/>
                 <circle cx="80" cy="90" r="3" className="fill-bg-main" strokeDasharray="0"/>
              </svg>
            </div>
          </section>

          {/* AI Roadmap Tutor */}
          <section className="border border-border-main p-8 bg-bg-sec rounded-sm flex flex-col">
            <h2 className="font-mono text-[13px] tracking-widest uppercase text-accent font-bold mb-12">
              &gt; AI ROADMAP TUTOR
            </h2>
            
            <div className="flex gap-8 items-start flex-grow">
              <Bot size={64} className="text-accent shrink-0" strokeWidth={1} />
              <div className="flex flex-col items-start pt-2">
                <p className="font-mono text-[12px] text-text-secondary leading-relaxed mb-4">
                  Not sure what to learn?
                </p>
                <p className="font-mono text-[12px] text-text-secondary leading-relaxed mb-8">
                  Tell us your goal, and AI will suggest the best roadmap for you.
                </p>
                <button className="bg-accent text-bg-main px-6 py-3 font-mono text-[12px] uppercase font-bold tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2">
                  BUILD MY ROADMAP <MoveRight size={16} />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* 5. BUILT FOR DEVELOPERS */}
        <section className="border border-border-main p-8 bg-bg-sec rounded-sm">
          <h2 className="font-mono text-[13px] tracking-widest uppercase text-accent font-bold mb-10">
            &gt; BUILT FOR DEVELOPERS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Layers, title: 'Structured Learning', desc: 'Follow step-by-step paths designed for results.' },
              { icon: TerminalSquare, title: 'Hands-on Practice', desc: 'Code, solve problems, and strengthen your skills.' },
              { icon: BarChart3, title: 'Progress Tracking', desc: 'Track your progress and stay consistent.' },
              { icon: Users, title: 'Community Support', desc: 'Learn together and grow with other developers.' },
              { icon: Award, title: 'Certificates', desc: 'Earn certificates and showcase your achievements.' },
            ].map((feature, i) => (
              <div key={i} className="border border-border-main bg-bg-main p-6 flex flex-col items-center text-center rounded-sm">
                <feature.icon size={32} className="text-accent mb-6" strokeWidth={1.5} />
                <h3 className="font-sans font-bold text-text-primary text-[14px] mb-3 leading-tight">{feature.title}</h3>
                <p className="font-mono text-[11px] text-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="max-w-[1200px] mx-auto px-6 mt-20 flex flex-col items-center gap-8">
        <div className="flex flex-wrap justify-center gap-12">
          <Link href="#" className="flex items-center gap-2 font-mono text-[12px] text-text-muted hover:text-text-primary transition-colors">
            <Star size={18} /> GitHub Stars
          </Link>
          <Link href="#" className="flex items-center gap-2 font-mono text-[12px] text-text-muted hover:text-text-primary transition-colors">
            <MessageSquare size={18} /> Discord
          </Link>
          <Link href="#" className="flex items-center gap-2 font-mono text-[12px] text-text-muted hover:text-text-primary transition-colors">
            <Users size={18} /> Community
          </Link>
          <Link href="#" className="flex items-center gap-2 font-mono text-[12px] text-text-muted hover:text-text-primary transition-colors">
            <ShieldCheck size={18} /> Privacy Policy
          </Link>
        </div>
        
        <div className="font-mono text-[11px] text-text-muted mb-4 tracking-widest">
          &copy; LoopCraft. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
