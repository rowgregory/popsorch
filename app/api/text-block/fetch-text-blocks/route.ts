import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const textBlocks = await prisma.textBlock.findMany()

    const transformedTextBlocks = textBlocks.reduce((acc: any, item: any) => {
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

    return NextResponse.json({ textBlocks: transformedTextBlocks }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error', details: error.message }, { status: 500 })
  }
}
