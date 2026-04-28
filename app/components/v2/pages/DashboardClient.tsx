'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  Music2,
  MapPin,
  Users,
  Image as Img,
  Mail,
  UserCircle,
  Tent,
  Plus,
  ArrowRight,
  CheckCircle,
  Clock,
  Archive,
  Trash2,
  BarChart2,
  Download,
  Edit,
  Search,
  X,
  Calendar,
  Wrench,
  Quote,
  FileText,
  Tag,
  Expand
} from 'lucide-react'
import Link from 'next/link'
import type {
  Concert,
  Venue,
  TeamMember,
  Question,
  User as PrismaUser,
  CampApplication,
  User,
  Page,
  CustomRequest,
  Sponsor
} from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { getGreeting } from '@/app/utils/getGreeting'
import { useClock } from '@/app/lib/hooks/useClock'
import { ColSection } from '../dashboard/ColSection'
import { Row } from '../dashboard/Row'
import { Empty } from '../dashboard/Empty'
import { StatPill } from '../dashboard/StatPill'
import { useState } from 'react'
import ContactSubmissionModal from '../modals/ContactSubmissionModal'
import exportCampApplications from '@/app/lib/utils/exportCampApplications'
import UserRoleModal from '../modals/UserRoleModal'
import TestimonialModal from '../modals/TestimonialModal'
import CustomRequestModal from '../modals/CustomRequestModal'
import CustomRequestDetailModal from '../modals/CustomRequestDetailsModal'
import { updateConcertStatus } from '@/app/lib/actions/concert/updateConcertStatus'
import { LogoutButton } from '../common/LogoutButton'
import { deleteConcert } from '@/app/lib/actions/concert/deleteConcert'
import SponsorModal from '../modals/SponsorModal'
import Picture from '../../common/Picture'

interface Props {
  concerts: Concert[]
  venues: Venue[]
  teamMembers: TeamMember[]
  photosCount: number
  photosLiveCount: number
  questions: Question[]
  users: PrismaUser[]
  pageContentCount: number
  mailchimpCount: number
  campApplicationsCount: number
  campApplications: CampApplication[]
  pages: Page[]
  newsCount: number
  newsLiveCount: number
  testimonialsCount: number
  testimonialsLiveCount: number
  customRequests: CustomRequest[]
  eventsCount: number
  eventsLiveCount: number
  sponsors: Sponsor[]
  sponsorsActiveCount: number
}

export default function DashboardClient({
  concerts,
  venues,
  teamMembers,
  photosCount,
  photosLiveCount,
  questions,
  users,
  pageContentCount,
  mailchimpCount,
  campApplicationsCount,
  campApplications,
  pages,
  newsCount,
  newsLiveCount,
  testimonialsCount,
  testimonialsLiveCount,
  customRequests,
  eventsCount,
  eventsLiveCount,
  sponsors,
  sponsorsActiveCount
}: Props) {
  const router = useRouter()
  const session = useSession()
  const { time, date } = useClock()
  const pending = questions.filter((q) => !q.hasResponded)
  const onSale = concerts.filter((c) => c.isOnSale)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const handleExport = exportCampApplications(campApplications)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false)
  const [customRequestModalOpen, setCustomRequestModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<CustomRequest | null>(null)
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false)
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null)

  const [teamSearch, setTeamSearch] = useState('')

  const filteredTeamMembers = teamMembers.filter((m) =>
    `${m.firstName} ${m.lastName}`.toLowerCase().includes(teamSearch.toLowerCase())
  )

  const testimonialsDraftCount = testimonialsCount - testimonialsLiveCount
  const newsDraftCount = newsCount - newsLiveCount
  const eventsDraftCount = eventsCount - eventsLiveCount
  const photosDraftCount = photosCount - photosLiveCount

  return (
    <>
      <ContactSubmissionModal
        key={selectedQuestion?.id}
        question={selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
      />

      <UserRoleModal key={selectedUser?.id} onClose={() => setSelectedUser(null)} user={selectedUser} />

      <AnimatePresence>
        {testimonialModalOpen && <TestimonialModal onClose={() => setTestimonialModalOpen(false)} testimonial={null} />}
      </AnimatePresence>

      <AnimatePresence>
        {customRequestModalOpen && <CustomRequestModal onClose={() => setCustomRequestModalOpen(false)} />}
      </AnimatePresence>

      <CustomRequestDetailModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />

      <AnimatePresence>
        {sponsorModalOpen && <SponsorModal sponsor={selectedSponsor} onClose={() => setSponsorModalOpen(false)} />}
      </AnimatePresence>

      <div className="h-screen flex flex-col overflow-hidden bg-bg-dark text-text-dark">
        {/* ── Top Bar ── */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="shrink-0 h-11 bg-surface-dark border-b border-border-dark flex items-center justify-between px-4 z-30"
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="w-px h-4 bg-primary-dark" aria-hidden="true" />
            <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-muted-dark hidden sm:block">
              The Pops Orchestra
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-muted-dark hidden sm:block">{date}</span>
            <span className="text-[9px] font-mono text-text-dark tabular-nums">{time}</span>
            <div className="w-px h-4 bg-border-dark" aria-hidden="true" />

            {/* Logged in as */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" aria-hidden="true" />
              <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-dark">
                {session.data.user.email}
              </span>
            </div>

            <div className="w-px h-4 bg-border-dark" aria-hidden="true" />

            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
              aria-label="Google Analytics"
              title="Google Analytics"
            >
              <BarChart2 className="w-3.5 h-3.5" />
            </a>
            <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
            <LogoutButton />
          </div>
        </motion.header>

        {/* ── Migration Notice ── */}
        <div className="shrink-0 border-b border-yellow-500/20 bg-yellow-500/5 px-4 py-2 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 animate-pulse" aria-hidden="true" />
          <p className="text-[10px] font-mono text-yellow-400/80 leading-relaxed">
            <span className="text-yellow-400 font-semibold">ACTION REQUIRED —</span> Turn off all AudienceView links on{' '}
            <span className="text-yellow-400">May 4, 2026</span> during CueBox migration. Back live for season ticket
            sales on <span className="text-yellow-400">May 11, 2026</span>.
          </p>
        </div>

        {/* 50th Anniversary Notice */}
        <div className="shrink-0 border-b border-blue-500/20 bg-blue-500/5 px-4 py-1.5 flex items-center gap-3">
          <div className="w-1 h-1 rounded-full bg-blue-400 shrink-0" aria-hidden="true" />
          <p className="text-[9px] font-mono text-blue-400/70">
            <span className="text-blue-400">After May 2 —</span> Remove 50th anniversary logo and update all &quot;50
            years&quot; copy to{' '}
            <span className="text-blue-400">&quot;Over 50 years of Community Music Making&quot;</span>
          </p>
        </div>

        {/* ── Greeting + Stats ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="shrink-0 border-b border-border-dark"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-[8px] font-mono tracking-[0.2em] uppercase text-muted-dark mb-0.5">{date}</p>
              <h1 className="font-quicksand font-black text-xl text-text-dark leading-none">
                {getGreeting()}, {session.data.user.name.split(' ')[0]}.
              </h1>
            </div>
          </div>
          {/* Stat strip */}
          <div className="flex overflow-x-auto border-t border-border-dark">
            <StatPill label="Concerts" value={concerts.length} />
            <StatPill label="On Sale" value={onSale.length} accent={onSale.length > 0} />
            <StatPill label="Venues" value={venues.length} />
            <StatPill label="Inquiries" value={pending.length} accent={pending.length > 0} />
            <StatPill label="Team" value={teamMembers.length} />
            <StatPill label="Photos" value={photosCount} />
            <StatPill label="Camp Apps" value={campApplicationsCount} />
            <StatPill label="Mailchimp" value={mailchimpCount} />
            <StatPill label="Events" value={eventsCount} />
            <StatPill label="News" value={newsCount} />
            <StatPill label="Testimonials" value={testimonialsCount} />
            <StatPill label="Sponsors" value={sponsorsActiveCount} />
          </div>
        </motion.div>

        {/* ── Three Column Body (fills remaining height, each col scrolls) ── */}
        <div className="flex-1 flex overflow-hidden">
          {/* ── Left Column ── */}
          <motion.aside
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-52 xl:w-60 shrink-0 border-r border-border-dark overflow-y-auto hidden md:block"
          >
            <ColSection
              label="Team"
              icon={<Users className="w-3 h-3" />}
              count={teamMembers.length}
              href="/v2/team/new"
              actionLabel="New"
              secondaryHref="/v2/team/reorder"
              secondaryLabel="Reorder"
              minHeight="min-h-48"
              maxHeight="max-h-72"
            >
              {/* Search */}
              <div className="px-3 py-2 border-b border-border-dark/50 sticky top-0 bg-bg-dark z-10">
                <div className="relative">
                  <Search
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-dark/40 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    value={teamSearch}
                    onChange={(e) => setTeamSearch(e.target.value)}
                    placeholder="Search team..."
                    className="w-full pl-7 pr-3 py-1.5 bg-surface-dark border border-border-dark text-text-dark text-[11px] placeholder:text-muted-dark/30 focus:outline-none focus:border-primary-dark transition-colors"
                  />
                  {teamSearch && (
                    <button
                      type="button"
                      onClick={() => setTeamSearch('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-dark/40 hover:text-text-dark transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
              {filteredTeamMembers.length === 0 ? (
                <Empty label="team members" />
              ) : (
                filteredTeamMembers.map((m) => (
                  <Row key={m.id} href={`/v2/team/${m.id}/edit`}>
                    <p className="text-text-dark text-[11px] font-medium truncate">
                      {m.firstName} {m.lastName}
                    </p>
                    <span className="text-muted-dark text-[9px] shrink-0 truncate max-w-14">{m.position}</span>
                  </Row>
                ))
              )}
            </ColSection>

            <ColSection
              label="Page Content"
              icon={<Edit className="w-3 h-3" />}
              count={pageContentCount}
              href="/v2/page-content-editor"
              actionLabel="Edit"
              minHeight="min-h-16"
              maxHeight="max-h-24"
            >
              {pageContentCount === 0 ? (
                <Empty label="page content edit" />
              ) : (
                pages.map((p) => (
                  <Row key={p.id} href={`/v2/page-content-editor?slug=${p.slug}`}>
                    <p className="text-text-dark text-[11px] font-medium truncate capitalize">{p.slug}</p>
                  </Row>
                ))
              )}
            </ColSection>

            <ColSection
              label="Venues"
              icon={<MapPin className="w-3 h-3" />}
              count={venues.length}
              href="/v2/venues/new"
              actionLabel="New"
              minHeight="min-h-16"
              maxHeight="max-h-28"
            >
              {venues.length === 0 ? (
                <Empty label="venues" />
              ) : (
                venues.map((v) => (
                  <Row key={v.id} href={`/v2/venues/${v.id}/edit`}>
                    <p className="text-text-dark text-[11px] font-medium truncate">{v.name}</p>
                    {v.capacity && <span className="text-muted-dark text-[9px] shrink-0">Cap. {v.capacity}</span>}
                  </Row>
                ))
              )}
            </ColSection>

            <ColSection
              label="Custom Requests"
              icon={<Wrench className="w-3 h-3" />}
              count={customRequests.length}
              action={() => setCustomRequestModalOpen(true)}
              actionIcon={<Expand className="w-2.5 h-2.5" />}
              actionLabel="New"
              minHeight="min-h-16"
              maxHeight="max-h-20"
            >
              {customRequests.length === 0 ? (
                <div className="px-3 py-4 text-center">
                  <p className="text-muted-dark/50 text-[10px]">No requests yet.</p>
                </div>
              ) : (
                customRequests.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRequest(r)}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2.5 border-b border-border-dark/30 last:border-0 hover:bg-button-dark transition-colors text-left"
                  >
                    <div className="min-w-0">
                      <p className="text-text-dark text-[11px] font-medium truncate">
                        {r.page} — {r.changeType}
                      </p>
                      <p className="text-muted-dark text-[9px] truncate">{r.what}</p>
                    </div>
                    <span
                      className={`text-[8px] font-mono uppercase shrink-0 ${
                        r.status === 'COMPLETE'
                          ? 'text-emerald-400'
                          : r.status === 'IN_PROGRESS'
                            ? 'text-yellow-400'
                            : r.status === 'DECLINED'
                              ? 'text-muted-dark/40'
                              : 'text-primary-dark'
                      }`}
                    >
                      {r.status}
                    </span>
                  </button>
                ))
              )}
            </ColSection>
          </motion.aside>

          {/* ── Center Column — Concerts ── */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="flex-1 flex flex-col overflow-hidden border-r border-border-dark"
          >
            {/* Concerts header — sticky within column */}
            <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-border-dark bg-bg-dark">
              <div className="flex items-center gap-2">
                <Music2 className="w-3.5 h-3.5 text-primary-dark" />
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">Concerts</span>
                <span className="text-[9px] font-mono text-muted-dark/40">({concerts.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/v2/concerts"
                  className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-dark hover:text-text-dark transition-colors"
                  title="View all concerts"
                >
                  View All
                </Link>
                <Link
                  href="/v2/concerts/new"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-dark hover:bg-secondary-light text-white text-[9px] font-mono tracking-[0.15em] uppercase transition-colors"
                >
                  <Plus className="w-2.5 h-2.5" />
                  New Concert
                </Link>
              </div>
            </div>

            {/* Concerts list — scrollable */}
            <div className="flex-1 overflow-y-auto">
              {concerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <Music2 className="w-10 h-10 text-border-dark" />
                  <p className="text-muted-dark text-sm">No concerts yet.</p>
                  <Link
                    href="/v2/concerts/new"
                    className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.15em] uppercase text-primary-dark hover:text-secondary-dark transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Add your first concert
                  </Link>
                </div>
              ) : (
                concerts.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.13 + i * 0.04 }}
                    className="flex items-center border-b border-border-dark/40 last:border-0 group"
                  >
                    <Link
                      href={`/v2/concerts/${c.id}/edit`}
                      className="flex items-center justify-between gap-4 px-4 py-3.5 flex-1 min-w-0 hover:bg-surface-dark transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-text-dark text-sm font-medium truncate">{c.name}</p>
                          {c.type && (
                            <span className="text-[8px] font-mono tracking-[0.15em] uppercase text-muted-dark/50 border border-border-dark px-1.5 py-0.5 hidden sm:block">
                              {c.type}
                            </span>
                          )}
                        </div>
                        {c.cardDate && <p className="text-muted-dark text-[10px] mt-0.5 font-mono">{c.cardDate}</p>}
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {c.status === 'LIVE' ? (
                          <span className="flex items-center gap-1 text-[9px] font-mono uppercase text-emerald-400">
                            <CheckCircle className="w-3 h-3" />
                            <span className="hidden sm:block">Live</span>
                          </span>
                        ) : c.status === 'ARCHIVED' ? (
                          <span className="flex items-center gap-1 text-[9px] font-mono uppercase text-muted-dark/40">
                            <Archive className="w-3 h-3" />
                            <span className="hidden sm:block">Archived</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[9px] font-mono uppercase text-yellow-400">
                            <Clock className="w-3 h-3" />
                            <span className="hidden sm:block">Draft</span>
                          </span>
                        )}
                        <ArrowRight className="w-3.5 h-3.5 text-border-dark group-hover:text-primary-dark group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </Link>

                    {/* Draft */}
                    <button
                      onClick={async () => {
                        const res = await updateConcertStatus(c.id, 'DRAFT')
                        if (res.success) router.refresh()
                      }}
                      disabled={c.status === 'DRAFT'}
                      className="shrink-0 px-3 py-3.5 text-muted-dark/30 hover:text-yellow-400 hover:bg-surface-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted-dark/30 disabled:hover:bg-transparent"
                      aria-label={c.status === 'DRAFT' ? 'Already a draft' : `Set ${c.name} to draft`}
                      title={c.status === 'DRAFT' ? 'Already Draft' : 'Set to Draft'}
                    >
                      <Clock className="w-3.5 h-3.5" />
                    </button>

                    {/* Live */}
                    <button
                      onClick={async () => {
                        const res = await updateConcertStatus(c.id, 'LIVE')
                        if (res.success) router.refresh()
                      }}
                      disabled={c.status === 'LIVE'}
                      className="shrink-0 px-3 py-3.5 text-muted-dark/30 hover:text-emerald-400 hover:bg-surface-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted-dark/30 disabled:hover:bg-transparent"
                      aria-label={c.status === 'LIVE' ? 'Already live' : `Set ${c.name} to live`}
                      title={c.status === 'LIVE' ? 'Already Live' : 'Set to Live'}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                    </button>

                    {/* Archive */}
                    <button
                      onClick={async () => {
                        const res = await updateConcertStatus(c.id, 'ARCHIVED')
                        if (res.success) router.refresh()
                      }}
                      disabled={c.status === 'ARCHIVED'}
                      className="shrink-0 px-3 py-3.5 text-muted-dark/30 hover:text-muted-dark hover:bg-surface-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted-dark/30 disabled:hover:bg-transparent"
                      aria-label={c.status === 'ARCHIVED' ? 'Already archived' : `Archive ${c.name}`}
                      title={c.status === 'ARCHIVED' ? 'Already Archived' : 'Archive'}
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete — dev only */}
                    {process.env.NODE_ENV === 'development' && (
                      <button
                        onClick={async () => {
                          const res = await deleteConcert(c.id)
                          if (res.success) router.refresh()
                        }}
                        className="shrink-0 px-3 py-3.5 text-muted-dark/30 hover:text-red-400 hover:bg-surface-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
                        aria-label={`Delete ${c.name}`}
                        title="Delete (dev only)"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.main>

          {/* ── Right Column ── */}
          <motion.aside
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.14 }}
            className="w-52 xl:w-60 shrink-0 overflow-y-auto hidden md:block"
          >
            <ColSection
              label="Inquiries"
              icon={<Mail className="w-3 h-3" />}
              count={questions.length}
              badge={pending.length > 0 ? pending.length : undefined}
              minHeight="min-h-32"
              maxHeight="max-h-52"
            >
              {questions.length === 0 ? (
                <Empty label="inquiries" />
              ) : (
                questions.slice(0, 8).map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuestion(q)}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2.5 border-b border-border-dark/30 last:border-0 hover:bg-button-dark transition-colors text-left"
                  >
                    <div className="min-w-0">
                      <p className="text-text-dark text-[11px] font-medium truncate">{q.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-muted-dark text-[9px] truncate">{q.email}</p>
                        <span className="text-muted-dark/40 text-[8px] font-mono shrink-0">
                          {new Date(q.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                    {q.hasResponded ? (
                      <span className="text-[8px] font-mono uppercase text-emerald-400 shrink-0">Done</span>
                    ) : (
                      <span className="text-[8px] font-mono uppercase text-yellow-400 shrink-0">New</span>
                    )}
                  </button>
                ))
              )}
            </ColSection>

            <ColSection
              label="Users"
              icon={<UserCircle className="w-3 h-3" />}
              count={users.length}
              secondaryHref="/v2/users"
              secondaryLabel="View"
            >
              {users.length === 0 ? (
                <Empty label="users" />
              ) : (
                users.map((u) => (
                  <button
                    key={u.id}
                    onClick={() =>
                      u.email !== 'sqysh@sqysh.io' && u.email !== 'rowgregory@gmail.com' && setSelectedUser(u)
                    }
                    className={`${u.email === 'sqysh@sqysh.io' || u.email === 'rowgregory@gmail.com' ? 'cursor-not-allowed' : 'cursor-pointer'} w-full flex items-center justify-between gap-2 px-3 py-2.5 border-b border-border-dark/30 last:border-0 hover:bg-button-dark transition-colors text-left`}
                  >
                    <div className="min-w-0">
                      <p className="text-text-dark text-[11px] font-medium truncate">{u.firstName}</p>
                      <p className="text-muted-dark text-[9px] truncate">{u.email}</p>
                    </div>
                    <span className="text-[8px] font-mono uppercase text-muted-dark/40 shrink-0">{u.role}</span>
                  </button>
                ))
              )}
            </ColSection>

            <ColSection
              label="Camp Apps"
              icon={<Tent className="w-3 h-3" />}
              count={campApplicationsCount}
              action={handleExport}
              actionLabel="Export"
              actionIcon={<Download className="w-2.5 h-2.5" />}
            >
              {campApplicationsCount === 0 ? (
                <Empty label="applications" />
              ) : (
                <Row href="/v2/camp-applications">
                  <p className="text-text-dark text-[11px]">View all applications</p>
                  <ArrowRight className="w-3 h-3 text-muted-dark" />
                </Row>
              )}
            </ColSection>

            <ColSection
              label="Sponsors"
              icon={<Tag className="w-3 h-3" />}
              count={sponsors.length}
              actionLabel="New"
              actionIcon={<Expand className="w-2.5 h-2.5" />}
              action={() => setSponsorModalOpen(true)}
              minHeight="min-h-16"
              maxHeight="max-h-48"
            >
              {sponsors.length === 0 ? (
                <Empty label="sponsors" />
              ) : (
                sponsors.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedSponsor(s)
                      setSponsorModalOpen(true)
                    }}
                    className="flex items-center justify-between gap-2 px-3 py-2.5 border-b border-border-dark/30 last:border-0 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {s.filePath && (
                        <Picture
                          priority
                          src={s.filePath}
                          alt=""
                          aria-hidden="true"
                          className="w-5 h-5 object-contain shrink-0"
                        />
                      )}
                      <p className="text-text-dark text-[11px] font-medium truncate">{s.name}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {s.level && (
                        <span className="text-[8px] font-mono uppercase text-muted-dark/40 hidden sm:block truncate max-w-16">
                          {s.level}
                        </span>
                      )}
                      <span
                        className={`text-[8px] font-mono uppercase ${s.isActive ? 'text-emerald-400' : 'text-muted-dark/30'}`}
                      >
                        {s.isActive ? 'Active' : 'Off'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </ColSection>
          </motion.aside>
        </div>

        {/* ── Footer Strip — always pinned ── */}
        <motion.footer
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="shrink-0 border-t border-border-dark bg-surface-dark"
        >
          <div className="grid grid-cols-4">
            {[
              {
                href: '/v2/gallery',
                icon: <Img className="w-3 h-3" />,
                label: 'Gallery',
                value: photosCount,
                liveCount: photosLiveCount,
                draftCount: photosDraftCount,
                arrow: <ArrowRight className="w-3 h-3" />
              },
              {
                href: '/v2/events',
                icon: <Calendar className="w-3 h-3" />,
                label: 'Events',
                value: eventsCount,
                liveCount: eventsLiveCount,
                draftCount: eventsDraftCount,
                arrow: <ArrowRight className="w-3 h-3" />
              },
              {
                href: '/v2/news',
                icon: <FileText className="w-3 h-3" />,
                label: 'News',
                value: newsCount,
                liveCount: newsLiveCount,
                draftCount: newsDraftCount,
                arrow: <ArrowRight className="w-3 h-3" />
              }
            ].map((item, i, arr) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-button-dark transition-colors group ${i < arr.length - 1 ? 'border-r border-border-dark' : ''}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-primary-dark shrink-0">{item.icon}</span>
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark truncate">
                    {item.label}
                  </span>
                  <span className="text-[9px] font-mono text-muted-dark/40">({item.value})</span>
                  <span className="text-[8px] font-mono text-emerald-400 hidden lg:block">{item.liveCount} live</span>
                  <span className="text-[8px] font-mono text-muted-dark/40 hidden lg:block">
                    {item.draftCount} draft
                  </span>
                </div>
                <span className="text-border-dark group-hover:text-primary-dark transition-colors shrink-0">
                  {item.arrow}
                </span>
              </Link>
            ))}
            {/* Testimonials */}
            <div className="flex items-center border-l border-border-dark">
              <Link
                href="/v2/testimonials"
                className="flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-button-dark transition-colors group flex-1 min-w-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-primary-dark shrink-0">
                    <Quote className="w-3 h-3" />
                  </span>
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark truncate">
                    Testimonials
                  </span>
                  <span className="text-[9px] font-mono text-muted-dark/40">({testimonialsCount})</span>
                  <span className="text-[8px] font-mono text-emerald-400 hidden lg:block">
                    {testimonialsLiveCount} live
                  </span>
                  <span className="text-[8px] font-mono text-muted-dark/40 hidden lg:block">
                    {testimonialsDraftCount} draft
                  </span>
                </div>
                <ArrowRight className="w-3 h-3 text-border-dark group-hover:text-primary-dark transition-colors shrink-0" />
              </Link>
              <button
                onClick={() => setTestimonialModalOpen(true)}
                className="shrink-0 px-3 py-2.5 border-l border-border-dark hover:bg-button-dark transition-colors text-muted-dark hover:text-primary-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
                aria-label="Add testimonial"
                title="Add testimonial"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  )
}
