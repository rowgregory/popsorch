import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import Picture from '../components/common/Picture'

const RobynBell = () => {
  return (
    <>
      <Breadcrumb breadcrumb="Robyn Bell" />
      <section className="px-4 990:px-12 xl:px-4">
        <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto grid grid-cols-12 990:gap-x-12 pt-32 pb-44">
          <div className="order-2 1200:order-1 col-span-12 1200:col-span-8 mb-12 1200:mb-0 flex flex-col gap-y-4 gap-x-2 w-full">
            <Picture src="/images/robyn-2.png" className="w-full h-full aspect-video" priority={true} />
            <div className="bg-duskgray p-14 font-medium leading-relaxed font-lato text-[#b2b2b2] flex flex-col mb-20">
              <h1 className="font-changa text-2xl mb-5 text-white">Robyn Bell makes the show!</h1>
              <p className="mb-4">
                Having worked with dozens of tribute and guest artists to marry the popular music genre with symphonic
                orchestrations, Robyn fills concert halls with patrons and the soundtracks of their lives. Her dynamic
                personality, musical presence, and precise baton technique keep enthusiastic audience and orchestra
                members engaged, enthralled, and entertained from the first rehearsal to the final performance.
              </p>
              <p className="mb-4">
                Specializing at the intersection of popular music and symphonic orchestrations, Robyn has developed,
                produced, and conducted scores of pops orchestra shows highlighting the music of Simon and Garfunkel,
                Neil Diamond, George Harrison, John Denver, the Four Seasons, Barry Manilow, Elvis Presley, the Beatles,
                Frank Sinatra, Barbra Streisand, the Beach Boys, Michael Bublé, and more.
              </p>
              <p className="mb-4">
                Additionally, she has conducted concerts with performers such as Audrey Landers (actress and singer),
                Joan Ellison (Judy Garland restorationist), Rich Ridenour (pianist), the Stiletto Brass (all-women brass
                quintet), Ring Sarasota (handbell choir), Alex Zickafoose and AJ Cali (Jersey Boys), Westcoast Black
                Theatre Troupe (Porgy and Bess, Spirit of America), the Jacobites (pipe and drum group), Dick Hyman
                (jazz piano icon), and William Johnson (Bob Hope tribute artist).
              </p>
              <p className="mb-4">
                Some of Robyn&apos;s most popular and exciting productions include a Broadway-style collaboration with
                orchestra and musical theatre by Robert Christenson called A Christmas Carol, the Concert, a musical and
                narration presentation of the history of the American flag by Vane Scott called The Many Faces of Old
                Glory, a wedding give-a-way fundraising challenge culminating in the orchestra performing for a live
                wedding on stage called Something Old, Something New, Something Borrowed, Something Blue, and an
                insanely thrilling interactive concert using the app Poll-Everywhere called The Choice is Yours,
                engaging audience members to vote, in real-time, to choose the next selection the orchestra will
                perform.
              </p>
              <h3 className="mb-2 font-changa text-12 font-medium tracking-wider text-sunburst uppercase">
                Robyn always adds so much to the performance with her enthusiasm and sense of fun and total musical
                integrity.
              </h3>
              <h3 className="mb-2 font-changa text-12 font-medium tracking-wider text-sunburst uppercase">
                The high level of this orchestra is amazing. We love every concert.
              </h3>
            </div>
          </div>
          <div className="order-2 1200:order-1 col-span-12 1200:col-span-4 mb-12 1200:mb-0 flex flex-col gap-y-4 gap-x-2 w-full">
            <div className="bg-duskgray p-14">
              <h1 className="font-changa text-2xl text-blaze mb-5">Musical Director</h1>
              <p className="mb-4 text-[#b2b2b2] font-medium leading-relaxed font-lato">
                Known for her innovative, appealing programming and informative, witty, and entertaining audience
                rapport, Robyn Bell has taken the pops orchestra music scene by storm.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default RobynBell
