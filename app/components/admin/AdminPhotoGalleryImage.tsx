import React, { FC, useState } from 'react'
import Picture from '../common/Picture'
import Spinner from '../common/Spinner'
import {
  PhotoGalleryImageProps,
  removePhotoGalleryImageFromState,
  resetPhotoGalleryImage,
  updatePhotoGalleryImageInState
} from '@/app/redux/features/photoGalleryImageSlice'
import {
  useDeletePhotoGalleryImageMutation,
  useUpdatePhotoGalleryImageMutation
} from '@/app/redux/services/photoGalleryImageApi'
import { useAppDispatch } from '@/app/redux/store'
import { decreasePhotoGalleryImageCount } from '@/app/redux/features/appSlice'
import { Star, Trash } from 'lucide-react'
import { motion } from 'framer-motion'

const AdminPhotoGalleryImage: FC<{ photoGalleryImage: PhotoGalleryImageProps }> = ({ photoGalleryImage }) => {
  const dispatch = useAppDispatch()
  const [deletePhotoGalleryImage] = useDeletePhotoGalleryImageMutation()
  const [updatePhotoGalleryImage] = useUpdatePhotoGalleryImageMutation()
  const [loadingDelete, setLoadingDelete] = useState<Record<string, boolean>>({})
  const [loadingUpdate, setLoadingUpdate] = useState<Record<string, boolean>>({})

  const handleDeletePhotoGalleryImage = async (photoGalleryImage: PhotoGalleryImageProps) => {
    setLoadingDelete((prev: any) => ({ ...prev, [photoGalleryImage.id]: true }))

    try {
      const response = await deletePhotoGalleryImage({
        id: photoGalleryImage.id,
        imageFilename: photoGalleryImage.imageFilename
      }).unwrap()

      dispatch(removePhotoGalleryImageFromState(response.id))
      dispatch(resetPhotoGalleryImage())
      dispatch(decreasePhotoGalleryImageCount())
    } catch {}

    setLoadingDelete((prev: any) => ({ ...prev, [photoGalleryImage.id]: false }))
  }

  const handleUpdatePhotoGalleryImage = async (e: any, photoGalleryImageId: string) => {
    e.preventDefault()
    setLoadingUpdate((prev: any) => ({ ...prev, [photoGalleryImageId]: true }))

    try {
      const response = await updatePhotoGalleryImage({ id: photoGalleryImageId, isHomeHero: e.target.checked }).unwrap()
      dispatch(updatePhotoGalleryImageInState(response.photoGalleryImage))
    } catch {}

    setLoadingUpdate((prev: any) => ({ ...prev, [photoGalleryImageId]: false }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700/70 transition-all duration-300 shadow-xl"
    >
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden bg-neutral-950">
        <Picture
          src={photoGalleryImage.imageUrl}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          priority
          alt="Gallery image"
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Controls Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Right - Delete Button */}
        <div className="absolute top-3 right-3 pointer-events-auto">
          {loadingDelete[photoGalleryImage.id] ? (
            <div className="w-9 h-9 bg-neutral-900/90 backdrop-blur-sm rounded-lg flex items-center justify-center border border-neutral-700">
              <Spinner fill="fill-red-500" track="text-neutral-700" />
            </div>
          ) : (
            <button
              onClick={() => handleDeletePhotoGalleryImage(photoGalleryImage)}
              className="w-9 h-9 bg-neutral-900/90 backdrop-blur-sm hover:bg-red-500/20 border border-neutral-700 hover:border-red-500/50 rounded-lg flex items-center justify-center transition-all group/delete"
              title="Delete image"
            >
              <Trash className="w-4 h-4 text-neutral-400 group-hover/delete:text-red-500 transition-colors" />
            </button>
          )}
        </div>

        {/* Bottom - Hero Toggle */}
        <div className="absolute bottom-0 left-0 right-0 p-3 pointer-events-auto">
          <div className="bg-neutral-900/95 backdrop-blur-md border border-neutral-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    photoGalleryImage.isHomeHero ? 'bg-amber-500 animate-pulse' : 'bg-neutral-600'
                  }`}
                />
                <span className="text-xs font-medium text-neutral-300">
                  {photoGalleryImage.isHomeHero ? 'Featured on Home' : 'Add to Home Hero'}
                </span>
              </div>

              <motion.label
                className={`relative w-11 h-6 rounded-full transition-all cursor-pointer ${
                  photoGalleryImage.isHomeHero ? 'bg-amber-500' : 'bg-neutral-600'
                } ${loadingUpdate[photoGalleryImage.id] ? 'opacity-70 cursor-not-allowed' : ''}`}
                whileTap={{ scale: loadingUpdate[photoGalleryImage.id] ? 1 : 0.95 }}
              >
                <input
                  type="checkbox"
                  checked={photoGalleryImage.isHomeHero}
                  onChange={(e) => handleUpdatePhotoGalleryImage(e, photoGalleryImage.id)}
                  disabled={loadingUpdate[photoGalleryImage.id]}
                  className="sr-only"
                />
                <motion.div
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none"
                  animate={{ x: photoGalleryImage.isHomeHero ? 20 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {loadingUpdate[photoGalleryImage.id] && (
                    <div className="w-3 h-3 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                  )}
                </motion.div>
              </motion.label>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Badge - Top Left */}
      {photoGalleryImage.isHomeHero && (
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500/90 backdrop-blur-sm rounded-md flex items-center gap-1.5 border border-amber-400/50">
          <Star className="w-3.5 h-3.5 text-white fill-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Hero</span>
        </div>
      )}
    </motion.div>
  )
}

export default AdminPhotoGalleryImage
