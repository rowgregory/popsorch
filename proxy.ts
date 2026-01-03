import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from './app/middleware/authMiddleware'

export async function proxy(req: NextRequest) {
  // Extract tokens from cookies
  const authToken = req.cookies.get('authToken')

  // If an admin is logged in, proceed with authentication
  if (authToken) {
    const authResponse = await authMiddleware(req, authToken)
    if (authResponse) return authResponse
    return NextResponse.next()
  }

  // If trying to access admin routes without authentication, redirect to login
  if (req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // Allow access to public routes like /auth/login
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/auth/login',
    '/admin/:path*',
    '/api/app/fetch-dashboard-data',
    '/api/concert/create-concert',
    '/api/concert/delete-concert',
    '/api/concert/update-concert',
    '/api/mailchimp/fetch-subscribers',
    '/api/photo-gallery-image/create-photo-gallery-image',
    '/api/photo-gallery-image/delete-photo-gallery-image',
    '/api/question/create-question',
    '/api/question/delete-question',
    '/api/question/update-question',
    '/api/team-member/create-team-member',
    '/api/team-member/delete-team-member',
    '/api/team-member/update-team-member',
    '/api/text-block/update-text-block',
    '/api/user/delete-user',
    '/api/user/update-user-profile',
    '/api/user/update-user-role',
    '/api/venue/create-venue',
    '/api/venue/delete-venue',
    '/api/venue/update-venue'
  ]
}
