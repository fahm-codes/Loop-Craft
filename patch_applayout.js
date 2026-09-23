const fs = require('fs');
let file = 'src/components/AppLayout.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/const isPublic = isHomepage \|\| isAuth;/, "const isPublic = isHomepage || isAuth || pathname === '/about';");
fs.writeFileSync(file, content, 'utf8');
console.log('Patched AppLayout');
