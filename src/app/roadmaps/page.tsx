import Link from 'next/link';
import { db } from '@/db';
import { roadmaps } from '@/db/schema';
import { Search, ChevronRight, LayoutGrid, Code2 } from 'lucide-react';
import { eq } from 'drizzle-orm';

export default async function RoadmapsIndexPage() {
  const allRoadmaps = await db.select().from(roadmaps).where(eq(roadmaps.status, 'published'));

  const groups: Record<string, typeof allRoadmaps> = {};
  allRoadmaps.forEach(r => {
    if (!groups[r.categoryId]) groups[r.categoryId] = [];
    groups[r.categoryId].push(r);
  });

  return (
    <div className="min-h-screen bg-bg-main flex flex-col">
      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-text-primary mb-4">Explore Categories</h1>
          <p className="text-text-secondary font-mono text-sm max-w-2xl leading-relaxed">
            Choose a category to find the perfect learning path tailored to your goals. Our roadmaps provide structured, step-by-step guidance from absolute beginner to master.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groups).map(([categoryId, items]) => {
            return (
              <div key={categoryId} className="group relative bg-bg-sec border border-border-main p-6 hover:border-accent transition-colors flex flex-col">
                <div className="mb-4 text-accent">
                  <LayoutGrid size={24} />
                </div>
                
                <h2 className="text-2xl font-display font-bold text-text-primary mb-2 capitalize">{categoryId.replace(/-/g, ' ')}</h2>
                <p className="text-text-secondary font-mono text-sm mb-6 flex-grow">
                  Explore {items.length} roadmaps in this category.
                </p>
                
                <div className="flex items-center justify-between text-sm font-mono border-t border-border-main pt-4">
                  <span className="text-text-muted">{items.length} paths</span>
                  <div className="flex flex-col gap-2">
                    {items.slice(0, 3).map((r) => (
                      <Link href={`/roadmap/${r.id}`} key={r.id} className="text-accent hover:underline flex items-center gap-1">
                        {r.title} <ChevronRight size={14} />
                      </Link>
                    ))}
                    {items.length > 3 && <span className="text-text-muted text-xs">+ {items.length - 3} more</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
