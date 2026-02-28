'use server'

import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'

interface TeamMember {
  id: string
  firstName: string
  lastName: string
  position: string
  role: string
  displayOrder: number
}

export async function updateTeamMembersOrder(teamMembers: TeamMember[]) {
  try {
    // Validation
    if (!teamMembers || !Array.isArray(teamMembers) || teamMembers.length === 0) {
      throw new Error('Invalid team members data')
    }

    const isValidTeamMembers = teamMembers.every(
      (member) =>
        member.id &&
        member.role &&
        (member.role === 'Board-Member' || member.role === 'Staff' || member.role === 'Musician')
    )

    if (!isValidTeamMembers) {
      throw new Error('Invalid team member data structure - missing id or role')
    }

    // Separate team members by role
    const boardMembers = teamMembers.filter((member) => member.role === 'Board-Member')
    const staffMembers = teamMembers.filter((member) => member.role === 'Staff')
    const musicians = teamMembers.filter((member) => member.role === 'Musician')

    // Recalculate display order for each role group starting from 1
    const updatedBoardMembers = boardMembers.map((member, index) => ({
      ...member,
      displayOrder: index + 1
    }))

    const updatedStaffMembers = staffMembers.map((member, index) => ({
      ...member,
      displayOrder: index + 1
    }))

    const updatedMusicians = musicians.map((member, index) => ({
      ...member,
      displayOrder: index + 1
    }))

    // Update database with recalculated orders
    const [savedStaff, savedBoardMembers, savedMusicians] = await Promise.all([
      updateOrderInDatabase(updatedStaffMembers),
      updateOrderInDatabase(updatedBoardMembers),
      updateOrderInDatabase(updatedMusicians)
    ])

    await createLog('info', 'Team member order updated successfully', {
      savedStaffCount: savedStaff.length,
      savedBoardMembersCount: savedBoardMembers.length,
      savedMusiciansCount: savedMusicians.length
    })

    return {
      success: true,
      data: {
        boardMembersCount: updatedBoardMembers.length,
        staffMembersCount: updatedStaffMembers.length,
        musicianCount: updatedMusicians.length,
        savedStaff,
        savedBoardMembers,
        savedMusicians
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update team member order'

    await createLog('error', 'Failed to update team member order', {
      error: errorMessage
    })

    throw new Error(errorMessage)
  }
}

async function updateOrderInDatabase(teamMembers: TeamMember[]) {
  const updatePromises = teamMembers.map((member, index) =>
    prisma.teamMember.update({
      where: { id: member.id },
      data: { displayOrder: index + 1 }
    })
  )
  return Promise.all(updatePromises)
}
