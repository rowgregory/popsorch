import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Add connection pool params to the URL
const getDatabaseUrl = () => {
  const baseUrl = process.env.DATABASE_URL
  if (!baseUrl) {
    console.warn('DATABASE_URL not set, using default connection')
    return undefined
  }

  try {
    const url = new URL(baseUrl)
    url.searchParams.set('connection_limit', '5')
    url.searchParams.set('pool_timeout', '10')
    url.searchParams.set('connect_timeout', '10')
    return url.toString()
  } catch (error) {
    console.error('Invalid DATABASE_URL format:', error)
    return baseUrl // fallback to original URL
  }
}

const createPrismaClient = () => {
  const databaseUrl = getDatabaseUrl()

  return new PrismaClient({
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'stdout', level: 'error' },
      { emit: 'stdout', level: 'warn' }
    ],
    ...(databaseUrl && {
      datasources: {
        db: {
          url: databaseUrl
        }
      }
    })
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Log slow queries in production
prisma.$on('query', (e: any) => {
  // Log all queries with duration in production
  if (process.env.NODE_ENV === 'production') {
    console.log(`[QUERY] ${e.duration}ms: ${e.query.substring(0, 150)}`)
  }

  // Flag slow queries
  if (e.duration > 2000) {
    console.error('🐌 SLOW QUERY:', {
      duration: `${e.duration}ms`,
      query: e.query,
      params: e.params
    })
  }
})

// Only connect if DATABASE_URL is available
if (process.env.DATABASE_URL) {
  prisma.$connect().catch((e) => {
    console.error('Failed to connect to database:', e)
  })

  // Graceful shutdown
  const shutdown = async () => {
    await prisma.$disconnect()
    process.exit(0)
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

// Periodic connection cleanup (production only)
if (process.env.NODE_ENV === 'production') {
  setInterval(async () => {
    try {
      await prisma.$disconnect()
      await prisma.$connect()
      console.log('✅ Connection pool refreshed')
    } catch (error) {
      console.error('❌ Connection refresh failed:', error)
    }
  }, 1800000) // Every 30 minutes
}

export default prisma
