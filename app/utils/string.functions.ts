export const isStringInPath = (path: string, searchString: string) => {
  return path.includes(searchString)
}

export const shouldShowFooter = (pathname: string) => {
  const validPaths = [
    '/',
    '/concerts',
    '/venues',
    '/about',
    '/robyn-bell',
    '/board-members',
    '/staff',
    '/contact',
    '/education',
    '/chair-sponsorships',
    '/advertise-with-us',
    '/lunch',
    '/connect-with-us',
    '/camp-application',
    '/camp-info',
    '/photo-gallery',
    '/coming-soon',
    '/accessibility',
    '/privacy-policy',
    '/student-performers',
    '/student-scholarships',
    '/media'
  ]

  const validPatterns = [/^\/concerts\/[^\/]+$/]

  const isValidPath = validPaths.some((path) => pathname === path)
  const containsPath = validPatterns.some((pattern: { test: (arg0: string) => any }) => pattern.test(pathname))

  // If the current pathname is invalid (not in the valid paths), exclude header and footer
  return isValidPath || containsPath
}

export const shouldShowHeader = (pathname: string) => {
  const validPaths = [
    '/',
    '/concerts',
    '/venues',
    '/about',
    '/robyn-bell',
    '/board-members',
    '/staff',
    '/contact',
    '/education',
    '/chair-sponsorships',
    '/advertise-with-us',
    '/lunch',
    '/connect-with-us',
    '/camp-application',
    '/camp-info',
    '/photo-gallery',
    '/coming-soon',
    '/accessibility',
    '/privacy-policy',
    '/student-performers',
    '/student-scholarships',
    '/media'
  ]

  const validPatterns = [/^\/concerts\/[^\/]+$/]

  const isValidPath = validPaths.some((path) => pathname === path)
  const containsPath = validPatterns.some((pattern: { test: (arg0: string) => any }) => pattern.test(pathname))

  // If the current pathname is invalid (not in the valid paths), exclude header and footer
  return isValidPath || containsPath
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

export const formatPhoneNumberForMailchimp = (phone: string) => {
  const digitsOnly = phone.replace(/\D/g, '')

  // If it starts with 1 and is 11 digits, strip the 1
  const cleaned = digitsOnly.length === 11 && digitsOnly.startsWith('1') ? digitsOnly.slice(1) : digitsOnly

  // Format only if it's exactly 10 digits now
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }

  return ''
}
