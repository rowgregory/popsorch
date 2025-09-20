'use client'

import React, { FC, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Trash2, Check, Upload, AlertCircle, FileText } from 'lucide-react'
import Picture from '../components/common/Picture'
import { useFetchVenuesQuery } from '../redux/services/venueApi'

export const showTimes: string[] = [
  '12:00 AM',
  '12:30 AM',
  '1:00 AM',
  '1:30 AM',
  '2:00 AM',
  '2:30 AM',
  '3:00 AM',
  '3:30 AM',
  '4:00 AM',
  '4:30 AM',
  '5:00 AM',
  '5:30 AM',
  '6:00 AM',
  '6:30 AM',
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
  '10:00 PM',
  '10:30 PM',
  '11:00 PM',
  '11:30 PM'
]

const concertTypeOptions: { value: string; label: string }[] = [
  {
    value: 'season',
    label: 'Season'
  },
  {
    value: 'add-on',
    label: 'Add On'
  },
  {
    value: 'sundays-at-neel',
    label: 'Sundays@Neel'
  }
]

const daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const cities: string[] = ['Sarasota', 'Bradenton']

// Types
interface VenueProps {
  id: string
  name: string
  imageUrl: string
  city: string
  address: string
  longitude: number
  latitude: number
}

interface FormActions {
  setInputs: (data: any) => void
  clearInputs: () => void
  setErrors: (errors: any) => void
  setSubmitted: (submitted: boolean) => void
  handleInput: (e: any) => void
  handleSelect: (e: any) => void
  handleToggle: (e: any) => void
  addVenue: (venue: any) => void
  addConcertDetails: (newId: string) => void
  updateConcertDetails: (eventDetailId: string) => void
  removeConcertDetails: (concertId: string) => void
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleFileDrop: (event: React.DragEvent<HTMLDivElement>) => void
  handleUploadProgress: (progress: any) => void
}

interface ConcertFormProps {
  inputs: any
  errors: { [key: string]: string }
  formActions: FormActions
  onSubmit: any
  isUpdating?: boolean
  close: any
  isLoading: boolean
}

const ConcertForm: FC<ConcertFormProps> = ({ inputs, errors, formActions, onSubmit, isUpdating, close, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'details'>('basic')
  const [eventDetailsId, setEventDetailsId] = useState<string | null>(null)
  const { data } = useFetchVenuesQuery(undefined) as any
  const venues = data?.venues

  const {
    handleInput,
    handleSelect,
    addVenue,
    addConcertDetails,
    updateConcertDetails,
    removeConcertDetails,
    handleFileChange
  } = formActions

  const handleAddNewDetail = () => {
    const newId = crypto.randomUUID()

    addConcertDetails(newId)
    setEventDetailsId(null)
  }

  const handleUpdateDetail = () => {
    if (eventDetailsId) {
      updateConcertDetails(eventDetailsId)
      setEventDetailsId(null)
    }
  }

  const handleEditDetail = (detail: any) => {
    setEventDetailsId(detail.id)
    // Create synthetic events for Redux actions
    handleInput({ target: { name: 'time', value: detail.time } })
    handleInput({ target: { name: 'date', value: detail.date } })
    handleSelect({ target: { name: 'city', value: detail.city } })
    handleSelect({ target: { name: 'dayOfWeek', value: detail.dayOfWeek } })
    handleInput({ target: { name: 'location', value: detail.location } })
    handleInput({ target: { name: 'externalLink', value: detail.externalLink } })
  }

  const clearDetailForm = () => {
    handleInput({ target: { name: 'time', value: '' } })
    handleInput({ target: { name: 'date', value: '' } })
    handleSelect({ target: { name: 'city', value: '' } })
    handleSelect({ target: { name: 'dayOfWeek', value: '' } })
    handleInput({ target: { name: 'location', value: {} } })
    handleInput({ target: { name: 'externalLink', value: '' } })
    setEventDetailsId(null)
  }

  const tabs = [
    { id: 'basic', label: 'Basic Info', count: null },
    { id: 'details', label: 'Event Details', count: inputs.eventDetails?.length || 0 }
  ] as const

  return (
    <div className="min-h-screen bg-neutral-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-lg mb-6 p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{isUpdating ? 'Update Concert' : 'Schedule Concert'}</h1>
          <p className="text-neutral-300">Fill in the concert details, add event information, and select venues.</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-t-lg">
          <div className="flex border-b border-neutral-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-white bg-neutral-700 border-b-2 border-neutral-500'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-2 px-2 py-1 text-xs bg-neutral-600 rounded-full">{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-neutral-800 border-x border-neutral-700 p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'basic' && (
              <motion.div
                key="basic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-neutral-300 mb-2">
                      Concert Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={inputs.name || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 bg-neutral-800 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors focus:outline-none text-neutral-200 placeholder-neutral-500 ${
                        errors.name ? 'border-red-500' : 'border-neutral-600'
                      }`}
                      placeholder="Summer Music Festival"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="allSeriesExternalLink"
                      className="block text-sm font-semibold text-neutral-300 mb-2"
                    >
                      All Series External Link *
                    </label>
                    <input
                      type="text"
                      id="allSeriesExternalLink"
                      name="allSeriesExternalLink"
                      value={inputs.allSeriesExternalLink || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 bg-neutral-800 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors focus:outline-none text-neutral-200 placeholder-neutral-500 ${
                        errors.allSeriesExternalLink ? 'border-red-500' : 'border-neutral-600'
                      }`}
                      placeholder="Summer Music Festival"
                    />
                    {errors.allSeriesExternalLink && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.allSeriesExternalLink}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="cardDate" className="block text-sm font-semibold text-neutral-300 mb-2">
                      Card Date *
                    </label>
                    <input
                      type="text"
                      id="cardDate"
                      name="cardDate"
                      value={inputs.cardDate || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 bg-neutral-800 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors focus:outline-none text-neutral-200 placeholder-neutral-500 ${
                        errors.cardDate ? 'border-red-500' : 'border-neutral-600'
                      }`}
                      placeholder="Summer Music Festival"
                    />
                    {errors.cardDate && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.cardDate}
                      </p>
                    )}
                  </div>

                  {/* Artist */}
                  <div>
                    <label htmlFor="artist" className="block text-sm font-semibold text-neutral-300 mb-2">
                      Press Release *
                    </label>
                    <input
                      type="text"
                      id="pressRelease"
                      name="pressRelease"
                      value={inputs.pressRelease || ''}
                      onChange={handleInput}
                      className={`w-full px-4 py-3 bg-neutral-800 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors focus:outline-none text-neutral-200 placeholder-neutral-500 ${
                        errors.pressRelease ? 'border-red-500' : 'border-neutral-600'
                      }`}
                      placeholder=""
                    />
                    {errors.pressRelease && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.pressRelease}
                      </p>
                    )}
                  </div>

                  {/* Concert Type */}
                  <div>
                    <label htmlFor="type" className="block text-sm font-semibold text-neutral-300 mb-2">
                      Concert Type *
                    </label>
                    <div className="relative">
                      <select
                        id="type"
                        name="type"
                        value={inputs.type || ''}
                        onChange={handleSelect}
                        className={`w-full px-4 py-3 bg-neutral-800 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors focus:outline-none text-neutral-200 appearance-none cursor-pointer ${
                          errors.type ? 'border-red-500' : 'border-neutral-600'
                        }`}
                      >
                        <option value="" disabled className="text-neutral-500">
                          Select concert type
                        </option>
                        {concertTypeOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-neutral-800 text-neutral-200">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {errors.type && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.type}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-neutral-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={inputs.description || ''}
                      onChange={handleInput}
                      rows={4}
                      className={`w-full px-4 py-3 bg-neutral-800 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors focus:outline-none text-neutral-200 placeholder-neutral-500 resize-vertical ${
                        errors.description ? 'border-red-500' : 'border-neutral-600'
                      }`}
                      placeholder="Describe the concert, special guests, and what attendees can expect..."
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-300 mb-3">
                      <Upload className="w-4 h-4 inline mr-2" />
                      Concert Logo/Image *
                    </label>

                    {!inputs?.file && !inputs?.imageUrl ? (
                      <div
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center hover:border-neutral-500 hover:bg-neutral-700/30 transition-all cursor-pointer ${
                          errors?.imageUrl ? 'border-red-600' : 'border-neutral-600'
                        }`}
                      >
                        <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                        <p className="text-neutral-300 mb-2 font-medium">Upload concert photo</p>
                        <p className="text-sm text-neutral-500">PNG, JPG, SVG up to 10MB</p>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/png, image/jpeg, image/jpg, image/gif"
                        />
                      </div>
                    ) : (
                      <div className="border border-neutral-700 rounded-xl p-4 bg-neutral-700/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-neutral-600 rounded-lg flex items-center justify-center border border-neutral-500">
                              <FileText className="w-6 h-6 text-neutral-300" />
                            </div>
                            <div>
                              <p className="font-medium text-neutral-200">
                                {isUpdating ? inputs?.file?.name : inputs?.imageFilename}
                              </p>
                              {isUpdating ? (
                                <p className="text-sm text-neutral-400">{inputs?.imageFilename}</p>
                              ) : (
                                <p className="text-sm text-neutral-400">
                                  {(inputs?.file?.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              )}
                            </div>
                          </div>
                          {/* <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                      >
                        <X className="w-5 h-5" />
                      </button> */}
                        </div>
                        {(inputs?.file?.name || inputs?.imageUrl) && (
                          <div className="mt-3">
                            <Picture
                              priority={false}
                              src={inputs?.file?.name ? URL.createObjectURL(inputs?.file) : inputs?.imageUrl}
                              className="w-full h-32 object-contain bg-neutral-700 rounded-lg border border-neutral-600"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {errors?.imageUrl && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors?.imageUrl}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Event Details Form */}
                <div className="bg-neutral-700 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      {eventDetailsId ? 'Edit Event Detail' : 'Add Event Detail'}
                    </h3>
                    {eventDetailsId && (
                      <button
                        type="button"
                        onClick={clearDetailForm}
                        className="text-sm text-neutral-400 hover:text-white"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      {/* Time */}
                      <div>
                        <label htmlFor="time" className="block text-sm font-semibold text-neutral-300 mb-2">
                          Time
                        </label>
                        <select
                          id="time"
                          name="time"
                          value={inputs.time || ''}
                          onChange={handleSelect}
                          className="w-full px-4 py-3 bg-neutral-600 border border-neutral-500 rounded-lg focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-colors focus:outline-none text-neutral-200"
                        >
                          <option value="">Select time</option>
                          {showTimes.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Date */}
                      <div>
                        <label htmlFor="date" className="block text-sm font-semibold text-neutral-300 mb-2">
                          Date
                        </label>
                        <input
                          type="text"
                          id="date"
                          name="date"
                          value={inputs.date || ''}
                          onChange={handleInput}
                          placeholder="August 16, 2025"
                          className="w-full px-4 py-3 bg-neutral-600 border border-neutral-500 rounded-lg focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-colors focus:outline-none text-neutral-200 placeholder-neutral-400"
                        />
                      </div>

                      {/* City */}
                      <div>
                        <label htmlFor="city" className="block text-sm font-semibold text-neutral-300 mb-2">
                          City
                        </label>
                        <select
                          id="city"
                          name="city"
                          value={inputs.city || ''}
                          onChange={handleSelect}
                          className="w-full px-4 py-3 bg-neutral-600 border border-neutral-500 rounded-lg focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-colors focus:outline-none text-neutral-200"
                        >
                          <option value="">Select city</option>
                          {cities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Day of Week */}
                      <div>
                        <label htmlFor="dayOfWeek" className="block text-sm font-semibold text-neutral-300 mb-2">
                          Day of the Week
                        </label>
                        <select
                          id="dayOfWeek"
                          name="dayOfWeek"
                          value={inputs.dayOfWeek || ''}
                          onChange={handleSelect}
                          className="w-full px-4 py-3 bg-neutral-600 border border-neutral-500 rounded-lg focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-colors focus:outline-none text-neutral-200"
                        >
                          <option value="">Select day</option>
                          {daysOfWeek.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* External Link */}
                      <div>
                        <label htmlFor="externalLink" className="block text-sm font-semibold text-neutral-300 mb-2">
                          Audience View Ticket Link*
                        </label>
                        <textarea
                          id="externalLink"
                          name="externalLink"
                          value={inputs.externalLink || ''}
                          onChange={handleInput}
                          rows={2}
                          className="w-full px-4 py-3 bg-neutral-600 border border-neutral-500 rounded-lg focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 transition-colors focus:outline-none text-neutral-200 placeholder-neutral-400 resize-vertical"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="font-medium text-sm text-neutral-300 mb-4">Select Venue</div>
                        <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                          {venues?.map((venue: VenueProps) => (
                            <div key={venue.id} onClick={() => addVenue(venue)} className="cursor-pointer">
                              <div className="relative">
                                <Picture
                                  priority={false}
                                  src={venue?.imageUrl || '/images/ci-1.png'}
                                  alt={venue.name}
                                  className="object-cover aspect-square w-full rounded"
                                />
                                {inputs?.location?.venueId === venue.id && (
                                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded">
                                    <Check className="text-pink-400 w-6 h-6" />
                                  </div>
                                )}
                              </div>
                              <div className="text-xs mt-1 text-center text-neutral-300">{venue?.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-neutral-600">
                    <button
                      type="button"
                      onClick={eventDetailsId ? handleUpdateDetail : handleAddNewDetail}
                      className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
                    >
                      {eventDetailsId ? 'Update Detail' : 'Add Detail'}
                    </button>
                  </div>
                </div>

                {/* Existing Event Details */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Event Details ({inputs.eventDetails?.length || 0})
                  </h3>

                  {!inputs.eventDetails || inputs.eventDetails.length === 0 ? (
                    <div className="text-center py-12 bg-neutral-700 rounded-lg">
                      <Calendar className="mx-auto h-16 w-16 text-neutral-400 mb-4" />
                      <h4 className="text-lg font-medium text-neutral-200 mb-2">No event details added yet</h4>
                      <p className="text-neutral-400">Add your first event detail using the form above</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {inputs.eventDetails.map((detail: any, index: number) => (
                        <div key={index} className="bg-neutral-700 rounded-lg p-4 border border-neutral-600">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-neutral-400">Date:</span>
                                  <div className="text-neutral-200">{detail.date || 'Not set'}</div>
                                </div>
                                <div>
                                  <span className="text-neutral-400">Time:</span>
                                  <div className="text-neutral-200">{detail.time || 'Not set'}</div>
                                </div>
                                <div>
                                  <span className="text-neutral-400">City:</span>
                                  <div className="text-neutral-200">{detail.city || 'Not set'}</div>
                                </div>
                                <div>
                                  <span className="text-neutral-400">Day:</span>
                                  <div className="text-neutral-200">{detail.dayOfWeek || 'Not set'}</div>
                                </div>
                              </div>

                              {detail.location?.name && (
                                <div className="mt-2 text-sm">
                                  <span className="text-neutral-400">Venue:</span>
                                  <span className="text-neutral-200 ml-1">{detail.location.name}</span>
                                </div>
                              )}

                              {detail.externalLink && (
                                <div className="mt-2 text-sm">
                                  <span className="text-neutral-400">Ticket Link:</span>
                                  <a
                                    href={detail.externalLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pink-400 hover:text-pink-300 ml-1 break-all"
                                  >
                                    {detail.externalLink}
                                  </a>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2 ml-4">
                              <button
                                type="button"
                                onClick={() => handleEditDetail(detail)}
                                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-600 rounded transition-colors"
                                title="Edit detail"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() => removeConcertDetails(detail.id)}
                                className="p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-600 rounded transition-colors"
                                title="Remove detail"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="bg-neutral-800 border border-neutral-700 border-t-0 rounded-b-lg px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-neutral-400">
              {activeTab === 'basic' && 'Fill in the basic concert information'}
              {activeTab === 'details' && `${inputs.eventDetails?.length || 0} event detail(s) added`}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={close}
                className="px-6 py-2 text-sm font-medium text-neutral-300 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
              >
                Cancel
              </button>

              {activeTab === 'basic' ? (
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className="px-6 py-2 text-sm font-medium text-white bg-neutral-600 hover:bg-neutral-500 rounded-lg transition-colors"
                >
                  Next: Event Details
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={isLoading}
                  className="px-6 py-2 text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 disabled:bg-pink-400 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  {isLoading ? 'Saving...' : isUpdating ? 'Update Concert' : 'Create Concert'}
                </button>
              )}
            </div>
          </div>

          {Object.keys(errors).length > 0 && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-400">Please fix the errors above before submitting the form.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConcertForm
