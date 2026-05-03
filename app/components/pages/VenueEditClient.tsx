'use client'

import type { Venue } from '@prisma/client'
import VenueForm from '../forms/VenueForm'

export default function VenueEditClient({ venue }: { venue: Venue }) {
  return <VenueForm isEditing venue={venue} />
}
