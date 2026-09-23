const fs = require('fs');
let file = 'src/app/roadmaps/[id]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const newRoadmapCard = `const RoadmapCard = ({ roadmap }: { roadmap: any }) => {
    const isAvailable = roadmap.id === 'ai-engineering';
    return (
    <Link 
      href={\`/roadmap/\${roadmap.id}\`} 
      key={roadmap.id}
      className="group block bg-bg-sec border border-border-main rounded-md p-6 hover:border-accent transition-all h-full flex flex-col"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="bg-bg-main p-3 rounded-md border border-border-main">
          <BookOpen size={24} className={\`\${isAvailable ? 'text-accent' : 'text-text-muted'}\`} />
        </div>
        {!isAvailable && (
          <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted border border-border-main bg-bg-main px-2 py-1">
            Upcoming
          </div>
        )}
      </div>
      
      <h2 className="text-xl font-bold text-text-primary mb-3">{roadmap.title}</h2>
      <p className="text-sm text-text-secondary line-clamp-2 mb-6 h-10 flex-grow font-serif">
        {roadmap.description}
      </p>
      
      <div className="flex flex-col gap-3 mt-auto">
        <div className="flex items-center justify-between text-xs font-mono text-text-muted border-t border-border-main pt-4">
          {isAvailable ? (
            <>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>~6 Months</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart size={14} />
                <span>{roadmap.nodes?.length || 0} Modules</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1 w-full justify-between opacity-50">
              <span>IN DEVELOPMENT</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between text-accent font-mono text-xs font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>{isAvailable ? 'VIEW ROADMAP' : 'VIEW DETAILS'}</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </Link>
  );
  }`;

content = content.replace(/const RoadmapCard = \(\{ roadmap \}: \{ roadmap: any \}\) => \([\s\S]*?\);/, newRoadmapCard);
fs.writeFileSync(file, content, 'utf8');
console.log('Updated RoadmapCard');
