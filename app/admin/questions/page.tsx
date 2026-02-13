'use client'

import { ChangeEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Mail, Calendar, CheckCircle, XCircle, Loader2, Trash2, X } from 'lucide-react'
import { IQuestion } from '@/app/types/entities/question'
import { updateQuestion } from '@/app/actions/updateQuestion'
import { deleteQuestion } from '@/app/actions/deleteQuestion'
import { formatDate } from '@/app/utils/date.functions'
import { useAppDispatch } from '@/app/redux/store'
import { showToast } from '@/app/redux/features/toastSlice'
import { useRouter } from 'next/navigation'
import Switch from '@/app/components/forms/elements/Switch'

export default function AdminQuestions({ data }) {
  const { noQuestions, questions } = data
  const dispatch = useAppDispatch()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(null)

  const handleToggleResolved = async (e: React.ChangeEvent<HTMLInputElement>, questionId: string) => {
    e.stopPropagation()
    setLoadingId(questionId)

    try {
      await updateQuestion(questionId)
      dispatch(
        showToast({
          type: 'success',
          message: `Question updated successfully!`
        })
      )
      router.refresh()
    } catch {
      dispatch(
        showToast({
          type: 'error',
          message: `Failed to update question`
        })
      )
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (questionId: string) => {
    setDeletingId(questionId)
    try {
      await deleteQuestion(questionId)
      dispatch(
        showToast({
          type: 'success',
          message: `Question deleted successfully!`
        })
      )
      router.refresh()
    } catch {
      dispatch(
        showToast({
          type: 'error',
          message: `Failed to delete question`
        })
      )
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
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
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-lg w-full shadow-xl"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold text-lg">{selectedQuestion.name}</h3>
                <div className="flex items-center gap-2 text-neutral-400 text-sm mt-1">
                  <Mail className="w-3.5 h-3.5" />
                  {selectedQuestion.email}
                </div>
              </div>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-800 mb-4" />

            {/* Full Message */}
            <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">{selectedQuestion.message}</p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-800">
              <div className="flex items-center gap-2 text-neutral-500 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(selectedQuestion.createdAt)}
              </div>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-white mb-2">Contact Form Submissions</h1>
          <p className="text-neutral-400">
            Use the toggle on each card to track which inquiries you&apos;ve responded to.
          </p>
        </motion.div>

        {/* Questions Table */}
        {!noQuestions && questions?.length > 0 ? (
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-950/50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider hidden md:table-cell">
                    Message
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider hidden xl:table-cell">
                    Date
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Responded
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Delete
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
                    className="border-b border-neutral-800/50 last:border-0 hover:bg-neutral-800/20 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <p className="text-white font-medium text-sm truncate max-w-35">{question.name}</p>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-neutral-400 text-sm">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate max-w-45">{question.email}</span>
                      </div>
                    </td>

                    {/* Message */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      <button
                        onClick={() => setSelectedQuestion(question)}
                        className="text-neutral-300 text-sm truncate max-w-65 hover:text-white transition-colors text-left"
                      >
                        {question.message}
                      </button>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 hidden xl:table-cell">
                      <div className="flex items-center gap-2 text-neutral-400 text-xs">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        {formatDate(question.createdAt)}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      {question.hasResponded ? (
                        <span className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-medium w-fit">
                          <CheckCircle className="w-3 h-3" />
                          Responded
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-medium w-fit">
                          <XCircle className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Toggle */}
                    <td className="px-6 py-4">
                      <Switch
                        enabled={question.hasResponded}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleToggleResolved(e, question.id)}
                        isLoading={loadingId === question.id}
                        name="hasResponded"
                        color="bg-sunburst"
                      />
                    </td>

                    {/* Delete */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(question.id)}
                        disabled={deletingId === question.id}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium"
                      >
                        {deletingId === question.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </>
                        )}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-900/50 rounded-xl border border-neutral-800 p-12 flex flex-col items-center justify-center"
          >
            <MessageSquare className="w-16 h-16 text-neutral-700 mb-4" />
            <p className="text-neutral-400 text-lg font-semibold mb-2">No submissions yet</p>
            <p className="text-neutral-600 text-sm">Questions from your contact form will appear here</p>
          </motion.div>
        )}
      </div>
    </>
  )
}
