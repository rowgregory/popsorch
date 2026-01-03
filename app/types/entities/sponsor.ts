export type SponsorLevel = 'season' | 'concert' | 'guest-artist' | 'principal' | 'associate' | 'sustaining'

export interface ISponsor {
  id: string // @id @default(cuid())
  filePath: string // Path to uploaded file
  name: string
  filename: string // Display name for the sponsor
  externalLink: string // Sponsor website URL
  amount: string
  level: SponsorLevel // Sponsorship tier
  createdAt: Date // @default(now())
  updatedAt: Date // @updatedAt
}
