import { getPhotoGalleryImages } from '@/app/actions/getPhotoGalleryImages'
import PhotoGallery from './page'

export default async function PhotoGalleryLayout() {
  const photoGalleryImages = await getPhotoGalleryImages()

  return <PhotoGallery photoGalleryImages={photoGalleryImages} />
}
