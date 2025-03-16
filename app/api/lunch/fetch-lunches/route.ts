import prisma from '@/prisma/client'
import { NextResponse } from 'next/server'

const sliceName = 'lunchApi'

export async function GET() {
  try {
    const lunches = await prisma.lunch.findMany()
    return NextResponse.json({ lunches, sliceName }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to fetch lunches', error: error.data, sliceName }, { status: 500 })
  }
}
