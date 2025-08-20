import React from 'react'
import { motion } from 'framer-motion'
import { Upload, Link, FileText, Save, X, AlertCircle, Crown } from 'lucide-react'
import { useAppDispatch } from '../redux/store'
import Picture from '../components/common/Picture'

const sponsorLevels = [
  { value: 'season', label: 'Season Sponsor', color: '#F59E0B', price: '$50,000' },
  { value: 'concert', label: 'Concert Sponsor', color: '#F59E0B', price: '$10,000' },
  { value: 'guest-artist', label: 'Guest Artist Sponsor', color: '#F59E0B', price: '$5,000' },
  { value: 'principal', label: 'Principal', color: '#F59E0B', price: '$1,000' },
  { value: 'associate', label: 'Associate', color: '#F59E0B', price: '$500' },
  { value: 'sustaining', label: 'Sustaining', color: '#F59E0B', price: '$250' }
]

const SponsorForm = ({
  inputs,
  errors,
  handleInput,
  close,
  handleSubmit,
  loading,
  isUpdating,
  setErrors,
  setInputs
}: any) => {
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
    dispatch(setInputs({ formName: 'sponsorForm', data: { file: null } }))
    dispatch(setInputs({ formName: 'sponsorForm', data: { filename: '', filePath: '' } }))
  }

  const selectedLevel = sponsorLevels.find((level) => level.value === inputs?.level)

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4"
    >
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Admin: Create Sponsor</h1>
                <p className="text-blue-100">Add a new sponsor to the platform</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    <Upload className="w-4 h-4 inline mr-2" />
                    Sponsor Logo/Image *
                  </label>

                  {!inputs?.file ? (
                    <div className="relative border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-900/20 transition-all cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-300 mb-2 font-medium">Upload sponsor logo</p>
                      <p className="text-sm text-gray-500">PNG, JPG, SVG up to 10MB</p>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                      />
                    </div>
                  ) : (
                    <div className="border border-gray-700 rounded-xl p-4 bg-gray-800/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center border border-blue-700">
                            <FileText className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-200">{inputs?.name}</p>
                            <p className="text-sm text-gray-400">{(inputs?.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      {inputs?.type.startsWith('image/') && (
                        <div className="mt-3">
                          <Picture
                            priority={false}
                            src={URL.createObjectURL(inputs?.file)}
                            className="w-full h-32 object-contain bg-gray-800 rounded-lg border border-gray-700"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {errors?.file && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors?.file}
                    </p>
                  )}
                </div>

                {/* Filename */}
                <div>
                  <label htmlFor="filename" className="block text-sm font-semibold text-gray-300 mb-2">
                    Display Name *
                  </label>
                  <input
                    type="text"
                    id="filename"
                    name="filename"
                    value={inputs?.filename}
                    onChange={handleInput}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-200 placeholder-gray-500 ${
                      errors?.filename ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter sponsor display name"
                  />
                  {errors?.filename && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors?.filename}
                    </p>
                  )}
                </div>

                {/* External Link */}
                <div>
                  <label htmlFor="externalLink" className="block text-sm font-semibold text-gray-300 mb-2">
                    <Link className="w-4 h-4 inline mr-2" />
                    Sponsor Website *
                  </label>
                  <input
                    type="url"
                    id="externalLink"
                    name="externalLink"
                    value={inputs?.externalLink}
                    onChange={handleInput}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-200 placeholder-gray-500 ${
                      errors?.externalLink ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="https://sponsor-website.com"
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
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    <Crown className="w-4 h-4 inline mr-2" />
                    Sponsorship Level *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {sponsorLevels.map((level) => (
                      <motion.button
                        key={level.value}
                        type="button"
                        onClick={() => {
                          dispatch(setInputs({ formName: 'sponsorForm', data: { level: level.value } }))
                          dispatch(setErrors({ level: '' }))
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-lg border-2 text-left transition-all bg-gray-800/50 ${
                          inputs?.level === level.value
                            ? 'border-blue-500 bg-blue-900/30'
                            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/30'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {/* <span className="text-lg"></span> */}
                          <div>
                            <p className="font-medium text-gray-200">{level.label}</p>
                            <div className="w-8 h-2 rounded-full mt-1" style={{ backgroundColor: level.color }} />
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

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-2">
                    Sponsor Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    value={inputs?.description}
                    onChange={handleInput}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-gray-200 placeholder-gray-500 ${
                      errors?.description ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter a detailed description of the sponsor, their business, and partnership details..."
                  />
                  <div className="mt-2 flex justify-between items-center">
                    <div>
                      {errors?.description && (
                        <p className="text-sm text-red-400 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors?.description}
                        </p>
                      )}
                    </div>
                    <p className={`text-sm ${inputs?.description.length > 450 ? 'text-red-400' : 'text-gray-400'}`}>
                      {inputs?.description.length}/500
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            {(inputs?.filename || inputs?.level || inputs?.file) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700"
              >
                <h3 className="font-semibold text-gray-200 mb-4">Preview</h3>
                <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  {inputs?.file && (
                    <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden border border-gray-600">
                      {inputs?.file.type.startsWith('image/') ? (
                        <Picture
                          priority={false}
                          src={URL.createObjectURL(inputs?.file)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileText className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-200">{inputs?.filename || 'Sponsor Name'}</h4>
                      {selectedLevel && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300 border border-gray-600">
                          {selectedLevel.label}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{inputs?.description || 'No description provided'}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: inputs?.color }} />
                      <span className="text-xs text-gray-400">{inputs?.clicks} clicks</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.button
              onClick={close}
              type="button"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full mt-8 py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-gray-600 to-slate-600 hover:gray-blue-700 hover:to-slate-700'
              } text-white`}
            >
              <span>Close</span>
            </motion.button>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full mt-8 py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
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
          </div>
        </motion.div>
      </div>
    </form>
  )
}

export default SponsorForm
