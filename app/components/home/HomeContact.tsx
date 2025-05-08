'use client'

import React from 'react'
import TitleWithLine from '../common/TitleWithLine'
import Picture from '../common/Picture'
import { RootState, useAppSelector } from '@/app/redux/store'
import EditableTextArea from '../common/EditableTextArea'
import Link from 'next/link'

const HomeContact = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  return (
    <div className="px-4 py-40 relative">
      <Picture src="/images/contact-bg.png" className="object-cover w-full h-full absolute inset-0" priority={false} />
      <div
        className={`max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-screen-1400 mx-auto w-full grid grid-cols-12 items-center relative z-10`}
      >
        <div className="col-span-12 990:col-span-6 990:col-start-7 flex flex-col items-center">
          <TitleWithLine
            title={textBlockMap?.HOME_CONTACT_BLOCK?.homeContactTitle}
            type="HOME_CONTACT_BLOCK"
            textBlockKey="homeContactTitle"
          />
          <EditableTextArea
            tag="p"
            initialValue={textBlockMap?.HOME_CONTACT_BLOCK?.homeContactSubtitle}
            type="HOME_CONTACT_BLOCK"
            textBlockKey="homeContactSubtitle"
            className="text-white/80 font-lato mt-7 mb-9 w-full text-center"
          />
          <Link
            href="/contact"
            className="bg-blaze font-changa text-12 text-white px-8 py-4 uppercase font-semibold tracking-widest rounded-sm hover:bg-blazehover duration-300 min-w-36"
          >
            Take me to contact form
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeContact
