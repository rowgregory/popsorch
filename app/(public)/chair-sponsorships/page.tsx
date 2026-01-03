'use client'

import Breadcrumb from '@/app/components/common/Breadcrumb'
import Picture from '@/app/components/common/Picture'
import TitleWithLine from '@/app/components/common/TitleWithLine'
import { useRotatingImageText } from '@/app/hooks/useRotatingImageText'
import { RootState, useAppSelector } from '@/app/redux/store'
import EditableTextArea from '@/app/components/common/EditableTextArea'

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
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

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
            <div className="col-span-12 1200:col-span-6 p-7 430:p-14">
              <TitleWithLine
                title={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipPageTitle}
                type="CHAIR_SPONSORSHIP_PAGE"
                textBlockKey="chairSponsorshipPageTitle"
              />
              <EditableTextArea
                tag="p"
                initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox1P}
                type="CHAIR_SPONSORSHIP_PAGE"
                textBlockKey="chairSponsorshipBox1P"
                className="font-lato text-[#cacaca] mt-8 mb-5 text-center"
              />
              <EditableTextArea
                tag="p"
                initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox1P2}
                type="CHAIR_SPONSORSHIP_PAGE"
                textBlockKey="chairSponsorshipBox1P2"
                className="font-lato text-[#cacaca] mb-12 text-center"
              />

              <div className="w-full flex justify-center items-center">
                <a
                  href="https://ci.ovationtix.com/35505/store/donations/46287"
                  target="_blank"
                  className="bg-blaze text-white hover:text-duskgray px-9 duration-300 rounded-sm py-[19px] font-changa text-12 uppercase w-fit flex items-center justify-center font-bold text-center"
                >
                  Make your Sponsorship Donation Here
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 bg-duskgray rounded-md w-full mb-24 items-center overflow-hidden">
            <div className="col-span-12 1200:col-span-6 flex items-center flex-col p-7 430:p-14">
              <TitleWithLine
                title={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipPageTitle2}
                type="CHAIR_SPONSORSHIP_PAGE"
                textBlockKey="chairSponsorshipPageTitle2"
              />

              <EditableTextArea
                tag="p"
                initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2P1}
                type="CHAIR_SPONSORSHIP_PAGE"
                textBlockKey="chairSponsorshipBox2P1"
                className="text-[#cacaca] font-lato text-center mt-8"
              />
            </div>
            <div className="col-span-12 1200:col-span-6 overflow-x-auto">
              <table className="w-full border-collapse text-white font-lato border-[#1C1C1C] min-w-[400px] overflow-x-auto">
                <thead>
                  <tr className="bg-gold-gradient text-black">
                    <th className=""></th>
                    <EditableTextArea
                      tag="th"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Header1}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Header1"
                      className="py-6 px-5 border border-zinc-700/50 text-white"
                    />
                    <EditableTextArea
                      tag="th"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Header2}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Header2"
                      className="py-6 px-5 border border-zinc-700/50 text-white"
                    />
                    <EditableTextArea
                      tag="th"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Header3}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Header3"
                      className="py-6 px-5 border border-zinc-700/50 text-white"
                    />
                    <EditableTextArea
                      tag="th"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Header4}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Header4"
                      className="py-6 px-5 border border-zinc-700/50 text-white"
                    />
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#2B2B2B]">
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row1Title}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row1Title"
                      className="py-6 px-5 border border-zinc-700/50"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row1Value1}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row1Value1"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row1Value2}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row1Value2"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row1Value3}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row1Value3"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row1Value4}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row1Value4"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                  </tr>
                  <tr className="bg-[#181818]">
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row2Title}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row2Title"
                      className="py-6 px-5 border border-zinc-700/50"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row2Value1}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row2Value1"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row2Value2}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row2Value2"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row2Value3}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row2Value3"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row2Value4}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row2Value4"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                  </tr>
                  <tr className="bg-[#2B2B2B]">
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row3Title}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row3Title"
                      className="py-6 px-5 border border-zinc-700/50"
                    />

                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row3Value1}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row3Value1"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row3Value2}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row3Value2"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row3Value3}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row3Value3"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row3Value4}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row3Value4"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                  </tr>
                  <tr className="bg-[#181818]">
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row4Title}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row4Title"
                      className="py-6 px-5 border border-zinc-700/50"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row4Value1}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row4Value1"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row4Value2}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row4Value2"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row4Value3}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row4Value3"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                    <EditableTextArea
                      tag="td"
                      initialValue={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipBox2Row4Value4}
                      type="CHAIR_SPONSORSHIP_PAGE"
                      textBlockKey="chairSponsorshipBox2Row4Value4"
                      className="py-6 px-5 border border-zinc-700/50 text-center"
                    />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-duskgray rounded-md w-full p-7 430:p-14 flex flex-col items-center justify-center">
            <TitleWithLine
              title={textBlockMap?.CHAIR_SPONSORSHIP_PAGE?.chairSponsorshipPageTitle3}
              type="CHAIR_SPONSORSHIP_PAGE"
              textBlockKey="chairSponsorshipPageTitle3"
            />
            <div className="flex items-center justify-center mt-10 mx-auto">
              <div
                className={`transition-opacity duration-1000 ease-in-out w-full h-full flex items-center justify-center flex-col max-w-2xl ${
                  fade ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Picture src={currentItem.image} priority={false} className="w-80 h-auto aspect-square object-cover" />
                <p className="text-3xl font-changa mt-4 mb-2">{currentItem.title}</p>
                <p className="text-center text-white">{currentItem.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChairSponsorships
