import { db } from '@/db';
import { profiles, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { validateSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User as UserIcon } from 'lucide-react';
import UserActionsClient from './UserActionsClient';

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const session = await validateSession();
  if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.profile?.role || '')) {
    redirect('/');
  }

  const { id } = await params;
  
  const userResult = await db.select({
    id: profiles.id,
    email: profiles.email,
    fullName: profiles.fullName,
    role: profiles.role,
    isSuspended: profiles.isSuspended,
    createdAt: profiles.createdAt,
    authCreatedAt: users.createdAt
  })
  .from(profiles)
  .leftJoin(users, eq(profiles.id, users.id))
  .where(eq(profiles.id, id));

  const targetUser = userResult[0];

  if (!targetUser) {
    return (
      <div>
        <Link href="/admin/users" className="flex items-center gap-2 text-text-muted hover:text-accent font-mono text-sm mb-8 w-fit">
          <ArrowLeft size={16} /> Back to Users
        </Link>
        <div className="bg-red-500/10 text-red-400 p-6 border border-red-500/30 font-mono">
          User not found.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link href="/admin/users" className="flex items-center gap-2 text-text-muted hover:text-accent font-mono text-sm mb-8 w-fit">
        <ArrowLeft size={16} /> Back to Users
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-bg-sec border border-border-main flex items-center justify-center">
          <UserIcon size={32} className="text-text-muted" />
        </div>
        <div>
          <h1 className="text-3xl font-display uppercase tracking-tight">{targetUser.fullName || 'Unknown User'}</h1>
          <p className="text-text-muted font-mono">{targetUser.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="border border-border-main bg-bg-sec p-6">
            <h2 className="text-xl font-display uppercase mb-4 border-b border-border-main pb-2">Profile Details</h2>
            <div className="space-y-4 font-mono text-sm">
              <div>
                <span className="text-text-muted block text-xs mb-1 uppercase">ID</span>
                <span className="break-all">{targetUser.id}</span>
              </div>
              <div>
                <span className="text-text-muted block text-xs mb-1 uppercase">Role</span>
                <span className="text-accent">{targetUser.role}</span>
              </div>
              <div>
                <span className="text-text-muted block text-xs mb-1 uppercase">Joined</span>
                <span>{new Date(targetUser.createdAt).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-text-muted block text-xs mb-1 uppercase">Status</span>
                {targetUser.isSuspended ? <span className="text-red-500">Suspended</span> : <span className="text-green-500">Active</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <UserActionsClient user={targetUser} currentRole={session.profile?.role || 'ADMIN'} />
        </div>
      </div>
    </div>
  );
}
