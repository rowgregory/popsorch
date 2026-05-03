'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

function AnimatedNumber({ value }: { value: number }) {
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 80, damping: 18 })
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    motionVal.set(value)
  }, [value, motionVal])

  useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toString()
    })
  }, [spring])

  return <span ref={ref}>0</span>
}

export function StatPill({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-2.5 border-r border-border-dark shrink-0 min-w-18 gap-0.5">
      <span className={`font-mono text-sm font-bold tabular-nums ${accent ? 'text-primary-dark' : 'text-text-dark'}`}>
        <AnimatedNumber value={value} />
      </span>
      <span className="text-[7px] font-mono tracking-[0.15em] uppercase text-muted-dark/50 whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}
