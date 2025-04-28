import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const useScrollToTop = () => {
  const path = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [path])
}

export default useScrollToTop
