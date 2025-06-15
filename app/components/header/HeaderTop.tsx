import { facebookIcon, instagramIcon, youtubeIcon } from '@/app/lib/icons'
import AwesomeIcon from '../common/AwesomeIcon'
import { ArrowRight } from 'lucide-react'
import { useAppDispatch } from '@/app/redux/store'
import { setOpenInconspicuousSignInDrawer } from '@/app/redux/features/appSlice'

const HeaderTop = () => {
  const dispatch = useAppDispatch()

  return (
    <section className="h-12 w-full bg-duskgray px-4 430:px-7 1280:px-14 flex items-center justify-between relative z-50">
      <div className="flex items-center gap-x-3">
        <h1 className="text-12 uppercase font-changa text-white hidden 430:block">Follow Us:</h1>
        <a href="https://www.facebook.com/ThePopsOrchestra" target="_blank">
          <AwesomeIcon
            icon={facebookIcon}
            className="w-4 h-4 text-white cursor-pointer duration-300 hover:text-blaze"
          />
        </a>
        <a href="https://www.instagram.com/thepopsorchestra/" target="_blank">
          <AwesomeIcon
            icon={instagramIcon}
            className="w-4 h-4 text-white cursor-pointer duration-300 hover:text-blaze"
          />
        </a>
        <a href="https://www.youtube.com/user/SarasotaPops1" target="_blank">
          <AwesomeIcon
            icon={youtubeIcon}
            className="w-4 h-4 text-white ml-1 cursor-pointer duration-300 hover:text-blaze"
          />
        </a>
      </div>

      <ArrowRight
        onClick={() => dispatch(setOpenInconspicuousSignInDrawer())}
        className="text-zinc-600 w-5 h-5 cursor-pointer"
      />
    </section>
  )
}

export default HeaderTop
