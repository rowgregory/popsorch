import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { sliceCamp } from '@/public/data/api.data'

export async function DELETE(req: NextRequest) {
  const { campApplicationId } = await req.json()

  try {
    // Ensure the camp application ID is provided
    if (!campApplicationId) {
      await createLog('error', 'Camp application ID missing', {
        location: ['camp-application route - DELETE /api/camp/delete-camp-application'],
        message: 'Camp application ID is required',
        name: 'MissingCampApplicationId',
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method
      })

      return NextResponse.json({ message: 'Camp application ID is required' }, { status: 400 })
    }

    // Find the camp application by ID
    const campApplication = await prisma.campApplication.findUnique({
      where: { id: campApplicationId },
      include: {
        student: true,
        parent: true,
        address: true
      }
    })

    if (!campApplication) {
      await createLog('error', 'Camp application not found', {
        location: ['camp-application route - DELETE /api/camp/delete-camp-application'],
        message: `No camp application found with ID: ${campApplicationId}`,
        name: 'CampApplicationNotFound',
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method
      })

      return NextResponse.json({ message: 'Camp application not found' }, { status: 404 })
    }

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
        where: { id: campApplicationId }
      })
      await createLog('info', 'Camp application deleted', {
        location: ['camp-application route - DELETE /api/camp/delete-camp-application'],
        message: `Camp application with ID ${campApplicationId} deleted successfully`,
        name: 'CampApplicationDeleted',
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method
      })
    } catch (error: any) {
      await createLog('error', `Error deleting camp application: ${error.message}`, {
        location: ['camp-application route - DELETE /api/camp/delete-camp-application'],
        message: `Failed to delete camp application with ID: ${campApplicationId}`,
        errorLocation: parseStack(JSON.stringify(error)),
        errorMessage: error.message,
        errorName: error.name || 'UnknownError',
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method
      })
      throw error
    }

    // Return success response
    return NextResponse.json(
      { message: 'Camp application and all associated data successfully deleted' },
      { status: 200 }
    )
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
      { message: 'Error deleting camp application', error, sliceName: sliceCamp },
      { status: 500 }
    )
  }
}
