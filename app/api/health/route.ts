import prisma from '@/prisma/client'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const userAgent = request.headers.get('user-agent') || 'unknown'

  console.log('🤖 Health check - User Agent:', userAgent)

  try {
    const start = Date.now()
    await prisma.$queryRaw`SELECT 1`
    const duration = Date.now() - start

    return Response.json({
      status: 'ok',
      db: 'connected',
      ping: `${duration}ms`,
      time: new Date().toISOString()
    })
  } catch (error) {
    return Response.json({ status: 'error', error: String(error) }, { status: 503 })
  }
}
