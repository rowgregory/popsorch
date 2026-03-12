'use client'

import { formatDate } from '@/app/utils/date.functions'
import { useState } from 'react'
import { ChevronDown, Clock, FileText } from 'lucide-react'

const LogsClient = ({ data }) => {
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
      <pre className="text-xs text-white p-4 bg-black overflow-x-auto leading-6 font-mono whitespace-pre-wrap border-l-2 border-blaze">
        {json.split('\n').map((line, i) => (
          <div key={i}>
            {line.split(/(".*?"|\btrue\b|\bfalse\b|\bnull\b|-?\d+(\.\d+)?)/g).map((part, j) => {
              if (/^".*"$/.test(part) && !/[:,]$/.test(part)) {
                return (
                  <span key={j} className="text-blaze">
                    {part.slice(1, -1)}
                  </span>
                )
              } else if (/^".*"$/.test(part)) {
                return (
                  <span key={j} className="text-white/70">
                    {part}
                  </span>
                )
              } else if (part === 'true' || part === 'false') {
                return (
                  <span key={j} className="text-green-400">
                    {part}
                  </span>
                )
              } else if (part === 'null') {
                return (
                  <span key={j} className="text-white/20 italic">
                    {part}
                  </span>
                )
              } else if (/^-?\d+(\.\d+)?$/.test(part)) {
                return (
                  <span key={j} className="text-white/50">
                    {part}
                  </span>
                )
              } else {
                return <span key={j}>{part}</span>
              }
            })}
          </div>
        ))}
      </pre>
    )
  }

  const getLevelStyles = (level: string) => {
    if (level === 'info') return 'text-green-400 border-green-400/20 bg-green-400/5'
    if (level === 'error') return 'text-red-400 border-red-400/20 bg-red-400/5'
    if (level === 'warn') return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5'
    return 'text-white/30 border-white/10 bg-white/5'
  }

  const getAccentColor = (level: string) => {
    if (level === 'info') return 'border-green-400/40'
    if (level === 'error') return 'border-red-400/40'
    if (level === 'warn') return 'border-yellow-400/40'
    return 'border-blaze/40'
  }

  return (
    <div className="p-4 430:p-6">
      <div className="flex flex-col gap-px bg-white/5">
        {data?.map(
          (log: { id: string; level: string; message: string; metadata: string | object; createdAt: string }) => {
            const isExpanded = expandedRow === log.id

            return (
              <div key={log.id} className="bg-black">
                {/* Log Row */}
                <button
                  type="button"
                  onClick={() => handleRowClick(log.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`log-metadata-${log.id}`}
                  className={`w-full text-left border-l-2 p-5 hover:bg-white/2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-inset ${getAccentColor(log.level)}`}
                >
                  <div className="flex items-start gap-3">
                    {/* Level badge */}
                    <span
                      className={`shrink-0 font-changa text-[10px] uppercase tracking-widest px-2 py-1 border ${getLevelStyles(log.level)}`}
                    >
                      {log.level}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="font-lato text-sm text-white/70 leading-relaxed line-clamp-2">{log.message}</p>
                        <ChevronDown
                          className={`shrink-0 w-3.5 h-3.5 text-white/20 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-white/20" aria-hidden="true" />
                        <time dateTime={log.createdAt} className="font-lato text-xs text-white/30">
                          {formatDate(log.createdAt, { hour: 'numeric', minute: 'numeric', second: 'numeric' })}
                        </time>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Metadata */}
                {isExpanded && (
                  <div
                    id={`log-metadata-${log.id}`}
                    role="region"
                    aria-label="Log metadata"
                    className="border-t border-white/5"
                  >
                    <div className="p-5 bg-black">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-4 h-px bg-blaze" aria-hidden="true" />
                        <p className="font-changa text-[10px] uppercase tracking-[0.25em] text-blaze">Metadata</p>
                      </div>
                      {renderMetadata(log.metadata)}
                    </div>
                  </div>
                )}
              </div>
            )
          }
        )}
      </div>

      {/* Empty State */}
      {data?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FileText className="w-8 h-8 text-white/10 mb-4" aria-hidden="true" />
          <p className="font-changa text-sm text-white uppercase tracking-wide mb-1">No logs found</p>
          <p className="font-lato text-xs text-white/40 max-w-xs leading-relaxed">
            System logs will appear here when available.
          </p>
        </div>
      )}
    </div>
  )
}

export default LogsClient
