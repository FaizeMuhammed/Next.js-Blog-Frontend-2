import { NextResponse } from 'next/server';

export async function middleware(req) {
  const url = req.nextUrl.clone();
  
  
  const protectedPaths = ['/dashboard'];

  
  const isProtected = protectedPaths.includes(url.pathname);

  
  const isAuthenticated = await checkAuthStatus(); 

  
  if (isProtected && !isAuthenticated) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  
  if (url.pathname === '/login' && isAuthenticated) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

 
  if (url.pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect('/dashboard');
  }

  return NextResponse.next();
}


async function checkAuthStatus() {
  
  const res = await fetch('/api/auth/status'); 
  if (res.ok) {
    const data = await res.json();
    return data.isAuthenticated; 
  }
  return false;
}

export const config = {
  matcher: ['/dashboard', '/login'], 
};