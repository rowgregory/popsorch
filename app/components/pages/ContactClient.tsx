'use client'

import Breadcrumb from '@/app/components/common/Breadcrumb'
import OrchMapLight from '@/app/components/OrchMapLight'
import ContactForm from '@/app/components/forms/ContactForm'
import { Mail, MapPin, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/public/data/home.data'

export const ContactClient = ({ data }) => {
  const field = (id: string) => data?.content?.find((item) => item.id === id)?.value ?? ''

  return (
    <main id="main-content">
      <Breadcrumb breadcrumb="Contact" />

      <div className="relative">
        <div className="relative z-10 px-4 990:px-12 xl:px-4">
          <div className="max-w-[320px] 430:max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-screen-7xl mx-auto">
            {/* Page Header */}
            <header className="w-full text-center flex flex-col items-center pt-32 pb-20 border-b border-white/10">
              <p className="font-changa text-xs uppercase tracking-[0.3em] text-blaze mb-4">The Pops Orchestra</p>
              <div className="flex items-center gap-3 430:gap-4 justify-center mb-4">
                <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
                <h1 className="text-4xl 430:text-5xl sm:text-6xl font-changa text-white leading-none">
                  {field('contact_form_heading')}
                </h1>
                <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
              </div>
              <div className="w-16 h-px bg-blaze mx-auto mt-2" aria-hidden="true" />
            </header>

            {/* Main grid */}
            <div className="py-20 990:py-32 grid grid-cols-1 990:grid-cols-12 gap-px bg-white/10">
              {/* Form */}
              <div className="order-2 990:order-1 990:col-span-8 bg-black p-7 430:p-10 990:p-14">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                  <span className="font-changa text-xs uppercase tracking-[0.25em] text-blaze">Send a Message</span>
                </div>
                <ContactForm btnClassname="justify-start" />
              </div>

              {/* Sidebar */}
              <aside
                aria-label="Contact information"
                className="order-1 990:order-2 990:col-span-4 bg-black flex flex-col gap-px"
              >
                {/* Contact info */}
                <section aria-labelledby="contact-info-heading" className="bg-black p-6 430:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                    <h2
                      id="contact-info-heading"
                      className="font-changa text-xs uppercase tracking-[0.25em] text-blaze"
                    >
                      {field('contact_sidebar_heading')}
                    </h2>
                  </div>
                  <address className="not-italic flex flex-col divide-y divide-white/10">
                    <div className="flex items-start gap-4 pb-4">
                      <Mail className="w-4 h-4 text-blaze shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-changa text-[10px] uppercase tracking-widest text-white/40 mb-1">
                          {field('contact_sidebar_email_label')}
                        </p>

                        <a
                          href={`mailto:${field('contact_sidebar_email_value')}`}
                          className="font-lato text-sm text-white/70 hover:text-blaze transition-colors break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                        >
                          {field('contact_sidebar_email_value')}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4">
                      <MapPin className="w-4 h-4 text-blaze shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-changa text-[10px] uppercase tracking-widest text-white/40 mb-1">
                          {field('contact_sidebar_address_label')}
                        </p>

                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(field('contact_sidebar_address_value'))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${field('contact_sidebar_address_value')} — open in Google Maps (opens in new tab)`}
                          className="font-lato text-sm text-white/70 hover:text-blaze transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                        >
                          {field('contact_sidebar_address_value')}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pt-4">
                      <Phone className="w-4 h-4 text-blaze shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-changa text-[10px] uppercase tracking-widest text-white/40 mb-1">
                          {field('contact_sidebar_phone_label')}
                        </p>

                        <a
                          href="tel:+19419267677"
                          aria-label={`Call us at ${field('contact_sidebar_phone_value')}`}
                          className="font-lato text-sm text-white/70 hover:text-blaze transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                        >
                          {field('contact_sidebar_phone_value')}
                        </a>
                      </div>
                    </div>
                  </address>
                </section>

                {/* Social */}
                <section aria-labelledby="contact-social-heading" className="bg-black p-6 430:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                    <h2
                      id="contact-social-heading"
                      className="font-changa text-xs uppercase tracking-[0.25em] text-blaze"
                    >
                      {field('contact_follow_us_heading')}
                    </h2>
                  </div>
                  <ul role="list" className="flex items-center gap-2">
                    {[
                      { href: field('contact_social_facebook_url'), Icon: FacebookIcon, label: 'Facebook' },
                      { href: field('contact_social_instagram_url'), Icon: InstagramIcon, label: 'Instagram' },
                      { href: field('contact_social_youtube_url'), Icon: YouTubeIcon, label: 'YouTube' }
                    ].map(({ href, Icon, label }) => (
                      <li key={label} className="flex-1">
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow us on ${label} (opens in new tab)`}
                          className="h-11 bg-white/5 border border-white/10 hover:border-blaze/40 hover:bg-blaze/5 flex items-center justify-center transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
                        >
                          <Icon
                            className="w-4 h-4 text-white/40 group-hover:text-blaze transition-colors"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Hours */}
                <section aria-labelledby="contact-hours-heading" className="bg-black p-6 430:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                    <h2
                      id="contact-hours-heading"
                      className="font-changa text-xs uppercase tracking-[0.25em] text-blaze"
                    >
                      {field('contact_office_hours_heading')}
                    </h2>
                  </div>
                  <dl className="flex flex-col divide-y divide-white/10">
                    <div className="flex justify-between py-3">
                      <dt className="font-lato text-xs text-white/40">{field('contact_office_hours_weekday_label')}</dt>
                      <dd className="font-lato text-xs text-white">{field('contact_office_hours_weekday_value')}</dd>
                    </div>
                    <div className="flex justify-between py-3">
                      <dt className="font-lato text-xs text-white/40">{field('contact_office_hours_weekend_label')}</dt>
                      <dd className="font-lato text-xs text-white/40">{field('contact_office_hours_weekend_value')}</dd>
                    </div>
                  </dl>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div
        className="relative h-125 w-full border-t border-white/10"
        aria-label="Map showing office location at 502 3rd Ave W, Bradenton, FL 34205"
        role="region"
      >
        <OrchMapLight latitude={27.49781} longitude={-82.567787} address={field('contact_sidebar_address_value')} />
      </div>
    </main>
  )
}
