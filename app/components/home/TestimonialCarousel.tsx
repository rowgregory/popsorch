'use client'

import { FC, useEffect, useState } from 'react'

interface Testimonial {
  name: string
  review: string
}

const fadeDuration = 500

const TestimonialCarousel: FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
        setFade(true)
      }, fadeDuration)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <div
        className={`transition-opacity min-h-[141px] duration-500 flex flex-col justify-center items-center ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-xl text-white mb-2 font-raleway">{testimonials[activeIndex]?.review}</p>
        <div className="bg-sunburst w-full h-1 max-w-60 my-5" />
        {testimonials[activeIndex]?.name && (
          <p className="text-[22px] font-bold text-white">{testimonials[activeIndex]?.name}</p>
        )}
      </div>
      <div className="flex gap-2 absolute z-20 -bottom-20 left-1/2 -translate-x-1/2">
        {testimonials.map((_, i) => (
          <div
            onClick={() => setActiveIndex(i)}
            key={i}
            className={`w-5 h-5 rounded-full transition-colors duration-300 cursor-pointer ${
              i === activeIndex ? 'bg-sunburst' : 'bg-sunburst/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default TestimonialCarousel
