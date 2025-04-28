import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceApp } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const textBlocks = await prisma.textBlock.findMany()
    const concerts = await prisma.concert.findMany()
    const testimonials = await prisma.testimonial.findMany()
    const venues = await prisma.venue.findMany()
    const photoGalleryImages = await prisma.photoGalleryImage.findMany()
    const teamMembers = await prisma.teamMember.findMany({ orderBy: { createdAt: 'asc' } })

    const sortedConcerts = concerts.sort((a: any, b: any) => {
      const aDate: any = new Date(a.eventDetails[0]?.date)
      const bDate: any = new Date(b.eventDetails[0]?.date)
      return aDate - bDate
    })

    const transformedTextBlocks = textBlocks.reduce((acc: any, item: any) => {
      // Initialize the type group if it doesn't exist
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
        acc[item.type][item.key] = item.value // Assign value directly for non-media items
      }

      return acc
    }, {})

    return NextResponse.json(
      {
        textBlocks: transformedTextBlocks,
        concerts: sortedConcerts,
        testimonials,
        venues,
        photoGalleryImages,
        teamMembers,
        sliceName: sliceApp
      },
      { status: 200 }
    )
  } catch (error: any) {
    await createLog('error', `Fetching app data failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })
    return NextResponse.json({ message: 'Error fetching app data', error, sliceName: sliceApp })
  }
}
