import { useState } from 'react'
import { useAppDispatch, useFormSelector, useTeamMemberSelector } from '@/app/redux/store'
import { setCloseTeamMemberDrawer } from '@/app/redux/features/teamMemberSlice'
import { createFormActions, resetForm } from '@/app/redux/features/formSlice'
import uploadFileToFirebase from '@/app/utils/firebase.upload'
import TeamMemberForm from '@/app/components/forms/TeamMemberForm'
import validateTeamMemberForm from '@/app/lib/validations/validateTeamMemberForm'
import { AnimatePresence, motion } from 'framer-motion'
import { backdropVariants, drawerVariants } from '@/app/lib/constants/motion'
import deleteFileFromFirebase from '@/app/utils/firebase.delete'
import { showToast } from '@/app/redux/features/toastSlice'
import { useRouter } from 'next/navigation'
import { updateTeamMember } from '@/app/actions/updateTeamMember'
import { createTeamMember } from '@/app/actions/createTeamMember'

const TeamMemberDrawer = () => {
  const dispatch = useAppDispatch()
  const { teamMemberDrawer } = useTeamMemberSelector()
  const { teamMemberForm } = useFormSelector()
  const router = useRouter()
  const { handleInput, handleUploadProgress, setErrors } = createFormActions('teamMemberForm', dispatch)
  const inputs = teamMemberForm?.inputs
  const errors = teamMemberForm?.errors
  const isUpdateMode = teamMemberForm?.inputs?.isUpdating
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateTeamMemberForm(inputs, setErrors)) return

    setLoading(true)
    let uploadedImageURL = ''

    try {
      if (inputs?.file) {
        try {
          uploadedImageURL = await uploadFileToFirebase(inputs.file, handleUploadProgress, 'image')
        } catch (error: any) {
          throw new Error(error?.data?.message || 'Failed to upload image')
        }
      }

      const teamMemberData = prepareTeamMemberData(uploadedImageURL)

      if (isUpdateMode) {
        await updateTeamMember(inputs.id, teamMemberData)
      } else {
        await createTeamMember(teamMemberData)
      }

      dispatch(
        showToast({
          type: 'success',
          description: 'Success',
          message: `Team member ${isUpdateMode ? 'updated' : 'created'} successfully!`
        })
      )

      router.refresh()
      reset()
    } catch (error) {
      // Delete uploaded image on failure
      if (uploadedImageURL) {
        await deleteFileFromFirebase(inputs.file.name, 'image')
      }
      dispatch(showToast({ type: 'error', description: 'Failed', message: error?.data?.message }))
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    dispatch(setCloseTeamMemberDrawer())
    dispatch(resetForm('teamMemberForm'))
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
                loading={loading}
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
