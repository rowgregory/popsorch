'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { Edit2, ExternalLink, Loader2, Trash2 } from 'lucide-react'
import { useAppDispatch } from '@/app/redux/store'
import { setOpenSponsorDrawer } from '@/app/redux/features/sponsorSlice'
import { ISponsor } from '@/app/types/entities/sponsor'
import { formatDateShort } from '@/app/lib/utils/dateUtils'
import { setInputs } from '@/app/redux/features/formSlice'
import EmptyState from '@/app/components/common/EmptyState'
import { levelColors } from '@/app/lib/constants/admin'
import { useRouter } from 'next/navigation'
import { showToast } from '@/app/redux/features/toastSlice'
import { deleteSponsor } from '@/app/actions/deleteSponsor'

const AdminSponsors = ({ data }) => {
  const { sponsors, count, totalAmount } = data
  const dispatch = useAppDispatch()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleEditSponsor = (sponsor: ISponsor) => {
    dispatch(setOpenSponsorDrawer())
    dispatch(setInputs({ formName: 'sponsorForm', data: { ...sponsor, isUpdating: true } }))
  }

  const handleDelete = async (sponsorId: string) => {
    setDeletingId(sponsorId)
    startTransition(async () => {
      try {
        await deleteSponsor(sponsorId)
        router.refresh()
        dispatch(
          showToast({
            message: 'Sponsor deleted successfully',
            type: 'success'
          })
        )
      } catch {
        dispatch(
          showToast({
            message: 'Failed to delete sponsor',
            type: 'error'
          })
        )
      } finally {
        setDeletingId(null)
      }
    })
  }

  return (
    <div className="h-[calc(100vh-66px)] p-6">
      {/* Stats Cards - Mobile */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/50 p-4 rounded-xl shadow-sm border border-neutral-800"
        >
          <div className="flex flex-col items-center">
            <p className="text-xs text-neutral-400 mb-1">Total Sponsors</p>
            <p className="text-xl font-bold text-white">{count}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-900/50 p-4 rounded-xl shadow-sm border border-neutral-800"
        >
          <div className="flex flex-col items-center">
            <p className="text-xs text-neutral-400 mb-1">Total Value</p>
            <p className="text-xl font-bold text-white">${totalAmount?.toLocaleString()}</p>
          </div>
        </motion.div>
      </div>

      {/* Sponsors Table */}
      <div className="bg-neutral-900/50 rounded-xl shadow-sm border border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-xl font-semibold text-white">All Sponsors</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-950">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Sponsor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-neutral-900/50 divide-y divide-neutral-800">
              {sponsors?.map((sponsor: ISponsor, index: number) => (
                <motion.tr
                  key={sponsor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-neutral-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-white">{sponsor.name}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        levelColors[sponsor.level] || 'bg-neutral-700 text-neutral-300'
                      }`}
                    >
                      {sponsor.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-white">${Number(sponsor.amount).toLocaleString()}</span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-neutral-400">{formatDateShort(sponsor.createdAt)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <a
                        href={sponsor.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-neutral-400 hover:text-green-400 hover:bg-green-900/30 rounded-lg transition-colors"
                        title="Visit Website"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={() => handleEditSponsor(sponsor)}
                        className="p-2 text-neutral-400 hover:text-yellow-400 hover:bg-yellow-900/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(sponsor.id)}
                        disabled={deletingId === sponsor.id}
                        className="disabled:opacity-50 disabled:cursor-not-allowed p-2 text-neutral-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        {deletingId === sponsor.id && isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State (if no sponsors) */}
      {data?.noSponsors && (
        <EmptyState
          searchQuery=""
          typeFilter=""
          title="Sponsor"
          advice="Add your first sponsor to get started"
          func={setOpenSponsorDrawer}
          action="Add Sponsor"
        />
      )}
    </div>
  )
}

export default AdminSponsors
