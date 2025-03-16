import React from 'react'
import LogoWRobyn from '../LogoWRobyn'
import BurgerButton from './BurgerButton'
import BuyTicketsBtn from './BuyTicketsBtn'

import { motion } from 'framer-motion'

const text = 'THRILLING PERFORMANCES BY THE POPS ORCHESTRA SARASOTA-BRADENTON'

const WaveText = () => {
  return (
    <div className="w-full mx-auto text-center font-semibold py-3 text-2xl overflow-hidden">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [5, -5, 5, 0] }} // Creates a wave effect
          transition={{
            duration: 0.8,
            delay: index * 0.03 // Delays each letter slightly
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char} {/* Preserves spaces */}
        </motion.span>
      ))}
    </div>
  )
}

const Header = () => {
  return (
    <header className="w-full h-[370px]">
      <div className="bg-zinc-800 w-full text-white">
        <WaveText />
      </div>
      <div className="px-4 md:px-12 ">
        <div className="max-w-[860px] w-full mx-auto flex items-center justify-between py-1.5">
          <LogoWRobyn logoClassname="md:h-[250px]" imgDimensions="h-[72px] md:h-[250px]" />
          <div className="flex flex-col items-center 576:gap-y-5">
            <BuyTicketsBtn />
            <BurgerButton bgColor="bg-zinc-800" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
