'use client'

import React, { FC } from 'react'
import Link from 'next/link'
import PageTitle from '@/app/components/admin/PageTitle'
import AwesomeIcon from '@/app/components/common/AwesomeIcon'
import Spinner from '@/app/components/common/Spinner'
import { RootState, useAppSelector } from '@/app/redux/store'
import { dashboardData } from '@/app/utils/admin.utils'

const PageViewsCard: FC<{ info: any }> = ({ info }) => {
  return (
    <div className="col-span-12 row-span-2 760:col-span-6 990:col-span-4 1690:col-span-3 2300:col-span-2 bg-midnightblack w-full p-6 rounded-lg shadow-adminpage group">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className={`text-sm font-semibold mb-2 ${info.color}`}>{info?.title}</h1>
          <h2 className="text-xl font-bold">Desktop: {info?.count}</h2>
          <h3 className="text-xl font-bold">Mobile: {info?.count2}</h3>
        </div>
        <div
          className={`w-12 h-12 rounded-full bg-duskgray flex items-center justify-center group-hover:${info.color} duration-300`}
        >
          <AwesomeIcon icon={info.icon} className={`w-5 h-5 group-hover:animate-rotateToTwoOClock`} />
        </div>
      </div>
    </div>
  )
}

const DefaultCard: FC<{ info: any; i: number }> = ({ info, i }) => {
  return (
    <Link
      href={info.linkKey}
      className={`${
        i === 0 ? 'cursor-default' : 'cursor-pointer'
      } col-span-12 760:col-span-6 990:col-span-4 1690:col-span-3 2300:col-span-2 bg-midnightblack w-full p-6 rounded-lg shadow-adminpage group`}
    >
      <div className={`flex justify-between group-hover:${info.color} duration-300`}>
        <div className="flex flex-col gap-y-2">
          <h1 className={`text-sm font-semibold ${info.color}`}>{info?.title}</h1>
          {info.isLoading ? (
            <Spinner fill={info.fill} track="text-midnightblack" wAndH="w-9 h-9" />
          ) : (
            <>
              <div className="flex items-center gap-x-2">
                <h3 className="text-3xl font-bold">{info.count}</h3>
              </div>
            </>
          )}
        </div>
        <div className="w-12 h-12 rounded-full bg-duskgray flex items-center justify-center">
          <AwesomeIcon icon={info.icon} className={`w-5 h-5 group-hover:animate-rotateToTwoOClock`} />
        </div>
      </div>
    </Link>
  )
}

const Dashboard = () => {
  const app = useAppSelector((state: RootState) => state.app)

  return (
    <div className="relative">
      <div className="mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <PageTitle title="Dashboard" color="bg-blaze" />
      </div>
      <div className="grid grid-cols-12 gap-5 mt-12 font-lato">
        {dashboardData(app).map((info, i) => {
          switch (info.title) {
            case 'Page Views':
              return <PageViewsCard key={i} info={info} />
            default:
              return <DefaultCard key={i} info={info} i={i} />
          }
        })}
      </div>
    </div>
  )
}

export default Dashboard
