import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error']
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// prisma/client.ts - add after createPrismaClient
if (process.env.NODE_ENV === 'production') {
  setInterval(async () => {
    const connections = await prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count 
      FROM pg_stat_activity 
      WHERE datname = current_database()
    `.catch(() => [{ count: BigInt(0) }])

    const count = Number(connections[0]?.count || 0)

    if (count > 25) {
      console.warn(`⚠️ HIGH DB CONNECTIONS: ${count}/100`)
    }
  }, 300000) // Check every 5 minutes
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
