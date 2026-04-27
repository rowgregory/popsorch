'use client'

import { ChangeEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Mail, Calendar, X, Loader2 } from 'lucide-react'
import { IQuestion } from '@/app/types/entities/question'
import { updateQuestion } from '@/app/actions/deprecated/updateQuestion'
import { formatDate } from '@/app/utils/date.functions'
import { useAppDispatch } from '@/app/redux/store'
import { showToast } from '@/app/redux/features/toastSlice'
import { useRouter } from 'next/navigation'

interface SwitchProps {
  enabled: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  isLoading?: boolean
  name: string
}

export function Switch({ enabled, onChange, isLoading, name }: SwitchProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={enabled}
        onChange={onChange}
        disabled={isLoading}
        className="sr-only"
      />
      <div
        className={`relative w-11 h-6 transition-colors duration-200 ${
          enabled ? 'bg-primary-dark' : 'bg-button-dark border border-border-dark'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-3.5 h-3.5 text-text-dark animate-spin" />
          </div>
        ) : (
          <div
            className={`absolute top-1 w-4 h-4 bg-text-dark transition-all duration-200 ${
              enabled ? 'left-6' : 'left-1'
            }`}
          />
        )}
      </div>
    </label>
  )
}

export default function AdminContactSubmissionsClient({ data }) {
  const { noQuestions, questions } = data
  const dispatch = useAppDispatch()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const router = useRouter()
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(null)

  const handleToggleResolved = async (e: React.ChangeEvent<HTMLInputElement>, questionId: string) => {
    e.stopPropagation()
    setLoadingId(questionId)

    const res = await updateQuestion(questionId)

    if (res.success) {
      dispatch(showToast({ type: 'success', message: 'Question updated successfully!' }))
      router.refresh()
    } else {
      dispatch(showToast({ type: 'error', message: 'Failed to update question' }))
    }

    setLoadingId(null)
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-dark border-b border-border-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-dark font-quicksand">Contact Submissions</h1>
              <p className="text-muted-dark text-sm sm:text-base mt-1">
                Use the toggle on each card to track which inquiries you&apos;ve responded to.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Message Modal */}
      {selectedQuestion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedQuestion(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface-dark border border-border-dark p-6 max-w-lg w-full shadow-xl"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-text-dark font-semibold text-lg font-quicksand">{selectedQuestion.name}</h3>
                <div className="flex items-center gap-2 text-muted-dark text-sm mt-1">
                  <Mail className="w-3.5 h-3.5" />
                  {selectedQuestion.email}
                </div>
              </div>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="text-muted-dark hover:text-text-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-border-dark mb-4" />

            {/* Full Message */}
            <p className="text-muted-dark text-sm leading-relaxed whitespace-pre-wrap">{selectedQuestion.message}</p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border-dark">
              <div className="flex items-center gap-2 text-muted-dark text-xs">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(selectedQuestion.createdAt)}
              </div>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="px-4 py-2 bg-button-dark hover:bg-button-hover-dark text-text-dark text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!noQuestions && questions?.length > 0 ? (
          <div className="bg-surface-dark border border-border-dark overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-border-dark">
              <h2 className="text-lg sm:text-xl font-semibold text-text-dark font-quicksand">All Submissions</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-dark bg-bg-dark">
                    <th className="text-left px-6 py-4 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-dark">
                      Name
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-dark">
                      Email
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-dark hidden md:table-cell">
                      Message
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-dark hidden xl:table-cell">
                      Date
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-mono tracking-[0.2em] uppercase text-muted-dark">
                      Responded
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {questions?.map((question: IQuestion, index: number) => (
                    <motion.tr
                      key={question.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border-dark last:border-0 hover:bg-button-dark transition-colors"
                    >
                      {/* Name */}
                      <td className="px-6 py-4">
                        <p className="text-text-dark font-medium text-sm truncate max-w-35">{question.name}</p>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-muted-dark text-sm">
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-45">{question.email}</span>
                        </div>
                      </td>

                      {/* Message */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <button
                          onClick={() => setSelectedQuestion(question)}
                          className="text-muted-dark text-sm truncate max-w-65 hover:text-text-dark transition-colors text-left"
                        >
                          {question.message}
                        </button>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 hidden xl:table-cell">
                        <div className="flex items-center gap-2 text-muted-dark text-xs whitespace-nowrap">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          {formatDate(question.createdAt)}
                        </div>
                      </td>

                      {/* Toggle */}
                      <td className="px-6 py-4">
                        <Switch
                          enabled={question.hasResponded}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleToggleResolved(e, question.id)}
                          isLoading={loadingId === question.id}
                          name="hasResponded"
                        />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-surface-dark border border-border-dark p-12 flex flex-col items-center justify-center"
          >
            <MessageSquare className="w-16 h-16 text-muted-dark mb-4" />
            <p className="text-text-dark text-lg font-semibold mb-2 font-quicksand">No submissions yet</p>
            <p className="text-muted-dark text-sm">Questions from your contact form will appear here</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
