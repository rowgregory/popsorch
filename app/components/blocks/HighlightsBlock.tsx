'use client'

import React from 'react'
import AnimatedSectionHeader from '../common/AnimatedSectionHeader'
import H1 from '../svg/H1'
import H2 from '../svg/H2'
import H5 from '../svg/H5'
import H3 from '../svg/H3'
import H4 from '../svg/H4'
import useAnimatedSectionTitle from '@/app/hooks/useAnimatedSectionTitle'

const highlights = [
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
  },
  {
    title: 'Innovative Programming',
    description: 'Unique and diverse concerts tailored to every audience.',
    icon: <H5 />
  }
]

const HighlightsBlock = () => {
  const { ref, visible } = useAnimatedSectionTitle(0.2)

  return (
    <div className="px-4 pb-14 dark:pt-14 md:px-12 md:py-24">
      <div className="max-w-[516px] md:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative grid grid-cols-12 gap-y-16 576:gap-x-10">
        <div className="col-span-12">
          <AnimatedSectionHeader title="Highlights" />
          <div
            ref={ref}
            className={`transition-opacity duration-700 ${
              visible ? 'opacity-100' : 'opacity-0'
            } text-[60px] text-irongray dark:text-white font-bold mt-1`}
          >
            Key
          </div>
          <div className="flex flex-col 990:flex-row 990:items-start 990:justify-between w-full">
            <h3 className="text-[60px] font-bold text-blaze -mt-8">Features</h3>
            <p className="text-lg font-semibold text-slategray dark:text-slatemist 990:text-right 990:-mt-2 max-w-96">
              Discover The Pops Orchestra&apos;s unique offerings and unforgettable experiences.
            </p>
          </div>
        </div>
        <div className="col-span-12 grid grid-cols-12 gap-y-7 md:gap-8">
          {highlights.map((highlight, i) => (
            <div
              key={i}
              className="col-span-12 md:col-span-6 990:col-span-4 rounded-3xl border-2 border-silver dark:border-maestroshadow py-10 px-7 md:py-12 md:px-10 group"
            >
              {highlight.icon}
              <h1 className="mt-3 text-2xl font-bold text-irongray dark:text-silkfog duration-300 group-hover:text-blaze mb-5">
                {highlight.title}
              </h1>
              <h2 className="text-lg font-medium text-irongray dark:text-silkfog duration-300 group-hover:text-blaze">
                {highlight.description}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HighlightsBlock
