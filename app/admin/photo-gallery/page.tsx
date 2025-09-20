'use client'

import React from 'react'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import AdminPhotoGalleryImage from '@/app/components/admin/AdminPhotoGalleryImage'
import { PhotoGalleryImageProps } from '@/app/redux/features/photoGalleryImageSlice'
import { RootState, useAppSelector, usePhotoSelector } from '@/app/redux/store'
import { useFetchPhotoGalleryImagesQuery } from '@/app/redux/services/photoGalleryImageApi'

const PhotoGallery = () => {
  const { noPhotoGalleryImages } = usePhotoSelector()
  const { loading: loadingPhotoGalleryImages } = useAppSelector((state: RootState) => state.app)
  const { data } = useFetchPhotoGalleryImagesQuery(undefined) as any

  return (
    <>
      <div className="p-6">
        {loadingPhotoGalleryImages ? (
          <AdminPageSpinner fill="fill-amber-500" />
        ) : noPhotoGalleryImages ? (
          <div className="font-sm font-lato">No photo gallery images</div>
        ) : (
          <div className="grid grid-cols-12 gap-3">
            {data?.photoGalleryImages?.map((photoGalleryImage: PhotoGalleryImageProps) => (
              <AdminPhotoGalleryImage key={photoGalleryImage.id} photoGalleryImage={photoGalleryImage} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default PhotoGallery
