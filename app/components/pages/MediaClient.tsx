'use client'

import Breadcrumb from '@/app/components/common/Breadcrumb'
import MediaPhotoCarousel from '@/app/components/carousels/MediaPhotoCarousel'
import MediaVideoPlayer from '@/app/components/media/MediaVideoPlayer'

export const MediaClient = ({ photoGalleryImages }) => {
  return (
    <main id="main-content">
      <Breadcrumb breadcrumb="Media" />
      <section aria-labelledby="media-heading" className="px-4 990:px-12 xl:px-4">
        <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-7xl w-full mx-auto pt-32 pb-44 flex flex-col items-center gap-y-16">
          <header className="w-full text-center flex flex-col items-center">
            <p className="font-changa text-xs uppercase tracking-[0.3em] text-blaze mb-4">The Pops Orchestra</p>
            <h1 id="media-heading" className="text-5xl sm:text-6xl font-changa text-white leading-none mb-4">
              Media
            </h1>
            <div className="w-16 h-px bg-blaze mx-auto mb-6" aria-hidden="true" />
            <p className="font-lato text-white/60 text-base max-w-xl leading-relaxed">
              Explore our photo gallery and watch performances from The Pops Orchestra of Bradenton and Sarasota.
            </p>
          </header>

          <MediaPhotoCarousel photoGalleryImages={photoGalleryImages} />
          <MediaVideoPlayer />
        </div>
      </section>
    </main>
  )
}
