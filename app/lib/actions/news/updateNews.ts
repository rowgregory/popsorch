'use server'

import { NewsInput } from '@/app/types/entities/news'
import { getActor } from '../user/getActor'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'

export async function updateNews(id: string, data: NewsInput) {
  if (!id) return { success: false, error: 'Article ID is required' }
  if (!data.title) return { success: false, error: 'Title is required' }

  const actor = await getActor()

  const article = await prisma.news
    .update({
      where: { id },
      data: {
        title: data.title,
        excerpt: data.excerpt ?? '',
        body: data.body ?? '',
        imageUrl: data.imageUrl ?? '',
        imageFilename: data.imageFilename ?? '',
        isPublished: data.isPublished ?? false,
        externalLink: data.externalLink ?? ''
      }
    })
    .catch(() => null)

  if (!article) return { success: false, error: 'Failed to update article' }

  await createLog('info', `News article "${article.title}" updated`, {
    articleId: article.id,
    updatedBy: actor
  }).catch(() => null)

  return { success: true, data: article }
}
