import { NextResponse } from 'next/server'
import chromium from '@sparticuz/chromium-min'
import puppeteer from 'puppeteer-core'

export const maxDuration = 20
chromium.setGraphicsMode = false
export async function POST() {
  try {
    await chromium.font('https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf')

    const isLocal = !!process.env.CHROME_EXECUTABLE_PATH

    const browser = await puppeteer.launch({
      args: isLocal ? puppeteer.defaultArgs() : chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath('/opt/chromium')),
      headless: chromium.headless
    })

    const page = await browser.newPage()

    await page.goto('https://www.panerabread.com/content/panerabread_com/en-us/menu/categories/sandwiches.html', {
      waitUntil: 'load'
    })

    const menuItems = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.iw-product-grid-item-v2')).map((link) => {
        const productName = link.querySelector('p.font-subhead--product-title')?.textContent?.trim() || 'Unknown'

        return { productName }
      })
    })

    await browser.close()

    return NextResponse.json({ menuItems, sliceName: 'scraperApi' }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to scrape menu', sliceName: 'scraperApi' }, { status: 500 })
  }
}
