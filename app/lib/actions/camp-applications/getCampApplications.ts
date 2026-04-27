import prisma from '@/prisma/client'

export const getCampApplications = async () => {
  try {
    const campApplications = await prisma.campApplication.findMany({
      include: {
        Address: true,
        Student: true,
        Parent: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return {
      campApplications,
      count: campApplications.length,
      noCampApplications: campApplications.length === 0
    }
  } catch {
    return {
      campApplications: [],
      count: 0,
      noCampApplications: 0
    }
  }
}
