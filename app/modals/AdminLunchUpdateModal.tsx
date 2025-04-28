import React, { FormEvent } from 'react'
import useForm from '../hooks/useForm'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import LunchForm from '../forms/LunchForm'
import { useUpdateLunchMutation } from '../redux/services/lunchApi'
import { closeAdminUpdateLunchModal, resetLunchError } from '../redux/features/lunchSlice'
import Modal from '../components/common/Modal'

const AdminLunchUpdateModal = () => {
  const dispatch = useAppDispatch()
  const { openAdminUpdateLunchModal, modalContent } = useAppSelector((state: RootState) => state.lunch)
  const [updateLunch, { isLoading, error }] = useUpdateLunchMutation()
  const { inputs, errors, handleInput, setInputs, setErrors, setSubmitted, submitted } = useForm(
    {},
    () => {},
    modalContent
  )

  const reset = () => {
    dispatch(resetLunchError())
    dispatch(closeAdminUpdateLunchModal())
    setErrors({})
    setInputs({})
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    try {
      await updateLunch(inputs).unwrap()
      reset()
    } catch {}
  }

  return (
    <Modal isOpen={openAdminUpdateLunchModal} onClose={reset}>
      <LunchForm
        onSubmit={handleSubmit}
        inputs={inputs}
        submitted={submitted}
        errors={errors}
        handleInput={handleInput}
        error={error}
        isLoading={isLoading}
        isUpdating={true}
        setInputs={setInputs}
      />
    </Modal>
  )
}

export default AdminLunchUpdateModal
