'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, GripVertical, Loader2, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { TeamMember } from '@prisma/client'
import { updateTeamMembersOrder } from '@/app/lib/actions/team/updateTeamMemberOrder'
import { store } from '@/app/redux/store'
import { showToast } from '@/app/redux/features/toastSlice'
import { Role, ROLE_LABELS, ROLES, TeamReorderClientProps } from '@/app/types/entities/team-member'
import { LogoutButton } from '../common/LogoutButton'

export default function TeamReorderClient({ teamMembers }: TeamReorderClientProps) {
  const router = useRouter()

  const [lists, setLists] = useState<Record<Role, TeamMember[]>>({
    BOARD_MEMBER: teamMembers.filter((m) => m.role === 'BOARD_MEMBER').sort((a, b) => a.displayOrder - b.displayOrder),
    STAFF: teamMembers.filter((m) => m.role === 'STAFF').sort((a, b) => a.displayOrder - b.displayOrder),
    MUSICIAN: teamMembers.filter((m) => m.role === 'MUSICIAN').sort((a, b) => a.displayOrder - b.displayOrder)
  })
  const [isLoading, setIsLoading] = useState(false)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [draggedRole, setDraggedRole] = useState<Role | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)
  const [dragPosition, setDragPosition] = useState<'top' | 'bottom' | null>(null)
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null)

  const handleDragStart = (e: React.DragEvent, id: string, role: Role, index: number) => {
    setDraggedId(id)
    setDraggedRole(role)
    setDragStartIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, id: string, index: number) => {
    e.preventDefault()
    if (id === draggedId) return

    // If dragging downward, show bottom indicator
    // If dragging upward, show top indicator
    const isDraggingDown = dragStartIndex !== null && index > dragStartIndex
    setDragPosition(isDraggingDown ? 'bottom' : 'top')
    setDragOverId(id)
  }

  const handleDrop = (e: React.DragEvent, targetId: string, targetRole: Role) => {
    e.preventDefault()
    if (!draggedId || draggedId === targetId || draggedRole !== targetRole) {
      resetDrag()
      return
    }

    const list = [...lists[targetRole]]
    const fromIdx = list.findIndex((m) => m.id === draggedId)
    const toIdx = list.findIndex((m) => m.id === targetId)
    if (fromIdx === -1 || toIdx === -1) return

    const [moved] = list.splice(fromIdx, 1)
    list.splice(toIdx, 0, moved)

    setLists((prev) => ({
      ...prev,
      [targetRole]: list.map((m, i) => ({ ...m, displayOrder: i + 1 }))
    }))

    resetDrag()
  }

  const resetDrag = () => {
    setDraggedId(null)
    setDraggedRole(null)
    setDragOverId(null)
    setDragPosition(null)
    setDragStartIndex(null)
  }

  const handleSave = async () => {
    const all = [...lists.BOARD_MEMBER, ...lists.STAFF, ...lists.MUSICIAN]

    setIsLoading(true)
    const res = await updateTeamMembersOrder(all)
    if (res.success) {
      router.refresh()
      store.dispatch(showToast({ type: 'success', message: 'Order saved!' }))
      router.push('/v2/dashboard')
    } else {
      store.dispatch(showToast({ type: 'error', message: res.error ?? 'Failed to save order' }))
    }

    setIsLoading(false)
  }
  const handleDragLeave = (e: React.DragEvent) => {
    // Only reset if we're leaving the actual drop target, not a child
    if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
      setDragOverId(null)
      setDragPosition(null)
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-bg-dark text-text-dark">
      {/* ── Top Bar ── */}
      <div className="shrink-0 h-11 bg-surface-dark border-b border-border-dark flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/v2/dashboard"
            className="text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
          <Users className="w-3.5 h-3.5 text-primary-dark" aria-hidden="true" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">Team</span>
          <span className="text-[9px] font-mono text-border-dark">·</span>
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-text-dark">Reorder</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-1.5 bg-primary-dark hover:bg-secondary-light text-white text-[9px] font-mono tracking-[0.15em] uppercase transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
          >
            {isLoading && <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />}
            {isLoading ? 'Saving...' : 'Save Order'}
          </button>
          <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
          <LogoutButton />
        </div>
      </div>

      {/* ── Note ── */}
      <div className="shrink-0 border-b border-yellow-500/20 bg-yellow-500/5 px-4 py-2 flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" aria-hidden="true" />
        <p className="text-[9px] font-mono text-yellow-400/80">
          Drag to reorder within each group — click <span className="text-yellow-400">Save Order</span> when done or
          changes will not be saved.
        </p>
      </div>

      {/* ── Three Columns ── */}
      <div className="flex-1 flex overflow-hidden">
        {ROLES.map((role, colIdx) => (
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIdx * 0.05 }}
            className="flex-1 border-r border-border-dark last:border-0 flex flex-col overflow-hidden"
          >
            {/* Column header */}
            <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-border-dark bg-surface-dark">
              <div className="flex items-center gap-2">
                <div className="w-3 h-px bg-primary-dark" aria-hidden="true" />
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary-dark">
                  {ROLE_LABELS[role]}
                </span>
                <span className="text-[9px] font-mono text-muted-dark/40">({lists[role].length})</span>
              </div>
            </div>

            {/* Draggable list */}
            <div className="flex-1 overflow-y-auto">
              {lists[role].length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <p className="text-muted-dark/40 text-[10px] font-mono">No members</p>
                </div>
              ) : (
                lists[role].map((member, i) => (
                  <div
                    key={member.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, member.id, role, i)}
                    onDragOver={(e) => handleDragOver(e, member.id, i)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, member.id, role)}
                    onDragEnd={resetDrag}
                    className={`flex items-center gap-3 px-4 py-3 border-b border-border-dark/40 last:border-0 cursor-grab active:cursor-grabbing transition-all relative ${
                      draggedId === member.id ? 'opacity-40' : 'hover:bg-surface-dark'
                    }`}
                  >
                    {/* Top drop indicator */}
                    {dragOverId === member.id &&
                      draggedId !== member.id &&
                      draggedRole === role &&
                      dragPosition === 'top' && (
                        <div className="absolute top-0 inset-x-0 flex items-center pointer-events-none z-10">
                          <div className="w-2 h-2 bg-primary-dark" />
                          <div className="flex-1 h-0.5 bg-primary-dark" />
                        </div>
                      )}

                    {/* Bottom drop indicator */}
                    {dragOverId === member.id &&
                      draggedId !== member.id &&
                      draggedRole === role &&
                      dragPosition === 'bottom' && (
                        <div className="absolute bottom-0 inset-x-0 flex items-center pointer-events-none z-10">
                          <div className="w-2 h-2 bg-primary-dark" />
                          <div className="flex-1 h-0.5 bg-primary-dark" />
                        </div>
                      )}

                    <GripVertical className="w-3.5 h-3.5 text-muted-dark/30 shrink-0" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="text-text-dark text-xs font-medium truncate">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-muted-dark text-[9px] truncate">{member.position}</p>
                    </div>
                    <span className="text-[9px] font-mono text-muted-dark/30 shrink-0">{i + 1}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
