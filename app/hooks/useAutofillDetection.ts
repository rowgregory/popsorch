import { useEffect, useState, useRef } from 'react'

const useAutofillDetection = () => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | any>(null)
  const [isAutofilled, setIsAutofilled] = useState(false)

  useEffect(() => {
    const input = inputRef.current

    const checkAutofill = () => {
      if (input && input.matches(':-webkit-autofill')) {
        setIsAutofilled(true)
      }
    }

    // Repeatedly check for autofill using `requestAnimationFrame` for better timing
    const rafId = requestAnimationFrame(() => {
      checkAutofill()
    })

    // Clean up the animation frame
    return () => cancelAnimationFrame(rafId)
  }, [])

  return { isAutofilled, inputRef }
}

export default useAutofillDetection
