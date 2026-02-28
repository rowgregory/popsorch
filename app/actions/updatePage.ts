'use server'

import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'

interface UpdatePageInput {
  content?: Record<string, any>
}

export async function updatePage(pageSlug: string, data: UpdatePageInput) {
  try {
    if (!pageSlug) {
      throw new Error('Page slug is required')
    }

    // Check if page exists
    const existingPage = await prisma.page.findUnique({
      where: { slug: pageSlug }
    })

    if (!existingPage) {
      throw new Error(`Page with slug "${pageSlug}" not found`)
    }

    await createLog('info', 'Starting page update', { slug: pageSlug })

    const updateData: any = {}

    if (data.content && typeof data.content === 'object') {
      updateData.content = data.content
    }

    const page = await prisma.page.update({
      where: { slug: pageSlug },
      data: updateData
    })

    await createLog('info', 'Page updated successfully', {
      pageId: page.id,
      slug: page.slug,
      updatedFields: Object.keys(updateData)
    })

    return { success: true, page }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update page'

    await createLog('error', 'Failed to update page', {
      error: errorMessage,
      slug: pageSlug
    })

    throw new Error(errorMessage)
  }
}
