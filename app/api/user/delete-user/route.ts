import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { sliceAuth } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'

export async function DELETE(req: NextRequest) {
  let parsedUser

  try {
    const body = await req.json()
    const { id } = body

    const userHeader = req.headers.get('x-user')!
    parsedUser = JSON.parse(userHeader)

    const deletedUser = await prisma.user.delete({
      where: { id }
    })

    await createLog('info', 'User deleted successfully', {
      location: ['auth route - DELETE /api/user/delete-user'],
      name: 'UserDeletionSuccess',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser,
      deletedUser: {
        id: deletedUser.id,
        email: deletedUser.email,
        firstName: deletedUser.firstName,
        lastName: deletedUser.lastName
      }
    })

    return NextResponse.json({ id, sliceName: sliceAuth }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Deleting user failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ message: 'Error deleting user', error, sliceName: sliceAuth }, { status: 500 })
  }
}
