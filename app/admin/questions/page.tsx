'use client'

import { ChangeEvent, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Mail, Calendar, CheckCircle, XCircle, Trash2, ChevronDown, Loader2 } from 'lucide-react'
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
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

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
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold text-white mb-2">Contact Form Submissions</h1>
        <p className="text-neutral-400">Manage questions and inquiries from your contact form</p>
      </motion.div>

      {/* Questions Cards */}
      {!noQuestions && questions?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {questions?.map((question: IQuestion, index: number) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all"
            >
              {/* Card Header */}
              <div
                onClick={() => setExpandedId(expandedId === question.id ? null : question.id)}
                className="p-6 cursor-pointer hover:bg-neutral-800/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{question.name}</h3>
                    <div className="flex items-center gap-2 text-neutral-400 text-sm mb-3">
                      <Mail className="w-4 h-4" />
                      {question.email}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Status Badge */}
                    {question.hasResponded ? (
                      <span className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Responded
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-medium">
                        <XCircle className="w-4 h-4" />
                        Pending
                      </span>
                    )}

                    {/* Toggle Responded Checkbox */}
                    <Switch
                      enabled={question.hasResponded}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleToggleResolved(e, question.id)}
                      isLoading={loadingId === question.id}
                      name="hasResponded"
                      color="bg-sunburst"
                    />

                    {/* Expand Icon */}
                    <motion.div
                      animate={{ rotate: expandedId === question.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-neutral-400" />
                    </motion.div>
                  </div>
                </div>

                <p className="text-neutral-300 text-sm line-clamp-2">{question.message}</p>

                <div className="flex items-center gap-2 text-neutral-400 text-xs mt-4">
                  <Calendar className="w-4 h-4" />
                  {formatDate(question.createdAt)}
                </div>
              </div>

              {/* Expanded Message */}
              <AnimatePresence>
                {expandedId === question.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-neutral-800 bg-neutral-950/50 px-6 py-4"
                  >
                    <p className="text-sm text-neutral-400 mb-4">
                      <span className="text-neutral-300 font-semibold">Full Message:</span>
                    </p>
                    <p className="text-neutral-300 text-sm leading-relaxed mb-6">{question.message}</p>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(question.id)}
                      disabled={deletingId === question.id}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    >
                      {deletingId === question.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
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
  )
}
