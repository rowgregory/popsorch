export interface NavigationLinksProps {
  textKey: string
  linkKey?: string
  active?: boolean
  isButton?: boolean
  links?: { linkKey: string; textKey: string; active?: boolean; isExternal?: boolean }[]
}

export const getNavigationLinks = (path: string, thereAreConcerts: boolean): NavigationLinksProps[] => [
  { linkKey: '/', textKey: 'Home', active: path === '/' },
  ...(thereAreConcerts
    ? [
        {
          textKey: 'Concerts',
          linkKey: '/concerts',

          active: path.includes('/concerts')
        }
      ]
    : []),
  {
    isButton: true,
    textKey: 'Camp',
    active: ['/camp', '/camp-application'].includes(path),
    links: [
      {
        textKey: 'Camp Application',
        linkKey: '/camp-application',
        active: path === '/camp-application'
      },
      {
        textKey: 'Camp Info',
        linkKey: '/camp-info',
        active: path === '/camp-info'
      }
    ]
  },
  {
    textKey: 'Venues',
    linkKey: '/venues',
    active: path.includes('/venues')
  },
  {
    isButton: true,
    textKey: 'About',
    active: ['/about', '/robyn-bell', '/board-and-staff'].includes(path),
    links: [
      {
        textKey: 'The Pops Orchestra',
        linkKey: '/about',
        active: path === '/about'
      },
      {
        textKey: 'Robyn Bell',
        linkKey: '/robyn-bell',
        active: path === '/robyn-bell'
      },
      {
        textKey: 'Board & Staff',
        linkKey: '/board-and-staff',
        active: path === '/board-and-staff'
      }
    ]
  },
  {
    isButton: true,
    textKey: 'Support',
    links: [
      {
        linkKey: 'https://ci.ovationtix.com/35505/store/donations',
        textKey: 'Make a Donation',
        active: false,
        isExternal: true
      },
      {
        linkKey: '/chair-sponsorships',
        textKey: 'Chair Sponsorships',
        active: path === '/chair-sponsorships'
      },
      {
        linkKey: '/advertise-with-us',
        textKey: 'Advertise With Us',
        active: path === '/advertise-with-us'
      }
    ]
  },
  { linkKey: '/contact', textKey: 'Contact', active: path === '/contact' },
  {
    isButton: true,
    textKey: '.....',
    links: [
      {
        linkKey: '/coming-soon',
        textKey: 'Coming Soon',
        active: path === '/coming-soon'
      },
      {
        linkKey: '/education',
        textKey: 'Education',
        active: path === '/education'
      },
      {
        linkKey: '/photo-gallery',
        textKey: 'Photo Gallery',
        active: path === '/photo-gallery'
      },
      {
        linkKey: '/newsletter',
        textKey: 'Newsletter',
        active: path === '/newsletter'
      },
      {
        linkKey: '/lunch',
        textKey: 'Lunch Program',
        active: path === '/lunch'
      }
    ]
  }
]

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
