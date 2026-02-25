import { store, useFormSelector, useMailchimpSelector } from '@/app/redux/store'
import { createFormActions, resetForm, setInputs } from '@/app/redux/features/formSlice'
import Switch from './elements/Switch'
import CampInput from './elements/CampInput'
import Link from 'next/link'
import { useSubscribeMutation } from '@/app/redux/services/mailchimpApi'
import validateNewsletterForm from '@/app/lib/validations/validateNewsletterForm'
import { showToast } from '@/app/redux/features/toastSlice'

const NewsletterForm = () => {
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
    <form onSubmit={handleSubmit} className="w-full px-4 990:px-12 xl:px-4">
      <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto pt-32 pb-44">
        {success ? (
          <div className="flex flex-col justify-center items-center gap-y-10">
            <h1 className="text-center font-changa text-2xl font-medium">
              Thanks for subscribing! You&apos;re officially on the list and will be the first to hear about our latest
              updates, concerts, and exclusive offers.
            </h1>
            <Link
              href="/concerts"
              className="bg-blaze w-fit px-8 py-3 text-12 uppercase font-changa rounded-sm font-semibold tracking-wider duration-300 hover:bg-blazehover"
            >
              Check out our concerts
            </Link>
          </div>
        ) : (
          <>
            <div className="relative h-fit w-fit px-5 max-w-3xl mx-auto">
              <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[1.5px] bg-blaze/70 w-full"></span>
              <h1 className="text-white font-changa text-center text-[48px] relative z-10">
                Use the form below to sign up for The Pops Orchestra&apos;s weekly newsletters
              </h1>
            </div>
            <div className="flex flex-col gap-y-7 mt-14 max-w-3xl mx-auto w-full relative">
              <h1 className="font-changa text-2xl mt-5 -mb-3">User Details</h1>
              <div className="flex flex-col md:flex-row gap-y-7 md:gap-7">
                <CampInput
                  name="firstName"
                  value={inputs?.firstName}
                  handleInput={handleInput}
                  placeholder="First Name*"
                  error={errors?.firstName}
                />
                <CampInput
                  name="lastName"
                  value={inputs?.lastName}
                  handleInput={handleInput}
                  placeholder="Last Name*"
                  error={errors?.lastName}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-y-7 md:gap-7">
                <CampInput
                  name="email"
                  value={inputs?.email}
                  handleInput={handleInput}
                  placeholder="Email*"
                  error={errors?.email}
                />
                <CampInput
                  name="phoneNumber"
                  value={inputs?.phoneNumber}
                  handleInput={handleInput}
                  placeholder="Phone number"
                />
              </div>
              <h1 className="font-changa text-2xl mt-5 -mb-3">Address</h1>
              <div className="flex flex-col md:flex-row gap-y-7 md:gap-7">
                <CampInput name="addr1" value={inputs?.addr1} handleInput={handleInput} placeholder="Address line 1" />
                <CampInput name="city" value={inputs?.city} handleInput={handleInput} placeholder="City" />
              </div>
              <div className="flex flex-col md:flex-row gap-y-7 md:gap-7">
                <CampInput name="state" value={inputs?.state} handleInput={handleInput} placeholder="State" />
                <CampInput name="zip" value={inputs?.zip} handleInput={handleInput} placeholder="Zip code" />
              </div>
              <div className="flex flex-col gap-y-4">
                <h1 className="font-changa text-2xl mt-5 mb-3">I&apos;m interested in:</h1>
                <div className="flex items-center gap-x-3">
                  <Switch enabled={inputs?.isOption1 || false} onChange={handleToggle} name="isOption1" />
                  <div className="font-lato font-semibold text-sm text-white">Season Tickets</div>
                </div>
                <div className="flex items-center gap-x-3">
                  <Switch enabled={inputs?.isOption2 || false} onChange={handleToggle} name="isOption2" />
                  <div className="font-lato font-semibold text-sm text-white">Special Events</div>
                </div>
                <div className="flex items-center gap-x-3">
                  <Switch enabled={inputs?.isOption3 || false} onChange={handleToggle} name="isOption3" />
                  <div className="font-lato font-semibold text-sm text-white">Youth Education</div>
                </div>
                <div className="flex items-center gap-x-3">
                  <Switch enabled={inputs?.isOption4 || false} onChange={handleToggle} name="isOption4" />
                  <div className="font-lato font-semibold text-sm text-white">Other</div>
                </div>
                <button
                  type="button"
                  onClick={() => selectAllSwitches()}
                  className="text-left text-sm text-sunburst font-semibold font-lato hover:text-sunbursthover transition-colors"
                >
                  {inputs?.isSelectAll ? 'Deselect' : 'Select'} All
                </button>
              </div>
              <div className="flex flex-col gap-y-4 mt-3">
                <h1 className="font-changa text-2xl mt-5">New Patron</h1>
                <div className="flex items-center gap-x-3">
                  <Switch enabled={inputs?.isNewPatron || false} onChange={handleToggle} name="isNewPatron" />
                  <div className="font-lato font-semibold text-sm text-white">Are You A New Patron of The Pops?</div>
                </div>
              </div>
              <div className="flex flex-col gap-y-4 relative">
                <h1 className="font-changa text-2xl mt-5">Privacy</h1>
                <div className="flex items-center gap-x-3">
                  <Switch
                    enabled={inputs?.agreedToPrivacyStatement || false}
                    onChange={handleToggle}
                    name="agreedToPrivacyStatement"
                  />
                  <div className="font-lato font-semibold text-sm text-white">
                    I agree with the storage and handling of my data by this website.
                  </div>
                  {errors?.agreedToPrivacyStatement && (
                    <div className="text-blaze font-changa absolute left-22 760:-bottom-2 text-13">
                      {errors?.agreedToPrivacyStatement}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="bg-blaze hover:bg-blaze/80 duration-300 w-full sm:w-40 px-8 py-3 font-changa uppercase tracking-wider rounded-sm font-medium text-xs mt-20 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
