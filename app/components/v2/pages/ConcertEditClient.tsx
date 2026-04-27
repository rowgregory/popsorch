'use client'

import type { Venue } from '@prisma/client'
import ConcertForm from '../forms/ConcertForm'
import { ConcertWithShows } from '@/app/types/entities/concert'

export default function ConcertEditClient({ concert, venues }: { concert: ConcertWithShows; venues: Venue[] }) {
  return <ConcertForm isEditing concert={concert} venues={venues} />
}
