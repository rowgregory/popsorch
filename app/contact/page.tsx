'use client'

import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import OrchMapLight from '../components/OrchMapLight'
import ContactForm from '../forms/ContactForm'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { mapLocationDotIcon, pencilIcon, phoneIcon } from '../lib/icons'
import { RootState, useAppSelector } from '../redux/store'
import TitleWithLine from '../components/common/TitleWithLine'
import EditableTextArea from '../components/common/EditableTextArea'

const Contact = () => {
  const { loading } = useAppSelector((state: RootState) => state.app)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { success } = useAppSelector((state: RootState) => state.question)

  return (
    <>
      <Breadcrumb breadcrumb="Contact" />
      {loading ? (
        <div className="flex h-full w-full items-center justify-center py-40">
          <div className="jumping-dot" />
        </div>
      ) : (
        <>
          <div className="px-4 990:px-12 xl:px-4 pt-16 pb-24">
            <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-screen-1400 w-full mx-auto grid grid-cols-12 gap-y-12 576:gap-x-20">
              <div className="col-span-12 990:col-span-8 flex flex-col items-center">
                {success ? (
                  <h1 className="font-changa text-2xl text-white font-medium text-center text-wrap max-w-screen-430 w-full">
                    Your message has been received and someone from <span className="text-blaze">The Pops</span> will be
                    in touch with you shortly.
                  </h1>
                ) : (
                  <div className="flex flex-col gap-y-4 w-full justify-center items-center">
                    <TitleWithLine
                      title={textBlockMap?.CONTACT_PAGE?.contactPageTitle || 'Have a Question?'}
                      type="CONTACT_PAGE"
                      textBlockKey="contactPageTitle"
                    />
                    <ContactForm btnClassname="justify-start" />
                  </div>
                )}
              </div>
              <div className="col-span-12 990:col-span-4 flex flex-col gap-y-10 items-center">
                <TitleWithLine
                  title={textBlockMap?.FOOTER_BLOCK?.contactInfoTitle}
                  type="FOOTER_BLOCK"
                  textBlockKey="contactInfoTitle"
                />
                <ul className="flex flex-col items-center gap-y-3 text-[#b2b2b2] font-lato">
                  <li className="flex items-center gap-x-2">
                    <AwesomeIcon icon={pencilIcon} className="text-blaze w-3.5 h-3.5" />
                    <EditableTextArea
                      tag="div"
                      initialValue={textBlockMap?.FOOTER_BLOCK?.contactInfoLine1}
                      type="FOOTER_BLOCK"
                      textBlockKey="contactInfoLine1"
                    />
                  </li>
                  <li className="flex items-center gap-x-2">
                    <AwesomeIcon icon={mapLocationDotIcon} className="text-blaze w-3.5 h-3.5" />
                    <EditableTextArea
                      tag="div"
                      initialValue={textBlockMap?.FOOTER_BLOCK?.contactInfoLine2}
                      type="FOOTER_BLOCK"
                      textBlockKey="contactInfoLine2"
                    />
                  </li>
                  <li className="flex items-center gap-x-2">
                    <AwesomeIcon icon={phoneIcon} className="text-blaze w-3.5 h-3.5" />
                    <EditableTextArea
                      tag="div"
                      initialValue={textBlockMap?.FOOTER_BLOCK?.contactInfoLine3 || '941 926 POPS (7677)'}
                      type="FOOTER_BLOCK"
                      textBlockKey="contactInfoLine3"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] w-full">
            <OrchMapLight latitude={27.49781} longitude={-82.567787} address="502 3rd Ave W, Bradenton, FL 34205" />
          </div>
        </>
      )}
    </>
  )
}

export default Contact
