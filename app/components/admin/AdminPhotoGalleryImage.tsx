import AdminCheckbox from '@/app/forms/elements/AdminCheckbox'
import React, { FC, useState } from 'react'
import Picture from '../common/Picture'
import AwesomeIcon from '../common/AwesomeIcon'
import { trashIcon } from '@/app/lib/icons'
import Spinner from '../common/Spinner'
import { PhotoGalleryImageProps, resetPhotoGalleryImage } from '@/app/redux/features/photoGalleryImageSlice'
import {
  useDeletePhotoGalleryImageMutation,
  useUpdatePhotoGalleryImageMutation
} from '@/app/redux/services/photoGalleryImageApi'
import { useAppDispatch } from '@/app/redux/store'
import { decreasePhotoGalleryImageCount } from '@/app/redux/features/appSlice'

const AdminPhotoGalleryImage: FC<{ photoGalleryImage: PhotoGalleryImageProps }> = ({ photoGalleryImage }) => {
  const dispatch = useAppDispatch()
  const [deletePhotoGalleryImage] = useDeletePhotoGalleryImageMutation()
  const [updatePhotoGalleryImage] = useUpdatePhotoGalleryImageMutation()
  const [loadingDelete, setLoadingDelete] = useState<Record<string, boolean>>({})
  const [loadingUpdate, setLoadingUpdate] = useState<Record<string, boolean>>({})

  const handleDeletePhotoGalleryImage = async (photoGalleryImage: PhotoGalleryImageProps) => {
    setLoadingDelete((prev: any) => ({ ...prev, [photoGalleryImage.id]: true }))

    try {
      await deletePhotoGalleryImage({
        id: photoGalleryImage.id,
        imageFilename: photoGalleryImage.imageFilename
      }).unwrap()

      dispatch(resetPhotoGalleryImage())
      dispatch(decreasePhotoGalleryImageCount())
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
          colors={{
            bg: 'bg-amber-500',
            text: 'text-amber-500',
            border: 'border-amber-500',
            fill: 'fill-amber-500'
          }}
        />
      </div>
      <Picture src={photoGalleryImage.imageUrl} className="w-full h-full object-contain" priority={true} />
    </div>
  )
}

export default AdminPhotoGalleryImage
