import CampApplicationsClient from '@/app/components/v2/pages/CampApplicationsClient'
import { FullApplication } from '@/app/types/entities/camp-application'
import prisma from '@/prisma/client'

export default async function CampApplicationsPage() {
  const campApplications = (await prisma.campApplication
    .findMany({
      include: { Student: true, Parent: true, Address: true },
      orderBy: { createdAt: 'desc' }
    })
    .catch(() => [] as FullApplication[])) as FullApplication[]

  const setting = await prisma.siteSetting
    .findUnique({
      where: { key: 'campApplicationsEnabled' }
    })
    .catch(() => null)

  return <CampApplicationsClient campApplications={campApplications} setting={setting} />
}
