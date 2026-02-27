'use client'

import Breadcrumb from '@/app/components/common/Breadcrumb'
import Picture from '@/app/components/common/Picture'

export const AboutClient = ({ data }) => {
  const field = (id: string) => data?.find((item) => item.id === id)?.value ?? ''

  const bodyParagraphs = [
    field('about_paragraph_1'),
    field('about_paragraph_2'),
    field('about_paragraph_3'),
    field('about_paragraph_4')
  ].filter(Boolean)

  const additionalDetails = data?.filter((item) => item.section === 'additional_details') ?? []

  return (
    <>
      <Breadcrumb breadcrumb="About The Pops" />
      <section aria-labelledby="about-heading" className="px-4 990:px-12 xl:px-4">
        <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-7xl w-full mx-auto grid grid-cols-12 990:gap-x-12 pt-32 pb-44">
          <aside
            aria-label="About summary"
            className="order-2 1200:order-1 col-span-12 1200:col-span-4 mb-12 1200:mb-0 flex flex-col gap-y-4 gap-x-2 w-full rounded-md"
          >
            <div className="bg-duskgray p-7 430:p-14">
              <h2 id="about-heading" className="font-changa text-2xl mb-5">
                {field('about_aside_heading')}
              </h2>
              <p className="mb-4 text-white font-medium leading-relaxed font-lato">{field('about_aside_subheading')}</p>
              <p className="mb-4 text-white font-medium leading-relaxed font-lato">{field('about_aside_paragraph')}</p>
              <Picture
                src="/images/cc.png"
                alt="Conductor portrait"
                className="w-full h-auto aspect-square object-contain"
                priority={false}
              />
            </div>
          </aside>

          <div className="order-1 1200:order-2 col-span-12 1200:col-span-8 flex flex-col w-full">
            <Picture
              src="/images/about-1.jpg"
              alt="The Pops Orchestra performing on stage"
              className="w-full h-full aspect-video"
              priority={true}
            />
            <div className="bg-duskgray p-7 430:p-14 font-medium leading-relaxed font-lato text-white flex flex-col mb-20">
              {bodyParagraphs.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
              {additionalDetails.length > 0 && (
                <ul role="list" aria-label="Additional details" className="flex flex-col">
                  {additionalDetails.map((detail) => (
                    <li
                      key={detail.id}
                      className="mb-2 font-changa text-12 font-medium tracking-wider text-sunburst uppercase"
                    >
                      {detail.value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
