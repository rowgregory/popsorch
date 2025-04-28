import { HeaderNavLinkProps } from '@/app/types/header.types'
import Link from 'next/link'
import { FC } from 'react'

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
          link.active ? 'scale-x-[60%]' : ''
        } absolute top-1/2 -mt-[13px] left-0 right-0 h-[1px] bg-white scale-x-0 origin-left  transition-transform duration-300 ease-in-out group-hover:scale-x-[60%]`}
      ></span>
      <span
        className={`${
          link.active ? 'scale-x-[60%]' : ''
        } absolute top-1/2 mt-[13px] left-0 right-0 h-[1px] bg-white scale-x-0 origin-right transition-transform duration-300 ease-in-out group-hover:scale-x-[60%]`}
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
            isFixed ? 'top-[70px]' : 'top-[120px]'
          } absolute bg-duskgray left-1/2 -translate-x-1/2 flex flex-col items-center gap-y-6 px-10 py-12 w-fit rounded-lg shadow-adminbtn`}
        >
          {link?.links.map((sublink, j, arr) => (
            <Link
              key={j}
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
