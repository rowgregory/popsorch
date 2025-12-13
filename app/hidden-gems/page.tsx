'use client'

import { motion } from 'framer-motion'
import { Music, MapPin, Phone, ExternalLink, Users, Award } from 'lucide-react'
import Picture from '../components/common/Picture'
import Link from 'next/link'

const HiddenGemsPage = () => {
  const organizations = [
    {
      name: 'Jazz Club of Sarasota',
      description:
        'The Jazz Club of Sarasota, one of the largest and most active jazz clubs in the United States, presents over 75 events annually including the Sarasota Jazz Festival which will run from March 17 – 22, 2025. Events include Jazz at 2 on Fridays, Monday Night Jazz, Jazz Cruises, free concerts in Venice, Jazz Jams at Selby library, Jazz Trolley Pub Crawls and much more.',
      membershipText: 'Members receive discounts on most events.',
      membershipLink: 'https://jazzclubsarasota.org/membership',
      festivalText:
        'Their annual Jazz Festival in March 2025 will feature Terell Stafford as Music Director, Emmett Cohen Trio with Georgia Heers, Tony Monaco & Eric Alexander, Marcus Miller and much more.',
      festivalLink: 'https://www.sarasotajazzfestival.com/',
      highlights: ['75+ Annual Events', 'Sarasota Jazz Festival', 'March 17-22, 2025'],
      photo: 'https://choralartistssarasota.org/wp-content/uploads/2024/11/Jazz-Club-Logo-with-musicians.jpg',
      contact: {
        address: '330 S. Pineapple Ave, Suite 111, Sarasota, FL 34236',
        phone: '941.260.9951',
        website: 'JazzClubSarasota.org',
        websiteUrl: 'https://jazzclubsarasota.org/'
      },
      color: 'from-amber-500 to-orange-600',
      icon: Music
    },
    {
      name: 'Sarasota Contemporary Dance',
      description:
        'Sarasota Contemporary Dance (SCD) proudly celebrates its 20th season, continuing to bring innovative dance performances, transformative educational programming, and meaningful community collaborations to Sarasota and beyond. Our studio offers 16+ diverse movement classes, summer dance intensives, workshops, and serves as the home of the Sarasota Contemporary Dance Ensemble (SCDE), providing aspiring dancers with professional training and performance opportunities. ',
      ensembleLink: 'https://sarasotacontemporarydance.org/scd-ensemble/',
      danceForJoyText:
        'SCD’s Dance for Joy class and Inclusive Dance program welcome movers of all ages and abilities, focusing on rhythm, creative play, and community connection. Designed to support individuals with movement disorders, the class blends seated and standing exercises to foster joy, mobility, and well-being.',
      danceForJoyLink: 'https://sarasotacontemporarydance.org/dance-for-joy/',
      seasonText:
        'The 2025–2026 milestone season will feature four Main Stage productions and more than 15 In-Studio showings, each paired with a live Q&A session after every performance, offering a behind-the-scenes look at the creative process.',
      highlights: ['19th Season', '16+ Movement Classes', 'Dance for Joy Program'],
      photo: '/images/scd.jpg',
      contact: {
        address: '1400 Boulevard of the Arts, Ste 300, Sarasota, FL 34236',
        phone: '941-260-8485',
        website: 'SarasotaContemporaryDance.org',
        websiteUrl: 'https://sarasotacontemporarydance.org/'
      },
      color: 'from-purple-500 to-pink-600',
      icon: Users
    },
    {
      name: 'The Pops Orchestra',
      description:
        'As a top performing arts group in a unique, culturally rich community, The Pops Orchestra attracts full-time residents, Suncoast "Snowbirds," and vacationers to its concerts, proving to be a cultural and economic asset to the Greater Sarasota community. Led by conductor Robyn Bell, The Pops presents high-quality musical entertainment at affordable prices.',
      communityText:
        'Who plays in The Pops Orchestra? They are teachers, parents, neighbors, students. They have jobs. They have children. They have homes, schedules and commitments. They teach at local colleges, high schools, middle schools, and elementary schools. They work in business, the arts and health care. Some are retired. Some are military veterans. They live in Sarasota, Bradenton, Venice, Anna Maria Island, Punta Gorda, Nokomis, Sun City Center, St. Petersburg, and Holmes Beach, among others. Some of them are snowbirds. And they are all musicians with The Pops Orchestra. This season, there are more than 65 musicians who bring their skill, passion, and talent to the stage. ',
      thisYearText: `This year’s 50th season is a crafted series of celebratory shows that are certain to keep you entertained, lift your spirits, and take you back in time when you turned your radio up and let your worries whisk away in the wind. Enjoy our expanded concert offerings, including a Saturday matinee option for our season subscriptions, and three “add-on” performances: Hocus Pocus Pops, All You Need is Love, and Organ-ized Pipes & Pops. This season, enjoy the Pops Orchestra from October to May!`,
      highlights: ['65+ Musicians', 'Community-Based', 'Affordable Concerts'],
      photo: '/images/season-marketing.jpg',
      contact: {
        address: 'PO Box 1622, Sarasota, FL 34230',
        phone: '941-926-7677',
        website: 'ThePopsOrchestra.org',
        websiteUrl: 'https://thepopsorchestra.org/'
      },
      color: 'from-blue-500 to-cyan-600',
      icon: Award
    },
    {
      name: 'Via Nova Chorale',
      description:
        'In 2023, Steven Phillips was appointed Artistic Director of Musica Sacra Cantorum, bringing a broader focus – from purely sacred music to exploring all that is sacred in life, and the choir was re-branded to Via Nova Chorale. Our repertoire draws from many cultures, time periods, and spiritual traditions, garnering enthusiastic approval from audiences and chorus members alike.',
      directorText:
        'Under the artistic direction of Steven Phillips, Via Nova Chorale explores repertoire ranging from sacred classics to spirituals, Gregorian chant to jazz, tripling both audience size and donor base since the transition.',
      specialtyText:
        'Now in our 16th season, Choral Artists of Sarasota has merged with Via Nova Chorale, creating a larger choir while combining the legacy of Choral Artists with our vision to find new ways to be together as a human family on our shared planet, via music.',
      outreachText:
        'With deep gratitude for all that has come before, we invite you to expand your vision with us. We believe a sustainable future depends on all of us finding new ways together. Music is our medium, and a deepening connection to the earth and one another is our dream.',
      seasonLink: 'https://www.vianovachorale.org',
      highlights: ['16th Season', 'Multicultural Repertoire', 'Earth & Human Connection'],
      photo: '/images/via-nova.png',
      contact: {
        address: 'PO Box 52987, Sarasota, FL 34232',
        phone: '941-263-2086',
        website: 'vianovachorale.org',
        websiteUrl: 'https://www.vianovachorale.org'
      },
      color: 'from-emerald-500 to-teal-600',
      icon: Music
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <div className="px-4 py-32">
      <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full flex flex-col items-center justify-center">
        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blaze via-prange-500 to-pink-500 bg-clip-text text-transparent">
              Hidden Gems
            </h1>
            <p className="max-w-4xl mx-auto">
              Uncover a world of hidden artistic treasures right here in Sarasota! Often flying under the radar, these
              small yet dynamic arts organizations are making a big impact with their creativity and passion. With
              innovative, unconventional programming and performances that rival the highest standards of quality, they
              offer experiences that both surprise and delight. From intimate dance productions to eclectic musical
              showcases, these gems bring fresh perspectives and unforgettable moments to the local arts scene.
              Don&apos;t miss the chance to support and enjoy the vibrant, lesser-known side of Sarasota&apos;s thriving
              cultural landscape.
            </p>
            <p className="text-xl text-sunburst font-semibold mt-4">
              Discover Sarasota&apos;s Hidden Gems and be amazed!
            </p>
          </div>
        </motion.div>

        {/* Organizations Section */}
        <motion.section
          id="organizations"
          className="py-20 px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <p className="max-w-3xl mx-auto">
                From intimate dance productions to eclectic musical showcases, these gems bring fresh perspectives and
                unforgettable moments to Sarasota&apos;s cultural landscape.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-12">
              {/* Right Column - Organizations with Photos */}
              <div className="space-y-8">
                <div className="space-y-8">
                  {organizations.map((org, index) => (
                    <motion.div
                      key={index}
                      className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50"
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${org.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                      ></div>

                      <div className="grid md:grid-cols-3 gap-6 p-6">
                        {/* Organization Photo */}
                        <div className="md:col-span-3">
                          <div className="aspect-video overflow-hidden rounded-xl">
                            <Link href={org.contact.websiteUrl} target="_blank">
                              <Picture
                                src={org.photo}
                                alt={org.name}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                priority={false}
                              />
                            </Link>
                          </div>
                        </div>

                        {/* Organization Details */}
                        <div className="md:col-span-2 relative z-10">
                          <div className="flex items-center mb-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${org.color} mr-4`}>
                              <org.icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-2xl font-bold text-white">{org.name}</h4>
                          </div>

                          <p className="text-gray-300 mb-4 leading-relaxed text-sm">{org.description}</p>

                          {org.membershipText && (
                            <p className="text-gray-300 mb-2 text-sm">
                              {org.membershipText}{' '}
                              <a
                                href={org.membershipLink}
                                className="text-orange-400 hover:text-orange-300 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Learn more about how to become a member
                              </a>
                            </p>
                          )}

                          {org.festivalText && (
                            <p className="text-gray-300 mb-2 text-sm">
                              {org.festivalText}{' '}
                              <a
                                href={org.festivalLink}
                                className="text-orange-400 hover:text-orange-300 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                For more information, visit SarasotaJazzFestival.com
                              </a>
                            </p>
                          )}

                          {org.ensembleLink && (
                            <p className="text-gray-300 mb-2 text-sm">
                              SCD&apos;s studio is home to the{' '}
                              <a
                                href={org.ensembleLink}
                                className="text-orange-400 hover:text-orange-300 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Sarasota Contemporary Dance Ensemble (SCDE)
                              </a>{' '}
                              for aspiring dancers.
                            </p>
                          )}

                          {org.danceForJoyText && (
                            <p className="text-gray-300 mb-2 text-sm">
                              <a
                                href={org.danceForJoyLink}
                                className="text-orange-400 hover:text-orange-300 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                SCD&apos;s &quot;Dance for Joy&quot; class
                              </a>{' '}
                              {org.danceForJoyText}
                            </p>
                          )}

                          {org.seasonText && <p className="text-gray-300 mb-2 text-sm">{org.seasonText}</p>}

                          {org.communityText && <p className="text-gray-300 mb-2 text-sm">{org.communityText}</p>}

                          {org.directorText && <p className="text-gray-300 mb-2 text-sm">{org.directorText}</p>}

                          {org.specialtyText && <p className="text-gray-300 mb-2 text-sm">{org.specialtyText}</p>}

                          {org.outreachText && <p className="text-gray-300 mb-2 text-sm">{org.outreachText}</p>}

                          {org.thisYearText && <p className="text-gray-300 mb-2 text-sm">{org.thisYearText}</p>}

                          {org.seasonLink && (
                            <p className="text-gray-300 mb-4 text-sm">
                              <a
                                href={org.seasonLink}
                                className="text-orange-400 hover:text-orange-300 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Learn more about their 16th season
                              </a>
                            </p>
                          )}

                          <div className="flex flex-wrap gap-2 mb-4">
                            {org.highlights.map((highlight, i) => (
                              <span
                                key={i}
                                className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${org.color} text-white`}
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>

                          <div className="space-y-2 text-xs text-gray-400">
                            <div className="flex items-start">
                              <MapPin className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="leading-tight">{org.contact.address}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-3 h-3 mr-2 flex-shrink-0" />
                              <span>{org.contact.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <ExternalLink className="w-3 h-3 mr-2 flex-shrink-0" />
                              <a
                                href={org.contact.websiteUrl}
                                className="text-sunburst hover:text-orange-400 transition-colors truncate"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {org.contact.website}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <div data-tockify-component="calendar" data-tockify-calendar="hiddengems"></div>
      </div>
    </div>
  )
}

export default HiddenGemsPage
