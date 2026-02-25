import { setOpenHeaderButtonStudio } from '@/app/redux/features/appSlice'
import { store } from '@/app/redux/store'
import { isStringInPath } from '@/app/utils/string.functions'
import {
  BriefcaseBusiness,
  Gift,
  Image as PhotoImage,
  LayoutDashboardIcon,
  Music,
  Tent,
  Theater,
  Users,
  Newspaper,
  User,
  Database,
  FileQuestionIcon,
  GitBranch,
  Sliders,
  PanelLeft
} from 'lucide-react'

export const adminNavLinks = (path: string, role: string) => {
  const dashboardGroup = [
    {
      icon: LayoutDashboardIcon,
      label: 'Dashboard',
      path: '/admin/dashboard',
      active: isStringInPath(path, 'dashboard')
    }
  ]

  const contentGroup = [
    {
      icon: PanelLeft,
      label: 'Page Content Editor',
      path: '/admin/page-content-editor?page=home',
      active: isStringInPath(path, 'page-content-editor')
    },
    {
      icon: Sliders,
      label: 'Header Button Studio',
      isDrawer: true,
      onDrawerOpen: () => store.dispatch(setOpenHeaderButtonStudio())
    },
    {
      icon: PhotoImage,
      label: 'Photo Gallery',
      path: '/admin/photo-gallery',
      active: isStringInPath(path, 'photo-gallery')
    }
  ]

  const businessGroup = [
    {
      icon: Music,
      label: 'Concerts',
      path: '/admin/concerts',
      active: isStringInPath(path, 'concerts')
    },
    {
      icon: Gift,
      label: 'Sponsors',
      path: '/admin/sponsors',
      active: isStringInPath(path, 'sponsors')
    },
    {
      icon: Theater,
      label: 'Venues',
      path: '/admin/venues',
      active: isStringInPath(path, 'venues')
    },
    {
      icon: Tent,
      label: 'Camp Applications',
      path: '/admin/camp-applications',
      active: isStringInPath(path, 'camp-applications')
    },
    {
      icon: BriefcaseBusiness,
      label: 'Team',
      path: '/admin/team',
      active: isStringInPath(path, 'team')
    }
  ]

  const communicationGroup = [
    {
      icon: FileQuestionIcon,
      label: 'Contact Submissions',
      path: '/admin/questions',
      active: isStringInPath(path, 'questions')
    },
    {
      icon: Users,
      label: 'Users',
      path: '/admin/users',
      active: isStringInPath(path, 'users')
    },
    {
      icon: Newspaper,
      label: 'Mailchimp Members',
      path: '/admin/mailchimp-members',
      active: isStringInPath(path, 'mailchimp-members')
    }
  ]

  const toolsGroup = [
    {
      icon: GitBranch,
      label: 'Changelog',
      path: '/admin/changelog',
      active: isStringInPath(path, 'changelog')
    },
    {
      icon: User,
      label: 'Profile',
      path: '/admin/profile',
      active: path === '/admin/profile'
    },
    ...(role === 'Super-User'
      ? [
          {
            icon: Database,
            label: 'Logs',
            path: '/admin/logs',
            active: path === '/admin/logs'
          }
        ]
      : [])
  ]

  return [
    {
      title: 'Dashboard',
      items: dashboardGroup
    },
    {
      title: 'Business',
      items: businessGroup
    },
    {
      title: 'Content',
      items: contentGroup
    },
    {
      title: 'Communication',
      items: communicationGroup
    },
    {
      title: 'Tools',
      items: toolsGroup
    }
  ]
}
