// import { getCampApplicationsById } from '@/app/actions/getCampApplicationsById'
import { getCampApplicationsSetting } from '@/app/actions/getCampApplicationsSetting'
import { getNewsletterSubscriptionStatus } from '@/app/actions/getNewsletterSubscriptionStatus'
import SupporterOverviewClient from '@/app/components/pages/SupporterOverviewClient'
import { auth } from '@/app/lib/auth'

export default async function SupporterOverviewPage() {
  const session = await auth()
  const campApplicationsSetting = await getCampApplicationsSetting()
  const campApplications = [
    {
      id: 'camp_01',
      instrument: 'Violin',
      musicTeacher: 'Mrs. Patricia Henley',
      strings: 'Violin',
      brassAndPercussion: null,
      woodwinds: null,
      referralSource: 'School newsletter',
      consent: true,
      createdAt: new Date('2026-02-14T10:30:00Z'),
      updatedAt: new Date('2026-02-14T10:30:00Z'),
      student: {
        id: 'student_01',
        firstName: 'Emma',
        lastName: 'Caldwell',
        grade: '7th',
        school: 'Sarasota Middle School',
        studentEmailAddress: 'emma.caldwell@email.com',
        studentPhoneNumber: '941-555-0182',
        campApplicationId: 'camp_01'
      },
      address: {
        id: 'address_01',
        addressLine1: '412 Osprey Ave',
        addressLine2: null,
        city: 'Sarasota',
        state: 'FL',
        zipPostalCode: '34239',
        campApplicationId: 'camp_01'
      },
      parent: {
        id: 'parent_01',
        firstName: 'Diane',
        lastName: 'Caldwell',
        relationshipToStudent: 'Mother',
        parentEmailAddress: 'diane.caldwell@email.com',
        parentPhoneNumber: '941-555-0143',
        campApplicationId: 'camp_01'
      }
    },
    {
      id: 'camp_02',
      instrument: 'Trumpet',
      musicTeacher: 'Mr. James Okafor',
      strings: null,
      brassAndPercussion: 'Trumpet',
      woodwinds: null,
      referralSource: 'Friend recommendation',
      consent: true,
      createdAt: new Date('2026-03-01T14:15:00Z'),
      updatedAt: new Date('2026-03-01T14:15:00Z'),
      student: {
        id: 'student_02',
        firstName: 'Marcus',
        lastName: 'Delray',
        grade: '9th',
        school: 'Riverview High School',
        studentEmailAddress: 'marcus.delray@email.com',
        studentPhoneNumber: '941-555-0274',
        campApplicationId: 'camp_02'
      },
      address: {
        id: 'address_02',
        addressLine1: '88 Bayshore Rd',
        addressLine2: 'Apt 3B',
        city: 'Bradenton',
        state: 'FL',
        zipPostalCode: '34205',
        campApplicationId: 'camp_02'
      },
      parent: {
        id: 'parent_02',
        firstName: 'Victor',
        lastName: 'Delray',
        relationshipToStudent: 'Father',
        parentEmailAddress: 'victor.delray@email.com',
        parentPhoneNumber: '941-555-0261',
        campApplicationId: 'camp_02'
      }
    }
  ]
  // const campApplications = await getCampApplicationsById()
  const newsletterStatus = await getNewsletterSubscriptionStatus()

  return (
    <SupporterOverviewClient
      isSubscribed={newsletterStatus?.isSubscribed}
      user={session.user}
      isCampActive={campApplicationsSetting?.value}
      campApplications={campApplications}
    />
  )
}
