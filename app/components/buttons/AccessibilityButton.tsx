import { useCallback, useEffect, useState } from 'react'
import { setToggleAccessibilityDrawer } from '@/app/redux/features/accessibilitySlice'
import { useAccessibilitySelector, useAppDispatch } from '@/app/redux/store'
import { Accessibility, CheckCircle } from 'lucide-react'

const AccessibilityButton = () => {
  const dispatch = useAppDispatch()
  const { accessibility, highContrast, highlightLinks, stepIndex, textSpacing, dyslexiaFriendly, lineHeight } =
    useAccessibilitySelector()
  const [showCheckmark, setShowCheckmark] = useState(false)

  // Show checkmark if any accessibility features are enabled
  useEffect(() => {
    const hasFeature = highContrast || highlightLinks || stepIndex > 0 || textSpacing || dyslexiaFriendly || lineHeight
    setShowCheckmark(hasFeature)
  }, [highContrast, highlightLinks, stepIndex, textSpacing, dyslexiaFriendly, lineHeight])

  const handleAccessibilityToggle = useCallback(() => {
    dispatch(setToggleAccessibilityDrawer(accessibility))
  }, [dispatch, accessibility])

  return (
    <div className="fixed bottom-5 left-5 z-[130]">
      <button
        onClick={handleAccessibilityToggle}
        className="relative p-2 bg-indigo-600 text-white rounded-full w-12 h-12 hover:bg-indigo-700 hover:scale-110 transition-all shadow-lg"
        aria-label="Toggle accessibility options"
      >
        <Accessibility className="w-8 h-8" />
        {showCheckmark && <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-lime-500 drop-shadow-lg" />}
      </button>
    </div>
  )
}

export default AccessibilityButton
