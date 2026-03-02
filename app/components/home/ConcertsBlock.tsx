import Link from 'next/link'
import { Clock, Info, MapPin, Ticket } from 'lucide-react'
import { IConcert } from '@/app/types/entities/concert'
import { fadeInUp } from '@/app/lib/constants/motion'
import { motion } from 'framer-motion'
import { sendEnrichedGAEvent } from '@/app/utils/sendEnrichedGAEvent'
import Picture from '../common/Picture'

const ConcertsBlock = ({ pageData, concerts }) => {
  if (!pageData || !Array.isArray(pageData)) return null

  const concertData = pageData?.filter((page) => page?.id?.includes('concerts'))
  const concert = concertData.reduce((acc, field) => {
    const key = field.id.replace('concerts_', '')
    acc[key] = field.value
    return acc
  }, {})

  return (
    <section aria-labelledby="concerts-heading" className="px-4 pt-32.5 pb-40 bg-black">
      <div className="mx-auto max-w-300 w-full flex flex-col items-center">
        <motion.div variants={fadeInUp} className="mb-6 w-full flex justify-center items-center">
          <div className="flex items-center gap-3 px-6 py-3 bg-black/40 border border-white/10 backdrop-blur-sm">
            <span className="text-white font-bold text-xs uppercase tracking-widest text-center">
              {concert?.heading}
            </span>
          </div>
        </motion.div>

        <h2
          id="concerts-heading"
          className="text-center text-5xl sm:text-6xl font-changa text-white max-w-3xl leading-tight mb-20"
        >
          {concert?.subheading}
        </h2>

        <div className="w-full max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-7xl mb-10">
          <ul role="list" className="flex flex-col divide-y divide-white/10">
            {concerts?.map((c: IConcert, index: number) => (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group py-10 first:pt-0"
              >
                <article
                  aria-label={`${c.name} concert`}
                  className="grid grid-cols-1 990:grid-cols-12 gap-6 items-start"
                >
                  {/* Date column — all event dates */}
                  <div className="990:col-span-2 flex flex-col gap-4">
                    {c.eventDetails?.map((detail) => (
                      <div key={detail.id} className="flex flex-col">
                        <p className="font-changa text-blaze text-xs uppercase tracking-widest mb-0.5">
                          {detail.dayOfWeek}
                        </p>
                        <time dateTime={detail.date} className="font-changa text-white text-xl leading-tight">
                          {detail.date}
                        </time>
                        <p className="font-lato text-white/50 text-xs mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
                          {detail.time}
                        </p>
                        <p className="font-lato text-white/50 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                          {detail.city}
                        </p>
                        {detail.isOnSale ? (
                          <span className="flex items-center gap-1 font-lato text-xs text-green-400 font-semibold uppercase tracking-widest mt-1">
                            <Ticket className="w-3 h-3 shrink-0" aria-hidden="true" />
                            On Sale
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 font-lato text-xs text-white/30 font-semibold uppercase tracking-widest mt-1 line-through decoration-white/20">
                            <Ticket className="w-3 h-3 shrink-0" aria-hidden="true" />
                            Sold Out
                          </span>
                        )}
                      </div>
                    ))}
                    {c.eventDetails?.length > 1 && (
                      <p className="font-lato text-xs text-sunburst font-semibold uppercase tracking-widest">
                        {c.eventDetails.length} dates
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="hidden 990:flex 990:col-span-1 self-stretch items-center justify-center">
                    <div className="w-px h-full bg-white/10 mx-auto" aria-hidden="true" />
                  </div>

                  {/* Image */}
                  <div className="990:col-span-3 overflow-hidden ">
                    <Picture
                      src={c.imageUrl ?? '/images/banner-1.jpg'}
                      alt={`${c.name} promotional image`}
                      className="w-full aspect-video 990:aspect-square object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority={index === 0}
                    />
                  </div>

                  {/* Info */}
                  <div className="990:col-span-4 flex flex-col justify-center">
                    {c.type && (
                      <span className="inline-flex items-center gap-1.5 font-changa text-xs uppercase tracking-[0.25em] text-blaze mb-3">
                        <div className="w-3 h-px bg-blaze" aria-hidden="true" />
                        {c.type}
                      </span>
                    )}
                    <h3 className="font-changa text-white text-2xl 990:text-3xl leading-tight mb-2 group-hover:text-sunburst transition-colors duration-300">
                      {c.name}
                    </h3>
                    <div className="w-8 h-0.5 bg-blaze mb-4" aria-hidden="true" />
                    {c.isOnSale && (
                      <span className="flex items-center gap-1.5 text-green-400 font-lato text-xs font-semibold uppercase tracking-widest">
                        <Ticket className="w-3.5 h-3.5" aria-hidden="true" />
                        Tickets On Sale
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="990:col-span-2 flex flex-col gap-3 items-start 990:items-end justify-start pt-1">
                    {c.isOnSale ? (
                      <Link
                        href={`/concerts/${c.id}`}
                        aria-label={`Buy tickets for ${c.name}`}
                        onClick={() =>
                          sendEnrichedGAEvent('buy_tickets_click', c.id, 'Buy Tickets', 'home_concerts_block')
                        }
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blaze hover:bg-blazehover text-white font-changa uppercase tracking-wider text-sm transition-colors duration-300  w-full 990:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black whitespace-nowrap"
                      >
                        Buy Tickets
                      </Link>
                    ) : (
                      <Link
                        href={`/concerts/${c.id}`}
                        aria-label={`View details for ${c.name}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-changa uppercase tracking-wider text-sm transition-colors duration-300  w-full 990:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black whitespace-nowrap"
                      >
                        <Info className="w-4 h-4" aria-hidden="true" />
                        Details
                      </Link>
                    )}
                  </div>
                </article>
              </motion.li>
            ))}
          </ul>
        </div>

        <Link
          href={concert?.btnHref || '/concerts'}
          aria-label={`${concert?.btnText} — view all upcoming concerts`}
          className="group mt-8 inline-flex items-center gap-3 font-changa text-xs uppercase tracking-[0.3em] text-blaze hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze rounded-sm"
        >
          <span>{concert?.btnText}</span>
          <div className="w-8 h-px bg-blaze group-hover:w-12 transition-all duration-300" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export default ConcertsBlock
