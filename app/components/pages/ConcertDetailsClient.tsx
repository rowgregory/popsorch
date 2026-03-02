'use client'

import { CalendarIcon, ClockIcon, ExternalLink, MapPinIcon, Music } from 'lucide-react'
import { motion } from 'framer-motion'
import Breadcrumb from '@/app/components/common/Breadcrumb'
import isNewConcert from '@/app/lib/utils/concerts/isNewConcert'
import Picture from '@/app/components/common/Picture'
import ShareButton from '@/app/components/buttons/ShareButton'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'
import { IConcert } from '@/app/types/entities/concert'
import { sendEnrichedGAEvent } from '@/app/utils/sendEnrichedGAEvent'

export default function ConcertDetailsClient({ data }: { data: IConcert }) {
  const eventDetail = data.eventDetails[0]

  if (!data.eventDetails || data.eventDetails.length === 0 || !eventDetail) {
    return (
      <div role="status" className="flex flex-col items-center justify-center py-20 border border-white/10">
        <Music className="w-10 h-10 text-white/20 mb-4" aria-hidden="true" />
        <p className="font-changa text-lg text-white/40">No event dates available at this time</p>
      </div>
    )
  }

  return (
    <main id="main-content">
      <Breadcrumb breadcrumb={data.name} secondCrumb="Concerts" />

      <div className="relative bg-linear-to-b from-black to-inkblack">
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-10"
          style={{ backgroundImage: `url('/images/bio-bg.png')`, backgroundAttachment: 'fixed' }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          {/* Hero Image */}
          <section aria-labelledby="concert-title" className="relative w-full overflow-hidden">
            <motion.div
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
              className="relative w-full h-125 overflow-hidden"
            >
              {/* Blurred background fill */}
              <Picture
                src={data.imageUrl}
                priority={true}
                className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-40"
                alt=""
              />

              {/* Blaze tint overlay */}
              <div className="absolute inset-0 bg-blaze/10" aria-hidden="true" />

              {/* Sharp contained image */}
              <Picture
                src={data.imageUrl}
                priority={true}
                className="relative z-10 w-full h-full object-contain"
                alt={`${data.name} promotional image`}
              />

              {/* Bottom fade */}
              <div
                className="absolute inset-0 z-20 bg-linear-to-t from-black via-black/20 to-transparent"
                aria-hidden="true"
              />
            </motion.div>

            {/* Badges overlaid bottom-left */}
            <div className="absolute bottom-6 430:bottom-8 left-4 430:left-8 z-40 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                <span className="font-changa text-xs uppercase tracking-[0.3em] text-blaze">{data.type}</span>
              </div>
              {data.isOnSale && (
                <span
                  role="status"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 font-lato text-xs text-green-400 uppercase tracking-widest"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                  Tickets Available
                </span>
              )}
              {isNewConcert(data.createdAt) && (
                <span className="inline-flex items-center px-3 py-1.5 bg-sunburst/10 border border-sunburst/30 font-lato text-xs text-sunburst uppercase tracking-widest">
                  New
                </span>
              )}
            </div>
          </section>

          <div className="px-4 990:px-12 xl:px-4">
            <div className="max-w-[320px] 430:max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 mx-auto">
              {/* Title + meta */}
              <section aria-labelledby="concert-title" className="py-12 430:py-16 border-b border-white/10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <h1
                    id="concert-title"
                    className="font-changa text-4xl 430:text-5xl 760:text-6xl text-white leading-none mb-6"
                  >
                    {data.name}
                  </h1>
                  <div className="w-16 h-px bg-blaze mb-6" aria-hidden="true" />
                  <p className="font-lato text-white/70 text-sm 430:text-base 990:text-lg leading-relaxed mb-6 border-l-2 border-blaze pl-5 max-w-3xl">
                    {data.pressRelease}
                  </p>
                  <dl className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-blaze shrink-0" aria-hidden="true" />
                      <dt className="sr-only">Date</dt>
                      <dd>
                        <time className="font-lato text-sm text-white/70 uppercase tracking-wide">{data.cardDate}</time>
                      </dd>
                    </div>
                    {eventDetail.time && (
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-blaze shrink-0" aria-hidden="true" />
                        <dt className="sr-only">Time</dt>
                        <dd className="font-lato text-sm text-white/70">{eventDetail.time}</dd>
                      </div>
                    )}
                    {eventDetail.city && (
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="w-4 h-4 text-blaze shrink-0" aria-hidden="true" />
                        <dt className="sr-only">City</dt>
                        <dd className="font-lato text-sm text-white/70">{eventDetail.city}</dd>
                      </div>
                    )}
                  </dl>
                  <ShareButton concertId={data.id} />
                </motion.div>
              </section>

              {/* About */}
              <section aria-labelledby="concert-about-heading" className="py-12 430:py-16 border-b border-white/10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 990:grid-cols-12 gap-10 990:gap-16 items-start"
                >
                  <div className="990:col-span-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                      <span className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">About</span>
                    </div>
                    <h2
                      id="concert-about-heading"
                      className="font-changa text-3xl 430:text-4xl text-white leading-tight"
                    >
                      About This Concert
                    </h2>
                    <div className="w-8 h-px bg-blaze mt-4" aria-hidden="true" />
                  </div>
                  <div className="990:col-span-8">
                    <p className="font-lato text-white/60 text-sm 430:text-base leading-relaxed border-l-2 border-blaze pl-5">
                      {data.description}
                    </p>
                  </div>
                </motion.div>
              </section>

              {/* Event Details */}
              <section aria-labelledby="event-details-heading" className="py-12 430:py-16 pb-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center text-center mb-16"
                >
                  <p className="font-changa text-xs uppercase tracking-[0.3em] text-blaze mb-4">Schedule</p>
                  <div className="flex items-center gap-3 430:gap-4 justify-center mb-4">
                    <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
                    <h2
                      id="event-details-heading"
                      className="text-3xl 430:text-4xl font-changa text-white leading-none"
                    >
                      Event Details
                    </h2>
                    <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
                  </div>
                  <p className="font-lato text-white/50 text-sm 430:text-base max-w-xl leading-relaxed mt-2">
                    {data.eventDetails.length === 1
                      ? 'One performance available this season.'
                      : `${data.eventDetails.length} performances available this season.`}
                  </p>
                </motion.div>

                <ul role="list" aria-label="All performances" className="flex flex-col gap-px bg-white/10">
                  {data.eventDetails.map((eventDetail, index) => (
                    <motion.li
                      key={eventDetail.id ?? index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="grid grid-cols-1 990:grid-cols-2 gap-px bg-white/10"
                    >
                      {/* Left — performance info */}
                      <div className="bg-linear-to-b from-black to-inkblack p-6 430:p-8 990:p-10">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                          <h3 className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">
                            Performance {data.eventDetails.length > 1 ? index + 1 : ''}
                          </h3>
                        </div>
                        <dl className="flex flex-col divide-y divide-white/10">
                          <div className="flex items-center gap-3 py-4">
                            <CalendarIcon className="w-4 h-4 text-blaze shrink-0" aria-hidden="true" />
                            <dt className="sr-only">Date</dt>
                            <dd>
                              <time className="font-changa text-lg text-white">{eventDetail.date}</time>
                            </dd>
                          </div>
                          <div className="flex items-center gap-3 py-4">
                            <ClockIcon className="w-4 h-4 text-blaze shrink-0" aria-hidden="true" />
                            <dt className="sr-only">Time</dt>
                            <dd className="font-lato text-sm text-white/70">{eventDetail.time}</dd>
                          </div>
                          <div className="flex items-start gap-3 py-4">
                            <MapPinIcon className="w-4 h-4 text-blaze shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                              <dt className="sr-only">Venue</dt>
                              <dd className="font-lato text-sm text-white/80">{eventDetail.location?.name}</dd>
                              <dd className="font-lato text-xs text-white/40 mt-0.5">
                                {eventDetail.location?.address}
                              </dd>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 py-4">
                            <MapPinIcon className="w-4 h-4 text-blaze shrink-0" aria-hidden="true" />
                            <dt className="sr-only">City</dt>
                            <dd className="font-lato text-sm text-white/70">{eventDetail.city}</dd>
                          </div>
                        </dl>
                      </div>

                      {/* Right — venue + CTA */}
                      <div className="bg-linear-to-t from-black to-inkblack p-6 430:p-8 990:p-10 flex flex-col">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                          <h3 className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">Venue</h3>
                        </div>

                        <h4 className="font-changa text-2xl 430:text-3xl text-white mb-2 leading-tight">
                          {eventDetail.location?.name}
                        </h4>
                        <div className="w-8 h-px bg-blaze mb-4" aria-hidden="true" />
                        <address className="not-italic font-lato text-sm text-white/50 leading-relaxed mb-6">
                          {eventDetail.location?.address}
                        </address>

                        {eventDetail.location?.address && (
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(eventDetail.location.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Get directions to ${eventDetail.location?.name} (opens in new tab)`}
                            className="inline-flex items-center gap-2 font-lato text-xs text-white/40 hover:text-blaze transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze w-fit"
                          >
                            <MapPinIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            Get Directions
                          </a>
                        )}

                        <div className="mt-auto flex flex-col xl:flex-row gap-3">
                          {!eventDetail.isOnSale ? (
                            <div
                              role="status"
                              className="inline-flex items-center px-6 py-4 border border-white/10 font-changa text-sm uppercase tracking-widest text-white/30"
                            >
                              Sold Out
                            </div>
                          ) : (
                            <a
                              href={eventDetail.externalLink || data.allSeriesExternalLink || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Buy tickets for ${data.name} on ${eventDetail.date} (opens in new tab)`}
                              onClick={() =>
                                sendEnrichedGAEvent('ticket_link_click', data.id, 'Buy Tickets', 'concert_details')
                              }
                              className="group inline-flex items-center justify-center gap-2 border border-blaze bg-blaze/90 hover:bg-blaze text-white/70 hover:text-white px-6 py-4 font-changa text-sm uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                            >
                              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                              <span>Buy Tickets</span>
                            </a>
                          )}
                          <CallBoxOfficeBtn />
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
