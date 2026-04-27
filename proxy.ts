import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './app/lib/auth'

// ─── Role config ──────────────────────────────────────────────────────────────

type UserRole = 'PATRON' | 'ADMIN' | 'SUPER_USER'

const DASHBOARDS: Record<UserRole, string> = {
  PATRON: '/supporter/overview',
  ADMIN: '/v2/dashboard',
  SUPER_USER: '/v2/dashboard'
}

function getDashboard(role: UserRole) {
  return DASHBOARDS[role] ?? '/auth/login'
}

// ─── Route config ─────────────────────────────────────────────────────────────

const ROUTE_ACCESS: {
  prefix: string
  allowedRoles: UserRole[] | 'all'
}[] = [
  { prefix: '/v2/', allowedRoles: ['ADMIN', 'SUPER_USER'] },
  { prefix: '/supporter/', allowedRoles: 'all' }
]

// ─── Middleware ───────────────────────────────────────────────────────────────

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await auth()
  const user = session?.user
  const role = user?.role as UserRole | undefined

  // ── Auth page — redirect if already signed in ──
  if (pathname === '/auth/login') {
    if (user && role) {
      return NextResponse.redirect(new URL(getDashboard(role), request.url))
    }
    return NextResponse.next()
  }

  // ── Protected routes ──
  const matchedRoute = ROUTE_ACCESS.find((r) => pathname.startsWith(r.prefix))

  if (matchedRoute) {
    // Not signed in — send to login
    if (!user || !role) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Role not allowed — send to their dashboard
    if (matchedRoute.allowedRoles !== 'all' && !matchedRoute.allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL(getDashboard(role), request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/v2/:path*', '/supporter/:path*', '/auth/login']
}
