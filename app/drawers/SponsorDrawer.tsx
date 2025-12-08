'use client'

import React, { FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch, useFormSelector, useSponsorSelector } from '../redux/store'
import { backdropVariants, drawerVariants } from '../lib/constants/motion'
import { addSponsorToState, setCloseSponsorDrawer, updateSponsorInState } from '../redux/features/sponsorSlice'
import SponsorForm from '../forms/SponsorForm'
import { createFormActions, resetForm } from '../redux/features/formSlice'
import validateSponsorForm from '../validations/validateSponsorForm'
import { useCreateSponsorMutation, useUpdateSponsorMutation } from '../redux/services/sponsorApi'
import deleteFileFromFirebase from '../utils/firebase.delete'
import uploadFileToFirebase from '../utils/firebase.upload'
import { showToast } from '../redux/features/toastSlice'

const SponsorDrawer = () => {
  const dispatch = useAppDispatch()
  const { sponsorDrawer } = useSponsorSelector()
  const { sponsorForm } = useFormSelector()
  const [createSponsor, { isLoading: isCreating }] = useCreateSponsorMutation()
  const [updateSponsor, { isLoading: isUpdating }] = useUpdateSponsorMutation()
  const { handleInput, setErrors, handleUploadProgress, setSubmitted } = createFormActions('sponsorForm', dispatch)

  const inputs = sponsorForm?.inputs
  const errors = sponsorForm?.errors

  const isLoading = isUpdating || isCreating || sponsorForm.submitted
  const isUpdateMode = sponsorForm?.inputs?.isUpdating

  const prepareSponsorData = (uploadedImageURL: string) => ({
    externalLink: inputs.externalLink,
    level: inputs.level,
    amount: inputs.amount,
    name: inputs.name,
    filePath: uploadedImageURL || inputs?.filePath,
    filename: inputs?.file?.name || inputs?.filename
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateSponsorForm(inputs, setErrors)) return

    try {
      setSubmitted(true)
      let uploadedImageURL = ''

      if (inputs?.file) {
        try {
          uploadedImageURL = await uploadFileToFirebase(inputs.file, handleUploadProgress, 'image')
        } catch (error: any) {
          dispatch(
            showToast({
              type: 'error',
              description: 'Failed to upload image to Firebase',
              message: error?.data?.message
            })
          )
          return
        }
      }

      try {
        const sponsorData = prepareSponsorData(uploadedImageURL)

        if (isUpdateMode) {
          const response = await updateSponsor({ id: inputs.id, ...sponsorData }).unwrap()
          dispatch(updateSponsorInState(response.sponsor))
        } else {
          const response = await createSponsor(sponsorData).unwrap()
          dispatch(addSponsorToState(response.sponsor))
        }

        dispatch(
          showToast({
            type: 'success',
            description: 'Success',
            message: `${isUpdateMode ? 'Updated' : 'Created'} the sponsor successfully`
          })
        )
        reset()
      } catch (apiError: any) {
        dispatch(showToast({ type: 'error', description: 'Failed', message: apiError?.data?.message }))
      }
    } catch {
      if (inputs.file) {
        await deleteFileFromFirebase(inputs.file.name, 'image')
      }
    }
  }

  const reset = () => {
    dispatch(setCloseSponsorDrawer())
    dispatch(resetForm('sponsorForm'))
    setSubmitted(false)
  }

  return (
    <AnimatePresence>
      {sponsorDrawer && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={reset}
          />
          <motion.div
            variants={drawerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: 'tween',
              duration: 0.3,
              ease: 'easeInOut'
            }}
            className="h-dvh w-full xl:w-1/2 fixed top-0 right-0 z-50 bg-white shadow-[-10px_0_30px_-5px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto">
              <SponsorForm
                inputs={inputs}
                errors={errors}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                isUpdating={isUpdateMode}
                close={reset}
                loading={isLoading}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SponsorDrawer
