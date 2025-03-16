'use client'

import { FC } from 'react'
import AwesomeIcon from '../common/AwesomeIcon'
import { arrowRightIcon } from '@/app/lib/icons'

interface ActionButtonProps {
  text: string
  onClick: () => void
}

const ActionButton: FC<ActionButtonProps> = ({ text, onClick }) => {
  return (
    <div className="flex items-center gap-x-2 group">
      <button onClick={onClick} className="text-blaze rubik-regular text-left w-fit font-medium">
        {text}
      </button>
      <AwesomeIcon icon={arrowRightIcon} className={`text-blaze w-4 h-4 -rotate-45 duration-200 ease-in-out group-hover:-rotate-90`} />
    </div>
  )
}

export default ActionButton
