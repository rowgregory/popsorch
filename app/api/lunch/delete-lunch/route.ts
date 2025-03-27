import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const sliceName = 'lunchApi'

export async function DELETE(req: NextRequest) {
  try {
    const deleteData = await req.json()

    await prisma.lunch.delete({
      where: { id: deleteData.id }
    })
    return NextResponse.json({ sliceName }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to delete lunch', error: error.data, sliceName }, { status: 500 })
  }
}
