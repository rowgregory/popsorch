import { ISponsor } from '@/app/types/model.types'

export const initialSponsorData: ISponsor = {
  id: '',
  filename: '',
  filePath: '',
  externalLink: '',
  level: 'platinum',
  color: '#3B82F6', // Default blue color
  description: '',
  clicks: 0,
  createdAt: new Date(),
  updatedAt: new Date()
}
