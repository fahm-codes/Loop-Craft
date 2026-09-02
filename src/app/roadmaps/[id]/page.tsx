import { notFound } from 'next/navigation';
import { getCategoryById, platformCategories } from '@/data/roadmap';
import Link from 'next/link';
import { ChevronRight, BookOpen, Clock, BarChart, Code2, Shield } from 'lucide-react';

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const category = getCategoryById(id);
  
  if (!category) {
    notFound();
  }

  // Component to render a roadmap card
  const RoadmapCard = ({ roadmap }: { roadmap: any }) => (
    <Link 
      href={`/roadmap/${roadmap.id}`} 
      key={roadmap.id}
      className="group block bg-bg-sec border border-border-main rounded-md p-6 hover:border-accent transition-all hover:shadow-[0_0_20px_rgba(99,133,240,0.1)] h-full flex flex-col"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="bg-bg-main p-3 rounded-md border border-border-main">
          <BookOpen size={24} className="text-accent" />
        </div>
      </div>
      
      <h2 className="text-xl font-bold text-text-primary mb-3">{roadmap.title}</h2>
      <p className="text-sm text-text-secondary line-clamp-2 mb-6 h-10 flex-grow">
        {roadmap.description}
      </p>
      
      <div className="flex flex-col gap-3 mt-auto">
        <div className="flex items-center justify-between text-xs font-mono text-text-muted border-t border-border-main pt-4">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>~6 Months</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart size={14} />
            <span>{roadmap.nodes?.length || 0} Modules</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-accent font-mono text-xs font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>VIEW ROADMAP</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-bg-main flex flex-col">
      
      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="mb-12">
          <Link href="/roadmaps" className="inline-flex items-center text-text-muted hover:text-text-primary font-mono text-sm mb-6 transition-colors">
            <ChevronRight size={14} className="rotate-180 mr-1" /> BACK TO CATEGORIES
          </Link>
          <h1 className="text-4xl font-sans font-bold text-text-primary mb-4">{category.title}</h1>
          <p className="text-text-secondary font-mono text-sm max-w-2xl leading-relaxed mb-4">
            {category.description}
          </p>
        </div>

        {/* FLAT ROADMAPS (Role-based, absolute-beginner, best practices) */}
        {category.roadmaps && category.roadmaps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {category.roadmaps.map((roadmap: any) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        )}

        {/* NESTED CATEGORIES (Skill-based) */}
        {category.categories && category.categories.map(cat => (
          <div key={cat.id} className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-2 font-mono uppercase tracking-tight border-b border-border-main pb-4">
              {cat.title}
            </h2>
            {cat.description && (
              <p className="text-text-secondary font-sans text-sm mb-6 mt-4">
                {cat.description}
              </p>
            )}

            {/* If Category has direct roadmaps */}
            {cat.roadmaps && cat.roadmaps.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {cat.roadmaps.map(roadmap => (
                  <RoadmapCard key={roadmap.id} roadmap={roadmap} />
                ))}
              </div>
            )}

            {/* If Category has subcategories */}
            {cat.subcategories && cat.subcategories.length > 0 && (
              <div className="mt-8 space-y-12">
                {cat.subcategories.map(subcat => (
                  <div key={subcat.id} className="ml-0 md:ml-6 pl-0 md:pl-6 md:border-l border-border-main">
                    <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                      <Code2 size={18} className="text-accent" /> {subcat.title}
                    </h3>
                    {subcat.roadmaps && subcat.roadmaps.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subcat.roadmaps.map(roadmap => (
                          <RoadmapCard key={roadmap.id} roadmap={roadmap} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return platformCategories.map((cat) => ({
    id: cat.id,
  }));
}
