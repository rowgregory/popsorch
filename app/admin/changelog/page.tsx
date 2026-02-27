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
    version: '3.3.1',
    date: '2026-02-27',
    changes: [
      {
        type: 'feature',
        title: 'About Page Unlocked in Page Content Editor',
        description:
          'The About page is now fully editable via the admin page content editor. All text content is driven by a flat data array keyed by id, replacing the previous hardcoded pageContent object.',
        impact: 'high'
      },
      {
        type: 'refactor',
        title: 'About Page Content Model — Flat Array Structure',
        description:
          'Replaced nested pageContent.body object with a flat aboutPageContent array. Each field is identified by a unique id, typed as text, and grouped by section (aside, body, additional_details). AboutClient resolves values via a field(id) helper instead of direct property access.',
        impact: 'medium'
      },
      {
        type: 'ui',
        title: 'About Page Content Fields',
        description:
          'Added 9 editable fields: about_aside_heading, about_aside_subheading, about_aside_paragraph, about_paragraph_1 through about_paragraph_4, about_detail_1, and about_detail_2. All fields are now surfaced in the page content editor under the About section.',
        impact: 'medium'
      }
    ]
  },
  {
    version: '3.2.0',
    date: '2026-02-27',
    changes: [
      {
        type: 'feature',
        title: 'Full ADA / WCAG 2.1 AA Compliance — Homepage',
        description:
          'Audited and updated all homepage components to meet ADA and WCAG 2.1 AA standards. Changes span semantic HTML, ARIA landmarks, keyboard navigation, focus management, screen reader support, and motion accessibility.',
        impact: 'high'
      },
      {
        type: 'improvement',
        title: 'Semantic Landmark Regions',
        description:
          'Replaced non-semantic divs with proper HTML5 landmarks: <section>, <article>, <nav>, <footer>, and <ul>/<li> throughout HomeHero, HomeConcerts, HomeContact, HomeSponsors, HomeNewsletter, and Footer. Every section is now associated with its heading via aria-labelledby.',
        impact: 'high'
      },
      {
        type: 'improvement',
        title: 'Heading Hierarchy & Screen Reader Fixes',
        description:
          'Fixed HomeHero heading split across two divs — now a single <h1> with sr-only full text and aria-hidden visual spans, ensuring screen readers announce one coherent heading. All section headings use id/aria-labelledby pairing.',
        impact: 'high'
      },
      {
        type: 'improvement',
        title: 'Decorative Content Hidden from Assistive Technology',
        description:
          'All decorative elements — background images, carousel, icon wrappers, animated shimmer/pulse effects, dividers, and chevron icons — now carry aria-hidden="true" and/or role="presentation" to prevent noise in the accessibility tree.',
        impact: 'medium'
      },
      {
        type: 'improvement',
        title: 'Keyboard Navigation & Focus Rings',
        description:
          'Replaced focus:ring with focus-visible:ring across all interactive elements (buttons, links, social icons, scroll-to-top). Removes visible ring on mouse click while preserving full keyboard navigation indicators. All rings meet 3:1 contrast ratio.',
        impact: 'high'
      },
      {
        type: 'improvement',
        title: 'Descriptive ARIA Labels on Interactive Elements',
        description:
          'Added aria-label to all ambiguous links and buttons including the hero CTA, concert card actions, contact methods, social media links (with platform name and "opens in new tab"), footer links, logo link, and scroll-to-top button.',
        impact: 'high'
      },
      {
        type: 'improvement',
        title: 'Scroll-to-Top Accessibility Fix',
        description:
          'Replaced non-interactive ChevronUp icon with a proper <button type="button" aria-label="Scroll back to top"> element, making it keyboard focusable and screen reader announced.',
        impact: 'medium'
      },
      {
        type: 'improvement',
        title: 'Concert Cards Semantic List & Article Structure',
        description:
          'Concert grid converted from div-based layout to <ul role="list"> with <li> wrappers. Each card wrapped in <article> with aria-label. Event detail rows converted to <ul>/<li>. Dates wrapped in <time dateTime> elements.',
        impact: 'medium'
      },
      {
        type: 'improvement',
        title: 'External Link Safety & Disclosure',
        description:
          'All external links now include rel="noopener noreferrer" and aria-label disclosing "(opens in new tab)" for screen reader users. Applied across footer social links, quick links, and developer credit.',
        impact: 'medium'
      },
      {
        type: 'improvement',
        title: 'Prefers-Reduced-Motion Support',
        description:
          'Integrated Framer Motion useReducedMotion() hook into HomeHero. Entrance animations, hover/tap effects, shimmer sweep, and pulse dot are disabled or set to duration: 0 when the OS-level reduced motion preference is active. Carousel auto-advance paused for reduced-motion users.',
        impact: 'high'
      },
      {
        type: 'refactor',
        title: 'GA Event Helper — sendEnrichedGAEvent',
        description:
          'Extracted repeated Google Analytics payload construction into a reusable sendEnrichedGAEvent(eventName, value, label, section, extras?) utility. Automatically appends scroll depth, time on page, referrer, viewport dimensions, device type, and timestamp to every event. Accepts an optional extras object for event-specific fields.',
        impact: 'medium'
      },
      {
        type: 'improvement',
        title: 'Sponsor Section Landmark Structure',
        description:
          'Each sponsor tier converted from motion.div to motion.section with aria-labelledby tied to a slugified id on the tier <h3>. Sponsor grids converted to <ul role="list">/<li> for proper list semantics.',
        impact: 'low'
      }
    ]
  },
  {
    version: '3.1.2',
    date: '2026-02-26',
    changes: [
      {
        type: 'feature',
        title: 'Google Firebase Dashboard Card',
        description:
          'Added a Firebase credentials card to the admin dashboard displaying the account email and masked password with show/hide toggle, copy-to-clipboard for both fields, and a direct link to the Firebase Console.',
        impact: 'medium'
      }
    ]
  },
  {
    version: '3.1.1',
    date: '2026-02-25',
    changes: [
      {
        type: 'feature',
        title: 'Saturday Added to Camp Schedule',
        description:
          'Added Saturday as an editable day to the camp application sidebar schedule, allowing admins to update it via the page content editor.',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Footer CMS Integration',
        description:
          'Replaced all hardcoded footer content with data from the page content editor. Social links, quick links, contact info, and tagline are now fully editable from the admin dashboard.',
        impact: 'low'
      },
      {
        type: 'feature',
        title: 'Footer Unlocked in Content Editor',
        description: 'Unlocked the footer section in the page content editor.',
        impact: 'low'
      },
      {
        type: 'ui',
        title: 'Footer Redesign',
        description:
          'Redesigned the footer with a centered logo, social icons, three-column grid, and a slim bottom bar with copyright and Sqysh credit.',
        impact: 'low'
      },
      {
        type: 'ui',
        title: 'Hero Section Responsive Updates',
        description:
          'Updated the home hero to cap at 1000px height, be responsive down to 320px, and adjusted heading sizing to match a large name/subtitle layout.',
        impact: 'low'
      },
      {
        type: 'improvement',
        title: 'Page Selector Modal Mobile Responsiveness',
        description:
          'Updated the page selector modal to slide up from the bottom on mobile with a max height and scroll, and display as a centered modal on desktop.',
        impact: 'low'
      },
      {
        type: 'ui',
        title: 'Toast Redesign',
        description:
          'Redesigned the toast notification to match the Pops theme with a dark card, colored left border accent per type, and a compact close button.',
        impact: 'low'
      },
      {
        type: 'improvement',
        title: 'Breadcrumb Mobile Responsiveness',
        description:
          'Updated the breadcrumb component to be compact and responsive down to 320px with flex-wrap and truncation.',
        impact: 'low'
      }
    ]
  },
  {
    version: '3.1.0',
    date: '2026-02-24',
    changes: [
      {
        type: 'feature',
        title: 'Resend Integration',
        description:
          'Replaced web-push notifications with Resend for transactional emails. Includes contact form notifications and camp application notifications.',
        impact: 'high'
      },
      {
        type: 'ui',
        title: 'Camp Application Form Redesign',
        description: 'Redesigned the camp application.',
        impact: 'medium'
      },
      {
        type: 'feature',
        title: 'Camp Application Page in Content Editor',
        description: 'Unlocked the camp application page within the page content editor.',
        impact: 'medium'
      },
      {
        type: 'ui',
        title: 'Resend Card',
        description:
          'Updated the Resend dashboard card to display login credentials with show/hide password and copy buttons.',
        impact: 'low'
      },
      {
        type: 'refactor',
        title: 'Removed Swiper Dependency',
        description: 'Removed Swiper and replaced it with a custom carousel on the home hero.',
        impact: 'medium'
      },
      {
        type: 'security',
        title: 'Dependency Audit',
        description:
          'Added npm overrides for minimatch and bn.js to resolve 11 audit vulnerabilities across ESLint and web-push transitive dependencies.',
        impact: 'medium'
      },
      {
        type: 'improvement',
        title: 'Node.js Upgrade',
        description:
          'Upgraded from Node 23 to Node 22 LTS via Homebrew to resolve engine compatibility warnings across dev tooling.',
        impact: 'low'
      },
      {
        type: 'feature',
        title: 'Camp Application Submission',
        description:
          'Wired up the createCampApplication server action to the multi-step form. Includes a success modal on completion and a loading state on the submit button.',
        impact: 'high'
      },
      {
        type: 'feature',
        title: 'Admin Camp Applications Page',
        description:
          'Built the admin camp applications page with applications grouped and sorted by year (newest first), bulk selection, and delete confirmation modal.',
        impact: 'high'
      },
      {
        type: 'ui',
        title: 'Camp Application View Drawer Redesign',
        description:
          'Redesigned the camp application view drawer to match the Pops theme with section icons, field cards, and a gradient close button.',
        impact: 'medium'
      },
      {
        type: 'ui',
        title: 'Delete Confirmation Modal Redesign',
        description:
          'Redesigned the delete confirmation modal to match the Pops theme with a dark card, gradient bar, and blaze red delete button.',
        impact: 'low'
      },
      {
        type: 'feature',
        title: 'Camp Application Email Notification',
        description:
          'Added automated admin email notification via Resend when a new camp application is submitted, sent to info@ and robyn@thepopsorchestra.org.',
        impact: 'medium'
      },
      {
        type: 'improvement',
        title: 'Admin Header Tooltips',
        description:
          'Added tooltip-on-hover to all admin action buttons and the logout button, showing labels below on hover.',
        impact: 'low'
      },
      {
        type: 'feature',
        title: 'Camp Applications Publish Toggle',
        description:
          'Added a publish/unpublish button to the admin camp applications header to show or hide the camp application form on the public site, powered by the SiteSetting model.',
        impact: 'medium'
      }
    ]
  },
  {
    version: '3.0.7',
    date: '2026-02-19',
    changes: [
      {
        type: 'ui',
        title: 'Sold Out verbiage update',
        description:
          'Updated ticket availability label to "Sold Out" for clearer, more standard language across concert listings.',
        impact: 'low'
      },
      {
        type: 'feature',
        title: 'HostGator Credentials Card',
        description:
          'Added a HostGator card to the admin credentials dashboard for quick access to web hosting and domain management.',
        impact: 'low'
      },
      {
        type: 'feature',
        title: 'Mailchimp Credentials Card',
        description:
          'Added a Mailchimp card to the admin credentials dashboard for quick access to email marketing and campaign management.',
        impact: 'low'
      },
      {
        type: 'feature',
        title: 'Resend Credentials Card',
        description:
          'Added a Resend card to the admin credentials dashboard showing connection status for the transactional email service.',
        impact: 'low'
      }
    ]
  },
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

const Changelog = () => {
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredChangelog = changelogData
    .map((entry) => ({
      ...entry,
      changes: selectedType === 'all' ? entry.changes : entry.changes.filter((change) => change.type === selectedType)
    }))
    .filter((entry) => entry.changes.length > 0)

  return (
    <div className="h-[calc(100vh-66px)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-br from-neutral-900 to-neutral-950 border-b border-neutral-800"
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
              <div className="bg-linear-to-r from-indigo-500/10 to-purple-500/10 border-b border-neutral-800 px-6 py-4">
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
