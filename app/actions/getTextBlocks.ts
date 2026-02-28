import prisma from '@/prisma/client'

const transformTextBlocks = (textBlocks: any[]) => {
  return textBlocks.reduce((acc: any, item: any) => {
    if (!acc[item.type]) {
      acc[item.type] = {}
    }

    if (item.key.toLowerCase().includes('file')) {
      acc[item.type][item.key] = {
        value: item.value,
        mimeType: item.mimeType || null,
        fileName: item.fileName || null
      }
    } else {
      acc[item.type][item.key] = item.value
    }

    return acc
  }, {})
}

export const getTextBlocks = async () => {
  try {
    const [textBlocks] = await Promise.all([prisma.textBlock.findMany()])
    return transformTextBlocks(textBlocks)
  } catch (error) {
    throw error
  }
}
