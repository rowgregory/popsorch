'use client'

import Breadcrumb from '@/app/components/common/Breadcrumb'
import OrchMapLight from '@/app/components/OrchMapLight'
import ContactForm from '@/app/components/forms/ContactForm'
import { useTextBlockSelector } from '@/app/redux/store'
import TitleWithLine from '@/app/components/common/TitleWithLine'
import EditableTextArea from '@/app/components/common/EditableTextArea'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/public/data/home.data'

const Contact = () => {
  const { textBlockMap } = useTextBlockSelector()

  return (
    <>
      <Breadcrumb breadcrumb="Contact" />
      <section className="px-4 990:px-12 xl:px-4">
        <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto grid grid-cols-12 990:gap-x-12 pt-32 pb-44">
          {/* Left Side - Form */}
          <div className="order-2 990:order-1 col-span-12 990:col-span-8 mb-12 990:mb-0">
            <div className="bg-duskgray p-7 430:p-14">
              <div className="mb-8">
                <TitleWithLine
                  title={textBlockMap?.CONTACT_PAGE?.contactPageTitle || 'Have a Question?'}
                  type="CONTACT_PAGE"
                  textBlockKey="contactPageTitle"
                />
              </div>
              <ContactForm btnClassname="justify-start" />
            </div>
          </div>

          {/* Right Side - Contact Info */}
          <div className="order-1 990:order-2 col-span-12 990:col-span-4 flex flex-col gap-y-4">
            {/* Contact Info */}
            <div className="bg-duskgray p-7">
              <div className="mb-6">
                <TitleWithLine
                  title={textBlockMap?.FOOTER_BLOCK?.contactInfoTitle || 'Get In Touch'}
                  type="FOOTER_BLOCK"
                  textBlockKey="contactInfoTitle"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-sunburst shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="font-changa text-xs text-sunburst uppercase tracking-wider mb-1">Email</p>
                    <EditableTextArea
                      tag="div"
                      initialValue={textBlockMap?.FOOTER_BLOCK?.contactInfoLine1}
                      type="FOOTER_BLOCK"
                      textBlockKey="contactInfoLine1"
                      className="font-lato text-sm text-white hover:text-sunburst transition-colors break-all"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-sunburst shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="font-changa text-xs text-sunburst uppercase tracking-wider mb-1">Address</p>
                    <EditableTextArea
                      tag="div"
                      initialValue={textBlockMap?.FOOTER_BLOCK?.contactInfoLine2}
                      type="FOOTER_BLOCK"
                      textBlockKey="contactInfoLine2"
                      className="font-lato text-sm text-white"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-sunburst shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="font-changa text-xs text-sunburst uppercase tracking-wider mb-1">Phone</p>
                    <EditableTextArea
                      tag="div"
                      initialValue={textBlockMap?.FOOTER_BLOCK?.contactInfoLine3 || '941 926 POPS (7677)'}
                      type="FOOTER_BLOCK"
                      textBlockKey="contactInfoLine3"
                      className="font-lato text-sm text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-duskgray p-7">
              <p className="font-changa text-xs text-sunburst uppercase tracking-wider mb-4">Follow Us</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/ThePopsOrchestra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-12 bg-charcoalgray hover:bg-charcoalgray/70 flex items-center justify-center transition-colors group"
                >
                  <FacebookIcon className="w-5 h-5 text-slatemist group-hover:text-sunburst transition-colors" />
                </a>

                <a
                  href="https://www.instagram.com/thepopsorchestra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-12 bg-charcoalgray hover:bg-charcoalgray/70 flex items-center justify-center transition-colors group"
                >
                  <InstagramIcon className="w-5 h-5 text-slatemist group-hover:text-sunburst transition-colors" />
                </a>

                <a
                  href="https://www.youtube.com/user/SarasotaPops1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-12 bg-charcoalgray hover:bg-charcoalgray/70 flex items-center justify-center transition-colors group"
                >
                  <YouTubeIcon className="w-5 h-5 text-slatemist group-hover:text-sunburst transition-colors" />
                </a>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-duskgray p-7">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-sunburst" />
                <p className="font-changa text-xs text-sunburst uppercase tracking-wider">Office Hours</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-lato text-sm text-slatemist">Monday - Friday</span>
                  <span className="font-lato text-sm text-white font-semibold">9AM - 5PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-lato text-sm text-slatemist">Saturday - Sunday</span>
                  <span className="font-lato text-sm text-slatemist">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <div className="relative h-125 w-full">
        <OrchMapLight latitude={27.49781} longitude={-82.567787} address="502 3rd Ave W, Bradenton, FL 34205" />
      </div>
    </>
  )
}

export default Contact
