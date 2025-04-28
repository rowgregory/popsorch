import React, { FC } from 'react'
import useRemoveScroll from '@/app/hooks/useRemoveScroll'
import AwesomeIcon from './AwesomeIcon'
import { timesIcon } from '@/app/lib/icons'
import { DrawerProps } from '@/app/types/common.types'

const BottomDrawer: FC<DrawerProps> = ({ isOpen, onClose, height, children }) => {
  useRemoveScroll(isOpen)

  return (
    <div className="relative">
      <div
        className={`px-4 pb-20 fixed z-[60] bottom-0 left-0 w-full bg-[#1a1a1a] overflow-y-auto duration-700 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } ${height ?? 'h-dvh'} ${height && 'rounded-tl-3xl rounded-tr-3xl shadow-[0_-4px_12px_rgba(0,0,0,0.2)]'}`}
      >
        <AwesomeIcon
          icon={timesIcon}
          className="w-6 h-6 absolute z-[60] top-6 right-6 cursor-pointer duration-500 hover:rotate-90 text-white hover:text-blaze"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  )
}

export default BottomDrawer
