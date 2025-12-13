import { FormEvent } from 'react'
import ConcertForm from '../forms/ConcertForm'
import { useAppDispatch, useConcertSelector, useFormSelector } from '../redux/store'
import { addConcertToState, setCloseConcertDrawer, updateConcertInState } from '../redux/features/concertSlice'
import { createFormActions, resetForm } from '../redux/features/formSlice'
import { useCreateConcertMutation, useUpdateConcertMutation } from '../redux/services/concertApi'
import uploadFileToFirebase from '../utils/firebase.upload'
import validateConcertForm from '../validations/validateConcertForm'
import deleteFileFromFirebase from '../utils/firebase.delete'
import { AnimatePresence, motion } from 'framer-motion'
import { backdropVariants, drawerVariants } from '../lib/constants/motion'
import { showToast } from '../redux/features/toastSlice'

const ConcertDrawer = () => {
  const dispatch = useAppDispatch()
  const { concertDrawer } = useConcertSelector()
  const { concertForm } = useFormSelector()
  const [createConcert, { isLoading: isCreating }] = useCreateConcertMutation()
  const [updateConcert, { isLoading: isUpdating }] = useUpdateConcertMutation()
  const formActions = createFormActions('concertForm', dispatch)

  const inputs = concertForm?.inputs
  const errors = concertForm?.errors

  const isLoading = isUpdating || isCreating || concertForm.submitted
  const isUpdateMode = inputs?.isUpdating

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateConcertForm(inputs, formActions.setErrors)) return

    try {
      formActions.setSubmitted(true)
      let uploadedImageURL = ''

      if (inputs?.file) {
        try {
          uploadedImageURL = await uploadFileToFirebase(inputs.file, formActions.handleUploadProgress, 'image')
        } catch (error: any) {
          dispatch(
            showToast({
              type: 'error',
              description: 'Failed to upload image to Firebase',
              message: error?.data?.message
            })
          )
          return
        }
      }

      try {
        const concertData = prepareConcertData(uploadedImageURL)

        if (isUpdateMode) {
          const response = await updateConcert({ id: inputs.id, ...concertData }).unwrap()
          dispatch(updateConcertInState(response.concert))
        } else {
          const response = await createConcert(concertData).unwrap()
          dispatch(addConcertToState(response.concert))
        }

        dispatch(
          showToast({
            type: 'success',
            description: 'Success',
            message: `${isUpdateMode ? 'Updated' : 'Created'} the concert successfully`
          })
        )
        reset()
      } catch (apiError: any) {
        dispatch(showToast({ type: 'error', description: 'Failed', message: apiError?.data?.message }))
      }
    } catch {
      if (inputs.file) {
        await deleteFileFromFirebase(inputs.file.name, 'image')
      }
    }
  }

  const reset = () => {
    dispatch(setCloseConcertDrawer())
    dispatch(resetForm('concertForm'))
    formActions.setSubmitted(false)
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
                isLoading={isLoading}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ConcertDrawer
