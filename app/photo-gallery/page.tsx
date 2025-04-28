'use client'

import React, { useState } from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import { RootState, useAppSelector } from '../redux/store'
import Spinner from '../components/common/Spinner'
import { PhotoGalleryImageProps } from '../redux/features/photoGalleryImageSlice'
import Picture from '../components/common/Picture'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { chevronLeftIcon, chevronRightIcon, timesIcon } from '../lib/icons'

const PhotoGallery = () => {
  const { photoGalleryImages } = useAppSelector((state: RootState) => state.photoGalleryImage) as {
    photoGalleryImages: PhotoGalleryImageProps[]
  }
  const { loading } = useAppSelector((state: RootState) => state.app)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? photoGalleryImages.length - 1 : prevIndex - 1))
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === photoGalleryImages.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="relative">
      <Breadcrumb breadcrumb="Photo Gallery" />
      <section className="px-4 990:px-12 xl:px-4">
        <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto pt-32 pb-44">
          {loading ? (
            <Spinner fill="fill-blaze" track="text-inkblack" wAndH="w-10 h-10" />
          ) : (
            <div className="grid grid-cols-12 gap-y-12 760:gap-x-12">
              {photoGalleryImages?.map((photoGalleryImage: PhotoGalleryImageProps, index) => (
                <div
                  key={photoGalleryImage.id}
                  className="col-span-12 990:col-span-6 1200:col-span-4 w-full h-full overflow-hidden cursor-pointer group"
                >
                  <Picture
                    onClick={() => openLightbox(index)}
                    src={photoGalleryImage.imageUrl}
                    className="w-full h-full aspect-[3/2.2] object-cover group-hover:scale-110 duration-1000"
                    priority={false}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 w-full h-full">
          <div className="w-full h-full flex justify-center">
            <button className="absolute top-0 right-0 text-2xl p-4 z-10 group" onClick={closeLightbox}>
              <AwesomeIcon
                icon={timesIcon}
                className="w-10 h-10 group-hover:text-blaze group-hover:rotate-90 duration-300"
              />
            </button>
            <div className="relative">
              <Picture
                src={photoGalleryImages[currentImageIndex]?.imageUrl}
                alt={`Gallery Image ${currentImageIndex}`}
                className="w-full h-full object-contain"
                priority={false}
              />

              <button className="fixed left-4 top-1/2 transform -translate-y-1/2 text-3xl group" onClick={prevImage}>
                <AwesomeIcon icon={chevronLeftIcon} className="w-10 h-10 group-hover:text-blaze duration-300" />
              </button>
              <button className="fixed right-4 top-1/2 transform -translate-y-1/2 text-3xl group" onClick={nextImage}>
                <AwesomeIcon icon={chevronRightIcon} className="w-10 h-10 group-hover:text-blaze duration-300" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoGallery
