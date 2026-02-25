import prisma from '@/prisma/client'

export const getCampApplications = async () => {
  try {
    const campApplications = await prisma.campApplication.findMany({
      include: {
        address: true,
        student: true,
        parent: true
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
