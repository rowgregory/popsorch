import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'

export const getPhotoGalleryImages = unstable_cache(
  async () => {
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
  },
  ['photoGalleryImages'],
  {
    tags: ['Photo-Gallery-Image']
  }
)
