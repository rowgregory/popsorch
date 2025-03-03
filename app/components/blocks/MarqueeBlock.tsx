import React from 'react'
import Marquee from 'react-fast-marquee'
import MarqueeSVG from '../svg/MarqueeSVG'

const MarqueeBlock = () => {
  return (
    <div className="dark:bg-shadowblue py-28 overflow-x-hidden">
      <Marquee direction="right" speed={30}>
        <MarqueeSVG />
      </Marquee>
    </div>
  )
}

export default MarqueeBlock
