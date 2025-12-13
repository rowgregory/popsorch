'use client'

import Breadcrumb from '../components/common/Breadcrumb'
import OrchMapLight from '../components/OrchMapLight'
import ContactForm from '../forms/ContactForm'
import { RootState, useAppSelector, useQuestionSelector } from '../redux/store'
import TitleWithLine from '../components/common/TitleWithLine'
import EditableTextArea from '../components/common/EditableTextArea'
import { CheckCircle, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/public/data/home.data'

const Contact = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { success } = useQuestionSelector()

  return (
    <>
      <Breadcrumb breadcrumb="Contact" />
      <div className="relative bg-gradient-to-b from-black via-neutral-950 to-black overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blaze/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sunburst/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 px-4 lg:px-12 xl:px-4 py-16 lg:py-24">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Side - Form */}
            <div className="lg:col-span-8">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-12 text-center shadow-2xl"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Message Received!</h2>
                  <p className="text-lg text-neutral-300 max-w-lg mx-auto">
                    Thank you for reaching out. Someone from <span className="text-blaze font-semibold">The Pops</span>{' '}
                    will be in touch with you shortly.
                  </p>
                </motion.div>
              ) : (
                <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8 lg:p-12 shadow-2xl">
                  <div className="mb-8">
                    <TitleWithLine
                      title={textBlockMap?.CONTACT_PAGE?.contactPageTitle || 'Have a Question?'}
                      type="CONTACT_PAGE"
                      textBlockKey="contactPageTitle"
                    />
                  </div>
                  <ContactForm btnClassname="justify-start" />
                </div>
              )}
            </div>

            {/* Right Side - Contact Info */}
            <div className="lg:col-span-4 space-y-6">
              {/* Contact Info Card */}
              <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <div className="mb-6">
                  <TitleWithLine
                    title={textBlockMap?.FOOTER_BLOCK?.contactInfoTitle || 'Get In Touch'}
                    type="FOOTER_BLOCK"
                    textBlockKey="contactInfoTitle"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl hover:border-blaze/50 transition-all group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blaze to-sunburst rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-1">Email</p>
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.FOOTER_BLOCK?.contactInfoLine1}
                        type="FOOTER_BLOCK"
                        textBlockKey="contactInfoLine1"
                        className="text-white hover:text-blaze transition-colors break-all overflow-wrap-anywhere"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl hover:border-blaze/50 transition-all group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blaze to-sunburst rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-1">Address</p>
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.FOOTER_BLOCK?.contactInfoLine2}
                        type="FOOTER_BLOCK"
                        textBlockKey="contactInfoLine2"
                        className="text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl hover:border-blaze/50 transition-all group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blaze to-sunburst rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-1">Phone</p>
                      <EditableTextArea
                        tag="div"
                        initialValue={textBlockMap?.FOOTER_BLOCK?.contactInfoLine3 || '941 926 POPS (7677)'}
                        type="FOOTER_BLOCK"
                        textBlockKey="contactInfoLine3"
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Follow Us</h3>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/ThePopsOrchestra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-12 bg-neutral-800/50 hover:bg-neutral-700/50 backdrop-blur-sm border border-neutral-700/50 hover:border-blaze/50 rounded-xl flex items-center justify-center transition-all group"
                  >
                    <FacebookIcon className="w-5 h-5 text-neutral-400 group-hover:text-blaze transition-colors" />
                  </a>

                  <a
                    href="https://www.instagram.com/thepopsorchestra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-12 bg-neutral-800/50 hover:bg-neutral-700/50 backdrop-blur-sm border border-neutral-700/50 hover:border-blaze/50 rounded-xl flex items-center justify-center transition-all group"
                  >
                    <InstagramIcon className="w-5 h-5 text-neutral-400 group-hover:text-blaze transition-colors" />
                  </a>

                  <a
                    href="https://www.youtube.com/user/SarasotaPops1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-12 bg-neutral-800/50 hover:bg-neutral-700/50 backdrop-blur-sm border border-neutral-700/50 hover:border-blaze/50 rounded-xl flex items-center justify-center transition-all group"
                  >
                    <YouTubeIcon className="w-5 h-5 text-neutral-400 group-hover:text-blaze transition-colors" />
                  </a>
                </div>
              </div>

              {/* Office Hours Card */}
              <div className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-blaze" />
                  <h3 className="text-white font-bold text-sm uppercase tracking-wider">Office Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Monday - Friday</span>
                    <span className="text-white font-semibold">9AM - 5PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Saturday - Sunday</span>
                    <span className="text-neutral-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative h-[500px] w-full border-t border-neutral-800">
        <OrchMapLight latitude={27.49781} longitude={-82.567787} address="502 3rd Ave W, Bradenton, FL 34205" />
      </div>
    </>
  )
}

export default Contact
