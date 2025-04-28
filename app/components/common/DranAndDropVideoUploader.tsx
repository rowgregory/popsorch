import React, { useRef } from 'react'
import AwesomeIcon from './AwesomeIcon'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { uploadIcon } from '@/app/lib/icons'
import { createFormActions } from '@/app/redux/features/formSlice'

const DragAndDropVideoUploader = () => {
  const inputRef = useRef(null) as any
  const dispatch = useAppDispatch()
  const { concert } = useAppSelector((state: RootState) => state.form)
  const formActions = createFormActions('concert', dispatch)

  return (
    <>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e: any) => {
          e.preventDefault()
          formActions.handleVideoDrop(e)
        }}
        onClick={() => inputRef?.current?.click()}
        className="w-full max-w-80 h-auto aspect-video rounded-md border-dashed border-2 border-gray-200 bg-white flex flex-col items-center justify-center p-4 cursor-pointer"
      >
        {concert?.inputs?.videoUrl ? (
          <video
            src={concert?.inputs?.videoUrl}
            className="object-contain w-full h-auto z-10 max-w-80 aspect-video relative"
            controls={false}
            autoPlay={false}
            loop={false}
            muted
            preload="metadata"
          >
            <source src={concert?.inputs?.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            <AwesomeIcon icon={uploadIcon} className="w-3.5 h-3.5 mb-1.5 text-[#333]" />
            <p className="text-sm rubik-regular text-[#333]">Drag & Drop or Click</p>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        name="videoUrl"
        id="videoUrl"
        className="hidden"
        accept="video/*"
        onChange={formActions.handleVideoChange}
      />
    </>
  )
}

export default DragAndDropVideoUploader
