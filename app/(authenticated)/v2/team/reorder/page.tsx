import TeamReorderClient from '@/app/components/pages/TeamReorderClient'
import prisma from '@/prisma/client'

export default async function TeamReorderPage() {
  const teamMembers = await prisma.teamMember
    .findMany({
      orderBy: { displayOrder: 'asc' }
    })
    .catch(() => [])

  return <TeamReorderClient teamMembers={teamMembers} />
}
