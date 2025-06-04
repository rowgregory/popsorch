import React, { FC } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { createFormActions, resetForm } from '../redux/features/formSlice'
import { closeDrawer } from '../redux/features/dashboardSlice'
import AdminInput from './elements/AdminInput'
import AdminFormPhoto from '../components/admin/AdminFormPhoto'
import AdminSelect from './elements/AdminSelect'
import AdminTextarea from './elements/AdminTextarea'
import AdminFormBtns from '../components/admin/AdminFormBtns'

const TeamMemberForm: FC<{ handleSubmit: any; loading: boolean }> = ({ handleSubmit, loading }) => {
  const dispatch = useAppDispatch()
  const { teamMember } = useAppSelector((state: RootState) => state.form)
  const { isUpdating } = useAppSelector((state: RootState) => state.dashboard)
  const { handleInput, handleFileChange } = createFormActions('teamMember', dispatch)

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto h-full flex items-center flex-col max-h-1000:justify-start justify-center max-h-1000:my-20"
    >
      <div className="flex flex-col w-full max-w-3xl">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-x-4">
              <h1 className="text-3xl font-changa">{isUpdating ? 'Update' : 'Create'} team member</h1>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-14">
            <div className="flex flex-col gap-y-8 w-full">
              <AdminInput
                name="firstName"
                value={teamMember?.inputs?.firstName}
                onChange={handleInput}
                label="First Name*"
                error={teamMember?.errors?.firstName}
              />
              <AdminInput
                name="lastName"
                value={teamMember?.inputs?.lastName}
                onChange={handleInput}
                label="Last Name*"
                error={teamMember?.errors?.lastName}
              />
              <AdminInput
                name="position"
                value={teamMember?.inputs?.position}
                onChange={handleInput}
                label="Position*"
                error={teamMember?.errors?.position}
              />
              <AdminFormPhoto
                name={teamMember?.inputs?.file?.name}
                filename={teamMember?.inputs?.imageFilename}
                handleFileChange={handleFileChange}
                color="text-purple-400"
                error={teamMember?.errors?.imageUrl}
              />
            </div>
            <div className="flex flex-col mt-8 760:mt-0 gap-y-8 w-full">
              <AdminSelect
                name="role"
                value={teamMember?.inputs?.role}
                onChange={handleInput}
                list={['Choose One', 'Board-Member', 'Staff']}
                error={teamMember?.errors?.role}
              />
              <AdminTextarea
                name="bio"
                value={teamMember?.inputs?.bio}
                onChange={handleInput}
                label="Bio*"
                subLabel="Sqysh will turn your sentences into bullet points—just add a pipe ( | ) after each period so I know where to split them."
                rows={15}
                error={teamMember?.errors?.bio}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col 576:flex-row gap-y-2 items-center gap-x-2 my-10 justify-center">
          <AdminFormBtns
            close={() => {
              dispatch(resetForm('teamMember'))
              dispatch(closeDrawer())
            }}
            loading={loading}
            isUpdating={isUpdating}
            btnColor="bg-purple-500"
            spinnerTrack="text-purple-500"
          />
        </div>
      </div>
    </form>
  )
}

export default TeamMemberForm
