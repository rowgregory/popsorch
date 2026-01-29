'use client'

import Picture from '../common/Picture'
import Link from 'next/link'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { sendGAEvent } from '@next/third-parties/google'

const ContactUsBlock = ({ pageData }) => {
  if (!pageData || !Array.isArray(pageData)) {
    return null // or return a fallback UI
  }

  const questionData = pageData.filter((page) => page?.id?.includes('question'))

  const question = questionData.reduce((acc, field) => {
    const key = field.id.replace('question_', '')
    acc[key] = field.value
    return acc
  }, {})

  return (
    <div className="relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <Picture src="/images/contact.png" className="hidden md:block object-cover w-full h-full" priority />
        <Picture src="/images/contact-no-singer.png" className="block md:hidden object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blaze/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sunburst/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Content */}
      <div className="relative z-10 px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Info Cards */}
          <div className="space-y-6">
            {[
              {
                title: question.email_title,
                description: question.email_description,
                detail: question.email_detail,
                href: question.email_href,
                icon: <Mail className="w-6 h-6 text-white" />
              },
              {
                title: question.phone_title,
                description: question.phone_description,
                detail: question.phone_detail,
                href: question.phone_href,
                icon: <Phone className="w-6 h-6 text-white" />
              },
              {
                title: question.address_title,
                description: question.address_description,
                detail: question.address_detail,
                href: question.address_href,
                icon: <MapPin className="w-6 h-6 text-white" />
              }
            ].map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blaze to-sunburst rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{method.title}</h3>
                    <p className="text-white/60 text-sm mb-3">{method.description}</p>

                    <a href={method.href} className="text-white font-semibold whitespace-pre-line">
                      {method.detail}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h2 className="text-white font-bold text-4xl lg:text-5xl mb-6">{question.heading}</h2>

            <p className="text-white/80 text-lg mb-8 max-w-xl leading-relaxed">{question.subheading}</p>

            <Link
              href="/contact"
              onClick={() => {
                sendGAEvent('event', 'contact_us_click', {
                  button_location: 'hero_section',
                  source_page: 'homepage'
                })
              }}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blaze to-sunburst hover:from-sunburst hover:to-blaze text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider shadow-2xl hover:shadow-blaze/50 transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>{question.buttonText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
export default ContactUsBlock
