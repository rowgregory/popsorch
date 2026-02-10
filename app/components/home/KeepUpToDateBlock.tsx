'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Bell, Mail, Sparkles, Star, UserPlus } from 'lucide-react'
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

  return (
    <section className="px-4 990:px-12 xl:px-4 py-20 990:py-32 bg-linear-to-b from-black to-neutral-800">
      <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-duskgray p-8 430:p-14 text-center"
        >
          {/* Icon */}
          <div className="w-14 h-14 bg-blaze flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-white" />
          </div>

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
            onClick={() => {
              sendGAEvent('event', 'sign_up_intent', {
                cta_text: 'Sign Me Up',
                cta_type: 'primary_button',
                button_location: 'home_keep_up_to_date',
                source_page: window.location.pathname,
                destination: '/connect-with-us',
                user_scroll_depth: Math.round(
                  (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
                ),
                time_on_page: Math.round((Date.now() - performance.timeOrigin) / 1000),
                referrer: document.referrer || 'direct',
                viewport_width: window.innerWidth,
                viewport_height: window.innerHeight,
                device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
                timestamp: new Date().toISOString()
              })
            }}
            className="inline-flex items-center justify-center gap-3 bg-blaze hover:bg-blazehover text-white px-10 py-4 font-changa uppercase tracking-widest text-sm transition-colors duration-300"
          >
            <UserPlus className="w-5 h-5" />
            <span>{contactsData?.buttonText}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <div className="flex items-center gap-2 bg-charcoalgray px-4 py-2">
              <Bell className="w-4 h-4 text-sunburst shrink-0" />
              <span className="font-lato text-sm text-slatemist">{contactsData?.trustBadges[0]}</span>
            </div>
            <div className="flex items-center gap-2 bg-charcoalgray px-4 py-2">
              <Sparkles className="w-4 h-4 text-blaze shrink-0" />
              <span className="font-lato text-sm text-slatemist">{contactsData?.trustBadges[1]}</span>
            </div>
            <div className="flex items-center gap-2 bg-charcoalgray px-4 py-2">
              <Star className="w-4 h-4 text-sunburst shrink-0" />
              <span className="font-lato text-sm text-slatemist">{contactsData?.trustBadges[2]}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default KeepUpToDateBlock
