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
    version: '3.0.6',
    date: '2026-02-16',
    changes: [
      {
        type: 'improvement',
        title: 'Mailchimp Environment Variable Guard',
        description:
          'Added an explicit check for MAILCHIMP_API_KEY and MAILCHIMP_LIST_ID environment variables at the start of the subscribe route, returning a clear 500 error if either is missing rather than crashing silently.',
        impact: 'medium'
      },
      {
        type: 'refactor',
        title: 'Consolidated Newsletter Form Logic',
        description:
          'Moved all newsletter form logic directly into the NewsletterForm child component, simplifying the overall form architecture.',
        impact: 'medium'
      },
      {
        type: 'bugfix',
        title: 'Conditional Phone Number in Mailchimp Payload',
        description:
          'Updated the subscribeUser function to only include the phone number merge field in the Mailchimp payload when a phone number is provided, preventing validation errors for optional fields.',
        impact: 'medium'
      }
    ]
  },
  {
    version: '3.0.5',
    date: '2026-02-13',
    changes: [
      {
        type: 'improvement',
        title: 'Questions Table View',
        description:
          'Converted the questions card grid layout to a responsive table for better readability and scalability as submissions grow.',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Full Message Modal',
        description:
          'Added a click-to-expand modal on the message column so admins can read the full submission without leaving the page.',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Delete Question',
        description:
          'Added a delete button to each row in the questions table with a loading state to prevent duplicate actions.',
        impact: 'low'
      }
    ]
  },
  {
    version: '3.0.4',
    date: '2026-02-10',
    changes: [
      {
        type: 'improvement',
        title: 'Migrated to Tailwind v4',
        description:
          'Moved all theme configuration into globals.css using the new @theme syntax, removed legacy @tailwind directives and cleaned up redundant media queries.',
        impact: 'high'
      },
      {
        type: 'improvement',
        title: 'Autofill Input Override',
        description:
          'Added webkit autofill background and text color overrides to prevent browser autofill from rendering with incorrect light mode styles.',
        impact: 'medium'
      },
      {
        type: 'improvement',
        title: 'Accessibility Settings Persistence Fix',
        description:
          'Fixed accessibility drawer settings not persisting on page reload. Migrated state initialization to localStorage-seeded useState and applied DOM changes directly on mount.',
        impact: 'high'
      },
      {
        type: 'refactor',
        title: 'High Contrast Mode Refactor',
        description:
          'Replaced body.high-contrast class-based approach with data-high-contrast attribute on documentElement for more reliable and semantic DOM targeting.',
        impact: 'medium'
      },
      {
        type: 'ui',
        title: 'Ticket Card Sold Out State',
        description:
          'Added sold out support to ticket tier cards on the Golden Bubbles Bash page. Sold out cards render with grayscale, reduced opacity, a rotated stamp overlay, greyed accent bar and a disabled CTA button.',
        impact: 'medium'
      },
      {
        type: 'ui',
        title: '404 Page Dark Mode Update',
        description:
          'Removed all light mode and dark: variant classes from the 404 page, updated to use dark-only neutrals and existing brand color tokens.',
        impact: 'low'
      },
      {
        type: 'refactor',
        title: 'globals.css Reorganization',
        description:
          'Restructured globals.css into clearly defined sections: imports, theme inline, root variables, theme tokens, font face, keyframes, base styles, autofill, accessibility, and component overrides.',
        impact: 'low'
      },
      {
        type: 'improvement',
        title: 'Upgraded to Next.js v16.1.6',
        description:
          'Updated Next.js to v16.1.6 to take advantage of the latest performance improvements, bug fixes and framework features.',
        impact: 'high'
      },
      {
        type: 'feature',
        title: 'Added sitemap.ts',
        description:
          'Implemented a dynamic sitemap.ts to improve search engine discoverability and ensure all public routes are properly indexed.',
        impact: 'medium'
      },
      {
        type: 'bugfix',
        title: 'Jazz Club of Sarasota Broken Image',
        description:
          'Replaced broken external image link for Jazz Club of Sarasota with a local generic fallback photo after the original source was no longer available.',
        impact: 'low'
      },
      {
        type: 'ui',
        title: 'Admin Dashboard Card Layout Redesign',
        description:
          'Fully redesigned the admin dashboard with a new card-based layout. All feature cards rebuilt with consistent structure, dark-only styling, and brand-accurate accent colors including Google Analytics, Meta Pixel, Stripe, The Apothecary and Header Button Studio.',
        impact: 'high'
      },
      {
        type: 'ui',
        title: 'Questions Layout Card Redesign',
        description:
          'Replaced the expandable accordion layout on the questions page with a responsive card grid. All submission data is now visible at once across a 3-column layout with status badges, toggle and delete actions in the card footer.',
        impact: 'medium'
      },
      {
        type: 'ui',
        title: 'Nav Links and Menu Action Button Theme Update',
        description:
          'Updated admin navigation link colors and menu action button to use The Pops brand color tokens, replacing generic neutral styles with theme-consistent blaze and sunburst accents.',
        impact: 'low'
      }
    ]
  },
  {
    version: '3.0.3',
    date: '2026-01-23',
    changes: [
      {
        type: 'feature',
        title: 'About Page Unlocked in The Cauldron',
        description:
          'Unlocked the about page for dynamic content management in The Cauldron. Admins can now edit the about page content including headings, subheadings, paragraphs arrays, and additional details through the admin interface. Extended existing CMS functionality to support the about page with full array and nested object editing capabilities.',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Flexible Sponsor Management System',
        description:
          'Completely redesigned sponsor form to give administrators full flexibility. Admins can now enter custom sponsorship amounts and create their own sponsor level categories on-the-fly for each sponsor, allowing for unique categorization without being limited to predefined options.',
        impact: 'high'
      },
      {
        type: 'improvement',
        title: 'Dynamic Sponsor Grouping and Display',
        description:
          'Enhanced sponsor display to dynamically group sponsors by their custom levels (instead of hardcoded categories) and sort level groups by highest contribution amount. Sponsors are displayed in hierarchical order with dynamic card sizing based on tier. Improved amount parsing to handle various formats including currency symbols and commas.',
        impact: 'medium'
      },
      {
        type: 'improvement',
        title: 'Improved Sponsor Form UX',
        description:
          'Enhanced sponsor form with better visual organization, including two-column layout, icon-labeled fields, inline "Add New Level" functionality, image preview with remove option, and comprehensive field validation with helpful placeholder text.',
        impact: 'low'
      }
    ]
  },
  {
    version: '3.0.2',
    date: '2026-01-21',
    changes: [
      {
        type: 'bugfix',
        title: 'Email Delivery Issue',
        description:
          'Isolated the email delivery issue and added the required SPF DNS record in HostGator to authorize Google servers, preventing emails from being marked as spoofed.',
        impact: 'high'
      }
    ]
  },
  {
    version: '3.0.1',
    date: '2026-01-12',
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
