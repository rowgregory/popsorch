'use client'

import React from 'react'
import CreateBtn from '@/app/components/admin/CreateBtn'
import AdminConcertCreateDrawer from '@/app/drawers/AdminConcertCreateDrawer'
import { openCreateDrawer } from '@/app/redux/features/dashboardSlice'
import { ConcertProps } from '@/app/redux/features/formSlice'
import { RootState, useAppSelector } from '@/app/redux/store'
import AdminConcertUpdateDrawer from '@/app/drawers/AdminConcertUpdateDrawer'
import AdminConcertRow from '@/app/components/admin/AdminConcertRow'
import ToastMessage from '@/app/components/common/ToastMessage'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import { resetConcertError } from '@/app/redux/features/concertSlice'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'

const Concerts = () => {
  const { concerts, error } = useAppSelector((state: RootState) => state.concert)
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <>
      <AdminConcertCreateDrawer />
      <AdminConcertUpdateDrawer />
      <ToastMessage message={error} resetError={() => resetConcertError()} />
      <div className="flex gap-y-10 760:gap-y-0 flex-col 760:flex-row 760:items-center 760:justify-between mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal title="Concerts" total={concerts?.length} bgcolor="bg-pink-400" textcolor="text-pink-400" />
        <CreateBtn
          btnText="Create Concert"
          createFunc={openCreateDrawer}
          bgColor="bg-pink-400"
          hvbgcolor="bg-pink-500"
        />
      </div>
      {loading ? (
        <AdminPageSpinner fill="fill-pink-400" />
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-[3fr_7fr_2fr_2fr_auto] gap-x-4 rounded-md pl-4 py-2 pr-2 mb-3 text-sm">
              <div className="min-w-[200px]">Name</div>
              <div className="min-w-[280px] truncate">Desc</div>
              <div className="min-w-[120px]">Date</div>
              <div className="min-w-[120px]">Is On Sale</div>
              <div className="min-w-[40px]"></div>
            </div>
            <div className="flex flex-col gap-y-3">
              {concerts?.map((concert: ConcertProps) => (
                <AdminConcertRow key={concert.id} concert={concert} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Concerts
