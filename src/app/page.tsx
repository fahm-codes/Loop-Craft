import Link from 'next/link';

export default function Home() {
  const mainCategories = [
    { id: 'role-based', title: 'Role-Based Roadmaps', desc: 'Curated paths based on industry roles (AI Engineer, Backend, DevOps, etc).', count: '1 PATH ACTIVE' },
    { id: 'skill-based', title: 'Skill-Based Roadmaps', desc: 'Focus on specific tools and languages (Python, SQL, RAG, Docker, Gen AI).', count: 'COMING SOON' },
    { id: 'absolute-beginner', title: 'Absolute Beginner', desc: 'Zero to Developer. From Computer Fundamentals to Career Path Selection.', count: 'COMING SOON' },
    { id: 'best-practices', title: 'Best Practices', desc: 'Clean Code, System Architecture, CI/CD, and Production Readiness.', count: 'COMING SOON' },
  ];

  const features = [
    'Structured Learning', 'Hands-on Practice', 'Progress Tracking', 'Learning Groups',
    'Community', 'Notifications', 'Certificates', 'AI Roadmap Tutor'
  ];

  return (
    <div className="w-full relative">
      {/* 1. HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 border-b border-border-main">
        <div className="mb-24">
          <div className="font-mono text-[11px] text-accent tracking-widest uppercase mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success"></span>
            SYS_ONLINE
          </div>
          
          <h1 className="text-6xl md:text-8xl font-sans font-normal text-text-primary mb-6 tracking-tight uppercase leading-[0.9]">
            Learn Better. <br />
            <span className="text-text-muted">Build Faster.</span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl text-text-secondary font-sans leading-relaxed mb-6">
            A self-dependent learning center for software developers. We help you know what to learn, in what order, and how to master it.
          </p>
          <div className="font-mono text-[14px] text-accent tracking-widest uppercase mb-12 bg-[#6385f010] p-4 inline-block border border-[#6385f030]">
            LEARN &rarr; PRACTICE &rarr; REVIEW &rarr; REPEAT &rarr; MASTER
          </div>
          
          <div className="flex flex-wrap gap-4 font-mono text-[12px] uppercase tracking-widest">
            <button className="border border-accent bg-accent text-bg-main px-8 py-4 hover:bg-transparent hover:text-accent transition-colors">
              START LEARNING
            </button>
            <button className="border border-border-main text-text-secondary bg-bg-sec px-8 py-4 hover:border-text-muted hover:text-text-primary transition-colors">
              EXPLORE ROADMAPS
            </button>
          </div>
        </div>
      </section>

      {/* 2. AVAILABLE CATEGORIES */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-b border-border-main bg-bg-main">
        <div className="flex justify-between items-end mb-12 border-b border-border-main pb-4">
          <h2 className="font-mono text-[14px] tracking-widest uppercase text-text-primary">
            AVAILABLE CATEGORIES
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mainCategories.map((cat) => (
            <Link key={cat.id} href={cat.id === 'role-based' ? '/roadmaps/ai-engineering' : '#'} className="block group">
              <div className="border border-border-main p-8 bg-bg-sec hover:bg-bg-panel hover:border-accent transition-all h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-text-muted">
                  {cat.count}
                </div>
                <h3 className="text-2xl font-sans font-bold text-text-primary mb-4 uppercase">{cat.title}</h3>
                <p className="text-base text-text-secondary font-sans leading-relaxed mb-8 flex-grow">
                  {cat.desc}
                </p>
                <div className="font-mono text-[11px] text-accent group-hover:text-text-primary transition-colors flex items-center gap-2 tracking-widest uppercase">
                  [ {cat.id === 'role-based' ? 'ENTER DIRECTORY' : 'LOCKED'} ]
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. WHY LOOPCRAFT & FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-b border-border-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-mono text-[14px] tracking-widest uppercase text-text-primary mb-8 border-b border-border-main pb-4">
              WHY LOOPCRAFT
            </h2>
            <p className="text-lg text-text-secondary font-serif leading-relaxed mb-6">
              LoopCraft is not just another static course website or a simple roadmap directory. It is a comprehensive ecosystem designed to solve the hardest part of self-taught programming: consistency and structure.
            </p>
            <p className="text-lg text-text-secondary font-serif leading-relaxed">
              We curate the best external resources (articles, official docs, YouTube videos) and organize them into actionable, trackable milestones. We pair this with progress tracking, a 5-member peer group system, and intelligent AI roadmap guidance.
            </p>
          </div>

          <div>
             <h2 className="font-mono text-[14px] tracking-widest uppercase text-text-primary mb-8 border-b border-border-main pb-4">
              SYSTEM FEATURES
            </h2>
            <ul className="grid grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <li key={i} className="font-mono text-[11px] text-text-secondary tracking-widest uppercase flex items-center gap-3">
                  <span className="text-accent">&#9632;</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. AI ROADMAP TUTOR */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-b border-border-main bg-bg-sec">
        <div className="border border-accent bg-[#6385f005] p-12 text-center max-w-4xl mx-auto">
          <div className="font-mono text-[12px] text-accent tracking-widest uppercase mb-6">
            AI Roadmap Tutor
          </div>
          <h2 className="text-4xl font-sans text-text-primary mb-6 uppercase">
            Not sure where to start?
          </h2>
          <p className="text-text-secondary font-serif text-lg mb-8 max-w-2xl mx-auto">
            Our AI Developer Assistant will analyze your current skills and goals, recommend an existing LoopCraft path, and suggest what you need to learn next to bridge the gap.
          </p>
          <button className="border border-text-primary text-text-primary px-8 py-3 font-mono text-[12px] uppercase tracking-widest hover:bg-text-primary hover:text-bg-main transition-colors">
            Consult AI Tutor
          </button>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
          &copy; 2026 LoopCraft. All systems nominal.
        </div>
        <div className="flex gap-6 font-mono text-[10px] text-text-muted tracking-widest uppercase">
          <Link href="#" className="hover:text-text-primary">Discord</Link>
          <Link href="#" className="hover:text-text-primary">GitHub</Link>
          <Link href="#" className="hover:text-text-primary">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}
