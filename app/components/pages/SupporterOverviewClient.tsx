'use client'

import { signOut } from 'next-auth/react'
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  XCircle,
  LogOut,
  Clock,
  ExternalLink,
  ArrowRight
} from 'lucide-react'
import Picture from '../common/Picture'
import Link from 'next/link'

const SupporterOverviewClient = ({ data, user }) => {
  const { questions, newsletter } = data

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })

  const newsletterInterests = newsletter
    ? [
        newsletter.isOption1 && 'Season Tickets',
        newsletter.isOption2 && 'Special Events',
        newsletter.isOption3 && 'Youth Education',
        newsletter.isOption4 && 'Other'
      ].filter(Boolean)
    : []

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-white/10" role="banner">
        <div className="px-4 990:px-12 xl:px-4">
          <div className="max-w-[320px] 430:max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 w-full mx-auto py-4 flex items-center justify-between">
            <Link
              href="/"
              aria-label="The Pops Orchestra — return to homepage"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze"
            >
              <div
                className="bg-golden50Logo bg-no-repeat bg-contain bg-center w-16 h-10"
                role="img"
                aria-label="The Pops Orchestra logo"
              />
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              aria-label="Sign out of your account"
              className="inline-flex items-center gap-2 font-changa text-xs uppercase tracking-[0.2em] text-white/40 hover:text-blaze transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>
      <main id="main-content" className="relative z-10 px-4 990:px-12 xl:px-4 py-16 990:py-24">
        <div className="max-w-[320px] 430:max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 w-full mx-auto">
          {/* Page Title */}
          <header className="mb-12 430:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-blaze" aria-hidden="true" />
              <span className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">The Pops Orchestra</span>
            </div>
            <h1 className="font-changa text-4xl 430:text-5xl text-white leading-none mb-3">Supporter Dashboard</h1>
            <div className="w-12 h-px bg-blaze" aria-hidden="true" />
          </header>

          <div className="grid grid-cols-1 1200:grid-cols-3 gap-px bg-white/10">
            {/* Left column */}
            <div className="flex flex-col gap-px bg-white/10">
              {/* Profile */}
              <section aria-labelledby="profile-heading" className="bg-black p-6 430:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-4 h-px bg-blaze" aria-hidden="true" />
                  <h2 id="profile-heading" className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">
                    Profile
                  </h2>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0"
                    aria-hidden={!!user?.image}
                  >
                    {user?.image ? (
                      <Picture
                        priority={true}
                        src={user.image}
                        alt={`${user.name} profile photo`}
                        className="w-12 h-12 object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-white/30" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <p className="font-changa text-white text-base leading-tight">{user?.name}</p>
                    <p className="font-lato text-xs text-white/40">{user?.email}</p>
                  </div>
                </div>

                <ul role="list" aria-label="Profile details" className="flex flex-col divide-y divide-white/10">
                  <li className="flex items-center gap-3 py-3">
                    <Mail className="w-3.5 h-3.5 text-blaze shrink-0" aria-hidden="true" />
                    <span className="font-lato text-xs text-white/50 break-all">{user?.email}</span>
                  </li>
                  {data.user?.phone && (
                    <li className="flex items-center gap-3 py-3">
                      <Phone className="w-3.5 h-3.5 text-blaze shrink-0" aria-hidden="true" />
                      <span className="font-lato text-xs text-white/50">{data.user.phone}</span>
                    </li>
                  )}
                  <li className="flex items-center gap-3 py-3">
                    <Clock className="w-3.5 h-3.5 text-blaze shrink-0" aria-hidden="true" />
                    <span className="font-lato text-xs text-white/50">
                      Member since {formatDate(data.user?.createdAt)}
                    </span>
                  </li>
                </ul>
              </section>

              {/* Newsletter */}
              <section aria-labelledby="newsletter-heading" className="bg-black p-6 430:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-4 h-px bg-blaze" aria-hidden="true" />
                  <h2 id="newsletter-heading" className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">
                    Newsletter
                  </h2>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  {newsletter ? (
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" aria-hidden="true" />
                  ) : (
                    <XCircle className="w-4 h-4 text-white/20 shrink-0" aria-hidden="true" />
                  )}
                  <span className="font-changa text-sm text-white uppercase tracking-wide">
                    {newsletter ? 'Subscribed' : 'Not Subscribed'}
                  </span>
                  <span className="sr-only">Newsletter status: {newsletter ? 'subscribed' : 'not subscribed'}</span>
                </div>

                {newsletter && newsletterInterests.length > 0 && (
                  <div>
                    <p className="font-changa text-[10px] uppercase tracking-[0.25em] text-white/40 mb-3">Interests</p>
                    <ul role="list" className="flex flex-wrap gap-2">
                      {newsletterInterests.map((interest) => (
                        <li
                          key={interest as string}
                          className="bg-white/5 border-l-2 border-blaze px-3 py-1 font-lato text-xs text-white/70"
                        >
                          {interest}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!newsletter && (
                  <Link
                    href="/connect-with-us"
                    className="group inline-flex items-center gap-2 font-changa text-xs uppercase tracking-[0.2em] text-blaze hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze mt-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </section>

              {/* Camp Applications */}
              <section
                aria-labelledby="camp-heading"
                className="bg-black p-6 430:p-8 opacity-50"
                aria-describedby="camp-unavailable"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-4 h-px bg-white/20" aria-hidden="true" />
                  <h2 id="camp-heading" className="font-changa text-xs uppercase tracking-[0.25em] text-white/30">
                    Camp Applications
                  </h2>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-4 h-4 text-white/30 shrink-0" aria-hidden="true" />
                  <span className="font-changa text-sm text-white uppercase tracking-wide">Opens in July</span>
                </div>
                <p id="camp-unavailable" className="font-lato text-xs text-white/40 leading-relaxed">
                  Our youth camp runs for one week in mid-July with daily rehearsals and performances. Applications will
                  open in early summer.
                </p>
              </section>
            </div>

            {/* Right column */}
            <div className="1200:col-span-2 flex flex-col gap-px bg-white/10">
              {/* Tickets */}
              <section aria-labelledby="tickets-heading" className="bg-black p-6 430:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-4 h-px bg-blaze" aria-hidden="true" />
                  <h2 id="tickets-heading" className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">
                    Tickets
                  </h2>
                </div>

                <p className="font-changa text-white text-base mb-2">Looking for Tickets?</p>
                <p className="font-lato text-xs text-white/50 leading-relaxed mb-5">
                  All ticket purchases are handled through our official ticketing partner, Audience View. Browse
                  available concerts, select your seats, and complete your purchase securely.
                </p>

                <div className="flex flex-col 430:flex-row gap-3">
                  <Link
                    href="/concerts"
                    className="group inline-flex items-center gap-2 font-changa text-xs uppercase tracking-[0.2em] text-blaze hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze"
                  >
                    <span>View Concerts</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>

                  <a
                    href="https://ci.ovationtix.com/35505"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Audience View ticketing platform (opens in new tab)"
                    className="group inline-flex items-center gap-2 font-changa text-xs uppercase tracking-[0.2em] text-blaze hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze"
                  >
                    <span>Visit Audience View</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </section>

              {/* Contact Submissions */}
              <section aria-labelledby="submissions-heading" className="bg-black p-6 430:p-8 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-px bg-blaze" aria-hidden="true" />
                    <h2 id="submissions-heading" className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">
                      Contact Submissions
                    </h2>
                  </div>
                  <span className="font-lato text-[10px] text-white/30 bg-white/5 px-2 py-1">
                    {questions.length} {questions.length === 1 ? 'submission' : 'submissions'}
                  </span>
                </div>

                {questions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <MessageSquare className="w-8 h-8 text-white/10 mb-4" aria-hidden="true" />
                    <p className="font-changa text-sm text-white uppercase tracking-wide mb-1">No submissions yet</p>
                    <p className="font-lato text-xs text-white/40 mb-8 max-w-xs leading-relaxed">
                      Questions you send to The Pops will appear here.
                    </p>
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 bg-blaze hover:bg-blazehover text-white px-6 py-3 font-changa text-xs uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Get In Touch</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                ) : (
                  <ul role="list" aria-label="Your contact submissions" className="flex flex-col gap-px bg-white/10">
                    {questions.map((question) => (
                      <li key={question.id} className="bg-black">
                        <article className="border-l-2 border-blaze p-5">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <p className="font-lato text-sm text-white/70 leading-relaxed flex-1">{question.message}</p>
                            <span
                              className={`shrink-0 font-changa text-[10px] uppercase tracking-widest px-2 py-1 ${
                                question.hasResponded
                                  ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                                  : 'bg-white/5 text-white/30 border border-white/10'
                              }`}
                              aria-label={`Status: ${question.hasResponded ? 'Responded' : 'Pending'}`}
                            >
                              {question.hasResponded ? 'Responded' : 'Pending'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-white/20" aria-hidden="true" />
                            <time dateTime={question.createdAt} className="font-lato text-xs text-white/30">
                              {formatDate(question.createdAt)}
                            </time>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SupporterOverviewClient
