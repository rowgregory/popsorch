import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  let parsedUser
  try {
    const userHeader = req.headers.get('x-user')!
    parsedUser = JSON.parse(userHeader)

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return NextResponse.json({ users }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Fetching users failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Error fetching users', error }, { status: 500 })
  }
}
