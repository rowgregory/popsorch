import { facebookIcon, instagramIcon, magnifyingGlassIcon, youtubeIcon } from '@/app/lib/icons'
import AwesomeIcon from '../common/AwesomeIcon'
import Link from 'next/link'
import { RootState, useAppSelector } from '@/app/redux/store'

const HeaderTop = () => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)

  return (
    <section className="h-[70px] w-full bg-duskgray px-4 430:px-7 1280:px-14 flex items-center justify-between relative z-50">
      <div className="flex items-center gap-x-3">
        <h1 className="text-12 uppercase font-changa text-[#b2b2b2] hidden 430:block">Follow Us:</h1>
        <a href="https://www.facebook.com/ThePopsOrchestra" target="_blank">
          <AwesomeIcon
            icon={facebookIcon}
            className="w-4 h-4 text-[#b2b2b2] cursor-pointer duration-300 hover:text-blaze"
          />
        </a>
        <a href="https://www.instagram.com/thepopsorchestra/" target="_blank">
          <AwesomeIcon
            icon={instagramIcon}
            className="w-4 h-4 text-[#b2b2b2] cursor-pointer duration-300 hover:text-blaze"
          />
        </a>
        <a href="https://www.youtube.com/user/SarasotaPops1" target="_blank">
          <AwesomeIcon
            icon={youtubeIcon}
            className="w-4 h-4 text-[#b2b2b2] ml-1 cursor-pointer duration-300 hover:text-blaze"
          />
        </a>
      </div>
      <div className="flex items-center gap-x-6">
        <Link
          href={isAuthenticated ? '/admin/dashboard' : '/auth/login'}
          className="text-12 uppercase font-changa text-[#b2b2b2] duration-300 hover:text-blaze"
        >
          {isAuthenticated ? 'Admin Dashboard' : 'Login / Register'}
        </Link>
        <AwesomeIcon
          icon={magnifyingGlassIcon}
          className="w-3 h-3 text-[#b2b2b2] duration-300 hover:text-blaze cursor-pointer hidden 430:block"
        />
      </div>
    </section>
  )
}

export default HeaderTop
