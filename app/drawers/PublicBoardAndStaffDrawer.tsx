import React from 'react'
import BottomDrawer from '../components/common/BottomDrawer'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { goToNextDrawerItem, goToPrevDrawerItem, setCloseDrawer } from '../redux/features/appSlice'
import Picture from '../components/common/Picture'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { chevronLeftIcon, chevronRightIcon, userIcon } from '../lib/icons'
import { TeamMemberProps } from '../redux/features/teamMemberSlice'

const PublicBoardAndStaffDrawer = () => {
  const { drawer, selectedIndex, drawerList } = useAppSelector((state: RootState) => state.app)
  const dispatch = useAppDispatch()

  const reset = () => {
    dispatch(setCloseDrawer())
  }

  const currentMember: TeamMemberProps = drawerList?.[selectedIndex ?? 0]
  const hasPrevious = selectedIndex > 0
  const hasNext = selectedIndex < drawerList?.length - 1

  const bioItems = currentMember?.bio?.split('|').filter((part) => part.trim()) || []

  return (
    <BottomDrawer isOpen={drawer} height="h-dvh" bgColor="bg-[#1a1a1a]">
      <div className="flex flex-col h-full w-full overflow-hidden">
        {/* Header with navigation */}
        <header className="flex items-center justify-between px-4 py-4 border-b border-zinc-700/30 flex-shrink-0">
          <button
            onClick={() => dispatch(goToPrevDrawerItem())}
            disabled={!hasPrevious}
            className={`p-2 rounded-lg transition-all duration-200 ${
              hasPrevious ? 'text-zinc-400 hover:text-blaze hover:bg-zinc-800/50' : 'text-zinc-600 cursor-not-allowed'
            }`}
            aria-label="Previous team member"
          >
            <AwesomeIcon icon={chevronLeftIcon} className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-zinc-400 text-sm">
              {selectedIndex + 1} of {drawerList?.length || 0}
            </span>
          </div>

          <button
            onClick={() => dispatch(goToNextDrawerItem())}
            disabled={!hasNext}
            className={`p-2 rounded-lg transition-all duration-200 ${
              hasNext ? 'text-zinc-400 hover:text-blaze hover:bg-zinc-800/50' : 'text-zinc-600 cursor-not-allowed'
            }`}
            aria-label="Next team member"
          >
            <AwesomeIcon icon={chevronRightIcon} className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-12 py-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Profile Image */}
              <div className="lg:col-span-1">
                <div className="relative group">
                  {currentMember?.imageUrl ? (
                    <div className="relative overflow-hidden rounded-2xl bg-zinc-800/50 aspect-square">
                      <Picture
                        src={currentMember.imageUrl}
                        priority={false}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        alt={`${currentMember.firstName} ${currentMember.lastName}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ) : (
                    <div className="aspect-square rounded-2xl bg-zinc-800/50 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-zinc-700/50 flex items-center justify-center">
                        <span className="text-2xl font-bold text-zinc-400">
                          {currentMember?.firstName?.[0]}
                          {currentMember?.lastName?.[0]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Member Details */}
              <div className="lg:col-span-2 flex flex-col">
                <div className="text-center lg:text-left mb-8">
                  <h1 className="text-white font-changa text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-2">
                    {currentMember?.firstName} {currentMember?.lastName}
                  </h1>

                  {currentMember?.position && (
                    <div className="inline-flex items-center px-4 py-2 bg-blaze/10 border border-blaze/20 rounded-full">
                      <h2 className="text-blaze text-sm font-medium uppercase tracking-wider">
                        {currentMember.position}
                      </h2>
                    </div>
                  )}
                </div>

                {/* Biography */}
                {bioItems.length > 0 && (
                  <div className="flex-1">
                    <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                      <span className="w-1 h-6 bg-blaze rounded-full mr-3"></span>
                      Biography
                    </h3>

                    <div className="space-y-4">
                      {bioItems.map((part, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30 hover:bg-zinc-800/50 transition-colors duration-200"
                        >
                          <div className="w-2 h-2 bg-blaze/60 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-zinc-300 leading-relaxed font-lato text-sm lg:text-base">{part.trim()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {bioItems.length === 0 && (
                  <div className="flex-1 flex items-center justify-center text-center py-12">
                    <div className="max-w-md">
                      <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AwesomeIcon icon={userIcon} className="w-8 h-8 text-zinc-500" />
                      </div>
                      <p className="text-zinc-400 text-lg mb-2">No biography available</p>
                      <p className="text-zinc-500 text-sm">
                        Biography information for this team member will be added soon.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer with action buttons */}
        <footer className="flex-shrink-0 px-4 sm:px-6 lg:px-12 py-4 border-t border-zinc-700/30">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <button
              onClick={reset}
              className="px-4 py-2 text-zinc-400 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Close
            </button>

            <div className="flex items-center space-x-2">
              {drawerList?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => dispatch(goToNextDrawerItem())}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === selectedIndex ? 'bg-blaze scale-125' : 'bg-zinc-600 hover:bg-zinc-500'
                  }`}
                  aria-label={`Go to team member ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </footer>
      </div>
    </BottomDrawer>
  )
}

export default PublicBoardAndStaffDrawer
