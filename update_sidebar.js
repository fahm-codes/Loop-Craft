const fs = require('fs');
let file = 'src/components/Sidebar.tsx';
let content = fs.readFileSync(file, 'utf8');

const newLogic = `const isActive = item.href === '#' ? false :
                    (item.href === '/' ? pathname === '/' :
                    item.href === '/dashboard' ? pathname.startsWith('/dashboard') :
                    item.href === '/roadmaps' ? (pathname.startsWith('/roadmaps') || (pathname.startsWith('/roadmap') && !pathname.includes('/learn'))) :
                    item.href === '/dsa-sheets' ? pathname.startsWith('/dsa-sheets') :
                    item.href === '/groups' ? pathname.startsWith('/groups') :
                    item.href === '/roadmap/ai-engineering/learn' ? pathname.includes('/learn') :
                    pathname.startsWith(item.href));`;

content = content.replace(/const isActive = item\.href === '#' \? false : [\s\S]*?pathname\.startsWith\(item\.href\)\);/, newLogic);
fs.writeFileSync(file, content, 'utf8');
console.log('Updated Sidebar logic');
