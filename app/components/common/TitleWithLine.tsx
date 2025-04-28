import React, { FC } from 'react'

const TitleWithLine: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="relative h-fit w-fit px-5">
      <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-50 h-[1.5px] bg-blaze/70 w-full"></span>
      <h1 className="text-white font-changa text-center text-5xl relative z-10">{title}</h1>
    </div>
  )
}

export default TitleWithLine
