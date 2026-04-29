import Link from 'next/link'
import { motion } from 'framer-motion'
import { BarChart2 } from 'lucide-react'
import { LogoutButton } from '../common/LogoutButton'
import { useSession } from 'next-auth/react'

export function TopBar({ time, date }) {
  const session = useSession()
  return (
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

        {session.data.user.role === 'SUPER_USER' && (
          <>
            <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
            <Link
              href="/v2/super"
              className="text-[9px] font-mono tracking-[0.15em] uppercase text-primary-dark hover:text-secondary-light transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
              title="Super dashboard"
            >
              Super
            </Link>
          </>
        )}

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
  )
}
