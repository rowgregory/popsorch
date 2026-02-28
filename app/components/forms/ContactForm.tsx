import { FC, useState } from 'react'
import { store, useFormSelector } from '@/app/redux/store'
import { createFormActions, resetForm } from '@/app/redux/features/formSlice'
import ContactFormTextarea from './elements/ContactFormTextarea'
import CampInput from './elements/CampInput'
import validateContactForm from '@/app/lib/validations/validateContactForm'
import { showToast } from '@/app/redux/features/toastSlice'
import { createQuestion } from '@/app/actions/createQuestion'
import { setOpenContactSubmissionSuccessModal } from '@/app/redux/features/uiSlice'

const ContactForm: FC<{ btnClassname?: string }> = ({ btnClassname }) => {
  const { questionForm } = useFormSelector()
  const { handleInput, setErrors } = createFormActions('questionForm', store.dispatch)
  const [loading, setLoading] = useState(false)
  const inputs = questionForm?.inputs
  const errors = questionForm?.errors

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateContactForm(inputs, setErrors)) return

    try {
      setLoading(true)

      await createQuestion({
        name: inputs.name,
        email: inputs.email,
        message: inputs.message
      })

      store.dispatch(setOpenContactSubmissionSuccessModal())
      store.dispatch(resetForm('questionForm'))
    } catch {
      store.dispatch(
        showToast({
          type: 'error',
          message: 'Failed to transmit question'
        })
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-12 gap-y-8 990:gap-8 w-full max-w-3xl"
      noValidate
      aria-label="Contact question form"
    >
      <div className="col-span-12 990:col-span-6">
        <CampInput
          name="name"
          value={inputs?.name}
          handleInput={handleInput}
          placeholder="Your Name"
          required
          error={errors?.name}
        />
      </div>
      <div className="col-span-12 990:col-span-6">
        <CampInput
          name="email"
          type="email"
          value={inputs?.email}
          handleInput={handleInput}
          placeholder="Your Email"
          required
          error={errors?.email}
        />
      </div>
      <div className="col-span-12">
        <ContactFormTextarea
          name="message"
          value={inputs?.message}
          onChange={handleInput}
          placeholder="Ask your question here..."
          required
          error={errors?.message}
        />
      </div>
      <div className={`col-span-12 flex items-center ${btnClassname ?? 'justify-center'} mt-3`}>
        <button
          type="submit"
          disabled={loading}
          aria-disabled={loading}
          aria-label={loading ? 'Submitting your question, please wait' : 'Submit your question'}
          className="bg-blaze font-changa text-12 text-white px-8 py-4 uppercase font-semibold tracking-widest rounded-sm hover:bg-blazehover duration-300 min-w-36 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
        >
          {loading ? (
            <>
              <span aria-hidden="true">Submitting...</span>
              <span className="sr-only">Submitting your question, please wait</span>
            </>
          ) : (
            'Submit Now'
          )}
        </button>
      </div>
    </form>
  )
}

export default ContactForm
