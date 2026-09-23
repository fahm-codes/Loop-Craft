const fs = require('fs');
let file = 'src/app/roadmap/[id]/learn/LearnView.tsx';
let content = fs.readFileSync(file, 'utf8');

const upcomingState = `  if (category.id !== 'ai-engineering') {
    return (
      <div className="w-full flex flex-col items-center justify-center h-full px-4 py-20 bg-bg-main">
        <div className="border border-border-main bg-bg-sec p-10 md:p-16 max-w-2xl w-full text-center relative overflow-hidden flex flex-col items-center">
          <div className="font-mono text-xs tracking-widest text-text-muted mb-8 uppercase border-b border-border-main pb-4 inline-block px-8">
            STATUS: UPCOMING
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-normal text-text-primary mb-6 uppercase tracking-tight">
            {category.title}
          </h1>
          <p className="text-base text-text-secondary mb-10 max-w-lg font-serif leading-relaxed">
            This roadmap is currently being prepared for the LoopCraft learning library. We are building it carefully so that every roadmap provides a complete, practical learning experience.
          </p>
          <div className="font-mono text-xs tracking-[0.2em] text-accent border border-accent bg-accent/5 px-6 py-3 uppercase">
            COMING SOON
          </div>
          
          <Link href="/roadmaps" className="mt-12 text-sm font-mono text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-2">
            &larr; BACK TO ROADMAPS
          </Link>
        </div>
      </div>
    );
  }

  return (`;

if (!content.includes("STATUS: UPCOMING")) {
  content = content.replace(/return \(/, upcomingState);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated LearnView');
}
