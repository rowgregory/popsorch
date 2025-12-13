'use client'

import Breadcrumb from '../components/common/Breadcrumb'
import { useTextBlockSelector } from '../redux/store'
import TitleWithLine from '../components/common/TitleWithLine'
import EditableTextArea from '../components/common/EditableTextArea'
import Picture from '../components/common/Picture'
import { ArrowRight, Award, GraduationCap, Heart, Lock, Music, Shield, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const StudentScholarships = () => {
  const { textBlockMap } = useTextBlockSelector()

  return (
    <>
      <Breadcrumb breadcrumb="Student Scholarships" />

      <div className="relative bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-20"
          style={{
            backgroundImage: `url('/images/bio-bg.png')`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blaze/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sunburst/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 px-4 lg:px-12 xl:px-4 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center lg:items-start"
            >
              <TitleWithLine
                title={textBlockMap?.STUDENT_SCHOLARSHIPS_PAGE?.studentScholarshipsPageTitle}
                type="STUDENT_SCHOLARSHIPS_PAGE"
                textBlockKey="studentScholarshipsPageTitle"
              />

              <EditableTextArea
                tag="p"
                initialValue={textBlockMap?.STUDENT_SCHOLARSHIPS_PAGE?.studentScholarshipsP1}
                type="STUDENT_SCHOLARSHIPS_PAGE"
                textBlockKey="studentScholarshipsP1"
                className="text-neutral-300 text-lg leading-relaxed mt-8 mb-8 text-center lg:text-left"
              />

              {/* Impact Stats */}
              <div className="grid grid-cols-3 gap-4 w-full mb-10">
                <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-4 text-center hover:border-blaze/50 transition-all">
                  <div className="text-3xl font-bold text-blaze mb-1">50+</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Students Helped</div>
                </div>
                <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-4 text-center hover:border-sunburst/50 transition-all">
                  <div className="text-3xl font-bold text-sunburst mb-1">$25K</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Awarded Yearly</div>
                </div>
                <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-4 text-center hover:border-orange-500/50 transition-all">
                  <div className="text-3xl font-bold text-orange-400 mb-1">100%</div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider">Goes to Students</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="w-full flex justify-center lg:justify-start">
                <a
                  href="https://ci.ovationtix.com/35505/store/donations/55596"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blaze
                to-sunburst hover:from-sunburst hover:to-blaze text-white px-10 py-5 rounded-xl font-bold text-sm
                uppercase tracking-widest shadow-2xl hover:shadow-blaze/50 transition-all duration-300 hover:scale-105
                overflow-hidden"
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />

                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
                  <span className="relative z-10">Make Your Donation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blaze/50 to-sunburst/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 mt-10">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-neutral-400">Tax Deductible</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-neutral-400">Secure Donation</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative group">
                {/* Decorative Border */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blaze to-sunburst rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl" />

                {/* Image Container */}
                <div className="relative bg-gradient-to-br from-neutral-900 to-black border-4 border-blaze rounded-2xl overflow-hidden shadow-2xl max-w-[500px]">
                  <Picture
                    src="/images/student-scholarships.jpeg"
                    className="w-full h-auto object-cover"
                    priority={false}
                  />

                  {/* Overlay Badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blaze to-sunburst rounded-full flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Empowering Future Musicians</p>
                        <p className="text-neutral-400 text-xs">Since 2010</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="relative z-10 px-4 lg:px-12 xl:px-4 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-8 hover:border-blaze/50 transition-all">
                <Music className="w-10 h-10 text-blaze mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Music Education</h3>
                <p className="text-neutral-400 text-sm">
                  Supporting aspiring musicians through comprehensive scholarship programs and mentorship opportunities.
                </p>
              </div>

              <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-8 hover:border-sunburst/50 transition-all">
                <Users className="w-10 h-10 text-sunburst mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Community Impact</h3>
                <p className="text-neutral-400 text-sm">
                  Building a stronger community through music education and cultural enrichment for all.
                </p>
              </div>

              <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-8 hover:border-orange-500/50 transition-all">
                <Award className="w-10 h-10 text-orange-400 mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Excellence in Arts</h3>
                <p className="text-neutral-400 text-sm">
                  Recognizing and nurturing exceptional talent through our annual scholarship awards program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentScholarships
