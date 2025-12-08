'use server'

import { notFound } from 'next/navigation'
import prisma from '@/prisma/client'
import ConcertDetailsClient from './ConcertDetailsClient'
import Breadcrumb from '@/app/components/common/Breadcrumb'
import Picture from '@/app/components/common/Picture'
import ShareButton from '@/app/components/concerts/ShareButton'
import { IConcertEventDetails } from '@/app/types/entities/concert'

async function getConcert(id: string) {
  const concert = await prisma.concert.findUnique({
    where: { id }
  })

  if (!concert) return null

  // Type guard and parse JSON eventDetails
  let eventDetails: IConcertEventDetails[] = []

  if (Array.isArray(concert.eventDetails)) {
    eventDetails = concert.eventDetails as unknown as IConcertEventDetails[]
  }

  return {
    ...concert,
    eventDetails
  }
}
interface ConcertDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function ConcertDetailsPage({ params }: ConcertDetailsPageProps) {
  const { id } = await params
  const concert = await getConcert(id)

  if (!concert) {
    notFound()
  }

  const initialEventDetails = concert.eventDetails[0] || null

  return (
    <>
      <Breadcrumb breadcrumb={concert.name} secondCrumb="Concerts" />
      {/* Hero Section - Split Layout */}
      <section className="relative w-full bg-gradient-to-br from-neutral-900 via-black to-neutral-900">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 sm:p-8 md:p-12 lg:p-16">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {concert.isOnSale && (
                <span className="px-4 py-1.5 bg-green-500 text-white text-xs font-semibold uppercase tracking-wider rounded-full animate-pulse">
                  Tickets Available
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {concert.name}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-neutral-300 leading-relaxed">{concert.description}</p>

            {/* CTA Buttons */}
            {concert.isOnSale && (
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <ShareButton concertId={concert.id} />
              </div>
            )}
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
              <Picture
                src={concert.imageUrl}
                width={800}
                height={600}
                priority={true}
                className="w-full h-auto"
                alt={concert.name}
              />
              {/* Subtle gradient overlay on image only */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-gradient-to-b from-neutral-900 to-black py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Event Details Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Event Details</h2>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                Select a date below to view venue details and get directions
              </p>
            </div>

            <ConcertDetailsClient concert={concert} initialEventDetails={initialEventDetails} />
          </div>
        </div>
      </section>
    </>
  )
}

export async function generateMetadata({ params }: ConcertDetailsPageProps) {
  const { id } = await params
  const concert = await getConcert(id)

  if (!concert) {
    return {
      title: 'Concert Not Found'
    }
  }

  return {
    title: concert.name,
    description: concert.description
  }
}
