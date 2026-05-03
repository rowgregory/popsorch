import { HomeClient } from './components/pages/HomeClient'
import { getHomePageData } from './lib/actions/getHomePageData'
import { getFirstHeroImage } from './lib/actions/photo-gallery-image/getFirstHeroImage'

export default async function HomePage() {
  const [data, firstHeroImage] = await Promise.all([getHomePageData(), getFirstHeroImage().catch(() => null)])

  return (
    <>
      {firstHeroImage && (
        <link
          rel="preload"
          as="image"
          href={`/_next/image?url=${encodeURIComponent(firstHeroImage.imageUrl)}&w=1920&q=75`}
          fetchPriority="high"
        />
      )}
      <HomeClient {...data} />
    </>
  )
}
