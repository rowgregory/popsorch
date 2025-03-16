import React, { FormEvent } from 'react'
import { useLogoutMutation } from '@/app/redux/services/authApi'
import AwesomeIcon from '../common/AwesomeIcon'
// import AppleLoader from '../common/AppleLoader'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/app/redux/store'
import { setAuthState } from '@/app/redux/features/authSlice'
import Link from 'next/link'
import { signOutAltIcon } from '@/app/lib/icons'

const AdminHeader = () => {
  const dispatch = useAppDispatch()
  const [logout, { isLoading, error }] = useLogoutMutation()
  const { push } = useRouter()

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault()
    await logout({})
      .unwrap()
      .then(() => {
        dispatch(setAuthState({}))
        push('/auth/login')
      })
      .catch(() => {})
  }

  const errorMessage = error && typeof error === 'object' && 'data' in error ? (error as any)?.data?.message : null

  return (
    <header className="sticky top-0 z-50 px-4 w-full bg-gray-200 dark:bg-deepblack h-12 flex items-center justify-between">
      <Link href="/" className="font-rubik font-semibold">
        The Pops Orchestra
      </Link>
      <div className="flex items-center gap-x-4">
        {errorMessage && <div className="text-13 text-red-500">{errorMessage}</div>}
        <button disabled={isLoading} onClick={handleLogout}>
          {isLoading ? <></> : <AwesomeIcon icon={signOutAltIcon} className="w-4 h-4" />}
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
