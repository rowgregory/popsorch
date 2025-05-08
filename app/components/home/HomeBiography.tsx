import React from 'react'
import Picture from '../common/Picture'
import TitleWithLine from '../common/TitleWithLine'
import { AnimatedText } from '../AnimatedText'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import EditableTextArea from '../common/EditableTextArea'
import { setOpenModal } from '@/app/redux/features/appSlice'

const HomeBiography = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const { openModal } = useAppSelector((state: RootState) => state.app)
  const dispatch = useAppDispatch()

  const handleAnimatedText = () => {
    if (isAuthenticated) {
      dispatch(
        setOpenModal({
          show: openModal,
          initialValue: textBlockMap.HOME_BIO_BLOCK.homeBioParagraph,
          type: 'HOME_BIO_BLOCK',
          textBlockKey: 'homeBioParagraph'
        })
      )
    }
  }

  return (
    <div className="px-4 py-40 relative">
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url('/images/bio-bg.png')`,
          backgroundAttachment: 'fixed'
        }}
      />
      <div
        className={`max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full grid grid-cols-12 gap-y-12 990:gap-x-20 items-center relative z-10`}
      >
        <div className="col-span-12 1200:col-span-6 flex justify-center">
          <div className="relative before:absolute before:content-[''] before:w-full before:h-full before:border-4 before:border-blaze before:rounded-md before:z-[-1] before:-top-4 430:before:-top-10 left-0 before:max-w-[450px] max-w-[450px] h-full max-h-[700px]">
            <Picture src="/images/robyn-1.jpg" className="w-full h-fit object-contain ml-0 430:ml-12" priority={true} />
          </div>
        </div>
        <div className="col-span-12 1200:col-span-6">
          <TitleWithLine
            title={textBlockMap?.HOME_BIO_BLOCK?.homeBioTitle}
            type="HOME_BIO_BLOCK"
            textBlockKey="homeBioTitle"
          />
          <EditableTextArea
            tag="h1"
            initialValue={textBlockMap?.HOME_BIO_BLOCK?.homeBioSubtitle}
            type="HOME_BIO_BLOCK"
            textBlockKey="homeBioSubtitle"
            className="text-xl font-lato text-[#cacaca] my-8"
          />
          <span
            onClick={() => handleAnimatedText()}
            className={`${isAuthenticated ? 'cursor-pointer' : 'cursor-default'} pointer-events-auto`}
          >
            <AnimatedText text={textBlockMap?.HOME_BIO_BLOCK?.homeBioParagraph} />
          </span>
          <EditableTextArea
            tag="h2"
            initialValue={
              textBlockMap?.HOME_BIO_BLOCK?.homeBioSignature || `The Pops Orchestra of Bradenton & Sarasota`
            }
            type="HOME_BIO_BLOCK"
            textBlockKey="homeBioSignature"
            className="ext-[32px] text-blaze font-changa"
          />
        </div>
      </div>
    </div>
  )
}

export default HomeBiography
