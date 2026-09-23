const fs = require('fs');
let file = 'tests/smoke.spec.ts';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/'\/roadmap\/full-stack'/, "'/roadmap/full-stack', '/about'");
fs.writeFileSync(file, content, 'utf8');
console.log('Added about page to smoke tests');
