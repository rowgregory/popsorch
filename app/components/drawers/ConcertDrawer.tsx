import { useState } from 'react'
import ConcertForm from '@/app/components/forms/ConcertForm'
import { useAppDispatch, useConcertSelector, useFormSelector } from '@/app/redux/store'
import { setCloseConcertDrawer } from '@/app/redux/features/concertSlice'
import { createFormActions, resetForm } from '@/app/redux/features/formSlice'
import uploadFileToFirebase from '@/app/utils/firebase.upload'
import validateConcertForm from '@/app/lib/validations/validateConcertForm'
import deleteFileFromFirebase from '@/app/utils/firebase.delete'
import { AnimatePresence, motion } from 'framer-motion'
import { backdropVariants, drawerVariants } from '@/app/lib/constants/motion'
import { showToast } from '@/app/redux/features/toastSlice'
import { createConcert } from '@/app/actions/createConcert'
import { useRouter } from 'next/navigation'
import { updateConcert } from '@/app/actions/updateConcert'

const ConcertDrawer = () => {
  const dispatch = useAppDispatch()
  const { concertDrawer } = useConcertSelector()
  const { concertForm } = useFormSelector()
  const formActions = createFormActions('concertForm', dispatch)
  const router = useRouter()
  const inputs = concertForm?.inputs
  const errors = concertForm?.errors
  const isUpdateMode = inputs?.isUpdating
  const [loading, setLoading] = useState(false)

  const prepareConcertData = (uploadedImageURL: string) => ({
    name: inputs.name,
    pressRelease: inputs.pressRelease,
    description: inputs.description,
    eventDetails: inputs.eventDetails,
    imageUrl: uploadedImageURL || inputs?.imageUrl,
    imageFilename: inputs?.file?.name || inputs?.imageFilename,
    type: inputs.type,
    cardDate: inputs.cardDate,
    allSeriesExternalLink: inputs.allSeriesExternalLink
  })

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateConcertForm(inputs, formActions.setErrors)) return

    setLoading(true)
    let uploadedImageURL = ''

    try {
      // Upload image if provided
      if (inputs?.file) {
        try {
          uploadedImageURL = await uploadFileToFirebase(inputs.file, formActions.handleUploadProgress, 'image')
        } catch (error) {
          throw new Error(error?.data?.message || 'Failed to upload image')
        }
      }

      // Prepare concert data
      const concertData = prepareConcertData(uploadedImageURL)

      if (isUpdateMode) {
        await updateConcert(inputs.id, concertData)
      } else {
        await createConcert(concertData)
      }

      dispatch(
        showToast({
          type: 'success',
          message: `Concert ${isUpdateMode ? 'updated' : 'created'} successfully!`
        })
      )

      router.refresh()
      reset()
    } catch (error) {
      // Delete uploaded image on failure
      if (uploadedImageURL) {
        await deleteFileFromFirebase(inputs.file.name, 'image')
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
    dispatch(setCloseConcertDrawer())
    dispatch(resetForm('concertForm'))
  }

  return (
    <AnimatePresence>
      {concertDrawer && (
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
              <ConcertForm
                inputs={inputs}
                errors={errors}
                formActions={formActions}
                onSubmit={handleSubmit}
                isUpdating={isUpdateMode}
                close={reset}
                isLoading={loading}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ConcertDrawer
