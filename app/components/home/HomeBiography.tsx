import React from 'react'
import Picture from '../common/Picture'
import TitleWithLine from '../common/TitleWithLine'
import { AnimatedText } from '../AnimatedText'

const HomeBiography = () => {
  return (
    <div className="px-4 py-40 relative">
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url('/images/bio-bg.png')`,
          backgroundAttachment: 'fixed'
        }}
      />
      <div
        className={`max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full grid grid-cols-12 gap-y-12 990:gap-x-20 items-center relative z-10`}
      >
        <div className="col-span-12 1200:col-span-6 flex justify-center">
          <div className="relative before:absolute before:content-[''] before:w-full before:h-full before:border-4 before:border-blaze before:rounded-md before:z-[-1] before:-top-10 left-0 before:max-w-[450px] max-w-[450px] h-full max-h-[700px]">
            <Picture src="/images/robyn-1.jpg" className="w-full h-fit object-contain ml-12" priority={false} />
          </div>
        </div>
        <div className="col-span-12 1200:col-span-6">
          <TitleWithLine title="Our Melody" />
          <h1 className="text-xl font-lato text-[#cacaca] my-8">
            Top notch, crisply professional, educational, and fun!
          </h1>
          <AnimatedText text="Since its founding in 1975, The Pops Orchestra of Bradenton and Sarasota has produced critically acclaimed musical attractions for enthusiastic audiences of all ages. As one of the top performing arts groups in a unique, culturally rich community, the Pops Orchestra attracts full-time residents, Suncoast “Snowbirds,” and vacationers to its concerts, proving to be a cultural and economic asset to the Greater Sarasota community." />

          <h2 className="text-[32px] text-blaze font-changa">The Pops Orchestra of Bradenton & Sarasota</h2>
          <h3 className="text-12 font-changa text-[#cacaca] -mt-2">Robyn Bell</h3>
        </div>
      </div>
    </div>
  )
}

export default HomeBiography
