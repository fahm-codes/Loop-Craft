import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-main text-text-secondary py-8 md:py-10 font-serif border-t border-border-main mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-4">
                <span className="font-display tracking-widest text-3xl text-text-primary uppercase">LoopCraft</span>
              </Link>
              <p className="text-sm text-text-secondary mb-6 font-serif leading-relaxed max-w-sm">
                A professional developer workspace<br />
                for structured self-study.
              </p>
            </div>
            
            <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-display hidden md:block">
              LEARN &rarr; PRACTICE &rarr; REVIEW &rarr; REPEAT &rarr; MASTER
            </div>
          </div>
          
          {/* Spacer */}
          <div className="md:col-span-1"></div>

          {/* Column 2: Links */}
          <div className="md:col-span-2">
            <h4 className="font-display text-lg uppercase tracking-wider text-text-primary mb-3 border-b border-border-main pb-2">Learn</h4>
            <ul className="space-y-3 text-xs font-mono">
              <li><Link href="/roadmaps" className="hover:text-accent transition-colors block text-text-secondary">Roadmaps</Link></li>
              <li><Link href="/roadmap/ai-engineering/learn" className="hover:text-accent transition-colors block text-text-secondary">Continue Learning</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Links */}
          <div className="md:col-span-2">
            <h4 className="font-display text-lg uppercase tracking-wider text-text-primary mb-3 border-b border-border-main pb-2">Practice</h4>
            <ul className="space-y-3 text-xs font-mono">
              <li><Link href="/dsa-sheets" className="hover:text-accent transition-colors block text-text-secondary">DSA Problem Sheets</Link></li>
              <li><Link href="/roadmap/ai-engineering/learn" className="hover:text-accent transition-colors block text-text-secondary">Assignments</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Links */}
          <div className="md:col-span-2">
            <h4 className="font-display text-lg uppercase tracking-wider text-text-primary mb-3 border-b border-border-main pb-2">Community</h4>
            <ul className="space-y-3 text-xs font-mono">
              <li><Link href="/groups" className="hover:text-accent transition-colors block text-text-secondary">Study Groups</Link></li>
            </ul>
          </div>
          
          <div className="md:hidden text-[10px] uppercase tracking-[0.2em] text-text-muted font-display mt-4 pt-4 border-t border-border-main text-center">
            LEARN &rarr; PRACTICE &rarr; REVIEW &rarr; REPEAT &rarr; MASTER
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border-main flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-4">
          <div className="flex flex-col gap-2 text-[10px] text-text-muted font-mono tracking-widest uppercase">
            <div>&copy; 2026 LoopCraft</div>
            <div>Built & designed by Fahmid Hasan Sunny</div>
            <div className="flex flex-wrap gap-x-3 gap-y-2 mt-1 text-text-secondary">
              <a href="https://github.com/fahm-codes" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">GitHub</a>
              <span className="opacity-30">&middot;</span>
              <a href="https://linkedin.com/in/me_fahmid" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">LinkedIn</a>
              <span className="opacity-30">&middot;</span>
              <a href="https://instagram.com/fahm.codes" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">Code Instagram</a>
              <span className="opacity-30">&middot;</span>
              <a href="https://instagram.com/me_fahmid" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">Personal Instagram</a>
              <span className="opacity-30">&middot;</span>
              <a href="mailto:fahmidsunny59@gmail.com" className="hover:text-text-primary transition-colors">Email</a>
            </div>
          </div>
          <div className="text-[10px] text-text-muted font-mono uppercase tracking-widest bg-bg-sec px-2 py-1 border border-border-main self-start md:self-end">
            OPEN SOURCE
          </div>
        </div></div>
    </footer>
  );
}
