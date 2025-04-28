import React, { FC } from 'react'
import AwesomeIcon from './AwesomeIcon'
import { chevronDownIcon } from '@/app/lib/icons'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface SquareElementProps {
  color?: string
  className?: string
  icon?: any
  fa?: IconDefinition
  iconSize?: string
}

const SquareElement: FC<SquareElementProps> = ({ color, className, icon, fa, iconSize }) => {
  return (
    <div className={`relative ${className ?? 'w-10 h-10'}  flex items-center justify-center duration-150 group`}>
      <div className={`absolute inset-0 ${color ?? 'bg-sunburst'} -m-2 z-0 opacity-50`}></div>
      <div className={`absolute inset-0 ${color ?? 'bg-sunburst'} z-10`}></div>
      {icon ? (
        <div className="text-white absolute z-20 flex items-center justify-center">{icon}</div>
      ) : (
        <AwesomeIcon
          icon={fa ?? chevronDownIcon}
          className={`text-white ${iconSize ?? 'w-5 h-5'} absolute z-20 group-hover:rotate-90 duration-300`}
        />
      )}
    </div>
  )
}

export default SquareElement
