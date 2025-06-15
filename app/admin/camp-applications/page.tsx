'use client'

import React from 'react'
import AdminCampApplicationRow from '@/app/components/admin/AdminCampApplicationRow'
import AdminCampApplicationViewDrawer from '@/app/drawers/AdminCampApplicationViewDrawer'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import { RootState, useAppSelector } from '@/app/redux/store'
import { useFetchCampApplicationsQuery } from '@/app/redux/services/campApi'

const CampApplications = () => {
  const { noCampApplications, campApplicationsCount } = useAppSelector((state: RootState) => state.camp)

  const { data, isLoading } = useFetchCampApplicationsQuery(undefined) as any

  return (
    <div className="relative">
      <AdminCampApplicationViewDrawer />
      <div className="flex gap-y-10 760:gap-y-0 flex-col 760:flex-row 760:items-center 760:justify-between mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal
          bgcolor="bg0blue-400"
          textcolor="text-blue-400"
          title="Camp Applications"
          total={campApplicationsCount}
          loading={isLoading}
          fillcolor="fill-blue-400"
        />
      </div>
      {isLoading ? (
        <AdminPageSpinner fill="fill-blue-400" />
      ) : noCampApplications ? (
        <div className="font-sm font-lato">No Camp Applications</div>
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[3fr_3fr_2fr_2fr_2fr] gap-x-4 rounded-md pl-4 py-2 pr-2 mb-3 text-sm min-w-[600px]">
              <div className="whitespace-nowrap">First Name</div>
              <div className="whitespace-nowrap">Last Name</div>
              <div className="whitespace-nowrap">Student Email</div>
              <div className="whitespace-nowrap">Date Created</div>
              <div></div>
            </div>
            <div className="flex flex-col gap-y-3 min-w-[600px]">
              {data?.campApplications?.map((application: { id: string }) => (
                <AdminCampApplicationRow key={application.id} application={application} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CampApplications
