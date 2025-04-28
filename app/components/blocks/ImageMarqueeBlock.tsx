import React from 'react'
import Marquee from 'react-fast-marquee'
import Picture from '../common/Picture'

const topMarqueeImages = [
  '/images/m-1.jpg',
  '/images/m-2.jpg',
  '/images/m-3.jpg',
  '/images/m-4.jpg',
  '/images/m-5.jpg',
  '/images/m-6.jpg'
]

const bottomMarqueeImages = [
  '/images/m-7.jpg',
  '/images/m-8.jpg',
  '/images/m-9.jpg',
  '/images/m-10.jpg',
  '/images/m-11.jpg',
  '/images/m-12.jpg'
]

const ImageMarqueeBlock = () => {
  return (
    <div className="dark:bg-shadowblue flex flex-col gap-y-2">
      <Marquee direction="left" speed={70}>
        <div className="flex items-center gap-x-2 mr-7">
          {topMarqueeImages.map((img, i) => (
            <Picture key={i} src={img} className="max-h-60 w-full object-contain" priority={true} />
          ))}
        </div>
      </Marquee>
      <Marquee direction="left" speed={60}>
        <div className="flex items-center gap-x-2 mr-7">
          {bottomMarqueeImages.map((img, i) => (
            <Picture key={i} src={img} className="max-h-60 w-full object-contain" priority={true} />
          ))}
        </div>
      </Marquee>
    </div>
  )
}

export default ImageMarqueeBlock
