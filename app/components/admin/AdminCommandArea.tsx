'use client'

import React, { FC } from 'react'
import { useAppDispatch } from '@/app/redux/store'
import Link from 'next/link'
import ActionButton from './AdminActionButton'
import { openCreateModal } from '@/app/redux/features/dashboardSlice'

const commandAreaText = {
  LUNCH: {
    title: 'Lunch',
    p1: `The Lunch page allows you to create a lunch event, which will be displayed on the frontend under the Lunch Program. Here, you can set details like the location, time, and number of participants. Once created, others can see and join the lunch, making it easy to organize and manage group meals.`,
    func: openCreateModal()
  },
  PROFILE: {
    title: 'Profile',
    p1: `This page allows you to manage your personal details and update your profile information. Any changes made here will also update the data in the linked approved user record. You can easily edit your name, contact details, and other relevant information. None of this information is public.`
    // func: setOpenModalProfileUpdate()
  },
  LOGS: {
    title: 'Logs'
  },
  SYSTEM_STATUS: {
    title: 'Endpoint Status',
    p1: `This page checks if the key parts of your system are working correctly. It runs a series of tests on different features, like creating and updating records, to make sure everything is functioning as it should. If everything is working properly, it will show that the feature is operational. If there's an issue, it will indicate the failure and provide details on what went wrong. It's a quick way to check that all important components of your system are running smoothly and ready for use.`
  }
} as any

const AdminCommandArea: FC<{ type: string; btnText?: string }> = ({ type, btnText }) => {
  const dispatch = useAppDispatch()

  return (
    <div className="py-9 480:py-14 w-full flex flex-col">
      <div className="flex flex-col 1160:flex-row gap-y-16 1160:gap-x-16">
        <div className="flex flex-col w-full">
          <h1 className="text-5xl font-rubik font-medium mb-6">{commandAreaText[type].title}</h1>
          <p className="font-rubik font-light w-full 760:w-2/3 text-17 mb-2">{commandAreaText[type].p1}</p>
          {commandAreaText?.[type]?.p2 && (
            <p className="font-rubik font-light w-full 760:w-2/3 text-17 mb-2">{commandAreaText?.[type]?.p2}</p>
          )}
          {commandAreaText?.[type]?.func && btnText && <ActionButton text={btnText} onClick={() => dispatch(commandAreaText[type].func)} />}
          {commandAreaText?.[type]?.link && (
            <div className="flex flex-col 760:flex-row 760:items-center gap-x-2 mt-5">
              <h3 className="text-sm font-rubik font-light mb-2 760:mb-0">
                See how your {commandAreaText?.[type]?.title?.toLowerCase()} are displayed to customers on the public page.
              </h3>
              <Link href={commandAreaText?.[type]?.link} className={`font-rubik font-light text-sm w-fit`} style={{ color: '#00c5d9' }}>
                View Public {commandAreaText?.[type]?.title}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminCommandArea
