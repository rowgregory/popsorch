'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Check, Eye, Tent } from 'lucide-react'
import { useAppDispatch, useCampSelector } from '@/app/redux/store'
import { useFetchCampApplicationsQuery } from '@/app/redux/services/campApi'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import AdminDeleteCampApplicationsModal from '@/app/modals/AdminDeleteCampApplicationsModal'
import { formatDateShort } from '@/app/lib/utils/dateUtils'
import { setOpenCampApplicationDrawer } from '@/app/redux/features/campSlice'
import { setInputs } from '@/app/redux/features/formSlice'

const CampApplications = () => {
  const { data, isLoading } = useFetchCampApplicationsQuery(undefined) as any
  const { noCampApplications, campApplicationsCount } = useCampSelector()
  const dispatch = useAppDispatch()
  // Bulk selection state
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set())
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Handle individual checkbox selection
  const handleSelectApplication = useCallback((applicationId: string) => {
    setSelectedApplications((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(applicationId)) {
        newSet.delete(applicationId)
      } else {
        newSet.add(applicationId)
      }
      return newSet
    })
  }, [])

  // Handle select all checkbox
  const handleSelectAll = useCallback(() => {
    if (selectedApplications.size === data?.campApplications?.length) {
      // If all are selected, deselect all
      setSelectedApplications(new Set())
    } else {
      // Select all applications
      const allIds: any = new Set(data?.campApplications?.map((app: any) => app.id) || [])
      setSelectedApplications(allIds)
    }
  }, [selectedApplications.size, data?.campApplications])

  const isAllSelected =
    selectedApplications.size === data?.campApplications?.length && data?.campApplications?.length > 0
  const isIndeterminate = selectedApplications.size > 0 && selectedApplications.size < data?.campApplications?.length

  return (
    <div className="min-h-screen p-6">
      <div className="">
        {/* Mobile Header Actions */}
        <AnimatePresence>
          {selectedApplications.size > 0 && (
            <div className="flex flex-col gap-4 sticky top-0 z-20 bg-neutral-950/80 backdrop-blur-sm py-2 rounded-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="flex items-center justify-between bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3"
              >
                <span className="text-sm font-medium text-red-300">{selectedApplications.size} selected</span>
                <motion.button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isDeleting}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-medium rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 size={14} />
                  Delete
                </motion.button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AdminDeleteCampApplicationsModal
          showDeleteConfirm={showDeleteConfirm}
          isDeleting={isDeleting}
          setShowDeleteConfirm={setShowDeleteConfirm}
          selectedApplications={selectedApplications}
          setIsDeleting={setIsDeleting}
          setSelectedApplications={setSelectedApplications}
        />

        {/* Stats Cards - Mobile */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/50 p-4 rounded-xl shadow-sm border border-neutral-800"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-blue-900/50 rounded-lg mb-2">
                <Tent className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-xs text-neutral-400 mb-1">Total Camp Applications</p>
              <p className="text-xl font-bold text-white">{campApplicationsCount}</p>
            </div>
          </motion.div>
        </div>

        {isLoading ? (
          <AdminPageSpinner fill="fill-blue-400" />
        ) : (
          <>
            {/* Mobile Select All */}
            <div className="lg:hidden mb-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg">
              <motion.label
                className="flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate
                  }}
                  onChange={handleSelectAll}
                  className="sr-only"
                />
                <div
                  className={`
                w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                ${
                  isAllSelected
                    ? 'bg-blue-600 border-blue-600'
                    : isIndeterminate
                    ? 'bg-blue-100 border-blue-400'
                    : 'border-neutral-600 hover:border-blue-400'
                }
              `}
                >
                  {isAllSelected && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }}>
                      <Check size={12} className="text-white" />
                    </motion.div>
                  )}
                  {isIndeterminate && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.15 }}
                      className="w-2 h-0.5 bg-blue-600 rounded"
                    />
                  )}
                </div>
                <span className="text-neutral-300 text-sm font-medium">Select All Applications</span>
              </motion.label>
            </div>

            {/* Mobile Application Cards */}
            <div className="space-y-4 lg:hidden">
              {data?.campApplications?.map((application: any) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-neutral-900/50 border rounded-xl p-4 transition-all ${
                    selectedApplications.has(application.id)
                      ? 'border-blue-500/50 bg-blue-900/10'
                      : 'border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <motion.label
                        className="flex items-center cursor-pointer mt-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedApplications.has(application.id)}
                          onChange={() => handleSelectApplication(application.id)}
                          className="sr-only"
                        />
                        <div
                          className={`
                        w-4 h-4 rounded border-2 flex items-center justify-center transition-all
                        ${
                          selectedApplications.has(application.id)
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-neutral-600'
                        }
                      `}
                        >
                          {selectedApplications.has(application.id) && <Check size={10} className="text-white" />}
                        </div>
                      </motion.label>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-neutral-100 font-semibold text-base leading-tight mb-1">
                          {application.student.firstName} {application.student.lastName}
                        </h3>
                        <p className="text-neutral-400 text-sm mb-2 truncate">
                          {application.student.studentEmailAddress}
                        </p>
                        <span className="text-neutral-500 text-xs">{formatDateShort(application.createdAt)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        /* Handle view application */
                      }}
                      className="ml-2 p-2 text-neutral-400 hover:text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                      title="View Application"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop Table - Hidden on Mobile */}
            <div className="hidden lg:block bg-neutral-900/50 rounded-xl shadow-sm border border-neutral-800 overflow-hidden">
              <div className="p-6 border-b border-neutral-800">
                <h2 className="text-xl font-semibold text-white">All Applications</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-950">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                        <motion.label
                          className="relative flex items-center cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <input
                            type="checkbox"
                            checked={isAllSelected}
                            ref={(input) => {
                              if (input) input.indeterminate = isIndeterminate
                            }}
                            onChange={handleSelectAll}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                              isAllSelected
                                ? 'bg-blue-600 border-blue-600'
                                : isIndeterminate
                                ? 'bg-blue-100 border-blue-400'
                                : 'border-neutral-600 hover:border-blue-400'
                            }`}
                          >
                            {isAllSelected && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }}>
                                <Check size={12} className="text-white" />
                              </motion.div>
                            )}
                            {isIndeterminate && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.15 }}
                                className="w-2 h-0.5 bg-blue-600 rounded"
                              />
                            )}
                          </div>
                        </motion.label>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                        First Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                        Last Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                        Student Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                        Date Created
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-neutral-900/50 divide-y divide-neutral-800">
                    {data?.campApplications?.map((application: any, index: number) => (
                      <motion.tr
                        key={application.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-neutral-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <motion.label
                            className="relative flex items-center cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedApplications.has(application.id)}
                              onChange={() => handleSelectApplication(application.id)}
                              className="sr-only"
                            />
                            <div
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                                selectedApplications.has(application.id)
                                  ? 'bg-blue-600 border-blue-600'
                                  : 'border-neutral-600'
                              }`}
                            >
                              {selectedApplications.has(application.id) && <Check size={10} className="text-white" />}
                            </div>
                          </motion.label>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-white">{application.student.firstName}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-white">{application.student.lastName}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-white">{application.student.studentEmailAddress}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-neutral-400">{formatDateShort(application.createdAt)}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              dispatch(setInputs({ formName: 'campForm', data: application }))
                              dispatch(setOpenCampApplicationDrawer())
                            }}
                            className="p-2 text-neutral-400 hover:text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                            title="View Application"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Empty State (if no sponsors) */}
        {noCampApplications && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-800 rounded-xl shadow-sm border border-neutral-800 p-12 text-center"
          >
            <Tent className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No camp applications yet</h3>
            <p className="text-neutral-400 mb-6">Get started by adding your first sponsor</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CampApplications
