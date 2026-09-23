import { notFound } from 'next/navigation';
import { platformCategories, aiEngineeringRoadmap, getAllRoadmaps } from '@/data/roadmap';
import { fetchRoadmapById } from '@/data/roadmap_fetcher';
import LearnView from './LearnView';

export default async function LearnPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const roadmap = await fetchRoadmapById(id);
  
  if (!roadmap) {
    notFound();
  }
  
  return <LearnView category={roadmap} />;
}

export function generateStaticParams() {
  const params: { id: string }[] = [];
  getAllRoadmaps().forEach((r: any) => {
    if (r.id) params.push({ id: r.id });
  });
  return params;
}
