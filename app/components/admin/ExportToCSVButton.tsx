import React, { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Check } from 'lucide-react'
import { CampStatePayload } from '@/app/redux/features/campSlice'

const ExportToCSVButton: FC<{ campApplications: CampStatePayload[] }> = ({ campApplications }) => {
  const [isExporting, setIsExporting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const convertToCSV = (data: any) => {
    if (!data || data.length === 0) return ''

    // Define headers based on the CampApplication model
    const headers = [
      'Application ID',
      'Student ID',
      'Student First Name',
      'Student Last Name',
      'Grade',
      'School',
      'Student Email',
      'Student Phone',
      'Address ID',
      'Address Line 1',
      'Address Line 2',
      'City',
      'State',
      'ZIP/Postal Code',
      'Parent ID',
      'Parent First Name',
      'Parent Last Name',
      'Relationship to Student',
      'Parent Email',
      'Parent Phone',
      'Consent',
      'Music Teacher',
      'Strings',
      'Brass and Percussion',
      'Woodwinds',
      'Referral Source',
      'Created At',
      'Updated At'
    ]

    // Convert data to CSV rows
    const rows = data.map((app: any) => [
      app.id || '',
      app.student?.id || '',
      app.student?.firstName || '',
      app.student?.lastName || '',
      app.student?.grade || '',
      app.student?.school || '',
      app.student?.studentEmailAddress || '',
      app.student?.studentPhoneNumber || '',
      app.address?.id || '',
      app.address?.addressLine1 || '',
      app.address?.addressLine2 || '',
      app.address?.city || '',
      app.address?.state || '',
      app.address?.zipPostalCode || '',
      app.parent?.id || '',
      app.parent?.firstName || '',
      app.parent?.lastName || '',
      app.parent?.relationshipToStudent || '',
      app.parent?.parentEmailAddress || '',
      app.parent?.parentPhoneNumber || '',
      app.consent ? 'Yes' : 'No',
      app.musicTeacher || '',
      app.strings || '',
      app.brassAndPercussion || '',
      app.woodwinds || '',
      app.referralSource || '',
      app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '',
      app.updatedAt ? new Date(app.updatedAt).toLocaleDateString() : ''
    ])

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map((row) => row.map((field: any) => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    return csvContent
  }

  const downloadCSV = (csvContent: any, filename: any) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const csvContent = convertToCSV(campApplications)
    const filename = `camp_applications_${new Date().toISOString().split('T')[0]}.csv`

    downloadCSV(csvContent, filename)

    setIsExporting(false)
    setIsComplete(true)

    // Reset complete state after 2 seconds
    setTimeout(() => setIsComplete(false), 2000)
  }

  return (
    <motion.button
      onClick={handleExport}
      disabled={isExporting}
      className={`
              relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-white
              transition-all duration-300 transform
              ${
                isComplete
                  ? 'bg-green-500 shadow-lg shadow-green-200'
                  : isExporting
                  ? 'bg-blue-400 shadow-lg shadow-blue-200'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100 hover:shadow-2xl hover:shadow-blue-300'
              }
            `}
      whileHover={
        !isExporting && !isComplete
          ? {
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
            }
          : {}
      }
      whileTap={!isExporting && !isComplete ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center gap-3"
        animate={isExporting ? { x: [0, 5, -5, 0] } : {}}
        transition={{ duration: 0.5, repeat: isExporting ? Infinity : 0 }}
      >
        <motion.div
          animate={isComplete ? { scale: [1, 1.2, 1], rotate: [0, 360, 360] } : isExporting ? { rotate: 360 } : {}}
          transition={
            isComplete
              ? { duration: 0.6, ease: 'easeInOut' }
              : { duration: 1, repeat: isExporting ? Infinity : 0, ease: 'linear' }
          }
        >
          {isComplete ? <Check size={20} /> : <Download size={20} />}
        </motion.div>

        <motion.span
          key={isComplete ? 'complete' : isExporting ? 'exporting' : 'export'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {isComplete ? 'Export Complete!' : isExporting ? 'Exporting...' : 'Export to CSV'}
        </motion.span>
      </motion.div>

      {/* {isExporting && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white bg-opacity-30 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      )}


      {isComplete && (
        <motion.div
          className="absolute inset-0 bg-white bg-opacity-20 rounded-xl"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )} */}
    </motion.button>
  )
}

export default ExportToCSVButton
