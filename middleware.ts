import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

const protectedRoutes = ['/dashboard']
const authRoutes = ['/login', '/signup']
const publicRoutes = ['/']

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('auth-token')?.value

  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const isAuthRoute = authRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // ✅ Allow everyone to access dashboard pages if you want them public
  // You can disable this block if you want to restrict again
  if (path.startsWith('/dashboard')) {
    return NextResponse.next()
  }

  // 🔐 If the route is protected, check token
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    // ✅ Enforce role-based redirect if dashboard is protected again
    const role = decoded.role.toLowerCase()

    if (path.startsWith('/dashboard/registry') && role !== 'registry') {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.nextUrl))
    }

    if (path.startsWith('/dashboard/coordinator') && role !== 'coordinator') {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.nextUrl))
    }

    if (path.startsWith('/dashboard/lecturer') && role !== 'lecturer') {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.nextUrl))
    }
  }

  // 🔁 Redirect logged-in users away from /login or /signup
  if (isAuthRoute && token) {
    const decoded = verifyToken(token)
    if (decoded) {
      const role = decoded.role.toLowerCase()
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.nextUrl))
    }
  }

  return NextResponse.next()
}

// 👇 This ensures middleware runs on all routes except static/public assets
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
