'use client'

import AdminPhotoGalleryImage from '@/app/components/admin/AdminPhotoGalleryImage'
import { PhotoGalleryImageProps } from '@/app/redux/features/photoGalleryImageSlice'
import { usePhotoSelector } from '@/app/redux/store'
import EmptyState from '@/app/components/common/EmptyState'

const PhotoGallery = () => {
  const { noPhotoGalleryImages, photoGalleryImages } = usePhotoSelector()

  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
          {photoGalleryImages?.map((photoGalleryImage: PhotoGalleryImageProps) => (
            <AdminPhotoGalleryImage key={photoGalleryImage.id} photoGalleryImage={photoGalleryImage} />
          ))}
        </div>
      </div>
      {/* Empty State (if no sponsors) */}
      {noPhotoGalleryImages && (
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
