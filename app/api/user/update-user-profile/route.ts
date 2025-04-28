import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceUser } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  let parsedUser
  try {
    const body = await req.json()

    const userHeader = req.headers.get('x-user')!
    parsedUser = JSON.parse(userHeader)

    if (!body.id) {
      return NextResponse.json({ message: 'User ID is required', sliceName: sliceUser }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: body.id },
      data: body
    })

    await createLog('info', 'User profile updated', {
      location: ['user route - PUT /api/user/update-user-profile'],
      message: `User profile successfully updated`,
      name: 'UserProfileUpdated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ sliceName: sliceUser }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Updating user profile failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Error updating user', error, sliceName: sliceUser }, { status: 500 })
  }
}
