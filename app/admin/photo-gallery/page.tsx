'use client'

import AdminPhotoGalleryImage from '@/app/components/admin/AdminPhotoGalleryImage'
import { PhotoGalleryImageProps } from '@/app/redux/features/photoGalleryImageSlice'
import EmptyState from '@/app/components/common/EmptyState'

const PhotoGallery = ({ photoGalleryImages }) => {
  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {photoGalleryImages?.map((photoGalleryImage: PhotoGalleryImageProps) => (
            <AdminPhotoGalleryImage key={photoGalleryImage.id} photoGalleryImage={photoGalleryImage} />
          ))}
        </div>
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
    </>
  )
}

export default PhotoGallery
