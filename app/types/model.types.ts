export type VenueProps = {
  id: string
  name: string
  capacity: string
  accessibility: string
  immersiveEnvironment: string
  parking: string
  imageUrl: string
  imageFilename: string
  address: string
  longitude: string
  latitude: string
  createdAt: Date
  updatedAt: Date
}

export type SponsorLevel = 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner' | 'community'

export interface ISponsor {
  id: string // @id @default(cuid())
  filePath: string // Path to uploaded file
  filename: string // Display name for the sponsor
  externalLink: string // Sponsor website URL
  level: SponsorLevel // Sponsorship tier
  color: string // Brand color (hex format)
  description: string // Sponsor description
  clicks: number // Click tracking count
  createdAt: Date // @default(now())
  updatedAt: Date // @updatedAt
}
