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
    textKey: 'Education',
    active: ['/student-performers', '/student-scholarships', '/camp-application'].includes(path),
    links: [
      {
        textKey: 'Student Performers',
        linkKey: '/student-performers',
        active: path === '/student-performers'
      },
      {
        textKey: 'Student Scholarships',
        linkKey: '/student-scholarships',
        active: path === '/student-scholarships'
      },
      {
        textKey: 'Summer Camp',
        linkKey: '/camp-application',
        active: path === '/camp-application'
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
    active: ['/about', '/robyn-bell', '/board-members', '/staff'].includes(path),
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
        textKey: 'Board members',
        linkKey: '/board-members',
        active: path === '/board-members'
      },
      {
        textKey: 'Staff',
        linkKey: '/staff',
        active: path === '/staff'
      }
    ]
  },
  {
    isButton: true,
    textKey: 'Support',
    active: ['/chair-sponsorships', '/advertise-with-us'].includes(path),
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
    linkKey: '/connect-with-us',
    textKey: 'Connect With Us',
    active: path === '/connect-with-us'
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
