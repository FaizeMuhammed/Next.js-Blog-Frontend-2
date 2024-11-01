import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token') ? req.cookies.get('token').value : null;

  const url = req.nextUrl.clone();
  const { pathname } = url;
   console.log(pathname);
   console.log(token,"oooo");
   
   

  if (pathname === '/login' && token) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  
  const authPaths = ['/dashboard', '/homepage'];
  if (authPaths.some((path) => pathname.startsWith(path)) && !token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }


  if (authPaths.some((path) => pathname.startsWith(path))) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  }

  return NextResponse.next();
}

