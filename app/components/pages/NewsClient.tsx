'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Newspaper, Plus } from 'lucide-react'
import type { News } from '@prisma/client'
import { NewsEditorPanel } from '../news/NewsEditorPanel'
import { NewsTopBar } from '../news/NewsTopBar'
import { NewsListItem } from '../news/NewsListItem'

export default function NewsClient({ news: initial }: { news: News[] }) {
  const [articles, setArticles] = useState<News[]>(initial)
  const [selected, setSelected] = useState<News | null>(null)
  const [isNew, setIsNew] = useState(false)

  const handleNew = () => {
    setSelected(null)
    setIsNew(true)
  }
  const handleSelect = (n: News) => {
    setIsNew(false)
    setSelected(n)
  }

  const handleSaved = (n: News) => {
    if (isNew) {
      setArticles((prev) => [n, ...prev])
    } else {
      setArticles((prev) => prev.map((a) => (a.id === n.id ? n : a)))
    }
    setSelected(n)
    setIsNew(false)
  }

  const showEditor = isNew || selected !== null

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-bg-dark text-text-dark">
      {/* ── Top Bar ── */}
      <NewsTopBar articles={articles} handleNew={handleNew} />

      {/* ── Two Column Body ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── Left — List ── */}
        <div className="w-72 xl:w-80 shrink-0 border-r border-border-dark overflow-y-auto">
          {articles.length === 0 && !isNew ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <Newspaper className="w-8 h-8 text-border-dark" aria-hidden="true" />
              <p className="text-muted-dark text-sm">No articles yet.</p>
              <button
                onClick={handleNew}
                className="text-[10px] font-mono tracking-[0.15em] uppercase text-primary-dark hover:text-secondary-dark transition-colors"
              >
                Write the first one
              </button>
            </div>
          ) : (
            articles.map((a, i) => (
              <NewsListItem key={i} i={i} article={a} handleSelect={handleSelect} isNew={isNew} selected={selected} />
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
                <NewsEditorPanel
                  news={isNew ? null : selected}
                  isNew={isNew}
                  onSaved={handleSaved}
                  onCancel={() => {
                    setSelected(null)
                    setIsNew(false)
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              >
                <Newspaper className="w-10 h-10 text-border-dark" aria-hidden="true" />
                <p className="text-muted-dark text-sm">Select an article to edit</p>
                <button
                  onClick={handleNew}
                  className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.15em] uppercase text-primary-dark hover:text-secondary-dark transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Write new article
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
