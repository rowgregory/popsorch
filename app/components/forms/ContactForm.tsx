import { FC, useState } from 'react'
import { useAppDispatch, useFormSelector } from '@/app/redux/store'
import { createFormActions, resetForm } from '@/app/redux/features/formSlice'
import ContactFormTextarea from './elements/ContactFormTextarea'
import CampInput from './elements/CampInput'
import validateContactForm from '@/app/lib/validations/validateContactForm'
import { showToast } from '@/app/redux/features/toastSlice'
import { createQuestion } from '@/app/actions/createQuestion'
import { useRouter } from 'next/navigation'

const ContactForm: FC<{ btnClassname?: string }> = ({ btnClassname }) => {
  const dispatch = useAppDispatch()
  const { questionForm } = useFormSelector()
  const router = useRouter()
  const { handleInput, setErrors } = createFormActions('questionForm', dispatch)
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

      dispatch(
        showToast({
          type: 'success',
          message: 'Question successfully transmitted.'
        })
      )

      router.refresh()
      dispatch(resetForm('questionForm'))
    } catch {
      dispatch(
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
          {loading ? 'Submitting...' : 'Submit Now'}
        </button>
      </div>
    </form>
  )
}

export default ContactForm
