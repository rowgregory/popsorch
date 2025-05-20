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
                <div className="bg-duskgray p-7 430:p-14 font-medium leading-relaxed font-lato text-[#b2b2b2] flex flex-col">
                  <div className="max-w-4xl mx-auto border border-gray-300 p-4 rounded-lg">
                    <h2 className="text-xl font-bold text-center mb-4">
                      Advertising Rates — Rates apply for one full, regular season (8 concerts: 4 in Sarasota; 4 in
                      Bradenton)
                    </h2>
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12 990:col-span-6">
                        <div className="mb-4">
                          <h3 className="font-bold uppercase mb-2">Full Page</h3>
                          <div className="space-y-2">
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div>
                                  <span className="font-bold text-red-500">Outside Back Cover*</span>
                                  <span className="float-right font-bold">$1,250</span>
                                </div>
                                <div className="text-sm">4-color | 5.75&quot;w x 8.75&quot;h</div>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div>
                                  <span className="font-bold text-red-500">Inside Front Cover*</span>
                                  <span className="float-right font-bold">$1,000</span>
                                </div>
                                <div className="text-sm">4-color | 5.75&quot;w x 8.75&quot;h</div>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div>
                                  <span className="font-bold text-red-500">Inside Back Cover*</span>
                                  <span className="float-right font-bold">$1,000</span>
                                </div>
                                <div className="text-sm">4-color | 5.75&quot;w x 8.75&quot;h</div>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div>
                                  <span className="font-bold text-red-500">Regular*</span>
                                  <span className="float-right font-bold">$800</span>
                                </div>
                                <div className="text-sm">4-color | 4.5&quot;w x 7.5&quot;h</div>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div>
                                  <span className="font-bold text-red-500">Regular*</span>
                                  <span className="float-right font-bold">$750</span>
                                </div>
                                <div className="text-sm">B&W | 4.5&quot;w x 7.5&quot;h</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm">
                          <p>*4 complimentary season tickets</p>
                          <p>**4 complimentary single concert tickets</p>
                        </div>
                        <div className="my-4">
                          <h3 className="font-bold mb-2">Artwork specifications</h3>
                          <ul className="text-sm">
                            <li>• Submit in digital format as press quality PDF, EPS, TIFF or JPEG files</li>
                            <li>
                              • Minimum resolution should be 300 dpi{' '}
                              <span className="font-bold">AT THE ACTUAL SIZE</span>. This includes all placed images,
                              logo and photos.
                            </li>
                            <li>• Submit ads to info@thepopsorchestra.org</li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-span-12 990:col-span-6">
                        <div className="mb-4">
                          <h3 className="font-bold uppercase mb-2">1/2 Page</h3>
                          <div className="space-y-2">
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div>
                                  <span className="font-bold text-red-500">Horizontal**</span>
                                  <span className="float-right font-bold">$350</span>
                                </div>
                                <div className="text-sm">4-color | 4.5&quot;w x 3.625&quot;h</div>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div>
                                  <span className="font-bold text-red-500">Horizontal**</span>
                                  <span className="float-right font-bold">$300</span>
                                </div>
                                <div className="text-sm">B&W | 4.5&quot;w x 3.625&quot;h</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h3 className="font-bold uppercase mb-2">1/4 Page</h3>
                          <div className="space-y-2">
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div>
                                  <span className="font-bold text-red-500">Vertical</span>
                                  <span className="float-right font-bold">$200</span>
                                </div>
                                <div className="text-sm">4-color | 2.25&quot;w X 3.625&quot;h</div>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div>
                                  <span className="font-bold text-red-500">Vertical</span>
                                  <span className="float-right font-bold">$150</span>
                                </div>
                                <div className="text-sm">B&W | 2.25&quot;w X 3.625&quot;h</div>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div>
                                  <span className="font-bold text-red-500">Horizontal**</span>
                                  <span className="float-right font-bold">$200</span>
                                </div>
                                <div className="text-sm">4-color | 4.5&quot;w x 1.75&quot;h</div>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex-1">
                                <div>
                                  <span className="font-bold text-red-500">Horizontal**</span>
                                  <span className="float-right font-bold">$150</span>
                                </div>
                                <div className="text-sm">B&W | 4.5&quot;w x 1.75&quot;h</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      href="/pdf/advertising.pdf"
                      download="Pops 2025-26 Advertising Form.pdf"
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
