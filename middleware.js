import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

// Helper function to get the site URL
function getSiteUrl(request) {
  return process.env.NODE_ENV === 'production'
    ? 'https://santaswishlist.app'
    : `${request.nextUrl.protocol}//${request.nextUrl.host}`;
}

// Helper function to check if the request is for public files or paths
function isPublicPath(pathname) {
  return [
    '/',
    '/signin',
    '/auth/callback',
    '/api/auth',
  ].includes(pathname) || 
  pathname.startsWith('/_next') || 
  pathname.startsWith('/api/auth') ||
  pathname.startsWith('/wishlist/') ||  // Allow access to wishlist pages
  pathname.match(/\.(ico|png|jpg|jpeg|gif|svg)$/);
}

export async function middleware(request) {
  try {
    // Create response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Create Supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return request.cookies.get(name)?.value;
          },
          set(name, value, options) {
            response.cookies.set({
              name,
              value,
              ...options,
              domain: process.env.NODE_ENV === 'production' 
                ? '.santaswishlist.app' 
                : undefined,
            });
          },
          remove(name, options) {
            response.cookies.set({
              name,
              value: '',
              ...options,
              domain: process.env.NODE_ENV === 'production' 
                ? '.santaswishlist.app' 
                : undefined,
            });
          },
        },
        auth: {
          flowType: 'pkce',
          detectSessionInUrl: true,
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    );

    // Get session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return response;
    }

    const pathname = request.nextUrl.pathname;

    // Allow public paths and static files
    if (isPublicPath(pathname)) {
      return response;
    }

    // If user is not signed in and trying to access protected route,
    // redirect to signin
    if (!session) {
      const redirectUrl = new URL('/signin', getSiteUrl(request));
      redirectUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // If user is signed in and trying to access signin page,
    // redirect to dashboard
    if (session && pathname === '/signin') {
      return NextResponse.redirect(new URL('/dashboard', getSiteUrl(request)));
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    // Return the original response in case of error
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
