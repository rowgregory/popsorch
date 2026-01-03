import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

export async function getUserId(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('authToken')?.value

    if (!token) return null

    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!))

    if (!payload) return null

    return payload.id as string
  } catch {
    return null
  }
}
