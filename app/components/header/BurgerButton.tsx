import { useAppDispatch } from '@/app/redux/store'
import { openNavigationDrawer } from '@/app/redux/features/appSlice'
import { FC } from 'react'

const BurgerButton: FC<{ bgColor: string }> = ({ bgColor }) => {
  const dispatch = useAppDispatch()

  return (
    <div
      onClick={() => dispatch(openNavigationDrawer())}
      className="flex 990:hidden flex-col justify-between w-8 h-8 md:w-[56px] md:h-[56px] cursor-pointer group"
    >
      <div
        className={`${bgColor} h-[5px] md:h-2 rounded-lg transition-all duration-500 group-hover:animate-equalizer-1-mobile md:group-hover:animate-equalizer-1`}
      />
      <div
        className={`${bgColor} h-[5px] md:h-2 rounded-lg transition-all duration-500 group-hover:animate-equalizer-2-mobile md:group-hover:animate-equalizer-2`}
      />
      <div
        className={`${bgColor} h-[5px] md:h-2 rounded-lg transition-all duration-500 group-hover:animate-equalizer-3-mobile md:group-hover:animate-equalizer-3`}
      />
      <div
        className={`${bgColor} h-[5px] md:h-2 rounded-lg transition-all duration-500 group-hover:animate-equalizer-4-mobile md:group-hover:animate-equalizer-4`}
      />
    </div>
  )
}

export default BurgerButton
