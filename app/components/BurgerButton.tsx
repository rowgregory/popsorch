import { FC } from 'react'

const BurgerButton: FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div onClick={onClick} className="flex flex-col justify-between w-8 h-8 md:w-[56px] md:h-[56px] cursor-pointer group">
      <div className="h-[5px] md:h-2 bg-white rounded-lg transition-all duration-500 group-hover:animate-equalizer-1-mobile md:group-hover:animate-equalizer-1" />
      <div className="h-[5px] md:h-2 bg-white rounded-lg transition-all duration-500 group-hover:animate-equalizer-2-mobile md:group-hover:animate-equalizer-2" />
      <div className="h-[5px] md:h-2 bg-white rounded-lg transition-all duration-500 group-hover:animate-equalizer-3-mobile md:group-hover:animate-equalizer-3" />
      <div className="h-[5px] md:h-2 bg-white rounded-lg transition-all duration-500 group-hover:animate-equalizer-4-mobile md:group-hover:animate-equalizer-4" />
    </div>
  )
}

export default BurgerButton
