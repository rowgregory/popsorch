import React from 'react'
import FbSVG from '../svg/FbSVG'
import Link from 'next/link'
import YouTubeSVG from '../svg/YouTubeSVG'
import InstaSVG from '../svg/InstaSVG'
import RotatingRing from '../svg/RotatingRing'
import Star4PointsSVG from '../svg/Star4PointsSVG'
import BannerLogoSVG from '../svg/BannerLogoSVG'

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

const LeftSection = () => (
  <div className="w-full 576:w-full md:w-fit relative">
    <div className="mb-3 md:mb-0 md:absolute bottom-0 w-24 md:w-36  990:w-44 1590:w-56 right-[25px]">
      <div className="relative">
        <RotatingRing />
        <Star4PointsSVG />
      </div>
    </div>
    <BannerLogoSVG />
  </div>
)

const RightSection = () => (
  <div className="flex flex-row 576:flex-col gap-x-6 576:gap-y-6 md:self-end mt-4 sm:mt-0">
    {socialLinks?.map((link, i) => (
      <Link href={link.linkKey} target="_blank" key={i} className="flex items-center gap-x-6 group">
        <div className="rounded-full overflow-hidden">{link.icon}</div>
        <div className="hidden 1315:block text-white font-bold text-lg duration-300 group-hover:text-blaze tracking-tighter">
          {link.textKey}
        </div>
      </Link>
    ))}
  </div>
)

const HomeBanner = () => {
  return (
    <div className="relative h-[622px] 1200:h-[742px] 1400:h-[967px] 1590:h-[1098px] w-full">
      <div className="bg-banner w-full h-full bg-no-repeat bg-center bg-cover" />
      <div className="absolute inset-0 flex items-center z-10">
        <div className="w-full mx-auto flex flex-col 576:flex-row 576:items-end md:items-center 576:justify-between pt-32 576:pt-40 px-4 1315:px-10 gap-x-10 1590:gap-x-20">
          <LeftSection />
          <RightSection />
        </div>
      </div>
    </div>
  )
}

export default HomeBanner
