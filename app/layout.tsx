export const dynamic = 'force-dynamic'
export const revalidate = 0

import ReduxWrapper from './redux-wrapper'
import Script from 'next/script'
import { getUserId } from './lib/auth'
import { getAppData } from './actions/app-actions'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Changa, Inter, Lato, Oswald, Raleway } from 'next/font/google'
import './globals.css'
import 'ol/ol.css'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { siteMetadata } from './metadata'

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

export const metadata = siteMetadata

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const userId = await getUserId()
  const appData = await getAppData()

  return (
    <html lang="en">
      <head>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </head>
      <body
        className={`${inter.variable} ${oswald.variable} ${raleway.variable} ${changa.variable} ${lato.variable} antialiased`}
      >
        <ReduxWrapper userId={userId ?? ''} appData={appData}>
          {children}
        </ReduxWrapper>
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
