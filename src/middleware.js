
import { NextResponse } from 'next/server';

export function middleware(req) {

  console.log('All Cookies:', req.cookies);


  const token = req.cookies.get('token') ? req.cookies.get('token').value : null; 

  console.log('Token:', token); 

  const url = req.nextUrl.clone();
  const { pathname } = url;


  if (pathname === '/login' && token) {

   
    url.pathname = '/dashboard'; 
    return NextResponse.redirect(url);
  }

  const authPaths = ['/dashboard', '/homepage'];
  if (authPaths.some((path) => pathname.startsWith(path)) && !token) {
   
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }


  return NextResponse.next();
}
