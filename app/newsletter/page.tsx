'use client'

import React, { FormEvent } from 'react'
import NewsletterForm from '../forms/NewsletterForm'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import Breadcrumb from '../components/common/Breadcrumb'
import { useSubscribeMutation } from '../redux/services/mailchimpApi'
import { createFormActions } from '../redux/features/formSlice'
import validateNewsletterForm from '../validations/validateNewsletterForm'

const Newsletter = () => {
  const { newsletterForm } = useAppSelector((state: RootState) => state.form)
  const dispatch = useAppDispatch()
  const { setErrors } = createFormActions('newsletterForm', dispatch)
  const [subscribe, { isLoading }] = useSubscribeMutation()

  const handleCreateMailchimpNewsletter = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateNewsletterForm(newsletterForm?.inputs, setErrors)
    if (!isValid) return

    try {
      await subscribe({
        firstName: newsletterForm.inputs.firstName,
        lastName: newsletterForm.inputs.lastName,
        email: newsletterForm.inputs.email,
        phoneNumber: newsletterForm.inputs.phoneNumber,
        addr1: newsletterForm.inputs.addr1,
        city: newsletterForm.inputs.city,
        state: newsletterForm.inputs.state,
        zip: newsletterForm.inputs.zip,
        isOption1: newsletterForm.inputs.isOption1,
        isOption2: newsletterForm.inputs.isOption2,
        isOption3: newsletterForm.inputs.isOption3,
        isOption4: newsletterForm.inputs.isOption4,
        isNewPatron: newsletterForm.inputs.isNewPatron,
        agreedToPrivacyStatement: newsletterForm.inputs.agreedToPrivacyStatement
      }).unwrap()
    } catch {}
  }

  return (
    <>
      <Breadcrumb breadcrumb="Newsletter" />
      <NewsletterForm handleSubmit={handleCreateMailchimpNewsletter} isLoading={isLoading} />
    </>
  )
}

export default Newsletter
