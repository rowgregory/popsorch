import useAnimatedSectionTitle from '@/app/hooks/useAnimatedSectionTitle'
import React from 'react'
import AnimatedSectionHeader from '../common/AnimatedSectionHeader'
import Picture from '../common/Picture'
import Link from 'next/link'

const shopItems = [
  {
    img: '/images/s-1.png',
    name: 'White T-Shirt',
    price: '24.99'
  },
  {
    img: '/images/s-4.png',
    name: 'Black T-Shirt',
    price: '24.99'
  },
  {
    img: '/images/s-2.png',
    name: 'White Mug',
    price: '12.99'
  },
  {
    img: '/images/s-3.png',
    name: 'White Tumbler',
    price: '19.99'
  }
]

const TheShopBlock = () => {
  const { ref, visible } = useAnimatedSectionTitle(0.2)

  return (
    <div className="bg-lavendermist dark:bg-[#080d1a] px-4 py-14 md:px-12 md:py-24">
      <div className="max-w-[516px] md:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative grid grid-cols-12 gap-y-16 576:gap-x-10">
        <div className="col-span-12">
          <AnimatedSectionHeader title="The Shop" />
          <div
            ref={ref}
            className={`transition-opacity duration-700 ${
              visible ? 'opacity-100' : 'opacity-0'
            } text-[43px] 430:text-[60px] text-irongray dark:text-white font-bold mt-1`}
          >
            Get Our
          </div>
          <div className="flex flex-col 990:flex-row 990:items-start 990:justify-between w-full">
            <h3 className="text-[43px] 430:text-[60px] font-bold text-blaze -mt-8">Merchandise</h3>
            <p className="text-lg text-slategray dark:text-slatemist font-medium -mt-3 leading-snug max-w-2xl text-left 990:text-right">
              Find exclusive orchestra merchandise, from apparel to collectibles, and take home a piece of the music.
            </p>
          </div>
          <div className="grid grid-cols-12 gap-y-8 576:gap-5 md:gap-5 mt-10">
            {shopItems.map((item, i) => (
              <div
                key={i}
                className="col-span-12 576:col-span-6 990:col-span-4 1200:col-span-3 border-2 border-silver dark:border-charcoalgray rounded-[30px] p-5 bg-white dark:bg-[#0a1120]"
              >
                <Picture
                  src={item.img}
                  className="aspect-square w-full h-auto rounded-3xl object-cover bg-slatebluegray"
                  priority={false}
                />
                <div className="flex flex-col 990:flex-row 990:items-center 990:justify-between mt-6 mb-2">
                  <div className="flex flex-col mb-2 990:mb-0">
                    <h1 className="text-lg mb-1 font-medium tracking-tighter text-gunmetal dark:text-gray-200">{item.name}</h1>
                    <h2 className="font-bold text-blaze">${item.price}</h2>
                  </div>
                  <Link
                    href="/store"
                    className="font-bold border-2 border-blaze rounded-lg px-4 py-2.5 text-gunmetal dark:text-white text-center hover:bg-blaze hover:text-white duration-300"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TheShopBlock
