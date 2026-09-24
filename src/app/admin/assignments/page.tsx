import { PenTool, Search, ShieldAlert, Plus } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/db';
import { resources, assignmentSubmissions, profiles } from '@/db/schema';
import { desc, eq, like, or, and } from 'drizzle-orm';
import { validateSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminAssignmentsPage({ searchParams }: { searchParams: { q?: string } }) {
  const sessionData = await validateSession();
  if (!sessionData) redirect('/login');
  
  const { role } = sessionData.profile;
  if (!['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'].includes(role)) {
    redirect('/unauthorized');
  }

  const { q } = await searchParams;
  let assignmentsList: any[] = [];
  let error: string | null = null;

  try {
    let whereClause = eq(resources.type, 'assignment');
    if (q) {
      whereClause = and(whereClause, like(resources.title, `%${q}%`)) as any;
    }
    
    let query = db.select().from(resources).where(whereClause);
    assignmentsList = await query.orderBy(desc(resources.createdAt)).limit(50);
  } catch (err: any) {
    error = err.message || "Failed to load assignments";
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-display uppercase tracking-tight">Assignment Management</h1>
        
        <div className="flex items-center gap-4">
          <form className="relative w-full md:w-64">
            <input 
              type="text" 
              name="q"
              defaultValue={q || ''}
              placeholder="Search assignments..." 
              className="w-full bg-bg-sec border border-border-main px-4 py-2 pl-10 font-mono text-sm text-text-primary focus:outline-none focus:border-accent"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-text-muted" />
          </form>
          <button className="flex items-center gap-2 bg-accent text-bg-main font-mono text-sm px-4 py-2 hover:bg-accent/90 transition-colors">
            <Plus size={16} /> New
          </button>
        </div>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/30 p-4 text-red-400 font-mono text-sm flex items-center gap-3">
          <ShieldAlert size={18} />
          Failed to load assignments: {error}
        </div>
      ) : (
        <div className="border border-border-main bg-bg-sec overflow-x-auto">
          <table className="w-full text-left font-mono text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-border-main bg-bg-main text-text-muted">
                <th className="px-6 py-4 font-normal">Assignment Title</th>
                <th className="px-6 py-4 font-normal">Node ID</th>
                <th className="px-6 py-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignmentsList?.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-text-muted">No assignments found.</td>
                </tr>
              )}
              {assignmentsList?.map((a) => (
                <tr key={a.id} className="border-b border-border-main last:border-0 hover:bg-bg-main/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-text-primary font-bold">{a.title}</div>
                  </td>
                  <td className="px-6 py-4 text-text-muted text-xs">
                    {a.nodeId}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-text-muted italic">Edit via Roadmap</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
