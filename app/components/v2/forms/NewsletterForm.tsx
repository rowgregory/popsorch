import { store, useFormSelector, useMailchimpSelector } from '@/app/redux/store'
import { createFormActions, resetForm, setInputs } from '@/app/redux/features/formSlice'
import Link from 'next/link'
import { useSubscribeMutation } from '@/app/redux/services/mailchimpApi'
import validateNewsletterForm from '@/app/lib/validations/validateNewsletterForm'
import { showToast } from '@/app/redux/features/toastSlice'
import { FC } from 'react'

const Switch = ({ enabled, onChange, name }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={name}
      onClick={(e) => {
        e.stopPropagation()
        onChange?.({ target: { checked: !enabled, name } } as any)
      }}
      className={`relative w-16 h-8 flex items-center transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm border ${
        enabled ? 'bg-blaze/10 border-blaze/40' : 'bg-white/5 border-white/10'
      }`}
    >
      <span
        className={`absolute w-5 h-5 shadow-md transition-all duration-300 flex items-center justify-center ${
          enabled ? 'translate-x-9 bg-blaze' : 'translate-x-2 bg-white/20'
        }`}
        aria-hidden="true"
      ></span>
      <span className="sr-only">{enabled ? 'On' : 'Off'}</span>
    </button>
  )
}

interface InputProps {
  name: string
  value: string
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  error?: string
  required?: boolean
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'url'
}

const Input: FC<InputProps> = ({ name, value, handleInput, placeholder, error, required, type = 'text' }) => (
  <div className="flex flex-col w-full">
    <label htmlFor={name} className="font-changa text-[10px] uppercase tracking-[0.25em] text-white/80 mb-2">
      {placeholder}
      {required && (
        <>
          <span className="text-blaze ml-1" aria-hidden="true">
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      )}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value || ''}
      onChange={handleInput}
      placeholder={placeholder}
      required={required}
      aria-required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      className={`bg-transparent border-b font-lato text-sm text-white placeholder:text-white/20 py-3 w-full focus:outline-none transition-colors duration-200 ${
        error ? 'border-blaze placeholder:text-blaze/40' : 'border-white/20 hover:border-white/40 focus:border-blaze'
      }`}
    />
    {error && (
      <p
        id={`${name}-error`}
        role="alert"
        aria-live="polite"
        className="font-changa text-[10px] uppercase tracking-widest text-blaze mt-2"
      >
        {error}
      </p>
    )}
  </div>
)

const NewsletterForm = ({ data }) => {
  const field = (id: string) => data?.content?.find((item) => item.id === id)?.value ?? ''
  const { success } = useMailchimpSelector()
  const { newsletterForm } = useFormSelector()
  const { setErrors, handleInput, handleToggle } = createFormActions('newsletterForm', store.dispatch)
  const inputs = newsletterForm?.inputs
  const errors = newsletterForm?.errors
  const [subscribe, { isLoading }] = useSubscribeMutation()

  const selectAllSwitches = () => {
    store.dispatch(
      setInputs({
        formName: 'newsletterForm',
        data: {
          isSelectAll: !inputs?.isSelectAll,
          isOption1: inputs?.isSelectAll ? false : true,
          isOption2: inputs?.isSelectAll ? false : true,
          isOption3: inputs?.isSelectAll ? false : true,
          isOption4: inputs?.isSelectAll ? false : true
        }
      })
    )
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const isValid = validateNewsletterForm(newsletterForm?.inputs, setErrors)
    if (!isValid) return

    try {
      await subscribe({
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        phoneNumber: inputs.phoneNumber,
        addr1: inputs.addr1,
        city: inputs.city,
        state: inputs.state,
        zip: inputs.zip,
        isOption1: inputs.isOption1,
        isOption2: inputs.isOption2,
        isOption3: inputs.isOption3,
        isOption4: inputs.isOption4,
        isNewPatron: inputs.isNewPatron,
        agreedToPrivacyStatement: inputs.agreedToPrivacyStatement
      }).unwrap()

      store.dispatch(showToast({ message: 'Successfully subscribed!', type: 'success' }))
      store.dispatch(resetForm('newsletterForm'))
    } catch {
      store.dispatch(showToast({ message: 'Failed to subscribe. Please try again later.', type: 'error' }))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full px-4 990:px-12 xl:px-4"
      noValidate
      aria-label="Connect with us subscription form"
    >
      <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-7xl w-full mx-auto pb-44">
        {success ? (
          <section aria-live="polite" aria-atomic="true" className="flex flex-col justify-center items-center gap-y-10">
            <h1 className="text-center font-changa text-2xl font-medium">
              Thanks for subscribing! You&apos;re officially on the list and will be the first to hear about our latest
              updates, concerts, and exclusive offers.
            </h1>
            <Link
              href="/concerts"
              className="bg-blaze w-fit px-8 py-3 text-12 uppercase font-changa font-semibold tracking-wider duration-300 hover:bg-blazehover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Check out our concerts
            </Link>
          </section>
        ) : (
          <>
            <header className="w-full text-center flex flex-col items-center pt-32 pb-20 border-b border-white/10">
              <p className="font-changa text-xs uppercase tracking-[0.3em] text-blaze mb-4">The Pops Orchestra</p>
              <div className="flex items-center gap-3 430:gap-4 justify-center mb-4">
                <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
                <h1 className="text-4xl 430:text-5xl sm:text-6xl font-changa text-white leading-none">
                  {field('connect_with_us_heading')}
                </h1>
                <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
              </div>
              <div className="w-16 h-px bg-blaze mx-auto mt-2 mb-6" aria-hidden="true" />
              <p className="font-lato text-white/50 text-sm 430:text-base max-w-xl leading-relaxed">
                {field('connect_with_us_subheading')}
              </p>
            </header>

            <div className="flex flex-col gap-y-7 mt-14 max-w-3xl mx-auto w-full relative">
              <fieldset className="flex flex-col gap-y-7 border-0 p-0 m-0">
                <legend className="font-changa text-2xl mt-5">User Details</legend>
                <div className="flex flex-col md:flex-row gap-y-7 md:gap-7">
                  <Input
                    name="firstName"
                    value={inputs?.firstName}
                    handleInput={handleInput}
                    placeholder="First Name"
                    required
                    error={errors?.firstName}
                    aria-required="true"
                    aria-describedby={errors?.firstName ? 'firstName-error' : undefined}
                  />
                  <Input
                    name="lastName"
                    value={inputs?.lastName}
                    handleInput={handleInput}
                    placeholder="Last Name"
                    required
                    error={errors?.lastName}
                    aria-required="true"
                    aria-describedby={errors?.lastName ? 'lastName-error' : undefined}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-y-7 md:gap-7">
                  <Input
                    name="email"
                    value={inputs?.email}
                    handleInput={handleInput}
                    placeholder="Email"
                    type="email"
                    required
                    error={errors?.email}
                    aria-required="true"
                    aria-describedby={errors?.email ? 'email-error' : undefined}
                  />
                  <Input
                    name="phoneNumber"
                    value={inputs?.phoneNumber}
                    handleInput={handleInput}
                    placeholder="Phone number"
                    type="tel"
                  />
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-y-7 border-0 p-0 m-0">
                <legend className="font-changa text-2xl mt-5">Address</legend>
                <div className="flex flex-col md:flex-row gap-y-7 md:gap-7">
                  <Input name="addr1" value={inputs?.addr1} handleInput={handleInput} placeholder="Address line 1" />
                  <Input name="city" value={inputs?.city} handleInput={handleInput} placeholder="City" />
                </div>
                <div className="flex flex-col md:flex-row gap-y-7 md:gap-7">
                  <Input name="state" value={inputs?.state} handleInput={handleInput} placeholder="State" />
                  <Input name="zip" value={inputs?.zip} handleInput={handleInput} placeholder="Zip code" />
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-y-4 border-0 p-0 m-0">
                <legend className="font-changa text-2xl mt-5 mb-3">I&apos;m interested in:</legend>
                <div className="flex items-center gap-x-3">
                  <Switch
                    enabled={inputs?.isOption1 || false}
                    onChange={handleToggle}
                    name="isOption1"
                    aria-label="I'm interested in Season Tickets"
                  />
                  <label htmlFor="isOption1" className="font-lato font-semibold text-sm text-white cursor-pointer">
                    Season Tickets
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <Switch
                    enabled={inputs?.isOption2 || false}
                    onChange={handleToggle}
                    name="isOption2"
                    aria-label="I'm interested in Special Events"
                  />
                  <label htmlFor="isOption2" className="font-lato font-semibold text-sm text-white cursor-pointer">
                    Special Events
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <Switch
                    enabled={inputs?.isOption3 || false}
                    onChange={handleToggle}
                    name="isOption3"
                    aria-label="I'm interested in Youth Education"
                  />
                  <label htmlFor="isOption3" className="font-lato font-semibold text-sm text-white cursor-pointer">
                    Youth Education
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <Switch
                    enabled={inputs?.isOption4 || false}
                    onChange={handleToggle}
                    name="isOption4"
                    aria-label="I'm interested in Other"
                  />
                  <label htmlFor="isOption4" className="font-lato font-semibold text-sm text-white cursor-pointer">
                    Other
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => selectAllSwitches()}
                  aria-pressed={inputs?.isSelectAll || false}
                  className="text-left text-sm text-sunburst font-semibold font-lato hover:text-sunbursthover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunburst"
                >
                  {inputs?.isSelectAll ? 'Deselect' : 'Select'} All
                </button>
              </fieldset>

              <fieldset className="flex flex-col gap-y-4 mt-3 border-0 p-0 m-0">
                <legend className="font-changa text-2xl mt-5">New Patron</legend>
                <div className="flex items-center gap-x-3">
                  <Switch
                    enabled={inputs?.isNewPatron || false}
                    onChange={handleToggle}
                    name="isNewPatron"
                    aria-label="Are you a new patron of The Pops?"
                  />
                  <label htmlFor="isNewPatron" className="font-lato font-semibold text-sm text-white cursor-pointer">
                    Are You A New Patron of The Pops?
                  </label>
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-y-4 relative border-0 p-0 m-0">
                <legend className="font-changa text-2xl mt-5">Privacy</legend>
                <div className="flex items-center gap-x-3">
                  <Switch
                    enabled={inputs?.agreedToPrivacyStatement || false}
                    onChange={handleToggle}
                    name="agreedToPrivacyStatement"
                    aria-required="true"
                    aria-describedby={errors?.agreedToPrivacyStatement ? 'privacy-error' : undefined}
                    aria-label="I agree with the storage and handling of my data by this website"
                  />
                  <label
                    htmlFor="agreedToPrivacyStatement"
                    className="font-lato font-semibold text-sm text-white cursor-pointer"
                  >
                    I agree with the storage and handling of my data by this website.
                  </label>
                </div>
                {errors?.agreedToPrivacyStatement && (
                  <p id="privacy-error" role="alert" className="text-blaze font-changa text-13 mt-1">
                    {errors?.agreedToPrivacyStatement}
                  </p>
                )}
              </fieldset>

              <button
                type="submit"
                disabled={isLoading}
                aria-disabled={isLoading}
                aria-label={isLoading ? 'Submitting form, please wait' : 'Submit form'}
                className="bg-blaze/90 hover:bg-blaze disabled:opacity-60 disabled:cursor-not-allowed duration-300 w-full sm:w-40 px-8 py-3 font-changa uppercase tracking-wider font-medium text-xs mt-20 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Submitting, please wait...</span>
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  )
}

export default NewsletterForm
