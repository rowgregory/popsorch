import { getConcertById } from '@/app/actions/getConcertById'
import ConcertDetailsClient from '@/app/components/pages/ConcertDetailsClient'

interface ConcertDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function ConcertDetailsPage({ params }: ConcertDetailsPageProps) {
  const { id } = await params
  const data = await getConcertById(id)
  return <ConcertDetailsClient data={data} />
}

export async function generateMetadata({ params }: ConcertDetailsPageProps) {
  const { id } = await params
  const concert = await getConcertById(id)

  if (!concert) {
    return {
      title: 'Concert Not Found',
      description: 'The concert you are looking for does not exist.'
    }
  }

  const eventDate = concert.eventDetails?.[0]?.date || concert.cardDate
  const baseUrl = 'https://www.thepopsorchestra.org'
  const concertUrl = `${baseUrl}/concerts/${concert.id}`

  return {
    title: concert.name,
    description: concert.description,
    keywords: ['concert', 'orchestra', 'pops orchestra', concert.name, concert.type].filter(Boolean),
    openGraph: {
      title: concert.name,
      description: concert.pressRelease || concert.description,
      type: 'website',
      url: concertUrl,
      images: [
        {
          url: concert.imageUrl,
          width: 1200,
          height: 630,
          alt: concert.name,
          type: 'image/jpeg'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: concert.name,
      description: concert.pressRelease || concert.description,
      images: [concert.imageUrl]
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    },
    alternates: {
      canonical: concertUrl
    },
    other: {
      'event:name': concert.name,
      'event:date': eventDate,
      'event:type': concert.type,
      'event:availability': concert.isOnSale ? 'In Stock' : 'Out of Stock',
      'event:url': concert.allSeriesExternalLink || concertUrl
    }
  }
}
