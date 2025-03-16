import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const sliceName = 'lunchApi'

export async function PUT(req: NextRequest) {
  try {
    const lunchData = await req.json()

    const updatedLunch = await prisma.lunch.update({
      where: { id: lunchData.id },
      data: lunchData
    })
    return NextResponse.json({ updatedLunch, sliceName }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to update lunch', error: error.data, sliceName }, { status: 500 })
  }
}
