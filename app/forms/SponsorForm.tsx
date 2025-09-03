import React from 'react'
import { motion } from 'framer-motion'
import { Upload, Link, FileText, Save, X, AlertCircle, Crown, Gift } from 'lucide-react'
import { useAppDispatch } from '../redux/store'
import Picture from '../components/common/Picture'
import { setInputs } from '../redux/features/formSlice'

const sponsorLevels = [
  { value: 'season', label: 'Season Sponsor', price: '50000' },
  { value: 'concert', label: 'Concert Sponsor', price: '10000' },
  { value: 'guest-artist', label: 'Guest Artist Sponsor', price: '5000' },
  { value: 'principal', label: 'Principal', price: '1000' },
  { value: 'associate', label: 'Associate', price: '500' },
  { value: 'sustaining', label: 'Sustaining', price: '250' }
]

const SponsorForm = ({ inputs, errors, handleInput, close, handleSubmit, loading, isUpdating }: any) => {
  const dispatch = useAppDispatch()

  // Handle file upload
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      dispatch(setInputs({ formName: 'sponsorForm', data: { file: selectedFile } }))
      // Auto-fill filename if not already set
      if (!inputs?.filename) {
        dispatch(setInputs({ formName: 'sponsorForm', data: { filename: selectedFile.name } }))
      }
    }
  }

  // Remove selected file
  const removeFile = () => {
    dispatch(setInputs({ formName: 'sponsorForm', data: { filename: '', filePath: '', file: null } }))
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-[#222222]">
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 py-6 text-white border-b border-neutral-600">
            <div className="flex items-center space-x-3">
              <Gift className="w-8 h-8 text-neutral-300" />
              <div>
                <h1 className="text-3xl font-bold text-white">{isUpdating ? 'Update' : 'Create'} Sponsor</h1>
                <p className="text-neutral-300">
                  {isUpdating ? 'Update an existing sponsor on the platform' : 'Add a new sponsor to the platform'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-300 mb-3">
                    <Upload className="w-4 h-4 inline mr-2" />
                    Sponsor Logo/Image *
                  </label>

                  {!inputs?.file && !inputs?.filePath ? (
                    <div className="relative border-2 border-dashed border-neutral-600 rounded-xl p-8 text-center hover:border-neutral-500 hover:bg-neutral-700/30 transition-all cursor-pointer">
                      <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                      <p className="text-neutral-300 mb-2 font-medium">Upload sponsor logo</p>
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
                              {isUpdating ? inputs?.file?.name : inputs?.filename}
                            </p>
                            {isUpdating ? (
                              <p className="text-sm text-neutral-400">{inputs?.filename}</p>
                            ) : (
                              <p className="text-sm text-neutral-400">
                                {(inputs?.file?.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-red-400 hover:text-red-300 transition-colors p-1"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      {(inputs?.file?.name || inputs?.filePath) && (
                        <div className="mt-3">
                          <Picture
                            priority={false}
                            src={inputs?.file?.name ? URL.createObjectURL(inputs?.file) : inputs?.filePath}
                            className="w-full h-32 object-contain bg-neutral-700 rounded-lg border border-neutral-600"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {errors?.filePath && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors?.filePath}
                    </p>
                  )}
                </div>

                {/* Filename */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-300 mb-2">
                    Display Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={inputs?.name || ''}
                    onChange={handleInput}
                    className={`w-full px-4 py-3 bg-neutral-700 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors text-neutral-200 placeholder-neutral-500 ${
                      errors?.name ? 'border-red-500' : 'border-neutral-600'
                    }`}
                    placeholder="Sqysh"
                  />
                  {errors?.name && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors?.name}
                    </p>
                  )}
                </div>

                {/* External Link */}
                <div>
                  <label htmlFor="externalLink" className="block text-sm font-semibold text-neutral-300 mb-2">
                    <Link className="w-4 h-4 inline mr-2" />
                    Sponsor Website *
                  </label>
                  <input
                    type="url"
                    id="externalLink"
                    name="externalLink"
                    value={inputs?.externalLink || ''}
                    onChange={handleInput}
                    className={`w-full px-4 py-3 bg-neutral-700 border rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-colors text-neutral-200 placeholder-neutral-500 ${
                      errors?.externalLink ? 'border-red-500' : 'border-neutral-600'
                    }`}
                    placeholder="https://sqysh.io"
                  />
                  {errors?.externalLink && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors?.externalLink}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Sponsorship Level */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-300 mb-3">
                    <Crown className="w-4 h-4 inline mr-2" />
                    Sponsorship Level *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {sponsorLevels.map((level) => (
                      <motion.button
                        key={level.value}
                        type="button"
                        onClick={() => {
                          dispatch(
                            setInputs({ formName: 'sponsorForm', data: { level: level.value, amount: level.price } })
                          )
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-lg border-2 text-left transition-all bg-neutral-700/50 ${
                          inputs?.level === level.value
                            ? 'border-fuchsia-500 bg-fuchsia-600/50'
                            : 'border-neutral-600 hover:border-neutral-500 hover:bg-neutral-600/30'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div>
                            <p className="font-medium text-neutral-200">{level.label}</p>
                            <div className="w-8 h-1 rounded-full mt-1 bg-fuchsia-500" />
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  {errors?.level && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors?.level}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={` mt-8 w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
                loading ? 'bg-neutral-600 cursor-not-allowed' : 'bg-neutral-700 hover:bg-neutral-600'
              } text-white`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>{isUpdating ? 'Updating' : 'Creating'} Sponsor...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>{isUpdating ? 'Update' : 'Create'} Sponsor</span>
                </>
              )}
            </motion.button>

            <motion.button
              onClick={close}
              type="button"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`mt-4 w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
                loading ? 'bg-neutral-600 cursor-not-allowed' : 'bg-neutral-600 hover:bg-neutral-500'
              } text-white`}
            >
              <span>Close</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </form>
  )
}

export default SponsorForm
