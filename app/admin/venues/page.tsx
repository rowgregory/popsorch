'use client'

import React from 'react'
import CreateBtn from '@/app/components/admin/CreateBtn'
import { openCreateDrawer } from '@/app/redux/features/dashboardSlice'
import { RootState, useAppSelector } from '@/app/redux/store'
import AdminVenueCreateDrawer from '@/app/drawers/AdminVenueCreateDrawer'
import { VenueProps } from '@/app/types/model.types'
import AdminVenueUpdateDrawer from '@/app/drawers/AdminVenueUpdateDrawer'
import AdminVenueRow from '@/app/components/admin/AdminVenueRow'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import ToastMessage from '@/app/components/common/ToastMessage'
import { resetVenueError } from '@/app/redux/features/venueSlice'

const Venues = () => {
  const { venues, error } = useAppSelector((state: RootState) => state.venue)
  const { loading: loadingVenues, venuesCount } = useAppSelector((state: RootState) => state.app)

  return (
    <>
      <AdminVenueCreateDrawer />
      <AdminVenueUpdateDrawer />
      <ToastMessage message={error} resetError={() => resetVenueError()} />
      <div className="flex gap-y-10 760:gap-y-0 flex-col 760:flex-row 760:items-center 760:justify-between mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal title="Venues" bgcolor="bg-yellow-400" textcolor="text-yellow-400" total={venuesCount} />
        <CreateBtn
          btnText="Create Venue"
          createFunc={openCreateDrawer}
          bgColor="bg-yellow-400"
          hvbgcolor="bg-yellow-500"
        />
      </div>
      {loadingVenues ? (
        <AdminPageSpinner fill="fill-yellow-400" />
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-12 gap-x-3 rounded-md pl-3.5 py-2 pr-2 mb-7 text-sm">
              <div className="col-span-2 whitespace-nowrap">Name</div>
              <div className="col-span-1 whitespace-nowrap">Capacity</div>
              <div className="col-span-3 whitespace-nowrap">Accessibility</div>
              <div className="col-span-3 whitespace-nowrap">Immersive Environment</div>
              <div className="col-span-2 whitespace-nowrap">Parking</div>
              <div className="col-span-1"></div>
            </div>
            <div className="flex flex-col gap-y-3">
              {venues?.map((venue: VenueProps) => (
                <AdminVenueRow key={venue.id} venue={venue} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Venues
