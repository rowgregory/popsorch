'use server'

import { getDashboardData } from '@/app/actions/dashboard-actions'

import AdminClientLayout from './AdminLayoutClient'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const dashboardData = await getDashboardData()

  return <AdminClientLayout dashboardData={dashboardData}>{children}</AdminClientLayout>
}
