'use server'

import prisma from '@/prisma/client'

export async function getFirstHeroImage() {
  return prisma.photoGalleryImage.findFirst({ where: { isHomeHero: true } }).catch(() => null)
}
