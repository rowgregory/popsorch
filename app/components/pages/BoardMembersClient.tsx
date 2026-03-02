'use client'

import { TeamMemberProps } from '@/app/redux/features/teamMemberSlice'
import PublicBoardAndStaffDrawer from '@/app/components/drawers/PublicBoardAndStaffDrawer'
import { RootState, store, useAppSelector } from '@/app/redux/store'
import { resetDrawerData, setCloseDrawer, setOpenDrawer } from '@/app/redux/features/appSlice'
import Breadcrumb from '@/app/components/common/Breadcrumb'
import PublicTeamMemberCard from '@/app/components/cards/TeamMemberCard'

export const BoardMembersClient = ({ data }) => {
  const { drawer } = useAppSelector((state: RootState) => state.app)

  const handleOpenDrawer = (selectedMember: TeamMemberProps) => {
    const combinedList: TeamMemberProps[] = [...data]
    const selectedIndex = combinedList.findIndex((m) => m.id === selectedMember.id)
    store.dispatch(resetDrawerData())
    store.dispatch(setOpenDrawer({ teamMember: selectedMember, teamList: combinedList, selectedIndex }))
  }

  const sortedBoardMembers = [...data].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <main id="main-content">
      <PublicBoardAndStaffDrawer />
      <Breadcrumb breadcrumb="Board Members" />

      {/* Backdrop overlay */}
      {drawer && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={() => store.dispatch(setCloseDrawer())}
          className={`min-h-dvh w-full fixed inset-0 z-50 duration-700 backdrop-blur-md bg-black/60 ${
            drawer ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      <div className="relative bg-black">
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover opacity-10"
          style={{ backgroundImage: `url('/images/bio-bg.png')`, backgroundAttachment: 'fixed' }}
          aria-hidden="true"
        />

        <div className="relative z-10 px-4 990:px-12 xl:px-4">
          <div className="max-w-[320px] 430:max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-screen-7xl mx-auto">
            {/* Page Header */}
            <header className="w-full text-center flex flex-col items-center pt-32 pb-20 border-b border-white/10">
              <p className="font-changa text-xs uppercase tracking-[0.3em] text-blaze mb-4">The Pops Orchestra</p>
              <div className="flex items-center gap-3 430:gap-4 justify-center mb-4">
                <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
                <h1 className="text-4xl 430:text-5xl sm:text-6xl font-changa text-white leading-none">Board Members</h1>
                <div className="w-8 430:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
              </div>
              <div className="w-16 h-px bg-blaze mx-auto mt-2 mb-6" aria-hidden="true" />
              <p className="font-lato text-white/50 text-sm 430:text-base max-w-xl leading-relaxed">
                Meet the volunteer leaders who guide and govern The Pops Orchestra of Bradenton and Sarasota.
              </p>
            </header>

            {/* Board Members Grid */}
            <section aria-labelledby="board-members-heading" className="py-20 pb-32">
              <h2 id="board-members-heading" className="sr-only">
                Board members
              </h2>
              <ul role="list" aria-label="Board members" className="grid grid-cols-12 gap-y-6 760:gap-7 w-full">
                {sortedBoardMembers?.map((teamMember: TeamMemberProps, index: number) => (
                  <PublicTeamMemberCard
                    key={teamMember.id}
                    teamMember={teamMember}
                    handleOpenDrawer={handleOpenDrawer}
                    index={index}
                  />
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
