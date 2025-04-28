'use client'

import ContactForm from '@/app/forms/ContactForm'
import React from 'react'
import TitleWithLine from '../common/TitleWithLine'
import Picture from '../common/Picture'
import { RootState, useAppSelector } from '@/app/redux/store'

const HomeContact = () => {
  const { success } = useAppSelector((state: RootState) => state.question)

  return (
    <div className="px-4 py-40 relative">
      <Picture src="/images/contact-bg.png" className="object-cover w-full h-full absolute inset-0" priority={false} />
      <div
        className={`max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-screen-1400 mx-auto w-full grid grid-cols-12 items-center relative z-10`}
      >
        <div className="col-span-12 990:col-span-6 990:col-start-7 flex flex-col items-center">
          {success ? (
            <h1 className="font-changa text-2xl text-white font-medium text-center">
              Your message has been received and someone from <div className="text-blaze">The Pops</div> will be in
              touch with you shortly.
            </h1>
          ) : (
            <>
              <TitleWithLine title="Have A Question?" />
              <p className="text-white/80 font-lato mt-7 mb-9 w-full text-center">
                We&apos;d love to hear from you—drop your name and message below and <br /> we&apos;ll get back to you
                soon.
              </p>
              <ContactForm />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeContact
