export const getNavigationLinks = (path: string) => {
  const navItems = [
    { linkKey: '/', textKey: 'Home' },
    { linkKey: '/concerts', textKey: 'Concerts' },
    { linkKey: '/venues', textKey: 'Venues' },
    { linkKey: '/about', textKey: 'About' },
    { linkKey: '/robyn-bell', textKey: 'Robyn Bell' },
    { linkKey: '/board-of-directors', textKey: 'Board of Directors' },
    { linkKey: '/contact', textKey: 'Contact' },
    { linkKey: '/education', textKey: 'Education' },
    { linkKey: '/chair-sponsorships', textKey: 'Chair Sponsorships' },
    { linkKey: '/advertise-with-us', textKey: 'Advertise With Us' }
  ]

  return navItems.map(({ linkKey, textKey }) => ({
    linkKey,
    textKey,
    active: path === linkKey
  }))
}

export const getFooterLinks = (path: string) => {
  const navItems = [
    { linkKey: 'https://ci.ovationtix.com/35505/store/donations', textKey: 'Donations' },
    { linkKey: '/contact', textKey: 'Contact' },
    { linkKey: '/privacy-policy', textKey: 'Privacy Policy' },
    { linkKey: '/accessibility', textKey: 'Accessibility' }
  ]

  return navItems.map(({ linkKey, textKey }) => ({
    linkKey,
    textKey,
    active: path === linkKey
  }))
}
