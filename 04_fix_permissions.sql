-- Fix permissions for anonymous reads
-- If you created tables without default grants, anon role may lack SELECT access.
GRANT SELECT ON public.roadmaps TO anon, authenticated;
GRANT SELECT ON public.roadmap_nodes TO anon, authenticated;
GRANT SELECT ON public.roadmap_topics TO anon, authenticated;
GRANT SELECT ON public.resources TO anon, authenticated;
