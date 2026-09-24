import Link from 'next/link'
import { ChevronRight, Mail } from 'lucide-react'
import { login } from '@/app/actions/auth'
import { redirect } from 'next/navigation'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string, next?: string }
}) {
  const { error, next } = await searchParams
  
  return (
    <main className="flex-grow w-full max-w-md mx-auto px-6 py-20 flex flex-col justify-center min-h-[calc(100vh-80px)]">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-display font-bold text-text-primary mb-3">Welcome Back</h1>
        <p className="text-text-secondary font-mono text-sm">
          Login to continue your learning journey.
        </p>
      </div>

      <div className="bg-bg-sec border border-border-main p-8 rounded-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm font-mono text-center">
            {error}
          </div>
        )}

        <form action={login} className="flex flex-col gap-5 mb-8">
          <input type="hidden" name="next" value={next || '/profile'} />
          
          <div>
            <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider" htmlFor="email">Email</label>
            <input 
              id="email"
              name="email"
              type="email" 
              required
              className="w-full bg-bg-main border border-border-main rounded-md py-3 px-4 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted mb-2 uppercase tracking-wider" htmlFor="password">Password</label>
            <input 
              id="password"
              name="password"
              type="password"
              required
              className="w-full bg-bg-main border border-border-main rounded-md py-3 px-4 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-accent text-bg-main py-3.5 rounded-md font-mono text-sm uppercase font-bold tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-2"
          >
            Login <ChevronRight size={18} />
          </button>
        </form>

        </div>
  
        <p className="text-center mt-8 font-mono text-xs text-text-muted">
          Don't have an account? <Link href={`/signup${next ? `?next=${next}` : ''}`} className="text-accent hover:underline">Sign up</Link>
        </p>
      </main>
    )
  }
