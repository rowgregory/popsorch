'use client'

import Link from 'next/link'
import TitleWithLine from './common/TitleWithLine'
import { ChevronUp, MapPin, Pencil, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '@/public/data/home.data'
import { sendGAEvent } from '@next/third-parties/google'

const Footer = ({ data }: { data: any[] }) => {
  console.log('data: ', data)
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
      {/* Main footer */}
      <section className="px-4 sm:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Top — Logo centered */}
          <div className="flex flex-col items-center mb-12">
            <Link href="/" className="bg-golden50Logo bg-no-repeat bg-contain bg-center w-48 h-36 mb-6" />
            <div className="flex justify-center flex-wrap gap-2">
              {socialLinks.map((link, i) => {
                const IconComponent = link.icon
                return (
                  <a
                    key={i}
                    onClick={() =>
                      sendGAEvent('event', 'social_media_click', {
                        platform: extractPlatform(link.linkKey),
                        social_url: link.linkKey,
                        icon_position: i + 1,
                        click_location: 'footer_social_bar',
                        source_page: window.location.pathname,
                        engagement_type: 'outbound_social'
                      })
                    }
                    target="_blank"
                    href={link.linkKey}
                    className="w-9 h-9 rounded-full bg-inkblack border border-blaze/40 flex items-center justify-center hover:border-blaze hover:shadow-adminbtn duration-300"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-white" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mb-12" />

          {/* Three columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {/* Contact */}
            <div className="flex flex-col items-center gap-y-4">
              <TitleWithLine title={d('footer_contact_title')} />
              <ul className="flex flex-col items-center gap-y-2.5 text-white/70 font-lato text-sm">
                <li className="flex items-center gap-x-2">
                  <Pencil className="text-blaze w-3 h-3 shrink-0" />
                  <span>{d('footer_contact_line1')}</span>
                </li>
                <li className="flex items-center gap-x-2">
                  <MapPin className="text-blaze w-3 h-3 shrink-0" />
                  <span>{d('footer_contact_line2')}</span>
                </li>
                <li className="flex items-center gap-x-2">
                  <Phone className="text-blaze w-3 h-3 shrink-0" />
                  <span>{d('footer_contact_line3')}</span>
                </li>
              </ul>
            </div>

            {/* Quick Links — desktop */}
            <div className="hidden sm:flex flex-col items-center gap-y-4">
              <TitleWithLine title={d('footer_quick_links_title')} />
              <nav className="flex flex-col items-center gap-y-2">
                {footerLinks.map((link, i) => (
                  <Link
                    href={link.linkKey}
                    onClick={() =>
                      sendGAEvent('event', 'footer_link_click', {
                        link_text: link.textKey,
                        link_url: link.linkKey,
                        link_type: link.linkKey.startsWith('http') ? 'external' : 'internal',
                        link_position: i + 1,
                        link_category: link.textKey === 'Donations' ? 'donation_cta' : 'footer_navigation',
                        source_page: window.location.pathname
                      })
                    }
                    target={link.linkKey.startsWith('http') ? '_blank' : ''}
                    key={i}
                    className="text-white/70 font-lato text-sm cursor-pointer duration-300 hover:text-blaze"
                  >
                    {link.textKey}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Quick Links — mobile */}
            <div className="flex sm:hidden flex-col items-center gap-y-4">
              <TitleWithLine title={d('footer_quick_links_title')} />
              <nav className="flex flex-col items-center gap-y-2">
                {footerLinks.map((link, i) => (
                  <Link
                    href={link.linkKey}
                    target={link.linkKey.startsWith('http') ? '_blank' : ''}
                    key={i}
                    className="text-white/70 font-lato text-sm cursor-pointer duration-300 hover:text-blaze"
                  >
                    {link.textKey}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Tagline */}
            <div className="flex flex-col items-center gap-y-4">
              <p className="font-changa text-xs uppercase tracking-widest text-blaze">{d('footer_tagline_label')}</p>
              <p className="text-white/50 font-lato text-sm text-center leading-relaxed max-w-xs">
                {d('footer_tagline_description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom bar */}
      <section className="border-t border-white/10 px-4 py-5 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-changa text-xs uppercase tracking-widest text-white/40">
            Copyright &copy; {new Date().getFullYear()} The Pops Orchestra
          </p>
          <Link
            href="https://sqysh.io?lead_source=the_pops_orchestra"
            onClick={() =>
              sendGAEvent('event', 'developer_credit_click', {
                link_text: 'Sqysh',
                link_url: 'https://sqysh.io',
                link_type: 'developer_attribution',
                lead_source: 'the_pops_orchestra',
                click_location: 'footer_credits',
                source_page: window.location.pathname,
                engagement_type: 'outbound_referral'
              })
            }
            target="_blank"
            className="flex items-center gap-1 group"
          >
            <span className="text-white/40 text-xs font-lato duration-300 group-hover:text-white/60">
              Designed & Developed by
            </span>
            <span className="sqysh-gradient text-white text-xs font-bold font-raleway duration-300">Sqysh</span>
          </Link>
        </div>
        <ChevronUp
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute top-1/2 -translate-y-1/2 right-6 text-white/40 w-4 h-4 cursor-pointer hover:text-blaze duration-300"
        />
      </section>
    </footer>
  )
}

export default Footer
