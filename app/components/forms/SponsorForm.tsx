import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Gift, Plus, DollarSign, LinkIcon, ImageIcon, Tag, X } from 'lucide-react'
import { useAppDispatch } from '@/app/redux/store'
import Picture from '@/app/components/common/Picture'
import { setInputs } from '@/app/redux/features/formSlice'

const SponsorForm = ({ inputs, errors, handleInput, close, handleSubmit, loading, isUpdating }: any) => {
  const dispatch = useAppDispatch()
  const [showNewLevelInput, setShowNewLevelInput] = useState(false)
  const [newLevel, setNewLevel] = useState('')

  // Predefined sponsor levels (can be extended)
  const [sponsorLevels, setSponsorLevels] = useState([
    'Season Sponsor',
    'Concert Sponsor',
    'Guest Artist Sponsor',
    'Principal Sponsor',
    'Media Sponsor',
    'Partner'
  ])

  const imagePreviewUrl = useMemo(() => {
    if (inputs?.file) {
      return URL.createObjectURL(inputs.file)
    }
    return inputs?.filePath
  }, [inputs])

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

  // Add new sponsor level
  const addNewLevel = () => {
    if (newLevel.trim() && !sponsorLevels.includes(newLevel.trim())) {
      setSponsorLevels([...sponsorLevels, newLevel.trim()])
      dispatch(setInputs({ formName: 'sponsorForm', data: { level: newLevel.trim() } }))
      setNewLevel('')
      setShowNewLevelInput(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 py-6 text-white border-b border-neutral-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-3xl font-bold text-white">{isUpdating ? 'Update' : 'Create'} Sponsor</h1>
                <p className="text-neutral-300">
                  {isUpdating ? 'Update an existing sponsor on the platform' : 'Add a new sponsor to the platform'}
                </p>
              </div>
            </div>
            <button type="button" onClick={close} className="p-2 hover:bg-neutral-700 rounded-lg transition-colors">
              <X className="w-6 h-6 text-neutral-400" />
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Sponsor Name */}
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  <Tag className="w-4 h-4 inline mr-2" />
                  Sponsor Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={inputs?.name || ''}
                  onChange={handleInput}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blaze focus:border-transparent"
                  placeholder="Enter sponsor name"
                />
                {errors?.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
              </div>

              {/* Sponsor Level */}
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  <Gift className="w-4 h-4 inline mr-2" />
                  Sponsor Level *
                </label>

                {!showNewLevelInput ? (
                  <div className="space-y-3">
                    <select
                      name="level"
                      value={inputs?.level || ''}
                      onChange={handleInput}
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blaze focus:border-transparent"
                    >
                      <option value="">Select sponsor level</option>
                      {sponsorLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => setShowNewLevelInput(true)}
                      className="flex items-center gap-2 text-blaze/90 hover:text-blaze text-sm font-medium transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Level
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addNewLevel())}
                      className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blaze focus:border-transparent"
                      placeholder="Enter new level name"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={addNewLevel}
                      className="px-4 py-3 bg-linear-to-r from-blaze/90 to-sunburst hover:from-blaze hover:to-sunburst text-white rounded-lg font-medium transition-colors"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewLevelInput(false)
                        setNewLevel('')
                      }}
                      className="px-4 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {errors?.level && <p className="mt-2 text-sm text-red-400">{errors.level}</p>}
              </div>

              {/* Sponsorship Amount */}
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Sponsorship Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg">$</span>
                  <input
                    type="text"
                    name="amount"
                    value={inputs?.amount || ''}
                    onChange={handleInput}
                    className="w-full pl-8 pr-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blaze focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <p className="mt-2 text-xs text-neutral-400">Optional: Leave blank if not applicable</p>
                {errors?.amount && <p className="mt-2 text-sm text-red-400">{errors.amount}</p>}
              </div>

              {/* External Link */}
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  <LinkIcon className="w-4 h-4 inline mr-2" />
                  External Link (Website)
                </label>
                <input
                  type="url"
                  name="externalLink"
                  value={inputs?.externalLink || ''}
                  onChange={handleInput}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blaze focus:border-transparent"
                  placeholder="https://sponsor-website.com"
                />
                <p className="mt-2 text-xs text-neutral-400">Optional: Link to sponsor&apos;s website</p>
                {errors?.externalLink && <p className="mt-2 text-sm text-red-400">{errors.externalLink}</p>}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  <ImageIcon className="w-4 h-4 inline mr-2" />
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
                      accept="image/png, image/jpeg, image/jpg, image/gif, image/svg+xml"
                    />
                  </div>
                ) : (
                  <div className="relative border border-neutral-600 rounded-xl overflow-hidden bg-neutral-800">
                    <Picture
                      src={imagePreviewUrl}
                      alt="Sponsor logo preview"
                      className="w-full h-64 object-contain p-4"
                      priority={true}
                    />
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
                {errors?.file && <p className="mt-2 text-sm text-red-400">{errors.file}</p>}
              </div>

              {/* Filename (auto-filled but editable) */}
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">Filename</label>
                <input
                  type="text"
                  name="filename"
                  value={inputs?.filename || ''}
                  onChange={handleInput}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blaze focus:border-transparent"
                  placeholder="Auto-filled from upload"
                  readOnly={!inputs?.file && !inputs?.filePath}
                />
                <p className="mt-2 text-xs text-neutral-400">Automatically populated from uploaded file</p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-neutral-700">
            <button
              type="button"
              onClick={close}
              className="px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-linear-to-r from-blaze/90 to-sunburst/90 hover:from-blaze hover:to-sunburst disabled:bg-neutral-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isUpdating ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>{isUpdating ? 'Update Sponsor' : 'Create Sponsor'}</>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </form>
  )
}

export default SponsorForm
