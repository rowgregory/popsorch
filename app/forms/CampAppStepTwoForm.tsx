import React, { FormEvent } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { createFormActions } from '../redux/features/formSlice'
import { setStep } from '../redux/features/campSlice'
import CampInput from './elements/CampInput'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { caretLeftIcon, caretRightIcon } from '../lib/icons'

const CampAppStepTwoForm = () => {
  const dispatch = useAppDispatch()
  const { campForm } = useAppSelector((state: RootState) => state.form)
  const { handleInput } = createFormActions('campForm', dispatch)

  const handleStepOne = (e: FormEvent) => {
    e.preventDefault()

    dispatch(setStep({ personalInfo: true, addressInfo: true, parentInfo: true, instrumentSection: false }))
  }

  return (
    <form onSubmit={handleStepOne}>
      <div className="990:pl-20">
        <h1 className="text-18 font-changa mb-1 text-[#d3d3d3]">2 / 4</h1>
        <h2 className="text-25 text-white font-changa mb-6">Student Address</h2>
        <div className="flex flex-col gap-y-9 pb-8">
          <div className="flex flex-col 990:flex-row gap-y-5 990:gap-x-5">
            <CampInput
              name="addressLine1"
              value={campForm?.inputs?.addressLine1}
              handleInput={handleInput}
              placeholder="Address Line 1"
            />
            <CampInput
              name="addressLine2"
              value={campForm?.inputs?.addressLine2}
              handleInput={handleInput}
              placeholder="Address Line 2"
            />
          </div>
          <div className="flex flex-col 990:flex-row gap-y-5 990:gap-x-5">
            <CampInput name="city" value={campForm?.inputs?.city} handleInput={handleInput} placeholder="City" />
            <CampInput name="state" value={campForm?.inputs?.state} handleInput={handleInput} placeholder="State" />
          </div>
          <div className="flex flex-col 990:flex-row gap-y-5 990:gap-x-5">
            <CampInput
              name="zipPostalCode"
              value={campForm?.inputs?.zipPostalCode}
              handleInput={handleInput}
              placeholder="Zip code"
            />
            <div className="w-full" />
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-zinc-700/70" />
      <div className="flex items-center gap-x-4 float-right mt-5">
        <button
          onClick={() =>
            dispatch(setStep({ personalInfo: true, addressInfo: false, parentInfo: false, instrumentInfo: false }))
          }
          type="button"
          className="text-white bg-zinc-400 font-lato duration-300 hover:bg-sunbursthover px-4 py-1 flex items-center gap-x-2 rounded-sm"
        >
          <AwesomeIcon icon={caretLeftIcon} className="text-white w-3 h-3" />
          Backward
        </button>
        <button className="text-white bg-sunburst px-4 py-1 flex items-center gap-x-2">
          Forward
          <AwesomeIcon icon={caretRightIcon} className="text-white w-3 h-3" />
        </button>
      </div>
    </form>
  )
}

export default CampAppStepTwoForm
