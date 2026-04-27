'use server'

import prisma from '@/prisma/client'
import { createLog } from '../../../utils/logHelper'
import { campApplicationTemplate } from '../../email-templates/camp-application'
import { resend } from '../../resend'

export async function createCampApplication(data: {
  // Student
  firstName: string
  lastName: string
  grade: string
  school: string
  studentEmailAddress: string
  studentPhoneNumber: string
  // Address
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  zipPostalCode: string
  // Parent
  parentFirstName: string
  parentLastName: string
  relationshipToStudent?: string
  parentEmailAddress: string
  parentPhoneNumber: string
  // Music
  instrument: string
  musicTeacher?: string
  strings?: string
  brassAndPercussion?: string
  woodwinds?: string
  referralSource?: string
  consent: boolean
}) {
  try {
    const application = await prisma.campApplication.create({
      data: {
        consent: data.consent,
        instrument: data.instrument,
        musicTeacher: data.musicTeacher,
        strings: data.strings,
        brassAndPercussion: data.brassAndPercussion,
        woodwinds: data.woodwinds,
        referralSource: data.referralSource,
        Student: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
            grade: data.grade,
            school: data.school,
            studentEmailAddress: data.studentEmailAddress,
            studentPhoneNumber: data.studentPhoneNumber
          }
        },
        Address: {
          create: {
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            city: data.city,
            state: data.state,
            zipPostalCode: data.zipPostalCode
          }
        },
        Parent: {
          create: {
            firstName: data.parentFirstName,
            lastName: data.parentLastName,
            relationshipToStudent: data.relationshipToStudent,
            parentEmailAddress: data.parentEmailAddress,
            parentPhoneNumber: data.parentPhoneNumber
          }
        }
      },
      include: {
        Student: true,
        Address: true,
        Parent: true
      }
    })

    await createLog('info', 'Camp application created successfully', {
      applicationId: application.id,
      studentName: `${data.firstName} ${data.lastName}`,
      studentEmail: data.studentEmailAddress
    })

    await resend.emails.send({
      from: 'The Pops Orchestra <noreply@thepopsorchestra.org>',
      to: ['info@thepopsorchestra.org', 'robyn@thepopsorchestra.org'],
      subject: 'New Camp Application Received',
      html: campApplicationTemplate(data.firstName, data.lastName, data.studentEmailAddress)
    })

    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create camp application'

    await createLog('error', 'Failed to create camp application', {
      error: errorMessage,
      studentName: `${data.firstName} ${data.lastName}`,
      studentEmail: data.studentEmailAddress
    })

    throw new Error(errorMessage)
  }
}
