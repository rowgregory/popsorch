import { PhoneIcon } from 'lucide-react'
import { FC } from 'react'

const CallBoxOfficeBtn: FC<{ className?: string }> = ({ className }) => {
  return (
    <a
      href="tel:19419267677"
      aria-label="Call the box office at 941-926-7677"
      className={`group inline-flex items-center justify-center gap-2 border border-white/20 hover:border-blaze/50 bg-transparent hover:bg-blaze/10 text-white/70 hover:text-white px-6 py-4 font-changa text-sm uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className ?? ''}`}
    >
      <PhoneIcon className="w-4 h-4 shrink-0 text-blaze" aria-hidden="true" />
      <span>Call Box Office</span>
    </a>
  )
}

export default CallBoxOfficeBtn
