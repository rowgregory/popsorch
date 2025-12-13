import { FC, useState } from 'react'
import Link from 'next/link'
import { MemberProps } from '@/app/redux/features/mailchimpSlice'
import { ExternalLink, ChevronDown, Heart, TrendingUp, Phone, Calendar } from 'lucide-react'

const AdminMailChimpSubscriberRow: FC<MemberProps> = ({
  contactId,
  email,
  name,
  phoneNumber,
  createdAt,
  status,
  interests,
  stats
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const mappedEnabledOptions = (interests: any) => {
    return [
      interests.isOption1 && { type: 'Season Tickets', icon: '🎫' },
      interests.isOption2 && { type: 'Special Events', icon: '🎉' },
      interests.isOption3 && { type: 'Youth Education', icon: '🎓' },
      interests.isOption4 && { type: 'Other', icon: '📌' }
    ].filter(Boolean)
  }

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'subscribed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'unsubscribed':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'cleaned':
        return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'
      default:
        return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'
    }
  }

  return (
    <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl overflow-hidden hover:border-neutral-600/70 transition-all">
      {/* Main Card */}
      <div onClick={() => setIsExpanded(!isExpanded)} className="p-4 cursor-pointer group">
        <div className="flex items-center justify-between gap-4">
          {/* User Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
              {name?.charAt(0)?.toUpperCase() || email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-white font-semibold truncate">{name || 'No name'}</h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getStatusStyle(
                    status
                  )}`}
                >
                  {status}
                </span>
              </div>
              <p className="text-neutral-400 text-sm truncate">{email}</p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="hidden md:flex items-center gap-6">
            {phoneNumber && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-500" />
                <span className="text-neutral-300 text-sm">{phoneNumber}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-500" />
              <span className="text-neutral-400 text-sm">
                {new Date(createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              target="_blank"
              href={`https://us2.admin.mailchimp.com/audience/contact-profile?contact_id=${contactId}`}
              onClick={(e) => e.stopPropagation()}
              className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-emerald-400 hover:text-emerald-300" />
            </Link>
            <ChevronDown
              className={`w-5 h-5 text-neutral-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-neutral-700/50 bg-neutral-900/50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interests */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-emerald-400" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Interests</h3>
              </div>
              {mappedEnabledOptions(interests).length > 0 ? (
                <div className="space-y-2">
                  {mappedEnabledOptions(interests).map((option: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-2 bg-neutral-800/50 rounded-lg">
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-neutral-300 text-sm">{option.type}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 text-sm italic">No interests selected</p>
              )}
            </div>

            {/* Engagement Metrics */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="text-white font-bold text-sm uppercase tracking-wider">Engagement</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-neutral-800/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-neutral-400 text-xs">Open Rate</span>
                    <span className="text-emerald-400 font-bold text-lg">{stats.avgOpenRate}%</span>
                  </div>
                  <div className="w-full bg-neutral-700 rounded-full h-1.5">
                    <div
                      className="bg-emerald-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${stats.avgOpenRate}%` }}
                    />
                  </div>
                </div>

                <div className="bg-neutral-800/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-neutral-400 text-xs">Click Rate</span>
                    <span className="text-teal-400 font-bold text-lg">{stats.avgClickRate}%</span>
                  </div>
                  <div className="w-full bg-neutral-700 rounded-full h-1.5">
                    <div
                      className="bg-teal-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${stats.avgClickRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminMailChimpSubscriberRow
