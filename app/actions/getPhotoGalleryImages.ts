import prisma from '@/prisma/client'

export const getPhotoGalleryImages = async () => {
  try {
    const images = await prisma.photoGalleryImage.findMany({
      orderBy: [{ createdAt: 'asc' }]
    })

    return images
  } catch {
    return {
      images: [],
      count: 0
    }
  }
}
