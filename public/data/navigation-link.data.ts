import { isStringInPath } from '@/app/utils/string.functions'
import {
  BriefcaseBusiness,
  Gift,
  Image as PhotoImage,
  LayoutDashboardIcon,
  LucideIcon,
  Music,
  Tent,
  Theater,
  Users,
  Newspaper,
  User,
  Wand,
  Database,
  FileQuestionIcon,
  GitBranch
} from 'lucide-react'

export const adminNavigationLinkData = (
  path: string,
  role: string
): {
  textKey: string
  linkKey: string
  active?: boolean
  icon: LucideIcon
  color?: string
  description?: string
  isApothecary?: boolean
}[] => {
  const baselinks = [
    {
      id: 'dashboard',
      textKey: 'Dashboard',
      linkKey: '/admin/dashboard',
      active: isStringInPath(path, 'dashboard'),
      icon: LayoutDashboardIcon,
      color: 'text-blaze',
      description: 'Overview and analytics'
    },
    {
      id: 'concerts',
      textKey: 'Concerts',
      linkKey: '/admin/concerts',
      active: isStringInPath(path, 'concerts'),
      icon: Music,
      color: 'text-pink-400',
      description: 'Manage performances'
    },
    {
      id: 'sponsors',
      textKey: 'Sponsors',
      linkKey: '/admin/sponsors',
      active: isStringInPath(path, 'sponsors'),
      icon: Gift,
      color: 'text-fuchsia-400',
      description: 'Partnership management'
    },
    {
      id: 'camp-applications',
      textKey: 'Camp Applications',
      linkKey: '/admin/camp-applications',
      active: isStringInPath(path, 'camp-applications'),
      icon: Tent,
      color: 'text-blue-400',
      description: 'Review submissions'
    },
    {
      id: 'venues',
      textKey: 'Venues',
      linkKey: '/admin/venues',
      active: isStringInPath(path, 'venues'),
      icon: Theater,
      color: 'text-yellow-400',
      description: 'Location management'
    },
    {
      id: 'team',
      textKey: 'Team',
      linkKey: '/admin/team',
      active: isStringInPath(path, 'team'),
      icon: BriefcaseBusiness,
      color: 'text-purple-500',
      description: 'Board Members, Staff & Musicians'
    },
    {
      id: 'photo-gallery',
      textKey: 'Photo Gallery',
      linkKey: '/admin/photo-gallery',
      active: isStringInPath(path, 'photo-gallery'),
      icon: PhotoImage,
      color: 'text-amber-500',
      description: 'Media library'
    },
    {
      id: 'users',
      textKey: 'Users',
      linkKey: '/admin/users',
      active: isStringInPath(path, 'users'),
      icon: Users,
      color: 'text-emerald-400',
      description: 'Account management'
    },
    {
      id: 'mailchimp-members',
      textKey: 'Mailchimp Members',
      linkKey: '/admin/mailchimp-members',
      active: isStringInPath(path, 'mailchimp-members'),
      icon: Newspaper,
      color: 'text-lime-500',
      description: 'Email subscribers'
    },
    {
      id: 'questions',
      textKey: 'Questions',
      linkKey: '/admin/questions',
      active: isStringInPath(path, 'questions'),
      icon: FileQuestionIcon,
      color: 'text-sky-500',
      description: 'Contact form management'
    },
    {
      id: 'profile',
      textKey: 'Profile',
      linkKey: '/admin/profile',
      active: path === '/admin/profile',
      icon: User,
      color: 'text-indigo-500',
      description: 'Personal settings'
    },
    {
      id: 'apothecary',
      textKey: 'Apothecary',
      linkKey: '/admin/apothecary/codex',
      active: isStringInPath(path, 'apothecary'),
      icon: Wand,
      color: 'text-violet-500',
      description: 'Orchestrating events with magic',
      isApothecary: true
    },
    {
      id: 'changelog',
      textKey: 'Changelog',
      linkKey: '/admin/changelog',
      active: isStringInPath(path, 'changelog'),
      icon: GitBranch,
      color: 'text-violet-500',
      description: 'Version tracking'
    }
  ]

  const superUserLinks = [
    {
      id: 'logs',
      textKey: 'Logs',
      linkKey: '/admin/logs',
      active: path === '/admin/logs',
      icon: Database,
      color: 'text-fuchsia-500'
    }
  ]

  const finalLinks = [...baselinks, ...(role === 'Super-User' ? superUserLinks : [])]

  return finalLinks
}
