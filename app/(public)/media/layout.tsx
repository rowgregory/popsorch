import { getPhotoGalleryImages } from '@/app/actions/getPhotoGalleryImages'
import Media from './page'

export default async function MediaLayout() {
  const photoGalleryImages = await getPhotoGalleryImages()
  return <Media photoGalleryImages={photoGalleryImages} />
}
