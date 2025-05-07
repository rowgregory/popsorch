'use client'

import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import Picture from '../components/common/Picture'
import { RootState, useAppSelector } from '../redux/store'
import EditableTextArea from '../components/common/EditableTextArea'

const About = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  return (
    <>
      <Breadcrumb breadcrumb="About The Pops" />
      <section className="px-4 990:px-12 xl:px-4">
        <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto grid grid-cols-12 990:gap-x-12 pt-32 pb-44">
          <div className="order-2 1200:order-1 col-span-12 1200:col-span-4 mb-12 1200:mb-0 flex flex-col gap-y-4 gap-x-2 w-full">
            <div className="bg-duskgray p-7 430:p-14">
              <EditableTextArea
                tag="h1"
                initialValue={textBlockMap?.ABOUT_PAGE?.aboutPageSidePanelTitle}
                type="ABOUT_PAGE"
                textBlockKey="aboutPageSidePanelTitle"
                className="font-changa text-2xl mb-5"
              />
              <p className="mb-4 text-[#b2b2b2] font-medium leading-relaxed font-lato">
                Our audience members are the best! After every concert we are flooded with raves, suggestions, and
                requests. Robyn Bell reads them all always thinking how we can deliver even more of what you love.
              </p>
              <p className="text-[#b2b2b2] font-medium leading-relaxed font-lato mb-10">
                Audience comments are all over this website. Look for the orange italics! Even this word cloud is built
                of audience comments.
              </p>
              <Picture
                src="/images/cc.png"
                className="w-full text-indigo-500 h-auto aspect-square object-contain"
                priority={false}
              />
            </div>
          </div>
          <div className="order-1 1200:order-2 col-span-12 1200:col-span-8 flex flex-col w-full">
            <Picture src="/images/about-1.jpg" className="w-full h-full aspect-video" priority={false} />
            <div className="bg-duskgray p-7 430:p-14 font-medium leading-relaxed font-lato text-[#b2b2b2] flex flex-col mb-20">
              <p className="mb-4">
                Since its founding in 1975, The Pops Orchestra of Bradenton and Sarasota has produced critically
                acclaimed musical attractions for enthusiastic audiences of all ages. As one of the top performing arts
                groups in a unique, culturally rich community, the Pops Orchestra attracts full-time residents, Suncoast
                “Snowbirds,” and vacationers to its concerts, proving to be a cultural and economic asset to the Greater
                Sarasota community.
              </p>
              <p className="mb-4">
                The 65-piece orchestra consists of many of the community&apos;s finest professional musicians, community
                music makers, music educators, and high school and college music students, reflecting the diversity of
                its audience and patrons.
              </p>
              <p className="mb-4">
                The annual four-subscription concert season features musical genres such as patriotic, Broadway,
                Hollywood, jazz, big band, jukebox, Motown, and holiday selections. In addition, the Pops Orchestra
                performs community concerts to honor veterans, welcome international sporting events, and feature
                outstanding local young musicians through its annual summer camp. The Pops partners with other area arts
                organizations, providing concerts for special occasions in the Suncoast region. Local and national guest
                artists frequently join the Pops, bringing additional energy and excitement to the stage. Each concert
                season is designed to entertain, invigorate, and project the Pops Orchestra&apos;s passion and
                enthusiasm for popular style music, featuring something for everyone.
              </p>
              <p className="mb-10">
                Robyn Bell began her tenure as the Pops&apos; conductor and artistic director in 2011 and is the
                orchestra&apos;s 5thconductor. Previous conductors include Arlene Stein, Pat Stenberg, Dale Jensen, and
                Ken Bowermeister.
              </p>
              <h3 className="mb-2 font-changa text-12 font-medium tracking-wider text-sunburst uppercase">
                Top notch, crisply professional, educational, and fun!
              </h3>
              <h4 className="font-changa text-12 font-medium tracking-wider text-sunburst uppercase">
                The orchestra is terrific! I love your interaction with the audience.
              </h4>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
