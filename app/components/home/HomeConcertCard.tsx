import Link from 'next/link'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'
import Picture from '../common/Picture'
import { ConcertProps } from '@/app/redux/features/concertSlice'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { useRouter } from 'next/navigation'

interface ConcertCardProps {
  concert: ConcertProps
  index: number
}

const HomeConcertCard: FC<ConcertCardProps> = ({ concert, index }) => {
  const { push } = useRouter()

  return (
    <motion.button
      onClick={() => push(`/concerts/${concert.id}`)}
      key={concert.id}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="col-span-12 990:max-h-80 group w-full relative overflow-hidden group cursor-pointer bg-midnightblack duration-700 flex flex-col 990:flex-row items-start h-full rounded-lg"
    >
      <div className="990:max-w-80 990:h-80 w-full overflow-hidden relative">
        <Picture
          src={concert.imageUrl ?? '/images'}
          className="990:w-96 max-h-[440px] 990:max-h-auto w-full h-full object-cover rounded-sm group-hover:scale-125 duration-700"
          priority={false}
        />
        <h3 className="absolute top-3 left-3 bg-blaze py-0.5 px-3 font-changa text-sm uppercase">{concert?.type}</h3>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-y-6 h-full py-7">
        <h4 className="w-full font-bold font-changa text-5xl mb-3 group-hover:text-blaze duration-300">
          {concert.name}
        </h4>
        <div className="flex flex-col items-center justify-center gap-y-2">
          {concert?.eventDetails?.map((eventDetail) => (
            <div key={eventDetail?.id} className="flex items-center justify-center">
              <div className="font-changa uppercase text-sunburst tracking-wider text-sm font-semibold">
                {eventDetail?.dayOfWeek}, {eventDetail?.date} at {eventDetail?.time} in {eventDetail?.city}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col 430:flex-row items-center gap-y-2 430:gap-x-4">
          {concert.isOnSale ? (
            <Link
              href={concert?.allSeriesExternalLink}
              target="_blank"
              className="bg-blaze hover:text-duskgray px-9 duration-700 rounded-sm py-3 font-changa text-12 uppercase w-full whitespace-nowrap flex items-center justify-center font-bold"
              onClick={(e) => e.stopPropagation()}
            >
              Buy Tickets
            </Link>
          ) : (
            <CallBoxOfficeBtn />
          )}
        </div>
      </div>
    </motion.button>
  )
}
export default HomeConcertCard
