import { NextResponse } from 'next/server';

export async function middleware(req) {
  const url = req.nextUrl.clone();
  
  // Paths that require authentication
  const protectedPaths = ['/dashboard'];

  // Check if the requested path is protected
  const isProtected = protectedPaths.includes(url.pathname);

  // Example function to check authentication status
  const isAuthenticated = await checkAuthStatus(); // Implement this function to get user status

  // Redirect to login if the user is not authenticated and trying to access a protected path
  if (isProtected && !isAuthenticated) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users from the login page to the dashboard
  if (url.pathname === '/login' && isAuthenticated) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // If the user tries to access the login page after logging in, they will be redirected to the dashboard
  if (url.pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect('/dashboard');
  }

  return NextResponse.next();
}

// Example function to check authentication status
async function checkAuthStatus() {
  // Implement your logic to check if the user is authenticated
  const res = await fetch('/api/auth/status'); // Adjust this endpoint as necessary
  if (res.ok) {
    const data = await res.json();
    return data.isAuthenticated; // Assuming your API returns { isAuthenticated: true/false }
  }
  return false;
}

export const config = {
  matcher: ['/dashboard', '/login'], // Apply middleware to these routes
};
