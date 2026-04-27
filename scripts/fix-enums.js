import prisma from '../prisma/client.ts'

async function main() {
  await prisma.$executeRawUnsafe(`UPDATE "TeamMember" SET role = 'STAFF'::"TeamMemberRole" WHERE role::text = 'Staff'`)
  await prisma.$executeRawUnsafe(
    `UPDATE "TeamMember" SET role = 'MUSICIAN'::"TeamMemberRole" WHERE role::text = 'Musician'`
  )
  await prisma.$executeRawUnsafe(
    `UPDATE "TeamMember" SET role = 'BOARD_MEMBER'::"TeamMemberRole" WHERE role::text = 'Board-Member'`
  )
  console.log('TeamMember roles fixed')
}

main().then(() => prisma.$disconnect())
