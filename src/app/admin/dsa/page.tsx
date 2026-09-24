import { db } from '@/db';
import { dsaSheets } from '@/db/schema';
import { validateSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { createDsaSheet, deleteDsaSheet } from '@/app/actions/admin';
import { Plus, Trash2 } from 'lucide-react';

export default async function AdminDsaPage() {
  const session = await validateSession();
  if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.profile?.role || '')) {
    redirect('/');
  }

  const allSheets = await db.select().from(dsaSheets);

  async function handleCreate(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    if (!id || !title || !description) return;
    await createDsaSheet({ id, title, description });
  }

  async function handleDelete(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    if (!id) return;
    await deleteDsaSheet(id);
  }

  return (
    <div>
      <h1 className="text-3xl font-display uppercase tracking-tight mb-8">DSA Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border border-border-main bg-bg-sec overflow-hidden">
            <table className="w-full text-left font-mono text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-border-main bg-bg-main text-text-muted">
                  <th className="px-6 py-4 font-normal">ID</th>
                  <th className="px-6 py-4 font-normal">Title</th>
                  <th className="px-6 py-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allSheets.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-text-muted">No DSA Sheets found.</td>
                  </tr>
                )}
                {allSheets.map((r) => (
                  <tr key={r.id} className="border-b border-border-main last:border-0 hover:bg-bg-main/50 transition-colors">
                    <td className="px-6 py-4">{r.id}</td>
                    <td className="px-6 py-4 font-bold text-text-primary">{r.title}</td>
                    <td className="px-6 py-4 text-right">
                      <form action={handleDelete}>
                        <input type="hidden" name="id" value={r.id} />
                        <button type="submit" className="text-red-500 hover:underline flex items-center justify-end gap-1 uppercase font-bold text-xs ml-auto">
                          <Trash2 size={14} /> Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border border-border-main bg-bg-sec p-6">
            <h2 className="text-xl font-display uppercase mb-4 flex items-center gap-2">
              <Plus size={18} /> Create Sheet
            </h2>
            <form action={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-text-muted mb-1 uppercase">ID</label>
                <input type="text" name="id" required className="w-full bg-bg-main border border-border-main p-2 text-sm focus:border-accent outline-none" placeholder="e.g. blind-75" />
              </div>
              <div>
                <label className="block text-xs font-mono text-text-muted mb-1 uppercase">Title</label>
                <input type="text" name="title" required className="w-full bg-bg-main border border-border-main p-2 text-sm focus:border-accent outline-none" placeholder="e.g. Blind 75" />
              </div>
              <div>
                <label className="block text-xs font-mono text-text-muted mb-1 uppercase">Description</label>
                <textarea name="description" required rows={3} className="w-full bg-bg-main border border-border-main p-2 text-sm focus:border-accent outline-none" placeholder="Description here..."></textarea>
              </div>
              <button type="submit" className="w-full bg-accent text-bg-main py-2 font-mono uppercase text-sm hover:bg-accent/90 transition-colors">Create Sheet</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
