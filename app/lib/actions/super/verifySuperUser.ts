import { redirect } from 'next/navigation'
import { auth } from '../../auth'
import prisma from '@/prisma/client'

export async function verifySuperUser() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const user = await prisma.user
    .findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })
    .catch(() => null)

  if (user?.role !== 'SUPER_USER') redirect('/v2/dashboard')
}
