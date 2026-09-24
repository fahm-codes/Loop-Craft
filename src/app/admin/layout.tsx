import { redirect } from 'next/navigation';
import { validateSession } from '@/lib/auth';
import AdminSidebar from './AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const sessionData = await validateSession();

  if (!sessionData || !sessionData.user) {
    redirect('/login?next=/admin');
  }

  const profile = sessionData.profile;

  if (!profile || !['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER', 'MODERATOR', 'SUPPORT'].includes(profile.role)) {
    redirect('/unauthorized');
  }

  return (
    <div className="flex h-screen bg-bg-main overflow-hidden text-text-primary">
      <AdminSidebar role={profile.role} />
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
