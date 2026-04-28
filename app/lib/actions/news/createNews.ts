'use server'

import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { getActor } from '../user/getActor'
import { NewsInput } from '@/app/types/entities/news'

export async function createNews(data: NewsInput) {
  if (!data.title) return { success: false, error: 'Title is required' }

  const actor = await getActor()

  const article = await prisma.news
    .create({
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

  if (!article) return { success: false, error: 'Failed to create article' }

  await createLog('info', `News article "${article.title}" created`, {
    articleId: article.id,
    createdBy: actor
  }).catch(() => null)

  return { success: true, data: article }
}
