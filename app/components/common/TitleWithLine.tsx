import { FC } from 'react'
import EditableTextArea from './EditableTextArea'

interface TitleWithLinkProps {
  title: string
  type: string
  textBlockKey: string
}

const TitleWithLine: FC<TitleWithLinkProps> = ({ title, type, textBlockKey }) => {
  return (
    <div className="relative h-fit w-fit px-5">
      <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-50 h-[1.5px] bg-blaze/70 w-full"></span>
      <EditableTextArea
        tag="h1"
        initialValue={title}
        type={type}
        textBlockKey={textBlockKey}
        className="text-white font-changa text-center text-[48px] relative z-10"
      />
    </div>
  )
}

export default TitleWithLine
