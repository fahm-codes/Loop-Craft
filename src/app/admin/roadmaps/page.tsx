import { createClient } from '@/utils/supabase/server';
import { Plus, Edit2, Settings } from 'lucide-react';
import Link from 'next/link';
import { getAllRoadmaps } from '@/data/roadmap';

export default async function AdminRoadmapsPage() {
  const supabase = await createClient();
  
  // Try fetching dynamic roadmaps, fallback to static if DB fails
  let roadmaps: any[] = [];
  try {
    const { data } = await supabase.from('roadmaps').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0) {
      roadmaps = data;
    } else {
      roadmaps = getAllRoadmaps();
    }
  } catch (err) {
    roadmaps = getAllRoadmaps();
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-display uppercase tracking-tight">Roadmap Management</h1>
        <button className="bg-text-primary text-bg-main px-4 py-2 font-mono text-sm uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={16} /> New Roadmap
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmaps.map((r) => (
          <div key={r.id} className="border border-border-main bg-bg-sec p-6 flex flex-col group hover:border-accent transition-colors">
            <div className="flex justify-between items-start mb-4">
              <span className={`font-mono text-xs px-2 py-1 uppercase \${r.status === 'PUBLISHED' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                {r.status || 'STATIC_FALLBACK'}
              </span>
              <button className="text-text-muted hover:text-accent transition-colors">
                <Settings size={18} />
              </button>
            </div>
            
            <h3 className="text-xl font-display uppercase mb-2 group-hover:text-accent transition-colors">{r.title}</h3>
            <p className="text-sm text-text-secondary font-serif line-clamp-2 mb-6 flex-grow">{r.description}</p>
            
            <div className="flex gap-3 mt-auto">
              <Link href={`/admin/roadmaps/\${r.id}/edit`} className="flex-1 border border-border-main text-center py-2 font-mono text-xs hover:border-accent hover:text-accent transition-colors uppercase flex justify-center items-center gap-2">
                <Edit2 size={14} /> Edit Data
              </Link>
              <Link href={`/admin/roadmaps/\${r.id}/curriculum`} className="flex-1 bg-bg-main border border-border-main text-center py-2 font-mono text-xs hover:border-text-primary transition-colors uppercase">
                Curriculum
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
