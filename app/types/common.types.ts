import { JsonValue } from '@prisma/client/runtime/library'
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
  onClose?: any
  label?: string
}

export interface PageField {
  id: string // Unique identifier
  section: string // Which section it belongs to (for grouping)
  label: string // Display name
  value: string | string[] // The actual content
  type: 'text' | 'textarea' | 'url' | 'array'
}

export type ContentItem = {
  id: string
  type: string
  label: string
  value: string
  section: string
}

export type FooterData = {
  id: string
  createdAt: Date
  updatedAt: Date
  slug: string
  createdBy: string | null
  content: JsonValue
}
