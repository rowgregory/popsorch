const getCurrentPageId = (path: string, links: any) => {
  const pathSegments = path.split('/').filter(Boolean)
  const lastSegment = pathSegments[pathSegments.length - 1]

  // Handle special cases for multi-word routes
  if (path.includes('/camp-applications')) return 'Camp Applications'
  if (path.includes('/photo-gallery')) return 'Photo Gallery'
  if (path.includes('/mailchimp-members')) return 'Mailchimp Members'
  if (path.includes('/system-status')) return 'System Status'

  // Find matching navigation item
  const matchingItem = links.find((item: any) => item.linkKey === path || item.id === lastSegment)

  return matchingItem?.id || 'dashboard'
}

export default getCurrentPageId
