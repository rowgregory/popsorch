'use client'

import React, { useState } from 'react'
import TeamMemberRow from '@/app/components/admin/TeamMemberRow'
import {
  setBoardMembers,
  setMusicians,
  setOpenTeamMemberDrawer,
  setStaff,
  TeamMemberProps,
  updateTeamMemberListInState
} from '@/app/redux/features/teamMemberSlice'
import { useAppDispatch, useTeamMemberSelector } from '@/app/redux/store'
import { useUpdateTeamMemberListMutation } from '@/app/redux/services/teamMemberApi'
import { showToast } from '@/app/redux/features/toastSlice'
import EmptyState from '@/app/components/common/EmptyState'

const Team = () => {
  const { staff, boardMembers, musicians, noTeamMembers } = useTeamMemberSelector()
  const [updateTeamMemberList] = useUpdateTeamMemberListMutation()
  const dispatch = useAppDispatch()
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [draggedOver, setDraggedOver] = useState<string | null>(null)
  const [draggedFromList, setDraggedFromList] = useState<'Board-Member' | 'Staff' | 'Musician' | null>(null)

  const handleDragStart = (
    e: React.DragEvent,
    teamMemberId: string,
    memberRole: 'Board-Member' | 'Staff' | 'Musician'
  ) => {
    setDraggedItem(teamMemberId)
    setDraggedFromList(memberRole)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, teamMemberId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDraggedOver(teamMemberId)
  }

  const handleDragLeave = () => {
    setDraggedOver(null)
  }

  const handleDrop = async (
    e: React.DragEvent,
    targetId: string,
    targetRole: 'Board-Member' | 'Staff' | 'Musician'
  ) => {
    e.preventDefault()

    if (!draggedItem || draggedItem === targetId || draggedFromList !== targetRole) {
      setDraggedItem(null)
      setDraggedOver(null)
      setDraggedFromList(null)
      return
    }

    // Get the appropriate list based on role
    const currentList = targetRole === 'Board-Member' ? boardMembers : targetRole === 'Staff' ? staff : musicians

    const draggedIndex = currentList.findIndex((member) => member.id === draggedItem)
    const targetIndex = currentList.findIndex((member) => member.id === targetId)

    if (draggedIndex === -1 || targetIndex === -1) return

    // Create new array with reordered items for this specific role
    const newList = [...currentList]
    const [movedItem] = newList.splice(draggedIndex, 1)
    newList.splice(targetIndex, 0, movedItem)

    // Update display order within this role group
    const updatedList = newList.map((member, index) => ({
      ...member,
      displayOrder: index + 1
    }))

    // Merge with the other roles' lists to create the complete team members array
    const otherRoleMembers = [
      ...(targetRole !== 'Board-Member' ? boardMembers : []),
      ...(targetRole !== 'Staff' ? staff : []),
      ...(targetRole !== 'Musician' ? musicians : [])
    ]

    const completeUpdatedList: TeamMemberProps[] | any = [...updatedList, ...otherRoleMembers].sort((a, b) => {
      // Sort by role first (Board-Member, then Staff, then Musician), then by displayOrder
      const roleOrder = { 'Board-Member': 1, Staff: 2, Musician: 3 }
      if (a.role !== b.role) {
        return roleOrder[a.role as keyof typeof roleOrder] - roleOrder[b.role as keyof typeof roleOrder]
      }
      return a.displayOrder - b.displayOrder
    })

    // Optimistically update UI
    if (targetRole === 'Staff') {
      dispatch(setStaff(updatedList))
    } else if (targetRole === 'Board-Member') {
      dispatch(setBoardMembers(updatedList))
    } else {
      dispatch(setMusicians(updatedList))
    }

    // Save to backend
    try {
      const response = await updateTeamMemberList(completeUpdatedList).unwrap()

      dispatch(
        updateTeamMemberListInState({
          savedStaff: response.savedStaff,
          savedBoardMembers: response.savedBoardMembers,
          savedMusicians: response.savedMusicians
        })
      )
    } catch (error: any) {
      dispatch(showToast({ type: 'error', message: 'Failed', description: error?.data?.message }))
    }

    setDraggedItem(null)
    setDraggedOver(null)
    setDraggedFromList(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDraggedOver(null)
    setDraggedFromList(null)
  }

  const renderTeamMembersList = (
    members: TeamMemberProps[],
    role: 'Board-Member' | 'Staff' | 'Musician',
    title: string
  ) => {
    // Sort members by displayOrder before rendering
    const sortedMembers = [...members].sort((a, b) => a.displayOrder - b.displayOrder)

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4 px-4">{title}</h3>
        {sortedMembers.length === 0 ? (
          <div className="text-sm text-gray-400 px-4">No {title.toLowerCase()}</div>
        ) : (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-[3fr_3fr_3fr_2fr_1fr] gap-x-4 rounded-md pl-4 py-2 pr-2 mb-3 text-sm min-w-[600px] bg-neutral-900/50">
                <div className="whitespace-nowrap text-neutral-300">First Name</div>
                <div className="whitespace-nowrap text-neutral-300">Last Name</div>
                <div className="whitespace-nowrap text-neutral-300">Position</div>
                <div className="whitespace-nowrap text-neutral-300">Role</div>
                <div></div>
              </div>
              <div className="flex flex-col gap-y-3 min-w-[600px]">
                {sortedMembers.map((teamMember: TeamMemberProps) => (
                  <div
                    key={teamMember.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, teamMember.id, role)}
                    onDragOver={(e) => handleDragOver(e, teamMember.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, teamMember.id, role)}
                    onDragEnd={handleDragEnd}
                    className={`relative cursor-move transition-all duration-200 ${
                      draggedItem === teamMember.id ? 'opacity-50 scale-105' : ''
                    } ${
                      draggedOver === teamMember.id && draggedItem !== teamMember.id && draggedFromList === role
                        ? 'border-t-3 border-purple-500'
                        : ''
                    }`}
                  >
                    {/* Drag handle */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-neutral-300">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <circle cx="2" cy="2" r="1" />
                        <circle cx="6" cy="2" r="1" />
                        <circle cx="10" cy="2" r="1" />
                        <circle cx="2" cy="6" r="1" />
                        <circle cx="6" cy="6" r="1" />
                        <circle cx="10" cy="6" r="1" />
                        <circle cx="2" cy="10" r="1" />
                        <circle cx="6" cy="10" r="1" />
                        <circle cx="10" cy="10" r="1" />
                      </svg>
                    </div>
                    <div className="pl-8">
                      <TeamMemberRow teamMember={teamMember} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="relative p-6">
        <div>
          {renderTeamMembersList(boardMembers, 'Board-Member', 'Board Members')}
          {renderTeamMembersList(staff, 'Staff', 'Staff Members')}
          {renderTeamMembersList(musicians, 'Musician', 'Musicians')}
        </div>
      </div>
      {/* Empty State (if no team members) */}
      {noTeamMembers && (
        <EmptyState
          searchQuery=""
          typeFilter="all"
          title="Team Member"
          advice="Add your first team member to get started"
          func={setOpenTeamMemberDrawer}
          action="Add Team Member"
        />
      )}
    </>
  )
}

export default Team
