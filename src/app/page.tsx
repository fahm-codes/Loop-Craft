import Link from 'next/link';
import { categories } from '@/data/roadmap';

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20 w-full">
      {/* Hero Section */}
      <div className="mb-24 pb-16 border-b border-border-main">
        <div className="font-mono text-[12px] text-text-muted mb-8 border border-border-main p-4 w-fit bg-bg-sec flex flex-col gap-2">
          <div><span className="text-success font-bold mr-2">&gt;_</span> <span className="uppercase">./loopcraft --status</span></div>
          <div className="text-error uppercase tracking-widest text-[10px]">Error: Core modules uninitialized.</div>
          <div className="mt-2"><span className="text-success font-bold mr-2">&gt;_</span> <span className="uppercase">./loopcraft --start</span></div>
          <div className="text-success uppercase tracking-widest text-[10px]">System initialized successfully. Ready to learn.</div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-sans font-bold text-text-primary mb-6 tracking-tight">
          Learn better. <br />
          <span className="text-text-muted">Build faster.</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl text-text-secondary font-sans leading-relaxed mb-10">
          A structured self-study platform for software engineers. <br />
          <span className="text-text-primary">Learn &rarr; Practice &rarr; Review &rarr; Repeat.</span>
        </p>
        
        <div className="flex flex-wrap gap-4 font-mono text-[13px] uppercase tracking-wide">
          <button className="border border-accent bg-accent text-bg-main px-6 py-3 font-semibold hover:bg-transparent hover:text-accent transition-colors">
            START LEARNING
          </button>
          <button className="border border-border-main text-text-secondary px-6 py-3 hover:border-text-muted hover:text-text-primary transition-colors bg-bg-sec">
            EXPLORE PATHS
          </button>
        </div>
      </div>

      {/* Roadmaps Section */}
      <div>
        <div className="flex justify-between items-end mb-8 border-b border-border-main pb-3">
          <h2 className="font-mono text-[13px] tracking-[0.1em] uppercase text-text-secondary">
            $ CURRENT_PATH
          </h2>
          <span className="font-mono text-[11px] text-text-muted">MODULES: {categories.length}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/roadmaps/${category.id}`} className="block group">
              <div className="border border-border-main p-6 bg-bg-sec hover:bg-bg-panel hover:border-text-muted transition-all h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-sans font-bold text-text-primary">{category.title}</h3>
                  <span className="text-[11px] font-mono text-accent bg-[#6385f015] px-2 py-1 border border-[#6385f030]">
                    ACTIVE
                  </span>
                </div>
                <p className="text-sm text-text-secondary font-sans leading-relaxed mb-6 flex-grow">
                  {category.description}
                </p>
                <div className="font-mono text-[12px] text-text-muted group-hover:text-text-primary transition-colors flex items-center gap-2">
                  <span>[ EXECUTE ]</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
