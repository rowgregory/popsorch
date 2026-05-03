import { redirect } from 'next/navigation'
import { auth } from '../lib/auth'
import { SessionProvider } from 'next-auth/react'

export default async function AuthenticatedLayout({ children }) {
  const session = await auth()
  if (!session) redirect('/auth/login')

  return <SessionProvider session={session}>{children}</SessionProvider>
}
