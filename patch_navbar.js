const fs = require('fs');
let file = 'src/components/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacementLinks = `{/* Middle: Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8 font-serif font-medium text-[14px] lg:text-[15px]">
          <Link href="/" className={\`transition-colors py-[18px] \${pathname === '/' ? 'text-accent' : 'hover:text-text-primary'}\`}>Home</Link>
          <Link href="/roadmaps" className={\`transition-colors py-[18px] \${(pathname.startsWith('/roadmap') || pathname.startsWith('/roadmaps')) ? 'text-accent' : 'hover:text-text-primary'}\`}>Roadmaps</Link>
          <Link href="/dsa-sheets" className={\`transition-colors py-[18px] \${pathname.startsWith('/dsa-sheets') ? 'text-accent' : 'hover:text-text-primary'}\`}>DSA Sheets</Link>
          <Link href="/groups" className={\`transition-colors py-[18px] \${pathname.startsWith('/groups') ? 'text-accent' : 'hover:text-text-primary'}\`}>Groups</Link>
          <Link href="/about" className={\`transition-colors py-[18px] \${pathname.startsWith('/about') ? 'text-accent' : 'hover:text-text-primary'}\`}>About</Link>
        </div>`;

content = content.replace(/\{\/\* Middle: Links \*\/\}[\s\S]*?<\/div>/, replacementLinks);

fs.writeFileSync(file, content, 'utf8');
console.log('Updated Navbar links');
