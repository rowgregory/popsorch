import React, { FC } from 'react'
import { createFormActions, resetForm } from '../redux/features/formSlice'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { closeDrawer } from '../redux/features/dashboardSlice'
import AdminInput from './elements/AdminInput'
import AdminFormBtns from '../components/admin/AdminFormBtns'
import AdminFormPhoto from '../components/admin/AdminFormPhoto'
import AdminTextarea from './elements/AdminTextarea'

const VenueForm: FC<{ handleSubmit: any; loading: boolean }> = ({ handleSubmit, loading }) => {
  const dispatch = useAppDispatch()
  const { venue } = useAppSelector((state: RootState) => state.form)
  const { isUpdating } = useAppSelector((state: RootState) => state.dashboard)
  const { handleInput, handleFileChange } = createFormActions('venue', dispatch)

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto h-full flex items-center flex-col max-h-1000:justify-start justify-center max-h-1000:my-20 430:px-6"
    >
      <div className="flex flex-col w-full max-w-3xl">
        <div className="animate-translate-y-up flex flex-col gap-y-14">
          <h1 className="text-3xl font-changa">{isUpdating ? 'Update' : 'Create'} venue</h1>
          <div className="flex flex-col md:flex-row md:gap-14">
            <div className="flex flex-col gap-y-8 w-full">
              <AdminInput
                name="name"
                value={venue?.inputs?.name}
                onChange={handleInput}
                label="Name"
                error={venue?.errors?.name}
              />
              <AdminInput
                name="capacity"
                value={venue?.inputs?.capacity}
                onChange={handleInput}
                label="Capacity"
                error={venue?.errors?.capacity}
              />
              <AdminTextarea
                name="address"
                value={venue?.inputs?.address}
                onChange={handleInput}
                label="Address"
                rows={2}
                error={venue?.errors?.address}
              />
              <AdminFormPhoto
                name={venue?.inputs?.file?.name}
                filename={venue?.inputs?.imageFilename}
                handleFileChange={handleFileChange}
                color="text-yellow-400"
                error={venue?.errors?.imageUrl}
              />
            </div>
            <div className="flex flex-col mt-8 760:mt-0 gap-y-8 w-full">
              <AdminTextarea
                name="accessibility"
                value={venue?.inputs?.accessibility}
                onChange={handleInput}
                label="Accessibility"
                rows={4}
                error={venue?.errors?.accessibility}
              />
              <AdminTextarea
                name="parking"
                value={venue?.inputs?.parking}
                onChange={handleInput}
                label="Parking"
                rows={4}
                error={venue?.errors?.parking}
              />
              <AdminTextarea
                name="immersiveEnvironment"
                value={venue?.inputs?.immersiveEnvironment}
                onChange={handleInput}
                label="Immersive Experience"
                rows={4}
                error={venue?.errors?.immersiveEnvironment}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-2 mt-10 justify-center">
          <AdminFormBtns
            close={() => {
              dispatch(resetForm('venue'))
              dispatch(closeDrawer())
            }}
            loading={loading}
            isUpdating={isUpdating}
            btnColor="bg-yellow-400"
            spinnerTrack="text-yellow-400"
          />
        </div>
      </div>
    </form>
  )
}

export default VenueForm
