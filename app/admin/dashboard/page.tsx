'use client'

import React from 'react'
import PageTitle from '@/app/components/admin/PageTitle'
import AwesomeIcon from '@/app/components/common/AwesomeIcon'
import Spinner from '@/app/components/common/Spinner'
import { RootState, useAppSelector } from '@/app/redux/store'
import { dashboardData } from '@/app/utils/admin.utils'
import Link from 'next/link'

const Dashboard = () => {
  const app = useAppSelector((state: RootState) => state.app)
  const { totalItems, loading } = useAppSelector((state: RootState) => state.mailchimp)

  return (
    <>
      <PageTitle title="Dashboard" color="bg-blaze" />
      <div className="grid grid-cols-12 gap-5 mt-12">
        {dashboardData(app, totalItems, loading).map((info, i) => (
          <Link
            href={info.linkKey}
            key={i}
            className={`col-span-12 760:col-span-6 990:col-span-4 1690:col-span-3 2300:col-span-2 bg-midnightblack w-full p-6 rounded-lg shadow-adminpage group`}
          >
            <div className={`flex justify-between group-hover:${info.color} duration-300`}>
              <div className="flex flex-col gap-y-2">
                <h1 className={`text-sm font-semibold ${info.color}`}>{info?.title}</h1>
                {info.isLoading ? (
                  <Spinner fill={info.fill} track="text-midnightblack" wAndH="w-9 h-9" />
                ) : (
                  <h2 className={`text-3xl font-bold`}>{info.count}</h2>
                )}
              </div>
              <div className="w-12 h-12 rounded-full bg-duskgray flex items-center justify-center">
                <AwesomeIcon icon={info.icon} className={`w-5 h-5 group-hover:animate-rotateToTwoOClock`} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Dashboard
