import React, { FormEvent, useCallback, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { useUpdateTeamMemberMutation } from '../redux/services/teamMemberApi'
import { createFormActions, resetForm, setIsNotCreating } from '../redux/features/formSlice'
import uploadFileToFirebase from '../utils/firebase.upload'
import { resetTeamMember } from '../redux/features/teamMemberSlice'
import { closeDrawer } from '../redux/features/dashboardSlice'
import BottomDrawer from '../components/common/BottomDrawer'
import TeamMemberForm from '../forms/TeamMemberForm'
import validateTeamMemberForm from '../validations/validateTeamMemberForm'

const AdminTeamMemberUpdateDrawer = () => {
  const dispatch = useAppDispatch()
  const { drawer, isUpdating } = useAppSelector((state: RootState) => state.dashboard)
  const { teamMember } = useAppSelector((state: RootState) => state.form)
  const [updateTeamMember] = useUpdateTeamMemberMutation()
  const [loading, setLoading] = useState(false)
  const { handleUploadProgress, setErrors } = createFormActions('teamMember', dispatch)

  const handleUpdateTeamMember = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateTeamMemberForm(teamMember?.inputs, setErrors)
    if (!isValid) return

    setLoading(true)

    try {
      let imageUrl
      if (teamMember?.inputs?.file) {
        imageUrl = await uploadFileToFirebase(teamMember.inputs.file, handleUploadProgress, 'image')
      }

      await updateTeamMember({
        id: teamMember.inputs.id,
        firstName: teamMember.inputs.firstName,
        lastName: teamMember.inputs.lastName,
        position: teamMember.inputs.position,
        bio: teamMember.inputs.bio,
        role: teamMember.inputs.role,
        imageUrl: teamMember?.inputs?.file ? imageUrl : teamMember.inputs.imageUrl,
        imageFilename: teamMember?.inputs?.file ? teamMember?.inputs?.file?.name : teamMember.inputs.imageFilename
      }).unwrap()

      reset()
    } catch {}

    setLoading(false)
  }

  const reset = useCallback(() => {
    dispatch(resetTeamMember())
    dispatch(resetForm('teamMember'))
    dispatch(closeDrawer())
    dispatch(setIsNotCreating())
  }, [dispatch])

  return (
    <BottomDrawer isOpen={drawer && isUpdating} onClose={reset}>
      <TeamMemberForm handleSubmit={handleUpdateTeamMember} loading={loading} />
    </BottomDrawer>
  )
}

export default AdminTeamMemberUpdateDrawer
