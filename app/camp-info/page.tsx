'use client'

import React from 'react'
import TitleWithLine from '../components/common/TitleWithLine'
import Picture from '../components/common/Picture'
import Breadcrumb from '../components/common/Breadcrumb'
import { useRotatingText } from '../hooks/useRotatingText'
import { RootState, useAppSelector } from '../redux/store'
import EditableTextArea from '../components/common/EditableTextArea'

const campTestimonials = [
  'It was awesome!',
  'It was fun!',
  'I’m a better musician because of camp.',
  'Camp was great!',
  'Fantastic instruction!'
]

const CampInfo = () => {
  const { text, fade } = useRotatingText(campTestimonials)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <>
      <Breadcrumb breadcrumb="Camp Info" />
      <div className="px-4 py-40 relative">
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url('/images/bio-bg.png')`,
            backgroundAttachment: 'fixed'
          }}
        />
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="jumping-dot" />
          </div>
        ) : (
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
        )}
      </div>
    </>
  )
}

export default CampInfo
