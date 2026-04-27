'use client'

import type { Venue } from '@prisma/client'
import ConcertForm from '../forms/ConcertForm'

export default function ConcertCreateClient({ venues }: { venues: Venue[] }) {
  return <ConcertForm venues={venues} />
}
