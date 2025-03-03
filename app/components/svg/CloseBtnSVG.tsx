import React, { FC } from 'react'

const CloseBtnSVG: FC<{ onClick: () => void; className?: string }> = ({ onClick, className }) => {
  return (
    <svg
      onClick={onClick}
      className={`${className} w-14 h-14 fill-current text-gunmetal dark:text-white hover:rotate-90 duration-700 transform cursor-pointer`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default CloseBtnSVG
