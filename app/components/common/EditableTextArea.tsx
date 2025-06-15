import React, { FC, JSX } from 'react'
import { setOpenModal } from '@/app/redux/features/appSlice'
import { RootState, useAppSelector } from '@/app/redux/store'
import { formatPhoneNumber } from '@/app/utils/string.functions'
import { useDispatch } from 'react-redux'

type EditableTextAreaProps = {
  tag: keyof JSX.IntrinsicElements
  initialValue: string | number
  type: string
  textBlockKey: string
  className?: string
}

const EditableTextArea: FC<EditableTextAreaProps> = ({ tag: Tag, initialValue, type, textBlockKey, className }) => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const { openModal } = useAppSelector((state: RootState) => state.app)

  const handleClick = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    if (isAuthenticated) {
      dispatch(
        setOpenModal({
          show: openModal,
          initialValue,
          type,
          textBlockKey
        })
      )
    }
  }

  if (!initialValue) return

  return (
    <Tag
      onClick={handleClick}
      className={`${className} ${isAuthenticated ? 'cursor-pointer' : 'cursor-default'} pointer-events-auto`}
    >
      <span>{textBlockKey?.includes?.('PhoneNumber') ? formatPhoneNumber(String(initialValue)) : initialValue}</span>
    </Tag>
  )
}

export default EditableTextArea
