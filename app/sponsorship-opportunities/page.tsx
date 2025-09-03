'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '../lib/constants/advertise-with-us'
import { benefits, sponsorshipTiers, stats } from '../lib/constants/sponsoship-opportunities'
import Breadcrumb from '../components/common/Breadcrumb'

const SponsorshipPage = () => {
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  const [particles, setParticles] = useState([])

  useEffect(() => {
    const particleData: any = [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    }))
    setParticles(particleData)
  }, [])

  return (
    <>
      <Breadcrumb breadcrumb="Sponsorship Opportunities" />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated Golden Swirls Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Floating Golden Particles */}
          {particles.map((particle: any) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`
              }}
              variants={floatingVariants}
              animate="animate"
              transition={{
                delay: particle.delay,
                duration: particle.duration
              }}
            />
          ))}
        </div>

        {/* Header Section */}
        <motion.div
          className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-amber-500/5"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Partnership Opportunities
              </h1>
              <h2 className="text-3xl text-gray-300 mb-6">with the Pops Orchestra</h2>
              <p className="text-xl text-gray-400 mb-8">2025-2026 Celebrating Our 50th Season</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Pops by the Numbers */}
        <motion.section
          className="py-16 bg-gradient-to-b from-gray-900 to-black relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Pops by the Numbers
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 text-center border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 shadow-lg hover:shadow-yellow-400/10"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg p-3 w-fit mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-black" />
                  </div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Sponsorship Tiers */}
        <motion.section
          className="py-16 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Sponsorship Opportunities
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {sponsorshipTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 shadow-xl hover:shadow-yellow-400/20"
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className={`bg-gradient-to-r ${tier.color} p-6 text-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                    <h3 className="text-2xl font-bold mb-2 text-black relative z-10">{tier.title}</h3>
                    <div className="text-3xl font-bold mb-2 text-black relative z-10">{tier.price}</div>
                    {tier.availability && (
                      <div className="text-sm text-black/80 relative z-10">({tier.availability})</div>
                    )}
                  </div>
                  <div className="p-6">
                    {tier.features.print && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-yellow-400 mb-2">Print</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {tier.features.print.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-yellow-400 mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tier.features.online && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-yellow-400 mb-2">Online Recognition</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {tier.features.online.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-yellow-400 mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tier.features.email && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-yellow-400 mb-2">Email and Other Advertising</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {tier.features.email.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-yellow-400 mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tier.features.tickets && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-yellow-400 mb-2">Tickets</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {tier.features.tickets.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-yellow-400 mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tier.features.additional && (
                      <div>
                        <h4 className="font-semibold text-yellow-400 mb-2">Additional Options</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {tier.features.additional.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-yellow-400 mr-2">•</span>
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
        </motion.section>

        {/* Why Become a Partner */}
        <motion.section
          className="py-16 bg-gradient-to-b from-gray-900 to-black relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.h2
              className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Why Become a Pops Partner?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 shadow-lg hover:shadow-yellow-400/10"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -3 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg p-3 flex-shrink-0 shadow-lg">
                      <benefit.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-2">{benefit.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Additional Benefits */}
        <motion.section
          className="py-16 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div variants={itemVariants}>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Through longstanding partnerships with local businesses and media organizations, The Pops continues to
                enrich the cultural fabric of our region. Additionally, exceptional young musicians are given the
                opportunity to perform alongside the orchestra and participate in summer enrichment activities,
                fostering the next generation of talent.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="py-16 bg-gradient-to-br from-yellow-400/10 via-amber-500/5 to-black relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Ready to Partner with The Pops?
            </h2>
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 border border-yellow-400/30 shadow-xl shadow-yellow-400/10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <p className="text-lg text-gray-300 mb-6">To discuss sponsorship options, contact:</p>
              <div className="text-xl font-semibold text-white mb-2">Caryn Hodge</div>
              <div className="text-yellow-400 mb-4">Marketing & Media Manager</div>
              <div className="space-y-2 text-gray-300">
                <div>
                  <a
                    href="mailto:Caryn@ThePopsOrchestra.org"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Caryn@ThePopsOrchestra.org
                  </a>
                </div>
                <div>
                  <a href="tel:941-713-3105" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                    941-713-3105
                  </a>
                </div>
              </div>
            </motion.div>
            <div className="mt-8 text-gray-400">
              <div className="mb-2">
                <a href="tel:941-926-7677" className="hover:text-yellow-400 transition-colors">
                  941-926-POPS (7677)
                </a>
              </div>
              <div className="mb-2">
                <a href="http://www.ThePopsOrchestra.org" className="hover:text-yellow-400 transition-colors">
                  www.ThePopsOrchestra.org
                </a>
              </div>
              <div>P.O. Box 1622 Sarasota, FL 34230</div>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  )
}

export default SponsorshipPage
