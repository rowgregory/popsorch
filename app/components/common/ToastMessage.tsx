import { useAppDispatch } from '@/app/redux/store'
import React, { FC, useEffect, useState } from 'react'
import AwesomeIcon from './AwesomeIcon'
import { triangleExclamationIcon } from '@/app/lib/icons'

interface ToastMessageProps {
  message: string
  type?: 'success' | 'warning'
  resetError: any
}

const ToastMessage: FC<ToastMessageProps> = ({ message, type, resetError }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (message) {
      setVisible(true)

      const timer = setTimeout(() => {
        setVisible(false)
      }, 4000)

      const timer2 = setTimeout(() => {
        dispatch(resetError())
      }, 4300)

      return () => {
        clearTimeout(timer)
        clearTimeout(timer2)
      }
    }
  }, [message, resetError, dispatch])

  const getColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-lime-500'
      case 'warning':
        return 'text-blaze'
      default:
        return 'text-white'
    }
  }

  return (
    <div
      className={`${
        type === 'warning' ? 'border-l-blaze' : 'border-l-transparent'
      } border-l-2 fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-80 px-8 py-4 rounded-sm bg-inkblack font-lato transition-transform duration-500 ease-in-out text-center flex items-center justify-center gap-x-3 ${
        visible ? 'translate-y-0' : '-translate-y-16'
      } ${getColor(type ?? 'warning')}`}
    >
      <AwesomeIcon
        icon={triangleExclamationIcon}
        className={`${message ? 'opacity-100' : 'opacity-0'} duration-300 w-4 h-5 text-blaze`}
      />
      {message}
    </div>
  )
}

export default ToastMessage
