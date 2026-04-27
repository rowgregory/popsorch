import { News } from '@prisma/client'

export interface NewsInput {
  title: string
  excerpt?: string
  body?: string
  imageUrl?: string
  imageFilename?: string
  isPublished?: boolean
}

export type TNewsEditorPanel = {
  news: News | null
  isNew: boolean
  onSaved: (n: News) => void
  onCancel: () => void
}
