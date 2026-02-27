'use client'

import GoogleAnalyticsCard from '@/app/components/admin/dashboard/GoogleAnalyticsCard'
import { motion } from 'framer-motion'
import HostGatorCard from '../admin/dashboard/HostGatorCard'
import MailChimpCard from '../admin/dashboard/MailChimpCard'
import ResendCard from '../admin/dashboard/ResendCard'
import GoogleFirebaseCard from '../admin/dashboard/GoogleFirebaseCard'
import { containerVariants } from '@/app/lib/constants/motion'

const DashboardClient = ({
  googleAnalyticsCredentials,
  hostGatorCredentials,
  mailChimpCredentials,
  resendCredentials,
  googleFirebaseCredentials
}) => {
  return (
    <div className="h-full p-6">
      <div className="mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 760:grid-cols-2 1400:grid-cols-3 2300:grid-cols-4 2800:grid-cols-5 gap-6 mb-6"
        >
          <GoogleAnalyticsCard credentials={googleAnalyticsCredentials} />
          <HostGatorCard credentials={hostGatorCredentials} />
          <MailChimpCard credentials={mailChimpCredentials} />
          <ResendCard credentials={resendCredentials} />
          <GoogleFirebaseCard credentials={googleFirebaseCredentials} />
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardClient
