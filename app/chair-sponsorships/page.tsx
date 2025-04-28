'use client'

import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import Picture from '../components/common/Picture'
import TitleWithLine from '../components/common/TitleWithLine'
import { useRotatingImageText } from '../hooks/useRotatingImageText'

const chairSponsorshipData = [
  {
    image: '/images/cs-1.jpg',
    title: 'Affordable Tickets',
    text: 'With your support we are able to present national talents and produce exhilarating, crowd-pleasing entertainment for those on fixed incomes and tight budgets.'
  },
  {
    image: '/images/cs-2.jpg',
    title: 'Pops Musicians',
    text: 'Professional and avocational musicians of all ages are rewarded for their dedication of time and talents. Your support helps us offer some remuneration to every musician.'
  },
  {
    image: '/images/cs-3.jpg',
    title: 'Student Experiences',
    text: 'Not every deserving student gets a chance to perform in an orchestra. With your help we will be expanding our capacity to serve more youth through a Bradenton-based youth orchestra program.'
  },
  {
    image: '/images/cs-4.jpg',
    title: 'Community at Large',
    text: 'Our musicians, if not the full orchestra, frequently perform in the community in special events for veterans, seniors, and in collaboration with various other local arts initiatives.'
  }
]

const ChairSponsorships = () => {
  const { currentItem, fade } = useRotatingImageText(chairSponsorshipData)

  return (
    <>
      <Breadcrumb breadcrumb="Chair Sponsorships" />
      <div className="px-4 py-40 relative">
        <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full items-center relative z-10">
          <div className="grid grid-cols-12 bg-duskgray rounded-md w-full mb-24 items-center">
            <div className="col-span-12 1200:col-span-6 relative group">
              <Picture
                src="/images/mcs.png"
                priority={true}
                className="aspecet-video 1200:aspect-square relative z-0 object-cover rounded-tl-md rounded-bl-md h-full w-full bg-black"
              />
            </div>
            <div className="col-span-12 1200:col-span-6 p-20">
              <TitleWithLine title="Show your love for our musicians." />
              <p className="font-lato text-[#cacaca] mt-8 mb-5 text-center">
                Sponsoring a musician or a specific chair is a very popular way to show your appreciation for The Pops
                and to contribute to its financial well-being year after year.
              </p>
              <p className="font-lato text-[#cacaca] mb-12 text-center">
                Admit it, we all have our favorites. Some have a favorite instrument (like the flute!) and others really
                enjoy a specific musician&apos;s contribution. The musician might be a relative or friend, or simply a
                talented stranger.
              </p>
              <div className="w-full flex justify-center items-center">
                <a
                  href="https://ci.ovationtix.com/35505/store/donations/46287"
                  target="_blank"
                  className="bg-blaze text-white hover:text-duskgray px-9 duration-300 rounded-sm py-[19px] font-changa text-12 uppercase w-fit flex items-center justify-center font-bold"
                >
                  Make your Sponsorship Donation Here
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 bg-duskgray rounded-md w-full mb-24 items-center">
            <div className="col-span-12 1200:col-span-6 flex items-center flex-col p-20">
              <TitleWithLine title="3 Levels" />
              <p className="text-[#cacaca] font-lato text-center mt-8">
                We have three sponsorship levels for each musician&apos;s role. Donors will be recognized in the program
                book throughout the season next to your musician. Some of our musicians have multiple sponsors who are
                recognized per level of donation.
              </p>
            </div>
            <table className="col-span-12 1200:col-span-6 w-auto border-collapse text-white font-lato border-[#1C1C1C]">
              <thead>
                <tr className="bg-sunburst text-black">
                  <th className="py-6 px-5 border border-zinc-700/50"> </th>
                  <th className="py-6 px-5 border border-zinc-700/50 text-white">Bronze</th>
                  <th className="py-6 px-5 border border-zinc-700/50 text-white">Silver</th>
                  <th className="py-6 px-5 border border-zinc-700/50 text-white">Gold</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#2B2B2B]">
                  <td className="py-6 px-5 border border-zinc-700/50">Conductor</td>
                  <td className="py-6 px-5 border border-zinc-700/50 text-center">$5,000</td>
                  <td className="py-6 px-5 border border-zinc-700/50 text-center">$7,500</td>
                  <td className="py-6 px-5 border border-zinc-700/50 text-center">$10,000</td>
                </tr>
                <tr className="bg-[#181818]">
                  <td className="py-6 px-5 border border-zinc-700/50">Concertmaster</td>
                  <td className="py-6 px-5 border border-zinc-700/50 text-center">$1,000</td>
                  <td className="py-6 px-5 border border-zinc-700/50 text-center">$1,250</td>
                  <td className="py-6 px-5 border border-zinc-700/50 text-center">$1,500</td>
                </tr>
                <tr className="bg-[#2B2B2B]">
                  <td className="py-6 px-5 border border-zinc-700/50">Principal Musicians</td>
                  <td className="py-6 px-5 border border-zinc-700/50 text-center">$500</td>
                  <td className="py-6 px-5 border border-zinc-700/50 text-center">$750</td>
                  <td className="py-6 px-5 border border-zinc-700/50 text-center">$1,000</td>
                </tr>
                <tr className="bg-[#181818]">
                  <td className="py-6 px-5 border border-zinc-700/50">Section Musicians</td>
                  <td className="py-6 px-5 border border-zinc-700/50 text-center">$250</td>
                  <td className="py-6 px-5 border border-zinc-700/50 text-center">$500</td>
                  <td className="py-6 px-5 border border-zinc-700/50 text-center">$750</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-duskgray rounded-md w-full p-20 flex flex-col items-center justify-center">
            <TitleWithLine title="How does your support serve our community?" />
            <div className="flex items-center justify-center mt-10 mx-auto">
              <div
                className={`transition-opacity duration-1000 ease-in-out w-full h-full flex items-center justify-center flex-col max-w-2xl ${
                  fade ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Picture src={currentItem.image} priority={false} className="w-80 h-auto aspect-square object-cover" />
                <p className="text-3xl font-changa mt-4 mb-2">{currentItem.title}</p>
                <p className="text-center text-zinc-200">{currentItem.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChairSponsorships
