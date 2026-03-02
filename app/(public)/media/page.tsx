import { getPhotoGalleryImages } from '@/app/actions/getPhotoGalleryImages'
import { MediaClient } from '../../components/pages/MediaClient'

export default async function MediaPage() {
  const photoGalleryImages = await getPhotoGalleryImages()
  return <MediaClient photoGalleryImages={photoGalleryImages} />
}
