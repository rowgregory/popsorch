'use client'

import Breadcrumb from '../components/common/Breadcrumb'
import { useTextBlockSelector } from '../redux/store'
import TitleWithLine from '../components/common/TitleWithLine'
import EditableTextArea from '../components/common/EditableTextArea'
import Picture from '../components/common/Picture'
import { ArrowRight, Heart } from 'lucide-react'

const StudentPerformers = () => {
  const { textBlockMap } = useTextBlockSelector()

  return (
    <>
      <Breadcrumb breadcrumb="Student Performers" />
      <div className="px-4 990:px-12 xl:px-4 py-40 relative">
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url('/images/bio-bg.png')`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div
          className={`max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full grid grid-cols-12 gap-y-12 990:gap-x-20 items-center relative z-10`}
        >
          <div className="col-span-12 1200:col-span-6 flex flex-col items-center 1200:items-start">
            <TitleWithLine
              title={textBlockMap?.STUDENT_PERFORMERS_PAGE?.studentPerformersPageTitle}
              type="STUDENT_PERFORMERS_PAGE"
              textBlockKey="studentPerformersPageTitle"
            />
            <EditableTextArea
              tag="p"
              initialValue={textBlockMap?.STUDENT_PERFORMERS_PAGE?.studentPerformersP1}
              type="STUDENT_PERFORMERS_PAGE"
              textBlockKey="studentPerformersP1"
              className="font-lato text-[#cacaca] mb-5 text-center 1200:text-left mt-12"
            />
            <div className="w-full flex justify-center 1200:justify-start mt-6 items-center">
              <a
                href="https://ci.ovationtix.com/35505/store/donations/55596"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blaze to-sunburst hover:from-sunburst hover:to-blaze text-white px-10 py-5 rounded-xl font-bold text-sm uppercase tracking-widest shadow-2xl hover:shadow-blaze/50 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />

                {/* Icon */}
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />

                {/* Text */}
                <span className="relative z-10">Make Your Donation</span>

                {/* Arrow */}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blaze/50 to-sunburst/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </a>
            </div>
          </div>
          <div className="mt-20 1200:mt-0 col-span-12 1200:col-span-6 flex justify-center">
            <div className="relative before:absolute before:content-[''] before:w-full before:h-full before:border-4 before:border-blaze before:rounded-md before:z-[-1] before:-top-2 430:before:-top-10 left-0 before:max-w-[450px] max-w-[450px] h-full max-h-[700px]">
              <Picture
                src="/images/edu-1.jpg"
                className="w-full h-fit object-contain ml-0 430:ml-12"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentPerformers
