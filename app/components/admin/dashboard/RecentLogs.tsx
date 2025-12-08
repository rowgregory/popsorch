'use client'

import { useDashboardSelector } from '@/app/redux/store'
import { Log } from '@prisma/client'
import { Clock, Activity, AlertCircle, Info, XCircle, CheckCircle } from 'lucide-react'

const RecentLogs = () => {
  // Filter out excluded user and limit results
  const { logs } = useDashboardSelector()

  // Group logs by date
  const groupedLogs = logs?.reduce((acc, log: Log) => {
    const dateKey = new Date(log.createdAt)
      .toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
      })
      .toUpperCase()

    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(log)
    return acc
  }, {} as Record<string, Log[]>)

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />
      case 'info':
        return <Info className="w-4 h-4 text-blue-400" />
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      default:
        return <Activity className="w-4 h-4 text-neutral-400" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'error':
        return 'border-red-500 bg-red-500/10'
      case 'warning':
        return 'border-yellow-500 bg-yellow-500/10'
      case 'info':
        return 'border-blue-500 bg-blue-500/10'
      case 'success':
        return 'border-green-500 bg-green-500/10'
      default:
        return 'border-neutral-600 bg-neutral-600/10'
    }
  }

  const getDisplayName = () => {
    return 'System'
  }

  return (
    <div className="col-span-3 bg-gradient-to-br from-neutral-900 to-black rounded-xl border border-neutral-800 shadow-2xl overflow-hidden h-fit">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-800">
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider">Recent Activity</h3>
          <p className="text-neutral-500 text-xs mt-0.5">Live system logs</p>
        </div>
      </div>

      {/* Logs List */}
      <div className="divide-y divide-neutral-800/50 max-h-[calc(100vh-500px)] overflow-y-auto">
        {Object.entries(groupedLogs).map(([date, dateLogs]) => (
          <div key={date}>
            {/* Date Separator */}
            <div className="sticky top-0 px-4 py-2 bg-neutral-900/90 backdrop-blur-sm z-10">
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{date}</p>
            </div>

            {/* Logs for this date */}
            {dateLogs.map((log) => (
              <div
                key={log.id}
                className={`group relative hover:bg-neutral-800/50 transition-all border-l-2 ${getLevelColor(
                  log.level
                )}`}
              >
                <div className="flex items-start gap-3 p-3">
                  {/* Level Icon */}
                  <div className="flex-shrink-0 mt-0.5">{getLevelIcon(log.level)}</div>

                  {/* Log Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white font-semibold text-sm truncate">{getDisplayName()}</p>
                      <span className="text-[10px] text-neutral-500 font-medium ml-2 flex-shrink-0">
                        {formatTime(log.createdAt)}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 mb-1">{log.message}</p>

                    {/* Level Badge */}
                    <span
                      className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                        log.level.toLowerCase() === 'error'
                          ? 'bg-red-500/20 text-red-300'
                          : log.level.toLowerCase() === 'warning'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : log.level.toLowerCase() === 'info'
                          ? 'bg-blue-500/20 text-blue-300'
                          : log.level.toLowerCase() === 'success'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-neutral-600/20 text-neutral-300'
                      }`}
                    >
                      {log.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {logs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <Activity className="w-12 h-12 text-neutral-700 mb-3" />
          <p className="text-neutral-500 text-sm font-medium">No recent activity</p>
          <p className="text-neutral-600 text-xs mt-1">Logs will appear here</p>
        </div>
      )}

      {/* Footer */}
      <div className="p-3 border-t border-neutral-800 bg-neutral-900/30">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-neutral-500">
            <Clock className="w-3 h-3" />
            <span>Real-time updates</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 font-semibold">Live</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentLogs
