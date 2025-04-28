'use client'

import React, { FC, ReactNode } from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { checkIcon } from '../lib/icons'
import { RootState, useAppSelector } from '../redux/store'

const CampProgressBar = () => {
  const { steps } = useAppSelector((state: RootState) => state.camp)

  const totalSteps = Object.keys(steps).length
  const completedSteps = Object.values(steps).filter(Boolean).length
  const percentage = (completedSteps / totalSteps) * 100

  return (
    <div className="w-full h-5 bg-[#333] overflow-hidden">
      <div className="h-full bg-blaze transition-all duration-300" style={{ width: `${percentage}%` }} />
    </div>
  )
}

const CampApplicationLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Breadcrumb breadcrumb="Camp Application" classname="1200:max-w-screen-1400" />
      <div className="px-4 990:px-12 xl:px-4 py-20">
        <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-screen-1400 mx-auto w-full">
          <div className="relative h-fit">
            <span className="absolute w-full top-1/2 -translate-y-50 left-0 right-0 h-[1.5px] bg-blaze/50"></span>
            <h1 className="text-white font-changa text-center text-5xl relative z-10">
              Camping with the Pops &mdash; Free Full Orchestra Experience
            </h1>
          </div>
          <h2 className="text-white text-center font-changa text-[27px] tracking-tight mt-5">
            Welcoming Middle and High School Band and Orchestra Students!
          </h2>
          <h3 className="font-changa text-center text-20 tracking-tight mt-2 mb-6 text-white">
            July 7-11, 2025 &mdash; 5:30 to 9:00 p.m.
          </h3>
          <div className="flex flex-col 990:flex-row mt-24">
            <aside className="w-full 990:w-[360px] text-[#d3d3d3] font-lato">
              <div className="flex items-center gap-x-2 mb-3">
                <div className="w-6 h-6 flex items-center justify-center border border-blaze rounded-full">
                  <AwesomeIcon icon={checkIcon} className="w-3 h-3 text-blaze" />
                </div>
                <h4 className="text-[18px]">At least two years of playing experience</h4>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-6 h-6 flex items-center justify-center border border-blaze rounded-full">
                  <AwesomeIcon icon={checkIcon} className="w-3 h-3 text-blaze" />
                </div>
                <h4 className="text-[18px]">Up to five student conductors accepted</h4>
              </div>
              <div className="mt-8">
                <h5 className="text-2xl font-changa font-semibold mb-3">Camp Schedule</h5>
                <p className="font-medium text-[17px] mb-1">Monday &ndash; Thursday</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>State College of Florida, Bradenton</li>
                  <li>Building 11 (Music Building)</li>
                  <li>5840 26th St. W</li>
                  <li>Bradenton, FL 34207</li>
                  <li>5:30 &ndash; 6:30: Masterclass, conducting lessons</li>
                  <li>6:30 &ndash; 7:00: Break with snacks</li>
                  <li>7:00 &ndash; 9:00: Rehearsal with Pops musicians</li>
                </ul>
                <div className="mt-5">
                  <p className="font-medium text-[17px] mb-1">Friday</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Manatee Performing Arts Center &ndash; Stone Hall</li>
                    <li>503 Third Ave W, Bradenton, FL 34025</li>
                    <li>5:30 &ndash; 6:45: Dress rehearsal</li>
                    <li>6:45: Dinner provided</li>
                    <li>7:30: Public performance</li>
                  </ul>
                </div>
              </div>
            </aside>
            <div className="w-[1px] h-auto bg-zinc-700/70 ml-20"></div>
            <div className="flex flex-col w-full flex-1">
              <section className="pt-8 pb-5 border-b-1 border-b-zinc-700/70">
                <div className="px-6 760:px-28 mx-auto">
                  <h6 className="text-white text-11 font-bold text-center mb-1 uppercase tracking-wider">Progress</h6>
                  <CampProgressBar />
                </div>
              </section>
              <main className="pt-7">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CampApplicationLayout
