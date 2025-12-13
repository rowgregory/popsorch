'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Edit2, ExternalLink, Gift, Trash2 } from 'lucide-react'
import { useAppDispatch, useSponsorSelector } from '@/app/redux/store'
import { useDeleteSponsorMutation } from '@/app/redux/services/sponsorApi'
import { removeSponsorFromState, setOpenSponsorDrawer } from '@/app/redux/features/sponsorSlice'
import { ISponsor } from '@/app/types/model.types'
import { formatDateShort } from '@/app/lib/utils/dateUtils'
import { setInputs } from '@/app/redux/features/formSlice'
import EmptyState from '@/app/components/common/EmptyState'

const levelColors: Record<string, string> = {
  Platinum: 'bg-zinc-300 text-zinc-900',
  Gold: 'bg-yellow-400 text-yellow-900',
  Silver: 'bg-zinc-400 text-zinc-900',
  Bronze: 'bg-orange-400 text-orange-900'
}

const AdminSponsorsPage = () => {
  const data = useSponsorSelector()
  const dispatch = useAppDispatch()
  const [deleteSponsor] = useDeleteSponsorMutation()
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})

  const totalSponsors = data?.sponsors?.length
  const totalAmount = data?.sponsors?.reduce((sum, sponsor) => sum + parseInt(sponsor.amount), 0)

  const handleEditSponsor = (sponsor: ISponsor) => {
    dispatch(setOpenSponsorDrawer())
    dispatch(setInputs({ formName: 'sponsorForm', data: { ...sponsor, isUpdating: true } }))
  }

  const handleDeleteSponsor = async (id: string) => {
    setIsLoading({ [id]: true })
    const response = await deleteSponsor({ id }).unwrap()
    dispatch(removeSponsorFromState(response.id))
    setIsLoading({ [id]: false })
  }

  return (
    <div className="min-h-screen p-6">
      <div className="">
        {/* Stats Cards - Mobile */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/50 p-4 rounded-xl shadow-sm border border-neutral-800"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-purple-900/50 rounded-lg mb-2">
                <Gift className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-xs text-neutral-400 mb-1">Total Sponsors</p>
              <p className="text-xl font-bold text-white">{totalSponsors}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-neutral-900/50 p-4 rounded-xl shadow-sm border border-neutral-800"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-green-900/50 rounded-lg mb-2">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-xs text-neutral-400 mb-1">Total Value</p>
              <p className="text-xl font-bold text-white">${totalAmount?.toLocaleString()}</p>
            </div>
          </motion.div>
        </div>

        {/* Mobile Sponsor Cards */}
        <div className="space-y-4 lg:hidden">
          {data?.sponsors?.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all"
            >
              {/* Sponsor Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-neutral-100 font-semibold text-base leading-tight mb-1 truncate">
                      {sponsor.name}
                    </h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        levelColors[sponsor.level] || 'bg-neutral-700 text-neutral-300'
                      }`}
                    >
                      {sponsor.level}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 ml-2">
                  <a
                    href={sponsor.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-neutral-400 hover:text-green-400 hover:bg-green-900/30 rounded-lg transition-colors"
                    title="Visit Website"
                  >
                    <ExternalLink size={14} />
                  </a>
                  <button
                    onClick={() => handleEditSponsor(sponsor)}
                    className="p-2 text-neutral-400 hover:text-yellow-400 hover:bg-yellow-900/30 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  {isLoading[sponsor.id] ? (
                    <div className="w-3 h-3 border-2 border-red-500 border-t-0 animate-spin rounded-full" />
                  ) : (
                    <button
                      onClick={() => handleDeleteSponsor(sponsor.id)}
                      className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Sponsor Details */}
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-neutral-800/40 rounded-lg">
                  <span className="text-neutral-400 text-sm">Amount</span>
                  <span className="text-neutral-100 font-semibold">${Number(sponsor.amount).toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-neutral-800/40 rounded-lg">
                  <span className="text-neutral-400 text-sm">Created</span>
                  <span className="text-neutral-300 text-sm">{formatDateShort(sponsor.createdAt)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sponsors Grid */}
        <div className="hidden lg:block bg-neutral-900/50 rounded-xl shadow-sm border border-neutral-800 overflow-hidden">
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
                {data?.sponsors?.map((sponsor, index) => (
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
                        {isLoading[sponsor.id] ? (
                          <div className="w-3 h-3 border-2 border-red-500 border-t-0 animate-spin rounded-full" />
                        ) : (
                          <button
                            onClick={() => handleDeleteSponsor(sponsor.id)}
                            className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State (if no sponsors) */}
        {data.noSponsors && (
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
    </div>
  )
}

export default AdminSponsorsPage
