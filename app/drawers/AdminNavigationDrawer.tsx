import React from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { homeIcon, timesIcon } from '../lib/icons'
import { closeNavigationDrawer } from '../redux/features/dashboardSlice'
import useCustomPathname from '../hooks/useCustomPathname'
import { adminNavigationLinkData } from '@/public/data/navigation-link.data'
import Link from 'next/link'
import { useLogoutMutation } from '../redux/services/authApi'
import { useRouter } from 'next/navigation'
import { getErrorMessage } from '../utils/logHelper'
import Spinner from '../components/common/Spinner'

const AdminNavigationDrawer = () => {
  const { navigationDrawer } = useAppSelector((state: RootState) => state.dashboard)
  const dispatch = useAppDispatch()
  const path = useCustomPathname()
  const items = adminNavigationLinkData(path, '')
  const [logout, { isLoading, error }] = useLogoutMutation()
  const { push } = useRouter()

  const handleLogout = async (e: any) => {
    e.preventDefault()

    try {
      await logout({}).unwrap()
      push('/auth/login')
    } catch {}
  }

  return (
    <div className="relative">
      <div
        className={`${
          navigationDrawer ? 'translate-x-0' : '-translate-x-full'
        } w-full h-full bg-duskgray z-40 p-20 fixed duration-700 inset-0`}
      >
        <AwesomeIcon
          onClick={() => dispatch(closeNavigationDrawer())}
          icon={timesIcon}
          className="w-5 h-5 absolute block top-12 right-4 760:hidden cursor-pointer z-10"
        />
        {[
          { textKey: 'Home', linkKey: '/', active: path === '/', color: 'text-orange-400', icon: homeIcon },
          ...items
        ]?.map((link, i) => (
          <Link
            key={i}
            href={link.linkKey}
            onClick={link.textKey === 'Logout' ? handleLogout : () => dispatch(closeNavigationDrawer())}
            className="py-2.5 flex items-center justify-center group"
          >
            {isLoading && link.textKey === 'Logout' ? (
              <Spinner fill="fill-blaze" track="text-duskgray" wAndH="w-10 h-10" />
            ) : (
              <div
                className={`w-10 h-10 duration-150 group-hover:scale-100 group-hover:bg-[#2b2b2b] flex items-center justify-center rounded-md ${
                  link.active ? 'bg-[#2b2b2b]' : ''
                }`}
              >
                <AwesomeIcon
                  icon={link.icon}
                  className={`w-5 h-5 ${link.active ? link.color : 'text-zinc-400'} group-hover:${link.color}`}
                />
              </div>
            )}
            <span className="text-12 text-center font-changa uppercase">{link.textKey}</span>
          </Link>
        ))}
        {error && <div className="text-blaze text-12 font-changa text-center">{getErrorMessage(error)}</div>}
      </div>
    </div>
  )
}

export default AdminNavigationDrawer
