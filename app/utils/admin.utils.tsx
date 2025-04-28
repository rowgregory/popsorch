import { sectionColors } from '@/public/data/admin.data'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import {
  imageIcon,
  messageIcon,
  musicIcon,
  newspaperIcon,
  starIcon,
  tentIcon,
  theatreMasksIcon,
  usersIcon,
  userTieIcon
} from '../lib/icons'

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
  app: any,
  totalItems: number,
  loading: boolean
): {
  title: string
  count: number
  icon: IconDefinition
  linkKey: string
  color: string
  fill: string
  isLoading: boolean
}[] => [
  {
    title: 'Concerts',
    count: app?.concertsCount,
    icon: musicIcon,
    linkKey: '/admin/concerts',
    color: 'text-pink-400',
    fill: 'fill-pink-400',
    isLoading: app.loading
  },
  {
    title: 'Camp Applications',
    count: app?.campApplicationCount,
    icon: tentIcon,
    linkKey: '/admin/camp-applications',
    color: 'text-blue-400',
    fill: 'fill-blue-400',
    isLoading: app.loading
  },
  {
    title: 'Venues',
    count: app?.venuesCount,
    icon: theatreMasksIcon,
    linkKey: '/admin/venues',
    color: 'text-yellow-400',
    fill: 'fill-yellow-400',
    isLoading: app.loading
  },
  {
    title: 'Board & Staff',
    count: app?.teamMembersCount,
    icon: userTieIcon,
    linkKey: '/admin/board-members-and-staff',
    color: 'text-purple-500',
    fill: 'fill-purple-500',
    isLoading: app.loading
  },
  {
    title: 'Photo Gallery',
    count: app?.photoGalleryImagesCount,
    icon: imageIcon,
    linkKey: '/admin/photo-gallery',
    color: 'text-amber-500',
    fill: 'fill-amber-500',
    isLoading: app.loading
  },
  {
    title: 'Testimonials',
    count: app?.testimonialsCount,
    icon: starIcon,
    linkKey: '/admin/testimonials',
    color: 'text-teal-400',
    fill: 'fill-teal-400',
    isLoading: app.loading
  },
  {
    title: 'Users',
    count: app?.usersCount,
    icon: usersIcon,
    linkKey: '/admin/users',
    color: 'text-emerald-400',
    fill: 'fill-emerald-400',
    isLoading: app.loading
  },
  {
    title: 'Mailchimp Members',
    count: totalItems,
    icon: newspaperIcon,
    linkKey: '/admin/mailchimp-members',
    color: 'text-lime-500',
    fill: 'fill-lime-500',
    isLoading: loading
  },
  {
    title: 'Questions',
    count: app?.questionCount,
    icon: messageIcon,
    linkKey: '/admin/questions',
    color: 'text-sky-500',
    fill: 'fill-sky-500',
    isLoading: app.loading
  }
]
