'use client'

import { FC } from 'react'
import Picture from './Picture'
import { useImageCarousel } from '@/app/hooks/useImageCarousel'
import AwesomeIcon from './AwesomeIcon'
import { calendarIcon, chevronLeftIcon, chevronRightIcon, linkIcon } from '@/app/lib/icons'
import DiamondElement from './DiamondElement'
import Link from 'next/link'

interface CarouselItem {
  imageUrl: string
  name: string
}

const ImageCarousel: FC<{ items: CarouselItem[]; changeColor?: boolean }> = ({ items, changeColor = false }) => {
  const { visibleItems, next, prev, currentIndex, maxIndex } = useImageCarousel(items)

  return (
    <div className="relative w-full">
      <div className="flex overflow-hidden gap-2 justify-center">
        {visibleItems.map((item, i) => (
          <div key={i} className="w-1/4 relative group flex flex-col items-center justify-center">
            <div className="relative">
              <Picture
                src={item.imageUrl}
                alt={`carousel-${i}`}
                className="w-full h-auto object-cover aspect-square"
                priority={false}
              />
              {changeColor && (
                <div
                  className={`absolute inset-0 ${
                    i % 2 === 0 ? 'bg-sunburst/30' : 'bg-blaze/30'
                  } pointer-events-none group-hover:bg-transparent duration-500 aspect-square`}
                />
              )}
              <Link
                href={`/concerts/${item.id}`}
                className="duration-500 absolute left-1/2 -translate-x-1/2 group-hover:-translate-y-1/2 group-hover:top-1/2 -top-40"
              >
                <DiamondElement color="bg-blaze" className="w-16 h-16" fa={linkIcon} iconSize="w-8 h-8" />
              </Link>
            </div>
            <div className="bg-[#f8f8f8] group-hover:bg-blaze p-6 w-full flex flex-col justify-center duration-500">
              <h1 className="text-2xl font-oswald pb-3.5 border-b-1 border-b-black/10 w-full my-2.5 text-center font-light group-hover:text-white group-hover:border-b-white/20 duration-500">
                {item.name}
              </h1>
              <div className="flex items-center justify-center gap-x-2">
                <AwesomeIcon icon={calendarIcon} className="text-blaze w-4 h-4 group-hover:text-white duration-500" />
                <div className="font-raleway flex gap-x-1 items-center">
                  {item.eventDetails.map((detail: any, j: number, arr: any) => (
                    <h2 key={j} className="group-hover:text-white duration-500">
                      {detail.date.split(',')[0]}
                      {`${j < arr.length - 1 ? ',' : ''}`}
                    </h2>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-6">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="text-white bg-blaze w-10 h-10 flex items-center justify-center rounded-full p-2 disabled:opacity-30"
        >
          <AwesomeIcon icon={chevronLeftIcon} className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          disabled={currentIndex === maxIndex}
          className="text-white bg-blaze w-10 h-10 flex items-center justify-center rounded-full p-2 disabled:opacity-30"
        >
          <AwesomeIcon icon={chevronRightIcon} className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default ImageCarousel
