import React, { FC } from 'react'

const PageTitle: FC<{ title: string; color: string }> = ({ title, color }) => {
  return (
    <h1
      className={`h-16 flex items-center text-2xl relative font-bold after:absolute after:content-[''] after:w-12 after:h-0.5 after:${color} after:-bottom-1 after:left-0 after:z-10 after:animate-underline-grow`}
    >
      {title}
    </h1>
  )
}

export default PageTitle
