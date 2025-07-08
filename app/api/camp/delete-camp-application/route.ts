import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { sliceCamp } from '@/public/data/api.data'

export async function DELETE(req: NextRequest) {
  const { campApplicationIds } = await req.json()

  try {
    // Ensure campApplicationIds is provided and is an array
    if (!campApplicationIds || !Array.isArray(campApplicationIds) || campApplicationIds.length === 0) {
      await createLog('error', 'Camp application IDs missing', {
        location: ['camp-application route - DELETE /api/camp/delete-camp-application'],
        message: 'campApplicationIds array is required and must contain at least one ID',
        name: 'MissingCampApplicationIds',
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method
      })

      return NextResponse.json(
        { message: 'campApplicationIds array is required and must contain at least one ID' },
        { status: 400 }
      )
    }

    // Find all camp applications by IDs
    const campApplications = await prisma.campApplication.findMany({
      where: { id: { in: campApplicationIds } },
      include: {
        student: true,
        parent: true,
        address: true
      }
    })

    if (campApplications.length === 0) {
      await createLog('error', 'No camp applications found', {
        location: ['camp-application route - DELETE /api/camp/delete-camp-application'],
        message: `No camp applications found with IDs: ${campApplicationIds.join(', ')}`,
        name: 'CampApplicationsNotFound',
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method
      })

      return NextResponse.json([], { status: 200 })
    }

    const deletedIds: string[] = []

    // Process each camp application
    for (const campApplication of campApplications) {
      try {
        // Check and delete student if exists
        if (campApplication.student) {
          try {
            await prisma.student.delete({
              where: { id: campApplication.student.id }
            })
          } catch (error: any) {
            await createLog('error', `Error deleting student: ${error.message}`, {
              location: ['camp-application route - DELETE /api/camp/delete-camp-application'],
              message: `Failed to delete student with ID: ${campApplication.student.id}`,
              errorLocation: parseStack(JSON.stringify(error)),
              errorMessage: error.message,
              errorName: error.name || 'UnknownError',
              timestamp: new Date().toISOString(),
              url: req.url,
              method: req.method
            })
            throw error
          }
        }

        // Check and delete parent if exists
        if (campApplication.parent) {
          try {
            await prisma.parent.delete({
              where: { id: campApplication.parent.id }
            })
          } catch (error: any) {
            await createLog('error', `Error deleting parent: ${error.message}`, {
              location: ['camp-application route - DELETE /api/camp/delete-camp-application'],
              message: `Failed to delete parent with ID: ${campApplication.parent.id}`,
              errorLocation: parseStack(JSON.stringify(error)),
              errorMessage: error.message,
              errorName: error.name || 'UnknownError',
              timestamp: new Date().toISOString(),
              url: req.url,
              method: req.method
            })
            throw error
          }
        }

        // Check and delete address if exists
        if (campApplication.address) {
          try {
            await prisma.address.delete({
              where: { id: campApplication.address.id }
            })
          } catch (error: any) {
            await createLog('error', `Error deleting address: ${error.message}`, {
              location: ['camp-application route - DELETE /api/camp/delete-camp-application'],
              message: `Failed to delete address with ID: ${campApplication.address.id}`,
              errorLocation: parseStack(JSON.stringify(error)),
              errorMessage: error.message,
              errorName: error.name || 'UnknownError',
              timestamp: new Date().toISOString(),
              url: req.url,
              method: req.method
            })
            throw error
          }
        }

        // Delete the camp application itself
        try {
          await prisma.campApplication.delete({
            where: { id: campApplication.id }
          })

          await createLog('info', 'Camp application deleted', {
            location: ['camp-application route - DELETE /api/camp/delete-camp-application'],
            message: `Camp application with ID ${campApplication.id} deleted successfully`,
            name: 'CampApplicationDeleted',
            timestamp: new Date().toISOString(),
            url: req.url,
            method: req.method
          })

          deletedIds.push(campApplication.id)
        } catch (error: any) {
          await createLog('error', `Error deleting camp application: ${error.message}`, {
            location: ['camp-application route - DELETE /api/camp/delete-camp-application'],
            message: `Failed to delete camp application with ID: ${campApplication.id}`,
            errorLocation: parseStack(JSON.stringify(error)),
            errorMessage: error.message,
            errorName: error.name || 'UnknownError',
            timestamp: new Date().toISOString(),
            url: req.url,
            method: req.method
          })
          throw error
        }
      } catch {
        // Skip failed deletions and continue with others
        continue
      }
    }

    // Return only the array of successfully deleted IDs
    return NextResponse.json({ deletedIds }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Unexpected error: ${error.message}`, {
      location: ['camp-application route - DELETE /api/camp/delete-camp-application'],
      message: `An unexpected error occurred: ${error.message}`,
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })
    return NextResponse.json(
      { message: 'Error deleting camp application(s)', error, sliceName: sliceCamp },
      { status: 500 }
    )
  }
}
