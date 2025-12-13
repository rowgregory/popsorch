import { FormEvent } from 'react'
import { useAppDispatch, useFormSelector, useTeamMemberSelector } from '../redux/store'
import {
  addTeamMemberToState,
  setCloseTeamMemberDrawer,
  updateTeamMemberInState
} from '../redux/features/teamMemberSlice'
import { createFormActions, resetForm } from '../redux/features/formSlice'
import { useCreateTeamMemberMutation, useUpdateTeamMemberMutation } from '../redux/services/teamMemberApi'
import uploadFileToFirebase from '../utils/firebase.upload'
import TeamMemberForm from '../forms/TeamMemberForm'
import validateTeamMemberForm from '../validations/validateTeamMemberForm'
import { AnimatePresence, motion } from 'framer-motion'
import { backdropVariants, drawerVariants } from '../lib/constants/motion'
import deleteFileFromFirebase from '../utils/firebase.delete'
import { showToast } from '../redux/features/toastSlice'

const TeamMemberDrawer = () => {
  const dispatch = useAppDispatch()
  const { teamMemberDrawer } = useTeamMemberSelector()
  const { handleInput, handleUploadProgress, setErrors, setSubmitted } = createFormActions('teamMemberForm', dispatch)
  const { teamMemberForm, submitting } = useFormSelector()

  const [createTeamMember, { isLoading: isCreating }] = useCreateTeamMemberMutation()
  const [updateTeamMember, { isLoading: isUpdating }] = useUpdateTeamMemberMutation()

  const isLoading = isUpdating || isCreating || submitting
  const isUpdateMode = teamMemberForm?.inputs?.isUpdating

  const inputs = teamMemberForm?.inputs
  const errors = teamMemberForm?.errors

  const prepareTeamMemberData = (uploadedImageURL: string) => ({
    firstName: inputs.firstName,
    lastName: inputs.lastName,
    position: inputs.position,
    bio: inputs.bio,
    role: inputs.role,
    displayOrder: inputs.displayOrder,
    imageUrl: uploadedImageURL || inputs?.imageUrl,
    imageFilename: inputs?.file?.name || inputs?.imageFilename
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateTeamMemberForm(inputs, setErrors)) return

    try {
      setSubmitted(true)
      let uploadedImageURL = ''

      if (inputs?.file) {
        try {
          uploadedImageURL = await uploadFileToFirebase(inputs.file, handleUploadProgress, 'image')
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
        const teamMemberData = prepareTeamMemberData(uploadedImageURL)

        if (isUpdateMode) {
          const response = await updateTeamMember({ id: inputs.id, ...teamMemberData }).unwrap()
          dispatch(updateTeamMemberInState(response.teamMember))
        } else {
          const response = await createTeamMember(teamMemberData).unwrap()
          dispatch(addTeamMemberToState(response.teamMember))
        }

        dispatch(
          showToast({
            type: 'success',
            description: 'Success',
            message: `${isUpdateMode ? 'Updated' : 'Created'} the teamMember successfully`
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
    dispatch(setCloseTeamMemberDrawer())
    dispatch(resetForm('teamMemberForm'))
    setSubmitted(false)
  }

  return (
    <AnimatePresence>
      {teamMemberDrawer && (
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
              <TeamMemberForm
                inputs={inputs}
                errors={errors}
                handleInput={handleInput}
                close={reset}
                handleSubmit={handleSubmit}
                loading={isLoading}
                isUpdating={isUpdateMode}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TeamMemberDrawer
