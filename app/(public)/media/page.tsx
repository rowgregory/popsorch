import { getPhotoGalleryImages } from '@/app/lib/actions/photo-gallery-image/getPhotoGalleryImages'
import { MediaClient } from '../../components/pages/MediaClient'

export default async function MediaPage() {
  const photoGalleryImages = await getPhotoGalleryImages()
  return <MediaClient photoGalleryImages={photoGalleryImages} />
}
