'use client'

import Breadcrumb from '@/app/components/common/Breadcrumb'
import Picture from '@/app/components/common/Picture'

const AboutClient = ({ page }) => {
  const pageContent = page?.content?.body

  return (
    <>
      <Breadcrumb breadcrumb="About The Pops" />
      <section className="px-4 990:px-12 xl:px-4">
        <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto grid grid-cols-12 990:gap-x-12 pt-32 pb-44">
          <div className="order-2 1200:order-1 col-span-12 1200:col-span-4 mb-12 1200:mb-0 flex flex-col gap-y-4 gap-x-2 w-full">
            <div className="bg-duskgray p-7 430:p-14">
              <h1 className="font-changa text-2xl mb-5">{pageContent?.heading}</h1>
              <p className="mb-4 text-white font-medium leading-relaxed font-lato">{pageContent?.subheading}</p>
              <p className="mb-4 text-white font-medium leading-relaxed font-lato">{pageContent?.paragraphs[0]}</p>
              <Picture
                src="/images/cc.png"
                className="w-full text-indigo-500 h-auto aspect-square object-contain"
                priority={false}
              />
            </div>
          </div>
          <div className="order-1 1200:order-2 col-span-12 1200:col-span-8 flex flex-col w-full">
            <Picture src="/images/about-1.jpg" className="w-full h-full aspect-video" priority={true} />
            <div className="bg-duskgray p-7 430:p-14 font-medium leading-relaxed font-lato text-white flex flex-col mb-20">
              {pageContent?.paragraphs
                ?.map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))
                .filter((_: any, i: number) => i > 0 && i < 5)}
              {pageContent?.additionalDetails?.map((detail: string, index: number) => (
                <p key={index} className="mb-2 font-changa text-12 font-medium tracking-wider text-sunburst uppercase">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutClient
