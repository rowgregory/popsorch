import React, { FC } from 'react'
import AwesomeIcon from './AwesomeIcon'
import { chevronDownIcon } from '@/app/lib/icons'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface DiamondElementProps {
  color?: string
  className?: string
  icon?: any
  fa?: IconDefinition
  iconSize?: string
}

const DiamondElement: FC<DiamondElementProps> = ({ color, className, icon, fa, iconSize }) => {
  return (
    <div className={`relative ${className ?? 'w-10 h-10'}  flex items-center justify-center duration-150`}>
      <div className={`absolute inset-0 ${color ?? 'bg-sunburst'} rotate-45 -m-2 z-0 opacity-50`}></div>
      <div className={`absolute inset-0 ${color ?? 'bg-sunburst'} rotate-45 z-10`}></div>
      {icon ? (
        <div className="text-white absolute z-20 flex items-center justify-center">{icon}</div>
      ) : (
        <AwesomeIcon icon={fa ?? chevronDownIcon} className={`text-white ${iconSize ?? 'w-5 h-5'} absolute z-20`} />
      )}
    </div>
  )
}

export default DiamondElement
