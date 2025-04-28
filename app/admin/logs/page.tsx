'use client'

import PageTitle from '@/app/components/admin/PageTitle'
import Spinner from '@/app/components/common/Spinner'
import { RootState, useAppSelector } from '@/app/redux/store'
import { formatDate } from '@/app/utils/date.functions'
import React, { useState } from 'react'

const Logs = () => {
  const { logs } = useAppSelector((state: RootState) => state.log)
  const { loading, logCount } = useAppSelector((state: RootState) => state.app)

  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const handleRowClick = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id))
  }

  const renderMetadata = (metadata: any) => {
    if (!metadata) return null

    let json = ''
    try {
      json = JSON.stringify(metadata, null, 2)
    } catch {
      return <pre className="text-red-400">Invalid JSON</pre>
    }

    return (
      <pre className="text-sm text-zinc-100 p-3 rounded-md overflow-x-auto leading-6 font-mono whitespace-pre-wrap">
        {json.split('\n').map((line, i) => {
          return (
            <div key={i}>
              {line.split(/(".*?"|\btrue\b|\bfalse\b|\bnull\b|-?\d+(\.\d+)?)/g).map((part, j) => {
                // Check if the part is a key (inside quotes) and style it as blue
                if (/^".*"$/.test(part) && !/[:,]$/.test(part)) {
                  return (
                    <span key={j} className="text-sky-400">
                      {part.slice(1, -1)} {/* Remove quotes from keys */}
                    </span>
                  )
                }

                // Check if the part is a string value (inside quotes) and style it as green
                else if (/^".*"$/.test(part)) {
                  return (
                    <span key={j} className="text-green-400">
                      {part} {/* Keep quotes for string values */}
                    </span>
                  )
                }

                // Boolean true/false
                else if (part === 'true' || part === 'false') {
                  return (
                    <span key={j} className="text-rose-400">
                      {part}
                    </span>
                  )
                }

                // Null values
                else if (part === 'null') {
                  return (
                    <span key={j} className="text-zinc-500 italic">
                      {part}
                    </span>
                  )
                }

                // Numbers
                else if (/^-?\d+(\.\d+)?$/.test(part)) {
                  return (
                    <span key={j} className="text-amber-300">
                      {part}
                    </span>
                  )
                }

                // For anything else, just return as plain text
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

  return (
    <>
      <div className="flex gap-y-10 760:gap-y-0 flex-col 760:flex-row 760:items-center gap-x-3 mb-20">
        <PageTitle title="Logs" color="bg-fuchsia-500" />
        <h1 className="text-fuchsia-500 font-semibold text-2xl">({logCount})</h1>
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center pt-10">
          <Spinner wAndH="w-10 h-10" fill="fill-fuchsia-500" track="text-duskgray" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-[1fr_2fr_5fr_1fr_auto] gap-x-4 rounded-md py-2 pr-2 mb-3 text-sm text-zinc-400 font-semibold min-w-[700px]">
            <div className="w-16 pl-3">Level</div>
            <div className="min-w-[200px]">Date & Time</div>
            <div className="min-w-[280px] truncate">Message</div>
            <div className="min-w-[40px]"></div>
          </div>
          <div className="flex flex-col gap-y-3 min-w-[700px]">
            {logs?.map(
              (log: { id: string; level: string; message: string; metadata: string | object; createdAt: string }) => (
                <div key={log.id}>
                  <div
                    className="grid grid-cols-[1fr_2fr_5fr_1fr_auto] gap-x-4 py-2 text-sm text-zinc-300 cursor-pointer font-lato duration-300 hover:bg-midnightblack"
                    onClick={() => handleRowClick(log.id)}
                  >
                    <div className={`${log.level === 'info' ? 'text-lime-500' : 'text-rose-500'} pl-3 w-16`}>
                      {log.level}
                    </div>
                    <div className="min-w-[200px] truncate">
                      {formatDate(log.createdAt, { minute: 'numeric', second: 'numeric', hour: 'numeric' })}
                    </div>
                    <div className="min-w-[280px] truncate">{log.message}</div>
                    <div className={`${log.level === 'info' ? 'text-lime-500' : 'text-rose-500'} min-w-[40px]`}>
                      {expandedRow === log.id ? '▲' : '▼'}
                    </div>
                  </div>

                  {expandedRow === log.id && (
                    <div className="p-4 border-l-4 border-fuchsia-500 bg-midnightblack">
                      {renderMetadata(log.metadata)}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Logs
