'use client'

import { RootState, useAppSelector } from '../redux/store'
import CampAppStepOneForm from '../forms/CampAppStepOneForm'
import CampAppStepThreeForm from '../forms/CampAppStepThreeForm'
import CampAppStepFourForm from '../forms/CampAppStepFourForm'
import CampAppStepTwoForm from '../forms/CampAppStepTwoForm'

const CampApplication = () => {
  const { steps } = useAppSelector((state: RootState) => state.camp)

  return (
    <>
      {steps.instrumentInfo ? (
        <CampAppStepFourForm />
      ) : steps.parentInfo ? (
        <CampAppStepThreeForm />
      ) : steps.addressInfo ? (
        <CampAppStepTwoForm />
      ) : (
        <CampAppStepOneForm />
      )}
    </>
  )
}

export default CampApplication
