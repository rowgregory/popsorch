import React, { FC } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { createFormActions, resetForm } from '../redux/features/formSlice'
import { closeDrawer } from '../redux/features/dashboardSlice'
import AdminInput from './elements/AdminInput'
import AdminTextarea from './elements/AdminTextarea'
import AdminFormBtns from '../components/admin/AdminFormBtns'

const TestimonialForm: FC<{ handleSubmit: any; loading: boolean }> = ({ handleSubmit, loading }) => {
  const dispatch = useAppDispatch()
  const { testimonial } = useAppSelector((state: RootState) => state.form)
  const { isUpdating } = useAppSelector((state: RootState) => state.dashboard)
  const { handleInput } = createFormActions('testimonial', dispatch)

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto h-full flex items-center flex-col max-h-1000:justify-start justify-center max-h-1000:my-20"
    >
      <div className="flex flex-col w-full max-w-xl">
        <div className="animate-translate-y-up flex flex-col gap-y-8">
          <h1 className="text-3xl font-changa">{isUpdating ? 'Update' : 'Create'} Testimonial</h1>
          <div className="flex flex-col gap-y-8 w-full">
            <AdminInput
              name="name"
              value={testimonial?.inputs?.name}
              onChange={handleInput}
              label="Name*"
              error={testimonial?.errors?.name}
            />
            <AdminTextarea
              name="review"
              value={testimonial?.inputs?.review}
              onChange={handleInput}
              label="Review*"
              error={testimonial?.errors?.review}
            />
          </div>
        </div>
        <div className="flex items-center gap-x-2 mt-10 justify-center">
          <AdminFormBtns
            close={() => {
              dispatch(resetForm('testimonial'))
              dispatch(closeDrawer())
            }}
            loading={loading}
            isUpdating={isUpdating}
            btnColor="bg-teal-400"
            spinnerTrack="text-teal-400"
          />
        </div>
      </div>
    </form>
  )
}

export default TestimonialForm
