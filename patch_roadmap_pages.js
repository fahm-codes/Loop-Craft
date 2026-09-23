const fs = require('fs');

['src/app/roadmap/[id]/page.tsx', 'src/app/roadmap/[id]/learn/page.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import \{ getRoadmapById.*?\} from '@\/data\/roadmap';/, "import { platformCategories, aiEngineeringRoadmap, getAllRoadmaps } from '@/data/roadmap';\nimport { fetchRoadmapById } from '@/data/roadmap_fetcher';");
  content = content.replace(/const roadmap = getRoadmapById\(id\);/, "const roadmap = await fetchRoadmapById(id);");
  fs.writeFileSync(file, content, 'utf8');
});
console.log('Patched roadmap pages to use dynamic fetcher');
