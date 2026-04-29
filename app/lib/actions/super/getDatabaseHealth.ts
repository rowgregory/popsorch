'use server'

import prisma from '@/prisma/client'

export async function getDatabaseHealth() {
  const connections = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*) as count 
    FROM pg_stat_activity 
    WHERE datname = current_database()
  `.catch(() => [{ count: BigInt(0) }])

  // NEW: See what's holding connections open
  const activeQueries = await prisma.$queryRaw<
    Array<{
      state: string
      query: string
      count: bigint
    }>
  >`
    SELECT 
      state,
      LEFT(query, 100) as query,
      COUNT(*) as count
    FROM pg_stat_activity
    WHERE datname = current_database()
    GROUP BY state, LEFT(query, 100)
    ORDER BY count DESC
  `.catch(() => [])

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
    maxConnections: 100,
    activeQueries: activeQueries.map((q) => ({
      state: q.state,
      query: q.query,
      count: Number(q.count)
    })),
    longQueries
  }
}
