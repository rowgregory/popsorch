import Link from 'next/link'
import React, { FC } from 'react'

const HeaderBtn: FC<{ text: string; className: string }> = ({ text, className }) => {
  return (
    <Link
      href="https://ci.ovationtix.com/35505"
      target="_blank"
      className={`${className} text-white duration-300 items-center gap-x-3 text-center`}
    >
      {text}
    </Link>
  )
}

export default HeaderBtn
