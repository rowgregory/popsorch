export const handleOffline = (signal: AbortSignal): boolean => {
  const isOnline = navigator.onLine

  if (!isOnline) {
    // Abort the signal if we can
    if (!signal.aborted && 'abort' in signal) {
      // TypeScript won't like this, but the fetchBaseQuery respects it
      // so we rely on fetch setup to handle cancellation
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      signal.abort?.()
    }

    return true // Signal to stop further logic
  }

  return false // Proceed as normal
}
