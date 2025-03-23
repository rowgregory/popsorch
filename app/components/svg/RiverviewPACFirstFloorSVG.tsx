'use client'

import React, { useEffect, useRef, useState } from 'react'

const amethystHover = 'fill-purple-700 hover:fill-purple-600 duration-200' // Slightly lighter
const magentaHover = 'fill-pink-700 hover:fill-pink-600 duration-200' // Slightly lighter
const forestHover = 'fill-lime-600 hover:fill-lime-500 duration-200'
const aquaHover = 'fill-sky-500 hover:fill-sky-400 duration-200' // Slightly lighter
const tealHover = 'fill-blue-600 hover:fill-blue-500 duration-200' // Slightly lighter

const RiverviewPACFirstFloorSVG = ({ modalRef }: any) => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean
    seat: string | null
    x: number
    y: number
    price: string | null
    level: string | null
  }>({
    visible: false,
    seat: '',
    x: 0,
    y: 0,
    price: '',
    level: ''
  })
  const modalBoundsRef = useRef(null)

  useEffect(() => {
    if (modalRef.current) {
      modalBoundsRef.current = modalRef.current.getBoundingClientRect()
    }
  }, [modalRef])

  const onHoverSeat = (e: any) => {
    if (!modalRef.current || !modalBoundsRef.current) return
    const target = e.target as SVGElement
    const seat = target.getAttribute('data-seat')
    const price = target.getAttribute('data-price')
    const level = target.getAttribute('data-level')

    const { left } = modalBoundsRef.current

    // Tooltip position relative to modal
    const tooltipX = e.clientX - left
    const tooltipY = e.clientY

    setTooltip({
      visible: true,
      seat,
      x: tooltipX,
      y: tooltipY,
      price,
      level
    })
  }

  const onLeaveSeat = () => {
    setTooltip({ visible: false, seat: '', x: 0, y: 0, price: '', level: '' })
  }

  return (
    <>
      {tooltip.visible && (
        <div
          className="absolute -translate-x-1/2 -translate-y-full border-2 border-slatemist bg-white text-gunmetal dark:bg-black/75 dark:text-white py-2 px-2 rounded-lg text-xs flex flex-col"
          style={{
            top: tooltip.y,
            left: tooltip.x
          }}
        >
          <h1 className="font-bold text-xl mb-1">{tooltip.level} Seat</h1>
          <h2 className="font-semibold">Seat: {tooltip.seat}</h2>
          <h3 className="font-semibold">Price: ${tooltip.price}</h3>
        </div>
      )}
      <svg width="100%" height="100%" viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" className="fill-current">
        {/* Row A */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="204" y="22" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            A
          </text>
          <rect x="220" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A1" data-level="General" />
          <rect x="240" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A2" data-level="General" />
          <rect x="260" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A3" data-level="General" />
          <rect x="280" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A4" data-level="General" />
          <rect x="300" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A5" data-level="General" />
          <rect x="320" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A6" data-level="General" />
          <rect x="340" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A7" data-level="General" />
          <rect x="360" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A8" data-level="General" />
          <rect x="380" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A9" data-level="General" />
          <rect x="400" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A10" data-level="General" />
          <rect x="420" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A11" data-level="General" />
          <rect x="440" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A12" data-level="General" />
          <rect x="460" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A13" data-level="General" />
          <rect x="480" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A14" data-level="General" />
          <rect x="500" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A15" data-level="General" />
          <rect x="520" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A16" data-level="General" />
          <rect x="540" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A17" data-level="General" />
          <rect x="560" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A18" data-level="General" />
          <rect x="580" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A19" data-level="General" />
          <rect x="600" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A20" data-level="General" />
          <rect x="620" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A21" data-level="General" />
          <rect x="640" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A22" data-level="General" />
          <rect x="660" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A23" data-level="General" />
          <rect x="680" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A24" data-level="General" />
          <rect x="700" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A25" data-level="General" />
          <rect x="720" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A26" data-level="General" />
          <rect x="740" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A27" data-level="General" />
          <rect x="760" y="10" width="16" height="16" className={forestHover} data-price="250" data-seat="A28" data-level="General" />
        </g>

        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="184" y="43" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            B
          </text>
          <rect x="200" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B1" data-level="General" />
          <rect x="220" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B2" data-level="General" />
          <rect x="240" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B3" data-level="General" />
          <rect x="260" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B4" data-level="General" />
          <rect x="280" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B5" data-level="General" />
          <rect x="300" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B6" data-level="General" />
          <rect x="320" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B7" data-level="General" />
          <rect x="340" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B8" data-level="General" />
          <rect x="360" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B9" data-level="General" />
          <rect x="380" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B10" data-level="General" />
          <rect x="400" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B11" data-level="General" />
          <rect x="420" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B12" data-level="General" />
          <rect x="440" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B13" data-level="General" />
          <rect x="460" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B14" data-level="General" />
          <rect x="480" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B15" data-level="General" />
          <rect x="500" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B16" data-level="General" />
          <rect x="520" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B17" data-level="General" />
          <rect x="540" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B18" data-level="General" />
          <rect x="560" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B19" data-level="General" />
          <rect x="580" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B20" data-level="General" />
          <rect x="600" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B21" data-level="General" />
          <rect x="620" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B22" data-level="General" />
          <rect x="640" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B23" data-level="General" />
          <rect x="660" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B24" data-level="General" />
          <rect x="680" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B25" data-level="General" />
          <rect x="700" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B26" data-level="General" />
          <rect x="720" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B27" data-level="General" />
          <rect x="740" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B28" data-level="General" />
          <rect x="760" y="30" width="16" height="16" className={forestHover} data-price="250" data-seat="B29" data-level="General" />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="184" y="63" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            C
          </text>
          <rect x="200" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C1" data-level="General" />
          <rect x="220" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C2" data-level="General" />
          <rect x="240" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C3" data-level="General" />
          <rect x="260" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C4" data-level="General" />
          <rect x="280" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C5" data-level="General" />
          <rect x="300" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C6" data-level="General" />
          <rect x="320" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C7" data-level="General" />
          <rect x="340" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C8" data-level="General" />
          <rect x="360" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C9" data-level="General" />
          <rect x="380" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C10" data-level="General" />
          <rect x="400" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C11" data-level="General" />
          <rect x="420" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C12" data-level="General" />
          <rect x="440" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C13" data-level="General" />
          <rect x="460" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C14" data-level="General" />
          <rect x="480" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C15" data-level="General" />
          <rect x="500" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C16" data-level="General" />
          <rect x="520" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C17" data-level="General" />
          <rect x="540" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C18" data-level="General" />
          <rect x="560" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C19" data-level="General" />
          <rect x="580" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C20" data-level="General" />
          <rect x="600" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C21" data-level="General" />
          <rect x="620" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C22" data-level="General" />
          <rect x="640" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C23" data-level="General" />
          <rect x="660" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C24" data-level="General" />
          <rect x="680" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C25" data-level="General" />
          <rect x="700" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C26" data-level="General" />
          <rect x="720" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C27" data-level="General" />
          <rect x="740" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C28" data-level="General" />
          <rect x="760" y="50" width="16" height="16" className={forestHover} data-price="250" data-seat="C29" data-level="General" />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="244" y="83" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            D
          </text>
          <rect x="260" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D1" data-level="Ultra" />
          <rect x="280" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D2" data-level="Ultra" />
          <rect x="300" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D3" data-level="Ultra" />
          <rect x="320" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D4" data-level="Ultra" />
          <rect x="340" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D5" data-level="Ultra" />
          <rect x="360" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D6" data-level="Ultra" />
          <rect x="380" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D7" data-level="Ultra" />
          <rect x="400" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D" data-level="Ultra" />
          <rect x="420" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D9" data-level="Ultra" />
          <rect x="440" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D10" data-level="Ultra" />
          <rect x="460" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D11" data-level="Ultra" />
          <rect x="480" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D12" data-level="Ultra" />
          <rect x="500" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D13" data-level="Ultra" />
          <rect x="520" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D14" data-level="Ultra" />
          <rect x="540" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D15" data-level="Ultra" />
          <rect x="560" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D16" data-level="Ultra" />
          <rect x="580" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D17" data-level="Ultra" />
          <rect x="600" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D18" data-level="Ultra" />
          <rect x="620" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D19" data-level="Ultra" />
          <rect x="640" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D20" data-level="Ultra" />
          <rect x="660" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D21" data-level="Ultra" />
          <rect x="680" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D22" data-level="Ultra" />
          <rect x="700" y="70" width="16" height="16" className={magentaHover} data-price="350" data-seat="D23" data-level="Ultra" />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="144" y="103" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            E
          </text>
          <rect x="160" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E1" data-level="Ultra" />
          <rect x="180" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E2" data-level="Ultra" />
          <rect x="200" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E3" data-level="Ultra" />
          <rect x="220" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E4" data-level="Ultra" />
          {/* Aisle */}
          <rect x="260" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E5" data-level="Ultra" />
          <rect x="280" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E6" data-level="Ultra" />
          <rect x="300" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E7" data-level="Ultra" />
          <rect x="320" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E8" data-level="Ultra" />
          <rect x="340" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E9" data-level="Ultra" />
          <rect x="360" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E10" data-level="Ultra" />
          <rect x="380" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E11" data-level="Ultra" />
          <rect x="400" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E12" data-level="Ultra" />
          <rect x="420" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E13" data-level="Ultra" />
          <rect x="440" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E14" data-level="Ultra" />
          <rect x="460" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E15" data-level="Ultra" />
          <rect x="480" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E16" data-level="Ultra" />
          <rect x="500" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E17" data-level="Ultra" />
          <rect x="520" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E18" data-level="Ultra" />
          <rect x="540" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E19" data-level="Ultra" />
          <rect x="560" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E20" data-level="Ultra" />
          <rect x="580" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E21" data-level="Ultra" />
          <rect x="600" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E22" data-level="Ultra" />
          <rect x="620" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E23" data-level="Ultra" />
          <rect x="640" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E24" data-level="Ultra" />
          <rect x="660" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E25" data-level="Ultra" />
          <rect x="680" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E26" data-level="Ultra" />
          <rect x="700" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E27" data-level="Ultra" />
          {/* Aisle */}
          <rect x="740" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E28" data-level="Ultra" />
          <rect x="760" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E29" data-level="Ultra" />
          <rect x="780" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E30" data-level="Ultra" />
          <rect x="800" y="90" width="16" height="16" className={magentaHover} data-price="350" data-seat="E31" data-level="Ultra" />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="124" y="123" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            F
          </text>
          <rect x="140" y="110" width="16" height="16" className={amethystHover} data-price="300" data-seat="F1" data-level="Premium" />
          <rect x="160" y="110" width="16" height="16" className={amethystHover} data-price="300" data-seat="F2" data-level="Premium" />
          <rect x="180" y="110" width="16" height="16" className={amethystHover} data-price="300" data-seat="F3" data-level="Premium" />
          <rect x="200" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F4" data-level="Ultra" />
          <rect x="220" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F5" data-level="Ultra" />
          {/* Aisle */}
          <rect x="260" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F6" data-level="Ultra" />
          <rect x="280" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F7" data-level="Ultra" />
          <rect x="300" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F8" data-level="Ultra" />
          <rect x="320" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F9" data-level="Ultra" />
          <rect x="340" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F10" data-level="Ultra" />
          <rect x="360" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F11" data-level="Ultra" />
          <rect x="380" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F12" data-level="Ultra" />
          <rect x="400" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F13" data-level="Ultra" />
          <rect x="420" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F14" data-level="Ultra" />
          <rect x="440" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F15" data-level="Ultra" />
          <rect x="460" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F16" data-level="Ultra" />
          <rect x="480" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F17" data-level="Ultra" />
          <rect x="500" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F18" data-level="Ultra" />
          <rect x="520" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F19" data-level="Ultra" />
          <rect x="540" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F20" data-level="Ultra" />
          <rect x="560" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F21" data-level="Ultra" />
          <rect x="580" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F22" data-level="Ultra" />
          <rect x="600" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F23" data-level="Ultra" />
          <rect x="620" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F24" data-level="Ultra" />
          <rect x="640" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F25" data-level="Ultra" />
          <rect x="660" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F26" data-level="Ultra" />
          <rect x="680" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F27" data-level="Ultra" />
          <rect x="700" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F28" data-level="Ultra" />
          {/* Aisle */}
          <rect x="740" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F29" data-level="Ultra" />
          <rect x="760" y="110" width="16" height="16" className={magentaHover} data-price="350" data-seat="F30" data-level="Ultra" />
          <rect x="780" y="110" width="16" height="16" className={amethystHover} data-price="300" data-seat="F31" data-level="Premium" />
          <rect x="800" y="110" width="16" height="16" className={amethystHover} data-price="300" data-seat="F32" data-level="Premium" />
          <rect x="820" y="110" width="16" height="16" className={amethystHover} data-price="300" data-seat="F33" data-level="Premium" />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="104" y="143" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            G
          </text>
          <rect x="120" y="130" width="16" height="16" className={amethystHover} data-price="300" data-seat="G1" data-level="Premium" />
          <rect x="140" y="130" width="16" height="16" className={amethystHover} data-price="300" data-seat="G2" data-level="Premium" />
          <rect x="160" y="130" width="16" height="16" className={amethystHover} data-price="300" data-seat="G3" data-level="Premium" />
          <rect x="180" y="130" width="16" height="16" className={amethystHover} data-price="300" data-seat="G4" data-level="Premium" />
          <rect x="200" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G5" data-level="Ultra" />
          <rect x="220" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G6" data-level="Ultra" />
          {/* Aisle */}
          <rect x="260" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G7" data-level="Ultra" />
          <rect x="280" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G8" data-level="Ultra" />
          <rect x="300" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G9" data-level="Ultra" />
          <rect x="320" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G10" data-level="Ultra" />
          <rect x="340" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G11" data-level="Ultra" />
          <rect x="360" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G12" data-level="Ultra" />
          <rect x="380" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G13" data-level="Ultra" />
          <rect x="400" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G14" data-level="Ultra" />
          <rect x="420" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G15" data-level="Ultra" />
          <rect x="440" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G16" data-level="Ultra" />
          <rect x="460" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G17" data-level="Ultra" />
          <rect x="480" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G18" data-level="Ultra" />
          <rect x="500" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G19" data-level="Ultra" />
          <rect x="520" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G20" data-level="Ultra" />
          <rect x="540" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G21" data-level="Ultra" />
          <rect x="560" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G22" data-level="Ultra" />
          <rect x="580" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G23" data-level="Ultra" />
          <rect x="600" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G24" data-level="Ultra" />
          <rect x="620" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G25" data-level="Ultra" />
          <rect x="640" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G26" data-level="Ultra" />
          <rect x="660" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G27" data-level="Ultra" />
          <rect x="680" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G28" data-level="Ultra" />
          <rect x="700" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G29" data-level="Ultra" />
          {/* Aisle */}
          <rect x="740" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G30" data-level="Ultra" />
          <rect x="760" y="130" width="16" height="16" className={magentaHover} data-price="350" data-seat="G31" data-level="Ultra" />
          <rect x="780" y="130" width="16" height="16" className={amethystHover} data-price="300" data-seat="G32" data-level="Premium" />
          <rect x="800" y="130" width="16" height="16" className={amethystHover} data-price="300" data-seat="G33" data-level="Premium" />
          <rect x="820" y="130" width="16" height="16" className={amethystHover} data-price="300" data-seat="G34" data-level="Premium" />
          <rect x="840" y="130" width="16" height="16" className={amethystHover} data-price="300" data-seat="G35" data-level="Premium" />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="84" y="163" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            H
          </text>
          <rect x="100" y="150" width="16" height="16" className={amethystHover} data-price="300" data-seat="H1" data-level="Premium" />
          <rect x="120" y="150" width="16" height="16" className={amethystHover} data-price="300" data-seat="H2" data-level="Premium" />
          <rect x="140" y="150" width="16" height="16" className={amethystHover} data-price="300" data-seat="H3" data-level="Premium" />
          <rect x="160" y="150" width="16" height="16" className={amethystHover} data-price="300" data-seat="H4" data-level="Premium" />
          <rect x="180" y="150" width="16" height="16" className={amethystHover} data-price="300" data-seat="H5" data-level="Premium" />
          <rect x="200" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H6" data-level="Ultra" />
          <rect x="220" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H7" data-level="Ultra" />
          {/* Aisle */}
          <rect x="260" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H8" data-level="Ultra" />
          <rect x="280" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H9" data-level="Ultra" />
          <rect x="300" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H10" data-level="Ultra" />
          <rect x="320" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H11" data-level="Ultra" />
          <rect x="340" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H12" data-level="Ultra" />
          <rect x="360" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H13" data-level="Ultra" />
          <rect x="380" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H14" data-level="Ultra" />
          <rect x="400" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H15" data-level="Ultra" />
          <rect x="420" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H16" data-level="Ultra" />
          <rect x="440" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H17" data-level="Ultra" />
          <rect x="460" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H18" data-level="Ultra" />
          <rect x="480" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H19" data-level="Ultra" />
          <rect x="500" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H20" data-level="Ultra" />
          <rect x="520" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H21" data-level="Ultra" />
          <rect x="540" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H22" data-level="Ultra" />
          <rect x="560" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H23" data-level="Ultra" />
          <rect x="580" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H24" data-level="Ultra" />
          <rect x="600" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H25" data-level="Ultra" />
          <rect x="620" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H26" data-level="Ultra" />
          <rect x="640" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H27" data-level="Ultra" />
          <rect x="660" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H28" data-level="Ultra" />
          <rect x="680" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H29" data-level="Ultra" />
          <rect x="700" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H30" data-level="Ultra" />
          <rect x="740" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H31" data-level="Ultra" />
          <rect x="760" y="150" width="16" height="16" className={magentaHover} data-price="350" data-seat="H32" data-level="Ultra" />
          <rect x="780" y="150" width="16" height="16" className={amethystHover} data-price="300" data-seat="H33" data-level="Premium" />
          <rect x="800" y="150" width="16" height="16" className={amethystHover} data-price="300" data-seat="H34" data-level="Premium" />
          <rect x="820" y="150" width="16" height="16" className={amethystHover} data-price="300" data-seat="H35" data-level="Premium" />
          <rect x="840" y="150" width="16" height="16" className={amethystHover} data-price="300" data-seat="H36" data-level="Premium" />
          <rect x="860" y="150" width="16" height="16" className={amethystHover} data-price="300" data-seat="H37" data-level="Premium" />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="47" y="183" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            I
          </text>
          <rect x="60" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I1" data-level="Premium" />
          <rect x="80" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I2" data-level="Premium" />
          <rect x="100" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I3" data-level="Premium" />
          <rect x="120" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I4" data-level="Premium" />
          <rect x="140" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I5" data-level="Premium" />
          <rect x="160" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I6" data-level="Premium" />
          <rect x="180" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I7" data-level="Premium" />
          <rect x="200" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I8" data-level="Ultra" />
          <rect x="220" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I9" data-level="Ultra" />
          {/* Aisle */}
          <rect x="260" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I10" data-level="Ultra" />
          <rect x="280" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I11" data-level="Ultra" />
          <rect x="300" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I12" data-level="Ultra" />
          <rect x="320" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I13" data-level="Ultra" />
          <rect x="340" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I14" data-level="Ultra" />
          <rect x="360" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I15" data-level="Ultra" />
          <rect x="380" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I16" data-level="Ultra" />
          <rect x="400" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I17" data-level="Ultra" />
          <rect x="420" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I18" data-level="Ultra" />
          <rect x="440" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I19" data-level="Ultra" />
          <rect x="460" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I20" data-level="Ultra" />
          <rect x="480" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I21" data-level="Ultra" />
          <rect x="500" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I22" data-level="Ultra" />
          <rect x="520" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I23" data-level="Ultra" />
          <rect x="540" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I24" data-level="Ultra" />
          <rect x="560" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I25" data-level="Ultra" />
          <rect x="580" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I26" data-level="Ultra" />
          <rect x="600" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I27" data-level="Ultra" />
          <rect x="620" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I28" data-level="Ultra" />
          <rect x="640" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I29" data-level="Ultra" />
          <rect x="660" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I30" data-level="Ultra" />
          <rect x="680" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I31" data-level="Ultra" />
          <rect x="700" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I32" data-level="Ultra" />
          {/* Aisle */}
          <rect x="740" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I33" data-level="Ultra" />
          <rect x="760" y="170" width="16" height="16" className={magentaHover} data-price="350" data-seat="I34" data-level="Ultra" />
          <rect x="780" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I35" data-level="Premium" />
          <rect x="800" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I36" data-level="Premium" />
          <rect x="820" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I37" data-level="Premium" />
          <rect x="840" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I38" data-level="Premium" />
          <rect x="860" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I39" data-level="Premium" />
          <rect x="880" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I40" data-level="Premium" />
          <rect x="900" y="170" width="16" height="16" className={amethystHover} data-price="300" data-seat="I41" data-level="Premium" />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="25" y="202" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            J
          </text>
          <rect x="40" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J1" data-level="Premium" />
          <rect x="60" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J2" data-level="Premium" />
          <rect x="80" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J3" data-level="Premium" />
          <rect x="100" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J4" data-level="Premium" />
          <rect x="120" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J5" data-level="Premium" />
          <rect x="140" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J6" data-level="Premium" />
          <rect x="160" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J7" data-level="Premium" />
          <rect x="180" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J8" data-level="Premium" />
          <rect x="200" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J9" data-level="Ultra" />
          <rect x="220" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J10" data-level="Ultra" />
          {/* Aisle */}
          <rect x="260" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J11" data-level="Ultra" />
          <rect x="280" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J12" data-level="Ultra" />
          <rect x="300" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J13" data-level="Ultra" />
          <rect x="320" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J14" data-level="Ultra" />
          <rect x="340" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J15" data-level="Ultra" />
          <rect x="360" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J16" data-level="Ultra" />
          <rect x="380" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J17" data-level="Ultra" />
          <rect x="400" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J18" data-level="Ultra" />
          <rect x="420" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J19" data-level="Ultra" />
          <rect x="440" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J20" data-level="Ultra" />
          <rect x="460" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J21" data-level="Ultra" />
          <rect x="480" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J22" data-level="Ultra" />
          <rect x="500" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J23" data-level="Ultra" />
          <rect x="520" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J24" data-level="Ultra" />
          <rect x="540" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J25" data-level="Ultra" />
          <rect x="560" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J26" data-level="Ultra" />
          <rect x="580" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J27" data-level="Ultra" />
          <rect x="600" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J28" data-level="Ultra" />
          <rect x="620" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J29" data-level="Ultra" />
          <rect x="640" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J30" data-level="Ultra" />
          <rect x="660" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J31" data-level="Ultra" />
          <rect x="680" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J32" data-level="Ultra" />
          <rect x="700" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J33" data-level="Ultra" />
          {/* Aisle */}
          <rect x="740" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J34" data-level="Ultra" />
          <rect x="760" y="190" width="16" height="16" className={magentaHover} data-price="350" data-seat="J35" data-level="Ultra" />
          <rect x="780" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J36" data-level="Premium" />
          <rect x="800" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J37" data-level="Premium" />
          <rect x="820" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J38" data-level="Premium" />
          <rect x="840" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J39" data-level="Premium" />
          <rect x="860" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J40" data-level="Premium" />
          <rect x="880" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J41" data-level="Premium" />
          <rect x="900" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J42" data-level="Premium" />
          <rect x="920" y="190" width="16" height="16" className={amethystHover} data-price="300" data-seat="J43" data-level="Premium" />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="5" y="224" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            K
          </text>
          <rect x="20" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K1" data-level="Premium" />
          <rect x="40" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K2" data-level="Premium" />
          <rect x="60" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K3" data-level="Premium" />
          <rect x="80" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K4" data-level="Premium" />
          <rect x="100" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K5" data-level="Premium" />
          <rect x="120" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K6" data-level="Premium" />
          <rect x="140" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K7" data-level="Premium" />
          <rect x="160" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K8" data-level="Premium" />
          <rect x="180" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K9" data-level="Premium" />
          <rect x="200" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K10" data-level="Ultra" />
          <rect x="220" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K11" data-level="Ultra" />
          {/* Aisle */}
          <rect x="260" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K12" data-level="Ultra" />
          <rect x="280" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K13" data-level="Ultra" />
          <rect x="300" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K14" data-level="Ultra" />
          <rect x="320" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K15" data-level="Ultra" />
          <rect x="340" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K16" data-level="Ultra" />
          <rect x="360" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K17" data-level="Ultra" />
          <rect x="380" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K18" data-level="Ultra" />
          <rect x="400" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K19" data-level="Ultra" />
          <rect x="420" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K20" data-level="Ultra" />
          <rect x="440" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K21" data-level="Ultra" />
          <rect x="460" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K22" data-level="Ultra" />
          <rect x="480" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K23" data-level="Ultra" />
          <rect x="500" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K24" data-level="Ultra" />
          <rect x="520" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K25" data-level="Ultra" />
          <rect x="540" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K26" data-level="Ultra" />
          <rect x="560" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K27" data-level="Ultra" />
          <rect x="580" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K28" data-level="Ultra" />
          <rect x="600" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K29" data-level="Ultra" />
          <rect x="620" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K30" data-level="Ultra" />
          <rect x="640" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K31" data-level="Ultra" />
          <rect x="660" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K32" data-level="Ultra" />
          <rect x="680" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K33" data-level="Ultra" />
          <rect x="700" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K34" data-level="Ultra" />
          {/* Aisle */}
          <rect x="740" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K35" data-level="Ultra" />
          <rect x="760" y="210" width="16" height="16" className={magentaHover} data-price="350" data-seat="K36" data-level="Ultra" />
          <rect x="780" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K37" data-level="Premium" />
          <rect x="800" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K38" data-level="Premium" />
          <rect x="820" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K39" data-level="Premium" />
          <rect x="840" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K40" data-level="Premium" />
          <rect x="860" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K41" data-level="Premium" />
          <rect x="880" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K42" data-level="Premium" />
          <rect x="900" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K43" data-level="Premium" />
          <rect x="920" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K44" data-level="Premium" />
          <rect x="940" y="210" width="16" height="16" className={amethystHover} data-price="300" data-seat="K45" data-level="Premium" />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="5" y="244" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            L
          </text>
          <rect x="20" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L1" data-level="Premium" />
          <rect x="40" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L2" data-level="Premium" />
          <rect x="60" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L3" data-level="Premium" />
          <rect x="80" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L4" data-level="Premium" />
          <rect x="100" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L5" data-level="Premium" />
          <rect x="120" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L6" data-level="Premium" />
          <rect x="140" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L7" data-level="Premium" />
          <rect x="160" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L8" data-level="Premium" />
          <rect x="180" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L9" data-level="Premium" />
          <rect x="200" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L10" data-level="Ultra" />
          <rect x="220" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L11" data-level="Ultra" />
          {/* Aisle */}
          <rect x="260" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L12" data-level="Ultra" />
          <rect x="280" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L13" data-level="Ultra" />
          <rect x="300" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L14" data-level="Ultra" />
          <rect x="320" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L15" data-level="Ultra" />
          <rect x="340" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L16" data-level="Ultra" />
          <rect x="360" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L17" data-level="Ultra" />
          <rect x="380" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L18" data-level="Ultra" />
          <rect x="400" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L19" data-level="Ultra" />
          <rect x="420" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L20" data-level="Ultra" />
          <rect x="440" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L21" data-level="Ultra" />
          <rect x="460" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L22" data-level="Ultra" />
          <rect x="480" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L23" data-level="Ultra" />
          <rect x="500" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L24" data-level="Ultra" />
          <rect x="520" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L25" data-level="Ultra" />
          <rect x="540" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L26" data-level="Ultra" />
          <rect x="560" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L27" data-level="Ultra" />
          <rect x="580" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L28" data-level="Ultra" />
          <rect x="600" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L29" data-level="Ultra" />
          <rect x="620" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L30" data-level="Ultra" />
          <rect x="640" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L31" data-level="Ultra" />
          <rect x="660" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L32" data-level="Ultra" />
          <rect x="680" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L33" data-level="Ultra" />
          <rect x="700" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L34" data-level="Ultra" />
          {/* Aisle */}
          <rect x="740" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L35" data-level="Ultra" />
          <rect x="760" y="230" width="16" height="16" className={magentaHover} data-price="350" data-seat="L36" data-level="Ultra" />
          <rect x="780" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L37" data-level="Premium" />
          <rect x="800" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L38" data-level="Premium" />
          <rect x="820" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L39" data-level="Premium" />
          <rect x="840" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L40" data-level="Premium" />
          <rect x="860" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L41" data-level="Premium" />
          <rect x="880" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L42" data-level="Premium" />
          <rect x="900" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L43" data-level="Premium" />
          <rect x="920" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L44" data-level="Premium" />
          <rect x="940" y="230" width="16" height="16" className={amethystHover} data-price="300" data-seat="L45" data-level="Premium" />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="5" y="264" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            M
          </text>
          <rect x="20" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M1" data-level="Premium" />
          <rect x="40" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M2" data-level="Premium" />
          <rect x="60" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M3" data-level="Premium" />
          <rect x="80" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M4" data-level="Premium" />
          <rect x="100" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M5" data-level="Premium" />
          <rect x="120" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M6" data-level="Premium" />
          <rect x="140" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M7" data-level="Premium" />
          <rect x="160" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M8" data-level="Premium" />
          <rect x="180" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M9" data-level="Premium" />
          <rect x="200" y="250" width="16" height="16" className={magentaHover} data-price="350" data-seat="M10" data-level="Ultra" />
          <rect x="220" y="250" width="16" height="16" className={magentaHover} data-price="350" data-seat="M11" data-level="Ultra" />
          {/* Aisle */}
          <rect x="260" y="250" width="16" height="16" className={magentaHover} data-price="350" data-seat="M12" data-level="Ultra" />
          <rect x="280" y="250" width="16" height="16" className={magentaHover} data-price="350" data-seat="M13" data-level="Ultra" />
          <rect x="300" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M14" data-level="Premium" />
          <rect x="320" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M15" data-level="Premium" />
          <rect x="340" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M16" data-level="Premium" />
          <rect x="360" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M17" data-level="Premium" />
          <rect x="380" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M17" data-level="Premium" />
          <rect x="400" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M19" data-level="Premium" />
          <rect x="420" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M20" data-level="Premium" />
          <rect x="440" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M21" data-level="Premium" />
          <rect x="460" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M22" data-level="Premium" />
          <rect x="480" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M23" data-level="Premium" />
          <rect x="500" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M24" data-level="Premium" />
          <rect x="520" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M25" data-level="Premium" />
          <rect x="540" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M26" data-level="Premium" />
          <rect x="560" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M27" data-level="Premium" />
          <rect x="580" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M28" data-level="Premium" />
          <rect x="600" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M29" data-level="Premium" />
          <rect x="620" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M30" data-level="Premium" />
          <rect x="640" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M31" data-level="Premium" />
          <rect x="660" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M32" data-level="Premium" />
          <rect x="680" y="250" width="16" height="16" className={magentaHover} data-price="350" data-seat="M33" data-level="Ultra" />
          <rect x="700" y="250" width="16" height="16" className={magentaHover} data-price="350" data-seat="M34" data-level="Ultra" />
          <rect x="740" y="250" width="16" height="16" className={magentaHover} data-price="350" data-seat="M35" data-level="Ultra" />
          <rect x="760" y="250" width="16" height="16" className={magentaHover} data-price="350" data-seat="M36" data-level="Ultra" />
          <rect x="780" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M37" data-level="Premium" />
          <rect x="800" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M38" data-level="Premium" />
          <rect x="820" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M39" data-level="Premium" />
          <rect x="840" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M40" data-level="Premium" />
          <rect x="860" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M41" data-level="Premium" />
          <rect x="880" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M42" data-level="Premium" />
          <rect x="900" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M43" data-level="Premium" />
          <rect x="920" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M44" data-level="Premium" />
          <rect x="940" y="250" width="16" height="16" className={amethystHover} data-price="300" data-seat="M45" data-level="Premium" />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="25" y="284" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            N
          </text>
          <rect x="40" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N1" data-level="Premium" />
          <rect x="60" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N2" data-level="Premium" />
          <rect x="80" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N3" data-level="Premium" />
          <rect x="100" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N4" data-level="Premium" />
          <rect x="120" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N5" data-level="Premium" />
          <rect x="140" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N6" data-level="Premium" />
          <rect x="160" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N7" data-level="Premium" />
          <rect x="180" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N8" data-level="Premium" />
          <rect x="200" y="270" width="16" height="16" className={magentaHover} data-price="350" data-seat="N9" data-level="Ultra" />
          <rect x="220" y="270" width="16" height="16" className={magentaHover} data-price="350" data-seat="N10" data-level="Ultra" />
          {/* Aisle */}
          <rect x="260" y="270" width="16" height="16" className={magentaHover} data-price="350" data-seat="N11" data-level="Ultra" />
          <rect x="280" y="270" width="16" height="16" className={magentaHover} data-price="350" data-seat="N12" data-level="Ultra" />
          <rect x="300" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N13" data-level="Premium" />
          <rect x="320" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N14" data-level="Premium" />
          <rect x="340" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N15" data-level="Premium" />
          <rect x="360" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N16" data-level="Premium" />
          <rect x="380" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N17" data-level="Premium" />
          <rect x="400" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N18" data-level="Premium" />
          <rect x="420" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N19" data-level="Premium" />
          <rect x="440" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N20" data-level="Premium" />
          <rect x="460" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N21" data-level="Premium" />
          <rect x="480" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N22" data-level="Premium" />
          <rect x="500" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N23" data-level="Premium" />
          <rect x="520" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N24" data-level="Premium" />
          <rect x="540" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N25" data-level="Premium" />
          <rect x="560" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N26" data-level="Premium" />
          <rect x="580" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N27" data-level="Premium" />
          <rect x="600" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N28" data-level="Premium" />
          <rect x="620" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N29" data-level="Premium" />
          <rect x="640" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N30" data-level="Premium" />
          <rect x="660" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N31" data-level="Premium" />
          <rect x="680" y="270" width="16" height="16" className={magentaHover} data-price="350" data-seat="N32" data-level="Ultra" />
          <rect x="700" y="270" width="16" height="16" className={magentaHover} data-price="350" data-seat="N33" data-level="Ultra" />
          {/* Aisle */}
          <rect x="740" y="270" width="16" height="16" className={magentaHover} data-price="350" data-seat="N34" data-level="Ultra" />
          <rect x="760" y="270" width="16" height="16" className={magentaHover} data-price="350" data-seat="N35" data-level="Ultra" />
          <rect x="780" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N36" data-level="Premium" />
          <rect x="800" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N37" data-level="Premium" />
          <rect x="820" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N38" data-level="Premium" />
          <rect x="840" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N39" data-level="Premium" />
          <rect x="860" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N40" data-level="Premium" />
          <rect x="880" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N41" data-level="Premium" />
          <rect x="900" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N42" data-level="Premium" />
          <rect x="920" y="270" width="16" height="16" className={amethystHover} data-price="300" data-seat="N43" data-level="Premium" />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="45" y="304" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            O
          </text>
          <rect x="60" y="290" width="16" height="16" className={amethystHover} />
          <rect x="80" y="290" width="16" height="16" className={amethystHover} />
          <rect x="100" y="290" width="16" height="16" className={amethystHover} />
          <rect x="120" y="290" width="16" height="16" className={amethystHover} />
          <rect x="140" y="290" width="16" height="16" className={tealHover} />
          <rect x="160" y="290" width="16" height="16" className={tealHover} />
          <rect x="180" y="290" width="16" height="16" className={aquaHover} />
          <rect x="200" y="290" width="16" height="16" className={aquaHover} />
          <rect x="220" y="290" width="16" height="16" className={tealHover} />
          <rect x="320" y="290" width="16" height="16" className={tealHover} />
          <rect x="340" y="290" width="16" height="16" className={aquaHover} />
          <rect x="360" y="290" width="16" height="16" className={aquaHover} />
          <rect x="380" y="290" width="16" height="16" className={tealHover} />
          <rect x="400" y="290" width="16" height="16" className={tealHover} />
          <rect x="420" y="290" width="16" height="16" className={aquaHover} />
          <rect x="440" y="290" width="16" height="16" className={aquaHover} />
          <rect x="460" y="290" width="16" height="16" className={tealHover} />
          <rect x="480" y="290" width="16" height="16" className={tealHover} />
          <rect x="500" y="290" width="16" height="16" className={tealHover} />
          <rect x="520" y="290" width="16" height="16" className={tealHover} />
          <rect x="540" y="290" width="16" height="16" className={aquaHover} />
          <rect x="560" y="290" width="16" height="16" className={aquaHover} />
          <rect x="580" y="290" width="16" height="16" className={tealHover} />
          <rect x="600" y="290" width="16" height="16" className={tealHover} />
          <rect x="620" y="290" width="16" height="16" className={aquaHover} />
          <rect x="640" y="290" width="16" height="16" className={aquaHover} />
          <rect x="660" y="290" width="16" height="16" className={tealHover} />
          <rect x="740" y="290" width="16" height="16" className={tealHover} />
          <rect x="760" y="290" width="16" height="16" className={aquaHover} />
          <rect x="780" y="290" width="16" height="16" className={aquaHover} />
          <rect x="800" y="290" width="16" height="16" className={tealHover} />
          <rect x="820" y="290" width="16" height="16" className={tealHover} />
          <rect x="840" y="290" width="16" height="16" className={amethystHover} />
          <rect x="860" y="290" width="16" height="16" className={amethystHover} />
          <rect x="880" y="290" width="16" height="16" className={amethystHover} />
          <rect x="900" y="290" width="16" height="16" className={amethystHover} />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="25" y="344" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            P
          </text>
          <rect x="40" y="330" width="16" height="16" className={amethystHover} />
          <rect x="60" y="330" width="16" height="16" className={amethystHover} />
          <rect x="80" y="330" width="16" height="16" className={amethystHover} />
          <rect x="100" y="330" width="16" height="16" className={amethystHover} />
          <rect x="120" y="330" width="16" height="16" className={amethystHover} />
          <rect x="140" y="330" width="16" height="16" className={amethystHover} />
          <rect x="160" y="330" width="16" height="16" className={magentaHover} />
          <rect x="180" y="330" width="16" height="16" className={magentaHover} />
          <rect x="260" y="330" width="16" height="16" className={magentaHover} />
          <rect x="280" y="330" width="16" height="16" className={magentaHover} />
          <rect x="300" y="330" width="16" height="16" className={amethystHover} />
          <rect x="320" y="330" width="16" height="16" className={amethystHover} />
          <rect x="340" y="330" width="16" height="16" className={amethystHover} />
          <rect x="360" y="330" width="16" height="16" className={amethystHover} />
          <rect x="380" y="330" width="16" height="16" className={amethystHover} />
          <rect x="400" y="330" width="16" height="16" className={amethystHover} />
          <rect x="420" y="330" width="16" height="16" className={amethystHover} />
          <rect x="440" y="330" width="16" height="16" className={amethystHover} />
          <rect x="460" y="330" width="16" height="16" className={amethystHover} />
          <rect x="480" y="330" width="16" height="16" className={amethystHover} />
          <rect x="500" y="330" width="16" height="16" className={amethystHover} />
          <rect x="520" y="330" width="16" height="16" className={amethystHover} />
          <rect x="540" y="330" width="16" height="16" className={amethystHover} />
          <rect x="560" y="330" width="16" height="16" className={amethystHover} />
          <rect x="580" y="330" width="16" height="16" className={amethystHover} />
          <rect x="600" y="330" width="16" height="16" className={amethystHover} />
          <rect x="620" y="330" width="16" height="16" className={amethystHover} />
          <rect x="640" y="330" width="16" height="16" className={amethystHover} />
          <rect x="660" y="330" width="16" height="16" className={amethystHover} />
          <rect x="680" y="330" width="16" height="16" className={amethystHover} />
          <rect x="700" y="330" width="16" height="16" className={magentaHover} />
          <rect x="720" y="330" width="16" height="16" className={magentaHover} />
          <rect x="760" y="330" width="16" height="16" className={magentaHover} />
          <rect x="780" y="330" width="16" height="16" className={magentaHover} />
          <rect x="800" y="330" width="16" height="16" className={amethystHover} />
          <rect x="820" y="330" width="16" height="16" className={amethystHover} />
          <rect x="840" y="330" width="16" height="16" className={amethystHover} />
          <rect x="860" y="330" width="16" height="16" className={amethystHover} />
          <rect x="880" y="330" width="16" height="16" className={amethystHover} />
          <rect x="900" y="330" width="16" height="16" className={amethystHover} />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="25" y="364" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            Q
          </text>
          <rect x="40" y="350" width="16" height="16" className={amethystHover} />
          <rect x="60" y="350" width="16" height="16" className={amethystHover} />
          <rect x="80" y="350" width="16" height="16" className={amethystHover} />
          <rect x="100" y="350" width="16" height="16" className={amethystHover} />
          <rect x="120" y="350" width="16" height="16" className={amethystHover} />
          <rect x="140" y="350" width="16" height="16" className={amethystHover} />
          <rect x="160" y="350" width="16" height="16" className={magentaHover} />
          <rect x="180" y="350" width="16" height="16" className={magentaHover} />
          <rect x="240" y="350" width="16" height="16" className={magentaHover} />
          <rect x="260" y="350" width="16" height="16" className={magentaHover} />
          <rect x="280" y="350" width="16" height="16" className={amethystHover} />
          <rect x="300" y="350" width="16" height="16" className={amethystHover} />
          <rect x="320" y="350" width="16" height="16" className={amethystHover} />
          <rect x="340" y="350" width="16" height="16" className={amethystHover} />
          <rect x="360" y="350" width="16" height="16" className={amethystHover} />
          <rect x="380" y="350" width="16" height="16" className={amethystHover} />
          <rect x="400" y="350" width="16" height="16" className={amethystHover} />
          <rect x="420" y="350" width="16" height="16" className={amethystHover} />
          <rect x="440" y="350" width="16" height="16" className={amethystHover} />
          <rect x="460" y="350" width="16" height="16" className={amethystHover} />
          <rect x="480" y="350" width="16" height="16" className={amethystHover} />
          <rect x="500" y="350" width="16" height="16" className={amethystHover} />
          <rect x="520" y="350" width="16" height="16" className={amethystHover} />
          <rect x="540" y="350" width="16" height="16" className={amethystHover} />
          <rect x="560" y="350" width="16" height="16" className={amethystHover} />
          <rect x="580" y="350" width="16" height="16" className={amethystHover} />
          <rect x="600" y="350" width="16" height="16" className={amethystHover} />
          <rect x="620" y="350" width="16" height="16" className={amethystHover} />
          <rect x="640" y="350" width="16" height="16" className={amethystHover} />
          <rect x="660" y="350" width="16" height="16" className={amethystHover} />
          <rect x="680" y="350" width="16" height="16" className={amethystHover} />
          <rect x="700" y="350" width="16" height="16" className={magentaHover} />
          <rect x="720" y="350" width="16" height="16" className={magentaHover} />
          <rect x="760" y="350" width="16" height="16" className={magentaHover} />
          <rect x="780" y="350" width="16" height="16" className={magentaHover} />
          <rect x="800" y="350" width="16" height="16" className={amethystHover} />
          <rect x="820" y="350" width="16" height="16" className={amethystHover} />
          <rect x="840" y="350" width="16" height="16" className={amethystHover} />
          <rect x="860" y="350" width="16" height="16" className={amethystHover} />
          <rect x="880" y="350" width="16" height="16" className={amethystHover} />
          <rect x="900" y="350" width="16" height="16" className={amethystHover} />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="45" y="384" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            R
          </text>
          <rect x="60" y="370" width="16" height="16" className={forestHover} />
          <rect x="80" y="370" width="16" height="16" className={forestHover} />
          <rect x="100" y="370" width="16" height="16" className={forestHover} />
          <rect x="120" y="370" width="16" height="16" className={forestHover} />
          <rect x="140" y="370" width="16" height="16" className={forestHover} />
          <rect x="160" y="370" width="16" height="16" className={forestHover} />
          <rect x="180" y="370" width="16" height="16" className={forestHover} />
          <rect x="220" y="370" width="16" height="16" className={forestHover} />
          <rect x="240" y="370" width="16" height="16" className={forestHover} />
          <rect x="260" y="370" width="16" height="16" className={forestHover} />
          <rect x="280" y="370" width="16" height="16" className={forestHover} />
          <rect x="300" y="370" width="16" height="16" className={forestHover} />
          <rect x="320" y="370" width="16" height="16" className={forestHover} />
          <rect x="340" y="370" width="16" height="16" className={forestHover} />
          <rect x="360" y="370" width="16" height="16" className={forestHover} />
          <rect x="380" y="370" width="16" height="16" className={forestHover} />
          <rect x="400" y="370" width="16" height="16" className={forestHover} />
          <rect x="420" y="370" width="16" height="16" className={forestHover} />
          <rect x="440" y="370" width="16" height="16" className={forestHover} />
          <rect x="460" y="370" width="16" height="16" className={forestHover} />
          <rect x="480" y="370" width="16" height="16" className={forestHover} />
          <rect x="500" y="370" width="16" height="16" className={forestHover} />
          <rect x="520" y="370" width="16" height="16" className={forestHover} />
          <rect x="540" y="370" width="16" height="16" className={forestHover} />
          <rect x="560" y="370" width="16" height="16" className={forestHover} />
          <rect x="580" y="370" width="16" height="16" className={forestHover} />
          <rect x="600" y="370" width="16" height="16" className={forestHover} />
          <rect x="620" y="370" width="16" height="16" className={forestHover} />
          <rect x="640" y="370" width="16" height="16" className={forestHover} />
          <rect x="660" y="370" width="16" height="16" className={forestHover} />
          <rect x="680" y="370" width="16" height="16" className={forestHover} />
          <rect x="700" y="370" width="16" height="16" className={forestHover} />
          <rect x="720" y="370" width="16" height="16" className={forestHover} />
          <rect x="760" y="370" width="16" height="16" className={forestHover} />
          <rect x="780" y="370" width="16" height="16" className={forestHover} />
          <rect x="800" y="370" width="16" height="16" className={forestHover} />
          <rect x="820" y="370" width="16" height="16" className={forestHover} />
          <rect x="840" y="370" width="16" height="16" className={forestHover} />
          <rect x="860" y="370" width="16" height="16" className={forestHover} />
          <rect x="880" y="370" width="16" height="16" className={forestHover} />
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="45" y="404" width="16" height="16" fontSize="13" className="text-gunmetal dark:text-white font-bold">
            S
          </text>
          <rect x="60" y="390" width="16" height="16" className={forestHover} />
          <rect x="80" y="390" width="16" height="16" className={forestHover} />
          <rect x="100" y="390" width="16" height="16" className={forestHover} />
          <rect x="120" y="390" width="16" height="16" className={forestHover} />
          <rect x="140" y="390" width="16" height="16" className={forestHover} />
          <rect x="160" y="390" width="16" height="16" className={forestHover} />
          <rect x="180" y="390" width="16" height="16" className={forestHover} />
          <rect x="220" y="390" width="16" height="16" className={forestHover} />
          <rect x="240" y="390" width="16" height="16" className={forestHover} />
          <rect x="260" y="390" width="16" height="16" className={forestHover} />
          <rect x="280" y="390" width="16" height="16" className={forestHover} />
          <rect x="300" y="390" width="16" height="16" className={forestHover} />
          <rect x="320" y="390" width="16" height="16" className={forestHover} />
          <rect x="340" y="390" width="16" height="16" className={forestHover} />
          <rect x="360" y="390" width="16" height="16" className={forestHover} />
          <rect x="380" y="390" width="16" height="16" className={forestHover} />
          <rect x="400" y="390" width="16" height="16" className={forestHover} />
          <rect x="420" y="390" width="16" height="16" className={forestHover} />
          <rect x="440" y="390" width="16" height="16" className={forestHover} />
          <rect x="460" y="390" width="16" height="16" className={forestHover} />
          <rect x="480" y="390" width="16" height="16" className={forestHover} />
          <rect x="500" y="390" width="16" height="16" className={forestHover} />
          <rect x="520" y="390" width="16" height="16" className={forestHover} />
          <rect x="540" y="390" width="16" height="16" className={forestHover} />
          <rect x="560" y="390" width="16" height="16" className={forestHover} />
          <rect x="580" y="390" width="16" height="16" className={forestHover} />
          <rect x="600" y="390" width="16" height="16" className={forestHover} />
          <rect x="620" y="390" width="16" height="16" className={forestHover} />
          <rect x="640" y="390" width="16" height="16" className={forestHover} />
          <rect x="660" y="390" width="16" height="16" className={forestHover} />
          <rect x="680" y="390" width="16" height="16" className={forestHover} />
          <rect x="700" y="390" width="16" height="16" className={forestHover} />
          <rect x="720" y="390" width="16" height="16" className={forestHover} />
          <rect x="760" y="390" width="16" height="16" className={forestHover} />
          <rect x="780" y="390" width="16" height="16" className={forestHover} />
          <rect x="800" y="390" width="16" height="16" className={forestHover} />
          <rect x="820" y="390" width="16" height="16" className={forestHover} />
          <rect x="840" y="390" width="16" height="16" className={forestHover} />
          <rect x="860" y="390" width="16" height="16" className={forestHover} />
          <rect x="880" y="390" width="16" height="16" className={forestHover} />
        </g>
      </svg>
    </>
  )
}

export default RiverviewPACFirstFloorSVG
