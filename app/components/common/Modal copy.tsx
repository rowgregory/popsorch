import useRemoveScroll from '@/app/hooks/useRemoveScroll'
import React, { useEffect, useRef, useState } from 'react'
import AwesomeIcon from './AwesomeIcon'
import { timesIcon } from '@/app/lib/icons'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  useRemoveScroll(isOpen)

  useEffect(() => {
    const modalElement = modalRef.current

    if (isOpen) {
      if (modalElement) {
        modalElement.style.transition = 'none' // Ensure no transition is applied initially
        modalElement.style.opacity = '0'
        modalElement.style.transform = 'translateY(50px)'

        // Trigger animation after modal is rendered
        requestAnimationFrame(() => {
          modalElement.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out'
          modalElement.style.opacity = '1'
          modalElement.style.transform = 'translateY(0)'
        })
      }
    }
  }, [isOpen])

  const [mouseDownInside, setMouseDownInside] = useState(false)

  // Handle mouse down
  const handleMouseDown = (e: any) => {
    if (modalRef.current && modalRef.current.contains(e.target)) {
      setMouseDownInside(true) // Mouse down started inside the modal
    } else {
      setMouseDownInside(false) // Mouse down started outside
    }
  }

  // Handle mouse up
  const handleMouseUp = (e: any) => {
    if (!mouseDownInside && modalRef.current && !modalRef.current.contains(e.target)) {
      onClose() // Only close if mouse down started outside the modal
    }
  }

  if (!isOpen) return null

  return (
    <div
      onMouseDown={handleMouseDown} // Track where mouse down starts
      onMouseUp={handleMouseUp}
      className="fixed inset-0 z-[70] flex items-start justify-center bg-white md:bg-[rgb(232,232,237)]/90 dark:bg-duskypalm md:dark:bg-duskypalm/50 md:pt-24 md:pb-16"
    >
      <div
        ref={modalRef}
        className={`bg-white dark:bg-abyssaldepth md:rounded-2xl md:shadow-lg w-full max-w-2xl max-h-full overflow-hidden`}
      >
        <AwesomeIcon
          onClick={onClose}
          icon={timesIcon}
          className="absolute z-20 right-3 top-3 cursor-pointer duration-300 hover:text-aquablue hover:rotate-90"
        />

        <div className="overflow-y-auto h-full admin-testimonial-modal pt-5">{children}</div>
      </div>
    </div>
  )
}

export default Modal
