import Link from 'next/link'
import React, { FC } from 'react'
import Picture from './common/Picture'
import LogoSVG from './svg/LogoSVG'

const LogoWRobyn: FC<{ logoClassname?: string; imgDimensions?: string }> = ({ logoClassname, imgDimensions }) => {
  return (
    <Link href="/" className="flex items-end">
      <Picture src="/images/robyn.png" className={`${imgDimensions} w-auto`} priority={true} />
      <LogoSVG className={`${logoClassname} mb-1`} />
    </Link>
  )
}

export default LogoWRobyn
