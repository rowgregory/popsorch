'use client'

import React, { useEffect, useState } from 'react'
import AwesomeIcon from '@/app/components/common/AwesomeIcon'
import Picture from '@/app/components/common/Picture'
import Spinner from '@/app/components/common/Spinner'
import { shareNodesIcon } from '@/app/lib/icons'
import { useFetchConcertByIdQuery } from '@/app/redux/services/concertApi'
import { formatDate } from '@/app/utils/date.functions'
import { ConcertEventDetailsProps, concertEventDetailsState } from '@/app/redux/features/concertSlice'
import Breadcrumb from '@/app/components/common/Breadcrumb'
import OrchMapLight from '@/app/components/OrchMapLight'
import PublicConcertDetailsEventLocator from '@/app/components/admin/PublicConcertDetailsEventLocator'

const ConcertDetails = ({ concertId }: any) => {
  const { data, isLoading } = useFetchConcertByIdQuery(concertId.id)
  const concert = data?.concert
  const [eventDetails, setEventDetails] = useState<ConcertEventDetailsProps>(concertEventDetailsState)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (concert?.eventDetails && concert?.eventDetails?.length > 0 && !isInitialized) {
      setEventDetails({
        ...concert?.eventDetails[0]
      })
      setIsInitialized(true)
    }
  }, [concert?.eventDetails, isInitialized])

  return (
    <>
      <Breadcrumb breadcrumb={concert?.name} secondCrumb="Concerts" />
      <section className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto  gap-x-8 pt-24 pb-36">
        <div className="flex flex-col mb-12">
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner wAndH="w-10 h-10" fill="fill-blaze" track="text-[#1a1a1a]" />
            </div>
          ) : (
            <>
              <Picture
                src={concert?.imageUrl}
                priority={true}
                className="w-full h-auto aspect-video object-cover bg-black"
              />
              <div className="bg-duskgray p-4 675:p-14">
                <div className="flex items-center justify-between">
                  <h1 className="text-[#b2b2b2] uppercase font-changa text-12">{formatDate(concert?.createdAt)}</h1>
                  <AwesomeIcon icon={shareNodesIcon} className="text-blaze w-4 h-4" />
                </div>
                <div className="h-[1px] bg-zinc-700/90 my-6" />
                <h2 className="text-2xl font-changa mb-3">{concert?.name}</h2>
                <p className="font-lato text-[#b2b2b2]">{concert?.description}</p>
                <div className="h-[1px] bg-zinc-700/90 my-6" />
                <h2 className="text-17 font-changa mb-5">
                  Click the time, date, and venue below to see the location update on the map.
                </h2>
                <div className="w-full flex flex-col 1200:flex-row gap-y-16 990:gap-x-16">
                  {concert?.eventDetails?.map((detail: ConcertEventDetailsProps, i: number) => (
                    <PublicConcertDetailsEventLocator
                      key={i}
                      setEventDetails={setEventDetails}
                      detail={detail}
                      eventDetails={eventDetails}
                      isOnSale={concert?.isOnSale}
                    />
                  ))}
                </div>
                <div className="w-full h-[500px] relative my-4 mt-12">
                  <OrchMapLight
                    latitude={eventDetails?.location?.latitude}
                    longitude={eventDetails?.location?.longitude}
                    address={eventDetails?.location?.address}
                  />
                </div>
                <div className="w-full h-[1px] bg-zinc-700/90 mt-3 mb-5" />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default ConcertDetails
