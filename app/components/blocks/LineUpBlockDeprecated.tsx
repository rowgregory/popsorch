'use client'

import React, { useEffect, useRef, useState } from 'react'
import AnimatedSectionHeader from '../common/AnimatedSectionHeader'
import useAnimatedSectionTitle from '@/app/hooks/useAnimatedSectionTitle'
import ChevronLeftSVG from '../svg/ChevronLeftSVG'
import ChevronRightSVG from '../svg/ChevronRightSVG'
import Link from 'next/link'
import RightArrowWCircleSVG from '../svg/RightArrowWCircleSVG'
import { motion } from 'framer-motion'
import Picture from '../common/Picture'

const LineUpBlockDeprecated = () => {
  const { ref, visible } = useAnimatedSectionTitle(0.2)
  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselItemRef = useRef<HTMLDivElement | null>(null)
  const lineUp = [
    { img: '/images/line-1.png', position: 'Violinist', name: 'John Smith' },
    { img: '/images/line-2.png', position: 'Conductor', name: 'Robyn Bell' },
    { img: '/images/line-3.png', position: 'Singer', name: 'Jane Johnson' }
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [carouselItemWidth, setCarouselItemWidth] = useState(248)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 430) {
        setWindowWidth(window.innerWidth)
        setIsMobile(true)
      } else {
        setWindowWidth(window.innerWidth)
        setIsMobile(false)
      }

      if (carouselItemRef.current) {
        setCarouselItemWidth(carouselItemRef.current.offsetWidth + 20)
      }
    }

    window.addEventListener('resize', handleResize)

    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const moveToSlide = (direction: 'prev' | 'next') => {
    setCurrentIndex((prevIndex) => {
      if (direction === 'next') {
        return prevIndex === lineUp?.length - 1 ? 0 : prevIndex + 1
      } else {
        return prevIndex === 0 ? lineUp?.length - 1 : prevIndex - 1
      }
    })
  }

  const isLastSlide = currentIndex === lineUp?.length - (isMobile ? 1 : 2)
  const isFirstSlide = currentIndex === 0

  return (
    <div className="bg-lavendermist dark:bg-shadowblue px-4 py-14 md:px-12 md:py-24">
      <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative grid grid-cols-12 gap-y-16 990:gap-x-16 items-end">
        <div className="col-span-12 990:col-span-4">
          <AnimatedSectionHeader title="Line-Up" />
          <div
            ref={ref}
            className={`opacity-0 transition-all ease-in-out duration-[1500ms] ${
              visible ? 'opacity-100' : 'opacity-0'
            } text-[47px] 430:text-[52px] 1200:text-[60px] font-bold mt-1 text-irongray dark:text-white`}
          >
            Featured
          </div>
          <h3 className="text-[47px] 430:text-[52px] 1200:text-[60px] font-bold text-blaze -mt-8">Performers</h3>
          <p className="text-lg text-slategray dark:text-slatemist font-medium 990:mt-6 leading-snug">
            Experience an electrifying mix of talent, from vocalists to musicians. Each performer brings passion,
            energy, and unforgettable artistry.
          </p>
          <Link href="/concerts" className="flex items-center gap-x-7 group mt-7 990:mt-16">
            <div className="text-lg text-gunmetal dark:text-gray-200 pb-1.5 border-b-gunmetal dark:border-b-gray-200 border-b-1 font-semibold group-hover:text-blaze group-hover:border-b-blaze duration-300">
              See More
            </div>
            <RightArrowWCircleSVG />
          </Link>
        </div>
        <div className="col-span-12 990:col-span-8 flex flex-col gap-y-10">
          <div className="relative w-full mx-auto overflow-hidden">
            <motion.div
              ref={carouselRef}
              className="flex gap-x-5 990:py-8 relative left-0"
              drag="x"
              dragConstraints={{ left: (lineUp?.length - 1) * -carouselItemWidth, right: 0 }}
              animate={{
                x: !isMobile ? -currentIndex * carouselItemWidth : -currentIndex * (windowWidth - 10)
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.5
              }}
            >
              {lineUp?.map(({ img, position, name }, i) => (
                <motion.div
                  ref={carouselItemRef}
                  key={i}
                  className="relative flex-shrink-0 group w-full 430:w-[calc(50%-10px)] 990:w-[calc(33.33%-20px)]"
                >
                  <Picture src={img} className="rounded-3xl w-full h-full aspect-[0.74] max-w-full" priority={false} />
                  <h1 className="font-bold text-2xl 1400:text-[34px] text-[#cbcdd8] absolute bottom-10 left-4 group-hover:-translate-y-5 duration-300 transform">
                    {name}
                  </h1>
                  <h2 className="1400:text-xl text-[#cbcdd8] absolute bottom-3 left-4 group-hover:-translate-y-5 duration-300 transform opacity-0 group-hover:opacity-100">
                    {position}
                  </h2>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center w-full">
            <div className="flex flex-1 items-center gap-x-3 mr-10">
              <ChevronLeftSVG
                onClick={() => (isFirstSlide ? () => {} : moveToSlide('prev'))}
                isFirstSlide={isFirstSlide}
              />
              <ChevronRightSVG
                onClick={() => (isLastSlide || windowWidth > 990 ? () => {} : moveToSlide('next'))}
                isLastSlide={isLastSlide || windowWidth > 990}
              />
            </div>
            <div className="relative w-full">
              <div className="w-full h-0.5 bg-[#dad8d9] dark:bg-white" />
              <div
                className={`${
                  windowWidth > 990 ? 'w-full' : isFirstSlide ? 'w-1/3' : isLastSlide ? 'w-full' : 'w-2/3'
                }  h-0.5 bg-blaze absolute top-0 left-0 duration-300 transform`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LineUpBlockDeprecated
