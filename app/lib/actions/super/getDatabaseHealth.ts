// lib/actions/super/getDatabaseHealth.ts
'use server'

import prisma from '@/prisma/client'

export async function getDatabaseHealth() {
  const connections = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*) as count 
    FROM pg_stat_activity 
    WHERE datname = current_database()
  `.catch(() => [{ count: BigInt(0) }])

  const longQueries = await prisma.$queryRaw<
    Array<{
      pid: number
      duration: string
      query: string
    }>
  >`
  SELECT 
    pid,
    now() - pg_stat_activity.query_start AS duration,
    query
  FROM pg_stat_activity
  WHERE state = 'active'
    AND now() - pg_stat_activity.query_start > interval '5 seconds'
  ORDER BY duration DESC
`.catch(() => [])

  return {
    activeConnections: Number(connections[0]?.count || 0),
    maxConnections: 100, // Railway's limit
    longQueries
  }
}
