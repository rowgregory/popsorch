import React from 'react'
import BottomDrawer from '../components/common/BottomDrawer'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { goToNextDrawerItem, goToPrevDrawerItem, setCloseDrawer } from '../redux/features/appSlice'
import Picture from '../components/common/Picture'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { chevronLeftIcon, chevronRightIcon } from '../lib/icons'
import { TeamMemberProps } from '../redux/features/teamMemberSlice'
import TitleWithLine from '../components/common/TitleWithLine'

const PublicBoardAndStaffDrawer = () => {
  const { drawer, selectedIndex, drawerList } = useAppSelector((state: RootState) => state.app)
  const dispatch = useAppDispatch()

  const reset = () => {
    dispatch(setCloseDrawer())
  }

  const currentMember: TeamMemberProps = drawerList?.[selectedIndex ?? 0]

  return (
    <BottomDrawer isOpen={drawer} onClose={reset} height="h-[95dvh]" bgColor="bg-[#2a2a2a]">
      <div className="760:px-4 990:px-12 flex flex-col h-full pt-20 w-full 760:max-w-screen-lg mx-auto relative z-10">
        <AwesomeIcon
          onClick={() => dispatch(goToPrevDrawerItem())}
          icon={chevronLeftIcon}
          className="text-zinc-500 hover:text-blaze w-8 h-8 absolute -left-10 top-1/2 -translate-y-1/2 cursor-pointer duration-300"
        />
        <div className="flex flex-col 760:flex-row">
          <div className="w-1/3 pb-8">
            {currentMember?.imageUrl && (
              <Picture
                src={currentMember.imageUrl}
                priority={false}
                className="rounded-md object-contain w-full h-auto aspect-square"
              />
            )}
          </div>
          <div className="w-[1px] h-full bg-zinc-700/70 ml-8"></div>
          <div className="flex flex-col px-16">
            <TitleWithLine title={`${currentMember?.firstName} ${currentMember?.lastName}`} />

            <h2 className="mb-12 tracking-wide uppercase text-blaze text-12 mt-1">{currentMember?.position}</h2>
          </div>
        </div>
        <div className="w-full h-[1px] bg-zinc-700/70 mb-8"></div>
        <ul className="flex flex-col gap-y-6 list-disc list-outside pl-5">
          {currentMember?.bio?.split('.').map(
            (part, index, arr) =>
              index !== arr.length - 1 && (
                <li key={index} className="leading-relaxed font-lato">
                  {part.trim()}.
                </li>
              )
          )}
        </ul>
        <AwesomeIcon
          onClick={() => dispatch(goToNextDrawerItem())}
          icon={chevronRightIcon}
          className="text-zinc-500 hover:text-blaze w-8 h-8 absolute -right-10 top-1/2 -translate-y-1/2 cursor-pointer duration-300"
        />
      </div>
    </BottomDrawer>
  )
}

export default PublicBoardAndStaffDrawer
