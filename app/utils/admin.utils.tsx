import { sectionColors } from '@/public/data/admin.data'
import { LucideIcon } from 'lucide-react'
import { Binoculars, Image, MessageCircle, Music, Newspaper, Star, Theater, Users, UserCheck } from 'lucide-react'

export const highlightSection = (message: string) => {
  for (const { textKey, color } of sectionColors) {
    if (message.includes(textKey)) {
      const parts = message.split(textKey)
      return (
        <>
          {parts[0]}
          <span className={color}>{textKey}</span>
          {parts[1]}
        </>
      )
    }
  }
  return message
}

export const formatAddress = (address: any) => {
  if (!address) return '—'
  const { addr1, addr2, city, state, zip, country } = address
  return [addr1, addr2, city, state, zip, country].filter(Boolean).join(', ')
}

export const dashboardData = (
  app: any
): {
  title: string
  count: number
  count2?: number
  icon: LucideIcon
  linkKey: string
  color: string
  fill: string
  isLoading: boolean
}[] => [
  {
    title: 'Page Views',
    count: app?.metric?.desktopCount,
    count2: app?.metric?.mobileCount,
    icon: Binoculars,
    linkKey: '',
    color: 'text-blaze',
    fill: 'fill-blaze',
    isLoading: app?.loadingDashboardData
  },
  {
    title: 'Concerts',
    count: app?.concertsCount,
    icon: Music,
    linkKey: '/admin/concerts',
    color: 'text-pink-400',
    fill: 'fill-pink-400',
    isLoading: app?.loadingDashboardData
  },
  {
    title: 'Venues',
    count: app?.venuesCount,
    icon: Theater,
    linkKey: '/admin/venues',
    color: 'text-yellow-400',
    fill: 'fill-yellow-400',
    isLoading: app?.loadingDashboardData
  },
  {
    title: 'Board & Staff',
    count: app?.teamMembersCount,
    icon: UserCheck,
    linkKey: '/admin/board-members-and-staff',
    color: 'text-purple-500',
    fill: 'fill-purple-500',
    isLoading: app?.loadingDashboardData
  },
  {
    title: 'Photo Gallery',
    count: app?.photoGalleryImagesCount,
    icon: Image,
    linkKey: '/admin/photo-gallery',
    color: 'text-amber-500',
    fill: 'fill-amber-500',
    isLoading: app?.loadingDashboardData
  },
  {
    title: 'Testimonials',
    count: app?.testimonialsCount,
    icon: Star,
    linkKey: '/admin/testimonials',
    color: 'text-teal-400',
    fill: 'fill-teal-400',
    isLoading: app?.loadingDashboardData
  },
  {
    title: 'Users',
    count: app?.usersCount,
    icon: Users,
    linkKey: '/admin/users',
    color: 'text-emerald-400',
    fill: 'fill-emerald-400',
    isLoading: app?.loadingDashboardData
  },
  {
    title: 'Mailchimp Members',
    count: app?.mailchimpMembersCount,
    icon: Newspaper,
    linkKey: '/admin/mailchimp-members',
    color: 'text-lime-500',
    fill: 'fill-lime-500',
    isLoading: app?.loadingDashboardData
  },
  {
    title: 'Questions',
    count: app?.questionCount,
    icon: MessageCircle,
    linkKey: '/admin/questions',
    color: 'text-sky-500',
    fill: 'fill-sky-500',
    isLoading: app?.loadingDashboardData
  }
]
