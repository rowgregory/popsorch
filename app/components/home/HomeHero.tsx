import React from 'react'
import HomeHeroCarousel from './HomeHeroCarousel'
import { RootState, useAppSelector } from '@/app/redux/store'
import EditableTextArea from '../common/EditableTextArea'
import Link from 'next/link'

const HomeHero = () => {
  const { photoGalleryImages } = useAppSelector((state: RootState) => state.photoGalleryImage)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { loading } = useAppSelector((state: RootState) => state.app)
  const filteredImages = photoGalleryImages?.filter((item: { isHomeHero: boolean }) => item.isHomeHero)

  return (
    <div className="relative h-dvh w-full mt-[-230px]">
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="jumping-dot" />
        </div>
      ) : (
        <>
          <div className="absolute inset-0 z-40 bg-black/40 w-full h-dvh flex items-center justify-center px-4 ">
            <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto">
              <EditableTextArea
                tag="h1"
                initialValue={textBlockMap?.HOME_HERO_BLOCK?.homeHeroBlockTitle1}
                type="HOME_HERO_BLOCK"
                textBlockKey="homeHeroBlockTitle1"
                className="text-[42px] 430:text-[50px] 576:text-[65px] 760:text-[90px] font-bold font-changa leading-tight text-white"
              />
              <EditableTextArea
                tag="h1"
                initialValue={textBlockMap?.HOME_HERO_BLOCK?.homeHeroBlockTitle2}
                type="HOME_HERO_BLOCK"
                textBlockKey="homeHeroBlockTitle2"
                className="text-19 430:text-[26px] 576:text-[32px] 760:text-[45px] font-medium font-changa leading-tight text-white mb-12"
              />
              <Link
                href="/concerts"
                className="bg-blaze font-changa uppercase whitespace-nowrap rounded-sm text-12 font-bold tracking-widest hover:bg-blazehover duration-300 px-8 py-4"
              >
                See Concerts
              </Link>
            </div>
          </div>
          <HomeHeroCarousel images={filteredImages} interval={5000} />
        </>
      )}
    </div>
  )
}

export default HomeHero
