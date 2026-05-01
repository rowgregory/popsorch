'use server'

import { getDatabaseHealth } from './getDatabaseHealth'
import { getSuperCustomRequests } from './inividualCachedQueries'

export async function getSuperDashboardData() {
  const [customRequests, dbHealth] = await Promise.all([getSuperCustomRequests(), getDatabaseHealth()])
  return { customRequests, dbHealth }
}
