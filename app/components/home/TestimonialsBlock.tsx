'use client'

import { RootState, useAppSelector } from '@/app/redux/store'
import React from 'react'
import TestimonialCarousel from './TestimonialCarousel'
import DiamondElement from '../common/DiamondElement'
import { quoteLeftIcon } from '@/app/lib/icons'

const TestimonialsBlock = () => {
  const { testimonials } = useAppSelector((state: RootState) => state.testimonial)

  return (
    <div className="bg-charcoalblue px-3 py-36 min-h-[657px]">
      <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative flex flex-col justify-center items-center h-full">
        <div className="mb-20">
          <DiamondElement className="w-20 h-20" fa={quoteLeftIcon} iconSize="w-12 h-12" />
        </div>
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </div>
  )
}

export default TestimonialsBlock
