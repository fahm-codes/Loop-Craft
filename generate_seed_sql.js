const fs = require('fs');
const { execSync } = require('child_process');

console.log('Compiling roadmap.ts to extract data...');
try {
  execSync('npx tsc src/data/roadmap.ts --outDir temp_migration --module commonjs --esModuleInterop --skipLibCheck');
} catch (e) { }

const { aiEngineeringRoadmap, getAllRoadmaps } = require('./temp_migration/roadmap.js');
const sqlFile = 'C:\\Users\\Sunny\\.gemini\\antigravity\\brain\\9ac8c4dc-d891-452d-917e-a05d5aacf983\\03_seed_data.sql';

let sql = `-- Run this in Supabase SQL Editor to seed the database\n\n`;

const escapeSql = (str) => str ? str.replace(/'/g, "''") : '';

const allRoadmaps = getAllRoadmaps();

allRoadmaps.forEach(r => {
  const isAI = r.id === 'ai-engineering';
  const status = isAI ? 'PUBLISHED' : 'UPCOMING';
  const diff = r.difficulty || 'Intermediate';
  const dur = r.estimatedDuration || '6 Months';
  
  // Category mapping if possible, else default to 'ai-ml' or 'programming-data'
  let catId = 'ai-ml';
  if (r.id === 'python' || r.id === 'javascript-typescript' || r.id === 'dsa') catId = 'programming-data';
  
  sql += `INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  '${r.id}',
  '${escapeSql(r.title)}',
  '${escapeSql(r.description)}',
  '${catId}',
  '${escapeSql(diff)}',
  '${escapeSql(dur)}',
  '${status}'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  status = EXCLUDED.status;\n\n`;
});

// 2. Insert Nodes, Topics, Resources ONLY for AI Engineering
const r = aiEngineeringRoadmap;
r.nodes.forEach((node, nodeIndex) => {
  sql += `INSERT INTO public.roadmap_nodes (id, roadmap_id, title, description, duration, order_index)
VALUES (
  '${node.id}',
  '${r.id}',
  '${escapeSql(node.title)}',
  '${escapeSql(node.description)}',
  '${escapeSql(node.duration)}',
  ${nodeIndex}
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;\n\n`;

  if (node.topics) {
    node.topics.forEach((topic, topicIndex) => {
      sql += `INSERT INTO public.roadmap_topics (node_id, topic, order_index)
SELECT '${node.id}', '${escapeSql(topic)}', ${topicIndex}
WHERE NOT EXISTS (
  SELECT 1 FROM public.roadmap_topics WHERE node_id = '${node.id}' AND topic = '${escapeSql(topic)}'
);\n`;
    });
  }

  if (node.resources) {
    node.resources.forEach((res, resIndex) => {
      const type = res.type || 'other';
      const content = res.content ? `'${escapeSql(res.content)}'` : 'NULL';
      const urlStr = res.url ? `'${escapeSql(res.url)}'` : 'NULL';
      
      sql += `INSERT INTO public.resources (node_id, type, title, url, content, order_index)
SELECT '${node.id}', '${type}'::public.resource_type, '${escapeSql(res.title)}', ${urlStr}, ${content}, ${resIndex}
WHERE NOT EXISTS (
  SELECT 1 FROM public.resources WHERE node_id = '${node.id}' AND title = '${escapeSql(res.title)}'
);\n`;
    });
  }
  
  sql += '\n';
});

fs.writeFileSync(sqlFile, sql, 'utf8');
console.log('Successfully generated 03_seed_data.sql');

fs.rmSync('./temp_migration', { recursive: true, force: true });
