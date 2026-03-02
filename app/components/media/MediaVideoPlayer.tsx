'use client'

import { useRef, useState } from 'react'
import Picture from '../common/Picture'

const videos = [
  {
    title: 'Highlight Reel',
    url: 'https://www.youtube.com/embed/gMBsk45zwIo'
  },
  {
    title: 'Come On, Get Happy',
    url: 'https://www.youtube.com/embed/7tteFL2NGGY'
  },
  {
    title: 'Copacabana Valentines',
    url: 'https://www.youtube.com/embed/TlDpUi3od-Y'
  },
  {
    title: 'John Denver: Coming Home',
    url: 'https://www.youtube.com/embed/_5xGgSCmj3E'
  },
  {
    title: 'Sgt. Presley',
    url: 'https://www.youtube.com/embed/rFuGHK8bD4o'
  },
  {
    title: 'Simply Streisand',
    url: 'https://www.youtube.com/embed/wbwQ0kPztQM'
  },
  {
    title: 'The Choice is Yours',
    url: 'https://www.youtube.com/embed/f74W9Wjx78E'
  },
  {
    title: 'The Spirit of America',
    url: 'https://www.youtube.com/embed/i_p1ECqHyF0'
  },
  {
    title: 'Patriotic Shows',
    url: 'https://www.youtube.com/embed/o21h7On0yUE'
  }
]

// Helper function to get video ID from embed URL
const getVideoId = (url: string) => {
  const match = url.match(/\/embed\/([^?&]+)/)
  return match ? match[1] : null
}

// Create new array with thumbnails dynamically added
const videosWithThumbnails = videos.map((video) => {
  const videoId = getVideoId(video.url)
  return {
    ...video,
    thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '/default-thumbnail.jpg' // fallback
  }
})

const MediaVideoPlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState(videosWithThumbnails[0])
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleSelectVideo = (video: (typeof videosWithThumbnails)[0]) => {
    setSelectedVideo(video)
    iframeRef.current?.focus()
  }

  return (
    <section aria-labelledby="video-player-heading" className="w-full">
      <h2 id="video-player-heading" className="sr-only">
        Video Player
      </h2>

      <div className="grid grid-cols-1 990:grid-cols-12 gap-px bg-white/10">
        {/* Playlist */}
        <nav aria-label="Video playlist" className="990:col-span-3 bg-black relative">
          <div className="flex items-center gap-3 p-5 430:p-6 border-b border-white/10">
            <div className="w-4 h-px bg-blaze" aria-hidden="true" />
            <p className="font-changa text-[10px] uppercase tracking-[0.25em] text-blaze">Playlist</p>
          </div>

          <div className="relative max-h-125 990:max-h-600 overflow-y-auto">
            <div
              className="absolute bottom-0 left-0 w-full h-10 bg-linear-to-t from-black to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />
            <ul role="list" aria-label="Available videos" className="flex flex-col gap-px bg-white/10">
              {videosWithThumbnails.map((video, i) => (
                <li key={i} className="bg-black">
                  <button
                    type="button"
                    onClick={() => handleSelectVideo(video)}
                    aria-label={`Play ${video.title}`}
                    aria-pressed={selectedVideo.url === video.url}
                    className={`flex items-center gap-3 w-full text-left p-3 430:p-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-inset ${
                      selectedVideo.url === video.url
                        ? 'bg-blaze/10 border-l-2 border-blaze'
                        : 'border-l-2 border-transparent hover:bg-white/5 hover:border-blaze/40'
                    }`}
                  >
                    <div className="relative shrink-0 overflow-hidden w-20 h-14">
                      <Picture
                        src={video.thumbnail}
                        alt={`Thumbnail for ${video.title}`}
                        className="w-full h-full object-cover"
                        priority={i === 0}
                      />
                      {selectedVideo.url === video.url && (
                        <div
                          className="absolute inset-0 bg-blaze/20 flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                        </div>
                      )}
                    </div>
                    <p
                      className={`font-lato text-xs leading-snug ${
                        selectedVideo.url === video.url ? 'text-white' : 'text-white/50'
                      }`}
                    >
                      {video.title}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Player */}
        <div className="990:col-span-9 bg-black p-4 430:p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-px bg-blaze" aria-hidden="true" />
            <p className="font-changa text-[10px] uppercase tracking-[0.25em] text-blaze truncate">
              Now Playing: {selectedVideo.title}
            </p>
          </div>

          <div className="aspect-video w-full">
            <iframe
              ref={iframeRef}
              src={selectedVideo.url}
              title={selectedVideo.title}
              aria-label={`Now playing: ${selectedVideo.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              tabIndex={0}
              className="w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            />
          </div>
        </div>
      </div>

      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Now playing: {selectedVideo.title}
      </span>
    </section>
  )
}

export default MediaVideoPlayer
