import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function authMiddleware(req: NextRequest, authToken: any) {
  if (!authToken) {
    const res = NextResponse.redirect(new URL('/auth/login', req.url))
    res.cookies.delete('authToken')
    return res
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    await jwtVerify(authToken.value, secret)

    // If logged in and trying to access login page, redirect to dashboard
    if (req.nextUrl.pathname === '/auth/login') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }

    return NextResponse.next()
  } catch {
    const res = NextResponse.redirect(new URL('/auth/login', req.url))
    res.cookies.delete('authToken')
    return res
  }
}
