'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { getUserId } from './getUserById'
import { createLog } from '../utils/logHelper'

interface CreatePageInput {
  slug: string
  content: Record<string, any>
}

export async function createPage(data: CreatePageInput) {
  try {
    if (!data.slug) {
      throw new Error('Page slug is required')
    }

    if (!data.content || typeof data.content !== 'object') {
      throw new Error('Page content is required')
    }

    const userId = await getUserId()

    if (!userId) {
      throw new Error('You must be authenticated to create a page')
    }

    // Check if page already exists
    const existingPage = await prisma.page.findUnique({
      where: { slug: data.slug }
    })

    if (existingPage) {
      throw new Error(`Page with slug "${data.slug}" already exists`)
    }

    await createLog('info', 'Starting page creation', { slug: data.slug })

    const page = await prisma.page.create({
      data: {
        slug: data.slug,
        content: data.content,
        createdBy: userId
      }
    })

    await createLog('info', 'Page created successfully', {
      pageId: page.id,
      slug: page.slug
    })

    revalidateTag('Page', 'default')
    return { success: true, page }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create page'

    await createLog('error', 'Failed to create page', {
      error: errorMessage,
      slug: data.slug
    })

    throw new Error(errorMessage)
  }
}
