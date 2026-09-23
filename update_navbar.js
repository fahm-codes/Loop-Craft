const fs = require('fs');
let file = 'src/components/Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('usePathname')) {
  content = content.replace(/import Link from 'next\/link';/, "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';");
}

if (!content.includes('const pathname = usePathname();')) {
  content = content.replace(/const \[dropdownOpen, setDropdownOpen\] = useState\(false\);/, "const [dropdownOpen, setDropdownOpen] = useState(false);\n  const pathname = usePathname() || '/';");
}

// Ensure the "Learn" button gets matched ONLY if it's actually the `/learn` route as requested, or wait... 
// Wait, the user said "On /roadmap/ai-engineering/learn -> Roadmaps -> ACTIVE / BLUE". 
// But what about the "Learn" button in the Navbar? The "Learn" button goes to `/roadmap/ai-engineering/learn`.
// So if they click "Learn", it goes to `/roadmap/ai-engineering/learn`. But that would make "Roadmaps" active.
// That's exactly what the user said:
// "On: /roadmap/ai-engineering/learn -> Roadmaps -> ACTIVE / BLUE"
// "On: /learn -> Learn -> ACTIVE / BLUE (if this route exists)"
// So "Learn" should only be active on `/learn`.

const replacementLinks = `{/* Middle: Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8 font-serif font-medium text-[14px] lg:text-[15px]">
          <Link href="/" className={\`transition-colors py-[18px] \${pathname === '/' ? 'text-accent' : 'hover:text-text-primary'}\`}>Home</Link>
          <Link href="/dashboard" className={\`transition-colors py-[18px] \${pathname.startsWith('/dashboard') ? 'text-accent' : 'hover:text-text-primary'}\`}>Dashboard</Link>
          <Link href="/groups" className={\`transition-colors py-[18px] \${pathname.startsWith('/groups') ? 'text-accent' : 'hover:text-text-primary'}\`}>Groups</Link>
          <Link href="/roadmaps" className={\`transition-colors py-[18px] \${(pathname.startsWith('/roadmap') || pathname.startsWith('/roadmaps')) ? 'text-accent' : 'hover:text-text-primary'}\`}>Roadmaps</Link>
          <Link href="/roadmap/ai-engineering/learn" className={\`transition-colors py-[18px] \${pathname === '/learn' ? 'text-accent' : 'hover:text-text-primary'}\`}>Learn</Link>
          <Link href="/dsa-sheets" className={\`transition-colors py-[18px] \${pathname.startsWith('/dsa-sheets') ? 'text-accent' : 'hover:text-text-primary'}\`}>DSA Sheets</Link>
        </div>`;

content = content.replace(/\{\/\* Middle: Links \*\/\}[\s\S]*?<\/div>/, replacementLinks);

fs.writeFileSync(file, content, 'utf8');
console.log('Updated Navbar');
