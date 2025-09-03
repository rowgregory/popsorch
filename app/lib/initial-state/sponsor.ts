import { ISponsor } from '@/app/types/model.types'

export const initialSponsorData: ISponsor = {
  id: '',
  filename: '',
  filePath: '',
  externalLink: '',
  level: 'sustaining',
  amount: '250',
  name: '',
  createdAt: new Date(),
  updatedAt: new Date()
}
