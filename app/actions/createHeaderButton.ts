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

interface CreateHeaderButtonInput {
  animation?: string
  backgroundColor: string
  fontColor: string
  text?: string
  linkType?: string
  link: string
  type?: string // "button" | "dropdown" | "double"
  dropdownItems?: any[]
  secondaryButton?: SecondaryButton
}

export async function createHeaderButton(data: CreateHeaderButtonInput) {
  try {
    if (!data.backgroundColor) {
      throw new Error('Background color is required')
    }

    if (!data.fontColor) {
      throw new Error('Font color is required')
    }

    if (!data.link) {
      throw new Error('Link is required')
    }

    // Validate secondary button for double type
    if (data.type === 'double') {
      if (!data.secondaryButton) {
        throw new Error('Secondary button is required for double button type')
      }
      if (!data.secondaryButton.text) {
        throw new Error('Secondary button text is required')
      }
      if (!data.secondaryButton.link) {
        throw new Error('Secondary button link is required')
      }
    }

    // Validate dropdown items
    if (data.type === 'dropdown' && (!data.dropdownItems || data.dropdownItems.length === 0)) {
      throw new Error('At least one dropdown item is required')
    }

    const button = await prisma.headerButton.create({
      data: {
        animation: data.animation || 'scale',
        backgroundColor: data.backgroundColor,
        fontColor: data.fontColor,
        text: data.text || 'Get Started',
        linkType: data.linkType || 'internal',
        link: data.link || '',
        type: data.type || 'button',
        dropdownItems: data.dropdownItems || [],
        secondaryButton: data.secondaryButton ? (data.secondaryButton as any) : null
      }
    })

    await createLog('info', 'Header button created successfully', {
      buttonId: button.id,
      text: button.text,
      type: button.type
    })

    revalidateTag('Header-Button', 'default')
    return { success: true, button }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create header button'

    await createLog('error', 'Failed to create header button', {
      error: errorMessage,
      text: data.text,
      type: data.type
    })

    throw new Error(errorMessage)
  }
}
