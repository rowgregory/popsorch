import { ReactNode } from 'react'

export interface ChildrenProps {
  children: ReactNode
}

export interface ClientPageProps {
  children: ReactNode
  data: any
}

export interface ErrorType {
  data: {
    message: string
  }
}

export interface DrawerProps {
  isOpen: boolean
  children: ReactNode
  height?: string
  bgColor?: string
}
