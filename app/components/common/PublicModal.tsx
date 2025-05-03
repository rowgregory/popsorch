import React, { FC, ReactNode } from 'react'
import useRemoveScroll from '@/app/hooks/useRemoveScroll'
import AwesomeIcon from './AwesomeIcon'
import { timesIcon } from '@/app/lib/icons'

const PublicModal: FC<{ show: boolean; children: ReactNode; onClose?: any; reset?: any }> = ({
  show,
  children,
  onClose,
  reset
}) => {
  useRemoveScroll(true)

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/90 max-h-1000:bg-inkblack flex z-[80] items-center justify-center transition-opacity ease-out ${
        show ? 'block' : 'hidden'
      }`}
    >
      <div
        className={`public-modal bg-inkblack transform transition-all duration-300 ease-out overflow-y-auto no-scrollbar`}
        onClick={(e) => e.stopPropagation()}
      >
        <AwesomeIcon icon={timesIcon} onClick={reset} className="w-5 h-5 absolute top-5 right-5 z-10 cursor-pointer" />
        {children}
      </div>
    </div>
  )
}

export default PublicModal
