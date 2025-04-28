'use client'

import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import Spinner from '@/app/components/common/Spinner'
import AdminCampApplicationRow from '@/app/components/admin/AdminCampApplicationRow'
import AdminCampApplicationViewDrawer from '@/app/drawers/AdminCampApplicationViewDrawer'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'

const CampApplications = () => {
  const { campApplications } = useAppSelector((state: RootState) => state.camp)
  const { loading, campApplicationCount } = useAppSelector((state: RootState) => state.app)

  return (
    <>
      <AdminCampApplicationViewDrawer />
      <div className="mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal
          bgcolor="bg0blue-400"
          textcolor="text-blue-400"
          title="Camp Applications"
          total={campApplicationCount}
        />
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center pt-10">
          <Spinner wAndH="w-10 h-10" fill="fill-blue-400" track="text-duskgray" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-[1.5fr_1.5fr_3fr_2fr_2fr_auto] gap-x-4 rounded-md pl-4 py-2 pr-2 mb-3 text-sm text-zinc-400 font-semibold min-w-[900px]">
            <div className="min-w-[120px]">First Name</div>
            <div className="min-w-[120px]">Last Name</div>
            <div className="min-w-[200px]">Student Email</div>
            <div className="min-w-[160px]">Student Phone Number</div>
            <div className="min-w-[140px]">Date Created</div>
          </div>

          <div className="flex flex-col gap-y-3 min-w-[900px]">
            {campApplications?.map((application: { id: string }) => (
              <AdminCampApplicationRow key={application.id} application={application} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default CampApplications
