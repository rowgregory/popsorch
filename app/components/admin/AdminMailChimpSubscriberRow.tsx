import { formatDate } from '@/app/utils/date.functions'
import React, { FC, useState } from 'react'
import Pill from '../common/Pill'
import Link from 'next/link'
import AwesomeIcon from '../common/AwesomeIcon'
import { externalLinkIcon } from '@/app/lib/icons'
import { MemberProps } from '@/app/redux/features/mailchimpSlice'

const AdminMailChimpSubscriberRow: FC<MemberProps> = ({
  contactId,
  email,
  name,
  phoneNumber,
  createdAt,
  status,
  interests,
  address,
  stats,
  ipOpt
}) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const mappedEnabledOptions = (interests: any) => {
    return [
      interests.isOption1 && { type: 'Season Tickets' },
      interests.isOption2 && { type: 'Special Events' },
      interests.isOption3 && { type: 'Youth Education' },
      interests.isOption4 && { type: 'Other' }
    ].filter(Boolean)
  }

  const toggleExpandedRow = (email: string) => {
    if (expandedRow === email) {
      setExpandedRow(null)
    } else {
      setExpandedRow(email)
    }
  }

  return (
    <>
      <div
        onClick={() => toggleExpandedRow(email)}
        className="grid grid-cols-12 h-12 gap-x-3 bg-midnightblack pl-4 pr-2 border-l-4 border-l-lime-500 items-center cursor-pointer font-lato hover:bg-inkblack duration-300"
      >
        <div className="col-span-3 min-w-0 truncate">{name}</div>
        <div className="col-span-2 min-w-0 truncate">{email}</div>
        <div className="col-span-2 min-w-0 truncate">{phoneNumber}</div>
        <div className="col-span-2 min-w-0 truncate">
          {formatDate(createdAt, {
            minute: 'numeric',
            second: 'numeric',
            hour: 'numeric'
          })}
        </div>
        <div className="col-span-2 min-w-0 truncate w-full justify-center items-end flex">
          <Pill status={status} />
        </div>
        <div className="col-span-1 min-w-0 truncate w-full justify-center items-end flex">
          <Link
            target="_blank"
            href={`https://us2.admin.mailchimp.com/audience/contact-profile?contact_id=${contactId}`}
          >
            <AwesomeIcon icon={externalLinkIcon} className="w-4 h-4 text-lime-500" />
          </Link>
        </div>
      </div>

      {expandedRow === email && (
        <div className="grid grid-cols-12 gap-y-3 990:gap-x-16 bg-midnightblack text-white mt-2 p-6 font-lato">
          <div className="col-span-12 990:col-span-4 pb-4">
            <h3 className="text-2xl font-changa mb-2">Interests</h3>
            {interests?.length > 0 ? (
              <ul className="grid grid-cols-12 gap-3">
                {mappedEnabledOptions(interests).map((option: any, index: number) => (
                  <li key={index} className="col-span-12 1160:col-span-6">
                    {option.type}
                  </li>
                ))}
              </ul>
            ) : (
              'No interests selected'
            )}
          </div>

          <div className="col-span-12 990:col-span-4 pt-4 990:pt-0">
            <h3 className="text-2xl font-changa mb-2">Address</h3>
            {address ? (
              <p>
                {address?.addr1}, {address?.city}, {address?.state} {address?.zip}
              </p>
            ) : (
              'No address provided'
            )}
          </div>
          <div className="col-span-12 990:col-span-4 pt-4 990:pt-0">
            <h3 className="text-2xl font-changa mb-2">Engagement Metrics</h3>
            <ul className="text-zinc-300">
              <li className="flex items-center gap-x-2">
                Average Open Rate: <span className="text-white font-changa text-xl">{stats.avgOpenRate}</span>
              </li>
              <li className="flex items-center gap-x-2">
                Average Click Rate: <span className="text-white font-changa text-xl">{stats.avgClickRate}</span>
              </li>
              <li className="flex items-center gap-x-2 group">
                IP Opt:{' '}
                <Link
                  href={`https://whatismyipaddress.com/ip/${ipOpt}`}
                  target="_blank"
                  className="text-white font-changa text-xl duration-300 group-hover:text-lime-500"
                >
                  {ipOpt}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminMailChimpSubscriberRow
