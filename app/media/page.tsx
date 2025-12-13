'use client'

import Breadcrumb from '../components/common/Breadcrumb'
import MediaPhotoCarousel from '../components/media/MediaPhotoCarousel'
import MediaVideoPlayer from '../components/media/MediaVideoPlayer'

const Media = () => {
  return (
    <>
      <Breadcrumb breadcrumb="Media" />
      <section className="px-4 990:px-12 xl:px-4">
        <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto pt-32 pb-44 flex flex-col items-center gap-y-7">
          <MediaPhotoCarousel />
          <MediaVideoPlayer />
        </div>
      </section>
    </>
  )
}

export default Media
