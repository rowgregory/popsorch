import { getSupporterData } from '@/app/actions/getSupporterData'
import SupporterOverviewClient from '@/app/components/pages/SupporterOverviewClient'
import { auth } from '@/app/lib/auth'
import { redirect } from 'next/navigation'

export default async function SupporterOverviewPage() {
  const session = await auth()

  if (!session?.user) redirect('/auth/login')

  const data = await getSupporterData(session.user.email as string)
  return <SupporterOverviewClient data={data} user={session.user} />
}
