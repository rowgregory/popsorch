'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Calendar, CheckCircle, Clock, ArrowLeft, Send, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Question } from '@prisma/client'
import { store } from '@/app/redux/store'
import { showToast } from '@/app/redux/features/toastSlice'
import { formatDate } from '@/app/utils/date.functions'
import { replyToQuestion } from '@/app/lib/actions/question/replyToQuestion'
import { updateQuestion } from '@/app/lib/actions/question/updateQuestion'

interface Props {
  question: Question | null
  onClose: () => void
}

export default function ContactSubmissionModal({ question, onClose }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [responded, setResponded] = useState(question?.hasResponded ?? false)
  const [replying, setReplying] = useState(false)
  const [replyMessage, setReplyMessage] = useState('')

  const handleToggle = async () => {
    if (!question) return
    setLoading(true)
    const res = await updateQuestion(question.id)
    setLoading(false)

    if (res.success) {
      setResponded((r) => !r)
      store.dispatch(showToast({ type: 'success', message: 'Submission updated' }))
      router.refresh()
    } else {
      store.dispatch(showToast({ type: 'error', message: 'Failed to update submission' }))
    }
  }

  const handleReply = async () => {
    if (!question || !replyMessage.trim()) return
    setLoading(true)

    const res = await replyToQuestion({
      questionId: question.id,
      toEmail: question.email,
      toName: question.name,
      originalMessage: question.message,
      replyMessage: replyMessage.trim()
    })

    setLoading(false)

    if (res.success) {
      setResponded(true)
      setReplying(false)
      setReplyMessage('')
      store.dispatch(showToast({ type: 'success', message: `Reply sent to ${question.name}` }))
      router.refresh()
    } else {
      store.dispatch(showToast({ type: 'error', message: res.error ?? 'Failed to send reply' }))
    }
  }

  return (
    <AnimatePresence>
      {question && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0, transition: { type: 'spring', damping: 28, stiffness: 300 } }}
            exit={{ y: '100%', transition: { type: 'tween', duration: 0.3, ease: 'easeIn' } }}
            className="fixed inset-x-0 bottom-0 z-50 bg-surface-dark border-t sm:inset-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md sm:border border-border-dark"
            role="dialog"
            aria-modal="true"
            aria-label="Contact submission"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 bg-border-dark" aria-hidden="true" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-4 py-3 border-b border-border-dark">
              <div className="flex items-center gap-2 min-w-0">
                {replying && (
                  <button
                    onClick={() => setReplying(false)}
                    className="text-muted-dark hover:text-text-dark transition-colors shrink-0 focus-visible:outline-none"
                    aria-label="Back"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div className="min-w-0">
                  <h2 className="font-quicksand font-black text-text-dark text-base leading-none truncate">
                    {replying ? `Reply to ${question.name}` : question.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Mail className="w-3 h-3 text-muted-dark shrink-0" aria-hidden="true" />
                    <span className="text-[10px] font-mono text-muted-dark truncate">{question.email}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-muted-dark hover:text-text-dark transition-colors ml-3 shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!replying ? (
                // ── Message view ──
                <motion.div
                  key="message"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="px-4 py-4">
                    <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark mb-2">Message</p>
                    <p className="text-text-dark text-sm leading-relaxed whitespace-pre-wrap">{question.message}</p>
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 border-t border-border-dark">
                    <div className="flex items-center gap-1.5 text-muted-dark">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      <span className="text-[9px] font-mono">{formatDate(question.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Toggle responded */}
                      <button
                        onClick={handleToggle}
                        disabled={loading}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-mono tracking-[0.15em] uppercase transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark ${
                          responded
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                            : 'border border-border-dark text-muted-dark hover:border-primary-dark hover:text-text-dark'
                        }`}
                      >
                        {responded ? (
                          <>
                            <CheckCircle className="w-3 h-3" aria-hidden="true" />
                            Responded
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            Pending
                          </>
                        )}
                      </button>

                      {/* Reply */}
                      <button
                        onClick={() => setReplying(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-dark hover:bg-secondary-light text-white text-[9px] font-mono tracking-[0.15em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
                      >
                        <Send className="w-3 h-3" aria-hidden="true" />
                        Reply
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // ── Reply view ──
                <motion.div
                  key="reply"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* Original message context */}
                  <div className="px-4 py-3 border-b border-border-dark bg-bg-dark">
                    <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark mb-1.5">
                      Their message
                    </p>
                    <p className="text-muted-dark text-xs leading-relaxed line-clamp-3">{question.message}</p>
                  </div>

                  {/* Reply textarea */}
                  <div className="px-4 py-4">
                    <label
                      htmlFor="reply-message"
                      className="block text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark mb-1.5"
                    >
                      Your Reply
                    </label>
                    <textarea
                      id="reply-message"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder={`Hi ${question.name.split(' ')[0]}, thank you for reaching out...`}
                      rows={5}
                      autoFocus
                      className="w-full px-3 py-2.5 bg-bg-dark border border-border-dark text-text-dark text-sm placeholder:text-muted-dark/30 focus:outline-none focus:border-primary-dark transition-colors resize-none"
                    />
                  </div>

                  <div className="flex gap-3 px-4 py-3 border-t border-border-dark">
                    <button
                      onClick={() => setReplying(false)}
                      className="flex-1 py-2.5 border border-border-dark text-muted-dark hover:text-text-dark text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReply}
                      disabled={loading || !replyMessage.trim()}
                      className="flex-1 py-2.5 bg-primary-dark hover:bg-secondary-light text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden="true" />
                          Send Reply
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
