'use client'

import Breadcrumb from '@/app/components/common/Breadcrumb'
import Picture from '@/app/components/common/Picture'
import { useRotatingImageText } from '@/app/hooks/useRotatingImageText'

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

export const ChairSponsorshipsClient = ({ data }) => {
  const { currentItem, fade } = useRotatingImageText(chairSponsorshipData)
  const field = (id: string) => data?.content?.find((item) => item.id === id)?.value ?? ''

  const tableRows = [
    {
      label: field('chair_table_row_conductor_label'),
      bronze: field('chair_table_row_conductor_bronze'),
      silver: field('chair_table_row_conductor_silver'),
      gold: field('chair_table_row_conductor_gold'),
      platinum: field('chair_table_row_conductor_platinum')
    },
    {
      label: field('chair_table_row_concertmaster_label'),
      bronze: field('chair_table_row_concertmaster_bronze'),
      silver: field('chair_table_row_concertmaster_silver'),
      gold: field('chair_table_row_concertmaster_gold'),
      platinum: field('chair_table_row_concertmaster_platinum')
    },
    {
      label: field('chair_table_row_principal_label'),
      bronze: field('chair_table_row_principal_bronze'),
      silver: field('chair_table_row_principal_silver'),
      gold: field('chair_table_row_principal_gold'),
      platinum: field('chair_table_row_principal_platinum')
    },
    {
      label: field('chair_table_row_section_label'),
      bronze: field('chair_table_row_section_bronze'),
      silver: field('chair_table_row_section_silver'),
      gold: field('chair_table_row_section_gold'),
      platinum: field('chair_table_row_section_platinum')
    }
  ]

  return (
    <>
      <Breadcrumb breadcrumb="Chair Sponsorships" />
      <main id="main-content" className="px-4 py-40 relative">
        <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-7xl mx-auto w-full items-center relative z-10">
          <section
            aria-labelledby="chair-hero-heading"
            className="grid grid-cols-12 bg-duskgray rounded-md w-full mb-24 items-center"
          >
            <div className="col-span-12 1200:col-span-6 relative">
              <Picture
                src="/images/mcs.png"
                alt="Musician Chair Sponsorships collage"
                priority={true}
                className="aspect-video 1200:aspect-square relative z-0 object-cover rounded-tl-md rounded-bl-md h-full w-full bg-black"
              />
            </div>
            <div className="col-span-12 1200:col-span-6 p-7 430:p-14">
              <h1 id="chair-hero-heading" className="font-changa text-2xl text-white mb-4 text-center">
                {field('chair_hero_heading')}
              </h1>
              <div className="w-12 h-0.5 bg-blaze mx-auto mb-8" aria-hidden="true" />
              <p className="font-lato text-[#cacaca] mb-5 text-center">{field('chair_hero_paragraph_1')}</p>
              <p className="font-lato text-[#cacaca] mb-12 text-center">{field('chair_hero_paragraph_2')}</p>
              <div className="w-full flex justify-center items-center">
                <a
                  href="https://ci.ovationtix.com/35505/store/donations/46287"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${field('chair_hero_cta_button_text')} — opens in new tab`}
                  className="bg-blaze text-white hover:text-duskgray px-9 duration-300 rounded-sm py-4.75 font-changa text-12 uppercase w-fit flex items-center justify-center font-bold text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-duskgray"
                >
                  {field('chair_hero_cta_button_text')}
                </a>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="chair-levels-heading"
            className="grid grid-cols-12 bg-duskgray rounded-md w-full mb-24 items-center overflow-hidden"
          >
            <div className="col-span-12 1200:col-span-6 flex items-center flex-col p-7 430:p-14">
              <h2 id="chair-levels-heading" className="font-changa text-2xl text-white mb-4 text-center">
                {field('chair_levels_heading')}
              </h2>
              <div className="w-12 h-0.5 bg-blaze mx-auto mb-8" aria-hidden="true" />
              <p className="text-[#cacaca] font-lato text-center">{field('chair_levels_description')}</p>
            </div>

            <div className="col-span-12 1200:col-span-6 overflow-x-auto">
              <table className="w-full border-collapse text-white font-lato border-[#1C1C1C] min-w-100">
                <caption className="sr-only">Chair sponsorship levels and pricing by role</caption>
                <thead>
                  <tr className="bg-gold-gradient text-black">
                    <th scope="col" className="py-6 px-5 border border-zinc-700/50"></th>
                    <th scope="col" className="py-6 px-5 border border-zinc-700/50 text-white">
                      {field('chair_table_col_bronze')}
                    </th>
                    <th scope="col" className="py-6 px-5 border border-zinc-700/50 text-white">
                      {field('chair_table_col_silver')}
                    </th>
                    <th scope="col" className="py-6 px-5 border border-zinc-700/50 text-white">
                      {field('chair_table_col_gold')}
                    </th>
                    <th scope="col" className="py-6 px-5 border border-zinc-700/50 text-white">
                      {field('chair_table_col_platinum')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-[#2B2B2B]' : 'bg-[#181818]'}>
                      <th scope="row" className="py-6 px-5 border border-zinc-700/50 text-left font-normal">
                        {row.label}
                      </th>
                      <td className="py-6 px-5 border border-zinc-700/50 text-center">{row.bronze}</td>
                      <td className="py-6 px-5 border border-zinc-700/50 text-center">{row.silver}</td>
                      <td className="py-6 px-5 border border-zinc-700/50 text-center">{row.gold}</td>
                      <td className="py-6 px-5 border border-zinc-700/50 text-center">{row.platinum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section
            aria-labelledby="chair-community-heading"
            className="bg-duskgray rounded-md w-full p-7 430:p-14 flex flex-col items-center justify-center"
          >
            <h2 id="chair-community-heading" className="font-changa text-2xl text-white mb-4 text-center">
              {field('chair_community_heading')}
            </h2>
            <div className="w-12 h-0.5 bg-blaze mx-auto mb-8" aria-hidden="true" />

            <div className="flex items-center justify-center mt-10 mx-auto">
              <div
                className={`transition-opacity duration-1000 ease-in-out w-full h-full flex items-center justify-center flex-col max-w-2xl ${
                  fade ? 'opacity-100' : 'opacity-0'
                }`}
                aria-live="polite"
                aria-atomic="true"
              >
                <Picture
                  src={currentItem.image}
                  alt={currentItem.title}
                  priority={false}
                  className="w-80 h-auto aspect-square object-cover"
                />
                <p className="text-3xl font-changa mt-4 mb-2">{currentItem.title}</p>
                <p className="text-center text-white">{currentItem.text}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
