import {
  dashboardIcon,
  databaseIcon,
  imageIcon,
  musicIcon,
  newspaperIcon,
  questionIcon,
  serverIcon,
  signOutAltIcon,
  starIcon,
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
): { textKey: string; linkKey: string; active?: boolean; icon: IconDefinition; color?: string }[] => {
  const baselinks = [
    {
      textKey: 'Dashboard',
      linkKey: '/admin/dashboard',
      active: isStringInPath(path, 'dashboard'),
      icon: dashboardIcon,
      color: 'text-blaze'
    },
    {
      textKey: 'Concerts',
      linkKey: '/admin/concerts',
      active: isStringInPath(path, 'concerts'),
      icon: musicIcon,
      color: 'text-pink-400'
    },
    {
      textKey: 'Camp Applications',
      linkKey: '/admin/camp-applications',
      active: isStringInPath(path, 'camp-applications'),
      icon: tentIcon,
      color: 'text-blue-400'
    },
    {
      textKey: 'Venues',
      linkKey: '/admin/venues',
      active: isStringInPath(path, 'venues'),
      icon: theatreMasksIcon,
      color: 'text-yellow-400'
    },
    {
      textKey: 'Board Members & Staff',
      linkKey: '/admin/board-members-and-staff',
      active: isStringInPath(path, 'board-members-and-staff'),
      icon: userTieIcon,
      color: 'text-purple-500'
    },
    {
      textKey: 'Photo Gallery',
      linkKey: '/admin/photo-gallery',
      active: isStringInPath(path, 'photo-gallery'),
      icon: imageIcon,
      color: 'text-amber-500'
    },
    {
      textKey: 'Testimonials',
      linkKey: '/admin/testimonials',
      active: isStringInPath(path, 'testimonials'),
      icon: starIcon,
      color: 'text-teal-400'
    },
    {
      textKey: 'Users',
      linkKey: '/admin/users',
      active: isStringInPath(path, 'users'),
      icon: usersIcon,
      color: 'text-emerald-400'
    },
    {
      textKey: 'Mailchimp Members',
      linkKey: '/admin/mailchimp-members',
      active: isStringInPath(path, 'mailchimp-members'),
      icon: newspaperIcon,
      color: 'text-lime-500'
    },
    {
      textKey: 'Questions',
      linkKey: '/admin/questions',
      active: isStringInPath(path, 'questions'),
      icon: questionIcon,
      color: 'text-sky-500'
    },
    {
      textKey: 'Profile',
      linkKey: '/admin/profile',
      active: path === '/admin/profile',
      icon: userIcon,
      color: 'text-indigo-500'
    }
  ]

  const superUserLinks = [
    {
      textKey: 'System Status',
      linkKey: '/admin/system-status',
      active: path === '/admin/system-status',
      icon: serverIcon,
      color: 'text-violet-500'
    },
    {
      textKey: 'Logs',
      linkKey: '/admin/logs',
      active: path === '/admin/logs',
      icon: databaseIcon,
      color: 'text-fuchsia-500'
    }
  ]

  const logoutLink = {
    textKey: 'Logout',
    linkKey: '/auth/login',
    icon: signOutAltIcon,
    active: false
  }

  const finalLinks = [...baselinks, ...(role === 'super-user' ? superUserLinks : []), logoutLink]

  return finalLinks
}
