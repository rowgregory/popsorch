import React from 'react'
import { useAppDispatch, useFormSelector, useTeamMemberSelector } from '../redux/store'
import { setCloseTeamMemberDrawer } from '../redux/features/teamMemberSlice'
import { clearErrors, clearInputs, createFormActions } from '../redux/features/formSlice'
import { useCreateTeamMemberMutation, useUpdateTeamMemberMutation } from '../redux/services/teamMemberApi'
import uploadFileToFirebase from '../utils/firebase.upload'
import TeamMemberForm from '../forms/TeamMemberForm'
import validateTeamMemberForm from '../validations/validateTeamMemberForm'
import { AnimatePresence, motion } from 'framer-motion'
import { backdropVariants, drawerVariants } from '../lib/constants/motion'
import getTypeFromFile from '../lib/utils/getTypeFromFile'
import deleteFileFromFirebase from '../utils/firebase.delete'

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

  const prepareTeamMemberData = () => ({
    firstName: inputs.firstName,
    lastName: inputs.lastName,
    position: inputs.position,
    bio: inputs.bio,
    role: inputs.role,
    displayOrder: inputs.displayOrder
  })

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateTeamMemberForm(inputs, setErrors)) return

    try {
      setSubmitted(true)

      const teamMemberData = prepareTeamMemberData()

      let newFilePath = null
      if (isUpdateMode) {
        const fileToDelete = inputs.imageFilenameToDelete

        const fileType = getTypeFromFile(fileToDelete)

        if (inputs.file) {
          await deleteFileFromFirebase(fileToDelete, fileType)

          newFilePath = await uploadFileToFirebase(inputs.file, handleUploadProgress, getTypeFromFile(inputs.file.name))
        }
      } else if (inputs.file) {
        newFilePath = await uploadFileToFirebase(inputs.file, handleUploadProgress, getTypeFromFile(inputs.file.name))
      }

      const finalTeamMemberData = {
        ...teamMemberData,
        ...(newFilePath && { imageUrl: newFilePath, imageFilename: inputs.file.name })
      }

      if (isUpdateMode) {
        await updateTeamMember({
          id: inputs.id,
          ...finalTeamMemberData
        }).unwrap()
      } else {
        await createTeamMember(finalTeamMemberData).unwrap()
      }

      closeDrawer()
    } catch {
    } finally {
      setSubmitted(false)
    }
  }

  const closeDrawer = () => {
    dispatch(setCloseTeamMemberDrawer())
    dispatch(clearErrors({ formName: 'teamMemberForm' }))
    dispatch(clearInputs({ formName: 'teamMemberForm' }))
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
            onClick={closeDrawer}
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
            className="min-h-dvh w-full xl:w-1/2 fixed top-0 right-0 z-50 bg-white shadow-[-10px_0_30px_-5px_rgba(0,0,0,0.2)] flex flex-col"
          >
            <TeamMemberForm
              inputs={inputs}
              errors={errors}
              handleInput={handleInput}
              close={closeDrawer}
              handleSubmit={handleSubmit}
              loading={isLoading}
              isUpdating={isUpdateMode}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default TeamMemberDrawer
