'use client'

import React from 'react'
import Picture from '../common/Picture'
import AnimatedSectionHeader from '../common/AnimatedSectionHeader'
import useAnimatedSectionTitle from '../../hooks/useAnimatedSectionTitle'
import TicketSVG from '../svg/TicketSVG'
import { openSeatMap } from '@/app/redux/features/appSlice'
import { useAppDispatch } from '@/app/redux/store'

const CurrentEventBlock = () => {
  const dispatch = useAppDispatch()

  const eventData = [
    {
      title: '23 Mar, 2025',
      text: '3:00pm',
      venue: 'Riverview Performing Arts Center',
      city: 'Sarasota',
      day: 'Sunday'
    },
    {
      title: '24 Mar, 2025',
      text: '7:30pm',
      venue: 'SCF Neel Performing Arts Center',
      city: 'Bradenton',
      day: 'Monday'
    }
  ]

  const stats = [
    {
      value: '5',
      description: 'Local Talent'
    },
    {
      value: '2',
      description: 'Dance Groups'
    },
    {
      value: '1',
      description: 'Music Winner'
    }
  ]

  const videoUrl = 'https://www.youtube.com/embed/KUH5aZvV28M?autoplay=0&loop=1&mute=1'
  const { ref, visible } = useAnimatedSectionTitle(0.2)

  return (
    <section className="dark:bg-midnightsteel px-4 pb-14 dark:pt-14 md:px-12 990:py-24">
      <div className="max-w-[516px] md:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative grid grid-cols-12 gap-y-10 576:gap-x-10">
        <div className="col-span-12 990:col-span-5 flex flex-col gap-y-7">
          <Picture
            src="/images/current-event-01.png"
            priority={false}
            className="w-full h-full aspect-video 990:aspect-square rounded-3xl object-cover"
          />
          <iframe
            width="100%"
            height="100%"
            className="w-full h-full rounded-3xl aspect-video 990:aspect-square"
            src={videoUrl}
            title="YouTube video player"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="col-span-12 990:col-span-7 mt-14 990:mt-0">
          <AnimatedSectionHeader title="About The Event" />
          <h1
            ref={ref}
            className={`transition-opacity duration-700 ${
              visible ? 'opacity-100' : 'opacity-0'
            } text-[60px] font-bold text-irongray dark:text-white`}
          >
            Love It
          </h1>
          <h2 className="text-[60px] font-bold text-blaze mt-[-14px] 430:-mt-8 leading-[53px] 430:leading-normal">Like a Local</h2>
          <p className="text-lg text-slategray dark:text-slatemist font-medium mt-6 leading-snug">
            In this Grand Finale show, The Pops Orchestra will feature amazing performers from right here on our Cultural Coast, including
            Joseph Holt on piano, Jon Godfrey on banjo, singers Justin Greer, Johanna Davis, and Frank Paul, dancers from the Sarasota Bay
            Dance Club, the concerto competition winner from the Sarasota Music Conservatory, performers from the Circus Arts Conservatory,
            and more! Let&apos;s celebrate our local talent together during this dynamic and diverse presentation.
          </p>
          <div className="grid grid-cols-12 gap-y-10 576:gap-4 mt-10">
            {eventData.map((data, i) => (
              <div key={i} className="col-span-12 md:col-span-6 mb-6 md:mb-0 flex justify-center flex-col">
                <div className="text-[20px] text-gunmetal dark:text-white mb-2 font-semibold">{data.title}</div>
                <div className="text-[18px] text-slategray dark:text-slatemist font-medium">{data.text}</div>
                <div className="text-[18px] text-slategray dark:text-slatemist font-medium">{data.venue}</div>
                <div className="text-[18px] text-slategray dark:text-slatemist font-medium">{data.city}</div>
                <button className="flex items-center gap-x-3 text-white hover:text-gunmetal dark:hover:text-white mt-7 border-2 border-blaze rounded-md px-5 py-3 font-semibold bg-blaze hover:bg-transparent duration-300 group justify-center">
                  <TicketSVG className="group-hover:text-gunmetal dark:group-hover:text-white duration-150" /> Buy {data.day} Tickets
                </button>
                <button
                  onClick={() => (i === 1 ? () => {} : dispatch(openSeatMap()))}
                  className="text-gunmetal dark:text-gray-300 text-center font-semibold mt-4 text-sm flex self-center mx-auto hover:text-blaze duration-200"
                >
                  View Seat Map
                </button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-y-10 430:gap-x-10 mt-10 md:mt-20">
            {stats.map((data, i) => (
              <div key={i} className="col-span-12 576:col-span-4 flex items-center gap-x-2">
                <h1 className="text-[72px] text-blaze font-extrabold">{data.value}</h1>
                <h2 className="text-2xl text-gunmetal dark:text-white max-w-16 font-bold">{data.description}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CurrentEventBlock
