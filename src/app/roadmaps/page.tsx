import Link from 'next/link';
import { platformCategories } from '@/data/roadmap';
import { Search, ChevronRight, LayoutGrid } from 'lucide-react';

export default function RoadmapsIndexPage() {
  return (
    <div className="min-h-screen bg-bg-main flex flex-col">
      
      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-sans font-bold text-text-primary mb-4">Explore Categories</h1>
          <p className="text-text-secondary font-mono text-sm max-w-2xl leading-relaxed">
            Choose a category to find the perfect learning path tailored to your goals. Our roadmaps provide structured, step-by-step guidance from absolute beginner to master.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformCategories.map((category) => {
            let count = 0;
            if (category.roadmaps) count += category.roadmaps.length;
            if (category.categories) {
              category.categories.forEach(cat => {
                if (cat.roadmaps) count += cat.roadmaps.length;
                if (cat.subcategories) {
                  cat.subcategories.forEach(sub => {
                    if (sub.roadmaps) count += sub.roadmaps.length;
                  });
                }
              });
            }

            return (
            <Link 
              href={`/roadmaps/${category.id}`} 
              key={category.id}
              className="group block bg-bg-sec border border-border-main rounded-md p-6 hover:border-accent transition-all hover:shadow-[0_0_20px_rgba(99,133,240,0.1)]"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="bg-bg-main p-3 rounded-md border border-border-main">
                  <LayoutGrid size={24} className="text-accent" />
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-text-primary mb-3">{category.title}</h2>
              <p className="text-sm text-text-secondary line-clamp-2 mb-6 h-10">
                {category.description}
              </p>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono text-text-muted border-t border-border-main pt-4">
                  <span>{count} Roadmaps Available</span>
                </div>
                
                <div className="flex items-center justify-between text-accent font-mono text-xs font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>VIEW CATEGORY</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
