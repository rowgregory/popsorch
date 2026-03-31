'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Check, Eye, ChevronRight, ExternalLink } from 'lucide-react'
import AdminDeleteCampApplicationsModal from '@/app/components/modals/AdminDeleteCampApplicationsModal'
import { formatDateShort } from '@/app/lib/utils/dateUtils'
import { setOpenCampApplicationDrawer } from '@/app/redux/features/campSlice'
import { setInputs } from '@/app/redux/features/formSlice'
import EmptyState from '@/app/components/common/EmptyState'
import { toggleSiteSetting } from '@/app/actions/toggleSiteSetting'
import { useRouter } from 'next/navigation'
import { store } from '@/app/redux/store'
import MotionLink from '../common/MotionLink'

const CampApplicationsClient = ({ data, setting }) => {
  const router = useRouter()
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set())
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [expandedYears, setExpandedYears] = useState(new Set())

  const campApplications = data?.campApplications
  const noCampApplications = data?.noCampApplications

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
      .map((year) => ({ year, applications: grouped[year] }))
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
    const { applications } = applicationsByYear.find((a) => a.year === year)!
    const yearIds = applications.map((app: any) => app.id)
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

  const handleToggleSiteSettings = async () => {
    setIsToggling(true)
    await toggleSiteSetting('campApplicationsEnabled', !setting?.value)
    router.refresh()
    setIsToggling(false)
  }

  return (
    <div className="min-h-[calc(100vh-66px)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-navbar-dark border-b border-border-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-dark">Camp Applications</h1>
              <p className="text-muted-dark text-sm sm:text-base mt-1">
                Review and manage youth music camp applications
              </p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={!isToggling ? { scale: 1.02 } : {}}
                whileTap={!isToggling ? { scale: 0.98 } : {}}
                onClick={handleToggleSiteSettings}
                disabled={isToggling}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                  setting?.value
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                    : 'bg-surface-dark border-border-dark text-muted-dark hover:bg-button-dark'
                }`}
              >
                {isToggling ? (
                  <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className={`w-1.5 h-1.5 rounded-full ${setting?.value ? 'bg-emerald-400' : 'bg-muted-dark'}`} />
                )}
                {setting?.value ? 'Published' : 'Unpublished'}
              </motion.button>

              <MotionLink
                href="/camp-application"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border bg-surface-dark border-border-dark text-muted-dark hover:bg-button-dark transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Page
              </MotionLink>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Bulk Selection Bar */}
        <AnimatePresence>
          {selectedApplications.size > 0 && (
            <div className="flex flex-col gap-4 sticky top-0 z-20 bg-bg-dark/80 backdrop-blur-sm py-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="flex items-center justify-between bg-primary-light/10 border border-primary-light/30 px-4 py-3"
              >
                <span className="text-sm font-medium text-primary-dark">{selectedApplications.size} selected</span>
                <motion.button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isDeleting}
                  className="flex items-center gap-2 px-3 py-2 bg-primary-light hover:bg-secondary-light disabled:opacity-50 text-text-dark text-sm font-medium transition-colors"
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
          <div className="bg-surface-dark border border-border-dark overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-border-dark">
              <h2 className="text-lg sm:text-xl font-semibold text-text-dark">All Applications</h2>
            </div>

            <div className="overflow-x-auto">
              {applicationsByYear.map(({ year, applications }) => {
                const isExpanded = expandedYears.has(year)
                const yearIds = applications.map((app: any) => app.id)
                const selectedInYear = yearIds.filter((id: string) => selectedApplications.has(id)).length
                const isAllYearSelected = selectedInYear === yearIds.length && yearIds.length > 0
                const isIndeterminate = selectedInYear > 0 && selectedInYear < yearIds.length

                return (
                  <div key={year} className="border-b border-border-dark last:border-b-0">
                    {/* Year Header */}
                    <div
                      className="bg-bg-dark px-4 sm:px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-button-dark transition-colors"
                      onClick={() => toggleYear(year)}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-dark" />
                        </motion.div>
                        <h3 className="text-base sm:text-lg font-bold text-text-dark">{year}</h3>
                        <span className="text-xs sm:text-sm text-muted-dark">({applications.length})</span>
                        {selectedInYear > 0 && (
                          <span className="text-xs text-primary-dark font-medium hidden sm:inline">
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
                          className={`w-5 h-5 border-2 flex items-center justify-center transition-all duration-200 ${
                            isAllYearSelected
                              ? 'bg-primary-light border-primary-light'
                              : isIndeterminate
                                ? 'bg-primary-light/20 border-primary-dark'
                                : 'border-border-dark hover:border-primary-dark'
                          }`}
                        >
                          {isAllYearSelected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              <Check size={12} className="text-text-dark" />
                            </motion.div>
                          )}
                          {isIndeterminate && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-0.5 bg-primary-dark"
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
                            <table className="w-full min-w-160">
                              <thead className="bg-bg-dark">
                                <tr>
                                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-muted-dark uppercase tracking-wider">
                                    Select
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-muted-dark uppercase tracking-wider">
                                    First Name
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-muted-dark uppercase tracking-wider">
                                    Last Name
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-muted-dark uppercase tracking-wider">
                                    Student Email
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-muted-dark uppercase tracking-wider">
                                    Date
                                  </th>
                                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-muted-dark uppercase tracking-wider">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-surface-dark divide-y divide-border-dark">
                                {applications.map((application: any, index: number) => (
                                  <motion.tr
                                    key={application.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.02 }}
                                    className="hover:bg-button-dark transition-colors"
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
                                          className={`w-4 h-4 border-2 flex items-center justify-center transition-all ${
                                            selectedApplications.has(application.id)
                                              ? 'bg-primary-light border-primary-light'
                                              : 'border-border-dark hover:border-primary-dark'
                                          }`}
                                        >
                                          {selectedApplications.has(application.id) && (
                                            <Check size={10} className="text-text-dark" />
                                          )}
                                        </div>
                                      </motion.label>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                      <p className="text-xs sm:text-sm font-medium text-text-dark">
                                        {application.student.firstName}
                                      </p>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                      <p className="text-xs sm:text-sm font-medium text-text-dark">
                                        {application.student.lastName}
                                      </p>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                      <p className="text-xs sm:text-sm font-medium text-text-dark truncate max-w-50">
                                        {application.student.studentEmailAddress}
                                      </p>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                      <span className="text-xs sm:text-sm text-muted-dark">
                                        {formatDateShort(application.createdAt)}
                                      </span>
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                      <button
                                        onClick={() => {
                                          store.dispatch(setInputs({ formName: 'campForm', data: application }))
                                          store.dispatch(setOpenCampApplicationDrawer())
                                        }}
                                        className="p-2 text-muted-dark hover:text-primary-dark hover:bg-primary-light/10 transition-colors"
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

        {noCampApplications && (
          <EmptyState searchQuery="" typeFilter="all" title="Camp Application" advice="" func={() => {}} action="" />
        )}
      </div>
    </div>
  )
}

export default CampApplicationsClient
