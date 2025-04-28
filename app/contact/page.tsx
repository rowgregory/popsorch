'use client'

import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import OrchMapLight from '../components/OrchMapLight'
import ContactForm from '../forms/ContactForm'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { mapLocationDotIcon, pencilIcon, phoneIcon } from '../lib/icons'
import { RootState, useAppSelector } from '../redux/store'

const Contact = () => {
  const { success } = useAppSelector((state: RootState) => state.question)
  return (
    <>
      <Breadcrumb breadcrumb="Contact" />
      <div className="relative h-[500px] w-full">
        <OrchMapLight latitude={27.335036} longitude={-82.53721} address="P.O. Box 1622, Sarasota, FL 34230" />
      </div>
      <div className="px-4 990:px-12 xl:px-4 pt-16 pb-24">
        <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-screen-1400 w-full mx-auto grid grid-cols-12 gap-y-12 576:gap-x-20">
          <div className="col-span-12 990:col-span-8 flex flex-col items-center">
            {success ? (
              <h1 className="font-changa text-2xl text-white font-medium text-center text-wrap max-w-screen-430 w-full">
                Your message has been received and someone from <span className="text-blaze">The Pops</span> will be in
                touch with you shortly.
              </h1>
            ) : (
              <>
                <h1 className="text-[30px] font-changa mb-8">Have a Question?</h1>
                <ContactForm btnClassname="justify-start" />
              </>
            )}
          </div>
          <div className="col-span-12 990:col-span-4 flex justify-center items-center 990:items-start flex-col 990:justify-start mt-16 990:mt-0">
            <h1 className="text-[30px] font-changa mb-8">Contact Info</h1>
            <ul className="flex flex-col items-center 990:items-start gap-y-3 text-[#b2b2b2] font-lato">
              <li className="flex items-center gap-x-2">
                <AwesomeIcon icon={pencilIcon} className="text-blaze w-3.5 h-3.5" />
                info@ThePopsOrchestra.org
              </li>
              <li className="flex items-center gap-x-2">
                <AwesomeIcon icon={mapLocationDotIcon} className="text-blaze w-3.5 h-3.5" />
                P.O. Box 1622, Sarasota, FL 34230
              </li>
              <li className="flex items-center gap-x-2">
                <AwesomeIcon icon={phoneIcon} className="text-blaze w-3.5 h-3.5" />
                941 926 POPS (7677)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
