import { useEffect } from 'react'
import BottomDrawer from '../components/common/BottomDrawer'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { goToNextDrawerItem, goToPrevDrawerItem, setCloseDrawer } from '../redux/features/appSlice'
import Picture from '../components/common/Picture'
import { TeamMemberProps } from '../redux/features/teamMemberSlice'
import { ChevronLeft, ChevronRight, User } from 'lucide-react'

const PublicBoardAndStaffDrawer = () => {
  const { drawer, selectedIndex, drawerList } = useAppSelector((state: RootState) => state.app)
  const dispatch = useAppDispatch()

  const reset = () => dispatch(setCloseDrawer())

  const currentMember: TeamMemberProps = drawerList?.[selectedIndex ?? 0]
  const hasPrevious = selectedIndex > 0
  const hasNext = selectedIndex < drawerList?.length - 1

  const bioItems = currentMember?.bio?.split('|').filter((part) => part.trim()) || []

  useEffect(() => {
    // Preload all images in the drawer list when drawer opens
    if (drawer && drawerList) {
      drawerList.forEach((member: any) => {
        if (member?.imageUrl) {
          const img = new Image()
          img.src = member.imageUrl
        }
      })
    }
  }, [drawer, drawerList])

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
            <ChevronLeft className="w-5 h-5" />
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
            <ChevronRight className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
            {/* Hero Section - Image Front and Center */}
            <div className="mb-12">
              <div className="relative max-w-2xl mx-auto">
                {currentMember?.imageUrl ? (
                  <div className="relative overflow-hidden rounded-3xl bg-zinc-900/50 aspect-[4/5] shadow-2xl">
                    <Picture
                      src={currentMember.imageUrl}
                      priority={true}
                      className="object-cover w-full h-full"
                      alt={`${currentMember.firstName} ${currentMember.lastName}`}
                      width={800}
                      height={1000}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Name Overlay on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                      <h1 className="text-white font-changa text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-3 drop-shadow-2xl">
                        {currentMember?.firstName} {currentMember?.lastName}
                      </h1>
                      {currentMember?.position && (
                        <div className="inline-flex items-center px-6 py-3 bg-blaze/90 backdrop-blur-sm rounded-full shadow-lg">
                          <h2 className="text-white text-base font-semibold uppercase tracking-wider">
                            {currentMember.position}
                          </h2>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[4/5] rounded-3xl bg-zinc-900/50 flex items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl font-bold text-zinc-400">
                          {currentMember?.firstName?.[0]}
                          {currentMember?.lastName?.[0]}
                        </span>
                      </div>
                      <h1 className="text-white font-changa text-3xl sm:text-4xl font-bold mb-2">
                        {currentMember?.firstName} {currentMember?.lastName}
                      </h1>
                      {currentMember?.position && (
                        <div className="inline-flex items-center px-6 py-3 bg-blaze/10 border border-blaze/20 rounded-full">
                          <h2 className="text-blaze text-base font-semibold uppercase tracking-wider">
                            {currentMember.position}
                          </h2>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Biography Section */}
            <div className="max-w-4xl mx-auto">
              {bioItems.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-center mb-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-blaze/30 to-transparent flex-1 max-w-xs"></div>
                    <h3 className="text-white text-2xl font-changa font-bold mx-6 uppercase tracking-wide">
                      Biography
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-blaze/30 to-transparent flex-1 max-w-xs"></div>
                  </div>

                  <div className="space-y-6">
                    {bioItems.map((part, index) => (
                      <div
                        key={index}
                        className="relative p-6 lg:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm hover:border-blaze/20 transition-all duration-300 group"
                      >
                        <div className="absolute left-4 top-6 w-1 h-8 bg-gradient-to-b from-blaze to-blaze/40 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                        <p className="text-zinc-200 leading-relaxed font-lato text-base lg:text-lg pl-6">
                          {part.trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center text-center py-20">
                  <div className="max-w-md">
                    <div className="w-20 h-20 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800/50">
                      <User className="w-10 h-10 text-zinc-500" />
                    </div>
                    <h3 className="text-white text-2xl font-changa font-bold mb-3">Biography Coming Soon</h3>
                    <p className="text-zinc-400 text-base leading-relaxed">
                      Detailed biography information for {currentMember?.firstName} {currentMember?.lastName} will be
                      available shortly.
                    </p>
                  </div>
                </div>
              )}
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
