import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import { User, LogOut, Settings, Award } from 'lucide-react'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // Fetch the profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-2">My Profile</h1>
        <p className="text-text-secondary font-mono text-sm">Manage your personal information and learning progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-bg-sec border border-border-main p-6 rounded-md flex flex-col items-center text-center">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full mb-4 border-2 border-accent object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full mb-4 border-2 border-accent bg-bg-main flex items-center justify-center">
                <User size={40} className="text-accent" />
              </div>
            )}
            
            <h2 className="text-xl font-bold text-text-primary mb-1">{profile?.display_name || user.email}</h2>
            <p className="text-text-muted font-mono text-xs mb-4">@{profile?.username || 'user'}</p>
            <span className="bg-bg-main border border-border-main text-text-secondary px-3 py-1 rounded-full text-xs font-mono">
              Student
            </span>
          </div>

          <div className="bg-bg-sec border border-border-main rounded-md overflow-hidden">
            <button className="w-full text-left px-6 py-4 border-b border-border-main text-accent bg-accent-soft font-mono text-sm flex items-center gap-3">
              <User size={16} /> Personal Info
            </button>
            <button className="w-full text-left px-6 py-4 border-b border-border-main text-text-secondary hover:text-text-primary transition-colors font-mono text-sm flex items-center gap-3">
              <Award size={16} /> My Enrollments
            </button>
            <button className="w-full text-left px-6 py-4 border-b border-border-main text-text-secondary hover:text-text-primary transition-colors font-mono text-sm flex items-center gap-3">
              <Settings size={16} /> Settings
            </button>
            <form action={logout}>
              <button className="w-full text-left px-6 py-4 text-red-400 hover:text-red-300 transition-colors font-mono text-sm flex items-center gap-3">
                <LogOut size={16} /> Logout
              </button>
            </form>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-2">
          <div className="bg-bg-sec border border-border-main rounded-md p-8">
            <h3 className="text-lg font-bold text-text-primary mb-6 border-b border-border-main pb-4">Personal Information</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Email Address</label>
                <div className="text-text-primary font-mono text-sm bg-bg-main border border-border-main p-3 rounded-md">
                  {user.email}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Display Name</label>
                <div className="text-text-primary font-mono text-sm bg-bg-main border border-border-main p-3 rounded-md">
                  {profile?.display_name || 'Not set'}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Username</label>
                <div className="text-text-primary font-mono text-sm bg-bg-main border border-border-main p-3 rounded-md">
                  @{profile?.username}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider">Account Created</label>
                <div className="text-text-primary font-mono text-sm bg-bg-main border border-border-main p-3 rounded-md">
                  {new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
