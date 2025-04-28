import React, { FC } from 'react'
import useRemoveScroll from '@/app/hooks/useRemoveScroll'
import AwesomeIcon from './AwesomeIcon'
import { timesIcon } from '@/app/lib/icons'
import { DrawerProps } from '@/app/types/common.types'

const LeftDrawer: FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  useRemoveScroll(isOpen)

  return (
    <div className="relative">
      <div
        className={`px-4 pb-20 fixed z-[100] bottom-20 top-0 left-0 w-96 bg-midnightblack overflow-x-auto duration-700 ${
          isOpen ? 'translate-x-0' : '-translate-x-96'
        } h-dvh`}
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

export default LeftDrawer
