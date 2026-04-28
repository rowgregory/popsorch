'use client'

import Breadcrumb from '@/app/components/common/Breadcrumb'
import Picture from '@/app/components/common/Picture'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      easing: 'easeOut'
    }
  }
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 }
  }
}

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      easing: 'easeOut'
    }
  }
}

export const AdvertiseWithUsClient = ({ data }) => {
  const field = (id: string) => data?.find((item) => item.id === id)?.value ?? ''

  const benefits = [
    { heading: field('advertise_benefit_reach_heading'), description: field('advertise_benefit_reach_description') },
    {
      heading: field('advertise_benefit_recognition_heading'),
      description: field('advertise_benefit_recognition_description')
    },
    {
      heading: field('advertise_benefit_alignment_heading'),
      description: field('advertise_benefit_alignment_description')
    },
    {
      heading: field('advertise_benefit_visibility_heading'),
      description: field('advertise_benefit_visibility_description')
    },
    {
      heading: field('advertise_benefit_special_invitations_heading'),
      description: field('advertise_benefit_special_invitations_description')
    },
    {
      heading: field('advertise_benefit_who_benefits_heading'),
      description: field('advertise_benefit_who_benefits_description')
    }
  ]

  const stats = [1, 2, 3, 4, 5].map((num) => {
    const valueMap: Record<number, string> = {
      1: 'advertise_stat_concert_attendees_value',
      2: 'advertise_stat_mailchimp_value',
      3: 'advertise_stat_email_open_rate_value',
      4: 'advertise_stat_social_followers_value',
      5: 'advertise_stat_social_subscribers_value'
    }
    const labelMap: Record<number, string> = {
      1: 'advertise_stat_concert_attendees_label',
      2: 'advertise_stat_mailchimp_label',
      3: 'advertise_stat_email_open_rate_label',
      4: 'advertise_stat_social_followers_label',
      5: 'advertise_stat_social_subscribers_label'
    }
    return { value: field(valueMap[num]), label: field(labelMap[num]) }
  })

  const artworkSpecs = [
    field('advertise_artwork_spec_1'),
    field('advertise_artwork_spec_2'),
    field('advertise_artwork_spec_3')
  ]

  return (
    <>
      <Breadcrumb breadcrumb="Advertise With Us" />
      <motion.section
        className="px-4 990:px-12 xl:px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-7xl w-full mx-auto grid grid-cols-12 990:gap-x-12 pt-32 pb-44">
          <motion.div
            className="order-2 1200:order-1 col-span-12 1200:col-span-8 mb-4 1200:mb-0 flex flex-col gap-y-4 w-full"
            variants={itemVariants}
          >
            <motion.div variants={scaleVariants}>
              <Picture
                src="/images/awu.jpg"
                alt="The Pops Orchestra performing on stage"
                className="w-full h-full aspect-video rounded-lg overflow-hidden shadow-lg"
                priority={true}
              />
            </motion.div>

            <motion.div
              className="bg-duskgray p-7 430:p-14 font-medium leading-relaxed font-lato text-white flex flex-col rounded-lg shadow-lg"
              variants={scaleVariants}
            >
              <h1 className="font-changa text-2xl mb-5 text-white">{field('advertise_main_heading')}</h1>

              <div role="list" className="flex flex-col">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    role="listitem"
                    className="mb-4"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h2 className="font-changa mb-1 text-blaze">{benefit.heading}</h2>
                    <p className="text-white">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>

              <p className="mb-2 font-changa text-12 font-medium tracking-wider text-sunburst uppercase">
                {field('advertise_cta_text')}
              </p>
            </motion.div>

            <motion.div
              className="bg-duskgray p-7 430:p-14 font-medium leading-relaxed font-lato text-white flex flex-col rounded-lg shadow-lg"
              variants={scaleVariants}
            >
              <div className="max-w-4xl mx-auto border border-gray-300 p-6 rounded-lg bg-white/5 backdrop-blur-sm">
                <motion.h2 className="text-xl font-bold text-center mb-6 text-blaze" variants={fadeInVariants}>
                  {field('advertise_rates_heading')}
                </motion.h2>

                <div className="grid grid-cols-12 gap-6">
                  <motion.div className="col-span-12 990:col-span-6" variants={itemVariants}>
                    <div className="mb-6">
                      <h3 className="font-bold uppercase mb-4 text-sunburst border-b border-sunburst/30 pb-2">
                        {field('advertise_rates_full_page_heading')}
                      </h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Outside Back Cover*', price: '$1,250', spec: '4-color | 5.75"w x 8.75"h' },
                          { name: 'Inside Front Cover*', price: '$1,000', spec: '4-color | 5.75"w x 8.75"h' },
                          { name: 'Inside Back Cover*', price: '$1,000', spec: '4-color | 5.75"w x 8.75"h' },
                          { name: 'Regular*', price: '$800', spec: '4-color | 4.5"w x 7.5"h' },
                          { name: 'Regular*', price: '$750', spec: 'B&W | 4.5"w x 7.5"h' }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start bg-white/5 p-3 rounded hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <span className="font-bold text-blaze">{item.name}</span>
                                <span className="font-bold text-sunburst">{item.price}</span>
                              </div>
                              <div className="text-sm text-gray-300 mt-1">{item.spec}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm text-gray-300 mb-4">
                      <p>{field('advertise_rates_footnote_1')}</p>
                      <p>{field('advertise_rates_footnote_2')}</p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-lg">
                      <h3 className="font-bold mb-3 text-sunburst">{field('advertise_artwork_heading')}</h3>
                      <ul role="list" className="text-sm text-gray-300 space-y-1">
                        {artworkSpecs.map((spec, index) => (
                          <li key={index}>• {spec}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div className="col-span-12 990:col-span-6" variants={itemVariants}>
                    <div className="mb-6">
                      <h3 className="font-bold uppercase mb-4 text-sunburst border-b border-sunburst/30 pb-2">
                        {field('advertise_rates_half_page_heading')}
                      </h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Horizontal**', price: '$350', spec: '4-color | 4.5"w x 3.625"h' },
                          { name: 'Horizontal**', price: '$300', spec: 'B&W | 4.5"w x 3.625"h' }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start bg-white/5 p-3 rounded hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <span className="font-bold text-blaze">{item.name}</span>
                                <span className="font-bold text-sunburst">{item.price}</span>
                              </div>
                              <div className="text-sm text-gray-300 mt-1">{item.spec}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-bold uppercase mb-4 text-sunburst border-b border-sunburst/30 pb-2">
                        {field('advertise_rates_quarter_page_heading')}
                      </h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Vertical', price: '$200', spec: '4-color | 2.25"w X 3.625"h' },
                          { name: 'Vertical', price: '$150', spec: 'B&W | 2.25"w X 3.625"h' },
                          { name: 'Horizontal**', price: '$200', spec: '4-color | 4.5"w x 1.75"h' },
                          { name: 'Horizontal**', price: '$150', spec: 'B&W | 4.5"w x 1.75"h' }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start bg-white/5 p-3 rounded hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <span className="font-bold text-blaze">{item.name}</span>
                                <span className="font-bold text-sunburst">{item.price}</span>
                              </div>
                              <div className="text-sm text-gray-300 mt-1">{item.spec}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div className="text-center mt-8" variants={itemVariants}>
                  <motion.a
                    href="https://ci.ovationtix.com/35505/store/donations/55884"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${field('advertise_bottom_cta_button_text')} — opens in new tab`}
                    className="inline-block bg-blaze hover:bg-blaze/90 text-white font-bold py-3 px-6 430:py-4 430:px-8 rounded-lg shadow-lg transition-all duration-300 font-changa text-sm 430:text-lg uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {field('advertise_bottom_cta_button_text')}
                  </motion.a>
                  <p className="text-xs 430:text-sm text-gray-400 mt-3 430:mt-7 px-2">
                    {field('advertise_bottom_cta_subtext')}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.aside
            aria-label="Program book and statistics"
            className="order-1 1200:order-2 col-span-12 1200:col-span-4 mb-12 1200:mb-0 flex flex-col gap-y-4 w-full"
            variants={itemVariants}
          >
            <motion.div
              className="bg-duskgray p-7 430:p-14 rounded-lg shadow-lg"
              variants={scaleVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-changa text-2xl text-blaze mb-5 text-center max-w-60 mx-auto">
                {field('advertise_program_book_heading')}
              </h2>
              <p className="mb-4 font-medium leading-relaxed font-lato text-center">
                <a
                  href="/pdf/advertising.pdf"
                  download="Pops 2025-26 Advertising Form.pdf"
                  aria-label="Download the 2024-25 Season Rate Card PDF"
                  className="inline-block mr-2 text-blaze hover:text-sunburst transition-colors font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                >
                  {field('advertise_program_book_download_label')}
                </a>
                <span className="text-white">{field('advertise_program_book_description')}</span>
              </p>
            </motion.div>

            <motion.div
              className="bg-duskgray p-7 430:p-14 rounded-lg shadow-lg"
              variants={scaleVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-changa text-2xl text-blaze mb-5 text-center max-w-60 mx-auto">
                {field('advertise_stats_heading')}
              </h2>
              <div className="flex items-center justify-center">
                <dl className="grid grid-cols-2 gap-y-4 py-4 border-y border-zinc-700/70 text-white font-lato text-sm w-full">
                  {stats.map((stat, index) => (
                    <div key={index} className="contents">
                      <dt className="font-semibold text-right pr-4 border-r border-[#555] text-sunburst">
                        {stat.value}
                      </dt>
                      <dd className="pl-4">{stat.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </motion.section>
    </>
  )
}
