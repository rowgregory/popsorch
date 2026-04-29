import { getGreeting } from '@/app/utils/getGreeting'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { StatPill } from './StatPill'

export function GreetingAndStats({
  concerts,
  onSale,
  venues,
  pending,
  teamMembers,
  photosCount,
  campApplicationsCount,
  mailchimpCount,
  eventsCount,
  newsCount,
  testimonialsCount,
  sponsorsActiveCount,
  date
}) {
  const session = useSession()
  return (
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
  )
}
