import React, { FC } from 'react'

const AuthArrowSVG: FC<{ onClick?: any }> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      zoomAndPan="magnify"
      viewBox="0 0 150 149.999998"
      height="25"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
      className="fill-current text-[#9ca3af] dark:text-smokysage hover:text-aquablue dark:hover:text-oceanicnocturne duration-300"
    >
      <defs>
        <clipPath id="cfb5156208">
          <path
            d="M 28.121094 50.710938 L 121.871094 50.710938 L 121.871094 98.710938 L 28.121094 98.710938 Z M 28.121094 50.710938 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="a2e5096c7e">
          <path d="M 0 0 L 149.25 0 L 149.25 149.25 L 0 149.25 Z M 0 0 " clipRule="nonzero" />
        </clipPath>
      </defs>
      <g clipPath="url(#cfb5156208)">
        <path
          d="M 121.851562 74.660156 L 92.074219 98.605469 L 92.074219 85.59375 L 28.144531 85.59375 L 28.144531 63.726562 L 92.074219 63.726562 L 92.074219 50.710938 Z M 121.851562 74.660156 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
      <g clipPath="url(#a2e5096c7e)">
        <path
          d="M 74.636719 -0.0195312 C 33.472656 -0.0195312 -0.0195312 33.472656 -0.0195312 74.636719 C -0.0195312 115.800781 33.472656 149.292969 74.636719 149.292969 C 115.800781 149.292969 149.292969 115.800781 149.292969 74.636719 C 149.292969 33.472656 115.800781 -0.0195312 74.636719 -0.0195312 Z M 74.636719 139.960938 C 38.617188 139.960938 9.3125 110.648438 9.3125 74.636719 C 9.3125 38.625 38.617188 9.3125 74.636719 9.3125 C 110.660156 9.3125 139.960938 38.625 139.960938 74.636719 C 139.960938 110.648438 110.660156 139.960938 74.636719 139.960938 Z M 74.636719 139.960938 "
          fillOpacity="1"
          fillRule="nonzero"
        />
      </g>
    </svg>
  )
}

export default AuthArrowSVG
