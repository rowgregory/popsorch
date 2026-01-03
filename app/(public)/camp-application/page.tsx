'use client'

import { RootState, useAppSelector } from '@/app/redux/store'
import CampAppStepOneForm from '@/app/components/forms/CampAppStepOneForm'
import CampAppStepThreeForm from '@/app/components/forms/CampAppStepThreeForm'
import CampAppStepFourForm from '@/app/components/forms/CampAppStepFourForm'
import CampAppStepTwoForm from '@/app/components/forms/CampAppStepTwoForm'

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
