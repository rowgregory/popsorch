'use client'

import React from 'react'
import AnimatedSectionHeader from './common/AnimatedSectionHeader'
import { getFooterLinks } from '../utils/navigation.utils'
import useCustomPathname from '../hooks/useCustomPathname'
import Link from 'next/link'
import FbSVG from './svg/FbSVG'
import YouTubeSVG from './svg/YouTubeSVG'
import InstaSVG from './svg/InstaSVG'
import LogoWRobyn from './LogoWRobyn'

const socialLinks = [
  {
    icon: <FbSVG />,
    linkKey: 'https://www.facebook.com/ThePopsOrchestra',
    textKey: 'facebook.com/ThePopsOrchestra'
  },
  {
    icon: <YouTubeSVG />,
    linkKey: 'https://www.youtube.com/user/SarasotaPops1',
    textKey: 'youtube.com/user/SarasotaPops1'
  },
  {
    icon: <InstaSVG />,
    linkKey: 'https://www.instagram.com/thepopsorchestra/',
    textKey: 'instagram.com/ThePopsOrchestra'
  }
]

const Footer = () => {
  const path = useCustomPathname()
  const footerLinks = getFooterLinks(path)

  return (
    <footer>
      <section className="bg-lavendermist dark:bg-[#080d1a] pl-4 py-14 md:px-12 md:py-24 w-full">
        <div className="max-w-[516px] md:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative grid grid-cols-12 gap-y-16 430:gap-x-12">
          <div className="col-span-12 flex items-center justify-center">
            <LogoWRobyn imgDimensions="h-60" logoClassname="h-60 w-60" />
          </div>
          <div className="col-span-12 flex flex-col gap-y-2 pb-10 pt-7 items-center justify-center">
            <h1>Join Our Email List</h1>
            <Link
              href="/opt-in"
              className="text-white bg-blaze rounded-3xl px-10 py-3 flex flex-col font-medium text-xl text-center group overflow-hidden"
            >
              <span className="group relative inline-block">
                <span className="group-hover:-translate-y-12 translate-y-0 duration-150 inline-block">Join Now</span>
                <span className="absolute left-0 right-0 group-hover:translate-y-0 translate-y-12 duration-150 text-white">Join Now</span>
              </span>
              {/* <span className="group-hover:translate-y-0 translate-y-12 duration-150">Join Now</span> */}
            </Link>
          </div>
          <div className="col-span-12 1200:col-span-4">
            <AnimatedSectionHeader title="Contact The Pops" />
            <h1 className="430:text-lg text-mutedslate mb-4 font-semibold mt-7">info@ThePopsOrchestra.org</h1>
            <h2 className="430:text-lg text-mutedslate mb-4 font-semibold">P.O. Box 1622, Sarasota, FL 34230</h2>
            <h3 className="430:text-lg text-mutedslate mb-4 font-semibold">941 926 POPS (7677)</h3>
          </div>
          <div className="col-span-12 1200:col-span-4">
            <AnimatedSectionHeader title="The Pops Links" />
            <nav className="flex flex-col gap-y-3 mt-7">
              {footerLinks.map((link, i) => (
                <Link
                  href={link.linkKey}
                  key={i}
                  className="430:text-lg text-mutedslate font-semibold hover:text-blaze duration-150 hover:translate-x-3"
                >
                  {link.textKey}
                </Link>
              ))}
            </nav>
          </div>
          <div className="col-span-12 1200:col-span-4">
            <AnimatedSectionHeader title="Socials" />
            <div className="flex flex-col gap-y-3 mt-7">
              {socialLinks.map((link, i) => (
                <Link href={link.linkKey} target="_blank" key={i} className="flex items-center gap-x-6 group relative">
                  <div className="rounded-full overflow-hidden absolute -translate-x-12 transform duration-150 group-hover:-translate-x-8 left-0 top-0 z-10 opacity-0 group-hover:opacity-100">
                    {link.icon}
                  </div>
                  <div className="430:text-lg text-mutedslate font-semibold hover:text-blaze duration-150 hover:translate-x-3">
                    {link.textKey}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="p-4 md:p-12">
        <div className="max-w-[516px] md:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto flex flex-col 430:flex-row items-center justify-center 430:justify-between text-lg font-semibold text-mutedslate">
          <div className="flex flex-col 430:flex-row items-center">
            <div>Copyright &copy; {new Date().getFullYear()}</div>
          </div>
          <Link
            href="https://sqysh.io"
            target="_blank"
            className="my-3 430:my-0 hover:text-sky-500 dark:hover:text-indigo-600 duration-150"
          >
            Sqysh
          </Link>
        </div>
      </section>
    </footer>
  )
}

export default Footer
