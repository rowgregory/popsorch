import Link from 'next/link'
import HeaderLower from './HeaderLower'

const Header = ({ concerts, campApplicationsSetting }) => {
  return (
    <>
      <div className="bg-neutral-900 border-b border-neutral-800 430:px-7 1280:px-14">
        <div className="mx-auto">
          <div className="flex justify-end items-center h-10">
            <Link
              href="/auth/login"
              className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors duration-300"
            >
              Launch App
            </Link>
          </div>
        </div>
      </div>
      <HeaderLower concerts={concerts} campApplicationsSetting={campApplicationsSetting} />
    </>
  )
}

export default Header
