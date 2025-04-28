import React, { FormEvent, useState } from 'react'
import BottomDrawer from '../components/common/BottomDrawer'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { useCreateTestimonialMutation, useFetchTestimonialsQuery } from '../redux/services/testimonialApi'
import { createFormActions, resetForm, setIsNotCreating } from '../redux/features/formSlice'
import { resetTestimonial } from '../redux/features/testimonialSlice'
import { closeDrawer } from '../redux/features/dashboardSlice'
import TestimonialForm from '../forms/TestimonialForm'
import validateTestimonialForm from '../validations/validateTestimonialForm'
import { setTestimonialsCount } from '../redux/features/appSlice'

const AdminTestimonialCreateDrawer = () => {
  const dispatch = useAppDispatch()
  const { drawer, isUpdating } = useAppSelector((state: RootState) => state.dashboard)
  const [createTestimonial] = useCreateTestimonialMutation()
  const { testimonial } = useAppSelector((state: RootState) => state.form)
  const { testimonialsCount } = useAppSelector((state: RootState) => state.app)
  const { setErrors } = createFormActions('testimonial', dispatch)
  const [loading, setLoading] = useState(false)
  const { success } = useAppSelector((state: RootState) => state.testimonial)
  useFetchTestimonialsQuery(undefined, { skip: !success })

  const handleCreateTestimonial = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateTestimonialForm(testimonial?.inputs, setErrors)
    if (!isValid) return

    setLoading(true)

    try {
      await createTestimonial({
        name: testimonial.inputs.name,
        review: testimonial.inputs.review
      }).unwrap()

      reset()
      dispatch(setTestimonialsCount(testimonialsCount + 1))
    } catch {
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    dispatch(resetTestimonial())
    dispatch(resetForm('testimonial'))
    dispatch(closeDrawer())
    dispatch(setIsNotCreating())
  }
  return (
    <BottomDrawer isOpen={drawer && !isUpdating} onClose={reset}>
      <TestimonialForm handleSubmit={handleCreateTestimonial} loading={loading} />
    </BottomDrawer>
  )
}

export default AdminTestimonialCreateDrawer
