import prisma from '@/prisma/client'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const start = Date.now()
    await prisma.$queryRaw`SELECT 1`
    const duration = Date.now() - start

    return Response.json({
      status: 'ok',
      database: 'connected',
      responseTime: `${duration}ms`,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return Response.json(
      {
        status: 'error',
        database: 'disconnected',
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    )
  }
}
