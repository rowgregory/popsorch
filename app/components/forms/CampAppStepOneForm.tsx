import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { createFormActions } from '@/app/redux/features/formSlice'
import { setStep } from '@/app/redux/features/campSlice'
import CampInput from './elements/CampInput'
import validateCampAppStepOneForm from '@/app/lib/validations/validateCampAppStepOneForm'
import { ArrowRight } from 'lucide-react'

const CampAppStepOneForm = () => {
  const dispatch = useAppDispatch()
  const { campForm } = useAppSelector((state: RootState) => state.form)
  const { handleInput, setErrors } = createFormActions('campForm', dispatch)

  const handleStepOne = () => {
    const isValid = validateCampAppStepOneForm(campForm?.inputs, setErrors)
    if (!isValid) return

    dispatch(setStep({ personalInfo: true, addressInfo: true, parentInfo: false, instrumentSection: false }))
  }

  return (
    <form>
      <div className="990:pl-20">
        <h1 className="text-18 font-changa mb-1 text-[#d3d3d3]">1 / 4</h1>
        <h2 className="text-25 text-white font-changa mb-6">Student Details</h2>
        <div className="flex flex-col gap-y-9 pb-8">
          <div className="flex flex-col 990:flex-row gap-y-5 990:gap-x-5">
            <CampInput
              name="studentFirstName"
              value={campForm?.inputs?.studentFirstName}
              handleInput={handleInput}
              placeholder="First Name*"
              error={campForm?.errors?.studentFirstName}
            />
            <CampInput
              name="studentLastName"
              value={campForm?.inputs?.studentLastName}
              handleInput={handleInput}
              placeholder="Last Name*"
              error={campForm?.errors?.studentLastName}
            />
          </div>
          <div className="flex flex-col 990:flex-row gap-y-5 990:gap-x-5">
            <CampInput
              name="grade"
              value={campForm?.inputs?.grade}
              handleInput={handleInput}
              placeholder="What grade are you currently in?*"
              error={campForm?.errors?.grade}
            />
            <CampInput
              name="school"
              value={campForm?.inputs?.school}
              handleInput={handleInput}
              placeholder="What school do you currently attend?"
              error={campForm?.errors?.school}
            />
          </div>
          <div className="flex flex-col 990:flex-row gap-y-5 990:gap-x-5">
            <CampInput
              name="studentEmailAddress"
              value={campForm?.inputs?.studentEmailAddress}
              handleInput={handleInput}
              placeholder="Student Email*"
              error={campForm?.errors?.studentEmailAddress}
            />
            <CampInput
              name="studentPhoneNumber"
              value={campForm?.inputs?.studentPhoneNumber}
              handleInput={handleInput}
              placeholder="Student Phone Number*"
              error={campForm?.errors?.studentPhoneNumber}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-zinc-700/70" />
      <div className="flex items-center gap-x-4 float-right mt-5">
        {campForm?.errors && Object?.values(campForm?.errors).length > 0 && (
          <div className="text-blaze text-13 font-lato">Please correct errors.</div>
        )}
        <button
          onClick={() => handleStepOne()}
          type="button"
          className="text-white bg-sunburst px-4 py-1 flex items-center gap-x-2"
        >
          Forward
          <ArrowRight className="text-white w-3 h-3" />
        </button>
      </div>
    </form>
  )
}

export default CampAppStepOneForm
