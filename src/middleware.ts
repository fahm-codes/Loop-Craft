import { NextResponse, type NextRequest } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/profile')) {
    const sessionId = request.cookies.get('session')?.value;
    
    if (!sessionId) {
      url.pathname = '/login';
      url.searchParams.set('next', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    
    try {
      const sql = neon(process.env.DATABASE_URL!);
      
      const sessionRecords = await sql`
        SELECT user_id, expires_at FROM sessions WHERE id = ${sessionId}
      `;
      
      if (sessionRecords.length === 0) {
        url.pathname = '/login';
        url.searchParams.set('next', request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
      
      const session = sessionRecords[0];
      if (new Date(session.expires_at).getTime() < Date.now()) {
        url.pathname = '/login';
        url.searchParams.set('next', request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
      
      // Fetch role and suspended status
      const profileRecords = await sql`
        SELECT role, is_suspended FROM profiles WHERE id = ${session.user_id}
      `;
      const profile = profileRecords[0];

      if (!profile || profile.is_suspended) {
        url.pathname = '/login';
        url.searchParams.set('next', request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
      
      if (url.pathname.startsWith('/admin')) {
        const role = profile.role;
        if (!['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER', 'MODERATOR', 'SUPPORT'].includes(role)) {
          url.pathname = '/unauthorized';
          return NextResponse.redirect(url);
        }
      }
    } catch (e) {
      console.error('Middleware auth check error:', e);
      if (url.pathname.startsWith('/admin')) {
         url.pathname = '/login';
         return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
