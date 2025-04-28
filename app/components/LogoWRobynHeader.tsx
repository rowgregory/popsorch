import { FC } from 'react'
import Link from 'next/link'
import Picture from './common/Picture'
import LogoSVG from './svg/LogoSVG'

interface LogoWRobynProps {
  logoClassname?: string
  imgDimensions?: string
}

const LogoWRobynHeader: FC<LogoWRobynProps> = ({ logoClassname, imgDimensions }) => {
  return (
    <Link href="/" className="flex items-end">
      <div className={`${imgDimensions} w-auto`}>
        <Picture src="/images/robyn.png" className="w-full h-full object-contain" priority />
      </div>
      <div className={`${logoClassname} mb-1`}>
        <LogoSVG className="w-full h-full" />
      </div>
    </Link>
  )
}

export default LogoWRobynHeader
