import React, { FC } from 'react'
import { useAppDispatch } from '../redux/store'
import { resetForm, setIsCreating } from '../redux/features/formSlice'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { closeDrawer, openBottomOverlayDrawer } from '../redux/features/dashboardSlice'
import { plusIcon } from '../lib/icons'
import AdminCreateConcertEventDetailsDrawer from '../drawers/AdminConcertEventDetailsDrawer'
import AdminConcertDetailsList from '../components/admin/AdminConcertDetailsList'
import AdminInput from './elements/AdminInput'
import AdminTextarea from './elements/AdminTextarea'
import AdminFormBtns from '../components/admin/AdminFormBtns'
import AdminFormPhoto from '../components/admin/AdminFormPhoto'
import AdminSelect from './elements/AdminSelect'
import { InfoIcon } from 'lucide-react'

interface IConcertForm {
  inputs: any
  errors: any
  handleInput: any
  handleFileChange: any
  removeConcertDetails: any
  handleSubmit: any
  loading: boolean
  isUpdating: boolean
}

const ConcertForm: FC<IConcertForm> = ({
  inputs,
  errors,
  handleInput,
  handleFileChange,
  removeConcertDetails,
  handleSubmit,
  loading,
  isUpdating
}) => {
  const dispatch = useAppDispatch()

  const openConcertDetailsDrawer = () => {
    dispatch(openBottomOverlayDrawer('details'))
    dispatch(setIsCreating())
  }

  return (
    <>
      <AdminCreateConcertEventDetailsDrawer />
      <div className="min-h-screen py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg mb-6 p-4 sm:p-6">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-changa mb-2">
                {isUpdating ? 'Update Concert' : 'Create New Concert'}
              </h1>
              <p className="text-sm sm:text-base text-gray-300 max-w-2xl">
                {isUpdating
                  ? 'Update the concert information below. All fields marked with * are required.'
                  : 'Fill in the concert details below to create a new concert event. Make sure to include all required information marked with * to ensure proper listing and promotion.'}
              </p>
            </div>
          </div>

          {/* Instructions Card */}
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <InfoIcon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-200">
                <h3 className="font-semibold mb-1 text-blue-100">Getting Started:</h3>
                <ul className="space-y-1 text-blue-200">
                  <li>• Complete all required fields marked with an asterisk (*)</li>
                  <li>• Upload a high-quality concert image for promotional purposes</li>
                  <li>• Add venue and performance details using the &quot;Add Where & When&quot; button</li>
                  <li>• Review all information before submitting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
            <div className="px-4 sm:px-6 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left Column - Concert Details */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-zinc-600">
                      Concert Information
                    </h2>
                    <div className="space-y-6">
                      <AdminInput
                        name="name"
                        value={inputs?.name || ''}
                        onChange={handleInput}
                        label="Concert Name*"
                        error={errors?.name}
                        placeholder="Enter the concert title"
                      />

                      <AdminSelect
                        name="type"
                        value={inputs?.type}
                        onChange={handleInput}
                        label="Concert Type*"
                        list={['Choose One', 'Season', 'Add-On', 'Sundays-at-Neel']}
                        error={errors?.type}
                      />

                      <AdminTextarea
                        name="cardDate"
                        value={inputs?.cardDate}
                        onChange={handleInput}
                        label="Display Date*"
                        error={errors?.cardDate}
                        rows={2}
                        placeholder="e.g., Saturday, March 15, 2024 at 8:00 PM"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-white mb-4">Content & Links</h3>
                    <div className="space-y-6">
                      <AdminTextarea
                        name="description"
                        value={inputs?.description}
                        onChange={handleInput}
                        label="Concert Description*"
                        error={errors?.description}
                        rows={4}
                        placeholder="e.g., Provide a compelling description of the concert for audience members"
                      />

                      <AdminTextarea
                        name="pressRelease"
                        value={inputs?.pressRelease}
                        onChange={handleInput}
                        label="Press Release*"
                        rows={4}
                        error={errors?.pressRelease}
                        placeholder="e.g., Write a professional press release for media distribution"
                      />

                      <AdminTextarea
                        name="allSeriesExternalLink"
                        value={inputs?.allSeriesExternalLink}
                        onChange={handleInput}
                        label="Series Information Link*"
                        error={errors?.allSeriesExternalLink}
                        rows={2}
                        placeholder="https://example.com/series-info"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Media & Event Details */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-zinc-600">
                      Media & Scheduling
                    </h2>

                    {/* Photo Upload Section */}
                    <div className="mb-8">
                      <h3 className="text-base font-medium text-white mb-3">Concert Image</h3>
                      <p className="text-sm text-gray-300 mb-4">
                        Upload a high-quality image that will be used for promotional materials and concert listings.
                        Recommended size: 1200x800px or larger.
                      </p>
                      <AdminFormPhoto
                        name={inputs?.file?.name}
                        filename={inputs?.imageFilename}
                        handleFileChange={handleFileChange}
                        color="text-pink-400"
                        error={errors?.imageUrl}
                      />
                    </div>

                    {/* Event Details Section */}
                    <div>
                      <h3 className="text-base font-medium text-white mb-3">Performance Details</h3>
                      <p className="text-sm text-gray-300 mb-4">
                        Add specific venue information, performance dates, and ticketing details for each concert
                        performance.
                      </p>

                      <button
                        onClick={openConcertDetailsDrawer}
                        type="button"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-zinc-800 transition-colors duration-200"
                      >
                        <AwesomeIcon icon={plusIcon} className="w-4 h-4 mr-2" />
                        Add Where & When
                      </button>

                      {errors?.eventDetails && (
                        <div className="mt-2 text-sm text-red-300 bg-red-900/30 border border-red-700/50 rounded-md p-3">
                          {errors?.eventDetails}
                        </div>
                      )}

                      {/* Event Details List */}
                      <div className="mt-4">
                        <AdminConcertDetailsList inputs={inputs} removeConcertDetails={removeConcertDetails} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="bg-zinc-900 px-4 sm:px-6 py-4 border-t border-zinc-600">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <AdminFormBtns
                  close={() => {
                    dispatch(resetForm('concert'))
                    dispatch(closeDrawer())
                  }}
                  loading={loading}
                  isUpdating={isUpdating}
                  btnColor="bg-pink-500 hover:bg-pink-600"
                  spinnerTrack="text-pink-500"
                />
              </div>

              {/* Footer Help Text */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  Need help? Make sure all required fields are completed before submitting.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ConcertForm
