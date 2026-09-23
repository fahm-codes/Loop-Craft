const fs = require('fs');

const fixBackticks = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\\\`/g, '\`');
  fs.writeFileSync(file, content, 'utf8');
};

fixBackticks('src/app/admin/AdminSidebar.tsx');
fixBackticks('src/app/admin/roadmaps/page.tsx');
fixBackticks('src/app/admin/users/page.tsx');
console.log('Fixed backticks');
