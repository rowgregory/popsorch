'use client'

import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import Picture from '../components/common/Picture'
import EditableTextArea from '../components/common/EditableTextArea'
import { RootState, useAppSelector } from '../redux/store'

const AdvertiseWithUs = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <>
      <Breadcrumb breadcrumb="Advertise With Us" />
      <section className="px-4 990:px-12 xl:px-4">
        {loading ? (
          <div className="w-full flex justify-center items-center mx-auto py-40">
            <div className="jumping-dot" />
          </div>
        ) : (
          <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto grid grid-cols-12 990:gap-x-12 pt-32 pb-44">
            <>
              <div className="order-2 1200:order-1 col-span-12 1200:col-span-8 mb-4 1200:mb-0 flex flex-col gap-y-4 gap-x-2 w-full">
                <Picture src="/images/awu.jpg" className="w-full h-full aspect-video" priority={true} />
                <div className="bg-duskgray p-7 430:p-14 font-medium leading-relaxed font-lato text-[#b2b2b2] flex flex-col">
                  <EditableTextArea
                    tag="h1"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsTitle}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsTitle"
                    className="font-changa text-2xl mb-5 text-white"
                  />
                  <EditableTextArea
                    tag="h2"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhyTitle1}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhyTitle1"
                    className="font-changa mb-1 text-blaze"
                  />
                  <EditableTextArea
                    tag="p"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhyDesc1}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhyDesc1"
                    className="mb-4 text-zinc-300"
                  />

                  <EditableTextArea
                    tag="h2"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhyTitle2}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhyTitle2"
                    className="font-changa mb-1 text-blaze"
                  />
                  <EditableTextArea
                    tag="p"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhyDesc2}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhyDesc2"
                    className="mb-4 text-zinc-300"
                  />

                  <EditableTextArea
                    tag="h2"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhyTitle3}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhyTitle3"
                    className="font-changa mb-1 text-blaze"
                  />

                  <EditableTextArea
                    tag="p"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhyDesc3}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhyDesc3"
                    className="mb-4 text-zinc-300"
                  />

                  <EditableTextArea
                    tag="h2"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhyTitle4}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhyTitle4"
                    className="font-changa mb-1 text-blaze"
                  />

                  <EditableTextArea
                    tag="p"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhyDesc4}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhyDesc4"
                    className="mb-4 text-zinc-300"
                  />

                  <EditableTextArea
                    tag="h2"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhyTitle5}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhyTitle5"
                    className="font-changa mb-1 text-blaze"
                  />

                  <EditableTextArea
                    tag="p"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhyDesc5}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhyDesc5"
                    className="mb-4 text-zinc-300"
                  />
                  <EditableTextArea
                    tag="h2"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhyTitle6}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhyTitle6"
                    className="font-changa mb-1 text-blaze"
                  />

                  <EditableTextArea
                    tag="p"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhyDesc6}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhyDesc6"
                    className="mb-4 text-zinc-300"
                  />

                  <EditableTextArea
                    tag="h4"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsSubtitle1}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsSubtitle1"
                    className="mb-2 font-changa text-12 font-medium tracking-wider text-sunburst uppercase"
                  />
                </div>
              </div>
              <div className="order-2 1200:order-1 col-span-12 1200:col-span-4 mb-12 1200:mb-0 flex flex-col gap-y-4 gap-x-2 w-full">
                <div className="bg-duskgray p-7 430:p-14">
                  <EditableTextArea
                    tag="h1"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelTitle}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhySidePanelTitle"
                    className="font-changa text-2xl text-blaze mb-5 text-center max-w-60 mx-auto"
                  />

                  <p className="mb-4 font-medium leading-relaxed font-lato">
                    <a
                      href="https://thepopsorchestra.org/wp-content/uploads/2024/10/Ad-rate-sheet.pdf"
                      target="_blank"
                      className="mr-2 text-blaze"
                    >
                      Download
                    </a>

                    <EditableTextArea
                      tag="span"
                      initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelDownloadP}
                      type="ADVERTISE_WITH_US_PAGE"
                      textBlockKey="advertiseWithUsWhySidePanelDownloadP"
                      className="text-zinc-300"
                    />
                  </p>
                </div>
                <div className="bg-duskgray p-7 430:p-14">
                  <EditableTextArea
                    tag="h1"
                    initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelTitle2}
                    type="ADVERTISE_WITH_US_PAGE"
                    textBlockKey="advertiseWithUsWhySidePanelTitle2"
                    className="font-changa text-2xl text-blaze mb-5 text-center max-w-60 mx-auto"
                  />
                  <div className="flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-y-4 py-3 border-y border-zinc-700/70 text-[#b2b2b2] font-lato text-sm">
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelNum1value}
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey="advertiseWithUsWhySidePanelNum1value"
                        className="font-semibold text-right pr-4 border-r border-[#555]"
                      />
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelNum1Text}
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey="advertiseWithUsWhySidePanelNum1Text"
                        className="pl-4"
                      />
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelNum2value}
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey="advertiseWithUsWhySidePanelNum2value"
                        className="font-semibold text-right pr-4 border-r border-[#555]"
                      />
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelNum2Text}
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey="advertiseWithUsWhySidePanelNum2Text"
                        className="pl-4"
                      />
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelNum3value}
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey="advertiseWithUsWhySidePanelNum3value"
                        className="font-semibold text-right pr-4 border-r border-[#555]"
                      />
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelNum3Text}
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey="advertiseWithUsWhySidePanelNum3Text"
                        className="pl-4"
                      />
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelNum4value}
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey="advertiseWithUsWhySidePanelNum4value"
                        className="font-semibold text-right pr-4 border-r border-[#555]"
                      />
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelNum4Text}
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey="advertiseWithUsWhySidePanelNum4Text"
                        className="pl-4"
                      />
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelNum5value}
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey="advertiseWithUsWhySidePanelNum5value"
                        className="font-semibold text-right pr-4 border-r border-[#555]"
                      />
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelNum5Text}
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey="advertiseWithUsWhySidePanelNum5Text"
                        className="pl-4"
                      />
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelNu65value}
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey="advertiseWithUsWhySidePanelNum6value"
                        className="font-semibold text-right pr-4 border-r border-[#555]"
                      />
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.ADVERTISE_WITH_US_PAGE?.advertiseWithUsWhySidePanelNum6Text}
                        type="ADVERTISE_WITH_US_PAGE"
                        textBlockKey="advertiseWithUsWhySidePanelNum6Text"
                        className="pl-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        )}
      </section>
    </>
  )
}

export default AdvertiseWithUs
