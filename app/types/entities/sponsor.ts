export interface ISponsor {
  id: string
  name: string
  filePath: string
  filename: string
  externalLink: string
  level: string
  amount: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateSponsorInput {
  name: string
  filePath: string
  filename: string
  externalLink?: string
  level?: string
  amount?: number
  isActive?: boolean
}

export type UpdateSponsorInput = Partial<CreateSponsorInput>
