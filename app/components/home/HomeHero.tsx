import React, { FC } from 'react'
import HomeHeroCarousel from './HomeHeroCarousel'
import { RootState, useAppSelector } from '@/app/redux/store'
import EditableTextArea from '../common/EditableTextArea'

const HomeHero: FC<{ handleScroll: () => void }> = ({ handleScroll }) => {
  const { photoGalleryImages } = useAppSelector((state: RootState) => state.photoGalleryImage)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { loading } = useAppSelector((state: RootState) => state.app)
  const filteredImages = photoGalleryImages?.filter((item: { isHomeHero: boolean }) => item.isHomeHero)

  return (
    <div className="relative h-dvh w-full mt-[-209px]">
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
                className="text-[26px] 430:text-[36px] 576:text-[47px] 760:text-[52px] 990:text-[73px] 1200:text-[99px] font-bold font-lato leading-tight text-white"
              />
              <EditableTextArea
                tag="h1"
                initialValue={textBlockMap?.HOME_HERO_BLOCK?.homeHeroBlockTitle2}
                type="HOME_HERO_BLOCK"
                textBlockKey="homeHeroBlockTitle2"
                className="text-12 576:text-[21px] 760:text-[24px] 990:text-[31px] 1200:text-[45px] font-medium font-lato leading-tight text-white mb-12"
              />
              <button
                onClick={handleScroll}
                className="bg-blaze font-changa uppercase whitespace-nowrap rounded-sm text-12 font-bold tracking-widest hover:bg-blazehover duration-300 px-8 py-4"
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
