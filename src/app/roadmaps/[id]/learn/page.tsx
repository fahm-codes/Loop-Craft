import { categories } from '@/data/roadmap';
import { notFound } from 'next/navigation';
import LearnView from './LearnView';

export function generateStaticParams() {
  return categories.map((cat) => ({
    id: cat.id,
  }));
}

export default async function LearnPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const category = categories.find((cat) => cat.id === resolvedParams.id);
  
  if (!category) {
    notFound();
  }

  return <LearnView category={category} />;
}
