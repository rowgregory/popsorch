import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const sliceName = 'lunchApi'

export async function POST(req: NextRequest) {
  try {
    const lunchData = await req.json()

    const newLunch = await prisma.lunch.create({
      data: lunchData
    })
    return NextResponse.json({ newLunch, sliceName }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to create lunch', error: error.data, sliceName }, { status: 500 })
  }
}
