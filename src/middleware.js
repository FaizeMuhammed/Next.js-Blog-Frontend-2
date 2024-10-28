import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token') ? req.cookies.get('token').value : null;

  const url = req.nextUrl.clone();
  const { pathname } = url;

  // Define public asset paths
  const publicPaths = [
    '/_next', // for Next.js static files
    '/assets', // Adjust for your assets folder if needed
    '/styles',
    '/globals.css' // Adjust for your CSS if needed
  ];

  // Skip token validation for public assets
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Prevent authenticated users from accessing the login page
  if (pathname === '/login' && token) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  if (pathname === '/register' && token) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users trying to access protected paths
  const protectedPaths = ['/dashboard', '/homepage'];
  if (protectedPaths.some((path) => pathname.startsWith(path)) && !token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Apply no-cache headers on protected routes to ensure middleware check on back navigation
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  }

  return NextResponse.next();
}
