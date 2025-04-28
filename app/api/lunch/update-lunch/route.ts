import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const sliceName = 'lunchApi'

export async function PUT(req: NextRequest) {
  try {
    const { id, name, lunchTime, lunchLocation, host, description } = await req.json()

    await prisma.lunch.update({
      where: { id },
      data: {
        name,
        //  patronCount: Number(patronCount),
        lunchTime,
        lunchLocation,
        host,
        description
      }
    })
    return NextResponse.json({ sliceName }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to update lunch', error: error.data, sliceName }, { status: 500 })
  }
}
