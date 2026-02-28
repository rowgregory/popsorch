'use client'

import Breadcrumb from '@/app/components/common/Breadcrumb'
import OrchMapLight from '@/app/components/OrchMapLight'
import ContactForm from '@/app/components/forms/ContactForm'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/public/data/home.data'

export const ContactClient = ({ data }) => {
  const field = (id: string) => data?.content?.find((item) => item.id === id)?.value ?? ''

  return (
    <>
      <Breadcrumb breadcrumb="Contact" />
      <section aria-labelledby="contact-form-heading" className="px-4 990:px-12 xl:px-4">
        <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-7xl w-full mx-auto grid grid-cols-12 990:gap-x-12 pt-32 pb-44">
          <div className="order-2 990:order-1 col-span-12 990:col-span-8 mb-12 990:mb-0">
            <div className="bg-duskgray p-7 430:p-14 rounded-md">
              <h1 id="contact-form-heading" className="font-changa text-2xl text-white mb-2">
                {field('contact_form_heading')}
              </h1>
              <div className="w-12 h-0.5 bg-blaze mb-8" aria-hidden="true" />
              <ContactForm btnClassname="justify-start" />
            </div>
          </div>

          <aside
            aria-label="Contact information"
            className="order-1 990:order-2 col-span-12 990:col-span-4 flex flex-col gap-y-4"
          >
            <section aria-labelledby="contact-info-heading" className="bg-duskgray p-7 rounded-md">
              <h2 id="contact-info-heading" className="font-changa text-2xl text-white mb-2">
                {field('contact_sidebar_heading')}
              </h2>
              <div className="w-12 h-0.5 bg-blaze mb-6" aria-hidden="true" />
              <address className="not-italic space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-sunburst shrink-0 mt-1" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="font-changa text-xs text-sunburst uppercase tracking-wider mb-1">
                      {field('contact_sidebar_email_label')}
                    </p>

                    <a
                      href={`mailto:${field('contact_sidebar_email_value')}`}
                      className="font-lato text-sm text-white hover:text-sunburst transition-colors break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunburst focus-visible:ring-offset-2 focus-visible:ring-offset-duskgray rounded-sm"
                    >
                      {field('contact_sidebar_email_value')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-sunburst shrink-0 mt-1" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="font-changa text-xs text-sunburst uppercase tracking-wider mb-1">
                      {field('contact_sidebar_address_label')}
                    </p>

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(field('contact_sidebar_address_value'))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${field('contact_sidebar_address_value')} — open in Google Maps (opens in new tab)`}
                      className="font-lato text-sm text-white hover:text-sunburst transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunburst focus-visible:ring-offset-2 focus-visible:ring-offset-duskgray rounded-sm"
                    >
                      {field('contact_sidebar_address_value')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-sunburst shrink-0 mt-1" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="font-changa text-xs text-sunburst uppercase tracking-wider mb-1">
                      {field('contact_sidebar_phone_label')}
                    </p>

                    <a
                      href="tel:+19419267677"
                      aria-label={`Call us at ${field('contact_sidebar_phone_value')}`}
                      className="font-lato text-sm text-white hover:text-sunburst transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunburst focus-visible:ring-offset-2 focus-visible:ring-offset-duskgray rounded-sm"
                    >
                      {field('contact_sidebar_phone_value')}
                    </a>
                  </div>
                </div>
              </address>
            </section>

            <section aria-labelledby="contact-social-heading" className="bg-duskgray p-7 rounded-md">
              <h2
                id="contact-social-heading"
                className="font-changa text-xs text-sunburst uppercase tracking-wider mb-4"
              >
                {field('contact_follow_us_heading')}
              </h2>
              <ul role="list" className="flex items-center gap-3">
                <li className="flex-1">
                  <a
                    href={field('contact_social_facebook_url')}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Facebook (opens in new tab)"
                    className="h-12 bg-charcoalgray hover:bg-charcoalgray/70 flex items-center justify-center transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunburst focus-visible:ring-offset-2 focus-visible:ring-offset-duskgray rounded-sm"
                  >
                    <FacebookIcon
                      className="w-5 h-5 text-slatemist group-hover:text-sunburst transition-colors"
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li className="flex-1">
                  <a
                    href={field('contact_social_instagram_url')}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Instagram (opens in new tab)"
                    className="h-12 bg-charcoalgray hover:bg-charcoalgray/70 flex items-center justify-center transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunburst focus-visible:ring-offset-2 focus-visible:ring-offset-duskgray rounded-sm"
                  >
                    <InstagramIcon
                      className="w-5 h-5 text-slatemist group-hover:text-sunburst transition-colors"
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li className="flex-1">
                  <a
                    href={field('contact_social_youtube_url')}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on YouTube (opens in new tab)"
                    className="h-12 bg-charcoalgray hover:bg-charcoalgray/70 flex items-center justify-center transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunburst focus-visible:ring-offset-2 focus-visible:ring-offset-duskgray rounded-sm"
                  >
                    <YouTubeIcon
                      className="w-5 h-5 text-slatemist group-hover:text-sunburst transition-colors"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              </ul>
            </section>

            <section aria-labelledby="contact-hours-heading" className="bg-duskgray p-7 rounded-md">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-sunburst" aria-hidden="true" />
                <h2 id="contact-hours-heading" className="font-changa text-xs text-sunburst uppercase tracking-wider">
                  {field('contact_office_hours_heading')}
                </h2>
              </div>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-lato text-sm text-slatemist">{field('contact_office_hours_weekday_label')}</dt>
                  <dd className="font-lato text-sm text-white font-semibold">
                    {field('contact_office_hours_weekday_value')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-lato text-sm text-slatemist">{field('contact_office_hours_weekend_label')}</dt>
                  <dd className="font-lato text-sm text-slatemist">{field('contact_office_hours_weekend_value')}</dd>
                </div>
              </dl>
            </section>
          </aside>
        </div>
      </section>

      <div
        className="relative h-125 w-full"
        aria-label="Map showing office location at 502 3rd Ave W, Bradenton, FL 34205"
        role="region"
      >
        <OrchMapLight latitude={27.49781} longitude={-82.567787} address={field('contact_sidebar_address_value')} />
      </div>
    </>
  )
}
