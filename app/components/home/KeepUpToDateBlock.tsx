'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { sendEnrichedGAEvent } from '@/app/utils/sendEnrichedGAEvent'

const KeepUpToDateBlock = ({ pageData }) => {
  if (!pageData || !Array.isArray(pageData)) {
    return null
  }

  const contactData = pageData?.filter((page) => page?.id?.includes('contact'))

  const contactsData = contactData.reduce((acc, field) => {
    const key = field.id.replace('contact_', '')
    acc[key] = field.value
    return acc
  }, {})

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="px-4 990:px-12 xl:px-4 py-20 990:py-32 bg-linear-to-b from-black to-neutral-800"
    >
      <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-duskgray p-8 430:p-14 text-center rounded-lg"
        >
          <h2
            id="newsletter-heading"
            className="font-changa text-4xl sm:text-5xl 990:text-6xl text-white mb-4 leading-tight"
          >
            {contactsData?.heading}
          </h2>
          <div className="w-12 h-0.5 bg-blaze mx-auto mb-6" aria-hidden="true" />

          <p className="font-lato text-slatemist text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {contactsData?.subheading}
          </p>

          <Link
            href={contactsData?.buttonHref || '#'}
            aria-label={`${contactsData?.buttonText} — sign up for our newsletter`}
            onClick={() => sendEnrichedGAEvent('sign_up_intent', 'sign_me_up', 'Sign Me Up', 'home_keep_up_to_date')}
            className="inline-flex items-center justify-center gap-3 bg-blaze hover:bg-blazehover text-white px-8 py-4 font-changa uppercase tracking-widest text-sm transition-colors duration-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-duskgray"
          >
            <span>{contactsData?.buttonText}</span>
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default KeepUpToDateBlock
