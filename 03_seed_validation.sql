-- 03_seed_validation.sql
-- Validation SQL for LoopCraft database seed

-- 1. AI Engineering exists and is PUBLISHED
SELECT id, status, category_id 
FROM public.roadmaps 
WHERE id = 'ai-engineering';
-- EXPECTED: id='ai-engineering', status='PUBLISHED', category_id='role-based'

-- 2. Exact node count
SELECT count(*) AS ai_engineering_nodes 
FROM public.roadmap_nodes 
WHERE roadmap_id = 'ai-engineering';
-- EXPECTED: 16

-- 3. Exact topic count
SELECT count(*) AS ai_engineering_topics 
FROM public.roadmap_topics rt
JOIN public.roadmap_nodes rn ON rt.node_id = rn.id
WHERE rn.roadmap_id = 'ai-engineering';
-- EXPECTED: 85

-- 4. Exact resource count
SELECT count(*) AS ai_engineering_resources 
FROM public.resources r
JOIN public.roadmap_nodes rn ON r.node_id = rn.id
WHERE rn.roadmap_id = 'ai-engineering';
-- EXPECTED: 63

-- 5. Exact assignment count
SELECT count(*) AS ai_engineering_assignments 
FROM public.resources r
JOIN public.roadmap_nodes rn ON r.node_id = rn.id
WHERE rn.roadmap_id = 'ai-engineering' AND r.type = 'assignment';
-- EXPECTED: 16

-- 6. No duplicate nodes
SELECT id, count(*) AS duplicate_count 
FROM public.roadmap_nodes 
GROUP BY id 
HAVING count(*) > 1;
-- EXPECTED: 0 rows

-- 7. No orphan records
SELECT count(*) AS orphan_nodes 
FROM public.roadmap_nodes 
WHERE roadmap_id NOT IN (SELECT id FROM public.roadmaps);
-- EXPECTED: 0

SELECT count(*) AS orphan_topics 
FROM public.roadmap_topics 
WHERE node_id NOT IN (SELECT id FROM public.roadmap_nodes);
-- EXPECTED: 0

SELECT count(*) AS orphan_resources 
FROM public.resources 
WHERE node_id NOT IN (SELECT id FROM public.roadmap_nodes);
-- EXPECTED: 0

-- 8. All other roadmaps are UPCOMING
SELECT status, count(*) AS count 
FROM public.roadmaps 
GROUP BY status;
-- EXPECTED: PUBLISHED=1, UPCOMING=35

-- 9. Correct category mappings
SELECT id, category_id, status 
FROM public.roadmaps 
ORDER BY category_id, id;
-- VERIFY: python -> programming-data, web-security -> web-development, etc.
