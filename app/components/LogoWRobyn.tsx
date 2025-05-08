'use client'

import { FC } from 'react'
import Link from 'next/link'
import Picture from './common/Picture'
import LogoSVG from './svg/LogoSVG'

interface LogoWRobynProps {
  logoClassname?: string
  imgDimensions?: string
  linkKey?: string
}

const LogoWRobyn: FC<LogoWRobynProps> = ({ logoClassname, imgDimensions, linkKey }) => {
  return (
    <Link href={linkKey ?? '/'} className="flex items-end" onClick={(e) => linkKey && e.preventDefault()}>
      <div className="w-auto">
        <Picture src="/images/robyn.png" className={`w-full object-contain ${imgDimensions}`} priority={false} />
      </div>
      <div className={`${logoClassname}`}>
        <LogoSVG className={`w-full h-full ${logoClassname}`} />
      </div>
    </Link>
  )
}

export default LogoWRobyn
