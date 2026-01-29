'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Bell, Mail, Sparkles, Star, UserPlus } from 'lucide-react'
import { sendGAEvent } from '@next/third-parties/google'

const KeepUpToDateBlock = ({ pageData }) => {
  const contactData = pageData?.filter((page) => page?.id?.includes('contact'))

  const contactsData = contactData.reduce((acc, field) => {
    const key = field.id.replace('contact_', '')
    acc[key] = field.value
    return acc
  }, {})

  return (
    <div className="relative bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blaze/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sunburst/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      {/* Content */}
      <div className="relative z-10 px-4 lg:px-12 xl:px-4 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, #f97316 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }}
              />
            </div>

            {/* Glow Effects */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blaze/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-sunburst/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-blaze to-sunburst rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Mail className="w-10 h-10 text-white" />
              </div>

              <div className="flex items-center justify-center w-full">
                <h2 className="text-center text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 max-w-4xl leading-tight">
                  {contactsData?.heading}
                </h2>
              </div>

              <p className="text-neutral-300 text-lg leading-relaxed mt-6 mb-10 max-w-2xl mx-auto">
                {contactsData?.subheading}
              </p>

              {/* CTA Button */}
              <Link
                href={contactsData?.buttonHref || '#'}
                onClick={() => {
                  sendGAEvent('event', 'sign_up_intent', {
                    cta_text: 'Sign Me Up',
                    cta_type: 'primary_button',
                    cta_style: 'gradient_animated',
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
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blaze to-sunburst hover:from-sunburst hover:to-blaze text-white px-12 py-5 rounded-xl font-bold text-base uppercase tracking-widest shadow-2xl hover:shadow-blaze/50 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />

                <UserPlus className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">{contactsData?.buttonText}</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blaze/50 to-sunburst/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </Link>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-full">
                  <Bell className="w-4 h-4 text-blaze" />
                  <span className="text-sm text-neutral-300">{contactsData?.trustBadges[0]}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-full">
                  <Sparkles className="w-4 h-4 text-sunburst" />
                  <span className="text-sm text-neutral-300">{contactsData?.trustBadges[1]}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-full">
                  <Star className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-neutral-300">{contactsData?.trustBadges[2]}</span>
                </div>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blaze to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default KeepUpToDateBlock
