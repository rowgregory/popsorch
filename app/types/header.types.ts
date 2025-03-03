import { JSX } from 'react'

interface ContactInfoBlockProps {
  titleKey: string
  textKey: string
  icon: JSX.Element
  className?: string
  onClick?: () => void
}

interface NavLinkWithDotProps {
  link: {
    linkKey: string
    textKey: string
    active: boolean
  }
  i: number
  dotIndex?: number
}

export type { ContactInfoBlockProps, NavLinkWithDotProps }
