import React, { FormEvent, useState } from 'react'
import BottomDrawer from '../components/common/BottomDrawer'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { useUpdateTestimonialMutation } from '../redux/services/testimonialApi'
import { resetForm, setIsNotCreating } from '../redux/features/formSlice'
import { resetTestimonial } from '../redux/features/testimonialSlice'
import { closeDrawer } from '../redux/features/dashboardSlice'
import TestimonialForm from '../forms/TestimonialForm'

const AdminTestimonialUpdateDrawer = () => {
  const dispatch = useAppDispatch()
  const { drawer, isUpdating } = useAppSelector((state: RootState) => state.dashboard)
  const { testimonial } = useAppSelector((state: RootState) => state.form)
  const [updateTestimonial] = useUpdateTestimonialMutation()
  const [loading, setLoading] = useState(false)

  const handleUpdateTestimonial = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateTestimonial({
        id: testimonial.inputs.id,
        name: testimonial.inputs.name,
        review: testimonial.inputs.review
      }).unwrap()

      reset()
    } catch {}

    setLoading(false)
  }

  const reset = () => {
    dispatch(resetTestimonial())
    dispatch(resetForm('testimonial'))
    dispatch(closeDrawer())
    dispatch(setIsNotCreating())
  }
  return (
    <BottomDrawer isOpen={drawer && isUpdating} onClose={reset}>
      <TestimonialForm handleSubmit={handleUpdateTestimonial} loading={loading} />
    </BottomDrawer>
  )
}

export default AdminTestimonialUpdateDrawer
