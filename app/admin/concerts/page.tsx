'use client'

import React from 'react'
import CreateBtn from '@/app/components/admin/CreateBtn'
import AdminConcertCreateDrawer from '@/app/drawers/AdminConcertCreateDrawer'
import { openCreateDrawer } from '@/app/redux/features/dashboardSlice'
import AdminConcertUpdateDrawer from '@/app/drawers/AdminConcertUpdateDrawer'
import AdminConcertRow from '@/app/components/admin/AdminConcertRow'
import ToastMessage from '@/app/components/common/ToastMessage'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import { ConcertProps, resetConcertError } from '@/app/redux/features/concertSlice'
import { RootState, useAppSelector } from '@/app/redux/store'

const Concerts = () => {
  const { error, concerts, concertsCount, noConcerts } = useAppSelector((state: RootState) => state.concert)
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <div className="relative">
      <AdminConcertCreateDrawer />
      <AdminConcertUpdateDrawer />
      <ToastMessage message={error} resetError={() => resetConcertError()} />
      <div className="flex gap-y-10 760:gap-y-0 flex-col 760:flex-row 760:items-center 760:justify-between mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal
          title="Concerts"
          total={concertsCount}
          bgcolor="bg-pink-400"
          textcolor="text-pink-400"
          loading={loading}
          fillcolor="fill-pink-400"
        />
        <CreateBtn
          btnText="Create Concert"
          createFunc={openCreateDrawer}
          bgColor="bg-pink-400"
          hvbgcolor="bg-pink-500"
        />
      </div>
      {loading ? (
        <AdminPageSpinner fill="fill-pink-400" />
      ) : noConcerts ? (
        <div className="font-sm font-lato">No Concerts</div>
      ) : (
        concerts && (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-[4fr_4fr_3fr_1fr] gap-x-4 rounded-md pl-4 py-2 pr-2 mb-3 text-sm min-w-[600px]">
                <div className="whitespace-nowrap">Name</div>
                <div className="whitespace-nowrap">Date</div>
                <div className="whitespace-nowrap">Is On Sale</div>
                <div className="whitespace-nowrap"></div>
              </div>
              <div className="flex flex-col gap-y-3 w-full min-w-[600px]">
                {concerts?.map((concert: ConcertProps) => (
                  <AdminConcertRow key={concert.id} concert={concert} />
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default Concerts
