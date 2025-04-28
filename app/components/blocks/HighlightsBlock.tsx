import React, { JSX } from 'react'
import H1 from '../svg/H1'
import H2 from '../svg/H2'
import H3 from '../svg/H3'
import H4 from '../svg/H4'
import AwesomeIcon from '../common/AwesomeIcon'
import { chevronDownIcon } from '@/app/lib/icons'
import DiamondElement from '../common/DiamondElement'

const highlights: { title: string; description: string; icon: JSX.Element }[] = [
  {
    title: 'Award-Winning Musicians',
    description: 'Performances by top musicians from the local area.',
    icon: <H1 />
  },
  {
    title: 'Collaborations with Local Talent',
    description: "Partnering with Sarasota's finest musicians and artists.",
    icon: <H2 />
  },
  {
    title: 'Dynamic Concerts',
    description: 'Engaging performances blending classical and modern.',
    icon: <H3 />
  },
  {
    title: 'Community Outreach',
    description: 'Offering educational programs and performances for all.',
    icon: <H4 />
  }
]

const HighlightsBlock = () => {
  return (
    <>
      <div className="px-3 w-full mx-auto flex flex-col items-center justify-center bg-white py-32">
        <h1 className="font-bold font-oswald text-[56px] uppercase mb-5">Hightlights</h1>
        <p className="text-lg font-raleway py-10 border-t-1 border-t-gray-200 border-b-1 text-center text-[#565656] leading-relaxed mb-10">
          Discover The Pops Orchestra&apos;s unique offerings and unforgettable experiences.
        </p>
        <div className="font-oswald text-[22px] mb-8">Check it Out</div>
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#ffcb94] rotate-45 -m-2 z-0"></div>
          <div className="absolute inset-0 bg-sunburst rotate-45 z-10"></div>
          <AwesomeIcon icon={chevronDownIcon} className="text-white w-5 h-5 absolute z-20" />
        </div>
      </div>
      <section
        className="relative h-[675px] w-full bg-cover flex items-center justify-center"
        style={{ backgroundImage: `url('/images/highlights-bg.png')`, backgroundAttachment: 'fixed' }}
      >
        <div className="relative z-1 flex items-center px-3">
          <div className="grid grid-cols-12 gap-y-6 990:gap-6 relative max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full">
            {highlights.map((highlight, i) => (
              <div
                key={i}
                className="col-span-12 990:col-span-3 bg-white/80 hover:bg-white duration-150 p-4 w-full h-full flex flex-col items-center justify-center relative pb-10 group"
              >
                <div className="absolute left-1/2 -translate-x-1/2 -top-10">
                  <DiamondElement
                    color="bg-blaze group-hover:bg-sunburst"
                    className="w-20 h-20"
                    icon={highlight.icon}
                  />
                </div>
                <h1 className="text-[22px] font-oswald text-[#273034] pt-16 mb-4">{highlight.title}</h1>
                <p className="font-raleway text-center leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HighlightsBlock
