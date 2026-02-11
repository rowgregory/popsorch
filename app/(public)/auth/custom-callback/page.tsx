'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function CustomCallback() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (session?.user) {
      const { role } = session.user

      if (role === 'ADMIN' || role === 'SUPERUSER') {
        router.push('/admin/dashboard')
      } else {
        router.push('/supporter/overview')
      }
    } else {
      router.push('/auth/login')
    }
  }, [session, status, router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Progress Dots */}
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-blaze animate-pulse"></div>
        <div className="w-2 h-2 bg-blaze animate-pulse [animation-delay:0.2s]"></div>
        <div className="w-2 h-2 bg-blaze animate-pulse [animation-delay:0.4s]"></div>
      </div>
    </div>
  )
}
