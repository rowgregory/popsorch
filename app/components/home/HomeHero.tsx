import React from 'react'
import HomeHeroCarousel from './HomeHeroCarousel'
import { RootState, useAppSelector } from '@/app/redux/store'
import Spinner from '../common/Spinner'

const HomeHero = () => {
  const { photoGalleryImages } = useAppSelector((state: RootState) => state.photoGalleryImage)
  const { loading } = useAppSelector((state: RootState) => state.app)
  const filteredImages = photoGalleryImages?.filter((item: { isHomeHero: boolean }) => item.isHomeHero)

  return (
    <div className="relative h-[1000px] w-full mt-[-160px]">
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner wAndH="w-16 h-16" fill="fill-blaze" track="text-inkblack" />
        </div>
      ) : (
        <>
          <div className="absolute top-0 left-0 bottom-0 right-0 z-30 bg-black/70 w-full h-[1000px]"></div>
          <HomeHeroCarousel images={filteredImages} interval={5000} />
        </>
      )}
    </div>
  )
}

export default HomeHero
