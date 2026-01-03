import { getConcerts } from './actions/getConcerts'
import { getPageContent } from './actions/getPageContent'
import { getPhotoGalleryImages } from './actions/getPhotoGalleryImages'
import { getSponsors } from './actions/getSponsors'
import HomePage from './components/pages/HomePage'

export default async function Home() {
  const [pageData, concertsData, galleryData, sponsorsData] = await Promise.all([
    getPageContent('home'),
    getConcerts(),
    getPhotoGalleryImages(),
    getSponsors()
  ])

  return (
    <HomePage
      pageData={pageData?.content}
      concerts={concertsData?.concerts}
      galleryImages={galleryData}
      sponsors={sponsorsData?.sponsors}
    />
  )
}
