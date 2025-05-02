'use client'

import React from 'react'
import { getFooterLinks } from '../utils/navigation.utils'
import useCustomPathname from '../hooks/useCustomPathname'
import Link from 'next/link'
import LogoWRobyn from './LogoWRobyn'
import AwesomeIcon from './common/AwesomeIcon'
import {
  chevronUpIcon,
  facebookIcon,
  instagramIcon,
  mapLocationDotIcon,
  pencilIcon,
  phoneIcon,
  youtubeIcon
} from '../lib/icons'
import TitleWithLine from './common/TitleWithLine'

const socialLinks = [
  {
    icon: facebookIcon,
    linkKey: 'https://www.facebook.com/ThePopsOrchestra',
    textKey: 'facebook.com/ThePopsOrchestra'
  },
  {
    icon: instagramIcon,
    linkKey: 'https://www.instagram.com/thepopsorchestra/',
    textKey: 'instagram.com/ThePopsOrchestra'
  },
  {
    icon: youtubeIcon,
    linkKey: 'https://www.youtube.com/user/SarasotaPops1',
    textKey: 'youtube.com/user/SarasotaPops1'
  }
]

const Footer = () => {
  const path = useCustomPathname()
  const footerLinks = getFooterLinks(path)

  return (
    <footer className="border-t-3 border-t-blaze">
      <section className="bg-duskgray w-full px-4 pt-28 py-40">
        <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative grid grid-cols-12 gap-y-16">
          <div className="col-span-12 990:col-span-4 flex flex-col items-center gap-y-10">
            <LogoWRobyn imgDimensions="h-60" logoClassname="h-[246px] text-blaze" linkKey="#" />
            <div className="w-full flex justify-center gap-x-2">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  target="_blank"
                  href={link.linkKey}
                  className="w-12 h-12 rounded-full bg-inkblack border-2 border-inkblack flex items-center justify-center border-l-2 border-l-blaze hover:shadow-adminbtn duration-300"
                >
                  <AwesomeIcon icon={link.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-12 990:col-span-4 flex flex-col gap-y-10 items-center">
            <TitleWithLine title="Contact" />
            <ul className="flex flex-col items-center gap-y-3 text-[#b2b2b2] font-lato">
              <li className="flex items-center gap-x-2">
                <AwesomeIcon icon={pencilIcon} className="text-blaze w-3.5 h-3.5" />
                info@ThePopsOrchestra.org
              </li>
              <li className="flex items-center gap-x-2">
                <AwesomeIcon icon={mapLocationDotIcon} className="text-blaze w-3.5 h-3.5" />
                P.O. Box 1622, Sarasota, FL 34230
              </li>
              <li className="flex items-center gap-x-2">
                <AwesomeIcon icon={phoneIcon} className="text-blaze w-3.5 h-3.5" />
                941 926 POPS (7677)
              </li>
            </ul>
          </div>
          <nav className="col-span-12 990:col-span-4 flex flex-col gap-y-10 items-center">
            <TitleWithLine title="Quick Links" />
            <div className="flex flex-col items-center gap-y-3">
              {footerLinks.map((link, i) => (
                <Link
                  href={link.linkKey}
                  target={link.textKey === 'Donations' ? '_blank' : ''}
                  key={i}
                  className="text-[#b2b2b2] font-lato cursor-pointer duration-300 hover:text-blaze"
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
            href="https://sqysh.io"
            target="_blank"
            className="text-white text-sm font-bold font-raleway duration-300 hover:text-lime-400"
          >
            Sqysh
          </Link>
        </div>
        <AwesomeIcon
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          icon={chevronUpIcon}
          className="absolute bottom-6 right-10 z-10 text-white w-5 h-5 cursor-pointer hover:text-blaze duration-300"
        />
      </section>
    </footer>
  )
}

export default Footer
