import React, { ReactNode, useEffect, useRef, useState } from 'react'
import useRemoveScroll from '@/app/hooks/useRemoveScroll'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
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
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && modalRef.current.contains(e.target as Node)) {
      setMouseDownInside(true) // Mouse down started inside the modal
    } else {
      setMouseDownInside(false) // Mouse down started outside
    }
  }

  // Handle mouse up
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseDownInside && modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose() // Only close if mouse down started outside the modal
    }
  }

  if (!isOpen) return null

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="fixed inset-0 z-[70] flex items-start justify-center bg-white md:bg-[rgb(232,232,237)]/90 dark:bg-blaze md:dark:bg-black/90 md:pt-24 md:pb-16 min-h-dvh"
    >
      <div
        ref={modalRef}
        className={`bg-white dark:bg-midnightblack md:rounded-2xl md:shadow-lg w-full max-h-full overflow-hidden max-w-md`}
      >
        <div className="overflow-y-auto h-full admin-modal p-5">{children}</div>
      </div>
    </div>
  )
}

export default Modal
