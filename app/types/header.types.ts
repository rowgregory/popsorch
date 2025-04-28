import { JSX } from 'react'
import { NavigationLinksProps } from '../utils/navigation.utils'

export interface ContactInfoBlockProps {
  titleKey: string
  textKey: string
  icon: JSX.Element
  className?: string
  onClick?: () => void
}

export interface NavLinkWithDotProps {
  link: {
    linkKey: string
    textKey: string
    active: boolean
  }
  i: number
  dotIndex?: number
}

export interface HeaderNavLinkProps {
  link: NavigationLinksProps
  openDropdown?: { open: boolean; textKey: string }
  setOpenDropdown: (args: { open: boolean; textKey: string }) => void
  linkClassname?: string
  isFixed?: boolean
}
