'use client'

import { motion } from 'framer-motion'
import Breadcrumb from '@/app/components/common/Breadcrumb'
import { Award, Calendar, Eye, Music, TrendingUp, Users } from 'lucide-react'

export const SponsorshipOpportunitiesClient = ({ data }) => {
  const field = (id: string) => data?.content?.find((item) => item.id === id)?.value ?? ''

  const tierColors = [
    'from-yellow-400 to-amber-500',
    'from-amber-500 to-yellow-600',
    'from-yellow-600 to-amber-600',
    'from-yellow-500 to-amber-500',
    'from-amber-400 to-yellow-500',
    'from-yellow-400 to-amber-400'
  ]

  const tierGroups = [
    {
      n: 1,
      categories: [
        { key: 'print', label: 'Print', fields: ['print_1', 'print_2', 'print_3'] },
        { key: 'online', label: 'Online Recognition', fields: ['online_1', 'online_2'] },
        { key: 'email', label: 'Email & Advertising', fields: ['email_1', 'email_2'] },
        { key: 'tickets', label: 'Tickets', fields: ['tickets_1', 'tickets_2'] },
        { key: 'additional', label: 'Additional Options', fields: ['additional_1'] }
      ]
    },
    {
      n: 2,
      categories: [
        { key: 'print', label: 'Print', fields: ['print_1', 'print_2'] },
        { key: 'online', label: 'Online Recognition', fields: ['online_1', 'online_2'] },
        { key: 'email', label: 'Email & Advertising', fields: ['email_1', 'email_2'] },
        { key: 'tickets', label: 'Tickets', fields: ['tickets_1', 'tickets_2'] },
        { key: 'additional', label: 'Additional Options', fields: ['additional_1'] }
      ]
    },
    {
      n: 3,
      categories: [
        { key: 'print', label: 'Print', fields: ['print_1', 'print_2'] },
        { key: 'online', label: 'Online Recognition', fields: ['online_1'] },
        { key: 'additional', label: 'Additional Options', fields: ['additional_1'] }
      ]
    },
    { n: 4, categories: [{ key: 'print', label: 'Print', fields: ['print_1'] }] },
    { n: 5, categories: [{ key: 'print', label: 'Print', fields: ['print_1'] }] },
    { n: 6, categories: [{ key: 'print', label: 'Print', fields: ['print_1'] }] }
  ]

  const statIcons = [Users, TrendingUp, Eye, Users, Music, Award]
  const benefitIcons = [Users, Award, TrendingUp, Eye, Calendar, Music]

  return (
    <main id="main-content">
      <Breadcrumb breadcrumb="Sponsorship Opportunities" />

      <div className="relative">
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-10"
          style={{ backgroundImage: `url('/images/bio-bg.png')`, backgroundAttachment: 'fixed' }}
          aria-hidden="true"
        />

        <div className="relative z-10 px-4 990:px-12 xl:px-4">
          <div className="max-w-[320px] 430:max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-screen-7xl mx-auto">
            {/* Page Header */}
            <header className="w-full text-center flex flex-col items-center pt-32 pb-20 border-b border-white/10">
              <p className="font-changa text-xs uppercase tracking-[0.3em] text-blaze mb-4">
                {field('sponsorship_eyebrow')}
              </p>
              <div className="flex items-center gap-3 430:gap-4 justify-center mb-4">
                <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
                <h1 className="text-4xl 430:text-5xl sm:text-6xl font-changa text-white leading-none">
                  {field('sponsorship_heading')}
                </h1>
                <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
              </div>
              <p className="font-changa text-lg text-sunburst uppercase tracking-wider mt-2">
                {field('sponsorship_subheading')}
              </p>
              <p className="font-lato text-white/50 text-sm mt-2">{field('sponsorship_season')}</p>
            </header>

            {/* Pops by the Numbers */}
            <section aria-labelledby="stats-heading" className="py-20 border-b border-white/10">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-8 h-px bg-blaze" aria-hidden="true" />
                <h2 id="stats-heading" className="font-changa text-2xl 430:text-3xl text-white">
                  Pops by the Numbers
                </h2>
              </div>
              <ul
                role="list"
                aria-label="Pops Orchestra statistics"
                className="grid grid-cols-1 760:grid-cols-2 990:grid-cols-3 gap-px bg-white/10"
              >
                {[1, 2, 3, 4, 5, 6].map((n, i) => {
                  const Icon = statIcons[i]
                  return (
                    <motion.li
                      key={n}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      viewport={{ once: true }}
                      className="bg-inkblack p-8 flex flex-col gap-3"
                    >
                      <Icon className="w-5 h-5 text-blaze" aria-hidden="true" />
                      <p className="font-changa text-3xl 430:text-4xl text-white">
                        {field(`sponsorship_stat_${n}_number`)}
                      </p>
                      <p className="font-lato text-sm text-white/50">{field(`sponsorship_stat_${n}_label`)}</p>
                    </motion.li>
                  )
                })}
              </ul>
            </section>

            {/* Sponsorship Tiers */}
            <section aria-labelledby="tiers-heading" className="py-20 border-b border-white/10">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-8 h-px bg-blaze" aria-hidden="true" />
                <h2 id="tiers-heading" className="font-changa text-2xl 430:text-3xl text-white">
                  Sponsorship Opportunities
                </h2>
              </div>
              <ul
                role="list"
                aria-label="Sponsorship tiers"
                className="grid grid-cols-1 990:grid-cols-2 1200:grid-cols-3 gap-px bg-white/10"
              >
                {tierGroups.map((tier, index) => {
                  const n = tier.n
                  const title = field(`sponsorship_tier_${n}_title`)
                  const price = field(`sponsorship_tier_${n}_price`)
                  const availability = field(`sponsorship_tier_${n}_availability`)
                  return (
                    <motion.li
                      key={n}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      viewport={{ once: true }}
                      className="bg-inkblack flex flex-col"
                    >
                      {/* Tier Header */}
                      <div className={`bg-linear-to-r ${tierColors[index]} p-6`}>
                        <h3 className="font-changa text-2xl text-black mb-1">{title}</h3>
                        <p className="font-changa text-3xl text-black">{price}</p>
                        {availability && <p className="font-lato text-sm text-black/70 mt-1">({availability})</p>}
                      </div>

                      {/* Tier Features */}
                      <div className="p-6 430:p-8 flex flex-col gap-6 grow">
                        {tier.categories.map((cat) => {
                          const items = cat.fields.map((f) => field(`sponsorship_tier_${n}_${f}`)).filter(Boolean)
                          if (!items.length) return null
                          return (
                            <div key={cat.key}>
                              <h4 className="font-changa text-xs text-blaze uppercase tracking-wider mb-3">
                                {cat.label}
                              </h4>
                              <ul role="list" className="flex flex-col gap-2">
                                {items.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 font-lato text-sm text-white/70">
                                    <span className="text-blaze mt-0.5 shrink-0" aria-hidden="true">
                                      •
                                    </span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        })}
                      </div>
                    </motion.li>
                  )
                })}
              </ul>
            </section>

            {/* Why Become a Partner */}
            <section aria-labelledby="benefits-heading" className="py-20 border-b border-white/10">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-8 h-px bg-blaze" aria-hidden="true" />
                <h2 id="benefits-heading" className="font-changa text-2xl 430:text-3xl text-white">
                  Why Become a Pops Partner?
                </h2>
              </div>
              <ul
                role="list"
                aria-label="Partnership benefits"
                className="grid grid-cols-1 760:grid-cols-2 gap-px bg-white/10"
              >
                {[1, 2, 3, 4, 5, 6].map((n, i) => {
                  const Icon = benefitIcons[i]
                  return (
                    <motion.li
                      key={n}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      viewport={{ once: true }}
                      className="bg-inkblack p-8 flex items-start gap-5"
                    >
                      <div className="w-10 h-10 bg-blaze/10 flex items-center justify-center shrink-0 rounded-sm">
                        <Icon className="w-5 h-5 text-blaze" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-changa text-lg 430:text-xl text-white mb-2">
                          {field(`sponsorship_benefit_${n}_title`)}
                        </h3>
                        <p className="font-lato text-sm text-white/50 leading-relaxed">
                          {field(`sponsorship_benefit_${n}_description`)}
                        </p>
                      </div>
                    </motion.li>
                  )
                })}
              </ul>
            </section>

            {/* Additional Text */}
            <section aria-label="Additional partnership information" className="py-20 border-b border-white/10">
              <p className="font-lato text-white/50 leading-relaxed border-l-2 border-blaze pl-5 text-sm 430:text-base">
                {field('sponsorship_additional_text')}
              </p>
            </section>

            {/* Contact */}
            <section aria-labelledby="contact-heading" className="py-20 pb-32">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-8 h-px bg-blaze" aria-hidden="true" />
                <h2 id="contact-heading" className="font-changa text-2xl 430:text-3xl text-white">
                  Ready to Partner with The Pops?
                </h2>
              </div>

              <div className="bg-duskgray/60 backdrop-blur-sm border-t-2 border-blaze p-6 430:p-10">
                <p className="font-lato text-white/50 text-sm mb-8">To discuss sponsorship options, contact:</p>

                <div className="flex flex-col gap-1 mb-6">
                  <p className="font-changa text-xl 430:text-2xl text-white">{field('sponsorship_contact_name')}</p>
                  <p className="font-lato text-xs text-blaze uppercase tracking-widest">
                    {field('sponsorship_contact_title')}
                  </p>
                </div>

                <address className="not-italic flex flex-col gap-3 font-lato text-sm">
                  <a
                    href={`mailto:${field('sponsorship_contact_email')}`}
                    aria-label={`Email ${field('sponsorship_contact_name')} at ${field('sponsorship_contact_email')}`}
                    className="text-white hover:text-sunburst transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunburst rounded-sm w-fit"
                  >
                    {field('sponsorship_contact_email')}
                  </a>

                  <a
                    href={`tel:${field('sponsorship_contact_phone_1').replace(/\D/g, '')}`}
                    aria-label={`Call ${field('sponsorship_contact_phone_1')}`}
                    className="text-white hover:text-sunburst transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunburst rounded-sm w-fit"
                  >
                    {field('sponsorship_contact_phone_1')}
                  </a>

                  <a
                    href="tel:9419267677"
                    aria-label={`Call ${field('sponsorship_contact_phone_2')}`}
                    className="text-white hover:text-sunburst transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunburst rounded-sm w-fit"
                  >
                    {field('sponsorship_contact_phone_2')}
                  </a>

                  <a
                    href="http://www.ThePopsOrchestra.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${field('sponsorship_contact_website')} (opens in new tab)`}
                    className="text-sunburst hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunburst rounded-sm w-fit"
                  >
                    {field('sponsorship_contact_website')}
                  </a>
                  <p className="text-white/50">{field('sponsorship_contact_address')}</p>
                </address>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
