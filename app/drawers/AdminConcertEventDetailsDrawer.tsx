import React from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { closeBottomOverlayDrawer } from '../redux/features/dashboardSlice'
import Picture from '../components/common/Picture'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { checkIcon } from '../lib/icons'
import { createFormActions, setIsNotCreating } from '../redux/features/formSlice'
import { VenueProps } from '../types/model.types'
import AdminInput from '../forms/elements/AdminInput'
import AdminSelect from '../forms/elements/AdminSelect'
import AdminTextarea from '../forms/elements/AdminTextarea'
import { cities, daysOfWeek, showTimes } from '@/public/data/auth.data'
import { AnimatePresence, motion } from 'framer-motion'
import { drawerVariants } from '../lib/constants/motion'

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
    <AnimatePresence>
      {bottomOverlayDrawer && type === 'details' && (
        <motion.div
          variants={drawerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: 'tween',
            duration: 0.3,
            ease: 'easeInOut'
          }}
          className="h-dvh w-full fixed top-0 left-0 z-[60] bg-inkblack overflow-y-auto"
        >
          <div className="min-h-screen py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Header Section */}
              <div className="bg-zinc-800 border border-zinc-700 rounded-lg mb-6 p-4 sm:p-6">
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white font-changa mb-2">Concert Details</h1>
                  <p className="text-sm sm:text-base text-gray-300 max-w-2xl">
                    Enter the concert time and date, then select one or more venues by clicking their images. Click the
                    same image to remove the venue from the details object. Click save to add another concert and keep
                    building your event lineup.
                  </p>
                </div>
              </div>

              <section className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden ">
                <div className="px-4 sm:px-6 py-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <div className="space-y-6">
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

                      <AdminSelect
                        name="city"
                        value={concert?.inputs?.city}
                        onChange={handleInput}
                        label="City"
                        list={cities}
                      />
                      <AdminSelect
                        name="dayOfWeek"
                        value={concert?.inputs?.dayOfWeek}
                        onChange={handleInput}
                        label="Day of the Week"
                        list={daysOfWeek}
                      />
                      <AdminTextarea
                        name="externalLink"
                        value={concert?.inputs?.externalLink}
                        onChange={handleInput}
                        label="Audienve View Ticket Link*"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-6">
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
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 px-4 sm:px-6 py-4 border-t border-zinc-600">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
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
                  {/* Footer Help Text */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-400">
                      Need help? Make sure all required fields are completed before submitting.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AdminConcertEventDetailsDrawer
