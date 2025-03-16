import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// Patron type for type safety
interface Patron {
  name: string
  email: string
}

// Add a patron to the lunch and update patron count
export async function PUT(req: NextRequest) {
  try {
    const { lunchId, patron }: { lunchId: string; patron: Patron } = await req.json() // Ensure patron is typed

    // First, find the lunch by its ID
    const lunch = await prisma.lunch.findUnique({
      where: { id: lunchId }
    })

    if (!lunch) {
      return NextResponse.json({ message: 'Lunch not found' }, { status: 404 })
    }

    // Ensure patrons is an array if it exists (defaulting to an empty array if not)
    const currentPatrons = lunch.patrons ? JSON.parse(lunch.patrons as unknown as string) : []

    // Add the new patron to the array
    const updatedPatrons = [...currentPatrons, patron]

    // Update patronsTotal count as an integer (simply the length of the patrons array)
    const updatedPatronsTotal = updatedPatrons.length

    // Check if the lunch is filled
    const isFilled = updatedPatrons.length >= lunch.patronCount

    // Update the lunch in the database
    const updatedLunch = await prisma.lunch.update({
      where: { id: lunchId },
      data: {
        patrons: JSON.stringify(updatedPatrons), // Store updated patrons array back as JSON
        patronsTotal: updatedPatronsTotal, // Now an integer
        isFilled
      }
    })

    return NextResponse.json({ updatedLunch }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to update lunch', error: error.message }, { status: 500 })
  }
}
