import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function authMiddleware(req: NextRequest, authToken: any) {
  if (!authToken) {
    // Clear cookies and redirect if no token is found
    const res = NextResponse.redirect(new URL('/auth/login', req.url))
    res.cookies.delete('authToken')
    return res
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(authToken.value, secret)

    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-user', JSON.stringify(payload))

    const res = NextResponse.next({
      request: { headers: requestHeaders }
    })

    return res
  } catch {
    // Clear cookies and redirect if the token is invalid
    const res = NextResponse.redirect(new URL('/auth/login', req.url))
    res.cookies.delete('authToken')
    return res
  }
}
