import { FC, useState, useTransition } from 'react'
import { useAppDispatch } from '@/app/redux/store'
import { motion } from 'framer-motion'
import { setInputs } from '@/app/redux/features/formSlice'
import { setOpenTeamMemberDrawer, TeamMemberProps } from '@/app/redux/features/teamMemberSlice'
import Picture from '../common/Picture'
import { useRouter } from 'next/navigation'
import { showToast } from '@/app/redux/features/toastSlice'
import { Loader2, Trash2 } from 'lucide-react'
import { deleteTeamMember } from '@/app/actions/deleteTeamMember'

const getRoleColor = (role: string) => {
  return role === 'Board-Member'
    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
    : 'bg-green-500/20 text-green-300 border border-green-500/30'
}

const getRoleIcon = (role: string) => {
  return role === 'Board-Member' ? '👔' : '⚡'
}

const TeamMemberRow: FC<{ teamMember: TeamMemberProps }> = ({ teamMember }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [_, startTransition] = useTransition()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleDelete = async (teamMemberId: string) => {
    setDeletingId(teamMemberId)
    startTransition(async () => {
      try {
        await deleteTeamMember(teamMemberId)
        router.refresh()
        dispatch(
          showToast({
            message: 'Team member deleted successfully',
            type: 'success'
          })
        )
      } catch {
        dispatch(
          showToast({
            message: 'Failed to delete team member',
            type: 'error'
          })
        )
      } finally {
        setDeletingId(null)
      }
    })
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      onClick={() => {
        dispatch(setOpenTeamMemberDrawer())
        dispatch(setInputs({ formName: 'teamMemberForm', data: { ...teamMember, isUpdating: true } }))
      }}
      className="bg-neutral-800/50 hover:bg-neutral-700/60 backdrop-blur-sm rounded-xl p-5 border border-neutral-700/50 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
    >
      <div className="flex items-center justify-between">
        {/* Left Section - Profile Info */}
        <div className="flex items-center gap-4 flex-1">
          {/* Avatar */}
          <div className="relative">
            {teamMember?.imageUrl ? (
              <Picture
                priority={false}
                src={teamMember.imageUrl}
                alt={`${teamMember.firstName} ${teamMember.lastName}`}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all duration-300"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all duration-300">
                {teamMember?.firstName?.charAt(0)}
                {teamMember?.lastName?.charAt(0)}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 text-lg">{getRoleIcon(teamMember?.role)}</div>
          </div>

          {/* Name & Position */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-lg truncate group-hover:text-purple-300 transition-colors duration-200">
              {teamMember?.firstName} {teamMember?.lastName}
            </h3>
            <p className="text-neutral-400 text-sm truncate">{teamMember?.position}</p>
          </div>
        </div>

        {/* Center Section - Role Badge */}
        <div className="hidden md:flex items-center mx-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(teamMember?.role)}`}>
            {teamMember?.role === 'Board-Member' ? 'Board Member' : 'Staff'}
          </span>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Display Order */}
          <div className="hidden sm:flex items-center gap-2 text-neutral-500">
            <span className="text-xs">Order:</span>
            <span className="text-sm font-mono bg-neutral-700/50 px-2 py-1 rounded">
              #{teamMember?.displayOrder || 0}
            </span>
          </div>

          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(teamMember.id)
            }}
            disabled={deletingId === teamMember.id}
            className="disabled:opacity-50 disabled:cursor-not-allowed p-2 text-neutral-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
          >
            {deletingId === teamMember.id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>

          {/* Edit Indicator */}
          <div className="text-neutral-500 group-hover:text-purple-400 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Role Badge */}
      <div className="md:hidden mt-3 flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(teamMember?.role)}`}>
          {teamMember?.role === 'Board-Member' ? 'Board Member' : 'Staff'}
        </span>
        <span className="text-xs text-neutral-500">Order: #{teamMember?.displayOrder || 0}</span>
      </div>
    </motion.div>
  )
}

export default TeamMemberRow
