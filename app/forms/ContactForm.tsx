import React, { FC, FormEvent } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { createFormActions } from '../redux/features/formSlice'
import ContactFormTextarea from './elements/ContactFormTextarea'
import { useCreateQuestionMutation } from '../redux/services/questionApi'
import CampInput from './elements/CampInput'
import validateContactForm from '../validations/validateContactForm'
import Spinner from '../components/common/Spinner'

const ContactForm: FC<{ btnClassname?: string }> = ({ btnClassname }) => {
  const dispatch = useAppDispatch()
  const { question } = useAppSelector((state: RootState) => state.form)

  const { handleInput, clearInputs, setErrors } = createFormActions('question', dispatch)
  const [createQuestion, { isLoading }] = useCreateQuestionMutation()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateContactForm(question?.inputs, setErrors)
    if (!isValid) return

    try {
      await createQuestion({
        name: question.inputs.name,
        email: question.inputs.email,
        message: question.inputs.message
      }).unwrap()

      clearInputs()
    } catch {}
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-y-8 990:gap-8 w-full max-w-screen-md">
      <div className="col-span-12 990:col-span-6">
        <CampInput
          name="name"
          value={question?.inputs?.name}
          handleInput={handleInput}
          placeholder="Your Name"
          error={question?.errors?.name}
        />
      </div>
      <div className="col-span-12 990:col-span-6">
        <CampInput
          name="email"
          value={question?.inputs?.email}
          handleInput={handleInput}
          placeholder="Your Email"
          error={question?.errors?.email}
        />
      </div>
      <div className="col-span-12">
        <ContactFormTextarea
          name="message"
          value={question?.inputs?.message}
          onChange={handleInput}
          placeholder="Ask your question here..."
          error={question?.errors?.message}
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
