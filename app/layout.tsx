import type { Metadata } from 'next'
import ReduxWrapper from './redux-wrapper'
import { Changa, Inter, Lato, Oswald, Raleway } from 'next/font/google'
import './globals.css'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import 'ol/ol.css'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  preload: false,
  variable: '--font-inter'
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  preload: false,
  variable: '--font-oswald'
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  preload: false,
  variable: '--font-raleway'
})

const changa = Changa({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  preload: false,
  variable: '--font-changa'
})
const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  preload: false,
  variable: '--font-lato'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://thepopsorchestra.org'),
  title: 'The Pops Orchestra',
  description:
    'The Pops Orchestra brings professional and passionate performances of popular and classical music to the community, inspiring audiences of all ages.',
  keywords: [
    'The Pops Orchestra',
    'orchestra performances',
    'live music',
    'classical music',
    'popular music orchestra',
    'community orchestra',
    'musical performances',
    'symphony orchestra',
    'live classical concerts',
    'family music events',
    'music education',
    'orchestra events',
    'live orchestra shows',
    'music entertainment',
    'community music programs',
    'youth orchestra',
    'music outreach',
    'concert series',
    'cultural events',
    'orchestra near me',
    'classical concerts near me',
    'live music events',
    'affordable concerts',
    'professional musicians',
    'music enrichment',
    'music appreciation'
  ],
  openGraph: {
    title: 'The Pops Orchestra',
    description:
      'Experience the magic of live music with The Pops Orchestra, blending popular hits and classical favorites for audiences of all ages.',
    url: 'https://thepopsorchestra.org',
    siteName: 'The Pops Orchestra',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/the-pops-orchestra.firebasestorage.app/o/images%2Frich-preview.png?alt=media&token=9d743b9c-1d75-4290-a057-35f1b45e9e52',
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
  applicationName: 'The Pops Orchestra',
  appleWebApp: {
    title: 'The Pops Orchestra',
    statusBarStyle: 'default',
    capable: true
  },
  alternates: {
    canonical: 'https://thepopsorchestra.org'
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes'
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const userData = (await cookies()).get('authToken')?.value

  let payload
  try {
    payload = userData ? (await jwtVerify(userData, new TextEncoder().encode(process.env.JWT_SECRET!))).payload : null
  } catch (error) {
    console.log('ERROR READING TOKEN: ', error)
  }

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} ${raleway.variable} ${changa.variable} ${lato.variable} antialiased`}
      >
        <ReduxWrapper data={payload}>{children}</ReduxWrapper>
        <Script
          src="https://public.tockify.com/browser/embed.js"
          data-cfasync="false"
          data-tockify-script="embed"
          strategy="lazyOnload" // or "afterInteractive"
        />
      </body>
    </html>
  )
}
