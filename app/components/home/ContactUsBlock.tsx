'use client'

import Picture from '../common/Picture'
import Link from 'next/link'
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { sendEnrichedGAEvent } from '@/app/utils/sendEnrichedGAEvent'

const ContactUsBlock = ({ pageData }) => {
  if (!pageData || !Array.isArray(pageData)) {
    return null
  }

  const questionData = pageData.filter((page) => page?.id?.includes('question'))

  const question = questionData.reduce((acc, field) => {
    const key = field.id.replace('question_', '')
    acc[key] = field.value
    return acc
  }, {})

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Picture src="/images/contact.png" alt="" className="hidden md:block object-cover w-full h-full" priority />
        <Picture src="/images/contact-no-singer.png" alt="" className="block md:hidden object-cover w-full h-full" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/40" />
      </div>

      <section aria-labelledby="contact-heading" className="relative z-10 px-4 990:px-12 xl:px-4 py-24 990:py-32">
        <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-300 w-full mx-auto grid grid-cols-1 990:grid-cols-2 gap-12 items-center">
          <ul role="list" className="flex flex-col gap-4">
            {[
              {
                title: question.email_title,
                description: question.email_description,
                detail: question.email_detail,
                href: question.email_href,
                icon: <Mail className="w-5 h-5 text-white" aria-hidden="true" />
              },
              {
                title: question.phone_title,
                description: question.phone_description,
                detail: question.phone_detail,
                href: question.phone_href,
                icon: <Phone className="w-5 h-5 text-white" aria-hidden="true" />
              },
              {
                title: question.address_title,
                description: question.address_description,
                detail: question.address_detail,
                href: question.address_href,
                icon: <MapPin className="w-5 h-5 text-white" aria-hidden="true" />
              }
            ].map((method, index) => (
              <motion.li
                key={method.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-duskgray/80 border-l-2 border-sunburst p-6 flex items-start gap-4 rounded-md"
              >
                <div className="w-10 h-10 bg-sunburst flex items-center justify-center shrink-0" aria-hidden="true">
                  {method.icon}
                </div>
                <div>
                  <h3 className="font-changa text-white text-lg mb-1">{method.title}</h3>
                  <p className="font-lato text-slatemist text-sm mb-2">{method.description}</p>

                  <a
                    href={method.href}
                    aria-label={`${method.title}: ${method.detail}`}
                    className="font-lato text-white hover:text-sunburst transition-colors text-sm whitespace-pre-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunburst focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                  >
                    {method.detail}
                  </a>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start"
          >
            <h2 id="contact-heading" className="font-changa text-4xl 990:text-5xl text-white mb-4">
              {question.heading}
            </h2>
            <div className="w-12 h-0.5 bg-blaze mb-6" aria-hidden="true" />
            <p className="font-lato text-slatemist text-lg mb-8 leading-relaxed">{question.subheading}</p>

            <Link
              href="/contact"
              aria-label={`${question.buttonText} — visit our contact page`}
              onClick={() =>
                sendEnrichedGAEvent('contact_us_click', 'contact_us', question.buttonText, 'home_contact_section')
              }
              className="rounded-md inline-flex items-center gap-3 bg-blaze hover:bg-blazehover text-white px-8 py-4 font-changa uppercase tracking-wider text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span>{question.buttonText}</span>
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactUsBlock
