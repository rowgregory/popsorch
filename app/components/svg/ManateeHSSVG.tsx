const ManateeHSSVG = ({ setManatee }: any) => {
  const onHoverSeat = (e: any) => {
    const target = e.target as SVGElement
    const seat = target.getAttribute('data-seat')
    const price = target.getAttribute('data-price')
    const level = target.getAttribute('data-level')

    setManatee({
      visible: true,
      seat,
      price,
      level
    })
  }

  const onLeaveSeat = () => {
    setManatee({ visible: false, seat: '', price: '', level: '' })
  }

  const amethystHover = 'fill-purple-700 hover:fill-purple-600 duration-200'
  const magentaHover = 'fill-pink-700 hover:fill-pink-600 duration-200'
  const forestHover = 'fill-lime-600 hover:fill-lime-500 duration-200'
  const tealHover = 'fill-blue-600 hover:fill-blue-500 duration-200'

  return (
    <div className="relative w-full">
      {/* Stage Label */}

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1120 500"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current"
      >
        {/* LEFT SECTION */}
        {/* Row A - 6 seats */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="180" y="12" fontSize="13" className="text-white font-bold">
            A
          </text>

          {[
            ...Array.from({ length: 5 }, (_, i) => ({
              x: 200 + i * 20,
              seat: `A${10 - i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={0}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="420" y="12" fontSize="13" className="text-white font-bold">
            A
          </text>
          {[
            ...Array.from({ length: 13 }, (_, i) => ({
              x: 440 + i * 20,
              seat: `A${113 - i}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={0}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="820" y="12" fontSize="13" className="text-white font-bold">
            A
          </text>
          {[
            ...Array.from({ length: 5 }, (_, i) => ({
              x: 840 + i * 20,
              seat: `A${1 - i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={0}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* B */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="120" y="32" fontSize="13" className="text-white font-bold">
            B
          </text>

          {[
            ...Array.from({ length: 8 }, (_, i) => ({
              x: 140 + i * 20,
              seat: `B${16 - i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={20}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="400" y="32" fontSize="13" className="text-white font-bold">
            B
          </text>
          {[
            ...Array.from({ length: 14 }, (_, i) => ({
              x: 420 + i * 20,
              seat: `B${114 - i}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={20}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="820" y="32" fontSize="13" className="text-white font-bold">
            B
          </text>
          {[
            ...Array.from({ length: 8 }, (_, i) => ({
              x: 840 + i * 20,
              seat: `B${1 + i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={20}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* C */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="80" y="52" fontSize="13" className="text-white font-bold">
            C
          </text>

          {[
            ...Array.from({ length: 10 }, (_, i) => ({
              x: 100 + i * 20,
              seat: `C${20 - i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={40}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="400" y="52" fontSize="13" className="text-white font-bold">
            C
          </text>
          {[
            ...Array.from({ length: 15 }, (_, i) => ({
              x: 420 + i * 20,
              seat: `C${115 - i}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={40}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="820" y="52" fontSize="13" className="text-white font-bold">
            C
          </text>
          {[
            ...Array.from({ length: 10 }, (_, i) => ({
              x: 840 + i * 20,
              seat: `C${1 + i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={40}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* D */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="60" y="72" fontSize="13" className="text-white font-bold">
            D
          </text>

          {[
            ...Array.from({ length: 6 }, (_, i) => ({
              x: 80 + i * 20,
              seat: `D${22 - i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={60}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 5 }, (_, i) => ({
              x: 200 + i * 20,
              seat: `D${10 - i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={60}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="400" y="72" fontSize="13" className="text-white font-bold">
            D
          </text>
          {[
            ...Array.from({ length: 16 }, (_, i) => ({
              x: 420 + i * 20,
              seat: `C${116 - i}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={60}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="820" y="72" fontSize="13" className="text-white font-bold">
            D
          </text>
          {[
            ...Array.from({ length: 5 }, (_, i) => ({
              x: 840 + i * 20,
              seat: `D${1 + i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={60}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 6 }, (_, i) => ({
              x: 940 + i * 20,
              seat: `D${11 + i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={60}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* E */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="40" y="92" fontSize="13" className="text-white font-bold">
            E
          </text>

          {[
            ...Array.from({ length: 7 }, (_, i) => ({
              x: 60 + i * 20,
              seat: `E${24 - i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={80}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 5 }, (_, i) => ({
              x: 200 + i * 20,
              seat: `E${10 - i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={80}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="400" y="92" fontSize="13" className="text-white font-bold">
            E
          </text>
          {[
            ...Array.from({ length: 16 }, (_, i) => ({
              x: 420 + i * 20,
              seat: `E${116 - i}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={80}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="820" y="92" fontSize="13" className="text-white font-bold">
            E
          </text>
          {[
            ...Array.from({ length: 5 }, (_, i) => ({
              x: 840 + i * 20,
              seat: `E${1 + i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={80}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 7 }, (_, i) => ({
              x: 940 + i * 20,
              seat: `E${11 + i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={80}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* F */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="112" fontSize="13" className="text-white font-bold">
            F
          </text>

          {[
            ...Array.from({ length: 9 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `F${28 - i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={100}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 5 }, (_, i) => ({
              x: 200 + i * 20,
              seat: `F${10 - i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={100}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="380" y="112" fontSize="13" className="text-white font-bold">
            F
          </text>
          {[
            ...Array.from({ length: 17 }, (_, i) => ({
              x: 400 + i * 20,
              seat: `F${117 - i}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={100}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="820" y="112" fontSize="13" className="text-white font-bold">
            F
          </text>
          {[
            ...Array.from({ length: 6 }, (_, i) => ({
              x: 840 + i * 20,
              seat: `F${1 + i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={100}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 8 }, (_, i) => ({
              x: 960 + i * 20,
              seat: `F${13 + i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={100}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* G */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="132" fontSize="13" className="text-white font-bold">
            G
          </text>

          {[
            ...Array.from({ length: 9 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `G${28 - i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={120}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 5 }, (_, i) => ({
              x: 200 + i * 20,
              seat: `G${10 - i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={120}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="380" y="132" fontSize="13" className="text-white font-bold">
            G
          </text>
          {[
            ...Array.from({ length: 17 }, (_, i) => ({
              x: 400 + i * 20,
              seat: `G${117 - i}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={120}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="820" y="132" fontSize="13" className="text-white font-bold">
            G
          </text>
          {[
            ...Array.from({ length: 6 }, (_, i) => ({
              x: 840 + i * 20,
              seat: `G${1 + i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={120}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 8 }, (_, i) => ({
              x: 960 + i * 20,
              seat: `G${13 + i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={120}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* H */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="152" fontSize="13" className="text-white font-bold">
            H
          </text>

          {[
            ...Array.from({ length: 9 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `H${28 - i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={140}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 5 }, (_, i) => ({
              x: 200 + i * 20,
              seat: `H${10 - i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={140}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="380" y="152" fontSize="13" className="text-white font-bold">
            H
          </text>
          {[
            ...Array.from({ length: 18 }, (_, i) => ({
              x: 400 + i * 20,
              seat: `H${118 - i}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={140}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="820" y="152" fontSize="13" className="text-white font-bold">
            H
          </text>
          {[
            ...Array.from({ length: 6 }, (_, i) => ({
              x: 840 + i * 20,
              seat: `H${1 + i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={140}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 8 }, (_, i) => ({
              x: 960 + i * 20,
              seat: `H${13 + i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={140}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* J */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="172" fontSize="13" className="text-white font-bold">
            J
          </text>

          {[
            ...Array.from({ length: 9 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `J${26 - i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={160}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 4 }, (_, i) => ({
              x: 200 + i * 20,
              seat: `J${8 - i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={160}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="380" y="172" fontSize="13" className="text-white font-bold">
            J
          </text>
          {[
            ...Array.from({ length: 18 }, (_, i) => ({
              x: 400 + i * 20,
              seat: `J${118 - i}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={160}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="840" y="172" fontSize="13" className="text-white font-bold">
            J
          </text>
          {[
            ...Array.from({ length: 5 }, (_, i) => ({
              x: 860 + i * 20,
              seat: `J${1 + i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={160}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 8 }, (_, i) => ({
              x: 960 + i * 20,
              seat: `J${11 + i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={160}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* K */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="192" fontSize="13" className="text-white font-bold">
            K
          </text>

          {[
            ...Array.from({ length: 9 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `K${26 - i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={180}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 4 }, (_, i) => ({
              x: 200 + i * 20,
              seat: `K${8 - i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={180}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="380" y="192" fontSize="13" className="text-white font-bold">
            K
          </text>
          {[
            ...Array.from({ length: 18 }, (_, i) => ({
              x: 400 + i * 20,
              seat: `K${118 - i}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={180}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="840" y="192" fontSize="13" className="text-white font-bold">
            K
          </text>
          {[
            ...Array.from({ length: 5 }, (_, i) => ({
              x: 860 + i * 20,
              seat: `K${1 + i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={180}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 8 }, (_, i) => ({
              x: 960 + i * 20,
              seat: `K${11 + i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={180}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* L */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="212" fontSize="13" className="text-white font-bold">
            L
          </text>

          {[
            ...Array.from({ length: 9 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `L${26 - i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={200}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 4 }, (_, i) => ({
              x: 200 + i * 20,
              seat: `L${8 - i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={200}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="360" y="212" fontSize="13" className="text-white font-bold">
            L
          </text>
          {[
            ...Array.from({ length: 19 }, (_, i) => ({
              x: 380 + i * 20,
              seat: `L${119 - i}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={200}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="840" y="212" fontSize="13" className="text-white font-bold">
            L
          </text>
          {[
            ...Array.from({ length: 5 }, (_, i) => ({
              x: 860 + i * 20,
              seat: `L${1 + i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={200}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 8 }, (_, i) => ({
              x: 960 + i * 20,
              seat: `L${11 + i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={200}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* M */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="232" fontSize="13" className="text-white font-bold">
            M
          </text>

          {[
            ...Array.from({ length: 11 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `M${26 - i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={220}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 2 }, (_, i) => ({
              x: 240 + i * 20,
              seat: `M${4 - i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={220}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="360" y="232" fontSize="13" className="text-white font-bold">
            M
          </text>
          {[
            ...Array.from({ length: 19 }, (_, i) => ({
              x: 380 + i * 20,
              seat: `M${119 - i}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={220}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="840" y="232" fontSize="13" className="text-white font-bold">
            M
          </text>
          {[
            ...Array.from({ length: 2 }, (_, i) => ({
              x: 860 + i * 20,
              seat: `M${1 + i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={220}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 11 }, (_, i) => ({
              x: 900 + i * 20,
              seat: `M${5 + i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={220}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* N */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 2 }, (_, i) => ({
              x: 240 + i * 20,
              seat: `N${4 - i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={240}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="252" fontSize="13" className="text-white font-bold">
            N
          </text>

          {[
            ...Array.from({ length: 11 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `N${26 - i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={240}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="360" y="252" fontSize="13" className="text-white font-bold">
            N
          </text>
          {[
            ...Array.from({ length: 20 }, (_, i) => ({
              x: 380 + i * 20,
              seat: `N${120 - i}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={240}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="840" y="252" fontSize="13" className="text-white font-bold">
            N
          </text>
          {[
            ...Array.from({ length: 2 }, (_, i) => ({
              x: 860 + i * 20,
              seat: `N${1 + i * 2}`,
              level: 'Ultra',
              price: 65
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={240}
              width={16}
              height={16}
              className={magentaHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 11 }, (_, i) => ({
              x: 900 + i * 20,
              seat: `N${5 + i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={240}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* P */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="272" fontSize="13" className="text-white font-bold">
            P
          </text>

          {[
            ...Array.from({ length: 12 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `P${24 - i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={260}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="360" y="272" fontSize="13" className="text-white font-bold">
            P
          </text>
          {[
            ...Array.from({ length: 20 }, (_, i) => ({
              x: 380 + i * 20,
              seat: `P${120 - i}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={260}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="860" y="272" fontSize="13" className="text-white font-bold">
            P
          </text>
          {[
            ...Array.from({ length: 12 }, (_, i) => ({
              x: 880 + i * 20,
              seat: `P${1 + i * 2}`,
              level: 'Premium',
              price: 50
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={260}
              width={16}
              height={16}
              className={amethystHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* Q */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="292" fontSize="13" className="text-white font-bold">
            Q
          </text>

          {[
            ...Array.from({ length: 12 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `Q${24 - i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={280}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="360" y="292" fontSize="13" className="text-white font-bold">
            Q
          </text>
          {[
            ...Array.from({ length: 20 }, (_, i) => ({
              x: 380 + i * 20,
              seat: `Q${120 - i}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={280}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="860" y="292" fontSize="13" className="text-white font-bold">
            Q
          </text>
          {[
            ...Array.from({ length: 12 }, (_, i) => ({
              x: 880 + i * 20,
              seat: `Q${1 + i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={280}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* R */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="312" fontSize="13" className="text-white font-bold">
            R
          </text>

          {[
            ...Array.from({ length: 12 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `R${24 - i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={300}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="340" y="312" fontSize="13" className="text-white font-bold">
            R
          </text>
          {[
            ...Array.from({ length: 21 }, (_, i) => ({
              x: 360 + i * 20,
              seat: `R${121 - i}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={300}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="860" y="312" fontSize="13" className="text-white font-bold">
            R
          </text>
          {[
            ...Array.from({ length: 12 }, (_, i) => ({
              x: 880 + i * 20,
              seat: `R${1 + i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={300}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* S */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="332" fontSize="13" className="text-white font-bold">
            S
          </text>

          {[
            ...Array.from({ length: 12 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `S${24 - i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={320}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="340" y="332" fontSize="13" className="text-white font-bold">
            S
          </text>
          {[
            ...Array.from({ length: 21 }, (_, i) => ({
              x: 360 + i * 20,
              seat: `S${121 - i}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={320}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="860" y="332" fontSize="13" className="text-white font-bold">
            S
          </text>
          {[
            ...Array.from({ length: 12 }, (_, i) => ({
              x: 880 + i * 20,
              seat: `S${1 + i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={320}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* T */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="352" fontSize="13" className="text-white font-bold">
            T
          </text>

          {[
            ...Array.from({ length: 11 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `T${22 - i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={340}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="320" y="352" fontSize="13" className="text-white font-bold">
            T
          </text>
          {[
            ...Array.from({ length: 22 }, (_, i) => ({
              x: 340 + i * 20,
              seat: `T${122 - i}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={340}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="880" y="352" fontSize="13" className="text-white font-bold">
            T
          </text>
          {[
            ...Array.from({ length: 11 }, (_, i) => ({
              x: 900 + i * 20,
              seat: `T${1 + i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={340}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        {/* U */}
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="372" fontSize="13" className="text-white font-bold">
            U
          </text>

          {[
            ...Array.from({ length: 11 }, (_, i) => ({
              x: 20 + i * 20,
              seat: `U${22 - i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={360}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="320" y="372" fontSize="13" className="text-white font-bold">
            U
          </text>
          {[
            ...Array.from({ length: 22 }, (_, i) => ({
              x: 340 + i * 20,
              seat: `U${122 - i}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={360}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="880" y="372" fontSize="13" className="text-white font-bold">
            U
          </text>
          {[
            ...Array.from({ length: 11 }, (_, i) => ({
              x: 900 + i * 20,
              seat: `U${1 + i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={360}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>

        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="0" y="392" fontSize="13" className="text-white font-bold">
            V
          </text>

          {[
            ...Array.from({ length: 4 }, (_, i) => ({
              x: 80 + i * 20,
              seat: `V${16 - i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={380}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 2 }, (_, i) => ({
              x: 160 + i * 20,
              seat: `V${8 - i * 2}`,
              level: 'Wheelchair',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={380}
              width={16}
              height={16}
              className={tealHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          <text x="940" y="392" fontSize="13" className="text-white font-bold">
            V
          </text>

          {[
            ...Array.from({ length: 2 }, (_, i) => ({
              x: 960 + i * 20,
              seat: `V${5 + i * 2}`,
              level: 'Wheelchair',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={380}
              width={16}
              height={16}
              className={tealHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
        <g onMouseEnter={onHoverSeat} onMouseLeave={onLeaveSeat}>
          {[
            ...Array.from({ length: 4 }, (_, i) => ({
              x: 1000 + i * 20,
              seat: `V${9 - i * 2}`,
              level: 'General',
              price: 35
            }))
          ].map(({ x, seat, level, price }, i) => (
            <rect
              key={i}
              x={x}
              y={380}
              width={16}
              height={16}
              className={forestHover}
              data-seat={seat}
              data-level={level}
              data-price={price}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

export default ManateeHSSVG
