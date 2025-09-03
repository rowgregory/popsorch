'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Edit2, ExternalLink, Gift, Plus, Trash2 } from 'lucide-react'
import { useAppDispatch } from '@/app/redux/store'
import { useDeleteSponsorMutation, useFetchSponsorsQuery } from '@/app/redux/services/sponsorApi'
import { setOpenSponsorDrawer } from '@/app/redux/features/sponsorSlice'
import AdminSponsorDrawer from '@/app/drawers/AdminSponsorDrawer'
import { ISponsor } from '@/app/types/model.types'
import { formatDateShort } from '@/app/lib/utils/dateUtils'
import { setInputs } from '@/app/redux/features/formSlice'

const levelColors: Record<string, string> = {
  Platinum: 'bg-zinc-300 text-zinc-900',
  Gold: 'bg-yellow-400 text-yellow-900',
  Silver: 'bg-zinc-400 text-zinc-900',
  Bronze: 'bg-orange-400 text-orange-900'
}

const AdminSponsorsPage = () => {
  const dispatch = useAppDispatch()
  const { data } = useFetchSponsorsQuery({}) as { data: { sponsors: ISponsor[] } }
  const [deleteSponsor] = useDeleteSponsorMutation()
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})

  const totalSponsors = data?.sponsors?.length
  const totalAmount = data?.sponsors?.reduce((sum, sponsor) => sum + parseInt(sponsor.amount), 0)

  const handleAddSponsor = () => dispatch(setOpenSponsorDrawer())

  const handleEditSponsor = (sponsor: ISponsor) => {
    dispatch(setOpenSponsorDrawer())
    dispatch(setInputs({ formName: 'sponsorForm', data: { ...sponsor, isUpdating: true } }))
  }

  const handleDeleteSponsor = async (id: string) => {
    setIsLoading({ [id]: true })
    await deleteSponsor({ id }).unwrap()
    setIsLoading({ [id]: false })
  }

  return (
    <>
      <AdminSponsorDrawer />
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Sponsors Management</h1>
                <p className="text-neutral-300">Manage your partnerships and sponsorship relationships</p>
              </div>
              <motion.button
                onClick={handleAddSponsor}
                className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r border-2 border-neutral-700 hover:bg-neutral-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={20} />
                Add New Sponsor
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-700"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-900/50 rounded-lg">
                  <Gift className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Total Sponsors</p>
                  <p className="text-2xl font-bold text-white">{totalSponsors}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-700"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-900/50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Total Value</p>
                  <p className="text-2xl font-bold text-white">${totalAmount?.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sponsors Grid */}
          <div className="bg-neutral-800 rounded-xl shadow-sm border border-neutral-700 overflow-hidden">
            <div className="p-6 border-b border-neutral-700">
              <h2 className="text-xl font-semibold text-white">All Sponsors</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-900/50">
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
                <tbody className="bg-neutral-800 divide-y divide-neutral-700">
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
                        <span className="text-sm font-medium text-white">
                          ${Number(sponsor.amount).toLocaleString()}
                        </span>
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
          {data?.sponsors.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-800 rounded-xl shadow-sm border border-neutral-700 p-12 text-center"
            >
              <Gift className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No sponsors yet</h3>
              <p className="text-neutral-400 mb-6">Get started by adding your first sponsor</p>
              <button
                onClick={handleAddSponsor}
                className="inline-flex items-center gap-2 border-2 border-neutral-600 hover:bg-neutral-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Plus size={20} />
                Add Your First Sponsor
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

export default AdminSponsorsPage
