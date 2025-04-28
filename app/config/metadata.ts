import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://popsorch.vercel.app'),
  title: 'The Pops Orchestra Sarasota Bradenton',
  description:
    'The Pops Orchestra Sarasota Bradenton offers world-class performances of classical and contemporary music, bringing the community together through the power of live orchestral music.',
  keywords: [
    'The Pops Orchestra Sarasota Bradenton',
    'orchestra',
    'Sarasota Bradenton',
    'live music',
    'classical music',
    'contemporary music',
    'community events',
    'orchestral performances',
    'musical performances',
    'Sarasota events',
    'Bradenton events',
    'arts and culture',
    'classical performances',
    'family-friendly events',
    'music lovers',
    'concerts',
    'musicians',
    'performing arts',
    'symphony',
    'outdoor concerts',
    'classical concert series',
    'musical events',
    'local music scene',
    'arts in Sarasota',
    'live performances in Bradenton',
    'concert hall',
    'cultural experiences'
  ],
  openGraph: {
    title: 'The Pops Orchestra Sarasota Bradenton',
    description:
      'Join The Pops Orchestra Sarasota Bradenton for exceptional live performances that showcase classical and contemporary music, enriching the community and fostering a love for the arts.',
    url: 'https://popsorch.vercel.app/',
    siteName: 'The Pops Orchestra Sarasota Bradenton',
    images: [
      {
        url: '', // Replace with actual image URL
        width: 1200,
        height: 630,
        alt: 'The Pops Orchestra logo'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow'
  },
  applicationName: 'The Pops Orchestra Sarasota Bradenton',
  appleWebApp: {
    title: 'The Pops Orchestra Sarasota Bradenton',
    statusBarStyle: 'default',
    capable: true
  },
  alternates: {
    canonical: 'https://popsorch.vercel.app'
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes'
  }
}
