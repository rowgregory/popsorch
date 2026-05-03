import CampApplicationsClient from '@/app/components/pages/CampApplicationsClient'
import { FullApplication } from '@/app/types/entities/camp-application'
import prisma from '@/prisma/client'

export default async function CampApplicationsPage() {
  const [campApplications, setting] = await Promise.all([
    prisma.campApplication
      .findMany({
        include: { Student: true, Parent: true, Address: true },
        orderBy: { createdAt: 'desc' }
      })
      .catch(() => [] as FullApplication[]),
    prisma.siteSetting.findUnique({ where: { key: 'campApplicationsEnabled' } }).catch(() => null)
  ])

  return <CampApplicationsClient campApplications={campApplications as FullApplication[]} setting={setting} />
}
