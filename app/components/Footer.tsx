'use client'

import Link from 'next/link'
import TitleWithLine from './common/TitleWithLine'
import { ChevronUp, MapPin, Pencil, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/public/data/home.data'
import { sendEnrichedGAEvent } from '../utils/sendEnrichedGAEvent'

const Footer = ({ data }: { data: any[] }) => {
  const d = (id: string) => data?.find((item) => item.id === id)?.value ?? ''

  const socialLinks = [
    { icon: FacebookIcon, linkKey: d('footer_social_facebook') },
    { icon: InstagramIcon, linkKey: d('footer_social_instagram') },
    { icon: YouTubeIcon, linkKey: d('footer_social_youtube') }
  ].filter((l) => l.linkKey)

  const footerLinks = [1, 2, 3, 4]
    .map((n) => ({
      textKey: d(`footer_link_${n}_text`),
      linkKey: d(`footer_link_${n}_url`)
    }))
    .filter((l) => l.textKey)

  const extractPlatform = (url: string): string => {
    if (url.includes('facebook.com')) return 'Facebook'
    if (url.includes('instagram.com')) return 'Instagram'
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter'
    if (url.includes('youtube.com')) return 'YouTube'
    if (url.includes('linkedin.com')) return 'LinkedIn'
    if (url.includes('tiktok.com')) return 'TikTok'
    return 'Unknown'
  }

  return (
    <footer className="border-t-2 border-t-blaze">
      <section aria-label="Footer main" className="px-4 sm:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <Link
              href="/"
              aria-label="The Pops Orchestra — home"
              className="bg-golden50Logo bg-no-repeat bg-contain bg-center w-48 h-36 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
            />
            <ul role="list" className="flex justify-center flex-wrap gap-2">
              {socialLinks.map((link, i) => {
                const IconComponent = link.icon
                const platform = extractPlatform(link.linkKey)
                return (
                  <li key={i}>
                    <a
                      href={link.linkKey}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${platform} (opens in new tab)`}
                      onClick={() => sendEnrichedGAEvent('social_media_click', platform, platform, 'footer_social_bar')}
                      className="w-9 h-9 rounded-full bg-inkblack border border-blaze/40 flex items-center justify-center hover:border-blaze hover:shadow-adminbtn duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      <IconComponent className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="w-full h-px bg-white/10 mb-12" aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center gap-y-4">
              <TitleWithLine title={d('footer_contact_title')} />
              <ul className="flex flex-col items-center gap-y-2.5 text-white/70 font-lato text-sm">
                <li className="flex items-center gap-x-2">
                  <Pencil className="text-blaze w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{d('footer_contact_line1')}</span>
                </li>
                <li className="flex items-center gap-x-2">
                  <MapPin className="text-blaze w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{d('footer_contact_line2')}</span>
                </li>
                <li className="flex items-center gap-x-2">
                  <Phone className="text-blaze w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{d('footer_contact_line3')}</span>
                </li>
              </ul>
            </div>

            <nav aria-label="Quick links" className="hidden sm:flex flex-col items-center gap-y-4">
              <TitleWithLine title={d('footer_quick_links_title')} />
              <ul role="list" className="flex flex-col items-center gap-y-2">
                {footerLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.linkKey}
                      target={link.linkKey.startsWith('http') ? '_blank' : undefined}
                      rel={link.linkKey.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={link.linkKey.startsWith('http') ? `${link.textKey} (opens in new tab)` : undefined}
                      onClick={() =>
                        sendEnrichedGAEvent('footer_link_click', link.linkKey, link.textKey, 'footer_quick_links')
                      }
                      className="text-white/70 font-lato text-sm duration-300 hover:text-blaze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze rounded-sm"
                    >
                      {link.textKey}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Quick links" className="flex sm:hidden flex-col items-center gap-y-4">
              <TitleWithLine title={d('footer_quick_links_title')} />
              <ul role="list" className="flex flex-col items-center gap-y-2">
                {footerLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.linkKey}
                      target={link.linkKey.startsWith('http') ? '_blank' : undefined}
                      rel={link.linkKey.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={link.linkKey.startsWith('http') ? `${link.textKey} (opens in new tab)` : undefined}
                      className="text-white/70 font-lato text-sm duration-300 hover:text-blaze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze rounded-sm"
                    >
                      {link.textKey}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col items-center gap-y-4">
              <p className="font-changa text-xs uppercase tracking-widest text-blaze">{d('footer_tagline_label')}</p>
              <p className="text-white/50 font-lato text-sm text-center leading-relaxed max-w-xs">
                {d('footer_tagline_description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Footer credits" className="border-t border-white/10 px-4 py-5 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-changa text-xs uppercase tracking-widest text-white/40">
            <small>Copyright &copy; {new Date().getFullYear()} The Pops Orchestra</small>
          </p>
          <Link
            href="https://sqysh.io?lead_source=the_pops_orchestra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Designed and developed by Sqysh (opens in new tab)"
            onClick={() => sendEnrichedGAEvent('developer_credit_click', 'https://sqysh.io', 'Sqysh', 'footer_credits')}
            className="flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
          >
            <span className="text-white/40 text-xs font-lato duration-300 group-hover:text-white/60" aria-hidden="true">
              Designed & Developed by
            </span>
            <span className="sqysh-gradient text-white text-xs font-bold font-raleway duration-300">Sqysh</span>
          </Link>
        </div>
        <button
          type="button"
          aria-label="Scroll back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute top-1/2 -translate-y-1/2 right-6 text-white/40 hover:text-blaze duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm p-1"
        >
          <ChevronUp className="w-4 h-4" aria-hidden="true" />
        </button>
      </section>
    </footer>
  )
}

export default Footer
