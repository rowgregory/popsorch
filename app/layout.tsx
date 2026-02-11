export const dynamic = 'force-dynamic'
export const revalidate = 0

import ReduxWrapper from './redux-wrapper'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Changa, Inter, Lato, Oswald, Raleway } from 'next/font/google'
import './globals.css'
import 'ol/ol.css'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { siteMetadata } from './metadata'
import { getTextBlocks } from './actions/getTextBlocks'
import { getActiveHeaderButton } from './actions/getActiveHeaderButton'
import { getConcerts } from './actions/getConcerts'
import { SessionProvider } from 'next-auth/react'
import { auth } from './lib/auth'

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
  const session = await auth()
  const textBlocks = await getTextBlocks()
  const headerButton = await getActiveHeaderButton()
  const concerts = await getConcerts()

  return (
    <html lang="en">
      <head>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </head>
      <body
        className={`${inter.variable} ${oswald.variable} ${raleway.variable} ${changa.variable} ${lato.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <ReduxWrapper textBlocks={textBlocks} headerButton={headerButton} concerts={concerts}>
            {children}
          </ReduxWrapper>
        </SessionProvider>
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
