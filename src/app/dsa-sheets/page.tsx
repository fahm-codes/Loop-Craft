import Link from 'next/link';
import { db } from '@/db';
import { dsaSheets } from '@/db/schema';
import { ChevronRight, Code2 } from 'lucide-react';

export default async function DSASheetsIndexPage() {
  const allSheets = await db.select().from(dsaSheets);

  return (
    <div className="min-h-screen bg-bg-main flex flex-col">
      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-text-primary mb-4">DSA Problem Sheets</h1>
          <p className="text-text-secondary font-mono text-sm max-w-2xl leading-relaxed">
            Practice Data Structures and Algorithms with curated problem sheets from top educators. Track your progress and master interview questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allSheets.map((sheet) => (
            <Link 
              href={`/dsa-sheets/${sheet.id}`} 
              key={sheet.id}
              className="group block bg-bg-sec border border-border-main rounded-md p-6 hover:border-accent transition-all hover:shadow-glow"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="bg-bg-main p-3 rounded-md border border-border-main">
                  <Code2 size={24} className="text-accent" />
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-text-primary mb-3">{sheet.title}</h2>
              <p className="text-sm text-text-secondary line-clamp-2 mb-6 h-10">
                {sheet.description}
              </p>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono text-text-muted border-t border-border-main pt-4">
                  <span>Explore Sheet</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
