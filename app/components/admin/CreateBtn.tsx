import { useAppDispatch } from '@/app/redux/store'
import React, { FC } from 'react'
import AwesomeIcon from '../common/AwesomeIcon'
import { plusIcon } from '@/app/lib/icons'

interface CreateBtnProps {
  btnText: string
  createFunc: any
  bgColor: string
  hvbgcolor: string
}

const CreateBtn: FC<CreateBtnProps> = ({ btnText, createFunc, bgColor, hvbgcolor }) => {
  const dispatch = useAppDispatch()
  return (
    <button
      onClick={() => dispatch(createFunc())}
      className={`${bgColor} hover:${hvbgcolor} group px-5 py-3 rounded-sm font-bold font-changa uppercase flex items-center justify-center gap-x-3 duration-300 focus:translate-y-0 active:translate-y-1 active:shadow-inner`}
    >
      {btnText}
      <AwesomeIcon icon={plusIcon} className="w-4 h-4 group-hover:rotate-90 duration-700" />
    </button>
  )
}

export default CreateBtn
