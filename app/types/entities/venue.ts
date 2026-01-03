export interface IVenue {
  id: string
  name: string
  capacity?: string
  accessibility?: string
  immersiveEnvironment?: string
  parking: string
  imageUrl?: string
  imageFilename?: string
  address?: string
  latitude?: string
  longitude?: string
  createdAt: Date
  updatedAt: Date
}

// For create operations
export interface CreateVenueInput {
  name: string
  capacity?: string
  accessibility?: string
  immersiveEnvironment?: string
  parking: string
  imageUrl?: string
  imageFilename?: string
  address?: string
  latitude?: string
  longitude?: string
}

// For update operations
export interface UpdateVenueInput {
  name: string
  capacity?: string
  accessibility?: string
  immersiveEnvironment?: string
  parking: string
  imageUrl?: string
  imageFilename?: string
  address?: string
  latitude?: string
  longitude?: string
}
