import { getRoadmapById as getStaticRoadmapById } from './roadmap';
import { createClient } from '@/utils/supabase/server';

export async function fetchRoadmapById(id: string) {
  try {
    const supabase = await createClient();
    
    // Attempt to fetch from DB
    const { data: roadmap, error } = await supabase
      .from('roadmaps')
      .select(`
        *,
        nodes:roadmap_nodes (
          *,
          topics:roadmap_topics(*),
          resources(*)
        )
      `)
      .eq('id', id)
      .single();

    if (!error && roadmap) {
      // Sort and shape the data to match the static interface
      const shapedRoadmap = {
        id: roadmap.id,
        title: roadmap.title,
        description: roadmap.description,
        difficulty: roadmap.difficulty,
        estimatedDuration: roadmap.estimated_duration,
        nodes: roadmap.nodes
          .sort((a: any, b: any) => a.order_index - b.order_index)
          .map((node: any) => ({
            id: node.id,
            title: node.title,
            description: node.description,
            duration: node.duration,
            topics: (node.topics || []).sort((a: any, b: any) => a.order_index - b.order_index).map((t: any) => t.topic),
            resources: (node.resources || []).sort((a: any, b: any) => a.order_index - b.order_index).map((r: any) => ({
              id: r.id,
              type: r.type,
              title: r.title,
              url: r.url,
              content: r.content
            }))
          }))
      };
      return shapedRoadmap;
    }
  } catch (err) {
    console.warn("Supabase fetch failed, falling back to static data", err);
  }

  // Fallback to static
  return getStaticRoadmapById(id);
}
