import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const sliceName = 'lunchApi'

export async function POST(req: NextRequest) {
  try {
    const lunchData = await req.json()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = lunchData
    const lunch = {
      ...rest,
      patrons: [],
      patronsTotal: 0,
      isFilled: false,
      patronCount: Number(lunchData.patronCount)
    }

    await prisma.lunch.create({
      data: lunch
    })
    return NextResponse.json({ sliceName }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to create lunch', error: error.data, sliceName }, { status: 500 })
  }
}
