'use server'

import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'
import { revalidateTag } from 'next/cache'

interface SecondaryButton {
  text: string
  link: string
  linkType: string
  backgroundColor: string
  fontColor: string
}

interface UpdateHeaderButtonInput {
  animation?: string
  backgroundColor?: string
  fontColor?: string
  text?: string
  linkType?: string
  link?: string
  type?: string
  dropdownItems?: any[]
  secondaryButton?: SecondaryButton
}

export async function updateHeaderButton(buttonId: string, data: UpdateHeaderButtonInput) {
  try {
    if (!buttonId) {
      throw new Error('Button ID is required')
    }

    // Verify button exists
    const existingButton = await prisma.headerButton.findUnique({
      where: { id: buttonId }
    })

    if (!existingButton) {
      throw new Error('Button not found')
    }

    // Validate secondary button if type is being changed to double
    if (data.type === 'double' && !data.secondaryButton) {
      throw new Error('Secondary button is required for double button type')
    }

    const updateData: any = {}

    if (data.animation) updateData.animation = data.animation
    if (data.backgroundColor) updateData.backgroundColor = data.backgroundColor
    if (data.fontColor) updateData.fontColor = data.fontColor
    if (data.text) updateData.text = data.text
    if (data.linkType) updateData.linkType = data.linkType
    if (data.link) updateData.link = data.link
    if (data.type) updateData.type = data.type
    if (data.dropdownItems) updateData.dropdownItems = data.dropdownItems
    if (data.secondaryButton) updateData.secondaryButton = data.secondaryButton

    const button = await prisma.headerButton.update({
      where: { id: buttonId },
      data: updateData
    })

    await createLog('info', 'Header button updated successfully', {
      buttonId: button.id,
      updatedFields: Object.keys(updateData),
      type: button.type
    })

    revalidateTag('Header-Button', 'default')
    return { success: true, button }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update header button'

    await createLog('error', 'Failed to update header button', {
      error: errorMessage,
      buttonId,
      attemptedType: data.type
    })

    throw new Error(errorMessage)
  }
}
