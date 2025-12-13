'use client'

import { getFooterLinks } from '../utils/navigation.utils'
import useCustomPathname from '../hooks/useCustomPathname'
import Link from 'next/link'
import TitleWithLine from './common/TitleWithLine'
import { RootState, useAppSelector } from '../redux/store'
import EditableTextArea from './common/EditableTextArea'
import { ChevronUp, MapPin, Pencil, Phone } from 'lucide-react'
import { socialLinks } from '@/public/data/home.data'
import { sendGAEvent } from '@next/third-parties/google'

const Footer = () => {
  const path = useCustomPathname()
  const footerLinks = getFooterLinks(path)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

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
    <footer className="border-t-3 border-t-blaze">
      <section className="bg-duskgray w-full px-4 pt-28 py-40">
        <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative grid grid-cols-12 gap-y-16">
          <div className="col-span-12 990:col-span-4 flex flex-col items-center gap-y-10">
            <Link href="/" className={`bg-golden50Logo bg-no-repeat bg-contain bg-center w-60 h-[200px]`} />
            <div className="w-full flex justify-center gap-x-2">
              {socialLinks.map((link, i) => {
                const IconComponent = link.icon
                return (
                  <a
                    key={i}
                    onClick={() => {
                      sendGAEvent('event', 'social_media_click', {
                        platform: extractPlatform(link.linkKey),
                        social_url: link.linkKey,
                        icon_position: i + 1,
                        click_location: 'footer_social_bar',
                        source_page: window.location.pathname,
                        engagement_type: 'outbound_social'
                      })
                    }}
                    target="_blank"
                    href={link.linkKey}
                    className="w-12 h-12 rounded-full bg-inkblack border-2 border-inkblack flex items-center justify-center border-l-2 border-l-blaze hover:shadow-adminbtn duration-300"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>
          <div className="col-span-12 990:col-span-4 flex flex-col gap-y-10 items-center">
            <TitleWithLine
              title={textBlockMap?.FOOTER_BLOCK?.contactInfoTitle}
              type="FOOTER_BLOCK"
              textBlockKey="contactInfoTitle"
            />
            <ul className="flex flex-col items-center gap-y-3 text-white font-lato">
              <li className="flex items-center gap-x-2">
                <Pencil className="text-blaze w-3.5 h-3.5" />
                <EditableTextArea
                  tag="div"
                  initialValue={textBlockMap?.FOOTER_BLOCK?.contactInfoLine1}
                  type="FOOTER_BLOCK"
                  textBlockKey="contactInfoLine1"
                />
              </li>
              <li className="flex items-center gap-x-2">
                <MapPin className="text-blaze w-3.5 h-3.5" />
                <EditableTextArea
                  tag="div"
                  initialValue={textBlockMap?.FOOTER_BLOCK?.contactInfoLine2}
                  type="FOOTER_BLOCK"
                  textBlockKey="contactInfoLine2"
                />
              </li>
              <li className="flex items-center gap-x-2">
                <Phone className="text-blaze w-3.5 h-3.5" />
                <EditableTextArea
                  tag="div"
                  initialValue={textBlockMap?.FOOTER_BLOCK?.contactInfoLine3 || '941 926 POPS (7677)'}
                  type="FOOTER_BLOCK"
                  textBlockKey="contactInfoLine3"
                />
              </li>
            </ul>
          </div>
          <nav className="col-span-12 990:col-span-4 flex flex-col gap-y-10 items-center">
            <TitleWithLine
              title={textBlockMap?.FOOTER_BLOCK?.quickLinksTitle}
              type="FOOTER_BLOCK"
              textBlockKey="quickLinksTitle"
            />
            <div className="flex flex-col items-center gap-y-3">
              {footerLinks.map((link, i) => (
                <Link
                  href={link.linkKey}
                  onClick={() => {
                    sendGAEvent('event', 'footer_link_click', {
                      link_text: link.textKey,
                      link_url: link.linkKey,
                      link_type: link.linkKey.startsWith('http') ? 'external' : 'internal',
                      link_position: i + 1,
                      link_category: link.textKey === 'Donations' ? 'donation_cta' : 'footer_navigation',
                      is_active: link.active,
                      source_page: window.location.pathname
                    })
                  }}
                  target={link.textKey === 'Donations' ? '_blank' : ''}
                  key={i}
                  className="text-white font-lato cursor-pointer duration-300 hover:text-blaze"
                >
                  {link.textKey}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </section>
      <section className="px-4 py-12 relative">
        <div className="w-full mx-auto flex flex-col gap-y-2 items-center justify-center text-lg text-white">
          <div className="font-changa text-12 uppercase">Copyright &copy; {new Date().getFullYear()}</div>
          <Link
            href="https://sqysh.io?lead_source=the_pops_orchestra"
            onClick={() => {
              sendGAEvent('event', 'developer_credit_click', {
                link_text: 'Sqysh',
                link_url: 'https://sqysh.io',
                link_type: 'developer_attribution',
                lead_source: 'the_pops_orchestra',
                click_location: 'footer_credits',
                source_page: window.location.pathname,
                engagement_type: 'outbound_referral'
              })
            }}
            target="_blank"
            className="text-white text-sm font-bold font-raleway duration-300 hover:text-lime-400"
          >
            Sqysh
          </Link>
        </div>
        <ChevronUp
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-6 right-10 z-10 text-white w-5 h-5 cursor-pointer hover:text-blaze duration-300"
        />
      </section>
    </footer>
  )
}

export default Footer
