import React, { FC } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { createFormActions } from '../redux/features/formSlice'
import Spinner from '../components/common/Spinner'
import Switch from './elements/Switch'
import CampInput from './elements/CampInput'
import TitleWithLine from '../components/common/TitleWithLine'
import Link from 'next/link'

const NewsletterForm: FC<{ handleSubmit: any; isLoading: boolean }> = ({ handleSubmit, isLoading }) => {
  const dispatch = useAppDispatch()
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { newsletterForm } = useAppSelector((state: RootState) => state.form)
  const { success, error } = useAppSelector((state: RootState) => state.mailchimp)
  const { setInputs, handleInput, handleToggle } = createFormActions('newsletterForm', dispatch)

  const selectAllSwitches = () => {
    setInputs({
      isSelectAll: !newsletterForm.inputs.isSelectAll,
      isOption1: newsletterForm.inputs.isSelectAll ? false : true,
      isOption2: newsletterForm.inputs.isSelectAll ? false : true,
      isOption3: newsletterForm.inputs.isSelectAll ? false : true,
      isOption4: newsletterForm.inputs.isSelectAll ? false : true
    })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full px-4 pt-28 py-40">
      <div className="max-w-[516px] 760:max-w-[900px] w-full mx-auto">
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
            <TitleWithLine
              title={textBlockMap?.NEWSLETTER_FORM_PAGE?.newsletterFormPageTitle}
              type="NEWSLETTER_FORM_PAGE"
              textBlockKey="newsletterFormPageTitle"
            />
            <div className="flex flex-col gap-y-7 mt-14 max-w-screen-md mx-auto w-full relative">
              <h1 className="text-2xl font-changa mt-5 -mb-3">User Details</h1>
              <div className="flex flex-col md:flex-row gap-y-7 md:gap-7">
                <CampInput
                  name="firstName"
                  value={newsletterForm?.inputs?.firstName}
                  handleInput={handleInput}
                  placeholder="Firstname*"
                  error={newsletterForm?.errors?.firstName}
                />
                <CampInput
                  name="lastName"
                  value={newsletterForm?.inputs?.lastName}
                  handleInput={handleInput}
                  placeholder="Lastname*"
                  error={newsletterForm?.errors?.lastName}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-y-7 md:gap-7">
                <CampInput
                  name="email"
                  value={newsletterForm?.inputs?.email}
                  handleInput={handleInput}
                  placeholder="Email*"
                  error={newsletterForm?.errors?.email}
                />
                <CampInput
                  name="phoneNumber"
                  value={newsletterForm?.inputs?.phoneNumber}
                  handleInput={handleInput}
                  placeholder="Phone number"
                />
              </div>
              <h1 className="text-2xl font-changa mt-5 -mb-3">Address</h1>
              <div className="flex flex-col md:flex-row gap-y-7 md:gap-7">
                <CampInput
                  name="addr1"
                  value={newsletterForm?.inputs?.addr1}
                  handleInput={handleInput}
                  placeholder="Address line 1"
                />
                <CampInput
                  name="city"
                  value={newsletterForm?.inputs?.city}
                  handleInput={handleInput}
                  placeholder="City"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-y-7 md:gap-7">
                <CampInput
                  name="state"
                  value={newsletterForm?.inputs?.state}
                  handleInput={handleInput}
                  placeholder="State"
                />
                <CampInput
                  name="zip"
                  value={newsletterForm?.inputs?.zip}
                  handleInput={handleInput}
                  placeholder="Zip code"
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <h1 className="text-2xl font-changa mt-5 mb-3">I&apos;m interested in:</h1>
                <div className="flex items-center gap-x-3">
                  <Switch
                    enabled={newsletterForm?.inputs?.isOption1 || false}
                    onChange={handleToggle}
                    name="isOption1"
                    color="blaze"
                  />
                  <div className="font-semibold text-sm">Season Tickets</div>
                </div>
                <div className="flex items-center gap-x-3">
                  <Switch
                    enabled={newsletterForm?.inputs?.isOption2 || false}
                    onChange={handleToggle}
                    name="isOption2"
                    color="blaze"
                  />
                  <div className="font-semibold text-sm">Special Events</div>
                </div>
                <div className="flex items-center gap-x-3">
                  <Switch
                    enabled={newsletterForm?.inputs?.isOption3 || false}
                    onChange={handleToggle}
                    name="isOption3"
                    color="blaze"
                  />
                  <div className="font-semibold text-sm">Youth Education</div>
                </div>
                <div className="flex items-center gap-x-3">
                  <Switch
                    enabled={newsletterForm?.inputs?.isOption4 || false}
                    onChange={handleToggle}
                    name="isOption4"
                    color="blaze"
                  />
                  <div className="font-semibold text-sm">Other</div>
                </div>
                <button
                  type="button"
                  onClick={() => selectAllSwitches()}
                  className="text-left text-sm text-sunburst font-semibold"
                >
                  {newsletterForm.inputs.isSelectAll ? 'Deselect' : 'Select'} All
                </button>
              </div>
              <div className="flex flex-col gap-y-4 mt-3">
                <h1 className="text-2xl font-changa mt-5">New Patron</h1>
                <div className="flex items-center gap-x-3">
                  <Switch
                    enabled={newsletterForm?.inputs?.isNewPatron || false}
                    onChange={handleToggle}
                    name="isNewPatron"
                    color="blaze"
                  />
                  <div className="font-semibold text-sm">Are You A New Patron of The Pops?</div>
                </div>
              </div>
              <div className="flex flex-col gap-y-4 relative">
                <h1 className="text-2xl font-changa mt-5">Privacy</h1>
                <div className="flex items-center gap-x-3">
                  <Switch
                    enabled={newsletterForm?.inputs?.agreedToPrivacyStatement || false}
                    onChange={handleToggle}
                    name="agreedToPrivacyStatement"
                    color="blaze"
                  />
                  <div className="font-semibold text-sm">
                    I agree with the storage and handling of my data by this website.
                  </div>
                  {newsletterForm?.errors?.agreedToPrivacyStatement && (
                    <div className="text-blaze font-changa absolute left-[102px] 760:left-[107px] -bottom-5 760:-bottom-2 text-13 mt-1">
                      {newsletterForm?.errors?.agreedToPrivacyStatement}
                    </div>
                  )}
                </div>
              </div>
              {(error || newsletterForm?.errors) && (
                <div className="text-blaze font-changa absolute left-1/2 -translate-x-1/2 576:-translate-x-0 576:left-0 -bottom-7 text-13 mt-1">
                  {error || 'Please correct all errors.'}
                </div>
              )}
              <button
                type="submit"
                className="bg-blaze hover:bg-blazehover duration-300 w-full 576:w-40 px-8 py-3 font-changa uppercase tracking-wider rounded-sm font-medium text-13 mt-20"
              >
                {isLoading ? <Spinner fill="fill-white" track="fill-blaze" /> : 'Submit'}
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  )
}

export default NewsletterForm
