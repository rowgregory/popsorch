import React, { FormEvent } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { createFormActions } from '../redux/features/formSlice'
import { resetCampSuccess, setStep } from '../redux/features/campSlice'
import CampInput from './elements/CampInput'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { caretLeftIcon } from '../lib/icons'
import CampRadioBtn from './elements/CampaignRadioBtn'
import CampSelect from './elements/CampSelect'
import { heardOfPopsOptions } from '@/public/data/camp.data'
import { useCreateCampApplicationMutation } from '../redux/services/campApi'
import Spinner from '../components/common/Spinner'
import LogoWRobyn from '../components/LogoWRobynHeader'
import { useSendPushNotificationMutation } from '../redux/services/pushNotificationApi'
import { increaseCampApplicationsCount } from '../redux/features/appSlice'

const instrumentGroups = [
  {
    name: 'strings',
    label: 'Choose a string instrument',
    instruments: ['Violin', 'Viola', 'Cello', 'String Bass']
  },
  {
    name: 'woodwinds',
    label: 'Choose a woodwinds instrument',
    instruments: ['Flute', 'Oboe', 'Clarinet', 'Bassoon', 'Saxophone']
  },
  {
    name: 'brassAndPercussion',
    label: 'Choose a brass and percussion instrument',
    instruments: ['Trumpet', 'Horn', 'Trombone', 'Tuba', 'Percussion']
  }
]

const CampAppStepFourForm = () => {
  const dispatch = useAppDispatch()
  const { campForm } = useAppSelector((state: RootState) => state.form)
  const { message, success } = useAppSelector((state: RootState) => state.camp)
  const { handleInput, clearInputs } = createFormActions('campForm', dispatch)
  const [createCampApplication, { isLoading }] = useCreateCampApplicationMutation()
  const [sendPushNotification] = useSendPushNotificationMutation()

  const handleStepFour = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await createCampApplication(campForm?.inputs)
        .unwrap()
        .then(async () => {
          const storedSubscription = localStorage.getItem('pushSubscription')
          const subscription = storedSubscription ? JSON.parse(storedSubscription) : null

          try {
            if (subscription && subscription.endpoint) {
              await sendPushNotification({
                endpoint: subscription.endpoint,
                keys: subscription.keys,
                message: 'New camp application submitted'
              }).unwrap()
            }
          } catch {}
          dispatch(increaseCampApplicationsCount())
        })
    } catch {}
  }

  return success ? (
    <>
      <div className="flex flex-col justify-center items-center mx-auto max-w-screen-sm pb-9 px-3">
        <LogoWRobyn imgDimensions="h-32" logoClassname="text-blaze h-32" />
        <h1 className="font-changa text-2xl text-center text-white mt-1">{message}</h1>
        <button
          onClick={() => {
            dispatch(setStep({}))
            dispatch(resetCampSuccess())
            dispatch(clearInputs())
          }}
          className="text-blaze font-semibold text-lato uppercase text-sm mt-3 duration-300 hover:text-blazehover"
        >
          Reset
        </button>
      </div>
      <div className="w-full h-[1px] bg-zinc-700/70" />
    </>
  ) : (
    <form onSubmit={handleStepFour}>
      <div className="990:pl-20">
        <h1 className="text-18 font-changa mb-1 text-[#d3d3d3]">4 / 4</h1>
        <h2 className="text-25 text-white font-changa mb-6">Instrument & Training</h2>
        <div className="flex flex-col gap-y-9 pb-8">
          <CampInput
            name="musicTeacher"
            value={campForm?.inputs?.musicTeacher}
            handleInput={handleInput}
            placeholder="Who is your music teacher?"
            error={campForm?.errors?.musicTeacher}
          />
          {instrumentGroups.map(({ name, label, instruments }) => (
            <div key={name} className="flex flex-col">
              <h3 className="text-zinc-300 text-sm font-lato mb-3">{label}</h3>
              <div className="grid grid-cols-12 gap-y-5 760:gap-x-5">
                {instruments.map((instrument) => (
                  <CampRadioBtn
                    key={instrument}
                    name={name}
                    value={instrument}
                    label={instrument}
                    selected={campForm.inputs[name]}
                    handleInput={handleInput}
                  />
                ))}
              </div>
            </div>
          ))}
          <CampSelect
            name="referralSource"
            value={campForm.inputs.referralSource}
            handleInput={handleInput}
            options={heardOfPopsOptions}
          />
        </div>
      </div>
      <div className="w-full h-[1px] bg-zinc-700/70" />
      <div className="flex items-center gap-x-4 float-right mt-5">
        <button
          onClick={() => dispatch(setStep({ personalInfo: true, parentInfo: true, instrumentInfo: false }))}
          type="button"
          className="text-white bg-zinc-400 font-lato duration-300 hover:bg-sunbursthover px-4 py-1 flex items-center gap-x-2 rounded-sm"
        >
          <AwesomeIcon icon={caretLeftIcon} className="text-white w-3 h-3" />
          Backward
        </button>
        <button
          type="submit"
          className="text-white bg-sunburst hover:bg-sunbursthover duration-300 font-lato px-4 py-1 flex items-center justify-center gap-x-2 rounded-sm min-w-28 text-center"
        >
          {isLoading ? <Spinner fill="fill-white" track="text-sunburst" /> : 'Submit'}
        </button>
      </div>
    </form>
  )
}

export default CampAppStepFourForm
