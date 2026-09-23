const fs = require('fs');

const { aiEngineeringRoadmap, getAllRoadmaps, platformCategories } = require('./temp_migration/roadmap.js');

let sql = `-- Run this in Supabase SQL Editor to seed the database\n\n`;

const roadmapToCategory = {};
platformCategories.forEach(pc => {
  if (pc.roadmaps) {
    pc.roadmaps.forEach(r => roadmapToCategory[r.id] = pc.id);
  }
  if (pc.categories) {
    pc.categories.forEach(c => {
      if (c.roadmaps) c.roadmaps.forEach(r => roadmapToCategory[r.id] = c.id);
      if (c.subcategories) {
        c.subcategories.forEach(sc => {
          if (sc.roadmaps) sc.roadmaps.forEach(r => roadmapToCategory[r.id] = sc.id); // Use the most specific ID
        });
      }
    });
  }
});

const escapeSql = (str) => str ? str.replace(/'/g, "''") : '';

const allRoadmaps = getAllRoadmaps();

allRoadmaps.forEach(r => {
  const isAI = r.id === 'ai-engineering';
  const status = isAI ? 'PUBLISHED' : 'UPCOMING';
  const diff = r.difficulty || 'Intermediate';
  const dur = r.estimatedDuration || '6 Months';
  
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

sql += `-- ==========================================
-- VALIDATION SECTION
-- Run these queries to verify the seed data
-- ==========================================

-- 1. Check AI Engineering exists and is correctly PUBLISHED
-- SELECT id, status, category_id FROM public.roadmaps WHERE id = 'ai-engineering';

-- 2. Verify exactly ONE roadmap is PUBLISHED and all others are UPCOMING
-- SELECT status, count(*) AS roadmap_count FROM public.roadmaps GROUP BY status;

-- 3. Verify AI Engineering child modules/nodes count (Should be 16)
-- SELECT count(*) AS ai_engineering_nodes FROM public.roadmap_nodes WHERE roadmap_id = 'ai-engineering';

-- 4. Verify AI Engineering topics count (Should be 85)
-- SELECT count(*) AS ai_engineering_topics FROM public.roadmap_topics rt JOIN public.roadmap_nodes rn ON rt.node_id = rn.id WHERE rn.roadmap_id = 'ai-engineering';

-- 5. Verify AI Engineering resources count (Should be 63)
-- SELECT count(*) AS ai_engineering_resources FROM public.resources r JOIN public.roadmap_nodes rn ON r.node_id = rn.id WHERE rn.roadmap_id = 'ai-engineering';

-- 6. Verify AI Engineering assignments count (Should be 16)
-- SELECT count(*) AS ai_engineering_assignments FROM public.resources r JOIN public.roadmap_nodes rn ON r.node_id = rn.id WHERE rn.roadmap_id = 'ai-engineering' AND r.type = 'assignment';
\n`;

fs.writeFileSync('C:\\Users\\Sunny\\.gemini\\antigravity\\scratch\\loop-craft\\03_seed_data.sql', sql, 'utf8');
console.log('Done!');
