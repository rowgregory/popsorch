import prisma from '@/prisma/client'

export const getPhotoGalleryImages = async () => {
  const images = await prisma.photoGalleryImage
    .findMany({
      orderBy: { createdAt: 'desc' }
    })
    .catch(() => [])

  return images
}
