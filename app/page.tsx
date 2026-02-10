import { getConcerts } from './actions/getConcerts'
import { getPageContent } from './actions/getPageContent'
import { getPhotoGalleryImages } from './actions/getPhotoGalleryImages'
import { getSponsors } from './actions/getSponsors'
import HomeClient from './components/pages/HomeClient'

export default async function HomePage() {
  const [pageData, concertsData, galleryData, sponsorsData] = await Promise.all([
    getPageContent('home'),
    getConcerts(),
    getPhotoGalleryImages(),
    getSponsors()
  ])

  return (
    <HomeClient
      pageData={pageData?.content}
      concerts={concertsData?.concerts}
      galleryImages={galleryData}
      sponsors={sponsorsData?.sponsors}
    />
  )
}
