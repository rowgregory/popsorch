'use server'

import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { getActor } from '../user/getActor'

export async function updatePageContent(pageId: string, content) {
  if (!pageId) return { success: false, error: 'Page ID is required' }
  if (!content?.length) return { success: false, error: 'Content is required' }

  const user = await getActor()

  const page = await prisma.page
    .update({
      where: { id: pageId },
      data: { content }
    })
    .catch(() => null)

  if (!page) return { success: false, error: 'Failed to save page content' }

  await createLog('info', `Page "${page.slug}" content updated`, {
    pageId: page.id,
    slug: page.slug,
    updatedBy: `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || user?.email || 'unknown'
  }).catch(() => null)

  return { success: true, data: page }
}
