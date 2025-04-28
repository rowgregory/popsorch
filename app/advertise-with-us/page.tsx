import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import Picture from '../components/common/Picture'

const AdvertiseWithUs = () => {
  return (
    <>
      <Breadcrumb breadcrumb="Advertise With Us" />
      <section className="px-4 990:px-12 xl:px-4">
        <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto grid grid-cols-12 990:gap-x-12 pt-32 pb-44">
          <div className="order-2 1200:order-1 col-span-12 1200:col-span-8 mb-12 1200:mb-0 flex flex-col gap-y-4 gap-x-2 w-full">
            <Picture src="/images/awu.jpg" className="w-full h-full aspect-video" priority={false} />
            <div className="bg-duskgray p-14 font-medium leading-relaxed font-lato text-[#b2b2b2] flex flex-col mb-20">
              <h1 className="font-changa text-2xl mb-5 text-white">Why Advertise with the Pops?</h1>
              <h2 className="font-changa mb-1 text-blaze">Reach</h2>
              <p className="mb-4">
                Over 6,000 patrons will see your ad throughout this season at our Sarasota and Bradenton venues.
              </p>
              <h2 className="font-changa mb-1 text-blaze">Reach</h2>
              <p className="mb-4">
                Your advertising dollars hit the market segment that is educated, affluent, and discerning. It is a
                donation with benefits.
              </p>
              <h2 className="font-changa mb-1 text-blaze">Alignment</h2>
              <p className="mb-4">
                The Pops encompasses a vast web of relationships. By supporting The Pops, you support a venerable arts
                organization that has been performing and growing for 48 years in Sarasota and Manatee counties.
              </p>
              <h2 className="font-changa mb-1 text-blaze">Visibility</h2>
              <h3 className="mb-10">
                Your business will additionally be listed in concert programs and featured with a link on the Pops&apos;
                website.
              </h3>
              <h4 className="mb-2 font-changa text-12 font-medium tracking-wider text-sunburst uppercase">
                We&apos;d be happy to talk with you about the oppportunities.
              </h4>
            </div>
          </div>
          <div className="order-2 1200:order-1 col-span-12 1200:col-span-4 mb-12 1200:mb-0 flex flex-col gap-y-4 gap-x-2 w-full">
            <div className="bg-duskgray p-14">
              <h1 className="font-changa text-2xl text-blaze mb-5 text-center max-w-60 mx-auto">
                The Pops Orchestra Program Book
              </h1>
              <p className="mb-4 text-[#b2b2b2] font-medium leading-relaxed font-lato">
                <span>
                  <a
                    href="https://thepopsorchestra.org/wp-content/uploads/2024/10/Ad-rate-sheet.pdf"
                    target="_blank"
                    className="mr-2 text-blaze"
                  >
                    Download
                  </a>
                </span>
                a copy of the 2024-25 Season Rate Card for advertising in The Pops Orchestra program book. The space
                deadline is <strong>Oct 25</strong>. Or please send us a message at Info@ThePopsOrchestra.org.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdvertiseWithUs
