'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MessageSquare, Plus, Loader2, Check } from 'lucide-react'
import Link from 'next/link'
import type { Testimonial } from '@prisma/client'
import { store } from '@/app/redux/store'
import { showToast } from '@/app/redux/features/toastSlice'
import { createTestimonial } from '@/app/lib/actions/testimonial/createTestimonial'
import { updateTestimonial } from '@/app/lib/actions/testimonial/updateTestimonial'
import { LogoutButton } from '../common/LogoutButton'
import { FieldLabel } from '../common/FieldLabel'

const inputCls =
  'w-full px-3 py-2.5 bg-bg-dark border border-border-dark text-text-dark text-sm placeholder:text-muted-dark/30 focus:outline-none focus:border-primary-dark transition-colors'

// ─── Editor Panel ─────────────────────────────────────────────────────────────

function EditorPanel({
  testimonial,
  isNew,
  onSaved,
  onCancel
}: {
  testimonial: Testimonial | null
  isNew: boolean
  onSaved: (t: Testimonial) => void
  onDeleted: (id: string) => void
  onCancel: () => void
}) {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    quote: testimonial?.quote ?? '',
    author: testimonial?.author ?? '',
    title: testimonial?.title ?? '',
    isPublished: testimonial?.isPublished ?? false
  })

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }))

  const handleSave = async () => {
    if (!form.quote.trim()) {
      store.dispatch(showToast({ type: 'error', message: 'Quote is required' }))
      return
    }
    if (!form.author.trim()) {
      store.dispatch(showToast({ type: 'error', message: 'Author is required' }))
      return
    }

    setLoading(true)

    const res = isNew ? await createTestimonial(form) : await updateTestimonial(testimonial!.id, form)

    setLoading(false)

    if (res.success && res.data) {
      store.dispatch(showToast({ type: 'success', message: isNew ? 'Testimonial created' : 'Testimonial updated' }))
      onSaved(res.data)
    } else {
      store.dispatch(showToast({ type: 'error', message: res.error ?? 'Something went wrong' }))
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-border-dark bg-surface-dark">
        <div className="flex items-center gap-2">
          <div className="w-3 h-px bg-primary-dark" aria-hidden="true" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary-dark">
            {isNew ? 'New Testimonial' : 'Edit Testimonial'}
          </span>
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {/* Quote */}
        <div>
          <FieldLabel htmlFor="quote" required>
            Quote
          </FieldLabel>
          <textarea
            id="quote"
            value={form.quote}
            onChange={(e) => set('quote', e.target.value)}
            placeholder="An unforgettable evening of music..."
            rows={5}
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Author */}
        <div>
          <FieldLabel htmlFor="author" required>
            Author
          </FieldLabel>
          <input
            id="author"
            type="text"
            value={form.author}
            onChange={(e) => set('author', e.target.value)}
            placeholder="Jane Smith"
            className={inputCls}
          />
        </div>

        {/* Title */}
        <div>
          <FieldLabel htmlFor="title">Title / Description</FieldLabel>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="Season Ticket Holder"
            className={inputCls}
          />
        </div>

        {/* Published */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col justify-end">
            <div className="flex items-center justify-between px-3 py-2.5 border border-border-dark bg-bg-dark">
              <span className="text-text-dark text-xs">Published</span>
              <button
                type="button"
                role="switch"
                aria-checked={form.isPublished}
                onClick={() => set('isPublished', !form.isPublished)}
                className={`relative w-9 h-4 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark ${
                  form.isPublished ? 'bg-primary-dark' : 'bg-border-dark'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-3 h-3 bg-white transition-all duration-200 ${
                    form.isPublished ? 'left-5' : 'left-0.5'
                  }`}
                />
                <span className="sr-only">{form.isPublished ? 'Published' : 'Draft'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        {(form.quote || form.author) && (
          <div className="border border-border-dark bg-bg-dark p-4">
            <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark mb-3">Preview</p>
            <blockquote className="border-l-2 border-primary-dark pl-4">
              {form.quote && (
                <p className="text-text-dark text-sm leading-relaxed italic mb-2">&quot;{form.quote}&quot;</p>
              )}
              <footer className="text-muted-dark text-xs">
                {form.author}
                {form.title && <span className="text-muted-dark/50"> · {form.title}</span>}
              </footer>
            </blockquote>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 flex gap-3 px-4 py-3 border-t border-border-dark bg-surface-dark">
        <button
          onClick={onCancel}
          className="px-4 py-2.5 border border-border-dark text-muted-dark hover:text-text-dark text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex-1 py-2.5 bg-primary-dark hover:bg-secondary-light text-white text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              Saving...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" aria-hidden="true" />
              {isNew ? 'Create' : 'Save Changes'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function TestimonialsClient({ testimonials: initial }: { testimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initial)
  const [selected, setSelected] = useState<Testimonial | null>(null)
  const [isNew, setIsNew] = useState(false)

  const handleNew = () => {
    setSelected(null)
    setIsNew(true)
  }

  const handleSelect = (t: Testimonial) => {
    setIsNew(false)
    setSelected(t)
  }

  const handleSaved = (t: Testimonial) => {
    if (isNew) {
      setTestimonials((prev) => [t, ...prev])
    } else {
      setTestimonials((prev) => prev.map((p) => (p.id === t.id ? t : p)))
    }
    setSelected(t)
    setIsNew(false)
  }

  const handleDeleted = (id: string) => {
    setTestimonials((prev) => prev.filter((p) => p.id !== id))
    setSelected(null)
    setIsNew(false)
  }

  const handleCancel = () => {
    setSelected(null)
    setIsNew(false)
  }

  const showEditor = isNew || selected !== null

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-bg-dark text-text-dark">
      {/* ── Top Bar ── */}
      <div className="shrink-0 h-11 bg-surface-dark border-b border-border-dark flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/v2/dashboard"
            className="text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
          <MessageSquare className="w-3.5 h-3.5 text-primary-dark" aria-hidden="true" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">Testimonials</span>
          <span className="text-[9px] font-mono text-muted-dark/40">({testimonials.length})</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleNew}
            className="flex items-center gap-2 px-4 py-1.5 bg-primary-dark hover:bg-secondary-light text-white text-[9px] font-mono tracking-[0.15em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
          >
            <Plus className="w-3 h-3" aria-hidden="true" />
            New
          </button>
          <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
          <LogoutButton />
        </div>
      </div>

      {/* ── Two Column Body ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── Left — List ── */}
        <div className="w-72 xl:w-80 shrink-0 border-r border-border-dark overflow-y-auto">
          {testimonials.length === 0 && !isNew ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <MessageSquare className="w-8 h-8 text-border-dark" aria-hidden="true" />
              <p className="text-muted-dark text-sm">No testimonials yet.</p>
              <button
                onClick={handleNew}
                className="text-[10px] font-mono tracking-[0.15em] uppercase text-primary-dark hover:text-secondary-dark transition-colors"
              >
                Add the first one
              </button>
            </div>
          ) : (
            testimonials.map((t, i) => (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => handleSelect(t)}
                className={`w-full flex flex-col gap-1.5 px-4 py-3.5 border-b border-border-dark/50 last:border-0 text-left transition-colors focus-visible:outline-none group ${
                  selected?.id === t.id && !isNew
                    ? 'bg-primary-dark/10 border-l-2 border-l-primary-dark'
                    : 'hover:bg-surface-dark'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-text-dark text-sm font-medium truncate group-hover:text-primary-dark transition-colors">
                    {t.author}
                  </p>
                  <span
                    className={`text-[8px] font-mono uppercase shrink-0 ${
                      t.isPublished ? 'text-emerald-400' : 'text-muted-dark/40'
                    }`}
                  >
                    {t.isPublished ? 'Live' : 'Draft'}
                  </span>
                </div>
                {t.title && <p className="text-muted-dark text-[10px]">{t.title}</p>}
                <p className="text-muted-dark/60 text-[11px] leading-relaxed line-clamp-2 italic">
                  &quot;{t.quote}&quot;
                </p>
              </motion.button>
            ))
          )}
        </div>

        {/* ── Right — Editor ── */}
        <div className="flex-1 min-w-0 relative">
          <AnimatePresence mode="wait">
            {showEditor ? (
              <motion.div
                key={isNew ? 'new' : selected?.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0"
              >
                <EditorPanel
                  testimonial={isNew ? null : selected}
                  isNew={isNew}
                  onSaved={handleSaved}
                  onDeleted={handleDeleted}
                  onCancel={handleCancel}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              >
                <MessageSquare className="w-10 h-10 text-border-dark" aria-hidden="true" />
                <p className="text-muted-dark text-sm">Select a testimonial to edit</p>
                <button
                  onClick={handleNew}
                  className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.15em] uppercase text-primary-dark hover:text-secondary-dark transition-colors focus-visible:outline-none"
                >
                  <Plus className="w-3 h-3" />
                  Add new
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
