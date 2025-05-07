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
  const { venues, error, venuesCount, noVenues } = useAppSelector((state: RootState) => state.venue)
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <div className="relative">
      <AdminVenueCreateDrawer />
      <AdminVenueUpdateDrawer />
      <ToastMessage message={error} resetError={() => resetVenueError()} />
      <div className="flex gap-y-10 760:gap-y-0 flex-col 760:flex-row 760:items-center 760:justify-between mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal
          title="Venues"
          bgcolor="bg-yellow-400"
          textcolor="text-yellow-400"
          total={venuesCount}
          loading={loading}
          fillcolor="fill-yellow-400"
        />
        <CreateBtn
          btnText="Create Venue"
          createFunc={openCreateDrawer}
          bgColor="bg-yellow-400"
          hvbgcolor="bg-yellow-500"
        />
      </div>
      {loading ? (
        <AdminPageSpinner fill="fill-yellow-400" />
      ) : noVenues ? (
        <div className="font-sm font-lato">No Venues</div>
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[3fr_3fr_3fr_3fr] gap-x-4 rounded-md pl-4 py-2 pr-2 mb-3 text-sm min-w-[600px]">
              <div className="whitespace-nowrap">Name</div>
              <div className="whitespace-nowrap">Capacity</div>
              <div className="whitespace-nowrap">Accessibility</div>
              <div></div>
            </div>
            <div className="flex flex-col gap-y-3 min-w-[600px]">
              {venues?.map((venue: VenueProps) => (
                <AdminVenueRow key={venue.id} venue={venue} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Venues
