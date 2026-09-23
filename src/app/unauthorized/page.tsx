import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <main className="flex-grow w-full max-w-2xl mx-auto px-6 py-32 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
      <div className="bg-bg-sec border border-border-main p-12 w-full relative overflow-hidden flex flex-col items-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="text-error mb-6">
          <ShieldAlert size={64} strokeWidth={1} />
        </div>
        
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-text-muted mb-6 inline-block border-b border-border-main pb-2">
          ERROR 403
        </div>
        
        <h1 className="text-3xl md:text-4xl font-display font-normal text-text-primary uppercase tracking-tight mb-4">
          Access Denied
        </h1>
        
        <p className="text-base text-text-secondary font-serif leading-relaxed mb-10 max-w-md">
          You do not have the required permissions to access the Admin Control Center. Your attempt has been logged.
        </p>

        <Link href="/" className="bg-accent text-bg-main px-8 py-3 font-mono text-sm uppercase tracking-widest font-bold hover:opacity-90 transition-opacity">
          Return Home
        </Link>
      </div>
    </main>
  );
}
