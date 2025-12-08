import { IConcert } from '@/app/types/entities/concert'

const getConcertsByType = (concerts: IConcert[], type: string): IConcert[] => {
  return concerts.filter((concert) => {
    const concertType = concert.type?.toLowerCase().replace(/\s+/g, '-') || ''

    switch (type) {
      case 'Add-On':
        return concertType === 'Add-On'
      case 'Sundays-at-Neel':
        return concertType === 'Sundays-at-Neel' || concertType === 'Sundays'
      case 'Season':
        return concertType === 'Season'
      default:
        return concertType === type
    }
  })
}

export default getConcertsByType
