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

export interface IWrapper {
  children: ReactNode
  textBlocks: any
  headerButton: any
  concerts: any
}

export interface PageField {
  id: string // Unique identifier
  section: string // Which section it belongs to (for grouping)
  label: string // Display name
  value: string | string[] // The actual content
  type: 'text' | 'textarea' | 'url' | 'array'
}
