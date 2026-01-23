export interface ISponsor {
  id: string // @id @default(cuid())
  filePath: string // Path to uploaded file
  name: string
  filename: string // Display name for the sponsor
  externalLink: string // Sponsor website URL
  amount: string
  level: string // Sponsorship tier
  createdAt: Date // @default(now())
  updatedAt: Date // @updatedAt
}
