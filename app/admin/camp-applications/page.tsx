'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Check, Eye, ChevronRight } from 'lucide-react'
import { useAppDispatch, useCampSelector } from '@/app/redux/store'
import AdminDeleteCampApplicationsModal from '@/app/modals/AdminDeleteCampApplicationsModal'
import { formatDateShort } from '@/app/lib/utils/dateUtils'
import { setOpenCampApplicationDrawer } from '@/app/redux/features/campSlice'
import { setInputs } from '@/app/redux/features/formSlice'
import EmptyState from '@/app/components/common/EmptyState'

const CampApplications = () => {
  const { noCampApplications, campApplications } = useCampSelector()
  const dispatch = useAppDispatch()
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set())
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [expandedYears, setExpandedYears] = useState(new Set())

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

  // Group applications by year
  const applicationsByYear = useMemo(() => {
    const grouped = campApplications?.reduce((acc: any, application: any) => {
      const year = new Date(application.createdAt).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(application)
      return acc
    }, {})

    // Sort years in descending order (newest first)
    return Object.keys(grouped || {})
      .sort((a, b) => Number(b) - Number(a))
      .reduce((acc: any, year) => {
        acc[year] = grouped[year]
        return acc
      }, {})
  }, [campApplications])

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(year)) {
        newSet.delete(year)
      } else {
        newSet.add(year)
      }
      return newSet
    })
  }

  const handleSelectAllInYear = (year: string) => {
    const yearApplications = applicationsByYear[year]
    const yearIds = yearApplications.map((app: any) => app.id)
    const allSelected = yearIds.every((id: string) => selectedApplications.has(id))

    setSelectedApplications((prev) => {
      const newSet = new Set(prev)
      if (allSelected) {
        yearIds.forEach((id: string) => newSet.delete(id))
      } else {
        yearIds.forEach((id: string) => newSet.add(id))
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen p-6">
      <div className="">
        {/* Header Actions */}
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

        <>
          {/* Table */}
          <div className="bg-neutral-900/50 rounded-xl shadow-sm border border-neutral-800 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-neutral-800">
              <h2 className="text-lg sm:text-xl font-semibold text-white">All Applications</h2>
            </div>

            <div className="overflow-x-auto">
              {Object.entries(applicationsByYear).map(([year, applications]: [string, any]) => {
                const isExpanded = expandedYears.has(year)
                const yearIds = applications.map((app: any) => app.id)
                const selectedInYear = yearIds.filter((id: string) => selectedApplications.has(id)).length
                const isAllYearSelected = selectedInYear === yearIds.length && yearIds.length > 0
                const isIndeterminate = selectedInYear > 0 && selectedInYear < yearIds.length

                return (
                  <div key={year} className="border-b border-neutral-800 last:border-b-0">
                    {/* Year Header */}
                    <div
                      className="bg-neutral-950/50 px-4 sm:px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-neutral-900/50 transition-colors"
                      onClick={() => toggleYear(year)}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
                        </motion.div>
                        <h3 className="text-base sm:text-lg font-bold text-white">{year}</h3>
                        <span className="text-xs sm:text-sm text-neutral-400">({applications.length})</span>
                        {selectedInYear > 0 && (
                          <span className="text-xs text-blue-400 font-medium hidden sm:inline">
                            {selectedInYear} selected
                          </span>
                        )}
                      </div>

                      <motion.label
                        className="relative flex items-center cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isAllYearSelected}
                          ref={(input) => {
                            if (input) input.indeterminate = isIndeterminate
                          }}
                          onChange={() => handleSelectAllInYear(year)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                            isAllYearSelected
                              ? 'bg-blue-600 border-blue-600'
                              : isIndeterminate
                              ? 'bg-blue-100 border-blue-400'
                              : 'border-neutral-600 hover:border-blue-400'
                          }`}
                        >
                          {isAllYearSelected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              <Check size={12} className="text-white" />
                            </motion.div>
                          )}
                          {isIndeterminate && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-0.5 bg-blue-600 rounded"
                            />
                          )}
                        </div>
                      </motion.label>
                    </div>

                    {/* Applications Table */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[640px]">
                              <thead className="bg-neutral-950">
                                <tr>
                                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                    Select
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                    First Name
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                    Last Name
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                    Student Email
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                    Date
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-neutral-900/50 divide-y divide-neutral-800">
                                {applications.map((application: any, index: number) => (
                                  <motion.tr
                                    key={application.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                    className="hover:bg-neutral-700/50 transition-colors"
                                  >
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
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
                                          {selectedApplications.has(application.id) && (
                                            <Check size={10} className="text-white" />
                                          )}
                                        </div>
                                      </motion.label>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                      <p className="text-xs sm:text-sm font-medium text-white">
                                        {application.student.firstName}
                                      </p>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                      <p className="text-xs sm:text-sm font-medium text-white">
                                        {application.student.lastName}
                                      </p>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                      <p className="text-xs sm:text-sm font-medium text-white truncate max-w-[200px]">
                                        {application.student.studentEmailAddress}
                                      </p>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                      <span className="text-xs sm:text-sm text-neutral-400">
                                        {formatDateShort(application.createdAt)}
                                      </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </>

        {/* Empty State (if no sponsors) */}
        {noCampApplications && (
          <EmptyState searchQuery="" typeFilter="all" title="Camp Application" advice="" func={() => {}} action="" />
        )}
      </div>
    </div>
  )
}

export default CampApplications
