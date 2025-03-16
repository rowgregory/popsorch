export const isStringInPath = (path: string, searchString: string) => {
  return path.includes(searchString)
}

export const shouldShowFooter = (pathname: string) => {
  const validPaths = [
    '/',
    '/concerts',
    '/lunch',
    '/venues',
    '/about',
    '/robyn-bell',
    '/board-of-directors',
    '/contact',
    '/education',
    '/chair-sponsorships',
    '/advertise-with-us'
  ]

  const isValidPath = validPaths.some((path) => pathname === path)

  // If the current pathname is invalid (not in the valid paths), exclude header and footer
  return isValidPath
}

export const shouldShowHeader = (pathname: string) => {
  const validPaths = [
    '/concerts',
    '/lunch',
    '/venues',
    '/about',
    '/robyn-bell',
    '/board-of-directors',
    '/contact',
    '/education',
    '/chair-sponsorships',
    '/advertise-with-us'
  ]

  const isValidPath = validPaths.some((path) => pathname === path)

  // If the current pathname is invalid (not in the valid paths), exclude header and footer
  return isValidPath
}

export const formatPhoneNumber = (phone: string) => {
  if (!phone) return
  // Remove all non-numeric characters
  const digits = phone?.replace(/\D/g, '')

  // Format the phone number
  const formatted = `(${digits?.slice(0, 3)}) ${digits?.slice(3, 6)} ${digits?.slice(6)}`
  return formatted
}

export const truncatedServiceDescription = (description: string, sliceAmount?: number) => {
  const words = description?.split(' ')
  const isTruncated = words?.length > 10
  const displayedText = words?.slice?.(0, sliceAmount || 20)?.join?.(' ') + (isTruncated ? '...' : '')
  return displayedText
}

export function truncateString(str: string, slice: number) {
  if (str.length > slice) {
    return str.slice(0, slice) + '...'
  }
  return str
}
