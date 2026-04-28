import { buildLogMessage, getRequestContext } from '@/app/utils/parseUserAgent'
import prisma from '@/prisma/client'
import { getActor } from '../user/getActor'
import { createLog } from '@/app/utils/logHelper'

export const getCampApplications = async () => {
  const context = await getRequestContext()
  const actor = await getActor()

  const campApplications = await prisma.campApplication
    .findMany({
      include: {
        Address: true,
        Student: true,
        Parent: true
      },
      orderBy: { createdAt: 'desc' }
    })
    .catch(() => [])

  await createLog('info', await buildLogMessage('viewed camp applications', actor, context), {
    count: campApplications.length,
    request: context
  }).catch(() => null)

  return {
    campApplications,
    count: campApplications.length,
    noCampApplications: campApplications.length === 0
  }
}
