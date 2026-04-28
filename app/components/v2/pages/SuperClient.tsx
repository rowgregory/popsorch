'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Trash2,
  RefreshCw,
  AlertCircle,
  Music,
  MapPin,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Star,
  DollarSign
} from 'lucide-react'
import type {
  CustomRequest,
  Concert,
  Venue,
  TeamMember,
  News,
  Event,
  Testimonial,
  Sponsor,
  Question,
  User,
  CustomRequestStatus
} from '@prisma/client'
import { updateCustomRequestStatus } from '@/app/lib/actions/custom-request/updateCustomerRequest'
import { store } from '@/app/redux/store'
import { showToast } from '@/app/redux/features/toastSlice'
import { LogoutButton } from '../common/LogoutButton'
import {
  deleteConcert,
  deleteEvent,
  deleteNews,
  deleteQuestion,
  deleteSponsor,
  deleteTeamMember,
  deleteTestimonial,
  deleteUser,
  deleteVenue
} from '@/app/lib/actions/super/super.actions'

interface Props {
  customRequests: CustomRequest[]
  concerts: Concert[]
  venues: Venue[]
  teamMembers: TeamMember[]
  news: News[]
  events: Event[]
  testimonials: Testimonial[]
  sponsors: Sponsor[]
  questions: Question[]
  users: User[]
  dbHealth: any
}

export default function SuperClient({
  customRequests,
  concerts,
  venues,
  teamMembers,
  news,
  events,
  testimonials,
  sponsors,
  questions,
  users,
  dbHealth
}: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleStatusChange = async (id: string, status: string) => {
    setLoading(id)
    const res = await updateCustomRequestStatus(id, status as CustomRequestStatus)
    setLoading(null)

    if (res.success) {
      store.dispatch(showToast({ type: 'success', message: 'Status updated' }))
      router.refresh()
    } else {
      store.dispatch(showToast({ type: 'error', message: res.error ?? 'Failed to update' }))
    }
  }

  const handleDelete = async (model: string, id: string, deleteAction: (id: string) => Promise<any>) => {
    if (!confirm(`Delete this ${model}? This cannot be undone.`)) return

    setLoading(id)
    const res = await deleteAction(id)
    setLoading(null)

    if (res.success) {
      store.dispatch(showToast({ type: 'success', message: `${model} deleted` }))
      router.refresh()
    } else {
      store.dispatch(showToast({ type: 'error', message: res.error ?? 'Failed to delete' }))
    }
  }

  const handleRefresh = () => {
    router.refresh()
    store.dispatch(showToast({ type: 'success', message: 'Data refreshed' }))
  }

  return (
    <div className="min-h-screen bg-bg-dark text-text-dark">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 h-11 bg-surface-dark border-b border-border-dark flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/v2/dashboard"
            className="text-muted-dark hover:text-text-dark transition-colors"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <div className="w-px h-4 bg-border-dark" />
          <AlertCircle className="w-3.5 h-3.5 text-primary-dark" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">Super Dashboard</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/v2/super/logs"
            className="flex items-center gap-2 px-3 py-1 text-[9px] font-mono tracking-[0.15em] uppercase text-muted-dark hover:text-text-dark transition-colors border border-border-dark hover:border-primary-dark"
          >
            <FileText className="w-3 h-3" />
            View Logs
          </Link>
          <div className="w-px h-4 bg-border-dark" />
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-1 text-[9px] font-mono tracking-[0.15em] uppercase text-muted-dark hover:text-text-dark transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
          <div className="w-px h-4 bg-border-dark" />
          <LogoutButton />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-2xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column */}
          <div className="col-span-4 space-y-4">
            <Section
              title="Custom Requests"
              icon={<MessageSquare className="w-3.5 h-3.5" />}
              count={customRequests.length}
            >
              <div className="space-y-2 max-h-600 overflow-y-auto">
                {customRequests.map((req) => (
                  <div key={req.id} className="p-3 bg-bg-dark border border-border-dark">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-text-dark font-medium mb-1 line-clamp-1">{req.what}</p>
                        <p className="text-[8px] text-muted-dark">{req.page}</p>
                      </div>
                      <span
                        className={`text-[7px] font-mono tracking-[0.2em] uppercase px-1.5 py-0.5 shrink-0 ${
                          req.status === 'COMPLETE'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : req.status === 'DECLINED'
                              ? 'bg-red-500/10 text-red-400'
                              : req.status === 'IN_PROGRESS'
                                ? 'bg-yellow-500/10 text-yellow-400'
                                : 'bg-border-dark text-muted-dark'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {['PENDING', 'IN_PROGRESS', 'COMPLETE', 'DECLINED'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(req.id, status)}
                          disabled={req.status === status || loading === req.id}
                          className={`flex-1 px-2 py-1 text-[7px] font-mono tracking-[0.15em] uppercase border transition-colors disabled:opacity-30 ${
                            req.status === status
                              ? 'border-primary-dark bg-primary-dark/10 text-text-dark'
                              : 'border-border-dark text-muted-dark hover:text-text-dark hover:border-muted-dark'
                          }`}
                        >
                          {status.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <ModelSection
              title="Concerts"
              icon={<Music className="w-3.5 h-3.5" />}
              items={concerts}
              onDelete={(id) => handleDelete('Concert', id, deleteConcert)}
              renderItem={(c) => c.name}
              loading={loading}
            />

            <ModelSection
              title="Venues"
              icon={<MapPin className="w-3.5 h-3.5" />}
              items={venues}
              onDelete={(id) => handleDelete('Venue', id, deleteVenue)}
              renderItem={(v) => v.name}
              loading={loading}
            />

            <ModelSection
              title="Team Members"
              icon={<Users className="w-3.5 h-3.5" />}
              items={teamMembers}
              onDelete={(id) => handleDelete('Team Member', id, deleteTeamMember)}
              renderItem={(t) => `${t.firstName} ${t.lastName}`}
              loading={loading}
            />
          </div>

          {/* Middle Column */}
          <div className="col-span-4 space-y-4">
            <ModelSection
              title="Events"
              icon={<Calendar className="w-3.5 h-3.5" />}
              items={events}
              onDelete={(id) => handleDelete('Event', id, deleteEvent)}
              renderItem={(e) => e.title}
              loading={loading}
            />

            <ModelSection
              title="News"
              icon={<FileText className="w-3.5 h-3.5" />}
              items={news}
              onDelete={(id) => handleDelete('News', id, deleteNews)}
              renderItem={(n) => n.title}
              loading={loading}
            />

            <ModelSection
              title="Testimonials"
              icon={<Star className="w-3.5 h-3.5" />}
              items={testimonials}
              onDelete={(id) => handleDelete('Testimonial', id, deleteTestimonial)}
              renderItem={(t) => t.author}
              loading={loading}
            />

            <ModelSection
              title="Sponsors"
              icon={<DollarSign className="w-3.5 h-3.5" />}
              items={sponsors}
              onDelete={(id) => handleDelete('Sponsor', id, deleteSponsor)}
              renderItem={(s) => s.name}
              loading={loading}
            />
          </div>

          {/* Right Column */}
          <div className="col-span-4 space-y-4">
            <ModelSection
              title="Questions"
              icon={<MessageSquare className="w-3.5 h-3.5" />}
              items={questions}
              onDelete={(id) => handleDelete('Question', id, deleteQuestion)}
              renderItem={(q) => q.name}
              loading={loading}
            />

            <ModelSection
              title="Users"
              icon={<Users className="w-3.5 h-3.5" />}
              items={users}
              onDelete={(id) => handleDelete('User', id, deleteUser)}
              renderItem={(u) => u.email ?? 'No email'}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <div className="col-span-12 space-y-4">
        <Section
          title="Database Health"
          icon={<AlertCircle className="w-3.5 h-3.5" />}
          count={dbHealth?.activeConnections || 0}
        >
          {dbHealth && (
            <div className="col-span-12 mb-4">
              <div className="bg-surface-dark border-2 border-border-dark p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark mb-1">
                      Database Connections
                    </p>
                    <p
                      className={`text-4xl font-mono ${
                        dbHealth.activeConnections > 30
                          ? 'text-red-400'
                          : dbHealth.activeConnections > 20
                            ? 'text-yellow-400'
                            : 'text-emerald-400'
                      }`}
                    >
                      {dbHealth.activeConnections}{' '}
                      <span className="text-xl text-muted-dark">/ {dbHealth.maxConnections}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-sm font-mono ${
                        dbHealth.activeConnections > 30
                          ? 'text-red-400'
                          : dbHealth.activeConnections > 20
                            ? 'text-yellow-400'
                            : 'text-emerald-400'
                      }`}
                    >
                      {dbHealth.activeConnections > 30
                        ? '⚠️ CRITICAL - SITE MAY CRASH'
                        : dbHealth.activeConnections > 20
                          ? '⚠️ ELEVATED - MONITOR CLOSELY'
                          : '✓ HEALTHY'}
                    </p>
                    <p className="text-[8px] font-mono text-muted-dark mt-1">
                      Last checked: {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {/* Visual bar */}
                <div className="mt-3 h-2 bg-bg-dark rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      dbHealth.activeConnections > 30
                        ? 'bg-red-400'
                        : dbHealth.activeConnections > 20
                          ? 'bg-yellow-400'
                          : 'bg-emerald-400'
                    }`}
                    style={{ width: `${(dbHealth.activeConnections / dbHealth.maxConnections) * 100}%` }}
                  />
                </div>

                {/* Long Running Queries */}
                {dbHealth.longQueries.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border-dark">
                    <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-red-400 mb-2">
                      ⚠️ Long Running Queries ({dbHealth.longQueries.length})
                    </p>
                    <div className="space-y-2">
                      {dbHealth.longQueries.map((q) => (
                        <div key={q.pid} className="bg-bg-dark p-2 border-l-2 border-red-400">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[8px] font-mono text-muted-dark">PID: {q.pid}</span>
                            <span className="text-[8px] font-mono text-red-400">{q.duration}</span>
                          </div>
                          <p className="text-[10px] font-mono text-text-dark truncate">{q.query}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Section>
      </div>
    </div>
  )
}

// Helper Components

function Section({
  title,
  icon,
  count,
  children
}: {
  title: string
  icon: React.ReactNode
  count: number
  children: React.ReactNode
}) {
  return (
    <div className="bg-surface-dark border border-border-dark">
      <div className="w-full flex items-center justify-between p-3 hover:bg-bg-dark/30 transition-colors">
        <div className="flex items-center gap-2">
          <div className="text-primary-dark">{icon}</div>
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-text-dark">{title}</span>
          <span className="text-[8px] font-mono text-muted-dark">({count})</span>
        </div>
      </div>
      <div className="p-3 pt-0">{children}</div>
    </div>
  )
}

function ModelSection<T extends { id: string }>({
  title,
  icon,
  items,
  onDelete,
  renderItem,
  loading
}: {
  title: string
  icon: React.ReactNode
  items: T[]
  onDelete: (id: string) => void
  renderItem: (item: T) => string
  loading: string | null
}) {
  return (
    <Section title={title} icon={icon} count={items.length}>
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-2 p-2 bg-bg-dark hover:bg-bg-dark/50 transition-colors"
          >
            <p className="text-[10px] text-text-dark truncate flex-1">{renderItem(item)}</p>
            <button
              onClick={() => onDelete(item.id)}
              disabled={loading === item.id}
              className="text-muted-dark hover:text-red-400 transition-colors shrink-0 disabled:opacity-30"
              aria-label={`Delete ${title.slice(0, -1)}`}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </Section>
  )
}
