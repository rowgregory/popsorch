import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Changa, Inter, Lato, Oswald, Raleway } from 'next/font/google'
import { auth } from './lib/auth'
import { siteMetadata } from './metadata'
import { getActiveHeaderButton } from './actions/getActiveHeaderButton'
import { getConcerts } from './actions/getConcerts'
import { getCampApplicationsSetting } from './actions/getCampApplicationsSetting'
import { getPage } from './actions/getPage'
import { SessionProvider } from 'next-auth/react'
import { RootLayoutWrapper } from './root-layout'
import './globals.css'
import 'ol/ol.css'

export const dynamic = 'force-dynamic'
export const metadata = siteMetadata

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [session, headerButton, concerts, campApplicationsSetting, footerData] = await Promise.all([
    auth(),
    getActiveHeaderButton(),
    getConcerts(),
    getCampApplicationsSetting(),
    getPage('footer')
  ])

  return (
    <html lang="en">
      <head>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </head>
      <body
        className={`${inter.variable} ${oswald.variable} ${raleway.variable} ${changa.variable} ${lato.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <RootLayoutWrapper
            headerButton={headerButton}
            concerts={concerts?.concerts}
            campApplicationsSetting={campApplicationsSetting.value}
            data={footerData}
          >
            {children}
          </RootLayoutWrapper>
        </SessionProvider>
        <Script
          src="https://public.tockify.com/browser/embed.js"
          data-cfasync="false"
          data-tockify-script="embed"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
