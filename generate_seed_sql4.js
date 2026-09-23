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
  difficulty = EXCLUDED.difficulty,
  estimated_duration = EXCLUDED.estimated_duration,
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
-- FINAL VALIDATION SECTION
-- Run these queries to verify the seed data
-- ==========================================

-- 1. Total roadmap count (Expected: 36)
-- SELECT count(*) AS total_roadmaps FROM public.roadmaps;

-- 2. PUBLISHED roadmap count (Expected: 1)
-- SELECT count(*) AS published_roadmaps FROM public.roadmaps WHERE status = 'PUBLISHED';

-- 3. UPCOMING roadmap count (Expected: 35)
-- SELECT count(*) AS upcoming_roadmaps FROM public.roadmaps WHERE status = 'UPCOMING';

-- 4. AI Engineering node count (Expected: 16)
-- SELECT count(*) AS ai_eng_nodes FROM public.roadmap_nodes WHERE roadmap_id = 'ai-engineering';

-- 5. AI Engineering topic count (Expected: 85)
-- SELECT count(*) AS ai_eng_topics FROM public.roadmap_topics rt JOIN public.roadmap_nodes rn ON rt.node_id = rn.id WHERE rn.roadmap_id = 'ai-engineering';

-- 6. AI Engineering resource count (Expected: 63)
-- SELECT count(*) AS ai_eng_resources FROM public.resources r JOIN public.roadmap_nodes rn ON r.node_id = rn.id WHERE rn.roadmap_id = 'ai-engineering';

-- 7. AI Engineering assignment count (Expected: 16)
-- SELECT count(*) AS ai_eng_assignments FROM public.resources r JOIN public.roadmap_nodes rn ON r.node_id = rn.id WHERE rn.roadmap_id = 'ai-engineering' AND r.type = 'assignment';

-- 8. Confirmation that no non-AI-Engineering roadmap has nodes (Expected: 0)
-- SELECT count(*) AS non_ai_eng_nodes FROM public.roadmap_nodes WHERE roadmap_id != 'ai-engineering';
\n`;

fs.writeFileSync('C:\\Users\\Sunny\\.gemini\\antigravity\\scratch\\loop-craft\\03_seed_data.sql', sql, 'utf8');
console.log('Done!');
