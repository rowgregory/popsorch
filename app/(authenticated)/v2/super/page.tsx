import { redirect } from 'next/navigation'
import { auth } from '@/app/lib/auth'
import SuperClient from '@/app/components/v2/pages/SuperClient'
import { getSuperDashboardData } from '@/app/lib/actions/super/fetchSuperDashboardData'

export default async function SuperPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')
  if (session.user.role !== 'SUPER_USER') redirect('/v2/dashboard')

  const data = await getSuperDashboardData()

  return (
    <SuperClient
      customRequests={data.customRequests}
      concerts={data.concerts}
      venues={data.venues}
      teamMembers={data.teamMembers}
      news={data.news}
      events={data.events}
      testimonials={data.testimonials}
      sponsors={data.sponsors}
      questions={data.questions}
      users={data.users}
      dbHealth={data.dbHealth}
    />
  )
}
