import React, { FC, FormEvent } from 'react'
import { useAppDispatch, useFormSelector } from '../redux/store'
import { createFormActions, resetForm } from '../redux/features/formSlice'
import ContactFormTextarea from './elements/ContactFormTextarea'
import { useCreateQuestionMutation } from '../redux/services/questionApi'
import CampInput from './elements/CampInput'
import validateContactForm from '../validations/validateContactForm'
import Spinner from '../components/common/Spinner'
import { increaseQuestionCount } from '../redux/features/appSlice'
import { showToast } from '../redux/features/toastSlice'
import { addQuestionToState } from '../redux/features/questionSlice'

const ContactForm: FC<{ btnClassname?: string }> = ({ btnClassname }) => {
  const dispatch = useAppDispatch()
  const { questionForm } = useFormSelector()

  const { handleInput, setErrors } = createFormActions('questionForm', dispatch)
  const [createQuestion, { isLoading }] = useCreateQuestionMutation()

  const inputs = questionForm?.inputs
  const errors = questionForm?.errors

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateContactForm(inputs, setErrors)) return

    try {
      const response = await createQuestion({
        name: inputs.name,
        email: inputs.email,
        message: inputs.message
      }).unwrap()
      dispatch(addQuestionToState(response.question))
      dispatch(
        showToast({
          type: 'success',
          description: 'Success',
          message: 'Question successfully transmitted.'
        })
      )
      dispatch(resetForm('questionForm'))
      dispatch(increaseQuestionCount())
    } catch {}
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-y-8 990:gap-8 w-full max-w-screen-md">
      <div className="col-span-12 990:col-span-6">
        <CampInput
          name="name"
          value={inputs?.name}
          handleInput={handleInput}
          placeholder="Your Name"
          error={errors?.name}
        />
      </div>
      <div className="col-span-12 990:col-span-6">
        <CampInput
          name="email"
          value={inputs?.email}
          handleInput={handleInput}
          placeholder="Your Email"
          error={errors?.email}
        />
      </div>
      <div className="col-span-12">
        <ContactFormTextarea
          name="message"
          value={inputs?.message}
          onChange={handleInput}
          placeholder="Ask your question here..."
          error={errors?.message}
        />
      </div>
      <div className={`col-span-12 flex items-center ${btnClassname ?? 'justify-center'}  mt-3`}>
        <button
          type="submit"
          className="bg-blaze font-changa text-12 text-white px-8 py-4 uppercase font-semibold tracking-widest rounded-sm hover:bg-blazehover duration-300 min-w-36"
        >
          {isLoading ? <Spinner fill="fill-white" track="text-blaze" /> : 'Submit Now'}
        </button>
      </div>
    </form>
  )
}

export default ContactForm
