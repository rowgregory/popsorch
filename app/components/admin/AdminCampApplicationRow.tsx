'use client'

import React from 'react'
import { openViewDrawer } from '@/app/redux/features/dashboardSlice'
import { createFormActions } from '@/app/redux/features/formSlice'
import { useAppDispatch } from '@/app/redux/store'
import { motion } from 'framer-motion'
import { Check, Eye } from 'lucide-react'

interface AdminCampApplicationRowProps {
  application: any
  isSelected: boolean
  onSelect: () => void
}

const AdminCampApplicationRow: React.FC<AdminCampApplicationRowProps> = ({ application, isSelected, onSelect }) => {
  const dispatch = useAppDispatch()
  const { setInputs } = createFormActions('campApplication', dispatch)

  return (
    <motion.div
      className={`
        grid grid-cols-[1fr_2fr_2fr_3fr_2fr_1fr] gap-x-4 rounded-md pl-4 py-3 pr-2 bg-midnightblack relative overflow-hidden
        transition-all duration-200 border-l-4 border-l-blue-400 text-white items-center
        ${isSelected ? 'border-l-blue-500 shadow-sm' : ''}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ boxShadow: '0 4px 20px rgba(59, 130, 246, 0.15)' }}
    >
      {/* Checkbox */}
      <div className="flex items-center">
        <motion.label
          className="relative flex items-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <input type="checkbox" checked={isSelected} onChange={onSelect} className="sr-only" />
          <div
            className={`
            w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
            ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 hover:border-blue-400'}
          `}
          >
            {isSelected && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.15 }}>
                <Check size={12} className="text-white" />
              </motion.div>
            )}
          </div>
        </motion.label>
      </div>
      {/* Application Data */}
      <div className="truncate text-sm font-medium">{application.student?.firstName || 'N/A'}</div>
      <div className="truncate text-sm">{application.student?.lastName || 'N/A'}</div>
      <div className="truncate text-sm">{application.student?.studentEmailAddress || 'N/A'}</div>
      <div className="truncate text-sm">
        {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : 'N/A'}
      </div>
      <div>
        <Eye
          onClick={() => {
            dispatch(openViewDrawer())
            setInputs(application)
          }}
          className="w-4 h-4 text-blue-400"
        />
      </div>
    </motion.div>
  )
}

export default AdminCampApplicationRow
