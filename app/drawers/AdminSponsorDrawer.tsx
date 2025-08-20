'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { backdropVariants, drawerVariants } from '../lib/constants/motion'
import { setCloseSponsorDrawer } from '../redux/features/sponsorSlice'
import SponsorForm from '../forms/SponsorForm'
import { clearInputs, createFormActions } from '../redux/features/formSlice'
import validateSponsorForm from '../validations/validateSponsorForm'
import { useCreateSponsorMutation, useUpdateSponsorMutation } from '../redux/services/sponsorApi'
import deleteFileFromFirebase from '../utils/firebase.delete'
import uploadFileToFirebase from '../utils/firebase.upload'

const getTypeFromFile = (fileName: string): 'image' | 'video' => {
  const extension = fileName?.toLowerCase()?.split?.('.')?.pop()
  const videoExtensions = ['mp4', 'mov', 'avi', 'webm', 'quicktime']
  return videoExtensions.includes(extension || '') ? 'video' : 'image'
}

const AdminSponsorDrawer = () => {
  const dispatch = useAppDispatch()
  const { sponsorDrawer } = useAppSelector((state: RootState) => state.sponsor)
  const closeDrawer = () => dispatch(setCloseSponsorDrawer())
  const { handleInput, setErrors, handleUploadProgress } = createFormActions('sponsorForm', dispatch)
  const { sponsorForm } = useAppSelector((state: RootState) => state.form)
  const [submitting, setSubmitting] = useState(false)

  const [createSponsor, { isLoading: isCreating }] = useCreateSponsorMutation()
  const [updateSponsor, { isLoading: isUpdating }] = useUpdateSponsorMutation()

  const isLoading = isUpdating || isCreating || submitting
  const isUpdateMode = sponsorForm?.inputs?.isUpdating

  const prepareSponsorData = () => ({
    externalLink: sponsorForm.inputs.externalLink,
    level: sponsorForm.inputs.level,
    color: sponsorForm.inputs.color,
    description: sponsorForm.inputs.description
  })

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateSponsorForm(sponsorForm.inputs, setErrors)) return

    try {
      setSubmitting(true)

      const sponsorData = prepareSponsorData()

      let mediaUrl = null
      if (isUpdateMode) {
        const fileToDelete = sponsorForm.inputs.fileName

        const fileType = getTypeFromFile(fileToDelete)

        if (sponsorForm.inputs.wantsToRemove) {
          await deleteFileFromFirebase(fileToDelete, fileType)
        }
        if (sponsorForm.inputs.wantsToReplace) {
          if (sponsorForm.inputs.shouldDeleteOriginal) {
            await deleteFileFromFirebase(fileToDelete, fileType)
          }

          mediaUrl = await uploadFileToFirebase(
            sponsorForm.inputs.media,
            handleUploadProgress,
            getTypeFromFile(sponsorForm.inputs.media.name)
          )
        }
      } else if (sponsorForm.inputs.media) {
        mediaUrl = await uploadFileToFirebase(
          sponsorForm.inputs.media,
          handleUploadProgress,
          getTypeFromFile(sponsorForm.inputs.media.name)
        )
      }

      const finalSponsorData = {
        ...sponsorData,
        ...(mediaUrl && { filePath: mediaUrl, fileName: sponsorForm.inputs.media.name }),
        ...(sponsorForm.inputs.wantsToRemove && { filePath: null, fileName: null })
      }

      if (isUpdateMode) {
        await updateSponsor({
          sponsorId: sponsorForm.inputs.id,
          ...finalSponsorData
        }).unwrap()
      } else {
        await createSponsor(finalSponsorData).unwrap()
      }

      dispatch(clearInputs({ formName: 'sponsorForm' }))
    } catch {
    } finally {
      setSubmitting(false)
    }
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
            onClick={closeDrawer}
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
            className="min-h-dvh w-full xl:w-1/2 fixed top-0 right-0 z-50 bg-white shadow-[-10px_0_30px_-5px_rgba(0,0,0,0.2)] flex flex-col"
          >
            <SponsorForm
              inputs={sponsorForm.inputs}
              errors={sponsorForm.errors}
              handleInput={handleInput}
              close={closeDrawer}
              handleSubmit={handleSubmit}
              loading={isLoading}
              isUpdating={isUpdateMode}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AdminSponsorDrawer
