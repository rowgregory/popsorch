import React, { FormEvent } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { createFormActions } from '../redux/features/formSlice'
import { setStep } from '../redux/features/campSlice'
import CampInput from './elements/CampInput'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { caretLeftIcon, caretRightIcon } from '../lib/icons'
import validateCampAppStepTwoForm from '../validations/validateCampAppStepThreeForm'
import CampCheckbox from './elements/CampCheckbox'

const CampAppStepThreeForm = () => {
  const dispatch = useAppDispatch()
  const { campForm } = useAppSelector((state: RootState) => state.form)
  const { handleInput, setErrors, handleToggle } = createFormActions('campForm', dispatch)

  const handleStepTwo = (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateCampAppStepTwoForm(campForm?.inputs, setErrors)
    if (!isValid) return

    dispatch(setStep({ personalInfo: true, addressInfo: true, parentInfo: true, instrumentInfo: true }))
  }

  return (
    <form onSubmit={handleStepTwo}>
      <div className="990:pl-20">
        <h1 className="text-18 font-changa mb-1 text-[#d3d3d3]">3 / 4</h1>
        <h2 className="text-25 text-white font-changa mb-6">Parent or Guardian Consent</h2>
        <div className="flex flex-col gap-y-9 pb-8">
          <div className="flex flex-col 990:flex-row gap-y-5 990:gap-x-5">
            <CampInput
              name="parentFirstName"
              value={campForm?.inputs?.parentFirstName}
              handleInput={handleInput}
              placeholder="First Name*"
              error={campForm?.errors?.parentFirstName}
            />
            <CampInput
              name="parentLastName"
              value={campForm?.inputs?.parentLastName}
              handleInput={handleInput}
              placeholder="Last Name*"
              error={campForm?.errors?.parentLastName}
            />
          </div>
          <CampInput
            name="relationshipToStudent"
            value={campForm?.inputs?.relationshipToStudent}
            handleInput={handleInput}
            placeholder="What is your relationship to the student?"
            error={campForm?.errors?.relationshipToStudent}
          />
          <div className="flex flex-col 990:flex-row gap-y-5 990:gap-x-5">
            <CampInput
              name="parentEmailAddress"
              value={campForm?.inputs?.parentEmailAddress}
              handleInput={handleInput}
              placeholder="Parent/Guardian Email Address*"
              error={campForm?.errors?.parentEmailAddress}
            />
            <CampInput
              name="parentPhoneNumber"
              value={campForm?.inputs?.parentPhoneNumber}
              handleInput={handleInput}
              placeholder="Parent/Guardian Phone Number*"
              error={campForm?.errors?.parentPhoneNumber}
            />
          </div>
          <CampCheckbox
            name="consent"
            value={campForm?.inputs?.consent}
            handleToggle={handleToggle}
            label={`I agree to my child's participation with liability and photo/video release.`}
            error={campForm?.errors?.consent}
          />
          <div className="border-1 border-zinc-700/70 py-10 px-7 flex flex-col gap-y-5 rounded-sm">
            <p className="text-13 font-lato text-[#afafaf]">
              Consent Statement: As the parent or legal guardian of the applicant, I hereby give my full consent and
              approval for my child to participate in Camping with the Pops, which runs from July 8 to July 12, 2024,
              organized by the Pops Orchestra of Sarasota and Manatee.
            </p>
            <p className="text-13 font-lato text-[#afafaf]">
              I acknowledge that I have been fully informed of the activities that will be offered during this program,
              including but not limited to ensemble rehearsals and public performance, and I understand the nature of
              these activities.
            </p>
            <p className="text-13 font-lato text-[#afafaf]">
              Photo and Video Release: I hereby grant permission to The Pops Orchestra to take and use photographs
              and/or videos of my child, taken during the program, for promotional materials, publications, or other
              media activities without compensation or acknowledgment.
            </p>
            <p className="text-13 font-lato text-[#afafaf]">
              Liability Release: I hereby release, indemnify, and hold harmless The Pops Orchestra, its employees,
              agents, and volunteers from and against any and all liability for any harm, injury, damage, claims,
              demands, actions, costs, and expenses of any nature which my child may incur or experience as a result of
              participation in Camping with the Pops.
            </p>
            <p className="text-13 font-lato text-[#afafaf]">
              Acknowledgment: I have read this consent form in its entirety and fully understand its contents. I am
              aware that this consent form releases certain legal rights that I or my child might otherwise have.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-zinc-700/70" />
      <div className="flex items-center gap-x-4 float-right mt-5">
        {campForm?.errors && Object?.values(campForm?.errors).length > 0 && (
          <div className="text-blaze text-13 font-lato">Please correct errors.</div>
        )}
        <button
          onClick={() =>
            dispatch(setStep({ personalInfo: true, addressInfo: true, parentInfo: false, instrumentInfo: false }))
          }
          type="button"
          className="text-white bg-zinc-400 font-lato duration-300 hover:bg-sunbursthover px-4 py-1 flex items-center gap-x-2 rounded-sm"
        >
          <AwesomeIcon icon={caretLeftIcon} className="text-white w-3 h-3" />
          Backward
        </button>
        <button
          type="submit"
          className="text-white bg-sunburst hover:bg-sunbursthover duration-300 font-lato px-4 py-1 flex items-center gap-x-2 rounded-sm"
        >
          Forward
          <AwesomeIcon icon={caretRightIcon} className="text-white w-3 h-3" />
        </button>
      </div>
    </form>
  )
}

export default CampAppStepThreeForm
