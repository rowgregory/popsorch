'use server'

import prisma from '@/prisma/client'

export async function getDatabaseHealth() {
  // Get total connection count (including monitoring queries)
  const connections = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*) as count 
    FROM pg_stat_activity 
    WHERE datname = current_database()
  `.catch(() => [{ count: BigInt(0) }])

  // Get connection states breakdown (exclude monitoring queries from display)
  const activeQueries = (await prisma.$queryRaw<
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
      AND query NOT LIKE '%pg_stat_activity%'
    GROUP BY state, LEFT(query, 100)
    ORDER BY count DESC
  `.catch(() => [])) as Array<{
    state: string
    query: string
    count: bigint
  }>

  const longQueries = (await prisma.$queryRaw<
    Array<{
      pid: number
      duration: string
      query: string
    }>
  >`
    SELECT 
      pid,
      now() - pg_stat_activity.query_start AS duration,
      LEFT(query, 100) as query
    FROM pg_stat_activity
    WHERE state = 'active'
      AND now() - pg_stat_activity.query_start > interval '5 seconds'
      AND query NOT LIKE '%pg_stat_activity%'
    ORDER BY duration DESC
  `.catch(() => [])) as Array<{
    pid: number
    duration: string
    query: string
  }>

  return {
    activeConnections: Number(connections[0]?.count || 0),
    maxConnections: 100,
    activeQueries: activeQueries.map((q) => ({
      state: q.state,
      query: q.query,
      count: Number(q.count)
    })),
    longQueries: longQueries.map((q) => ({
      pid: q.pid,
      duration: q.duration,
      query: q.query
    }))
  }
}
