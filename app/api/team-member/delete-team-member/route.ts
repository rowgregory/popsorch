import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import deleteFileFromFirebase from '@/app/utils/deleteFileFromFirebase'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { sliceTeamMember } from '@/public/data/api.data'

export async function DELETE(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()

    const userHeader = req.headers.get('x-user')!
    parsedUser = JSON.parse(userHeader)

    const { id, imageFilename } = body

    if (imageFilename) {
      try {
        await deleteFileFromFirebase(imageFilename, 'image')
      } catch (firebaseError: any) {
        await createLog('error', `Failed to delete team member image from Firebase: ${firebaseError.message}`, {
          errorLocation: parseStack(JSON.stringify(firebaseError)),
          errorMessage: firebaseError.message,
          errorName: firebaseError.name || 'FirebaseError',
          timestamp: new Date().toISOString(),
          url: req.url,
          method: req.method,
          user: parsedUser
        })
        return NextResponse.json(
          { message: 'Firebase deletion failed', error: firebaseError, sliceName: sliceTeamMember },
          { status: 500 }
        )
      }
    }

    await prisma.teamMember.delete({
      where: { id }
    })

    await createLog('info', 'Team member deleted', {
      location: ['team member route - POST /api/team-member/delete-team-member'],
      message: `Team member successfully deleted`,
      name: 'TeamMemberDeleted',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ sliceName: sliceTeamMember }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Error deleting team member: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json(
      { message: 'Error deleting team member', error, sliceName: sliceTeamMember },
      { status: 500 }
    )
  }
}
