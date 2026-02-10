import { FC, useEffect, useMemo } from 'react'
import { setInputs } from '@/app/redux/features/formSlice'
import AdminInput from './elements/AdminInput'
import AdminSelect from './elements/AdminSelect'
import AdminTextarea from './elements/AdminTextarea'
import { motion } from 'framer-motion'
import { IForm } from '@/app/types/form.types'
import { useAppDispatch } from '@/app/redux/store'
import { AlertCircle, FileText, Save, Upload, Users, X } from 'lucide-react'
import Picture from '@/app/components/common/Picture'

const TeamMemberForm: FC<IForm> = ({ inputs, errors, handleInput, close, handleSubmit, loading, isUpdating }) => {
  const dispatch = useAppDispatch()

  const imagePreviewUrl = useMemo(() => {
    if (inputs?.file) {
      return URL.createObjectURL(inputs.file)
    }
    return inputs?.imageUrl
  }, [inputs])

  useEffect(() => {
    return () => {
      if (imagePreviewUrl && inputs?.file) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
    }
  }, [imagePreviewUrl, inputs?.file])

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      dispatch(setInputs({ formName: 'teamMemberForm', data: { file: selectedFile } }))
    }
  }

  const removeFile = () => {
    dispatch(
      setInputs({
        formName: 'teamMemberForm',
        data: { imageUrl: '', file: null, imageFilenameToDelete: inputs.imageFilename }
      })
    )
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
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-neutral-300" />
            <div>
              <h1 className="text-3xl font-bold text-white">{isUpdating ? 'Update' : 'Create'} Team Member</h1>
              <p className="text-neutral-300">
                {isUpdating
                  ? 'Update an existing team member on the platform'
                  : 'Add a new team member to the platform'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <motion.div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-neutral-300 mb-3">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Team Member Logo/Image *
                </label>

                {!inputs?.file && !inputs?.imageUrl ? (
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center hover:border-neutral-500 hover:bg-neutral-700/30 transition-all cursor-pointer ${
                      errors?.imageUrl ? 'border-red-600' : 'border-neutral-600'
                    }`}
                  >
                    <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                    <p className="text-neutral-300 mb-2 font-medium">Upload team member photo</p>
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
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    {(inputs?.file?.name || inputs?.imageUrl) && (
                      <div className="mt-3">
                        <Picture
                          priority={false}
                          src={imagePreviewUrl || inputs?.imageUrl}
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

              <motion.div>
                <AdminInput
                  name="firstName"
                  value={inputs?.firstName}
                  onChange={handleInput}
                  label="First Name*"
                  error={errors?.firstName}
                />
              </motion.div>

              <motion.div>
                <AdminInput
                  name="lastName"
                  value={inputs?.lastName}
                  onChange={handleInput}
                  label="Last Name*"
                  error={errors?.lastName}
                />
              </motion.div>

              <motion.div>
                <AdminInput
                  name="position"
                  value={inputs?.position}
                  onChange={handleInput}
                  label="Position*"
                  error={errors?.position}
                />
              </motion.div>

              <motion.div>
                <AdminSelect
                  name="role"
                  value={inputs?.role}
                  onChange={handleInput}
                  list={['Choose One', 'Board-Member', 'Staff', 'Musician']}
                  error={errors?.role}
                />
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div className="flex flex-col mt-8 lg:mt-0 w-full">
              <AdminTextarea
                name="bio"
                value={inputs?.bio}
                onChange={handleInput}
                label="Bio*"
                subLabel="Sqysh will turn your sentences into bullet points—just add a pipe ( | ) after each period so I know where to split them."
                rows={18}
                error={errors?.bio}
              />
            </motion.div>
          </div>
          {/* Action Buttons */}
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
                <span>{isUpdating ? 'Updating' : 'Creating'} Team Member...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>{isUpdating ? 'Update' : 'Create'} Team Member</span>
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
    </form>
  )
}

export default TeamMemberForm
