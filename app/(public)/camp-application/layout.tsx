'use client'

import { FC, ReactNode } from 'react'
import Breadcrumb from '@/app/components/common/Breadcrumb'
import { RootState, useAppSelector, useCampSelector, useTextBlockSelector, useUserSelector } from '@/app/redux/store'
import TitleWithLine from '@/app/components/common/TitleWithLine'
import { useRotatingText } from '@/app/hooks/useRotatingText'
import EditableTextArea from '@/app/components/common/EditableTextArea'
import Picture from '@/app/components/common/Picture'
import { Check } from 'lucide-react'

const campTestimonials = [
  'It was awesome!',
  'It was fun!',
  'I’m a better musician because of camp.',
  'Camp was great!',
  'Fantastic instruction!'
]

const CampProgressBar = () => {
  const { steps } = useCampSelector()

  const totalSteps = Object.keys(steps).length
  const completedSteps = Object.values(steps).filter(Boolean).length
  const percentage = (completedSteps / totalSteps) * 100

  return (
    <div className="w-full h-5 bg-[#333] overflow-hidden">
      <div className="h-full bg-blaze transition-all duration-300" style={{ width: `${percentage}%` }} />
    </div>
  )
}

const CampApplicationLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { text, fade } = useRotatingText(campTestimonials)
  const { textBlockMap } = useTextBlockSelector()
  const { user } = useUserSelector()
  const { isFeatureToggleCardLive, isFeatureToggleCardVisible } = useAppSelector((state: RootState) => state.app)

  return isFeatureToggleCardLive || (user.isAdmin && isFeatureToggleCardVisible) ? (
    <>
      <Breadcrumb breadcrumb="Camp Application" classname="1200:max-w-screen-1400" />
      <div className="px-4 py-40 relative">
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url('/images/bio-bg.png')`,
            backgroundAttachment: 'fixed'
          }}
        />

        <div
          className={`max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full grid grid-cols-12 gap-y-12 990:gap-x-20 items-center relative z-10`}
        >
          <div className="col-span-12 1200:col-span-6 flex flex-col items-center 1200:items-start">
            <TitleWithLine
              title={textBlockMap?.CAMP_INFO_PAGE?.campInfoPageTitle}
              type="CAMP_INFO_PAGE"
              textBlockKey="campInfoPageTitle"
            />
            <EditableTextArea
              tag="p"
              initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoP1}
              type="CAMP_INFO_PAGE"
              textBlockKey="campInfoP1"
              className="font-lato text-[#cacaca] mb-5 text-center 1200:text-left mt-12"
            />
            <EditableTextArea
              tag="p"
              initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoP2}
              type="CAMP_INFO_PAGE"
              textBlockKey="campInfoP2"
              className="font-lato text-[#cacaca] mb-8 text-center 1200:text-left"
            />

            <EditableTextArea
              tag="h2"
              initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoP3}
              type="CAMP_INFO_PAGE"
              textBlockKey="campInfoP3"
              className="text-15 text-blaze font-changa"
            />
          </div>
          <div className="mt-20 1200:mt-0 col-span-12 1200:col-span-6 flex justify-center">
            <div className="relative before:absolute before:content-[''] before:w-full before:h-full before:border-4 before:border-blaze before:rounded-md before:z-[-1] before:-top-2 430:before:-top-10 left-0 before:max-w-[450px] max-w-[450px] h-full max-h-[700px]">
              <Picture
                src="/images/camp-info.jpg"
                className="w-full h-fit object-contain ml-0 430:ml-12"
                priority={false}
              />
            </div>
          </div>
          <div className="col-span-12 mt-20">
            <EditableTextArea
              tag="h1"
              initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoTestimonialsTitle}
              type="CAMP_INFO_PAGE"
              textBlockKey="campInfoTestimonialsTitle"
              className="text-2xl font-changa text-center mb-4"
            />
            <div
              className={`transition-opacity duration-1000 font-lato text-17 text-center ${
                fade ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {text}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 990:px-12 xl:px-4 py-20">
        <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-screen-1400 mx-auto w-full">
          <div className="relative h-fit">
            <span className="absolute w-full top-1/2 -translate-y-50 left-0 right-0 h-[1.5px] bg-blaze/50"></span>
            <EditableTextArea
              tag="h1"
              initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoApplicationTitle}
              type="CAMP_INFO_PAGE"
              textBlockKey="campInfoApplicationTitle"
              className="text-white font-changa text-center text-5xl relative z-10"
            />
          </div>
          <EditableTextArea
            tag="h2"
            initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoApplicationSubtitle}
            type="CAMP_INFO_PAGE"
            textBlockKey="campInfoApplicationSubtitle"
            className="text-white text-center font-changa text-[27px] tracking-tight mt-5"
          />
          <EditableTextArea
            tag="h3"
            initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoApplicationDateAndTime}
            type="CAMP_INFO_PAGE"
            textBlockKey="campInfoApplicationDateAndTime"
            className="font-changa text-center text-20 tracking-tight mt-2 mb-6 text-white"
          />

          <div className="flex flex-col 990:flex-row mt-24">
            <aside className="w-full 990:w-[360px] text-[#d3d3d3] font-lato">
              <div className="flex items-center gap-x-2 mb-3">
                <div className="w-6 h-6 flex items-center justify-center border border-blaze rounded-full">
                  <Check className="w-3 h-3 text-blaze" />
                </div>
                <h4 className="text-[18px]">At least two years of playing experience</h4>
              </div>
              <div className="mt-8">
                <EditableTextArea
                  tag="h5"
                  initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoApplicationCampScheduleTitle}
                  type="CAMP_INFO_PAGE"
                  textBlockKey="campInfoApplicationCampScheduleTitle"
                  className="text-2xl font-changa font-semibold mb-3"
                />
                <EditableTextArea
                  tag="p"
                  initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoFirstDayTitle}
                  type="CAMP_INFO_PAGE"
                  textBlockKey="campInfoFirstDayTitle"
                  className="font-medium text-[17px] mb-1"
                />
                <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
                  <EditableTextArea
                    tag="li"
                    initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoFirstDayDetail}
                    type="CAMP_INFO_PAGE"
                    textBlockKey="campInfoFirstDayDetail"
                  />
                </ul>
                <EditableTextArea
                  tag="p"
                  initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoSecondDayTitle}
                  type="CAMP_INFO_PAGE"
                  textBlockKey="campInfoSecondDayTitle"
                  className="font-medium text-[17px] mb-1"
                />
                <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
                  <EditableTextArea
                    tag="li"
                    initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoSecondDayDetail}
                    type="CAMP_INFO_PAGE"
                    textBlockKey="campInfoSecondDayDetail"
                  />
                </ul>
                <EditableTextArea
                  tag="p"
                  initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoThirdDayTitle}
                  type="CAMP_INFO_PAGE"
                  textBlockKey="campInfoThirdDayTitle"
                  className="font-medium text-[17px] mb-1"
                />
                <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
                  <EditableTextArea
                    tag="li"
                    initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoThirdDayDetail}
                    type="CAMP_INFO_PAGE"
                    textBlockKey="campInfoThirdDayDetail"
                  />
                </ul>
                <EditableTextArea
                  tag="p"
                  initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoFourthDayTitle}
                  type="CAMP_INFO_PAGE"
                  textBlockKey="campInfoFourthDayTitle"
                  className="font-medium text-[17px] mb-1"
                />
                <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
                  <EditableTextArea
                    tag="li"
                    initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoFourthDayDetail}
                    type="CAMP_INFO_PAGE"
                    textBlockKey="campInfoFourthDayDetail"
                  />
                </ul>
                <div className="">
                  <EditableTextArea
                    tag="p"
                    initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoPerformanceNight}
                    type="CAMP_INFO_PAGE"
                    textBlockKey="campInfoPerformanceNight"
                    className="font-medium text-[17px] mb-1"
                  />
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <EditableTextArea
                      tag="li"
                      initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoPerformanceCenter}
                      type="CAMP_INFO_PAGE"
                      textBlockKey="campInfoPerformanceCenter"
                    />
                    <EditableTextArea
                      tag="li"
                      initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoPerformanceAddress}
                      type="CAMP_INFO_PAGE"
                      textBlockKey="campInfoPerformanceAddress"
                    />
                    <EditableTextArea
                      tag="li"
                      initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoDressRehearsal}
                      type="CAMP_INFO_PAGE"
                      textBlockKey="campInfoDressRehearsal"
                    />
                    <EditableTextArea
                      tag="li"
                      initialValue={textBlockMap?.CAMP_INFO_PAGE?.campInfoDinner}
                      type="CAMP_INFO_PAGE"
                      textBlockKey="campInfoDinner"
                    />
                  </ul>
                </div>
              </div>
            </aside>
            <div className="w-[1px] h-auto bg-zinc-700/70 ml-20"></div>
            <div className="flex flex-col w-full flex-1">
              <section className="pt-8 pb-5 border-b-1 border-b-zinc-700/70">
                <div className="px-6 760:px-28 mx-auto">
                  <h6 className="text-white text-11 font-bold text-center mb-1 uppercase tracking-wider">Progress</h6>
                  <CampProgressBar />
                </div>
              </section>
              <main className="pt-7">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="text-center py-20 flex items-center justify-center w-full">Check back next year!</div>
  )
}

export default CampApplicationLayout
