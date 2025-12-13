'use client'

import TitleWithLine from '../common/TitleWithLine'
import Picture from '../common/Picture'
import { RootState, useAppSelector } from '@/app/redux/store'
import EditableTextArea from '../common/EditableTextArea'
import Link from 'next/link'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { sendGAEvent } from '@next/third-parties/google'

const ContactUsBlock = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  return (
    <div className="relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <Picture src="/images/contact.png" className="hidden md:block object-cover w-full h-full" priority={true} />
        <Picture
          src="/images/contact-no-singer.png"
          className="block md:hidden object-cover w-full h-full"
          priority={false}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blaze/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sunburst/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Content */}
      <div className="relative z-10 px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Info Cards */}
          <div className="hidden lg:block space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blaze to-sunburst rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Email Us</h3>
                  <p className="text-white/60 text-sm mb-3">Get in touch via email</p>
                  <a
                    href="mailto:info@thepops.org"
                    className="text-blaze hover:text-sunburst transition-colors font-semibold"
                  >
                    info@ThePopsOrchestra.org
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blaze to-sunburst rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Call Us</h3>
                  <p className="text-white/60 text-sm mb-3">Mon-Fri 9AM-5PM EST</p>
                  <a href="tel:+1234567890" className="text-blaze hover:text-sunburst transition-colors font-semibold">
                    941 926 POPS (7677)
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blaze to-sunburst rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Visit Us</h3>
                  <p className="text-white/60 text-sm mb-3">Come see us in person</p>
                  <p className="text-white/80">
                    502 3rd Ave W
                    <br />
                    Bradenton, FL 34205
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <TitleWithLine
              title={textBlockMap?.HOME_CONTACT_BLOCK?.homeContactTitle}
              type="HOME_CONTACT_BLOCK"
              textBlockKey="homeContactTitle"
            />

            <EditableTextArea
              tag="p"
              initialValue={textBlockMap?.HOME_CONTACT_BLOCK?.homeContactSubtitle}
              type="HOME_CONTACT_BLOCK"
              textBlockKey="homeContactSubtitle"
              className="text-white/80 text-lg mt-6 mb-8 max-w-xl leading-relaxed"
            />

            {/* CTA Button */}
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
              <span>Contact Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Mobile Contact Cards */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 w-full">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <Mail className="w-6 h-6 text-blaze mx-auto mb-2" />
                <p className="text-white/60 text-xs">Email</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <Phone className="w-6 h-6 text-blaze mx-auto mb-2" />
                <p className="text-white/60 text-xs">Call</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <MapPin className="w-6 h-6 text-blaze mx-auto mb-2" />
                <p className="text-white/60 text-xs">Visit</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactUsBlock
