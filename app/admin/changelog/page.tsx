'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GitBranch, CheckCircle2, AlertCircle, Info, Tag, Calendar, Shield, Palette } from 'lucide-react'

interface ChangelogEntry {
  version: string
  date: string
  changes: {
    type: 'feature' | 'improvement' | 'bugfix' | 'breaking' | 'ui' | 'refactor' | 'security'
    title: string
    description: string
    impact?: 'high' | 'medium' | 'low'
  }[]
}

const changelogData: ChangelogEntry[] = [
  {
    version: '3.0.1',
    date: '2026-01-10',
    changes: [
      {
        type: 'feature',
        title: 'Event Detail On-Sale Toggle',
        description:
          'Added per-event-detail on-sale status. Admin can now control ticket availability at the venue/date level independently. Shows "Call Box Office" button when tickets are not on sale.',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Past Event Indicator',
        description:
          'Automatically detects and displays completed shows. Past events are visually dimmed with "Show Completed" button, preventing accidental ticket purchase attempts for historical dates.',
        impact: 'medium'
      },
      {
        type: 'improvement',
        title: 'Available Dates Display',
        description:
          'Concert cards now show all on-sale dates in a compact badge. Updated the multiple dates indicator to filter and display only venues with active ticket sales.',
        impact: 'low'
      }
    ]
  },
  {
    version: '3.0.0',
    date: '2026-01-02',
    changes: [
      {
        type: 'feature',
        title: 'Server Actions Architecture',
        description:
          'Migrated from API routes to Next.js server actions for all CRUD operations. Implemented type-safe end-to-end mutations with automatic serialization and built-in CSRF protection. Removed unnecessary REST API boilerplate.',
        impact: 'high'
      },
      {
        type: 'feature',
        title: 'Advanced Logging System',
        description:
          'Integrated comprehensive logging for all server actions tracking info, errors, and debug events. Logs include metadata context for better debugging and audit trails. Accessible through admin dashboard for super users.',
        impact: 'high'
      },
      {
        type: 'improvement',
        title: 'Admin Dashboard UI Overhaul',
        description:
          'Redesigned public authentication pages with modern split-layout authentication pages (login, register, forgot-password). Added loading states, error handling, and success/error toast notifications throughout. Improved visual hierarchy and user feedback.',
        impact: 'high'
      },
      {
        type: 'feature',
        title: 'Dynamic Content Management System (The Cauldron)',
        description:
          'Launched comprehensive page content editor allowing admins to manage frontend page data without code. Features live preview, folder-based organization, and real-time updates across the application. Home page only available currently.',
        impact: 'high'
      },
      {
        type: 'feature',
        title: 'User Profile Management',
        description:
          'Added comprehensive user settings page with audio preferences (sound effects), notification toggles, and account status display. Real-time updates with optimistic UI patterns.',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Granular Data Fetching',
        description:
          'Refactored data fetching into specialized server actions (getUser, getConcerts, getTeamMembers, getSponsors) with unstable_cache optimization. Implemented selective cache revalidation per resource type.',
        impact: 'high'
      },
      {
        type: 'feature',
        title: 'CRUD Operations for Content',
        description:
          'Implemented complete create, read, update, delete operations for Concerts, Sponsors, Team Members, Venues, and Questions. All mutations include validation, error handling, and cache invalidation.',
        impact: 'high'
      },
      {
        type: 'improvement',
        title: 'Authentication System Enhancement',
        description:
          'Improved JWT-based authentication with secure middleware routing, cookie management, and automatic redirects. Added role-based access control distinguishing admins and super users',
        impact: 'high'
      },
      {
        type: 'improvement',
        title: 'Redux State Management',
        description:
          'Optimized Redux usage limiting to client-side UI state (toasts, modals, permissions). Separated server data concerns from client state, reducing complexity and improving maintainability.',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Dynamic Metadata Generation',
        description:
          'Implemented dynamic SEO metadata for concert pages with OpenGraph, Twitter cards, and structured data. Metadata updates automatically based on concert details.',
        impact: 'medium'
      }
    ]
  },
  {
    version: '2.5.33',
    date: '2025-12-30',
    changes: [
      {
        type: 'ui',
        title: 'Ice Queen Analytics Theme Redesign',
        description:
          'Rethemed analytics announcement card with winter/ice-queen fantasy aesthetic. Updated color scheme from festive reds/greens to cyan/blue/purple frost palette, enchanted dialogue, new sound effect, and floating snowflake animations.',
        impact: 'low'
      },
      {
        type: 'feature',
        title: 'Facebook Pixel Coming Soon Component',
        description:
          'Created new winter-themed coming soon component for Meta Pixel integration. Features ice shard animations. Designed for dashboard sidebar with responsive 400-700px width.',
        impact: 'medium'
      }
    ]
  },
  {
    version: '2.5.32',
    date: '2025-12-17',
    changes: [
      {
        type: 'feature',
        title: 'Automated Sitemap Generation',
        description:
          'Implemented next-sitemap with App Router support for automatic sitemap.xml and robots.txt generation. Configured to exclude admin and auth routes while including all public pages.',
        impact: 'high'
      },
      {
        type: 'improvement',
        title: 'SEO Metadata Enhancement',
        description:
          'Comprehensive SEO optimization with 70+ location-specific keywords targeting Sarasota and Bradenton. Added structured data (JSON-LD), Twitter cards, OpenGraph tags, and geo-targeting metadata for better local search visibility.',
        impact: 'high'
      },
      {
        type: 'improvement',
        title: 'Custom 404 Page with Dark Mode',
        description:
          'Created orchestra-themed 404 error page with musical branding, gradient styling. Includes navigation options back to home and concerts.',
        impact: 'medium'
      },
      {
        type: 'improvement',
        title: 'App Router Sitemap Integration',
        description:
          'Configured next-sitemap to work with Next.js App Router by reading app-paths-manifest.json and automatically generating routes while filtering admin/auth paths.',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Google Analytics 4 Integration',
        description:
          'Integrated GA4 tracking with proper head placement for analytics detection and user behavior tracking across the site.',
        impact: 'high'
      },
      {
        type: 'bugfix',
        title: 'GA4 Script Placement Fix',
        description:
          'Moved Google Analytics 4 tracking script from body to head tag for proper detection by GA4 dashboard. Ensures accurate analytics tracking and resolves tag detection issues.',
        impact: 'medium'
      }
    ]
  },
  {
    version: '1.1.5',
    date: '2025-12-16',
    changes: [
      {
        type: 'security',
        title: 'Next.js Server Component Security Patch',
        description:
          'Updated React, React-DOM, and Next.js dependencies to address critical code injection vulnerability in server components (CVE-2024-XXXX). Patched server-side rendering vulnerability that could allow malicious code execution.',
        impact: 'high'
      },
      {
        type: 'security',
        title: 'React Ecosystem Security Updates',
        description:
          'Upgraded entire React ecosystem including react@19, react-dom@19, and related dependencies to latest stable versions. Mitigated server-side injection risks discovered in Next.js server components affecting multiple production applications.',
        impact: 'high'
      }
    ]
  }
]

const Changelog = () => {
  const [selectedType, setSelectedType] = useState<string>('all')

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      case 'improvement':
        return <GitBranch className="w-4 h-4 text-cyan-400" />
      case 'bugfix':
        return <AlertCircle className="w-4 h-4 text-orange-400" />
      case 'security':
        return <Shield className="w-4 h-4 text-red-400" />
      case 'ui':
        return <Palette className="w-4 h-4 text-purple-400" />
      default:
        return <Info className="w-4 h-4 text-neutral-400" />
    }
  }

  const filteredChangelog = changelogData
    .map((entry) => ({
      ...entry,
      changes: selectedType === 'all' ? entry.changes : entry.changes.filter((change) => change.type === selectedType)
    }))
    .filter((entry) => entry.changes.length > 0)

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
      case 'improvement':
        return 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
      case 'bugfix':
        return 'bg-orange-500/20 border-orange-500/50 text-orange-400'
      case 'security':
        return 'bg-red-500/20 border-red-500/50 text-red-400'
      case 'ui':
        return 'bg-purple-500/20 border-purple-500/50 text-purple-400'
      default:
        return 'bg-neutral-700/50 border-neutral-600 text-neutral-300'
    }
  }

  const getImpactBadge = (impact: string) => {
    const impactColors = {
      critical: 'bg-red-500/20 text-red-300 border-red-500/30',
      high: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      low: 'bg-neutral-700/50 text-neutral-300 border-neutral-600'
    }

    return (
      <span
        className={`px-2 py-0.5 rounded text-xs font-medium border capitalize ${
          impactColors[impact] || impactColors.low
        }`}
      >
        {impact}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-neutral-900 to-neutral-950 border-b border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Changelog</h1>
              <p className="text-neutral-400 text-sm sm:text-base mt-1">
                Track all updates, improvements, and new features to the platform
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Tabs */}
        <div className="mb-8 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              selectedType === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700'
            }`}
          >
            All Changes
          </button>
          <button
            onClick={() => setSelectedType('feature')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
              selectedType === 'feature'
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Features
          </button>
          <button
            onClick={() => setSelectedType('improvement')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
              selectedType === 'improvement'
                ? 'bg-cyan-600 text-white'
                : 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            Improvements
          </button>
          <button
            onClick={() => setSelectedType('bugfix')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
              selectedType === 'bugfix'
                ? 'bg-orange-600 text-white'
                : 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            Bug Fixes
          </button>
          <button
            onClick={() => setSelectedType('security')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
              selectedType === 'security'
                ? 'bg-red-600 text-white'
                : 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            Security
          </button>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-8">
          {filteredChangelog.map((entry, index) => (
            <motion.div
              key={entry.version}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-900/50 rounded-2xl shadow-sm border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors"
            >
              {/* Version Header */}
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-neutral-800 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Tag className="w-6 h-6 text-indigo-400" />
                    <div>
                      <h2 className="text-xl font-bold text-white">Version {entry.version}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-neutral-500" />
                        <span className="text-sm text-neutral-400">
                          {new Date(`${entry.date}T12:00:00`).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30">
                    {entry.changes.length} {entry.changes.length === 1 ? 'change' : 'changes'}
                  </div>
                </div>
              </div>

              {/* Changes List */}
              <div className="p-6 space-y-4">
                {entry.changes.map((change, changeIndex) => (
                  <motion.div
                    key={changeIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + changeIndex * 0.05 }}
                    className="flex gap-4 p-4 rounded-lg hover:bg-neutral-800/50 transition-colors border border-neutral-800"
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${getTypeColor(
                        change.type
                      )}`}
                    >
                      {getTypeIcon(change.type)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-semibold text-white">{change.title}</h3>
                        <div className="flex items-center gap-2">
                          {getImpactBadge(change.impact)}
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium border ${getTypeColor(change.type)}`}
                          >
                            {change.type}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">{change.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredChangelog.length === 0 && (
          <div className="text-center py-12 bg-neutral-900/50 rounded-2xl border border-neutral-800">
            <Info className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-400">No changes found for the selected filter</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Changelog
