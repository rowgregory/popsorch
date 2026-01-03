import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, BarChart3, Users, TrendingUp, Clock, Share2 } from 'lucide-react'
import { useState } from 'react'
import { useAppDispatch, useDashboardSelector } from '@/app/redux/store'
import { setCloseGA4Drawer, setOpenGA4Drawer } from '@/app/redux/features/dashboardSlice'

export const GA4GuideDrawer = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview')
  const { ga4 } = useDashboardSelector()
  const dispatch = useAppDispatch()

  const sections = [
    {
      id: 'overview',
      title: 'Dashboard Overview',
      icon: BarChart3,
      description: 'Understanding the main GA4 interface',
      content: [
        {
          label: 'Real-time Report',
          explanation: 'Shows active users on your site right now. Great for monitoring special events or promotions.'
        },
        {
          label: 'Key Metrics Card',
          explanation: 'Displays your top KPIs (Key Performance Indicators) like users, sessions, and engagement rate.'
        },
        {
          label: 'Date Range Selector',
          explanation: 'Compare different time periods to track trends and seasonal patterns.'
        }
      ]
    },
    {
      id: 'users',
      title: 'User Metrics',
      icon: Users,
      description: 'Know your audience',
      content: [
        {
          label: 'Total Users',
          explanation: 'Unique visitors to your site. A higher number means more reach.'
        },
        {
          label: 'Active Users',
          explanation: 'Users engaged with your content (completing actions, spending time).'
        },
        {
          label: 'User Retention',
          explanation: 'Percentage of users who return. Higher retention = loyal audience.'
        },
        {
          label: 'Demographics',
          explanation: 'Age, gender, and location data helps tailor your content strategy.'
        }
      ]
    },
    {
      id: 'engagement',
      title: 'Engagement Metrics',
      icon: TrendingUp,
      description: 'How visitors interact with content',
      content: [
        {
          label: 'Session Duration',
          explanation: 'Average time spent per session. Longer = more interested users.'
        },
        {
          label: 'Bounce Rate',
          explanation: 'Percentage of visitors who leave without interacting. Lower is better.'
        },
        {
          label: 'Page Views',
          explanation: 'Total number of page visits. Track which pages get the most attention.'
        },
        {
          label: 'Conversions',
          explanation: 'Completed goals (ticket purchases, sign-ups). Track revenue impact.'
        }
      ]
    },
    {
      id: 'traffic',
      title: 'Traffic Sources',
      icon: Share2,
      description: 'Where visitors come from',
      content: [
        {
          label: 'Organic Search',
          explanation: 'Visitors from Google search results. Indicates SEO effectiveness.'
        },
        {
          label: 'Direct Traffic',
          explanation: 'Users who typed your URL directly or came from bookmarks.'
        },
        {
          label: 'Social Media',
          explanation: 'Visitors from social platforms. Track which networks drive sales.'
        },
        {
          label: 'Referral Traffic',
          explanation: 'Visitors from other websites linking to you.'
        }
      ]
    },
    {
      id: 'events',
      title: 'Events & Goals',
      icon: Clock,
      description: 'Track specific actions',
      content: [
        {
          label: 'Event Tracking',
          explanation: 'Monitor button clicks, video plays, downloads, and custom actions.'
        },
        {
          label: 'Goal Conversion',
          explanation: 'Set specific objectives (concert ticket purchase) and measure success.'
        },
        {
          label: 'Funnel Analysis',
          explanation: 'See where users drop off in your purchase process.'
        }
      ]
    }
  ]

  return (
    <AnimatePresence>
      {ga4 && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setOpenGA4Drawer())}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-gradient-to-b from-sky-950/95 via-sky-900/95 to-blue-950/95 border-l border-sky-500/50 shadow-2xl z-[70] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-sky-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-sky-400" />
                  <h2 className="text-white font-bold text-lg">GA4 Guide</h2>
                </div>
                <button
                  onClick={() => dispatch(setCloseGA4Drawer())}
                  className="p-2 hover:bg-sky-500/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-sky-300" />
                </button>
              </div>
              <p className="text-sky-100 text-sm">Learn to interpret your analytics data</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-3">
                {sections.map((section) => {
                  const Icon = section.icon
                  const isExpanded = expandedSection === section.id

                  return (
                    <motion.div key={section.id} layout>
                      <motion.button
                        onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                        className="w-full flex items-center gap-3 p-4 bg-sky-500/20 hover:bg-sky-500/30 rounded-lg border border-sky-400/50 transition-all group"
                      >
                        <Icon className="w-5 h-5 text-sky-400 flex-shrink-0" />
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-white font-semibold text-sm">{section.title}</p>
                          <p className="text-sky-100 text-xs">{section.description}</p>
                        </div>
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="w-4 h-4 text-sky-400 flex-shrink-0" />
                        </motion.div>
                      </motion.button>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 ml-9 pl-4 border-l-2 border-sky-400/30 space-y-3"
                          >
                            {section.content.map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                              >
                                <p className="text-sky-300 font-medium text-sm">{item.label}</p>
                                <p className="text-sky-100/70 text-xs mt-1 leading-relaxed">{item.explanation}</p>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 p-6 border-t border-sky-500/30 bg-sky-950/40">
              <p className="text-sky-200/60 text-xs text-center">
                ✨ Winter's Secret: Track your metrics weekly to harness the power of frozen insights!
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
