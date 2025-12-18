import { Metadata } from 'next'

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://thepopsorchestra.org'),
  title: {
    default: 'The Pops Orchestra of Sarasota and Bradenton - Live Classical & Popular Music',
    template: '%s | The Pops Orchestra'
  },
  description:
    'Professional symphony orchestra serving Sarasota and Bradenton, Florida. Experience live classical music, pops concerts, and family-friendly performances. Affordable tickets, award-winning musicians, and community music education programs.',
  keywords: [
    // Location-specific keywords (most important for local SEO)
    'Sarasota orchestra',
    'Bradenton orchestra',
    'Sarasota symphony',
    'Bradenton symphony',
    'orchestra Sarasota FL',
    'orchestra Bradenton FL',
    'Sarasota concerts',
    'Bradenton concerts',
    'live music Sarasota',
    'live music Bradenton',
    'Sarasota Bradenton orchestra',
    'classical music Sarasota',
    'classical music Bradenton',
    'Sarasota pops orchestra',
    'Bradenton pops orchestra',

    // Orchestra type keywords
    'pops orchestra',
    'symphony orchestra',
    'community orchestra',
    'professional orchestra',
    'philharmonic orchestra',
    'chamber orchestra',

    // Music type keywords
    'classical music concerts',
    'pops music concerts',
    'orchestral music',
    'symphony concerts',
    'live classical music',
    'live orchestra',
    'Broadway music',
    'movie soundtrack orchestra',
    'holiday concerts',
    'patriotic concerts',

    // Event-based keywords
    'orchestra performances',
    'symphony performances',
    'concert series',
    'classical concert series',
    'orchestra season tickets',
    'orchestra events',
    'live orchestra shows',
    'orchestra near me',
    'classical concerts near me',

    // Family/community keywords
    'family concerts',
    'family-friendly concerts',
    'kids orchestra',
    'youth orchestra',
    'music education',
    'music education programs',
    'community music',
    'music outreach',

    // Audience-focused keywords
    'affordable orchestra tickets',
    'cheap orchestra tickets',
    'free orchestra concerts',
    'orchestra ticket prices',
    'senior orchestra concerts',
    'date night Sarasota',
    'things to do Sarasota',
    'things to do Bradenton',

    // Venue-related
    'concert hall Sarasota',
    'performing arts Sarasota',
    'performing arts Bradenton',
    'cultural events Sarasota',
    'cultural events Bradenton',

    // Professional musicians
    'professional musicians',
    'orchestra conductor',
    'classical musicians',
    'award-winning orchestra',

    // General
    'The Pops Orchestra',
    'music entertainment',
    'live entertainment Sarasota',
    'Florida orchestra',
    'Gulf Coast orchestra'
  ],
  openGraph: {
    title: 'The Pops Orchestra of Sarasota and Bradenton - Live Symphony Concerts',
    description:
      'Award-winning symphony orchestra bringing classical and popular music to Sarasota and Bradenton, Florida. Affordable tickets, family-friendly performances, and world-class musicians. Experience live orchestral music in your community.',
    url: 'https://thepopsorchestra.org',
    siteName: 'The Pops Orchestra of Sarasota and Bradenton',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/the-pops-orchestra.firebasestorage.app/o/images%2Frich-preview.png?alt=media&token=9d743b9c-1d75-4290-a057-35f1b45e9e52',
        width: 1200,
        height: 630,
        alt: 'The Pops Orchestra of Sarasota and Bradenton - Professional Symphony Orchestra in Florida'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Pops Orchestra - Sarasota & Bradenton Symphony',
    description:
      'Experience live classical and pops music in Sarasota and Bradenton. Affordable tickets, family-friendly concerts, professional musicians.',
    images: [
      'https://firebasestorage.googleapis.com/v0/b/the-pops-orchestra.firebasestorage.app/o/images%2Frich-preview.png?alt=media&token=9d743b9c-1d75-4290-a057-35f1b45e9e52'
    ]
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow'
  },
  applicationName: 'The Pops Orchestra',
  category: 'Arts & Entertainment',
  classification: 'Symphony Orchestra',
  appleWebApp: {
    title: 'The Pops Orchestra',
    statusBarStyle: 'default',
    capable: true
  },
  alternates: {
    canonical: 'https://thepopsorchestra.org'
  },
  verification: {
    // Add these when you verify
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
    'geo.region': 'US-FL',
    'geo.placename': 'Sarasota, Bradenton',
    'geo.position': '27.3364;-82.5307' // Sarasota coordinates
  }
}
