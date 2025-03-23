export const getNavigationLinks = (path: string) => {
  const navItems = [
    { linkKey: '/', textKey: 'Home', active: path === '/' },
    {
      textKey: 'Concerts',
      active: path.includes('/concerts'),
      links: [
        { linkKey: '/concerts', textKey: 'Full Lineup', active: path === '/concerts' },
        { linkKey: 'https://ci.ovationtix.com/35505', textKey: 'Single Tickets', isExternal: true },
        { linkKey: '/concerts/venues', textKey: 'Venues', active: path === '/concerts/venues' }
      ]
    },
    {
      textKey: 'About',
      active: path.includes('/about'),
      links: [
        { linkKey: '/about', textKey: 'The Pops Orchestra', active: path === '/about' },
        { linkKey: '/about/robyn-bell', textKey: 'Robyn Bell', active: path === '/about/robyn-bell' },
        { linkKey: '/about/board-and-staff', textKey: 'Board & Staff', active: path === '/about/board-and-staff' }
      ]
    },
    { linkKey: '/education', textKey: 'Education', active: path === '/education' },
    {
      textKey: 'Support',
      active: path.includes('/support'),
      links: [
        {
          linkKey: 'https://ci.ovationtix.com/35505/store/donations',
          textKey: 'Make A Donation',
          isExternal: true
        },
        {
          linkKey: '/support/chair-sponsorships',
          textKey: 'Chair Sponsorships',
          active: path === '/support/chair-sponsorships'
        },
        {
          linkKey: '/support/advertise-with-us',
          textKey: 'Advertise With Us',
          active: path === '/support/advertise-with-us'
        }
      ]
    },
    { linkKey: '/contact', textKey: 'Contact', active: path === '/contact' },
    { linkKey: '/lunch', textKey: 'Lunch', active: path === '/lunch' }
  ]

  return navItems
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
