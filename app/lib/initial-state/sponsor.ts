import { Sponsor } from '@prisma/client'

export const sponsorData: Sponsor = {
  id: '',
  filename: '',
  filePath: '',
  externalLink: '',
  level: 'MEDIA_SPONSOR',
  isActive: false,
  amount: 250,
  name: '',
  createdAt: new Date(),
  updatedAt: new Date()
}
