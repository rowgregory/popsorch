import { sectionColors } from '@/public/data/admin.data'
import { LucideIcon } from 'lucide-react'
import { Image, MessageCircle, Theater, Users } from 'lucide-react'

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
    title: 'Venues',
    count: app?.venuesCount,
    icon: Theater,
    linkKey: '/admin/venues',
    color: 'text-red-400',
    fill: 'fill-red-400',
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
    title: 'Users',
    count: app?.usersCount,
    icon: Users,
    linkKey: '/admin/users',
    color: 'text-emerald-400',
    fill: 'fill-emerald-400',
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
