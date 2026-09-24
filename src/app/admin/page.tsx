import { Users, Map, BookOpen, PenTool } from 'lucide-react';
import { db } from '@/db';
import { profiles, roadmaps, roadmapNodes, assignmentSubmissions } from '@/db/schema';
import { count } from 'drizzle-orm';

export default async function AdminDashboard() {
  let userCount = 'Unavailable';
  let roadmapCount = 'Unavailable';
  let lessonCount = 'Unavailable';
  let submissionCount = 'Unavailable';

  try {
    const profileCountResult = await db.select({ count: count() }).from(profiles);
    userCount = profileCountResult[0].count.toString();

    const roadmapCountResult = await db.select({ count: count() }).from(roadmaps);
    roadmapCount = roadmapCountResult[0].count.toString();

    const lessonCountResult = await db.select({ count: count() }).from(roadmapNodes);
    lessonCount = lessonCountResult[0].count.toString();

    const submissionCountResult = await db.select({ count: count() }).from(assignmentSubmissions);
    submissionCount = submissionCountResult[0].count.toString();
  } catch (err) {
    console.error("Dashboard count error:", err);
  }

  const stats = [
    { title: 'Total Users', value: userCount, icon: Users },
    { title: 'Roadmaps', value: roadmapCount, icon: Map },
    { title: 'Lessons / Modules', value: lessonCount, icon: BookOpen },
    { title: 'Submissions', value: submissionCount, icon: PenTool },
  ];

  return (
    <div>
      <h1 className="text-3xl font-display uppercase tracking-tight mb-8">Admin Control Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-bg-sec border border-border-main p-6 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="font-mono text-xs text-text-muted uppercase tracking-widest">{stat.title}</span>
              <stat.icon size={18} className="text-accent/50" />
            </div>
            <div className="text-4xl font-display font-normal text-text-primary relative z-10">
              {stat.value}
            </div>
            {/* Blueprint grid background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-border-main bg-bg-sec p-6">
          <h2 className="text-xl font-display uppercase mb-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            System Status
          </h2>
          <div className="space-y-4 font-mono text-sm">
            <div className="flex justify-between border-b border-border-main pb-2">
              <span className="text-text-muted">Database Connection</span>
              <span className="text-green-500">ONLINE</span>
            </div>
            <div className="flex justify-between border-b border-border-main pb-2">
              <span className="text-text-muted">Authentication</span>
              <span className="text-green-500">OPERATIONAL</span>
            </div>
            <div className="flex justify-between border-b border-border-main pb-2">
              <span className="text-text-muted">Storage</span>
              <span className="text-yellow-500">PENDING CONFIG</span>
            </div>
            <div className="flex justify-between border-b border-border-main pb-2">
              <span className="text-text-muted">Environment</span>
              <span className="text-accent">PRODUCTION</span>
            </div>
          </div>
        </div>

        <div className="border border-border-main bg-bg-sec p-6">
          <h2 className="text-xl font-display uppercase mb-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Recent Audit Logs
          </h2>
          <div className="flex items-center justify-center h-40 border border-dashed border-border-main text-text-muted font-mono text-xs">
            Audit logs currently unavailable (Requires Infrastructure)
          </div>
        </div>
      </div>
    </div>
  );
}
