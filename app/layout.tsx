import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Changa, Cormorant_Infant, Heebo, Inter, Lato, Oswald, Raleway } from 'next/font/google'
import { auth } from './lib/auth'
import { siteMetadata } from './metadata'
import { getConcerts } from './lib/actions/concert/getConcerts'
import { getCampApplicationsSetting } from './lib/actions/camp-applications/getCampApplicationsSetting'
import { getPage } from './lib/actions/page/getPage'
import { SessionProvider } from 'next-auth/react'
import { RootLayoutWrapper } from './root-layout'
import './globals.css'
import 'ol/ol.css'
import { unstable_cache } from 'next/cache'

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

const heebo = Heebo({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  preload: false,
  variable: '--font-heebo'
})
const c_infant = Cormorant_Infant({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  preload: false,
  variable: '--font-c-infant'
})

const getCampApplicationsSettingCached = unstable_cache(
  async () => getCampApplicationsSetting(),
  ['layout-camp-settings'],
  { revalidate: 60 }
)

const getFooterCached = unstable_cache(async () => getPage('footer'), ['layout-footer'], { revalidate: 60 })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [session, campApplicationsSetting, footerData] = await Promise.all([
    auth(),
    getCampApplicationsSettingCached(),
    getFooterCached()
  ])

  return (
    <html lang="en">
      <head>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </head>
      <body
        className={`${inter.variable} ${oswald.variable} ${raleway.variable} ${changa.variable} ${lato.variable} ${heebo.variable} ${c_infant.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <RootLayoutWrapper campApplicationsSetting={campApplicationsSetting?.value} data={footerData}>
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
