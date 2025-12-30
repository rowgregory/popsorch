'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  GitBranch,
  Code,
  Zap,
  Shield,
  Settings,
  ChevronDown,
  Search,
  Filter,
  Download,
  TrendingUp,
  ScreenShare
} from 'lucide-react'

interface ChangelogEntry {
  date: string
  version: string
  category: 'feature' | 'improvement' | 'bugfix' | 'security' | 'breaking' | 'ui'
  title: string
  description: string
  author: string
}

const CHANGELOG_DATA: ChangelogEntry[] = [
  {
    date: '2025-12-16',
    version: '1.1.5',
    category: 'security',
    title: 'Next.js Server Component Security Patch',
    description:
      'Updated React, React-DOM, and Next.js dependencies to address critical code injection vulnerability in server components (CVE-2024-XXXX). Patched server-side rendering vulnerability that could allow malicious code execution.',
    author: 'Sqysh'
  },
  {
    date: '2025-12-16',
    version: '1.1.5',
    category: 'security',
    title: 'React Ecosystem Security Updates',
    description:
      'Upgraded entire React ecosystem including react@19, react-dom@19, and related dependencies to latest stable versions. Mitigated server-side injection risks discovered in Next.js server components affecting multiple production applications.',
    author: 'Sqysh'
  },
  {
    date: '2025-12-17',
    version: '2.5.32',
    category: 'feature',
    title: 'Automated Sitemap Generation',
    description:
      'Implemented next-sitemap with App Router support for automatic sitemap.xml and robots.txt generation. Configured to exclude admin and auth routes while including all public pages.',
    author: 'Sqysh'
  },
  {
    date: '2025-12-17',
    version: '2.5.32',
    category: 'improvement',
    title: 'SEO Metadata Enhancement',
    description:
      'Comprehensive SEO optimization with 70+ location-specific keywords targeting Sarasota and Bradenton. Added structured data (JSON-LD), Twitter cards, OpenGraph tags, and geo-targeting metadata for better local search visibility.',
    author: 'Sqysh'
  },
  {
    date: '2025-12-17',
    version: '2.5.32',
    category: 'improvement',
    title: 'Custom 404 Page with Dark Mode',
    description:
      'Created orchestra-themed 404 error page with musical branding, gradient styling. Includes navigation options back to home and concerts.',
    author: 'Sqysh'
  },
  {
    date: '2025-12-17',
    version: '2.5.32',
    category: 'improvement',
    title: 'App Router Sitemap Integration',
    description:
      'Configured next-sitemap to work with Next.js App Router by reading app-paths-manifest.json and automatically generating routes while filtering admin/auth paths.',
    author: 'Sqysh'
  },
  {
    date: '2025-12-17',
    version: '2.5.32',
    category: 'feature',
    title: 'Google Analytics 4 Integration',
    description:
      'Integrated GA4 tracking with proper head placement for analytics detection and user behavior tracking across the site.',
    author: 'Sqysh'
  },

  {
    date: '2025-12-17',
    version: '2.5.32',
    category: 'bugfix',
    title: 'GA4 Script Placement Fix',
    description:
      'Moved Google Analytics 4 tracking script from body to head tag for proper detection by GA4 dashboard. Ensures accurate analytics tracking and resolves tag detection issues.',
    author: 'Sqysh'
  },
  {
    date: '2025-12-30',
    version: '2.5.33',
    category: 'ui',
    title: 'Ice Queen Analytics Theme Redesign',
    description:
      'Rethemed analytics announcement card with winter/ice-queen fantasy aesthetic. Updated color scheme from festive reds/greens to cyan/blue/purple frost palette, enchanted dialogue, new sound effect, and floating snowflake animations.',
    author: 'Sqysh'
  }
]

const CATEGORY_CONFIG = {
  feature: {
    label: 'Feature',
    icon: Zap,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30'
  },
  improvement: {
    label: 'Improvement',
    icon: Settings,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30'
  },
  bugfix: {
    label: 'Bug Fix',
    icon: Code,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30'
  },
  security: {
    label: 'Security',
    icon: Shield,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30'
  },
  breaking: {
    label: 'Breaking',
    icon: Zap,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30'
  },
  ui: {
    label: 'Ui',
    icon: ScreenShare,
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-500/30'
  }
}

export default function ChangelogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null)

  const filteredChangelog = useMemo(() => {
    return CHANGELOG_DATA.filter((entry) => {
      const matchesSearch =
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = !selectedCategory || entry.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const stats = [
    { label: 'Total Updates', value: CHANGELOG_DATA.length, change: '+6 this month' },
    { label: 'Features', value: CHANGELOG_DATA.filter((e) => e.category === 'feature').length, change: '+2 new' },
    {
      label: 'Improvements',
      value: CHANGELOG_DATA.filter((e) => e.category === 'improvement').length,
      change: '+3 enhanced'
    },
    { label: 'Security', value: CHANGELOG_DATA.filter((e) => e.category === 'security').length, change: '+1 patched' }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <GitBranch className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Changelog</h2>
              <p className="text-neutral-400">Track updates and improvements to The Pops Orchestra</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-x-3 lg:space-y-0 mt-3 lg:mt-0">
            <button className="px-4 py-2 bg-neutral-800/50 hover:bg-neutral-700/50 rounded-lg text-neutral-300 border border-neutral-600/50 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 bg-neutral-800/50 hover:bg-neutral-700/50 rounded-lg text-neutral-300 border border-neutral-600/50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50 hover:border-neutral-600/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-400 text-sm font-medium">{stat.label}</h3>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm rounded-2xl border border-neutral-700/50 p-6 mb-6"
        >
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search changelog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-900/50 border border-neutral-700/50 text-white rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent placeholder:text-neutral-500"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50 border border-neutral-700/50'
              }`}
            >
              All
            </button>
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
              const Icon = config.icon
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === key
                      ? `${config.bg} ${config.color} border ${config.border}`
                      : 'bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50 border border-neutral-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {config.label}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Changelog Entries */}
        <div className="space-y-4">
          {filteredChangelog.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm rounded-2xl border border-neutral-700/50 p-12 text-center"
            >
              <p className="text-neutral-400">No changelog entries found</p>
            </motion.div>
          ) : (
            filteredChangelog
              .map((entry, index, arr) => {
                const config = CATEGORY_CONFIG[entry.category]
                const Icon = config.icon
                const isExpanded = expandedEntry === index

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (arr.length - 1 - index) * 0.05 }}
                    className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm rounded-2xl border border-neutral-700/50 hover:border-neutral-600/50 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setExpandedEntry(isExpanded ? null : index)}
                      className="w-full p-6 text-left"
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0 border ${config.border}`}
                        >
                          <Icon className={`w-6 h-6 ${config.color}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.color} ${config.border}`}
                            >
                              {config.label}
                            </span>
                            <span className="text-xs text-neutral-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(entry.date)}
                            </span>
                            <span className="text-xs text-neutral-500">v{entry.version}</span>
                          </div>

                          <h3 className="text-lg font-semibold text-white mb-1">{entry.title}</h3>

                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3"
                            >
                              <p className="text-sm text-neutral-300 leading-relaxed">{entry.description}</p>
                              <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500">
                                <span>Author:</span>
                                <span className="font-medium text-neutral-400">{entry.author}</span>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Expand Icon */}
                        <ChevronDown
                          className={`w-5 h-5 text-neutral-400 transition-transform flex-shrink-0 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>
                  </motion.div>
                )
              })
              .reverse()
          )}
        </div>
      </div>
    </div>
  )
}
