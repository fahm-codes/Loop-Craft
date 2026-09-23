"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, Shield, Map, Layout, BookOpen, 
  FileText, PlaySquare, PenTool, Database, UsersRound, 
  CheckCircle, BarChart3, Activity, Settings, LogOut, Code2
} from 'lucide-react';

export default function AdminSidebar({ role }: { role: string }) {
  const pathname = usePathname();

  const links = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Roles & Permissions', href: '/admin/roles', icon: Shield, reqRole: ['SUPER_ADMIN'] },
    { name: 'Roadmaps', href: '/admin/roadmaps', icon: Map },
    { name: 'Categories', href: '/admin/categories', icon: Layout },
    { name: 'Modules', href: '/admin/modules', icon: BookOpen },
    { name: 'Lessons', href: '/admin/lessons', icon: FileText },
    { name: 'Resources', href: '/admin/resources', icon: PlaySquare },
    { name: 'Media / Files', href: '/admin/media', icon: Database },
    { name: 'Assignments', href: '/admin/assignments', icon: PenTool },
    { name: 'DSA Sheets', href: '/admin/dsa', icon: Code2 },
    { name: 'Study Groups', href: '/admin/groups', icon: UsersRound },
    { name: 'Knowledge Checks', href: '/admin/reviews', icon: CheckCircle },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Audit Logs', href: '/admin/audit', icon: Activity, reqRole: ['SUPER_ADMIN', 'ADMIN'] },
    { name: 'Settings', href: '/admin/settings', icon: Settings, reqRole: ['SUPER_ADMIN'] },
  ];

  return (
    <div className="w-64 flex-shrink-0 bg-bg-sec border-r border-border-main flex flex-col h-full z-20 hidden md:flex">
      <div className="p-6 border-b border-border-main flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-2xl uppercase tracking-tighter text-text-primary hover:text-accent transition-colors flex items-center gap-2">
          <div className="w-4 h-4 bg-accent"></div>
          LoopCraft
        </Link>
      </div>
      
      <div className="p-4 border-b border-border-main font-mono text-xs text-text-muted flex items-center justify-between">
        <span>ROLE:</span>
        <span className="text-accent border border-accent/30 px-2 py-0.5 rounded-sm">{role}</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
        {links.map((link) => {
          if (link.reqRole && !link.reqRole.includes(role)) return null;
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-mono text-sm transition-colors \${isActive ? 'bg-accent/10 text-accent border border-accent/20' : 'text-text-secondary hover:text-text-primary hover:bg-bg-main'}`}
            >
              <link.icon size={16} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border-main">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-md font-mono text-sm text-text-muted hover:text-error transition-colors">
          <LogOut size={16} />
          Exit Admin
        </Link>
      </div>
    </div>
  );
}
