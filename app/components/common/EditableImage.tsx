import { setOpenModalImageUploaderPublic } from '@/app/redux/features/appSlice'
import { RootState, useAppSelector } from '@/app/redux/store'
import React from 'react'
import { useDispatch } from 'react-redux'
import Picture from './Picture'

type EditableImageProps = {
  src: string
  type: string
  textBlockKey: string
  className: string
  priority: boolean
}

const EditableImage: React.FC<EditableImageProps> = ({ src, type, textBlockKey, className, priority }) => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)

  const handleClick = () => {
    if (isAuthenticated) {
      dispatch(
        setOpenModalImageUploaderPublic({
          mediaData: {
            src,
            type,
            textBlockKey
          }
        })
      )
    }
  }

  return (
    <Picture
      src={src}
      alt="The Pops Orchestra"
      className={className}
      priority={priority}
      onClick={handleClick}
      width={0}
      height={0}
    />
  )
}

export default EditableImage
