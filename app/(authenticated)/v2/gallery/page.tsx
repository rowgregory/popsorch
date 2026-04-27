import GalleryClient from '@/app/components/v2/pages/GalleryClient'
import prisma from '@/prisma/client'

export default async function GalleryPage() {
  const photos = await prisma.photoGalleryImage
    .findMany({
      orderBy: { createdAt: 'desc' }
    })
    .catch(() => [])

  return <GalleryClient photos={photos} />
}
