'use client'

import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import AwesomeIcon from '@/app/components/common/AwesomeIcon'
import Picture from '@/app/components/common/Picture'
import Spinner from '@/app/components/common/Spinner'
import ToastMessage from '@/app/components/common/ToastMessage'
import AdminCheckbox from '@/app/forms/elements/AdminCheckbox'
import { plusIcon, trashIcon } from '@/app/lib/icons'
import { setPhotoGalleryImageCount } from '@/app/redux/features/appSlice'
import { createFormActions } from '@/app/redux/features/formSlice'
import {
  PhotoGalleryImageProps,
  resetPhotoGalleryImage,
  resetPhotoGalleryImageError
} from '@/app/redux/features/photoGalleryImageSlice'
import {
  useCreatePhotoGalleryImageMutation,
  useDeletePhotoGalleryImageMutation,
  useFetchPhotoGalleryImagesQuery,
  useUpdatePhotoGalleryImageMutation
} from '@/app/redux/services/photoGalleryImageApi'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import uploadFileToFirebase from '@/app/utils/uploadFileToFirebase'
import React, { ChangeEvent, useRef, useState } from 'react'

const PhotoGallery = () => {
  const { photoGalleryImages, error } = useAppSelector((state: RootState) => state.photoGalleryImage)
  const { loading: loadingPhotoGalleryImages, photoGalleryImagesCount } = useAppSelector(
    (state: RootState) => state.app
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const { handleUploadProgress } = createFormActions('photoGallery', dispatch)
  const [createPhotoGalleryImage] = useCreatePhotoGalleryImageMutation()
  const [loading, setLoading] = useState(false)
  const [deletePhotoGalleryImage] = useDeletePhotoGalleryImageMutation()
  const [loadingDelete, setLoadingDelete] = useState<Record<string, boolean>>({})
  const [loadingUpdate, setLoadingUpdate] = useState<Record<string, boolean>>({})
  const { success } = useAppSelector((state: RootState) => state.photoGalleryImage)
  useFetchPhotoGalleryImagesQuery(undefined, { skip: !success })
  const [updatePhotoGalleryImage] = useUpdatePhotoGalleryImageMutation()

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
        dispatch(setPhotoGalleryImageCount(photoGalleryImagesCount + 1))
      }
    } catch {
    } finally {
      setLoading(false)
      event.target.value = '' // allow reselecting the same file(s)
    }
  }

  const handleDeletePhotoGalleryImage = async (photoGalleryImage: PhotoGalleryImageProps) => {
    setLoadingDelete((prev: any) => ({ ...prev, [photoGalleryImage.id]: true }))

    try {
      await deletePhotoGalleryImage({
        id: photoGalleryImage.id,
        imageFilename: photoGalleryImage.imageFilename
      }).unwrap()

      dispatch(resetPhotoGalleryImage())
      dispatch(setPhotoGalleryImageCount(photoGalleryImagesCount - 1))
    } catch {}

    setLoadingDelete((prev: any) => ({ ...prev, [photoGalleryImage.id]: false }))
  }

  const handleUpdatePhotoGalleryImage = async (e: any, photoGalleryImageId: string) => {
    e.preventDefault()
    setLoadingUpdate((prev: any) => ({ ...prev, [photoGalleryImageId]: true }))

    try {
      await updatePhotoGalleryImage({ id: photoGalleryImageId, isHomeHero: e.target.checked }).unwrap()
    } catch {}

    setLoadingUpdate((prev: any) => ({ ...prev, [photoGalleryImageId]: false }))
  }

  return (
    <div className="relative">
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
      ) : (
        <div className="grid grid-cols-12 gap-3">
          {photoGalleryImages?.map((photoGalleryImage: PhotoGalleryImageProps) => (
            <div
              key={photoGalleryImage.id}
              className="col-span-4 760:col-span-3 1400:col-span-2 1690:col-span-2 2300:col-span-2 2800:col-span-1 aspect-square bg-midnightblack p-3 relative"
            >
              {loadingDelete[photoGalleryImage.id] ? (
                <div className="absolute top-2 right-2">
                  <Spinner fill="fill-blaze" track="text-midnightblack" />
                </div>
              ) : (
                <AwesomeIcon
                  onClick={() => handleDeletePhotoGalleryImage(photoGalleryImage)}
                  icon={trashIcon}
                  className="w-4 h-4 text-blaze absolute top-2 right-2 cursor-pointer"
                />
              )}

              <div className="absolute bottom-2 right-2">
                <AdminCheckbox
                  handleToggle={(e: any) => handleUpdatePhotoGalleryImage(e, photoGalleryImage.id)}
                  isLoading={loadingUpdate[photoGalleryImage.id]}
                  label="Add to home hero"
                  name="isHomeHero"
                  value={photoGalleryImage.isHomeHero}
                  colors={{ bg: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-500' }}
                />
              </div>

              <Picture src={photoGalleryImage.imageUrl} className="w-full h-full object-contain" priority={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PhotoGallery
