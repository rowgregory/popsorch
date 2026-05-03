'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ChevronRight, Loader2, ArrowLeft, Save, Database } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Page } from '@prisma/client'
import { store } from '@/app/redux/store'
import { showToast } from '@/app/redux/features/toastSlice'
import { updatePageContent } from '@/app/lib/actions/page/updatePageContent'
import { seedPages } from '@/app/lib/actions/page/seedPages'
import { LogoutButton } from '../common/LogoutButton'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PageField {
  id: string
  type: 'text' | 'textarea' | 'array'
  label: string
  value: string | string[]
  section: string
}

// ─── Field ────────────────────────────────────────────────────────────────────

function FieldInput({ field, onChange }: { field: PageField; onChange: (value: string | string[]) => void }) {
  const inputCls = `w-full px-3 py-2.5 bg-bg-dark border text-text-dark text-sm placeholder:text-muted-dark/30 focus:outline-none focus:border-primary-dark transition-colors resize-none border-border-dark opacity-60`

  if (field.type === 'array' && Array.isArray(field.value)) {
    return (
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">{field.label}</label>
        </div>
        <div className="space-y-1.5">
          {(field.value as string[]).map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const next = [...(field.value as string[])]
                  next[i] = e.target.value
                  onChange(next)
                }}
                className={inputCls}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">{field.label}</label>
      </div>
      {field.type === 'textarea' ? (
        <textarea
          value={field.value as string}
          rows={4}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={field.value as string}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      )}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

function SectionBlock({
  title,
  fields,
  onFieldChange
}: {
  title: string
  fields: PageField[]
  onFieldChange: (id: string, value: string | string[]) => void
}) {
  const [open, setOpen] = useState(true)

  return (
    <div className="border border-border-dark">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-surface-dark hover:bg-button-dark transition-colors text-left focus-visible:outline-none"
      >
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronRight className="w-3.5 h-3.5 text-muted-dark" />
        </motion.div>
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-text-dark">{title}</span>
        <span className="text-[9px] font-mono text-muted-dark/40">({fields.length})</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-4 space-y-5 border-t border-border-dark">
              {fields.map((field) => (
                <FieldInput key={field.id} field={field} onChange={(value) => onFieldChange(field.id, value)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// PageFieldEditor — owns content state, no useEffect needed
function PageFieldEditor({ page, onContentChange }: { page: Page; onContentChange: (content: PageField[]) => void }) {
  const [content, setContent] = useState<PageField[]>(page.content as unknown as PageField[])

  const updateField = (id: string, value: string | string[]) => {
    setContent((prev) => {
      const next = prev.map((f) => (f.id === id ? { ...f, value } : f))
      onContentChange(next) // keep ref in sync
      return next
    })
  }

  const sections = Array.from(new Set(content.map((f) => f.section)))

  return (
    <div className="p-4 space-y-3">
      {sections.map((section, i) => (
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
        >
          <SectionBlock
            title={section}
            fields={content.filter((f) => f.section === section)}
            onFieldChange={updateField}
          />
        </motion.div>
      ))}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PageContentEditorClient({ pages, slug }: { pages: Page[]; slug?: string }) {
  const router = useRouter()
  const [selectedPage, setSelectedPage] = useState<Page | null>(pages.find((p) => p.slug === slug) ?? null)
  const [saving, setSaving] = useState(false)

  const contentRef = useRef<PageField[]>([])

  const handleSave = async () => {
    if (!selectedPage) return
    setSaving(true)

    const res = await updatePageContent(selectedPage.id, contentRef.current)

    setSaving(false)

    if (res.success) {
      store.dispatch(showToast({ type: 'success', message: `${selectedPage.slug} saved!` }))
      router.refresh()
    } else {
      store.dispatch(showToast({ type: 'error', message: res.error ?? 'Failed to save' }))
    }
  }

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
          <FileText className="w-3.5 h-3.5 text-primary-dark" aria-hidden="true" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">Page Content Editor</span>
          {selectedPage && (
            <>
              <span className="text-[9px] font-mono text-border-dark">·</span>
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-text-dark">
                {selectedPage.slug}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {selectedPage && (
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-1.5 bg-primary-dark hover:bg-secondary-light text-white text-[9px] font-mono tracking-[0.15em] uppercase transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
            >
              {saving ? (
                <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
              ) : (
                <Save className="w-3 h-3" aria-hidden="true" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          )}
          <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
          <button
            type="button"
            onClick={async () => {
              await seedPages()
              router.refresh()
            }}
            className="text-muted-dark hover:text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
            aria-label="Seed"
          >
            <Database className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
          <LogoutButton />
        </div>
      </div>

      {/* ── Note ── */}
      <div className="shrink-0 border-b border-yellow-500/20 bg-yellow-500/5 px-4 py-2 flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" aria-hidden="true" />
        <p className="text-[9px] font-mono text-yellow-400/80">
          Select a page on the left, make your changes, then hit <span className="text-yellow-400">Save Changes</span>{' '}
          in the top bar.
        </p>
      </div>

      {/* ── Two Column Body ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── Left — Page List ── */}
        <div className="w-52 xl:w-64 shrink-0 border-r border-border-dark overflow-y-auto">
          <div className="px-3 py-2.5 border-b border-border-dark sticky top-0 bg-bg-dark z-10">
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">Pages</span>
          </div>

          {pages.length === 0 ? (
            <div className="px-3 py-6 text-center">
              <p className="text-muted-dark/50 text-[10px]">No pages found.</p>
            </div>
          ) : (
            pages.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => setSelectedPage(page)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 border-b border-border-dark/40 last:border-0 text-left transition-colors focus-visible:outline-none ${
                  selectedPage?.id === page.id
                    ? 'bg-primary-dark/10 border-l-2 border-l-primary-dark text-text-dark'
                    : 'hover:bg-surface-dark text-muted-dark hover:text-text-dark'
                }`}
              >
                <FileText className="w-3 h-3 shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-mono truncate">{page.slug}</span>
              </button>
            ))
          )}
        </div>

        {/* ── Right — Field Editor ── */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          {!selectedPage ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <FileText className="w-10 h-10 text-border-dark" aria-hidden="true" />
              <p className="text-muted-dark text-sm">Select a page to edit</p>
              <p className="text-muted-dark/40 text-[10px] font-mono">
                {pages.length} page{pages.length !== 1 ? 's' : ''} available
              </p>
            </div>
          ) : (
            <PageFieldEditor
              key={selectedPage.id}
              page={selectedPage}
              onContentChange={(content) => {
                contentRef.current = content
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
