const fs = require('fs');

const { aiEngineeringRoadmap, getAllRoadmaps, platformCategories } = require('./temp_migration/roadmap.js');
const sqlFile = 'C:\\Users\\Sunny\\.gemini\\antigravity\\brain\\9ac8c4dc-d891-452d-917e-a05d5aacf983\\03_seed_data.sql';

// Generate Roadmap to Category mapping
const roadmapToCategory = {};
platformCategories.forEach(pc => {
  if (pc.roadmaps) {
    pc.roadmaps.forEach(r => roadmapToCategory[r.id] = pc.id); // e.g. role-based, best-practices, absolute-beginner
  }
  if (pc.categories) {
    pc.categories.forEach(c => {
      if (c.roadmaps) c.roadmaps.forEach(r => roadmapToCategory[r.id] = c.id);
      if (c.subcategories) {
        c.subcategories.forEach(sc => {
          if (sc.roadmaps) sc.roadmaps.forEach(r => roadmapToCategory[r.id] = c.id); // Mapping to web-development etc.
        });
      }
    });
  }
});

let sql = `-- Run this in Supabase SQL Editor to seed the database\n\n`;

const escapeSql = (str) => str ? str.replace(/'/g, "''") : '';

const allRoadmaps = getAllRoadmaps();

allRoadmaps.forEach(r => {
  const isAI = r.id === 'ai-engineering';
  const status = isAI ? 'PUBLISHED' : 'UPCOMING';
  const diff = r.difficulty || 'Intermediate';
  const dur = r.estimatedDuration || '6 Months';
  
  // Use the mapped category, fallback to 'role-based' if somehow missing
  const catId = roadmapToCategory[r.id] || 'role-based';
  
  sql += `INSERT INTO public.roadmaps (id, title, description, category_id, difficulty, estimated_duration, status)
VALUES (
  '${r.id}',
  '${escapeSql(r.title)}',
  '${escapeSql(r.description)}',
  '${escapeSql(catId)}',
  '${escapeSql(diff)}',
  '${escapeSql(dur)}',
  '${status}'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
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
      
      // FIX: Replace '#' with NULL
      const urlRaw = (res.url === '#' || !res.url) ? null : res.url;
      const urlStr = urlRaw ? `'${escapeSql(urlRaw)}'` : 'NULL';
      
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

// Also print the counts for validation
let topicCount = 0;
let resourceCount = 0;
let assignmentCount = 0;

r.nodes.forEach(n => {
  if(n.topics) topicCount += n.topics.length;
  if(n.resources) {
    resourceCount += n.resources.length;
    n.resources.forEach(res => {
      if(res.type === 'assignment') assignmentCount++;
    });
  }
});
console.log(`AI Engineering Nodes: ${r.nodes.length}`);
console.log(`AI Engineering Topics: ${topicCount}`);
console.log(`AI Engineering Resources: ${resourceCount}`);
console.log(`AI Engineering Assignments: ${assignmentCount}`);

console.log('Successfully generated 03_seed_data.sql');
