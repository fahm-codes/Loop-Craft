import Link from 'next/link';
import { 
  BookOpen, Code2, FileText, Repeat, Star, 
  GraduationCap, Briefcase, Code, Rocket, Shield,
  MoveRight, Bot, Layers, TerminalSquare, BarChart3, 
  Users, Award, MessageSquare, ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full relative min-h-screen pb-12 bg-bg-main">
      
      {/* 1. HERO SECTION */}
      <section className="w-full px-6 md:px-12 lg:px-16 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Hero Left */}
          <div>
            <div className="font-mono text-success text-sm lg:text-base mb-8">
              &gt; ./loopcraft --start
            </div>
            
            <h1 className="text-6xl md:text-[5rem] lg:text-[5.5rem] font-sans font-bold text-text-primary mb-6 tracking-tight leading-[1.05]">
              Learn Better.<br />
              Build Faster.
            </h1>
            
            <p className="text-xl lg:text-2xl text-text-secondary font-mono mb-8">
              Self-study platform for developers.
            </p>
            
            <div className="font-mono text-accent text-sm lg:text-base mb-12 tracking-wide">
              Learn &rarr; Practice &rarr; Review &rarr; Repeat &rarr; Master
            </div>
            
            <div className="flex flex-wrap gap-4 font-mono text-sm lg:text-base uppercase tracking-wider">
              <Link href="/roadmap/ai-engineering" className="bg-accent text-bg-main px-8 py-4 font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                START LEARNING <ChevronRight size={18} />
              </Link>
              <Link href="/roadmaps" className="border border-border-main text-text-secondary px-8 py-4 hover:border-text-muted hover:text-text-primary transition-colors flex items-center gap-2">
                EXPLORE ROADMAPS <ChevronRight size={18} />
              </Link>
            </div>
          </div>

          {/* Hero Right - Diagram */}
          <div className="relative h-[450px] hidden lg:flex items-center justify-center font-mono text-sm uppercase tracking-widest text-accent">
            
            {/* Center Star (Static, Pulses) */}
            <div className="absolute flex flex-col items-center gap-2 z-20 animate-pulse-glow cursor-pointer">
              <Star size={40} className="text-text-primary fill-text-primary" />
              <span className="text-text-primary font-bold">MASTER</span>
            </div>
            
            <div className="absolute w-full h-full flex items-center justify-center z-10">
              
              {/* Nodes */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 cursor-pointer z-20 animate-float" style={{animationDelay: '0s'}}>
                <div className="border border-accent rounded-md px-8 py-5 bg-bg-main shadow-[0_0_20px_rgba(99,133,240,0.08)] flex flex-col items-center gap-4 hover:border-text-primary transition-colors">
                  <span className="text-accent font-sans font-bold tracking-wider">LEARN</span>
                  <BookOpen size={28} className="text-text-primary" strokeWidth={1.5} />
                </div>
              </div>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-20 animate-float" style={{animationDelay: '1s'}}>
                <div className="border border-accent rounded-md px-8 py-5 bg-bg-main shadow-[0_0_20px_rgba(99,133,240,0.08)] flex flex-col items-center gap-4 hover:border-text-primary transition-colors">
                  <span className="text-accent font-sans font-bold tracking-wider">PRACTICE</span>
                  <Code2 size={28} className="text-text-primary" strokeWidth={1.5} />
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer z-20 animate-float" style={{animationDelay: '2s'}}>
                <div className="border border-accent rounded-md px-8 py-5 bg-bg-main shadow-[0_0_20px_rgba(99,133,240,0.08)] flex flex-col items-center gap-4 hover:border-text-primary transition-colors">
                  <span className="text-accent font-sans font-bold tracking-wider">REVIEW</span>
                  <FileText size={28} className="text-text-primary" strokeWidth={1.5} />
                </div>
              </div>

              <div className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-20 animate-float" style={{animationDelay: '3s'}}>
                <div className="border border-accent rounded-md px-8 py-5 bg-bg-main shadow-[0_0_20px_rgba(99,133,240,0.08)] flex flex-col items-center gap-4 hover:border-text-primary transition-colors">
                  <span className="text-accent font-sans font-bold tracking-wider">REPEAT</span>
                  <Repeat size={28} className="text-text-primary" strokeWidth={1.5} />
                </div>
              </div>

              {/* Connecting dashed lines SVG */}
              <svg className="absolute w-full h-full -z-10" viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 2 L 7 5 L 0 8" fill="none" stroke="#6385F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </marker>
                </defs>
                
                {/* 4 Arc Segments with flowing dashed stroke */}
                <g stroke="#6385F0" strokeWidth="1.5" strokeDasharray="6 6" className="animate-flow" markerEnd="url(#arrowhead)">
                  {/* TR */}
                  <path d="M 276 84 A 150 150 0 0 1 366 174" />
                  {/* BR */}
                  <path d="M 366 276 A 150 150 0 0 1 276 366" />
                  {/* BL */}
                  <path d="M 174 366 A 150 150 0 0 1 84 276" />
                  {/* TL */}
                  <path d="M 84 174 A 150 150 0 0 1 174 84" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-6 md:px-12 lg:px-16 flex flex-col gap-10">
        
        {/* 2. AVAILABLE CATEGORIES */}
        <section className="border border-border-main p-8 lg:p-12 bg-bg-sec rounded-md">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-mono text-sm lg:text-base tracking-widest uppercase text-accent font-bold">
              &gt; AVAILABLE CATEGORIES
            </h2>
            <Link href="/roadmaps" className="font-mono text-xs lg:text-sm text-text-muted hover:text-text-primary tracking-widest flex items-center gap-1">
              VIEW ALL CATEGORIES <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              { icon: GraduationCap, title: 'University Courses', desc: 'Structured learning paths inspired by university-level study.', link: '#' },
              { icon: Briefcase, title: 'Role-Based Roadmaps', desc: 'Roadmaps designed for specific developer roles.', link: '/roadmaps/role-based' },
              { icon: Code, title: 'Skill-Based Roadmaps', desc: 'Learn in-demand technical skills step by step.', link: '/roadmaps/skill-based' },
              { icon: Rocket, title: 'Absolute Beginner', desc: 'Start your coding journey from absolute zero.', link: '/roadmaps/absolute-beginner' },
              { icon: Shield, title: 'Best Practices', desc: 'Essential practices every developer should know.', link: '/roadmaps/best-practices' },
            ].map((cat, i) => (
              <Link key={i} href={cat.link || "#"} className="group block border border-border-main bg-bg-main p-8 hover:border-accent transition-colors rounded-md flex flex-col items-center text-center relative h-full">
                <cat.icon size={36} className="text-accent mb-6" strokeWidth={1.5} />
                <h3 className="font-sans font-bold text-text-primary text-lg mb-4 leading-tight">{cat.title}</h3>
                <p className="font-mono text-sm text-text-secondary leading-relaxed mb-8 flex-grow">{cat.desc}</p>
                <div className="absolute bottom-6 right-6 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoveRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. WHY LOOPCRAFT */}
        <section className="border border-border-main p-8 lg:p-12 bg-bg-sec rounded-md">
          <h2 className="font-mono text-sm lg:text-base tracking-widest uppercase text-accent font-bold mb-14">
            &gt; WHY LOOPCRAFT?
          </h2>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-4 relative">
            {[
              { icon: BookOpen, title: 'LEARN', desc: 'Understand concepts through structured paths.' },
              { icon: Code2, title: 'PRACTICE', desc: 'Solve problems and build real projects.' },
              { icon: FileText, title: 'REVIEW', desc: 'Reinforce learning and identify gaps.' },
              { icon: Repeat, title: 'REPEAT', desc: 'Use repetition to build long-term memory.' },
              { icon: Star, title: 'MASTER', desc: 'Turn consistent practice into real skill.' },
            ].map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center relative z-10 w-full">
                <div className="border border-border-main bg-bg-main rounded-md p-6 mb-6">
                  <step.icon size={32} className="text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-bold text-text-primary text-base mb-3 uppercase tracking-wider">{step.title}</h3>
                <p className="font-mono text-sm text-text-secondary leading-relaxed max-w-[200px]">{step.desc}</p>
              </div>
            ))}
            
            {/* Connecting Arrows for desktop */}
            <div className="hidden lg:flex absolute top-12 left-[12%] right-[12%] justify-between z-0 px-10">
               <MoveRight size={32} className="text-text-muted opacity-50" strokeWidth={1} />
               <MoveRight size={32} className="text-text-muted opacity-50" strokeWidth={1} />
               <MoveRight size={32} className="text-text-muted opacity-50" strokeWidth={1} />
               <MoveRight size={32} className="text-text-muted opacity-50" strokeWidth={1} />
            </div>
          </div>
        </section>

        {/* 4. ROADMAP GUIDE & AI TUTOR */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          
          {/* Roadmap Guide */}
          <section className="border border-border-main p-8 lg:p-12 bg-bg-sec rounded-md relative overflow-hidden flex flex-col">
            <h2 className="font-mono text-sm lg:text-base tracking-widest uppercase text-accent font-bold mb-6">
              &gt; ROADMAP GUIDE
            </h2>
            <p className="font-mono text-sm text-text-secondary leading-relaxed mb-10 max-w-md">
              Structured roadmaps to take you from where you are to where you want to be.
            </p>
            
            <div className="flex flex-col gap-4 relative z-10 flex-grow">
              {['University Courses', 'Role-Based Roadmaps', 'Skill-Based Roadmaps', 'Absolute Beginner', 'Best Practices'].map((item, i) => (
                <div key={i} className="border border-border-main bg-bg-main px-6 py-4 font-mono text-sm lg:text-base text-text-primary flex justify-between items-center max-w-[350px]">
                  {item}
                  <ChevronRight size={18} className="text-text-muted" />
                </div>
              ))}
            </div>

            {/* Faint Path Graphic */}
            <div className="absolute right-0 bottom-0 w-[400px] h-[400px] opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-accent" strokeWidth="0.5" strokeDasharray="1 1">
                 <path d="M 80,20 C 60,40 20,40 20,60 C 20,80 80,80 80,90" />
                 <circle cx="80" cy="20" r="2" className="fill-bg-main" strokeDasharray="0"/>
                 <circle cx="20" cy="60" r="2" className="fill-bg-main" strokeDasharray="0"/>
                 <circle cx="80" cy="90" r="2" className="fill-bg-main" strokeDasharray="0"/>
              </svg>
            </div>
          </section>

          {/* AI Roadmap Tutor */}
          <section className="border border-border-main p-8 lg:p-12 bg-bg-sec rounded-md flex flex-col">
            <h2 className="font-mono text-sm lg:text-base tracking-widest uppercase text-accent font-bold mb-12">
              &gt; AI ROADMAP TUTOR
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-8 items-start flex-grow">
              <Bot size={80} className="text-accent shrink-0" strokeWidth={1} />
              <div className="flex flex-col items-start pt-2">
                <p className="font-mono text-sm lg:text-base text-text-secondary leading-relaxed mb-4">
                  Not sure what to learn?
                </p>
                <p className="font-mono text-sm lg:text-base text-text-secondary leading-relaxed mb-10 max-w-md">
                  Tell us your goal, and AI will suggest the best roadmap for you.
                </p>
                <Link href="/roadmaps" className="bg-accent text-bg-main px-8 py-4 font-mono text-sm uppercase font-bold tracking-widest hover:opacity-90 transition-opacity flex items-center gap-3">
                  BUILD MY ROADMAP <MoveRight size={18} />
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* 5. BUILT FOR DEVELOPERS */}
        <section className="border border-border-main p-8 lg:p-12 bg-bg-sec rounded-md">
          <h2 className="font-mono text-sm lg:text-base tracking-widest uppercase text-accent font-bold mb-12">
            &gt; BUILT FOR DEVELOPERS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8">
            {[
              { icon: Layers, title: 'Structured Learning', desc: 'Follow step-by-step paths designed for results.' },
              { icon: TerminalSquare, title: 'Hands-on Practice', desc: 'Code, solve problems, and strengthen your skills.' },
              { icon: BarChart3, title: 'Progress Tracking', desc: 'Track your progress and stay consistent.' },
              { icon: Users, title: 'Community Support', desc: 'Learn together and grow with other developers.' },
              { icon: Award, title: 'Certificates', desc: 'Earn certificates and showcase your achievements.' },
            ].map((feature, i) => (
              <div key={i} className="border border-border-main bg-bg-main p-8 flex flex-col items-center text-center rounded-md">
                <feature.icon size={40} className="text-accent mb-6" strokeWidth={1.5} />
                <h3 className="font-sans font-bold text-text-primary text-base lg:text-lg mb-4 leading-tight">{feature.title}</h3>
                <p className="font-mono text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="w-full px-6 mt-24 mb-10 flex flex-col items-center gap-8">
        <div className="flex flex-wrap justify-center gap-12">
          <Link href="/roadmaps" className="flex items-center gap-2 font-mono text-sm text-text-muted hover:text-text-primary transition-colors">
            <Star size={20} /> GitHub Stars
          </Link>
          <Link href="/roadmaps" className="flex items-center gap-2 font-mono text-sm text-text-muted hover:text-text-primary transition-colors">
            <MessageSquare size={20} /> Discord
          </Link>
          <Link href="/roadmaps" className="flex items-center gap-2 font-mono text-sm text-text-muted hover:text-text-primary transition-colors">
            <Users size={20} /> Community
          </Link>
          <Link href="/roadmaps" className="flex items-center gap-2 font-mono text-sm text-text-muted hover:text-text-primary transition-colors">
            <ShieldCheck size={20} /> Privacy Policy
          </Link>
        </div>
        
        <div className="font-mono text-xs text-text-muted tracking-widest mt-4">
          &copy; LoopCraft. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
