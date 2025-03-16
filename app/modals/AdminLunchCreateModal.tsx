import React, { FormEvent } from 'react'
import useForm from '../hooks/useForm'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import LunchForm from '../forms/LunchForm'
import { useCreateLunchMutation } from '../redux/services/lunchApi'
import { LUNCH_INITIAL_VALUES } from '@/public/data/form-initial-values'
import { closeModal } from '../redux/features/dashboardSlice'
import { resetLunchError } from '../redux/features/lunchSlice'
import Modal from '../components/common/Modal'

const AdminLunchCreateModal = () => {
  const dispatch = useAppDispatch()
  const { modal } = useAppSelector((state: RootState) => state.dashboard)
  const [createTestimonial, { isLoading, error }] = useCreateLunchMutation()
  const { inputs, errors, handleInput, setInputs, setErrors, setSubmitted, submitted } = useForm(LUNCH_INITIAL_VALUES)

  const reset = () => {
    dispatch(resetLunchError())
    dispatch(closeModal())
    setErrors({})
    setInputs({})
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    await createTestimonial(inputs)
      .unwrap()
      .then(() => reset())
      .catch(() => {})
  }

  return (
    <Modal isOpen={modal} onClose={reset}>
      <LunchForm
        onSubmit={handleSubmit}
        inputs={inputs}
        submitted={submitted}
        errors={errors}
        handleInput={handleInput}
        error={error}
        isLoading={isLoading}
        isUpdating={false}
        setInputs={setInputs}
      />
    </Modal>
  )
}

export default AdminLunchCreateModal
