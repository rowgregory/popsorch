import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { sliceCamp } from '@/public/data/api.data'

export async function POST(req: NextRequest) {
  const body = await req.json()
  try {
    const {
      consent,
      musicTeacher,
      strings,
      woodwinds,
      brassAndPercussion,
      referralSource,
      studentFirstName,
      studentLastName,
      grade,
      school,
      studentEmailAddress,
      studentPhoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      zipPostalCode,
      parentFirstName,
      parentLastName,
      relationshipToStudent,
      parentEmailAddress,
      parentPhoneNumber
    } = body

    const createdCampApplication = await prisma.campApplication.create({
      data: {
        consent,
        musicTeacher,
        strings,
        woodwinds,
        brassAndPercussion,
        referralSource,
        student: {
          create: {
            firstName: studentFirstName,
            lastName: studentLastName,
            grade,
            school,
            studentEmailAddress,
            studentPhoneNumber
          }
        },
        address: {
          create: {
            addressLine1,
            addressLine2,
            city,
            state,
            zipPostalCode
          }
        },
        parent: {
          create: {
            firstName: parentFirstName,
            lastName: parentLastName,
            relationshipToStudent,
            parentEmailAddress,
            parentPhoneNumber
          }
        }
      }
    })

    await createLog('info', 'New camp application created', {
      location: ['camp-application route - POST /api/camp/create-camp-application'],
      message: `Camp application successfully created for: ${studentEmailAddress}`,
      name: 'CampApplicationCreated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: { studentFirstName, studentLastName, studentEmailAddress }
    })

    return NextResponse.json(
      {
        campApplication: createdCampApplication,
        message: 'Thank you for submitting your application! We’ve received it and will be in touch soon',
        sliceName: sliceCamp
      },
      { status: 201 }
    )
  } catch (error: any) {
    await createLog('error', `Creating camp application failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: {
        studentFirstName: body?.studentFirstName,
        studentLastName: body?.studentLastName,
        studentEmail: body?.studentEmail
      }
    })
    return NextResponse.json(
      { message: 'Error creating camp application', error, sliceName: sliceCamp },
      { status: 500 }
    )
  }
}
