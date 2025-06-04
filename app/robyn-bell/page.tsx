'use client'

import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import Picture from '../components/common/Picture'
import EditableTextArea from '../components/common/EditableTextArea'
import { RootState, useAppSelector } from '../redux/store'

const RobynBell = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <>
      <Breadcrumb breadcrumb="Robyn Bell" />
      {loading ? (
        <div className="flex h-full w-full items-center justify-center py-40">
          <div className="jumping-dot" />
        </div>
      ) : (
        <section className="px-4 990:px-12 xl:px-4">
          <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto grid grid-cols-12 990:gap-x-12 pt-32 pb-44">
            <div className="order-2 1200:order-1 col-span-12 1200:col-span-8 mb-12 1200:mb-0 flex flex-col gap-y-4 gap-x-2 w-full">
              <Picture src="/images/robyn-2.png" className="w-full h-full aspect-video" priority={true} />
              <div className="bg-duskgray p-7 430:p-14 font-medium leading-relaxed font-lato text-white flex flex-col mb-20">
                <EditableTextArea
                  tag="h1"
                  initialValue={textBlockMap?.ROBYN_BELL_PAGE?.robynBellPageTitle || 'Robyn Bell makes the show!'}
                  type="ROBYN_BELL_PAGE"
                  textBlockKey="robynBellPageTitle"
                  className="font-changa text-2xl mb-5 text-white"
                />
                <EditableTextArea
                  tag="p"
                  initialValue={textBlockMap?.ROBYN_BELL_PAGE?.robynBellPageMainP1}
                  type="ROBYN_BELL_PAGE"
                  textBlockKey="robynBellPageMainP1"
                  className="mb-4"
                />
                <EditableTextArea
                  tag="p"
                  initialValue={textBlockMap?.ROBYN_BELL_PAGE?.robynBellPageMainP2}
                  type="ROBYN_BELL_PAGE"
                  textBlockKey="robynBellPageMainP2"
                  className="mb-4"
                />
                <EditableTextArea
                  tag="p"
                  initialValue={textBlockMap?.ROBYN_BELL_PAGE?.robynBellPageMainP3}
                  type="ROBYN_BELL_PAGE"
                  textBlockKey="robynBellPageMainP3"
                  className="mb-4"
                />

                <EditableTextArea
                  tag="p"
                  initialValue={textBlockMap?.ROBYN_BELL_PAGE?.robynBellPageMainP4}
                  type="ROBYN_BELL_PAGE"
                  textBlockKey="robynBellPageMainP4"
                  className="mb-4"
                />
                <EditableTextArea
                  tag="h3"
                  initialValue={textBlockMap?.ROBYN_BELL_PAGE?.robynBellPageMainLine1}
                  type="ROBYN_BELL_PAGE"
                  textBlockKey="robynBellPageMainLine1"
                  className="mb-2 font-changa text-12 font-medium tracking-wider text-sunburst uppercase"
                />
                <EditableTextArea
                  tag="h3"
                  initialValue={textBlockMap?.ROBYN_BELL_PAGE?.robynBellPageMainLines}
                  type="ROBYN_BELL_PAGE"
                  textBlockKey="robynBellPageMainLines"
                  className="mb-2 font-changa text-12 font-medium tracking-wider text-sunburst uppercase"
                />
              </div>
            </div>
            <div className="order-2 1200:order-1 col-span-12 1200:col-span-4 mb-12 1200:mb-0 flex flex-col gap-y-4 gap-x-2 w-full">
              <div className="bg-duskgray p-7 430:p-14">
                <EditableTextArea
                  tag="h1"
                  initialValue={textBlockMap?.ROBYN_BELL_PAGE?.robynBellPageSidePanelTitle}
                  type="ROBYN_BELL_PAGE"
                  textBlockKey="robynBellPageSidePanelTitle"
                  className="font-changa text-2xl text-blaze mb-5"
                />
                <EditableTextArea
                  tag="p"
                  initialValue={textBlockMap?.ROBYN_BELL_PAGE?.robynBellPageSidePanelP1}
                  type="ROBYN_BELL_PAGE"
                  textBlockKey="robynBellPageSidePanelP1"
                  className="mb-4 text-white font-medium leading-relaxed font-lato"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default RobynBell
