import {
  dashboardIcon,
  databaseIcon,
  giftIcon,
  imageIcon,
  musicIcon,
  newspaperIcon,
  questionIcon,
  serverIcon,
  tentIcon,
  theatreMasksIcon,
  userIcon,
  usersIcon,
  userTieIcon
} from '@/app/lib/icons'
import { isStringInPath } from '@/app/utils/string.functions'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export const adminNavigationLinkData = (
  path: string,
  role: string
): {
  textKey: string
  linkKey: string
  active?: boolean
  icon: IconDefinition
  color?: string
  description?: string
}[] => {
  const baselinks = [
    {
      id: 'dashboard',
      textKey: 'Dashboard',
      linkKey: '/admin/dashboard',
      active: isStringInPath(path, 'dashboard'),
      icon: dashboardIcon,
      color: 'text-blaze',
      description: 'Overview and analytics'
    },
    {
      id: 'concerts',
      textKey: 'Concerts',
      linkKey: '/admin/concerts',
      active: isStringInPath(path, 'concerts'),
      icon: musicIcon,
      color: 'text-pink-400',
      description: 'Manage performances'
    },
    {
      id: 'sponsors',
      textKey: 'Sponsors',
      linkKey: '/admin/sponsors',
      active: isStringInPath(path, 'sponsors'),
      icon: giftIcon,
      color: 'text-fuchsia-400',
      description: 'Partnership management'
    },
    {
      id: 'camp-applications',
      textKey: 'Camp Applications',
      linkKey: '/admin/camp-applications',
      active: isStringInPath(path, 'camp-applications'),
      icon: tentIcon,
      color: 'text-blue-400',
      description: 'Review submissions'
    },
    {
      id: 'venues',
      textKey: 'Venues',
      linkKey: '/admin/venues',
      active: isStringInPath(path, 'venues'),
      icon: theatreMasksIcon,
      color: 'text-yellow-400',
      description: 'Location management'
    },
    {
      id: 'board-members-and-staff',
      textKey: 'Board Members & Staff',
      linkKey: '/admin/board-members-and-staff',
      active: isStringInPath(path, 'board-members-and-staff'),
      icon: userTieIcon,
      color: 'text-purple-500',
      description: 'Team directory'
    },
    {
      id: 'photo-gallery',
      textKey: 'Photo Gallery',
      linkKey: '/admin/photo-gallery',
      active: isStringInPath(path, 'photo-gallery'),
      icon: imageIcon,
      color: 'text-amber-500',
      description: 'Media library'
    },
    {
      id: 'users',
      textKey: 'Users',
      linkKey: '/admin/users',
      active: isStringInPath(path, 'users'),
      icon: usersIcon,
      color: 'text-emerald-400',
      description: 'Account management'
    },
    {
      id: 'mailchimp-members',
      textKey: 'Mailchimp Members',
      linkKey: '/admin/mailchimp-members',
      active: isStringInPath(path, 'mailchimp-members'),
      icon: newspaperIcon,
      color: 'text-lime-500',
      description: 'Email subscribers'
    },
    {
      id: 'questions',
      textKey: 'Questions',
      linkKey: '/admin/questions',
      active: isStringInPath(path, 'questions'),
      icon: questionIcon,
      color: 'text-sky-500',
      description: 'FAQ management'
    },
    {
      id: 'profile',
      textKey: 'Profile',
      linkKey: '/admin/profile',
      active: path === '/admin/profile',
      icon: userIcon,
      color: 'text-indigo-500',
      description: 'Personal settings'
    }
  ]

  const superUserLinks = [
    {
      id: 'system-tatus',
      textKey: 'System Status',
      linkKey: '/admin/system-status',
      active: path === '/admin/system-status',
      icon: serverIcon,
      color: 'text-violet-500'
    },
    {
      id: 'logs',
      textKey: 'Logs',
      linkKey: '/admin/logs',
      active: path === '/admin/logs',
      icon: databaseIcon,
      color: 'text-fuchsia-500'
    }
  ]

  const finalLinks = [...baselinks, ...(role === 'Super-User' ? superUserLinks : [])]

  return finalLinks
}
