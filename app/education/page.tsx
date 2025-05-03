'use client'

import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import Picture from '../components/common/Picture'
import TitleWithLine from '../components/common/TitleWithLine'
import { RootState, useAppSelector } from '../redux/store'
import EditableTextArea from '../components/common/EditableTextArea'

const Education = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <>
      <Breadcrumb breadcrumb="Education" />
      <div className="px-4 py-40 relative">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="jumping-dot" />
          </div>
        ) : (
          <>
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
                  title={textBlockMap?.EDUCATION_PAGE?.educationPageTitle}
                  type="EDUCATION_PAGE"
                  textBlockKey="educationPageTitle"
                />

                <EditableTextArea
                  tag="p"
                  initialValue={textBlockMap?.EDUCATION_PAGE?.educationPageParagraph}
                  type="EDUCATION_PAGE"
                  textBlockKey="educationPageParagraph"
                  className="font-lato text-[#cacaca] mb-5 text-center 1200:text-left mt-12"
                />
              </div>
              <div className="mt-20 1200:mt-0 col-span-12 1200:col-span-6 flex justify-center">
                <div className="relative before:absolute before:content-[''] before:w-full before:h-full before:border-4 before:border-blaze before:rounded-md before:z-[-1] before:-top-2 430:before:-top-10 left-0 before:max-w-[450px] max-w-[450px] h-full max-h-[700px]">
                  <Picture
                    src="/images/edu-1.jpg"
                    className="w-full h-fit object-contain ml-0 430:ml-12"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Education
