import React from 'react'
import Picture from '../common/Picture'
import { starIcon } from '@/app/lib/icons'
import AwesomeIcon from '../common/AwesomeIcon'

const MusicianBlock = () => {
  return (
    <section className="grid grid-cols-12">
      <div className="col-span-12 990:col-span-6">
        <Picture src="/images/musician-1.jpg" className="w-full h-auto" priority={false} />
      </div>
      <div className="col-span-12 990:col-span-6 bg-blaze px-24 py-20 relative">
        <div className="absolute top-1/2 -translate-y-1/2 -left-16 z-10">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-blaze/50 rotate-45 -m-3 z-0"></div>
            <div className="absolute inset-0 bg-blaze rotate-45 z-10"></div>
            <AwesomeIcon icon={starIcon} className="text-white w-12 h-12 absolute z-20" />
          </div>
        </div>
        <h1 className="font-oswald text-5xl text-white pb-10 border-b-1 border-b-white/20">
          Who plays in The Pops Orchestra?
        </h1>
        <p className="font-raleway text-white mt-10 leading-relaxed">
          They are teachers, parents, neighbors, students. They have jobs. They have children. They have homes and
          schedules and commitments. They teach at local colleges, high schools, middle schools and elementary schools.
          They work in business, the arts and health care. Some are retired. Some are military veterans. They live in
          Sarasota, Bradenton, Venice, Anna Maria Island, Punta Gorda, Nokomis, Sun City Center, St. Petersburg, and
          Holmes Beach among others. Some of them are snowbirds. And they are all musicians with The Pops Orchestra.
          This season we have more than 65 musicians who bring their skill, passion and talent to the stage. The Pops is
          proud to be a community-wide orchestra with musicians who live and work in our midst.
        </p>
      </div>
    </section>
  )
}

export default MusicianBlock
