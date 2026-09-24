import { Search, ShieldAlert, Edit2 } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/db';
import { profiles } from '@/db/schema';
import { desc, like, or } from 'drizzle-orm';

export default async function AdminUsersPage({ searchParams }: { searchParams: { q?: string } }) {
  const { q } = await searchParams;

  let users: any[] = [];
  let error: string | null = null;

  try {
    let query = db.select().from(profiles);
    
    if (q) {
      query = query.where(or(
        like(profiles.email, `%${q}%`),
        like(profiles.fullName, `%${q}%`)
      )) as any;
    }
    
    users = await query.orderBy(desc(profiles.createdAt)).limit(50);
  } catch (err: any) {
    error = err.message || "Failed to load users";
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-display uppercase tracking-tight">User Management</h1>
        
        <form className="relative w-full md:w-64">
          <input 
            type="text" 
            name="q"
            defaultValue={q || ''}
            placeholder="Search users..." 
            className="w-full bg-bg-sec border border-border-main px-4 py-2 pl-10 font-mono text-sm text-text-primary focus:outline-none focus:border-accent"
          />
          <Search size={16} className="absolute left-3 top-2.5 text-text-muted" />
        </form>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/30 p-4 text-red-400 font-mono text-sm flex items-center gap-3">
          <ShieldAlert size={18} />
          Failed to load users: {error}
        </div>
      ) : (
        <div className="border border-border-main bg-bg-sec overflow-x-auto">
          <table className="w-full text-left font-mono text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-border-main bg-bg-main text-text-muted">
                <th className="px-6 py-4 font-normal">User</th>
                <th className="px-6 py-4 font-normal">Role</th>
                <th className="px-6 py-4 font-normal">Joined</th>
                <th className="px-6 py-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-text-muted">No users found.</td>
                </tr>
              )}
              {users?.map((u) => (
                <tr key={u.id} className="border-b border-border-main last:border-0 hover:bg-bg-main/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-text-primary font-bold">{u.fullName || 'Unknown'}</div>
                    <div className="text-text-muted text-xs">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-sm text-xs border ${
                      u.role === 'SUPER_ADMIN' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                      u.role === 'ADMIN' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' :
                      u.role === 'CONTENT_MANAGER' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                      'bg-green-500/10 border-green-500/30 text-green-400'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary flex flex-col gap-1">
                    {new Date(u.createdAt).toLocaleDateString()}
                    {u.isSuspended && <span className="text-xs text-red-500 font-bold uppercase">Suspended</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/users/${u.id}`} className="text-accent hover:underline flex items-center justify-end gap-2">
                      <Edit2 size={14} /> Edit
                    </Link>
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
