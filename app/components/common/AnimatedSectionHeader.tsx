import React, { FC } from 'react'

const AnimatedSectionHeader: FC<{ title: string; isActive?: boolean }> = ({ title, isActive }) => {
  return (
    <div className="flex items-center gap-x-3 group ease-in transition-all transform">
      <div className={`bg-blaze h-[2px] w-12 group-hover:w-16 duration-700 ${isActive ? 'w-16' : ''}`}></div>
      <h1 className="text-2xl font-medium duration-700 text-graphite dark:text-mist">{title}</h1>
    </div>
  )
}

export default AnimatedSectionHeader
