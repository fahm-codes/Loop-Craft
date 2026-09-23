import { notFound } from 'next/navigation';
import { platformCategories, aiEngineeringRoadmap, getAllRoadmaps } from '@/data/roadmap';
import { fetchRoadmapById } from '@/data/roadmap_fetcher';
import RoadmapView from './RoadmapView';

export default async function RoadmapPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const roadmap = await fetchRoadmapById(id);
  
  if (!roadmap) {
    notFound();
  }
  
  return <RoadmapView category={roadmap} />;
}

export function generateStaticParams() {
  const params: { id: string }[] = [];
  getAllRoadmaps().forEach((r: any) => {
    if (r.id) params.push({ id: r.id });
  });
  return params;
}
