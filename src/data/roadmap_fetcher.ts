import { db } from '@/db';
import { roadmaps, roadmapNodes, roadmapTopics, resources } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function fetchRoadmapById(id: string) {
  try {
    const roadmapList = await db.select().from(roadmaps).where(eq(roadmaps.id, id));
    const roadmap = roadmapList[0];

    if (roadmap) {
      const nodes = await db.select().from(roadmapNodes).where(eq(roadmapNodes.roadmapId, id)).orderBy(asc(roadmapNodes.orderIndex));
      
      const nodesWithRelations = await Promise.all(nodes.map(async (node) => {
        const topics = await db.select().from(roadmapTopics).where(eq(roadmapTopics.nodeId, node.id)).orderBy(asc(roadmapTopics.orderIndex));
        const res = await db.select().from(resources).where(eq(resources.nodeId, node.id)).orderBy(asc(resources.orderIndex));
        
        return {
          id: node.id,
          title: node.title,
          description: node.description,
          duration: node.duration,
          orderIndex: node.orderIndex,
          topics: topics.map(t => t.topic),
          resources: res.map(r => ({
            id: r.id,
            type: r.type,
            title: r.title,
            url: r.url,
            content: r.content
          }))
        };
      }));

      return {
        id: roadmap.id,
        title: roadmap.title,
        description: roadmap.description,
        difficulty: roadmap.difficulty || undefined,
        estimatedDuration: roadmap.estimatedDuration || undefined,
        nodes: nodesWithRelations as any
      };
    }
  } catch (err) {
    console.warn("DB fetch failed", err);
  }

  return null;
}
