import CampApplicationsClient from '@/app/components/v2/pages/CampApplicationsClient'
import prisma from '@/prisma/client'

export default async function CampApplicationsPage() {
  const [campApplications, setting] = await Promise.all([
    prisma.campApplication
      .findMany({
        include: { Student: true, Address: true, Parent: true },
        orderBy: { createdAt: 'desc' }
      })
      .catch(() => []),
    prisma.siteSetting
      .findUnique({
        where: { key: 'campApplicationsEnabled' }
      })
      .catch(() => null)
  ])

  return <CampApplicationsClient campApplications={campApplications} setting={setting} />
}
