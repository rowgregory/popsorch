import { useRef } from 'react'
import Link from 'next/link'
import { RootState, store, useAppSelector } from '../redux/store'
import { closeNavigationDrawer } from '../redux/features/appSlice'
import { getNavigationLinks } from '../utils/navigation.utils'
import CustomHeaderButton from './CustomHeaderButton'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

const NavigationDrawer = ({ concerts, campApplicationsSetting }) => {
  const path = usePathname()
  const { navigationDrawer } = useAppSelector((state: RootState) => state.app)
  const { headerButton } = useAppSelector((state: RootState) => state.headerButton)
  const overlayRef = useRef(null)
  const thereAreConcerts = concerts?.length > 0
  const navLinks = getNavigationLinks(path, thereAreConcerts, campApplicationsSetting)
  const closeDrawer = () => store.dispatch(closeNavigationDrawer())

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`${
          navigationDrawer ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } fixed inset-0 z-99 bg-black/60 backdrop-blur-sm transition-opacity duration-500`}
      />

      {/* Panel */}
      <div
        ref={overlayRef}
        className={`${
          navigationDrawer ? 'translate-x-0' : 'translate-x-full'
        } duration-500 ease-in-out no-scrollbar fixed top-0 right-0 z-100 h-full w-full sm:w-96 lg:w-120 bg-inkblack border-l border-white/10 overflow-y-auto transition-transform flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
          <Link href="/" onClick={closeDrawer} className="bg-white50Logo bg-no-repeat bg-contain bg-center w-20 h-12" />
          <button
            onClick={closeDrawer}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-8 flex flex-col gap-y-8">
          {/* Buttons */}
          <div className="flex flex-col gap-y-3">
            <CustomHeaderButton {...headerButton} />
            <CustomHeaderButton
              text="Buy Tickets"
              link="/concerts"
              linkType="internal"
              dropdownItems={[]}
              type="button"
              fontColor="#fff"
              backgroundColor="#da0032"
              animation="scale"
              createdAt={new Date()}
              id="123"
            />
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10" />

          {/* Nav Links */}
          <div className="flex flex-col gap-y-5">
            {/* Top level links without children — display inline in a wrap row */}
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {navLinks
                .filter((link) => !link.links?.length)
                .map((link, i) => (
                  <Link
                    key={i}
                    onClick={closeDrawer}
                    href={link.linkKey}
                    className={`text-sm font-changa tracking-widest font-semibold duration-300 hover:text-blaze uppercase ${
                      link.active ? 'text-blaze' : 'text-white'
                    }`}
                  >
                    {link.textKey}
                  </Link>
                ))}
            </div>

            <div className="w-full h-px bg-white/10" />

            {/* Links with children — 2 col grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {navLinks
                .filter((link) => link.links?.length)
                .map((link, i) => (
                  <div key={i}>
                    <div
                      className={`text-sm font-changa tracking-widest font-semibold uppercase mb-2.5 ${
                        link.active ? 'text-blaze' : 'text-white'
                      }`}
                    >
                      {link.textKey}
                    </div>
                    <div className="flex flex-col gap-y-2">
                      {link.links?.map((obj, j) => (
                        <Link
                          onClick={closeDrawer}
                          key={j}
                          href={obj.linkKey}
                          className={`ml-3 text-xs font-changa tracking-widest font-semibold duration-300 hover:text-blaze uppercase ${
                            obj.active ? 'text-blaze' : 'text-white/60'
                          }`}
                        >
                          — {obj.textKey}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white/10">
          <p className="text-white/30 text-xs font-changa uppercase tracking-widest">
            The Pops Orchestra of Bradenton & Sarasota
          </p>
        </div>
      </div>
    </>
  )
}

export default NavigationDrawer
