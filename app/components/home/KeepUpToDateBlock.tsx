'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { sendGAEvent } from '@next/third-parties/google'

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

  const handleSignMeUp = () => {
    sendGAEvent('event', 'sign_up_intent', {
      cta_text: 'Sign Me Up',
      cta_type: 'primary_button',
      button_location: 'home_keep_up_to_date',
      source_page: window.location.pathname,
      destination: '/connect-with-us',
      user_scroll_depth: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
      time_on_page: Math.round((Date.now() - performance.timeOrigin) / 1000),
      referrer: document.referrer || 'direct',
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      timestamp: new Date().toISOString()
    })
  }

  return (
    <section className="px-4 990:px-12 xl:px-4 py-20 990:py-32 bg-linear-to-b from-black to-neutral-800">
      <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-duskgray p-8 430:p-14 text-center rounded-lg"
        >
          {/* Heading */}
          <h2 className="font-changa text-4xl sm:text-5xl 990:text-6xl text-white mb-4 leading-tight">
            {contactsData?.heading}
          </h2>
          <div className="w-12 h-0.5 bg-blaze mx-auto mb-6" />

          {/* Subheading */}
          <p className="font-lato text-slatemist text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {contactsData?.subheading}
          </p>

          {/* CTA Button */}
          <Link
            href={contactsData?.buttonHref || '#'}
            onClick={handleSignMeUp}
            className="inline-flex items-center justify-center gap-3 bg-blaze hover:bg-blazehover text-white px-8 py-4 font-changa uppercase tracking-widest text-sm transition-colors duration-300 rounded-md"
          >
            <span>{contactsData?.buttonText}</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default KeepUpToDateBlock
