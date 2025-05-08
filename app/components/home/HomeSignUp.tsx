'use client'

import React from 'react'
import TitleWithLine from '../common/TitleWithLine'
import Link from 'next/link'
import { RootState, useAppSelector } from '@/app/redux/store'
import EditableTextArea from '../common/EditableTextArea'

const HomeSignUp = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  return (
    <div className="px-4 990:px-12 xl:px-4 py-40 relative">
      <div
        className={`max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full flex flex-col items-center justify-center relative z-10`}
      >
        <TitleWithLine
          title={textBlockMap?.HOME_SIGN_UP_BLOCK?.homeSignUpTitle}
          type="HOME_SIGN_UP_BLOCK"
          textBlockKey="homeSignUpTitle"
        />
        <EditableTextArea
          tag="p"
          initialValue={textBlockMap?.HOME_SIGN_UP_BLOCK?.homeSignUpSubtitle}
          type="HOME_SIGN_UP_BLOCK"
          textBlockKey="homeSignUpSubtitle"
          className="text-white/80 font-lato mt-7 mb-9 w-full text-center"
        />
        <Link
          href="/newsletter"
          className="bg-blaze font-changa text-12 text-white px-8 py-4 uppercase font-semibold tracking-widest rounded-sm hover:bg-blazehover duration-300"
        >
          Sign Me Up
        </Link>
      </div>
    </div>
  )
}

export default HomeSignUp
