import React, { ChangeEvent, FC, useRef, useState } from 'react'
import Link from 'next/link'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import PublicModal from '../components/common/PublicModal'
import { useUpdateTextBlockMutation } from '../redux/services/textBlockApi'
import uploadFileToFirebase from '../utils/firebase.upload'
import Picture from '../components/common/Picture'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { createFormActions } from '../redux/features/formSlice'
import { setCloseModalImageUploaderPublic } from '../redux/features/appSlice'
import { arrowRightIcon } from '../lib/icons'
import Spinner from '../components/common/Spinner'

const ImageUploaderHeader = () => (
  <>
    <h1 className="font-bold text-stealthGray text-xl mt-2 mb-4">Upload image</h1>
    <p className="hidden 480:block text-sm text-coolGray font-medium text-center">
      Please note that uploading a new image will automatically delete the previous one and immediately replace it with
      the new one.
    </p>
  </>
)

const MediaLink = () => (
  <Link className="flex items-center gap-x-2 mb-10 mt-1.5" href="" target="_blank">
    <span className="text-neonIce font-medium w-fit text-sm">View All Media Stored on Firebase</span>
    <AwesomeIcon icon={arrowRightIcon} className="w-4 h-4 text-neonIce -rotate-45" />
  </Link>
)

interface ImageDropZoneProps {
  loading: boolean
  progress: number
  mediaInputRef: any
  mediaData: { src: string }
  handleFileUpload: any
}

const ImageDropZone: FC<ImageDropZoneProps> = ({ loading, progress, mediaInputRef, mediaData, handleFileUpload }) => (
  <div
    className="border-1 border-dashed border-zinc-700 w-full p-5 h-44 flex flex-col items-center justify-center cursor-pointer hover:border-neonIce bg-zinc-50"
    onClick={() => mediaInputRef?.current?.click()}
  >
    {!loading ? (
      <>
        <Picture
          src={mediaData.src}
          alt="Upload Image"
          className="w-full h-full max-w-60 object-contain"
          priority={true}
          width={100}
          height={100}
        />
        <input ref={mediaInputRef} type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
      </>
    ) : (
      <>
        Upload Progress: {progress >= 0 && progress < 101 ? progress.toFixed(2) : '100'}% <Spinner />
      </>
    )}
  </div>
)

const ImageUploaderFooter = ({ reset }: { reset: () => void }) => (
  <div className="bg-silver mx-auto max-w-md 990:max-w-full p-3 480:py-6 480:px-5 fixed bottom-0 left-0 right-0 480:block w-full">
    <div className="flex items-center justify-between">
      <button
        onClick={reset}
        type="button"
        className="bg-stealthGray hover:bg-[#38383c] py-1.5 w-36 text-white disabled:cursor-not-allowed"
      >
        Back
      </button>
      <div className="flex items-center gap-x-4">
        <button
          onClick={reset}
          type="button"
          className="min-w-36 bg-neonIce py-1.5 w-36 text-white disabled:cursor-not-allowed"
        >
          Done
        </button>
      </div>
    </div>
  </div>
)

const PublicImageUploaderModal = () => {
  const mediaInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const [updateText] = useUpdateTextBlockMutation()
  const [loading, setLoading] = useState(false)
  const { handleUploadProgress } = createFormActions('home', dispatch)
  const { progress } = useAppSelector((state: RootState) => state.form)
  const { openModalImageUploaderPublic, mediaData } = useAppSelector((state: RootState) => state.app)

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const file = e.target.files?.[0]
    if (!file) return

    const url = await uploadFileToFirebase(file, handleUploadProgress, 'image')

    await updateText({
      [mediaData.textBlockKey]: url,
      type: mediaData.type,
      mimeType: 'image',
      fileName: file.name
    })
      .unwrap()
      .then(() => {
        if (mediaInputRef.current) {
          mediaInputRef.current.value = ''
        }
      })
      .catch(() => {})

    setLoading(false)
  }

  const reset = () => {
    dispatch(setCloseModalImageUploaderPublic())
    setLoading(false)
  }

  if (!openModalImageUploaderPublic) return

  return (
    <PublicModal show={openModalImageUploaderPublic} onClose={reset} reset={reset}>
      <div className="px-4 pt-12 480:py-20 480:mb-20 max-w-md mx-auto flex flex-col items-center justify-center w-full">
        <ImageUploaderHeader />
        <MediaLink />
        <ImageDropZone
          loading={loading}
          progress={progress}
          mediaInputRef={mediaInputRef}
          mediaData={mediaData}
          handleFileUpload={handleFileUpload}
        />
      </div>
      <ImageUploaderFooter reset={reset} />
    </PublicModal>
  )
}

export default PublicImageUploaderModal
