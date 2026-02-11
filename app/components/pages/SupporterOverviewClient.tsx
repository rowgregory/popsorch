'use client'

import { motion } from 'framer-motion'
import { signOut } from 'next-auth/react'
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Bell,
  GraduationCap,
  CheckCircle,
  XCircle,
  LogOut,
  Clock,
  ChevronRight,
  Ticket,
  ExternalLink
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
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-duskgray border-b border-neutral-800">
        <div className="px-4 990:px-12 xl:px-4">
          <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto py-5 flex items-center justify-between">
            <Link href="/" className="">
              The Pops of Bradenton & Sarasota
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              className="flex items-center gap-2 font-lato text-sm text-slatemist hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <section className="px-4 990:px-12 xl:px-4 py-12">
        <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto">
          {/* Page Title */}
          <div className="mb-10">
            <h1 className="font-changa text-4xl text-white mb-1">Supporter Dashboard</h1>
            <div className="w-10 h-0.5 bg-blaze" />
          </div>

          <div className="grid grid-cols-1 1200:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-duskgray p-7"
              >
                <div className="flex items-center gap-2 mb-5">
                  <User className="w-4 h-4 text-blaze" />
                  <h2 className="font-changa text-xs text-blaze uppercase tracking-wider">Profile</h2>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-charcoalgray flex items-center justify-center shrink-0">
                    {user?.image ? (
                      <Picture priority={true} src={user.image} alt="avatar" className="w-14 h-14 object-cover" />
                    ) : (
                      <User className="w-7 h-7 text-slatemist" />
                    )}
                  </div>
                  <div>
                    <p className="font-changa text-white text-lg leading-tight">{user?.name}</p>
                    <p className="font-lato text-xs text-slatemist">{user?.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-sunburst shrink-0" />
                    <span className="font-lato text-sm text-slatemist break-all">{user?.email}</span>
                  </div>
                  {data.user?.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-sunburst shrink-0" />
                      <span className="font-lato text-sm text-slatemist">{data.user.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-sunburst shrink-0" />
                    <span className="font-lato text-sm text-slatemist">
                      Member since {formatDate(data.user?.createdAt)}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Newsletter Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-duskgray p-7"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Bell className="w-4 h-4 text-blaze" />
                  <h2 className="font-changa text-xs text-blaze uppercase tracking-wider">Newsletter</h2>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  {newsletter ? (
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-neutral-600 shrink-0" />
                  )}
                  <span className="font-changa text-white text-lg">{newsletter ? 'Subscribed' : 'Not Subscribed'}</span>
                </div>

                {newsletter && newsletterInterests.length > 0 && (
                  <div>
                    <p className="font-lato text-xs text-slatemist uppercase tracking-wider mb-3">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {newsletterInterests.map((interest) => (
                        <span
                          key={interest as string}
                          className="bg-charcoalgray border-l-2 border-blaze px-3 py-1 font-lato text-xs text-white"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {!newsletter && (
                  <a
                    href="/connect-with-us"
                    className="inline-flex items-center gap-2 mt-2 font-lato text-sm text-blaze hover:text-blazehover transition-colors"
                  >
                    Subscribe to our newsletter
                    <ChevronRight className="w-4 h-4" />
                  </a>
                )}
              </motion.div>

              {/* Camp Application */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-duskgray p-7 opacity-60"
              >
                <div className="flex items-center gap-2 mb-5">
                  <GraduationCap className="w-4 h-4 text-slatemist" />
                  <h2 className="font-changa text-xs text-slatemist uppercase tracking-wider">Camp Applications</h2>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slatemist shrink-0" />
                    <span className="font-changa text-white text-lg">Applications Open in July</span>
                  </div>

                  <p className="font-lato text-sm text-slatemist leading-relaxed">
                    Our youth camp runs for one week in mid-July with daily rehearsals and performances. Applications
                    will open in early summer.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Contact Submissions */}
            <div className="1200:col-span-2 flex flex-col gap-6">
              {/* Audience View Ticketing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="bg-duskgray p-7"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Ticket className="w-4 h-4 text-blaze" />
                  <h2 className="font-changa text-xs text-blaze uppercase tracking-wider">Tickets</h2>
                </div>

                <h3 className="font-changa text-white text-lg mb-3">Looking for Tickets?</h3>

                <p className="font-lato text-sm text-slatemist mb-4 leading-relaxed">
                  All ticket purchases and reservations are handled through our official ticketing partner, Audience
                  View. Browse available concerts, select your seats, and complete your purchase securely.
                </p>

                <div className="flex flex-col gap-2">
                  <Link
                    href="/concerts"
                    className="inline-flex items-center gap-2 font-lato text-sm text-blaze hover:text-blazehover transition-colors"
                  >
                    View Concerts
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="https://ci.ovationtix.com/35505"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-lato text-sm text-blaze hover:text-blazehover transition-colors"
                  >
                    Visit Audience View
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="bg-duskgray p-7 h-full"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blaze" />
                    <h2 className="font-changa text-xs text-blaze uppercase tracking-wider">Contact Submissions</h2>
                  </div>
                  <span className="font-lato text-xs text-slatemist">
                    {questions.length} {questions.length === 1 ? 'submission' : 'submissions'}
                  </span>
                </div>

                {questions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <MessageSquare className="w-10 h-10 text-neutral-700 mb-4" />
                    <p className="font-changa text-white text-lg mb-1">No submissions yet</p>
                    <p className="font-lato text-sm text-slatemist mb-6">
                      Questions you send to The Pops will appear here.
                    </p>

                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-blaze hover:bg-blazehover text-white font-changa uppercase tracking-wider text-sm px-6 py-3 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Get In Touch
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {questions.map((question, i) => (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="bg-charcoalgray border-l-2 border-blaze p-5"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <p className="font-lato text-sm text-white leading-relaxed flex-1">{question.message}</p>
                          <span
                            className={`shrink-0 font-lato text-xs px-2 py-1 ${
                              question.hasResponded
                                ? 'bg-green-500/10 text-green-400'
                                : 'bg-neutral-700 text-neutral-400'
                            }`}
                          >
                            {question.hasResponded ? 'Responded' : 'Pending'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-neutral-600" />
                          <span className="font-lato text-xs text-neutral-600">{formatDate(question.createdAt)}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SupporterOverviewClient
