import React, { FC, useCallback, useRef } from 'react'
import useOutsideDetect from '@/app/hooks/useOutsideDetect'
import useRemoveScroll from '@/app/hooks/useRemoveScroll'
import { DrawerProps } from '@/app/types/common.types'
import AwesomeIcon from './AwesomeIcon'
import { timesIcon } from '@/app/lib/icons'

const BottomOverlapDrawer: FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  const drawerRef = useRef(null) as any
  useRemoveScroll(isOpen)

  const handleClose = useCallback(() => onClose(), [onClose])
  useOutsideDetect(drawerRef, handleClose)

  return (
    <>
      <div
        onClick={handleClose}
        className={`fixed z-[80] bottom-0 left-0 w-full flex items-center justify-center bg-inkblack/90 duration-300 transition-all ${
          isOpen ? 'h-dvh' : 'h-0'
        }`}
      ></div>
      <div
        className={`fixed z-[80] w-full bottom-0 left-0 bg-duskgray shadow-adminpage duration-300 overflow-y-auto transition-all ${
          isOpen ? 'h-[90dvh]' : 'h-0'
        }`}
      >
        <AwesomeIcon
          icon={timesIcon}
          className="w-6 h-6 absolute top-6 right-6 cursor-pointer duration-500 hover:rotate-90 hover:text-blaze"
          onClick={onClose}
        />
        {children}
      </div>
    </>
  )
}

export default BottomOverlapDrawer
