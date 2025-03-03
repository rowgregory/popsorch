'use client'

import React from 'react'
import AnimatedSectionHeader from './common/AnimatedSectionHeader'
import { getFooterLinks } from '../utils/navigation.utils'
import useCustomPathname from '../hooks/useCustomPathname'
import Link from 'next/link'

const Footer = () => {
  const path = useCustomPathname()
  const footerLinks = getFooterLinks(path)

  return (
    <footer>
      <section className="bg-lavendermist dark:bg-[#080d1a] pl-4 py-14 md:px-12 md:py-24 w-full">
        <div className="max-w-[516px] md:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative grid grid-cols-12 gap-y-16 430:gap-x-20">
          <div className="col-span-12 1315:col-span-6">
            <AnimatedSectionHeader title="Contact The Pops" />
            <h1 className="text-lg 430:text-2xl 576:text-[36px] text-gunmetal dark:text-gray-200 mt-10 mb-7 font-bold">
              info@ThePopsOrchestra.org
            </h1>
            <h2 className="430:text-lg 576:text-2xl text-mutedslate mb-4 font-semibold">P.O. Box 1622, Sarasota, FL 34230</h2>
            <h3 className="430:text-lg 576:text-2xl text-mutedslate mb-4 font-semibold">941 926 POPS (7677)</h3>
          </div>
          <div className="col-span-12 1315:col-span-6">
            <AnimatedSectionHeader title="The Pops Links" />
            <h1 className="text-2xl 576:text-[36px] text-gunmetal dark:text-gray-200 mt-10 mb-7 font-bold">Quick Links</h1>
            <nav className="flex flex-col gap-y-3">
              {footerLinks.map((link, i) => (
                <Link
                  href={link.linkKey}
                  key={i}
                  className="430:text-lg 576:text-2xl text-mutedslate font-semibold hover:text-blaze duration-150 hover:translate-x-3"
                >
                  {link.textKey}
                </Link>
              ))}
            </nav>
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
