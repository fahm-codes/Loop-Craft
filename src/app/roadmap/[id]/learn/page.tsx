import { notFound } from 'next/navigation';
import { getRoadmapById, platformCategories } from '@/data/roadmap';
import LearnView from './LearnView';

export default async function LearnPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const roadmap = getRoadmapById(id);
  
  if (!roadmap) {
    notFound();
  }
  
  return <LearnView category={roadmap} />;
}

export function generateStaticParams() {
  const params: { id: string }[] = [];
  platformCategories.forEach(cat => {
    cat.roadmaps.forEach(r => {
      params.push({ id: r.id! });
    });
  });
  return params;
}
