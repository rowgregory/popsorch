'use client'

import { ArrowLeft, ExternalLink, Mail } from 'lucide-react'
import Link from 'next/link'

const statusColors: Record<string, string> = {
  subscribed: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
  unsubscribed: 'text-red-400 border-red-400/30 bg-red-400/5',
  cleaned: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  pending: 'text-blue-400 border-blue-400/30 bg-blue-400/5'
}

const interestLabels = [
  { key: 'isOption1', label: 'Season Tickets' },
  { key: 'isOption2', label: 'Special Events' },
  { key: 'isOption3', label: 'Youth Education' },
  { key: 'isOption4', label: 'Other' },
  { key: 'isNewPatron', label: 'New Patron' },
  { key: 'agreedToPrivacyStatement', label: 'Privacy Agreed' }
]

function MemberRow({ member }: { member: any }) {
  const activeInterests = interestLabels
    .filter(({ key }) => key !== 'isNewPatron' && key !== 'agreedToPrivacyStatement')
    .filter(({ key }) => member.interests?.[key])

  return (
    <div className="grid grid-cols-1 760:grid-cols-[2fr_2fr_1fr_1fr_auto] gap-px bg-white/5 border-b border-border-dark last:border-0">
      {/* Name + email */}
      <div className="bg-bg-dark px-4 py-3 truncate">
        <p className="text-xs font-mono text-text-dark truncate">{member.name || '—'}</p>
        <p className="text-[10px] font-mono text-muted-dark/60 truncate">{member.email}</p>
      </div>

      {/* Phone + address */}
      <div className="bg-bg-dark px-4 py-3">
        <p className="text-[10px] font-mono text-text-dark truncate">{member.phoneNumber || '—'}</p>
        {member.address?.addr1 && (
          <p className="text-[10px] font-mono text-muted-dark/60 truncate">
            {member.address.addr1}, {member.address.city} {member.address.state}
          </p>
        )}
      </div>

      {/* Interests */}
      <div className="bg-bg-dark px-4 py-3 flex flex-wrap gap-1.5 content-start">
        {activeInterests.length > 0 ? (
          activeInterests.map(({ key, label }) => (
            <span
              key={key}
              className="text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 border border-primary-dark/30 bg-primary-dark/5 text-primary-dark"
            >
              {label}
            </span>
          ))
        ) : (
          <span className="text-[10px] font-mono text-muted-dark/30">—</span>
        )}
      </div>

      {/* Status + date */}
      <div className="bg-bg-dark px-4 py-3">
        <span
          className={`text-[9px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 border ${statusColors[member.status] ?? 'text-muted-dark border-border-dark'}`}
        >
          {member.status}
        </span>
        <p className="text-[9px] font-mono text-muted-dark/40 mt-1.5">
          {member.createdAt
            ? new Date(member.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })
            : '—'}
        </p>
      </div>

      {/* Mailchimp link */}
      <div className="bg-bg-dark px-4 py-3 flex items-center justify-center">
        <a
          href={`https://us2.admin.mailchimp.com/audience/contact-profile?contact_id=${member.contactId}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${member.name || member.email} in Mailchimp (opens in new tab)`}
          className="text-muted-dark/40 hover:text-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark rounded-sm"
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

export function MailchimpMembersClient({ members, count }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-bg-dark text-text-dark">
      {/* ── Top bar ── */}
      <div className="shrink-0 h-16.25 bg-surface-dark border-b border-border-dark flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link
            href="/v2/dashboard"
            className="text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
          <Mail className="w-3.5 h-3.5 text-primary-dark" aria-hidden="true" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">Mailchimp Subscribers</span>

          <span className="text-[9px] font-mono text-muted-dark/40">({count})</span>
        </div>

        <a
          href="https://us2.admin.mailchimp.com/audience/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Mailchimp audience dashboard (opens in new tab)"
          className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.15em] text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
        >
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
          Mailchimp
        </a>
      </div>

      {/* ── Table header ── */}
      <div className="shrink-0 grid grid-cols-[1fr_1fr_auto_auto_auto] 760:grid-cols-[2fr_2fr_1fr_auto_auto] gap-3 items-center px-4 py-2 border-b border-border-dark bg-surface-dark">
        {['Name / Email', 'Phone', 'Date', 'Status', ''].map((h, i) => (
          <span
            key={i}
            className={`text-[8px] font-mono tracking-[0.2em] uppercase text-muted-dark/50 ${i === 1 || i === 2 ? 'hidden 760:block' : ''}`}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Status legend */}
      <div className="shrink-0 flex items-center gap-4 px-4 py-2 border-b border-border-dark bg-surface-dark/50 flex-wrap">
        <span className="text-[8px] font-mono tracking-[0.15em] uppercase text-muted-dark/40 shrink-0">Status</span>
        {[
          { status: 'subscribed', note: 'Active — receiving emails' },
          { status: 'unsubscribed', note: 'Opted out' },
          { status: 'cleaned', note: 'Bounced or invalid email' },
          { status: 'pending', note: 'Awaiting confirmation' }
        ].map(({ status, note }) => (
          <div key={status} className="flex items-center gap-1.5">
            <span
              className={`text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 border ${statusColors[status]}`}
            >
              {status}
            </span>
            <span className="text-[8px] font-mono text-muted-dark/30">{note}</span>
          </div>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto">
        {members.map((member) => (
          <MemberRow key={member.contactId} member={member} />
        ))}
      </div>
    </div>
  )
}
