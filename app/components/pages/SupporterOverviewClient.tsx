'use client'

import { signOut } from 'next-auth/react'
import {
  User,
  Mail,
  CheckCircle,
  XCircle,
  LogOut,
  Clock,
  ExternalLink,
  ArrowRight,
  Music,
  ChevronRight
} from 'lucide-react'
import Picture from '../common/Picture'
import Link from 'next/link'
import { formatDate } from '@/app/utils/date.functions'

const SupporterOverviewClient = ({ isSubscribed, user, isCampActive, campApplications }) => {
  const hasAppliedThisYear = campApplications.some(
    (app) => new Date(app.createdAt).getFullYear() === new Date().getFullYear()
  )

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
                  <li className="flex items-center gap-3 py-3">
                    <Clock className="w-3.5 h-3.5 text-blaze shrink-0" aria-hidden="true" />
                    <span className="font-lato text-xs text-white/50">Member since {formatDate(user?.createdAt)}</span>
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
                  {isSubscribed ? (
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" aria-hidden="true" />
                  ) : (
                    <XCircle className="w-4 h-4 text-white/20 shrink-0" aria-hidden="true" />
                  )}
                  <span className="font-changa text-sm text-white uppercase tracking-wide">
                    {isSubscribed ? 'Subscribed' : 'Not Subscribed'}
                  </span>
                  <span className="sr-only">Newsletter status: {isSubscribed ? 'subscribed' : 'not subscribed'}</span>
                </div>

                {!isSubscribed && (
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
              <section aria-labelledby="camp-heading" className="bg-black p-6 430:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-4 h-px bg-blaze" aria-hidden="true" />
                  <h2 id="camp-heading" className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">
                    Camp Status
                  </h2>
                </div>

                {hasAppliedThisYear ? (
                  <>
                    <div className="flex items-center gap-3 mb-5">
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0" aria-hidden="true" />
                      <span className="font-changa text-sm text-white uppercase tracking-wide">
                        Application Submitted
                      </span>
                    </div>
                    <p className="font-lato text-xs text-white/40 leading-relaxed mb-4">
                      Your application for this year&apos;s camp has been received. We&apos;ll be in touch soon.
                    </p>
                    <p className="font-lato text-[10px] text-white/20 leading-relaxed">
                      View your submission in the <span className="text-white/40">&nbsp;Camp Applications&nbsp;</span>{' '}
                      section.
                    </p>
                  </>
                ) : isCampActive ? (
                  <>
                    <div className="flex items-center gap-3 mb-5">
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0" aria-hidden="true" />
                      <span className="font-changa text-sm text-white uppercase tracking-wide">
                        Now Accepting Applications
                      </span>
                    </div>
                    <p className="font-lato text-xs text-white/40 leading-relaxed mb-4">
                      Our youth camp runs for one week in mid-July with daily rehearsals and performances.
                    </p>
                    <Link
                      href="/camp-application"
                      className="group inline-flex items-center gap-2 font-changa text-xs uppercase tracking-[0.2em] text-blaze hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze"
                    >
                      <span>Apply Now</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-4 h-4 text-white/30 shrink-0" aria-hidden="true" />
                      <span className="font-changa text-sm text-white uppercase tracking-wide">Opens in July</span>
                    </div>
                    <p className="font-lato text-xs text-white/40 leading-relaxed">
                      Our youth camp runs for one week in mid-July with daily rehearsals and performances. Applications
                      will open in early summer.
                    </p>
                  </>
                )}
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

              {/* Camp Applications */}
              <section aria-labelledby="camp-applications-heading" className="bg-black p-6 430:p-8 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-px bg-blaze" aria-hidden="true" />
                    <h2
                      id="camp-applications-heading"
                      className="font-changa text-xs uppercase tracking-[0.25em] text-blaze"
                    >
                      Camp Applications
                    </h2>
                  </div>
                  <span className="font-lato text-[10px] text-white/30 bg-white/5 px-2 py-1">
                    {campApplications.length} {campApplications.length === 1 ? 'application' : 'applications'}
                  </span>
                </div>

                {campApplications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Music className="w-8 h-8 text-white/10 mb-4" aria-hidden="true" />
                    <p className="font-changa text-sm text-white uppercase tracking-wide mb-1">No applications yet</p>
                    <p className="font-lato text-xs text-white/40 mb-8 max-w-xs leading-relaxed">
                      Your camp applications will appear here once submitted.
                    </p>
                    {isCampActive && (
                      <Link
                        href="/camp-application"
                        className="group inline-flex items-center gap-2 bg-blaze hover:bg-blazehover text-white px-6 py-3 font-changa text-xs uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      >
                        <Music className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Apply Now</span>
                        <ArrowRight
                          className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </Link>
                    )}
                  </div>
                ) : (
                  <ul role="list" aria-label="Your camp applications" className="flex flex-col gap-px bg-white/10">
                    {campApplications.map((application) => (
                      <li key={application.id} className="bg-black">
                        <Link
                          href={`/supporter/overview/${application.id}`}
                          className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-inset"
                          aria-label={`View application for ${application.student?.firstName} ${application.student?.lastName}`}
                        >
                          <article className="border-l-2 border-blaze p-5 group-hover:bg-white/2 transition-colors">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <p className="font-changa text-sm text-white uppercase tracking-wide mb-1 group-hover:text-blaze transition-colors">
                                  {application.student?.firstName} {application.student?.lastName}
                                </p>
                                <p className="font-lato text-xs text-white/40 leading-relaxed">
                                  {application.instrument} &middot; Grade {application.student?.grade} &middot;{' '}
                                  {application.student?.school}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span
                                  className="font-changa text-[10px] uppercase tracking-widest px-2 py-1 bg-white/5 text-white/30 border border-white/10"
                                  aria-label={`Instrument: ${application.instrument}`}
                                >
                                  {application.instrument}
                                </span>
                                <ChevronRight
                                  className="w-3.5 h-3.5 text-white/20 group-hover:text-blaze group-hover:translate-x-0.5 transition-all"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3 text-white/20" aria-hidden="true" />
                                <time
                                  dateTime={application.createdAt.toISOString()}
                                  className="font-lato text-xs text-white/30"
                                >
                                  {formatDate(application.createdAt.toISOString())}
                                </time>
                              </div>
                              {application.parent && (
                                <p className="font-lato text-[10px] text-white/20">
                                  Parent: {application.parent.firstName} {application.parent.lastName}
                                </p>
                              )}
                            </div>
                          </article>
                        </Link>
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
