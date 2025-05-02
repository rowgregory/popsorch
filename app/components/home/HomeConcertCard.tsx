import Link from 'next/link'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'
import Picture from '../common/Picture'
import { ConcertProps } from '@/app/redux/features/concertSlice'
import AwesomeIcon from '../common/AwesomeIcon'
import { calendarIcon } from '@/app/lib/icons'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ConcertCard = ({ concert, index }: { concert: ConcertProps; index: number }) => {
  const ref = useRef(null) as any
  const inView = useInView(ref)

  return (
    <motion.div
      key={concert.id}
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 100 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="col-span-12 760:col-span-6 1160:col-span-4 group w-full relative overflow-hidden group"
    >
      <Picture
        src={concert.imageUrl ?? '/images'}
        className="w-full h-full aspect-[10/12] object-cover rounded-sm group-hover:scale-125 duration-700"
        priority={false}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-[55%] to-black/70 to-[100%] duration-700 flex flex-col items-start p-5 w-full h-full rounded-sm">
        <h3 className="bg-blaze py-0.5 px-3 font-changa text-sm uppercase">{concert?.type}</h3>
        <h4 className="w-full font-changa text-xl bottom-12 absolute left-5 leading-7 duration-700 cursor-pointer -translate-y-28 430:-translate-y-16 760:translate-y-0 760:group-hover:-translate-y-16">
          {concert.name}
        </h4>
        <h4 className="w-full font-lato text-sm text-zinc-300 bottom-5 absolute left-5 leading-7 duration-700 cursor-pointer -translate-y-28 430:-translate-y-16 760:translate-y-0 760:group-hover:-translate-y-16">
          <AwesomeIcon icon={calendarIcon} className="text-blaze w-4 h-4" /> Starting {concert.eventDetails[0].date}
        </h4>
        <div className="absolute left-5 bottom-5 translate-y-0 opacity-100 760:translate-y-16 760:group-hover:translate-y-0 760:opacity-0 760:group-hover:opacity-100 duration-700">
          <div className="flex flex-col 430:flex-row items-center gap-y-2 430:gap-x-4">
            {concert.isOnSale ? (
              <Link
                href={concert?.allSeriesExternalLink}
                className="bg-blaze hover:text-duskgray px-9 duration-700 rounded-sm py-3 font-changa text-12 uppercase w-full whitespace-nowrap flex items-center justify-center font-bold"
              >
                Buy Tickets
              </Link>
            ) : (
              <CallBoxOfficeBtn />
            )}
            <Link
              href={`/concerts/${concert.id}`}
              className="bg-white text-blaze px-4 hover:text-duskgray w-full duration-700 rounded-sm py-4 font-changa text-12 uppercase flex items-center justify-center font-bold whitespace-nowrap text-center"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
export default ConcertCard
