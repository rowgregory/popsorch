import React, { FC, MouseEvent, useState } from 'react'
import { openUpdateDrawer } from '@/app/redux/features/dashboardSlice'
import { createFormActions } from '@/app/redux/features/formSlice'
import { resetTestimonial, TestimonialProps } from '@/app/redux/features/testimonialSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { useDeleteTestimonialMutation } from '@/app/redux/services/testimonialApi'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'
import { setTestimonialsCount } from '@/app/redux/features/appSlice'

const AdminTestimonialRow: FC<{ testimonial: TestimonialProps }> = ({ testimonial }) => {
  const dispatch = useAppDispatch()
  const { testimonialsCount } = useAppSelector((state: RootState) => state.app)
  const { setInputs } = createFormActions('testimonial', dispatch)
  const [deleteTestimonial] = useDeleteTestimonialMutation()
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const handleTestimonialDelete = async (e: MouseEvent, testimonialId: string) => {
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [testimonialId]: true }))

    try {
      await deleteTestimonial({ id: testimonialId }).unwrap()

      dispatch(resetTestimonial())
      dispatch(setTestimonialsCount(testimonialsCount - 1))
    } catch {}

    setLoading((prev) => ({ ...prev, [testimonialId]: false }))
  }

  return (
    <div
      onClick={() => {
        dispatch(openUpdateDrawer())
        setInputs(testimonial)
      }}
      className="grid grid-cols-12 h-14 gap-x-3 bg-midnightblack hover:bg-inkblack rounded-[5px] pl-4 py-2 pr-2 border-l-4 border-l-teal-500 items-center duration-200 cursor-pointer"
    >
      <div className="col-span-3 truncate">{testimonial?.name}</div>
      <div className="col-span-8 truncate">{testimonial?.review}</div>
      <div className="col-span-1 truncate">
        <AdminTrashDeleteBtn loading={loading} id={testimonial?.id} handleDelete={handleTestimonialDelete} />
      </div>
    </div>
  )
}

export default AdminTestimonialRow
