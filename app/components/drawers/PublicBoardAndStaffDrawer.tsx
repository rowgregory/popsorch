import { useCallback, useEffect, useRef } from 'react'
import BottomDrawer from '@/app/components/common/BottomDrawer'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import {
  goToNextDrawerItem,
  goToPrevDrawerItem,
  goToSpecificDrawerItem,
  setCloseDrawer
} from '@/app/redux/features/appSlice'
import Picture from '@/app/components/common/Picture'
import { TeamMemberProps } from '@/app/redux/features/teamMemberSlice'
import { ChevronLeft, ChevronRight, User } from 'lucide-react'

const PublicBoardAndStaffDrawer = () => {
  const { drawer, selectedIndex, drawerList } = useAppSelector((state: RootState) => state.app)
  const dispatch = useAppDispatch()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const reset = useCallback(() => dispatch(setCloseDrawer()), [dispatch])

  const currentMember: TeamMemberProps = drawerList?.[selectedIndex ?? 0]
  const hasPrevious = selectedIndex > 0
  const hasNext = selectedIndex < drawerList?.length - 1

  const bioItems = currentMember?.bio?.split('|').filter((part) => part.trim()) || []
  const fullName = `${currentMember?.firstName ?? ''} ${currentMember?.lastName ?? ''}`.trim()

  useEffect(() => {
    if (drawer && drawerList) {
      drawerList.forEach((member: any) => {
        if (member?.imageUrl) {
          const img = new Image()
          img.src = member.imageUrl
        }
      })
    }
  }, [drawer, drawerList])

  useEffect(() => {
    if (!drawer) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') reset()
      if (e.key === 'ArrowLeft' && hasPrevious) dispatch(goToPrevDrawerItem())
      if (e.key === 'ArrowRight' && hasNext) dispatch(goToNextDrawerItem())
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [drawer, hasPrevious, hasNext, reset, dispatch])

  useEffect(() => {
    if (drawer) closeButtonRef.current?.focus()
  }, [closeButtonRef, drawer])

  return (
    <BottomDrawer
      isOpen={drawer}
      height="h-dvh"
      bgColor="bg-[#1a1a1a]"
      onClose={reset}
      label="Board member and staff drawer"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-member-name"
        aria-describedby="drawer-member-position"
        className="flex flex-col h-full w-full overflow-hidden"
      >
        <header className="flex items-center justify-between px-4 py-4 border-b border-zinc-700/30 shrink-0">
          <button
            type="button"
            onClick={() => dispatch(goToPrevDrawerItem())}
            disabled={!hasPrevious}
            aria-label={
              hasPrevious
                ? `Go to previous team member — ${drawerList?.[selectedIndex - 1]?.firstName} ${drawerList?.[selectedIndex - 1]?.lastName}`
                : 'No previous team member'
            }
            aria-disabled={!hasPrevious}
            className={`p-2 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-inkblack ${
              hasPrevious ? 'text-zinc-400 hover:text-blaze hover:bg-zinc-800/50' : 'text-zinc-600 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <div role="status" aria-live="polite" aria-atomic="true" className="flex items-center space-x-2">
            <span className="text-zinc-400 text-sm">
              {selectedIndex + 1} of {drawerList?.length || 0}
            </span>
          </div>

          <button
            type="button"
            onClick={() => dispatch(goToNextDrawerItem())}
            disabled={!hasNext}
            aria-label={
              hasNext
                ? `Go to next team member — ${drawerList?.[selectedIndex + 1]?.firstName} ${drawerList?.[selectedIndex + 1]?.lastName}`
                : 'No next team member'
            }
            aria-disabled={!hasNext}
            className={`p-2 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-inkblack ${
              hasNext ? 'text-zinc-400 hover:text-blaze hover:bg-zinc-800/50' : 'text-zinc-600 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto" role="region" aria-label={`Profile for ${fullName}`}>
          <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
            <div className="mb-12">
              <div className="relative max-w-2xl mx-auto">
                {currentMember?.imageUrl ? (
                  <div className="relative overflow-hidden rounded-3xl bg-zinc-900/50 aspect-4/5 shadow-2xl">
                    <Picture
                      src={currentMember.imageUrl}
                      priority={true}
                      className="object-cover w-full h-full"
                      alt={`Portrait of ${fullName}`}
                      width={800}
                      height={1000}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                      aria-hidden="true"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                      <h1
                        id="drawer-member-name"
                        className="text-white font-changa text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-3 drop-shadow-2xl"
                      >
                        {fullName}
                      </h1>
                      {currentMember?.position && (
                        <div className="inline-flex items-center px-6 py-3 bg-blaze/90 backdrop-blur-sm rounded-full shadow-lg">
                          <p
                            id="drawer-member-position"
                            className="text-white text-base font-semibold uppercase tracking-wider"
                          >
                            {currentMember.position}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="aspect-4/5 rounded-3xl bg-zinc-900/50 flex items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <div
                        className="w-24 h-24 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-4"
                        aria-hidden="true"
                      >
                        <span className="text-4xl font-bold text-zinc-400">
                          {currentMember?.firstName?.[0]}
                          {currentMember?.lastName?.[0]}
                        </span>
                      </div>
                      <h1
                        id="drawer-member-name"
                        className="text-white font-changa text-3xl sm:text-4xl font-bold mb-2"
                      >
                        {fullName}
                      </h1>
                      {currentMember?.position && (
                        <div className="inline-flex items-center px-6 py-3 bg-blaze/10 border border-blaze/20 rounded-full">
                          <p
                            id="drawer-member-position"
                            className="text-blaze text-base font-semibold uppercase tracking-wider"
                          >
                            {currentMember.position}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              {bioItems.length > 0 ? (
                <section aria-labelledby="bio-heading">
                  <div className="flex items-center justify-center mb-8">
                    <div
                      className="h-px bg-linear-to-r from-transparent via-blaze/30 to-transparent flex-1 max-w-xs"
                      aria-hidden="true"
                    />
                    <h2
                      id="bio-heading"
                      className="text-white text-2xl font-changa font-bold mx-6 uppercase tracking-wide"
                    >
                      Biography
                    </h2>
                    <div
                      className="h-px bg-linear-to-r from-transparent via-blaze/30 to-transparent flex-1 max-w-xs"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="space-y-6">
                    {bioItems.map((part, index) => (
                      <div
                        key={index}
                        className="relative p-6 lg:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm hover:border-blaze/20 transition-all duration-300 group"
                      >
                        <div
                          className="absolute left-4 top-6 w-1 h-8 bg-linear-to-b from-blaze to-blaze/40 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                          aria-hidden="true"
                        />
                        <p className="text-zinc-200 leading-relaxed font-lato text-base lg:text-lg pl-6">
                          {part.trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : (
                <div className="flex items-center justify-center text-center py-20">
                  <div className="max-w-md">
                    <div
                      className="w-20 h-20 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800/50"
                      aria-hidden="true"
                    >
                      <User className="w-10 h-10 text-zinc-500" />
                    </div>
                    <h2 className="text-white text-2xl font-changa font-bold mb-3">Biography Coming Soon</h2>
                    <p className="text-zinc-400 text-base leading-relaxed">
                      Detailed biography information for {fullName} will be available shortly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="shrink-0 px-4 sm:px-6 lg:px-12 py-4 border-t border-zinc-700/30">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={reset}
              aria-label="Close team member drawer"
              className="px-4 py-2 text-zinc-400 hover:text-white transition-colors duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-inkblack rounded-md"
            >
              Close
            </button>

            <nav aria-label="Team member pagination">
              <ul role="list" className="flex items-center space-x-2">
                {drawerList?.map((member: any, index: number) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => dispatch(goToSpecificDrawerItem(index))}
                      aria-label={`Go to ${member?.firstName} ${member?.lastName}`}
                      aria-current={index === selectedIndex ? 'true' : undefined}
                      className={`w-2 h-2 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] ${
                        index === selectedIndex ? 'bg-blaze scale-125' : 'bg-zinc-600 hover:bg-zinc-500'
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </BottomDrawer>
  )
}

export default PublicBoardAndStaffDrawer
