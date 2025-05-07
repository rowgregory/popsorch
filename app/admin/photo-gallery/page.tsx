'use client'

import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import AdminPhotoGalleryImage from '@/app/components/admin/AdminPhotoGalleryImage'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import AwesomeIcon from '@/app/components/common/AwesomeIcon'
import Spinner from '@/app/components/common/Spinner'
import ToastMessage from '@/app/components/common/ToastMessage'
import { plusIcon } from '@/app/lib/icons'
import { increasePhotoGalleryImageCount } from '@/app/redux/features/appSlice'
import { createFormActions } from '@/app/redux/features/formSlice'
import {
  PhotoGalleryImageProps,
  resetPhotoGalleryImage,
  resetPhotoGalleryImageError
} from '@/app/redux/features/photoGalleryImageSlice'
import { useCreatePhotoGalleryImageMutation } from '@/app/redux/services/photoGalleryImageApi'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import uploadFileToFirebase from '@/app/utils/uploadFileToFirebase'
import React, { ChangeEvent, useRef, useState } from 'react'

const PhotoGallery = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const { photoGalleryImages, error, photoGalleryImagesCount, noPhotoGalleryImages } = useAppSelector(
    (state: RootState) => state.photoGalleryImage
  )
  const { loading: loadingPhotoGalleryImages } = useAppSelector((state: RootState) => state.app)
  const { handleUploadProgress } = createFormActions('photoGallery', dispatch)
  const [createPhotoGalleryImage] = useCreatePhotoGalleryImageMutation()
  const [loading, setLoading] = useState(false)

  const handleUploadPhotoGalleryImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setLoading(true)

    const validFiles = Array.from(files).filter(
      (file) => file.type.startsWith('image/') && !file.type.startsWith('image/heic')
    )

    try {
      for (const file of validFiles) {
        const imageUrl = await uploadFileToFirebase(file, handleUploadProgress, 'image')

        await createPhotoGalleryImage({ imageUrl, imageFilename: file.name }).unwrap()

        dispatch(resetPhotoGalleryImage())
        dispatch(increasePhotoGalleryImageCount())
      }
    } catch {
    } finally {
      setLoading(false)
      event.target.value = '' // allow reselecting the same file(s)
    }
  }

  return (
    <>
      <ToastMessage message={error} resetError={() => resetPhotoGalleryImageError()} />
      <div className="flex gap-y-10 760:gap-y-0 flex-col 760:flex-row 760:items-center 760:justify-between mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal
          title="Photo Gallery"
          bgcolor="bg-amber-500"
          textcolor="text-yellow-400"
          total={photoGalleryImagesCount}
        />
        <button
          disabled={loading}
          onClick={() => inputRef.current && inputRef?.current.click()}
          className="bg-amber-500 group px-5 py-3 rounded-sm font-bold font-changa uppercase flex items-center justify-center gap-x-3 duration-300 focus:translate-y-0 active:translate-y-1 active:shadow-inner"
        >
          Create Photo Gallery Image
          {loading ? (
            <Spinner fill="fill-white" track="text-amber-500" wAndH="w-4 h-4" />
          ) : (
            <AwesomeIcon icon={plusIcon} className="w-4 h-4 group-hover:rotate-90 duration-700" />
          )}
        </button>
        <input
          id="imageUrl"
          name="imageUrl"
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleUploadPhotoGalleryImage}
        />
      </div>
      {loadingPhotoGalleryImages ? (
        <AdminPageSpinner fill="fill-amber-500" />
      ) : noPhotoGalleryImages ? (
        <div className="font-sm font-lato">No photo gallery images</div>
      ) : (
        <div className="grid grid-cols-12 gap-3">
          {photoGalleryImages?.map((photoGalleryImage: PhotoGalleryImageProps) => (
            <AdminPhotoGalleryImage key={photoGalleryImage.id} photoGalleryImage={photoGalleryImage} />
          ))}
        </div>
      )}
    </>
  )
}

export default PhotoGallery
