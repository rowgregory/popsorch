import { NavigationLinksProps } from '@/app/utils/navigation.utils'
import Link from 'next/link'
import { FC } from 'react'

export interface HeaderNavLinkProps {
  link: NavigationLinksProps
  openDropdown?: { open: boolean; textKey: string }
  setOpenDropdown: (args: { open: boolean; textKey: string }) => void
  linkClassname?: string
  isFixed?: boolean
}

const AnimatedNavLink: FC<{ link: any; linkClassname?: string }> = ({ link, linkClassname }) => {
  return (
    <Link
      href={link.linkKey ?? ''}
      className={`${linkClassname ?? 'text-white'} ${
        link.links ? 'cursor-default' : 'cursor-pointer'
      } relative group py-16 text-sm tracking-wider font-medium text-15 font-changa uppercase whitespace-nowrap`}
    >
      <span
        className={`${
          link.active ? 'scale-x-60' : ''
        } absolute top-1/2 -mt-3.25 left-0 right-0 h-px bg-white scale-x-0 origin-left  transition-transform duration-300 ease-in-out group-hover:scale-x-60`}
      ></span>
      <span
        className={`${
          link.active ? 'scale-x-60' : ''
        } absolute top-1/2 mt-3.25 left-0 right-0 h-px bg-white scale-x-0 origin-right transition-transform duration-300 ease-in-out group-hover:scale-x-60`}
      ></span>
      {link.textKey}
    </Link>
  )
}

export const HeaderNavLink: FC<HeaderNavLinkProps> = ({
  link,
  openDropdown,
  setOpenDropdown,
  linkClassname,
  isFixed
}) => {
  const textKeyMatches = openDropdown?.textKey === link.textKey

  return (
    <div
      onMouseEnter={() => setOpenDropdown({ open: true, textKey: link.textKey })}
      onMouseLeave={() => setOpenDropdown({ open: false, textKey: '' })}
      className="relative flex items-center h-full"
    >
      <AnimatedNavLink link={link} linkClassname={linkClassname} />
      {link?.links && textKeyMatches && (
        <div
          className={`${
            isFixed ? 'top-17.5' : 'top-30'
          } absolute bg-duskgray left-1/2 -translate-x-1/2 flex flex-col items-center gap-y-6 px-10 py-12 w-fit rounded-lg shadow-adminbtn`}
        >
          {link?.links.map((sublink, j, arr) => (
            <Link
              key={j}
              onClick={() => setOpenDropdown({ open: false, textKey: '' })}
              href={sublink.linkKey}
              target={sublink.isExternal ? '_blank' : ''}
              className={`${sublink.active ? 'text-blaze' : 'text-white'} ${
                j !== arr.length - 1 ? 'border-b-1 border-b-zinc-700 pb-4' : ''
              } font-changa uppercase text-sm tracking-wider font-medium hover:text-blaze duration-300 whitespace-nowrap w-full text-center`}
            >
              {sublink.textKey}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
