'use client'

import AdminPhotoGalleryImage from '@/app/components/admin/AdminPhotoGalleryImage'
import { PhotoGalleryImageProps } from '@/app/redux/features/photoGalleryImageSlice'
import EmptyState from '@/app/components/common/EmptyState'
import { motion } from 'framer-motion'

const PhotoGallery = ({ photoGalleryImages }) => {
  return (
    <div className="h-[calc(100vh-66px)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-br from-neutral-900 to-neutral-950 border-b border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Photo Gallery</h1>
              <p className="text-neutral-400 text-sm sm:text-base mt-1">Upload and manage photos across the site</p>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photoGalleryImages?.map((photoGalleryImage: PhotoGalleryImageProps) => (
            <AdminPhotoGalleryImage key={photoGalleryImage.id} photoGalleryImage={photoGalleryImage} />
          ))}
        </div>

        {/* Empty State (if no sponsors) */}
        {photoGalleryImages?.length === 0 && (
          <EmptyState
            searchQuery=""
            typeFilter="all"
            title="Photo Gallery Image"
            advice="Click the actions button to get started"
            func={() => {}}
            action=""
          />
        )}
      </div>
    </div>
  )
}

export default PhotoGallery
