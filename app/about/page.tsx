'use client'

import Breadcrumb from '../components/common/Breadcrumb'
import Picture from '../components/common/Picture'
import { useTextBlockSelector } from '../redux/store'
import EditableTextArea from '../components/common/EditableTextArea'

const About = () => {
  const { textBlockMap } = useTextBlockSelector()

  return (
    <>
      <Breadcrumb breadcrumb="About The Pops" />
      <section className="px-4 990:px-12 xl:px-4">
        <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto grid grid-cols-12 990:gap-x-12 pt-32 pb-44">
          <div className="order-2 1200:order-1 col-span-12 1200:col-span-4 mb-12 1200:mb-0 flex flex-col gap-y-4 gap-x-2 w-full">
            <div className="bg-duskgray p-7 430:p-14">
              <EditableTextArea
                tag="h1"
                initialValue={textBlockMap?.ABOUT_PAGE?.aboutPageSidePanelTitle}
                type="ABOUT_PAGE"
                textBlockKey="aboutPageSidePanelTitle"
                className="font-changa text-2xl mb-5"
              />
              <EditableTextArea
                tag="p"
                initialValue={textBlockMap?.ABOUT_PAGE?.aboutPageSidePanelP1}
                type="ABOUT_PAGE"
                textBlockKey="aboutPageSidePanelP1"
                className="mb-4 text-white font-medium leading-relaxed font-lato"
              />
              <EditableTextArea
                tag="p"
                initialValue={textBlockMap?.ABOUT_PAGE?.aboutPageSidePanelP2}
                type="ABOUT_PAGE"
                textBlockKey="aboutPageSidePanelP2"
                className="text-white font-medium leading-relaxed font-lato mb-10"
              />
              <Picture
                src="/images/cc.png"
                className="w-full text-indigo-500 h-auto aspect-square object-contain"
                priority={false}
              />
            </div>
          </div>
          <div className="order-1 1200:order-2 col-span-12 1200:col-span-8 flex flex-col w-full">
            <Picture src="/images/about-1.jpg" className="w-full h-full aspect-video" priority={false} />
            <div className="bg-duskgray p-7 430:p-14 font-medium leading-relaxed font-lato text-white flex flex-col mb-20">
              <EditableTextArea
                tag="p"
                initialValue={textBlockMap?.ABOUT_PAGE?.aboutPageMainP1}
                type="ABOUT_PAGE"
                textBlockKey="aboutPageMainP1"
                className="mb-4"
              />
              <EditableTextArea
                tag="p"
                initialValue={textBlockMap?.ABOUT_PAGE?.aboutPageMainP2}
                type="ABOUT_PAGE"
                textBlockKey="aboutPageMainP2"
                className="mb-4"
              />
              <EditableTextArea
                tag="p"
                initialValue={textBlockMap?.ABOUT_PAGE?.aboutPageMainP3}
                type="ABOUT_PAGE"
                textBlockKey="aboutPageMainP3"
                className="mb-4"
              />
              <EditableTextArea
                tag="p"
                initialValue={textBlockMap?.ABOUT_PAGE?.aboutPageMainP4}
                type="ABOUT_PAGE"
                textBlockKey="aboutPageMainP4"
                className="mb-10"
              />
              <EditableTextArea
                tag="h3"
                initialValue={textBlockMap?.ABOUT_PAGE?.aboutPageMainLine1}
                type="ABOUT_PAGE"
                textBlockKey="aboutPageMainLine1"
                className="mb-2 font-changa text-12 font-medium tracking-wider text-sunburst uppercase"
              />
              <EditableTextArea
                tag="h3"
                initialValue={textBlockMap?.ABOUT_PAGE?.aboutPageMainLine2}
                type="ABOUT_PAGE"
                textBlockKey="aboutPageMainLine2"
                className="font-changa text-12 font-medium tracking-wider text-sunburst uppercase"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
