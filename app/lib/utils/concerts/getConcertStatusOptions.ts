import { IConcert } from '@/app/types/entities/concert'

export const getConcertStatusOptions = (concerts: IConcert[]) => [
  { value: 'all', label: 'All Status', count: concerts?.length },
  { value: 'Season', label: 'Season', count: concerts?.filter((f) => f.type === 'Season').length },
  { value: 'Add-On', label: 'Add On', count: concerts?.filter((f) => f.type === 'Add-On').length },
  {
    value: 'Sundays-at-Neel',
    label: 'Sundays@Neel',
    count: concerts?.filter((f) => f.type === 'Sundays-at-Neel').length
  }
]
