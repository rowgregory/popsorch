'use client'

import { motion } from 'framer-motion'
import { benefits, sponsorshipTiers, stats } from '@/app/lib/constants/sponsoship-opportunities'
import Breadcrumb from '@/app/components/common/Breadcrumb'

const SponsorshipPage = () => {
  return (
    <>
      <Breadcrumb breadcrumb="Sponsorship Opportunities" />
      <section className="px-4 990:px-12 xl:px-4">
        <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto pt-32 pb-44">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="font-changa text-5xl 990:text-6xl text-white mb-4">Partnership Opportunities</h1>
            <p className="font-changa text-xl text-sunburst uppercase tracking-wider mb-2">with the Pops Orchestra</p>
            <p className="font-lato text-slatemist">2025-2026 Celebrating Our 50th Season</p>
          </div>

          {/* Pops by the Numbers */}
          <div className="mb-20">
            <h2 className="font-changa text-3xl text-white mb-8">Pops by the Numbers</h2>
            <div className="grid grid-cols-1 760:grid-cols-2 990:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-duskgray p-7"
                >
                  <div className="mb-3">
                    <stat.icon className="w-6 h-6 text-sunburst" />
                  </div>
                  <div className="font-changa text-3xl text-white mb-1">{stat.number}</div>
                  <div className="font-lato text-sm text-slatemist">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sponsorship Tiers */}
          <div className="mb-20">
            <h2 className="font-changa text-3xl text-white mb-8">Sponsorship Opportunities</h2>
            <div className="grid grid-cols-1 990:grid-cols-2 1200:grid-cols-3 gap-4">
              {sponsorshipTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-duskgray"
                >
                  {/* Tier Header */}
                  <div className={`bg-linear-to-r ${tier.color} p-6`}>
                    <h3 className="font-changa text-2xl text-black mb-1">{tier.title}</h3>
                    <div className="font-changa text-3xl text-black">{tier.price}</div>
                    {tier.availability && (
                      <div className="font-lato text-sm text-black/70 mt-1">({tier.availability})</div>
                    )}
                  </div>

                  {/* Tier Features */}
                  <div className="p-7 space-y-5">
                    {tier.features.print && (
                      <div>
                        <h4 className="font-changa text-sunburst text-sm uppercase tracking-wider mb-2">Print</h4>
                        <ul className="space-y-1">
                          {tier.features.print.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 font-lato text-sm text-white">
                              <span className="text-sunburst mt-0.5">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tier.features.online && (
                      <div>
                        <h4 className="font-changa text-sunburst text-sm uppercase tracking-wider mb-2">
                          Online Recognition
                        </h4>
                        <ul className="space-y-1">
                          {tier.features.online.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 font-lato text-sm text-white">
                              <span className="text-sunburst mt-0.5">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tier.features.email && (
                      <div>
                        <h4 className="font-changa text-sunburst text-sm uppercase tracking-wider mb-2">
                          Email and Other Advertising
                        </h4>
                        <ul className="space-y-1">
                          {tier.features.email.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 font-lato text-sm text-white">
                              <span className="text-sunburst mt-0.5">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tier.features.tickets && (
                      <div>
                        <h4 className="font-changa text-sunburst text-sm uppercase tracking-wider mb-2">Tickets</h4>
                        <ul className="space-y-1">
                          {tier.features.tickets.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 font-lato text-sm text-white">
                              <span className="text-sunburst mt-0.5">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tier.features.additional && (
                      <div>
                        <h4 className="font-changa text-sunburst text-sm uppercase tracking-wider mb-2">
                          Additional Options
                        </h4>
                        <ul className="space-y-1">
                          {tier.features.additional.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 font-lato text-sm text-white">
                              <span className="text-sunburst mt-0.5">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why Become a Partner */}
          <div className="mb-20">
            <h2 className="font-changa text-3xl text-white mb-8">Why Become a Pops Partner?</h2>
            <div className="grid grid-cols-1 760:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-duskgray p-7"
                >
                  <div className="flex items-start gap-4">
                    <benefit.icon className="w-6 h-6 text-sunburst shrink-0 mt-1" />
                    <div>
                      <h3 className="font-changa text-xl text-white mb-2">{benefit.title}</h3>
                      <p className="font-lato text-sm text-slatemist leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="mb-20">
            <p className="font-lato text-slatemist leading-relaxed">
              Through longstanding partnerships with local businesses and media organizations, The Pops continues to
              enrich the cultural fabric of our region. Additionally, exceptional young musicians are given the
              opportunity to perform alongside the orchestra and participate in summer enrichment activities, fostering
              the next generation of talent.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-duskgray p-7 430:p-14">
            <h2 className="font-changa text-3xl text-white mb-8">Ready to Partner with The Pops?</h2>
            <p className="font-lato text-slatemist mb-6">To discuss sponsorship options, contact:</p>
            <div className="font-changa text-xl text-white mb-1">Caryn Hodge</div>
            <div className="font-lato text-sm text-sunburst uppercase tracking-wider mb-6">
              Marketing & Media Manager
            </div>
            <div className="space-y-2 font-lato text-slatemist">
              <div>
                <a
                  href="mailto:Caryn@ThePopsOrchestra.org"
                  className="text-white hover:text-sunburst transition-colors"
                >
                  Caryn@ThePopsOrchestra.org
                </a>
              </div>
              <div>
                <a href="tel:941-713-3105" className="text-white hover:text-sunburst transition-colors">
                  941-713-3105
                </a>
              </div>
              <div>
                <a href="tel:941-926-7677" className="text-white hover:text-sunburst transition-colors">
                  941-926-POPS (7677)
                </a>
              </div>
              <div>
                <a href="http://www.ThePopsOrchestra.org" className="text-white hover:text-sunburst transition-colors">
                  www.ThePopsOrchestra.org
                </a>
              </div>
              <div>P.O. Box 1622 Sarasota, FL 34230</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default SponsorshipPage
