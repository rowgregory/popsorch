import { useEffect, useRef } from 'react'
import { sendGAEvent } from '@next/third-parties/google'

export const useSearchTracking = (searchQuery: string, resultsCount: number, location: string = 'concerts_page') => {
  const timeoutRef = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (searchQuery.length > 0) {
      timeoutRef.current = setTimeout(() => {
        sendGAEvent('event', 'search', {
          search_term: searchQuery,
          results_count: resultsCount,
          search_location: location
        })
      }, 1000)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [searchQuery, resultsCount, location])
}
