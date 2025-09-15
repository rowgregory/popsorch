import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

interface TeamMember {
  id: string
  firstName: string
  lastName: string
  position: string
  role: string
  displayOrder: number
}

export async function PUT(request: NextRequest) {
  try {
    const teamMembers = await request.json()

    // Validation
    if (!teamMembers || !Array.isArray(teamMembers) || teamMembers.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid team members data'
        },
        { status: 400 }
      )
    }

    const isValidTeamMembers = teamMembers.every(
      (member) => member.id && member.role && (member.role === 'Board-Member' || member.role === 'Staff')
    )

    if (!isValidTeamMembers) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid team member data structure - missing id or role'
        },
        { status: 400 }
      )
    }

    // Separate team members by role
    const boardMembers = teamMembers.filter((member: any) => member.role === 'Board-Member')
    const staffMembers = teamMembers.filter((member: any) => member.role === 'Staff')

    // Recalculate display order for each role group starting from 1
    const updatedBoardMembers = boardMembers.map((member: any, index: number) => ({
      ...member,
      displayOrder: index + 1
    }))

    const updatedStaffMembers = staffMembers.map((member: any, index: number) => ({
      ...member,
      displayOrder: index + 1
    }))

    // Update database with the recalculated orders
    await updateTeamMembersOrder(updatedStaffMembers)
    await updateTeamMembersOrder(updatedBoardMembers)

    return NextResponse.json({
      success: true,
      message: 'Team members order updated successfully',
      data: {
        boardMembersCount: updatedBoardMembers.length,
        staffMembersCount: updatedStaffMembers.length
      }
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error'
      },
      { status: 500 }
    )
  }
}

async function updateTeamMembersOrder(teamMembers: TeamMember[]) {
  const updatePromises = teamMembers.map((member, index) =>
    prisma.teamMember.update({
      where: { id: member.id },
      data: { displayOrder: index + 1 }
    })
  )
  const updatedMembers = await Promise.all(updatePromises)
  return updatedMembers
}
