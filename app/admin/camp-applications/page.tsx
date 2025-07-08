'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Check } from 'lucide-react'
import { RootState, useAppSelector } from '@/app/redux/store'
import { useFetchCampApplicationsQuery } from '@/app/redux/services/campApi'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import ExportToCSVButton from '@/app/components/admin/ExportToCSVButton'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import AdminCampApplicationViewDrawer from '@/app/drawers/AdminCampApplicationViewDrawer'
import AdminCampApplicationRow from '@/app/components/admin/AdminCampApplicationRow'
import AdminDeleteCampApplicationsModal from '@/app/modals/AdminDeleteCampApplicationsModal'

const CampApplications = () => {
  const { noCampApplications, campApplicationsCount } = useAppSelector((state: RootState) => state.camp)
  const { data, isLoading } = useFetchCampApplicationsQuery(undefined) as any

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
    <div className="relative">
      <AdminCampApplicationViewDrawer />
      <div className="flex gap-y-10 760:gap-y-0 flex-col 760:flex-row 760:items-center 760:justify-between mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal
          bgcolor="bg0blue-400"
          textcolor="text-blue-400"
          title="Camp Applications"
          total={campApplicationsCount}
          loading={isLoading}
          fillcolor="fill-blue-400"
        />
        <div className="flex items-center gap-4">
          {/* Bulk Actions */}
          <AnimatePresence>
            {selectedApplications.size > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-8 py-2.5"
              >
                <span className="text-sm font-medium text-red-700">{selectedApplications.size} selected</span>
                <motion.button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isDeleting}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-medium rounded-md transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 size={14} />
                  Delete Selected
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {!noCampApplications && <ExportToCSVButton campApplications={data?.campApplications} />}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AdminDeleteCampApplicationsModal
        showDeleteConfirm={showDeleteConfirm}
        isDeleting={isDeleting}
        setShowDeleteConfirm={setShowDeleteConfirm}
        selectedApplications={selectedApplications}
        setIsDeleting={setIsDeleting}
        setSelectedApplications={setSelectedApplications}
      />

      {isLoading ? (
        <AdminPageSpinner fill="fill-blue-400" />
      ) : noCampApplications ? (
        <div className="font-sm font-lato">No Camp Applications</div>
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[1fr_2fr_2fr_3fr_2fr_1fr] gap-x-4 rounded-md pl-4 py-2 pr-2 mb-3 text-sm min-w-[650px] border-l-4 border-l-transparent">
              <div className="flex items-center">
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
                    className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                    ${
                      isAllSelected
                        ? 'bg-blue-600 border-blue-600'
                        : isIndeterminate
                        ? 'bg-blue-100 border-blue-400'
                        : 'border-gray-300 hover:border-blue-400'
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
                </motion.label>
              </div>
              <div className="whitespace-nowrap">First Name</div>
              <div className="whitespace-nowrap">Last Name</div>
              <div className="whitespace-nowrap">Student Email</div>
              <div className="whitespace-nowrap">Date Created</div>
              <div className="whitespace-nowrap">View</div>
              <div></div>
            </div>
            <div className="flex flex-col gap-y-3 min-w-[650px]">
              {data?.campApplications?.map((application: { id: string }) => (
                <AdminCampApplicationRow
                  key={application.id}
                  application={application}
                  isSelected={selectedApplications.has(application.id)}
                  onSelect={() => handleSelectApplication(application.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CampApplications
