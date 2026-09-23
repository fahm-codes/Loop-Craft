"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import { ThemeProvider } from './ThemeProvider';
import Footer from './Footer';

export default function AppLayout({ children, user, profile }: { children: React.ReactNode, user: any, profile: any }) {
  const pathname = usePathname();
  
  // Public routes that use the old marketing Navbar
  const isHomepage = pathname === '/';
  const isAuth = pathname === '/login' || pathname === '/signup' || pathname === '/auth/callback';
  const isPublic = isHomepage || isAuth || pathname === '/about';

  return (
    <ThemeProvider>
      {isPublic ? (
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar user={user} profile={profile} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      ) : (
        <div className="relative z-10 flex h-screen overflow-hidden bg-bg-main">
          <Sidebar user={user} profile={profile} />
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative z-10">
            <AppHeader user={user} profile={profile} />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}
