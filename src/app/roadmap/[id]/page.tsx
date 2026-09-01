import { notFound } from 'next/navigation';
import { getRoadmapById, platformCategories, aiEngineeringRoadmap } from '@/data/roadmap';
import RoadmapView from './RoadmapView';

export default async function RoadmapPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const roadmap = getRoadmapById(id);
  
  if (!roadmap) {
    notFound();
  }
  
  return <RoadmapView category={roadmap} />;
}

export function generateStaticParams() {
  // We should return all roadmaps across all categories
  const params: { id: string }[] = [];
  platformCategories.forEach(cat => {
    cat.roadmaps.forEach(r => {
      params.push({ id: r.id! });
    });
  });
  return params;
}
