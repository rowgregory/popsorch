import { useState, useEffect } from 'react'

function useCountdown(expiresAt: Date | string) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    // Ensure expiresAt is a valid Date object
    const expiryDate = new Date(expiresAt)

    const interval = setInterval(() => {
      const currentTime = new Date().getTime()
      const distance = expiryDate.getTime() - currentTime

      if (distance <= 0) {
        clearInterval(interval)
        setIsActive(false)
        setTimeRemaining(0)
      } else {
        setTimeRemaining(distance)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [expiresAt])

  const formatValue = (value: number) => (value < 10 ? `0${value}` : value)

  const days = formatValue(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)))
  const hours = formatValue(Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
  const minutes = formatValue(Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)))
  const seconds = formatValue(Math.floor((timeRemaining % (1000 * 60)) / 1000))

  const timerData = [
    { textKey: 'Days', value: days },
    { textKey: 'Hours', value: hours },
    { textKey: 'Minutes', value: minutes },
    { textKey: 'Seconds', value: seconds }
  ]

  return { days, hours, minutes, seconds, isActive, setIsActive, timeRemaining, timerData }
}

export default useCountdown
