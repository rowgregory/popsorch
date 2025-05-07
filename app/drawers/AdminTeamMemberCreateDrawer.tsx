import React, { FormEvent, useState } from 'react'
import BottomDrawer from '../components/common/BottomDrawer'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { resetTeamMember } from '../redux/features/teamMemberSlice'
import { createFormActions, resetForm, setIsNotCreating } from '../redux/features/formSlice'
import { closeDrawer } from '../redux/features/dashboardSlice'
import { useCreateTeamMemberMutation } from '../redux/services/teamMemberApi'
import uploadFileToFirebase from '../utils/uploadFileToFirebase'
import TeamMemberForm from '../forms/TeamMemberForm'
import validateTeamMemberForm from '../validations/validateTeamMemberForm'
import { increaseTeamMembersCount } from '../redux/features/appSlice'

const AdminTeamMemberCreateDrawer = () => {
  const dispatch = useAppDispatch()
  const { drawer, isUpdating } = useAppSelector((state: RootState) => state.dashboard)
  const { teamMember } = useAppSelector((state: RootState) => state.form)
  const [createTeamMember] = useCreateTeamMemberMutation()
  const [loading, setLoading] = useState(false)
  const { handleUploadProgress, setErrors } = createFormActions('teamMember', dispatch)

  const handleCreateTeamMebmer = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateTeamMemberForm(teamMember?.inputs, setErrors)
    if (!isValid) return

    setLoading(true)

    try {
      const imageUrl = await uploadFileToFirebase(teamMember.inputs.file, handleUploadProgress, 'image')

      await createTeamMember({
        firstName: teamMember.inputs.firstName,
        lastName: teamMember.inputs.lastName,
        position: teamMember.inputs.position,
        bio: teamMember.inputs.bio,
        role: teamMember.inputs.role,
        imageUrl,
        imageFilename: teamMember.inputs.file.name
      }).unwrap()

      reset()
      dispatch(increaseTeamMembersCount())
    } catch {
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    dispatch(resetTeamMember())
    dispatch(resetForm('teamMember'))
    dispatch(closeDrawer())
    dispatch(setIsNotCreating())
  }

  return (
    <BottomDrawer isOpen={drawer && !isUpdating} onClose={reset}>
      <TeamMemberForm handleSubmit={handleCreateTeamMebmer} loading={loading} />
    </BottomDrawer>
  )
}

export default AdminTeamMemberCreateDrawer
