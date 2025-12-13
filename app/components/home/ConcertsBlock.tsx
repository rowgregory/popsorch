import { RootState, useAppSelector } from '@/app/redux/store'
import TitleWithLine from '../common/TitleWithLine'
import HomeConcertCard from './HomeConcertCard'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { IConcert } from '@/app/types/entities/concert'

const ConcertsBlock = () => {
  const { concerts } = useAppSelector((state: RootState) => state.concert)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  return (
    <div className="px-4 pt-12 pb-40">
      <div className=" mx-auto w-full flex flex-col items-center">
        <TitleWithLine
          title={textBlockMap?.HOME_CONCERT_DATES_BLOCK?.homeConcertDatesBlockTitle}
          type="HOME_CONCERT_DATES_BLOCK"
          textBlockKey="homeConcertDatesBlockTitle"
        />

        <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 relative w-full mt-20 mb-10 h-full">
          <div className="flex flex-col gap-y-8 transition-transform duration-300 ease-in-out">
            {concerts
              ?.map((concert: IConcert, i) => <HomeConcertCard concert={concert} key={concert.id} index={i} />)
              .filter((_: any, i: number) => i < 3)}
          </div>
        </div>
        <Link
          href="/concerts"
          className="font-lato duration-300 mt-5 hover:text-blaze text-15 flex items-center gap-x-2 group"
        >
          <span>View All Concerts</span>{' '}
          <ChevronRight className="w-3 h-3 -mb-0.5 group-hover:translate-x-1 duration-300 group-hover:rotate-[360deg]" />
        </Link>
      </div>
    </div>
  )
}

export default ConcertsBlock
