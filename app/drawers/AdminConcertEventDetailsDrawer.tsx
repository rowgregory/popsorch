import React from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { closeBottomOverlayDrawer } from '../redux/features/dashboardSlice'
import Picture from '../components/common/Picture'
import BottomOverlapDrawer from '../components/common/BottomOverlapDrawer'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { checkIcon } from '../lib/icons'
import { createFormActions, setIsNotCreating } from '../redux/features/formSlice'
import { VenueProps } from '../types/model.types'
import AdminInput from '../forms/elements/AdminInput'
import AdminSelect from '../forms/elements/AdminSelect'
import AdminTextarea from '../forms/elements/AdminTextarea'
import { cities, daysOfWeek, showTimes } from '@/public/data/auth.data'

const AdminConcertEventDetailsDrawer = () => {
  const dispatch = useAppDispatch()
  const { bottomOverlayDrawer, type } = useAppSelector((state: RootState) => state.dashboard)
  const { concert, isCreating } = useAppSelector((state: RootState) => state.form)
  const { addConcertDetails, updateConcertDetails, handleInput, addVenue } = createFormActions('concert', dispatch)
  const { venues } = useAppSelector((state: RootState) => state.venue)

  const reset = () => {
    dispatch(setIsNotCreating())
    dispatch(closeBottomOverlayDrawer())
  }

  const addConcertDetailsToEventDetailsObj = () => {
    const newId = crypto.randomUUID()

    if (isCreating) {
      addConcertDetails(newId)
    } else {
      updateConcertDetails(concert.inputs.eventDetailId)
    }

    reset()
  }

  return (
    <BottomOverlapDrawer isOpen={bottomOverlayDrawer && type === 'details'} onClose={reset}>
      <div className="flex flex-col gap-y-2 max-w-2xl mx-auto p-10">
        <h1 className="font-bold text-3xl font-changa mb-2">Concert Details</h1>
        <h2 className="text-sm text-lato mb-10">
          Enter the concert time and date, then select one or more venues by clicking their images. Click the same image
          to remove the venue from the details object. Click save to add another concert and keep building your event
          lineup.
        </h2>
        <div className="flex flex-col gap-y-7 mb-8">
          <div className="flex flex-col 990:flex-row gap-y-7 990:gap-x-7 items-center">
            <AdminSelect
              name="time"
              value={concert?.inputs?.time}
              onChange={handleInput}
              label="Time"
              list={showTimes}
            />
            <AdminInput
              name="date"
              value={concert?.inputs?.date}
              onChange={handleInput}
              placeholder="August 16, 2025"
            />
          </div>
          <div className="flex flex-col 990:flex-row gap-y-7 990:gap-x-7 items-center">
            <AdminSelect name="city" value={concert?.inputs?.city} onChange={handleInput} label="City" list={cities} />
            <AdminSelect
              name="dayOfWeek"
              value={concert?.inputs?.dayOfWeek}
              onChange={handleInput}
              label="Day of the Week"
              list={daysOfWeek}
            />
          </div>
          <AdminTextarea
            name="externalLink"
            value={concert?.inputs?.externalLink}
            onChange={handleInput}
            label="Audienve View Ticket Link*"
            rows={2}
          />
        </div>
        <div className="font-medium text-sm font-lato capitalize mb-0.5">Venues</div>
        <div className="grid grid-cols-12 gap-x-2">
          {venues?.map((venue: VenueProps) => (
            <div key={venue.id} onClick={() => addVenue(venue)} className="col-span-4">
              <div className="relative cursor-pointer">
                <Picture
                  src={venue?.imageUrl || '/images/ci-1.png'}
                  className="object-cover aspect-square w-full"
                  priority={false}
                />
                {concert?.inputs?.location?.venueId === venue.id && (
                  <div className="absolute inset-0 bg-black/70 z-10 flex items-center justify-center">
                    <AwesomeIcon icon={checkIcon} className="text-pink-400 w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="text-[10px] mt-1 text-center">{venue?.name}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-x-2 mt-20 justify-center">
          <button
            type="button"
            onClick={reset}
            className="w-36 py-3.5 text-12 font-changa font-medium rounded-sm bg-gray-300 text-duskgray uppercase hover:text-pink-400 duration-300"
          >
            Close
          </button>
          <button
            type="button"
            onClick={addConcertDetailsToEventDetailsObj}
            className="w-36 py-3.5 text-12 font-changa font-medium rounded-sm bg-pink-400 text-white hover:text-duskgray duration-300 uppercase"
          >
            {isCreating ? 'Add' : 'Update'} details
          </button>
        </div>
      </div>
    </BottomOverlapDrawer>
  )
}

export default AdminConcertEventDetailsDrawer
