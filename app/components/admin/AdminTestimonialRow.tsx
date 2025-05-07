import React, { FC, MouseEvent, useState } from 'react'
import { useAppDispatch } from '@/app/redux/store'
import { openUpdateDrawer } from '@/app/redux/features/dashboardSlice'
import { createFormActions } from '@/app/redux/features/formSlice'
import { resetTestimonial, TestimonialProps } from '@/app/redux/features/testimonialSlice'
import { useDeleteTestimonialMutation } from '@/app/redux/services/testimonialApi'
import { decreaseTestimonialsCount } from '@/app/redux/features/appSlice'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'

const AdminTestimonialRow: FC<{ testimonial: TestimonialProps }> = ({ testimonial }) => {
  const dispatch = useAppDispatch()
  const { setInputs } = createFormActions('testimonial', dispatch)
  const [deleteTestimonial] = useDeleteTestimonialMutation()
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const handleTestimonialDelete = async (e: MouseEvent, testimonialId: string) => {
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [testimonialId]: true }))

    try {
      await deleteTestimonial({ id: testimonialId }).unwrap()

      dispatch(resetTestimonial())
      dispatch(decreaseTestimonialsCount())
    } catch {}

    setLoading((prev) => ({ ...prev, [testimonialId]: false }))
  }

  return (
    <div
      onClick={() => {
        dispatch(openUpdateDrawer())
        setInputs(testimonial)
      }}
      className="grid grid-cols-[4fr_7fr_1fr] h-14 gap-x-3 bg-midnightblack hover:bg-inkblack rounded-[5px] pl-4 py-2 pr-2 border-l-4 border-l-teal-500 items-center duration-200 cursor-pointer"
    >
      <div className="truncate">{testimonial?.name}</div>
      <div className="truncate">{testimonial?.review}</div>
      <div>
        <AdminTrashDeleteBtn loading={loading} id={testimonial?.id} handleDelete={handleTestimonialDelete} />
      </div>
    </div>
  )
}

export default AdminTestimonialRow
