'use client'

import { FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch, useFormSelector, useSponsorSelector } from '@/app/redux/store'
import { backdropVariants, drawerVariants } from '@/app/lib/constants/motion'
import { setCloseSponsorDrawer } from '@/app/redux/features/sponsorSlice'
import SponsorForm from '@/app/components/forms/SponsorForm'
import { createFormActions, resetForm } from '@/app/redux/features/formSlice'
import validateSponsorForm from '@/app/lib/validations/validateSponsorForm'
import deleteFileFromFirebase from '@/app/utils/firebase.delete'
import uploadFileToFirebase from '@/app/utils/firebase.upload'
import { showToast } from '@/app/redux/features/toastSlice'
import { createSponsor } from '@/app/actions/createSponsor'
import { updateSponsor } from '@/app/actions/updateSponsor'
import { useRouter } from 'next/navigation'

const SponsorDrawer = () => {
  const dispatch = useAppDispatch()
  const { sponsorDrawer } = useSponsorSelector()
  const { sponsorForm } = useFormSelector()
  const { handleInput, setErrors, handleUploadProgress } = createFormActions('sponsorForm', dispatch)
  const inputs = sponsorForm?.inputs
  const errors = sponsorForm?.errors
  const isUpdateMode = sponsorForm?.inputs?.isUpdating
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const prepareSponsorData = (uploadedImageURL: string) => ({
    externalLink: inputs.externalLink,
    level: inputs.level,
    amount: inputs.amount,
    name: inputs.name,
    filePath: uploadedImageURL || inputs?.filePath,
    filename: inputs?.file?.name || inputs?.filename
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateSponsorForm(inputs, setErrors)) return

    setLoading(true)
    let uploadedImageURL = ''

    try {
      // Upload image if provided
      if (inputs?.file) {
        try {
          uploadedImageURL = await uploadFileToFirebase(inputs.file, handleUploadProgress, 'image')
        } catch (error) {
          throw new Error(error?.data?.message || 'Failed to upload image')
        }
      }

      const sponsorData = prepareSponsorData(uploadedImageURL)

      if (isUpdateMode) {
        await updateSponsor(inputs.id, sponsorData)
      } else {
        await createSponsor(sponsorData)
      }

      dispatch(
        showToast({
          type: 'success',
          description: 'Success',
          message: `Sponsor ${isUpdateMode ? 'updated' : 'created'} successfully`
        })
      )

      router.refresh()
      reset()
    } catch (error: any) {
      // Delete uploaded image on failure
      if (uploadedImageURL) {
        await deleteFileFromFirebase(inputs?.file?.name, 'image')
      }

      dispatch(
        showToast({
          type: 'error',
          message: error instanceof Error ? error.message : 'An unexpected error occurred'
        })
      )
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    dispatch(setCloseSponsorDrawer())
    dispatch(resetForm('sponsorForm'))
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {sponsorDrawer && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={reset}
          />
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
            className="h-dvh w-full xl:w-1/2 fixed top-0 right-0 z-50 bg-white shadow-[-10px_0_30px_-5px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto">
              <SponsorForm
                inputs={inputs}
                errors={errors}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                isUpdating={isUpdateMode}
                close={reset}
                loading={loading}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SponsorDrawer
