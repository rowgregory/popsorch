'use client'

import React, { FC } from 'react'
import Link from 'next/link'
import { ChildrenProps } from '@/app/types/common.types'
import useCustomPathname from '../hooks/useCustomPathname'
import { adminNavigationLinkData } from '@/public/data/navigation-link.data'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { useLogoutMutation } from '../redux/services/authApi'
import { useRouter } from 'next/navigation'
import { useFetchDashboardDataQuery } from '../redux/services/appApi'
import LogoSVG from '../components/svg/LogoSVG'
import { barsIcon } from '../lib/icons'
import { openNavigationDrawer } from '../redux/features/dashboardSlice'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import AdminNavigationDrawer from '../drawers/AdminNavigationDrawer'
import { resetAuth } from '../redux/features/authSlice'
import { getErrorMessage } from '../utils/logHelper'
import { useFetchSubscribersQuery } from '../redux/services/mailchimpApi'
import { useSendPushNotificationMutation } from '../redux/services/pushNotificationApi'

interface FetchDashboardDataQueryTypes {
  error: { data: { message: string } }
}

const AdminLayout: FC<ChildrenProps> = ({ children }) => {
  useFetchSubscribersQuery({})
  const { error: errorFetchingDashboardData } = useFetchDashboardDataQuery<FetchDashboardDataQueryTypes>({})
  const dispatch = useAppDispatch()
  const path = useCustomPathname()
  const { push } = useRouter()
  const { user } = useAppSelector((state: RootState) => state.user)
  const items = adminNavigationLinkData(path, user.role)
  const [logout, { error: errorLogout }] = useLogoutMutation()
  const { error: dashboardError } = useAppSelector((state: RootState) => state.dashboard)
  const [sendPushNotification] = useSendPushNotificationMutation()

  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    dispatch(resetAuth())

    try {
      await logout({ id: user.id }).unwrap()
      const storedSubscription = localStorage.getItem('pushSubscription')
      const subscription = storedSubscription ? JSON.parse(storedSubscription) : null

      try {
        if (subscription && subscription.endpoint) {
          await sendPushNotification({
            endpoint: subscription.endpoint,
            keys: subscription.keys,
            message: 'Logout successful'
          }).unwrap()
        }
      } catch {}
      push('/auth/login')
    } catch {}
  }

  return (
    <>
      <AdminNavigationDrawer />
      <div className="flex">
        <aside className="hidden 760:block fixed top-0 left-0 w-20 h-screen z-10 px-1 pb-20">
          <div className="flex flex-col justify-between h-full overflow-y-auto">
            <div>
              <Link href="/">
                <LogoSVG fillPath="fill-white" className="text-blaze h-fit py-4" />
              </Link>
              <div className="flex flex-col items-center gap-y-2 mt-7">
                {items?.map((link, i) => (
                  <Link
                    key={i}
                    href={link.linkKey}
                    onClick={link.textKey === 'Logout' ? handleLogout : () => {}}
                    className="py-2.5 flex flex-col items-center justify-center group"
                  >
                    <div
                      className={`w-10 h-10 duration-150 group-hover:scale-100 group-hover:bg-[#2b2b2b] flex items-center justify-center rounded-md mb-1.5 ${
                        link.active ? 'bg-[#2b2b2b]' : ''
                      }`}
                    >
                      <AwesomeIcon
                        icon={link.icon}
                        className={`w-5 h-5 ${link.active ? link.color : 'text-zinc-400'} group-hover:${link.color}`}
                      />
                    </div>
                    <span className="text-12 text-center font-changa uppercase">{link.textKey}</span>
                  </Link>
                ))}
              </div>
              {errorLogout && (
                <div className="text-blaze text-12 font-changa text-center">{getErrorMessage(errorLogout)}</div>
              )}
            </div>
          </div>
        </aside>
        <main className="bg-duskgray 760:ml-20 pt-5 pb-8 px-4 760:px-12 min-h-dvh w-full h-full">
          <AwesomeIcon
            onClick={() => dispatch(openNavigationDrawer())}
            icon={barsIcon}
            className="w-6 h-6 fixed block top-10 right-4 760:hidden cursor-pointer z-30"
          />
          {errorFetchingDashboardData || dashboardError ? (
            <div className="font-changa text-2xl text-blaze">
              {errorFetchingDashboardData?.data?.message || dashboardError?.data?.message}
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </>
  )
}

export default AdminLayout
