const fs = require('fs');
let file = 'src/components/Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

const newBottomBar = `{/* Bottom Bar */}
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
        </div>`;

content = content.replace(/\{\/\* Bottom Bar \*\/\}[\s\S]*?(?=\<\/div\>\s*\<\/footer\>)/, newBottomBar);

fs.writeFileSync(file, content, 'utf8');
console.log('Updated Bottom Bar');
