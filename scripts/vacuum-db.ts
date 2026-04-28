import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function vacuum() {
  try {
    console.log('Running VACUUM FULL ANALYZE...')
    await prisma.$executeRawUnsafe('VACUUM FULL ANALYZE;')
    console.log('✅ Database vacuumed successfully')
  } catch (error) {
    console.error('❌ Vacuum failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

vacuum()
