import React, { FC } from 'react'
import HomeHeroCarousel from './HomeHeroCarousel'
import { RootState, useAppSelector } from '@/app/redux/store'
import EditableTextArea from '../common/EditableTextArea'
import PopsLoader from '../PopsLoader'

const HomeHero: FC<{ handleScroll: () => void }> = ({ handleScroll }) => {
  const { photoGalleryImages } = useAppSelector((state: RootState) => state.photoGalleryImage)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { loading } = useAppSelector((state: RootState) => state.app)
  const filteredImages = photoGalleryImages?.filter((item: { isHomeHero: boolean }) => item.isHomeHero)

  return (
    <div className="relative h-screen min-h-[600px] max-h-[1000px] w-full mt-[-209px]">
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <PopsLoader size="sm" className="my-4" />
        </div>
      ) : (
        <>
          <div className="absolute inset-0 z-40 bg-black/40 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto text-center">
              <EditableTextArea
                tag="h1"
                initialValue={textBlockMap?.HOME_HERO_BLOCK?.homeHeroBlockTitle1}
                type="HOME_HERO_BLOCK"
                textBlockKey="homeHeroBlockTitle1"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-lato leading-tight text-white mb-2 sm:mb-4"
              />
              <EditableTextArea
                tag="h2"
                initialValue={textBlockMap?.HOME_HERO_BLOCK?.homeHeroBlockTitle2}
                type="HOME_HERO_BLOCK"
                textBlockKey="homeHeroBlockTitle2"
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-medium font-lato leading-relaxed text-white mb-8 sm:mb-10 lg:mb-12 opacity-90"
              />
              <button
                onClick={handleScroll}
                className="bg-blaze font-changa uppercase whitespace-nowrap rounded-lg text-xs sm:text-sm lg:text-base font-bold tracking-widest hover:bg-blazehover focus:outline-none focus:ring-2 focus:ring-blaze focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                See Concerts
              </button>
            </div>
          </div>
          <HomeHeroCarousel images={filteredImages} interval={5000} />
        </>
      )}
    </div>
  )
}

export default HomeHero
