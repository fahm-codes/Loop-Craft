import { notFound } from 'next/navigation';
import { categories } from '@/data/roadmap';
import RoadmapView from './RoadmapView';

export default async function RoadmapPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const category = categories.find(c => c.id === id);
  
  if (!category) {
    notFound();
  }
  
  return <RoadmapView category={category} />;
}

export function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}
