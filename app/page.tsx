import { HomeClient } from './components/pages/HomeClient'
import { getHomePageData } from './lib/actions/getHomePageData'

export default async function HomePage() {
  const data = await getHomePageData()

  return (
    <HomeClient
      pageData={data.pageData}
      concerts={data.concerts}
      galleryImages={data.galleryImages}
      sponsors={data.sponsors}
      testimonials={data.testimonials}
      events={data.events}
      news={data.news}
    />
  )
}
