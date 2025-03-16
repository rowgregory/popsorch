import { isStringInPath } from '@/app/utils/string.functions'

export const adminNavigationLinkData = (path: string, role: string | null) => {
  const links = [
    {
      textKey: 'Dashboard',
      linkKey: '/admin/dashboard',
      active: isStringInPath(path, 'dashboard')
    },
    {
      textKey: 'Lunch',
      linkKey: '/admin/lunch',
      active: isStringInPath(path, 'lunch')
    },
    {
      textKey: 'Profile',
      linkKey: '/admin/profile',
      active: path === '/admin/profile'
    }
  ]

  if (role === 'super-user') {
    links.push(
      {
        textKey: 'System Status',
        linkKey: '/admin/system-status',
        active: path === '/admin/system-status'
      },
      {
        textKey: 'Logs',
        linkKey: '/admin/logs',
        active: path === '/admin/logs'
      }
    )
  }

  return links
}
