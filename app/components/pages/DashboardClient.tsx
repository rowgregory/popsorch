'use client'

import ApothecaryCard from '@/app/components/admin/dashboard/ApothecaryCard'
import FBPixelComingSoon from '@/app/components/admin/dashboard/FBPixelComingSoon'
import GoogleAnalyticsCard from '@/app/components/admin/dashboard/GoogleAnalyticsCard'
import { motion } from 'framer-motion'
import { containerVariants } from '@/app/lib/constants/advertise-with-us'
import StripeCard from '../admin/dashboard/StripeCard'

const DashboardClient = ({ googleAnalyticsCredentials }) => {
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
          <FBPixelComingSoon />
          <ApothecaryCard />
          <StripeCard />
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardClient
