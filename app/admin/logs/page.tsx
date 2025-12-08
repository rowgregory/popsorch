'use client'

import { useLogSelector } from '@/app/redux/store'
import { formatDate } from '@/app/utils/date.functions'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Clock, FileJson, FileText } from 'lucide-react'

const Logs = () => {
  const { logs } = useLogSelector()
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const handleRowClick = (id: string) => setExpandedRow((prev) => (prev === id ? null : id))

  const renderMetadata = (metadata: any) => {
    if (!metadata) return null

    let json = ''
    try {
      json = JSON.stringify(metadata, null, 2)
    } catch {
      return <pre className="text-red-400">Invalid JSON</pre>
    }

    return (
      <pre className="text-xs sm:text-sm text-white p-3 rounded-lg bg-neutral-950/50 overflow-x-auto leading-6 font-mono whitespace-pre-wrap border border-neutral-800">
        {json.split('\n').map((line, i) => {
          return (
            <div key={i}>
              {line.split(/(".*?"|\btrue\b|\bfalse\b|\bnull\b|-?\d+(\.\d+)?)/g).map((part, j) => {
                // Keys (blue)
                if (/^".*"$/.test(part) && !/[:,]$/.test(part)) {
                  return (
                    <span key={j} className="text-cyan-400">
                      {part.slice(1, -1)}
                    </span>
                  )
                }
                // String values (green)
                else if (/^".*"$/.test(part)) {
                  return (
                    <span key={j} className="text-green-400">
                      {part}
                    </span>
                  )
                }
                // Booleans
                else if (part === 'true' || part === 'false') {
                  return (
                    <span key={j} className="text-rose-400">
                      {part}
                    </span>
                  )
                }
                // Null
                else if (part === 'null') {
                  return (
                    <span key={j} className="text-neutral-500 italic">
                      {part}
                    </span>
                  )
                }
                // Numbers
                else if (/^-?\d+(\.\d+)?$/.test(part)) {
                  return (
                    <span key={j} className="text-amber-400">
                      {part}
                    </span>
                  )
                }
                // Plain text
                else {
                  return <span key={j}>{part}</span>
                }
              })}
            </div>
          )
        })}
      </pre>
    )
  }

  const getLevelBadge = (level: string) => {
    if (level === 'info') {
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    } else if (level === 'error') {
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    } else if (level === 'warn') {
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
    return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Logs List */}
      <div className="space-y-3">
        {logs?.map(
          (
            log: { id: string; level: string; message: string; metadata: string | object; createdAt: string },
            index: number
          ) => {
            const isExpanded = expandedRow === log.id

            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl hover:border-neutral-700/70 transition-all duration-300 shadow-xl overflow-hidden"
              >
                {/* Log Row */}
                <div
                  onClick={() => handleRowClick(log.id)}
                  className="p-4 cursor-pointer hover:bg-neutral-800/30 transition-colors"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Level Badge */}
                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getLevelBadge(
                          log.level
                        )}`}
                      >
                        {log.level}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="text-sm sm:text-base font-medium text-white line-clamp-2">{log.message}</p>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown
                            className={`w-5 h-5 ${log.level === 'info' ? 'text-green-400' : 'text-red-400'}`}
                          />
                        </motion.div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {formatDate(log.createdAt, { minute: 'numeric', second: 'numeric', hour: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Metadata */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-neutral-800"
                    >
                      <div className="p-4 bg-neutral-900/50">
                        <div className="flex items-center gap-2 mb-3">
                          <FileJson className="w-4 h-4 text-neutral-400" />
                          <h4 className="text-sm font-semibold text-neutral-300">Metadata</h4>
                        </div>
                        {renderMetadata(log.metadata)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          }
        )}
      </div>

      {/* Empty State */}
      {logs?.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-12 text-center shadow-xl"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-neutral-800/50 flex items-center justify-center">
              <FileText className="w-8 h-8 text-neutral-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">No Logs Found</h3>
              <p className="text-sm text-neutral-400">System logs will appear here when available.</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Logs
