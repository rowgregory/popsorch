import { getDashboardStats } from '@/app/actions/getDashboardStats'
import Dashboard from './page'

export default async function DashboardLayout() {
  const data = await getDashboardStats()
  return <Dashboard data={data} />
}
