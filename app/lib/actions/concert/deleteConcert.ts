'use server'

import prisma from '@/prisma/client'
import { auth } from '../../auth'
import { createLog } from '@/app/utils/logHelper'

export async function deleteConcert(concertId: string) {
  if (!concertId) return { success: false, error: 'Concert ID is required' }

  const session = await auth()

  const user = await prisma.user
    .findUnique({
      where: { email: session?.user?.email ?? '' },
      select: { firstName: true, lastName: true, email: true }
    })
    .catch(() => null)

  const concert = await prisma.concert
    .delete({
      where: { id: concertId }
    })
    .catch(() => null)

  if (!concert) return { success: false, error: 'Failed to delete concert' }

  await createLog('info', `Concert "${concert.name}" deleted`, {
    concertId: concert.id,
    concertName: concert.name,
    type: concert.type,
    deletedBy: `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || user?.email || 'unknown'
  }).catch(() => null)

  return { success: true }
}
