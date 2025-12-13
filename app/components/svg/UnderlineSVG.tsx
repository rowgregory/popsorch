'use client'

import { useEffect, useRef, useState } from 'react'

const UnderlineSVG = () => {
  const pathRef = useRef(null) as any
  const [pathLength, setPathLength] = useState(0)

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength() // Get path length
      setPathLength(length) // Save length in state
    }
  }, [])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="500"
      zoomAndPan="magnify"
      viewBox="0 0 375 30.000001"
      height="40"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <defs>
        <clipPath id="085eeddfea">
          <path
            d="M 6.046875 0.148438 L 368.949219 0.148438 L 368.949219 29.03125 L 6.046875 29.03125 Z M 6.046875 0.148438 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#085eeddfea)">
        <path
          ref={pathRef}
          fill="none"
          stroke="#dd0e3b"
          strokeWidth="2"
          d="M 367.246094 3.363281 C 344.015625 0.25 320.167969 0.742188 296.605469 1.503906 C 273.316406 2.257812 250.035156 3.167969 226.78125 4.273438 C 203.554688 5.375 180.351562 6.695312 157.230469 8.5 C 133.824219 10.324219 110.527344 12.621094 87.386719 15.53125 C 63.496094 18.535156 39.816406 22.425781 16.386719 26.65625 C 13.195312 27.234375 9.980469 27.761719 6.796875 28.359375 C 6.035156 28.503906 8.070312 29.132812 8.640625 29.039062 C 11.90625 28.480469 15.144531 27.84375 18.390625 27.222656 C 37.445312 23.816406 56.761719 21.136719 76.261719 18.929688 C 99.476562 16.3125 122.941406 14.320312 146.367188 12.660156 C 169.882812 10.992188 193.464844 9.710938 217.066406 8.667969 C 240.539062 7.632812 264.035156 6.839844 287.535156 6.105469 C 308.878906 5.441406 330.351562 4.625 351.632812 6.117188 C 350.269531 6.347656 348.90625 6.582031 347.546875 6.824219 C 339.375 8.269531 330.824219 9.078125 322.441406 9.820312 C 307.660156 11.128906 292.792969 12.089844 277.933594 12.960938 C 277.664062 12.980469 278.394531 13.621094 278.777344 13.605469 C 293.085938 12.925781 307.335938 11.890625 321.550781 10.652344 C 328.820312 10.015625 336.179688 9.292969 343.503906 9.007812 C 347.066406 8.871094 350.625 8.71875 354.171875 8.460938 C 356.136719 8.316406 358.097656 8.167969 360.058594 8.007812 C 362.335938 7.824219 364.652344 7.859375 366.917969 7.617188 C 368.613281 7.4375 368.957031 3.589844 367.246094 3.363281 "
          fillOpacity="1"
          fillRule="nonzero"
          strokeDasharray={pathLength} // Set the dash array to the full path length
          strokeDashoffset={pathLength} // Initially hide the stroke
          style={{
            animation: 'draw 2s ease forwards' // Animate the stroke
          }}
        />
      </g>
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 70;
          }
        }
      `}</style>
    </svg>
  )
}

export default UnderlineSVG
