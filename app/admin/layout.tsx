'use client'

import AdminHeader from '@/app/components/admin/AdminHeader'
import AwesomeIcon from '@/app/components/common/AwesomeIcon'
import { barsIcon } from '@/app/lib/icons'
// import { useAppDispatch } from '@/app/redux/store'
import { ChildrenProps } from '@/app/types/common.types'
import React, { FC } from 'react'
import NavigationLayout from './navigation-layout'
import AdminLunchCreateModal from '../modals/AdminLunchCreateModal'

const AdminLayout: FC<ChildrenProps> = ({ children }) => {
  // const dispatch = useAppDispatch()

  return (
    <div className="bg-white dark:bg-black">
      <AdminHeader />
      <AdminLunchCreateModal />
      <main className="px-3 py-8 min-h-[calc(100vh-48px)] relative">
        <AwesomeIcon
          // onClick={() => dispatch(setOpenDrawerAdminNav())}
          icon={barsIcon}
          className="w-5 h-4 block 760:hidden absolute top-4 left-4 cursor-pointer"
        />
        {/* <AdminNavigationDrawer /> */}
        <div className="max-w-96 760:max-w-[690px] 1160:max-w-[1035px] 1690:max-w-[1380px] mx-auto w-full">
          <NavigationLayout>{children}</NavigationLayout>
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
