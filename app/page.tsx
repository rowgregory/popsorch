import { HomeClient } from './components/pages/HomeClient'
import { getHomePageData } from './lib/actions/getHomePageData'

export default async function HomePage() {
  const data = await getHomePageData()
  const firstHeroImage = data.galleryImages?.find((img) => img.isHomeHero)

  return (
    <>
      {firstHeroImage && (
        <link
          rel="preload"
          as="image"
          href={`/_next/image?url=${encodeURIComponent(firstHeroImage.imageUrl)}&w=1920&q=60`}
          fetchPriority="high"
        />
      )}
      <HomeClient {...data} />
    </>
  )
}
