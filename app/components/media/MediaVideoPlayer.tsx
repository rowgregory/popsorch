'use client'

import React, { useState } from 'react'
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

  return (
    <div className="flex flex-col 990:flex-row gap-6 bg-[#8c0f1a] p-6 rounded-xl w-full">
      <div className="relative w-full 990:w-60 max-h-[700px] overflow-y-auto">
        <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-[#8c0f1a] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#8c0f1a] to-transparent z-10 pointer-events-none" />

        <ul className="space-y-4 relative z-0 pr-2">
          {videosWithThumbnails.map((video, i) => (
            <li
              key={i}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80"
              onClick={() => setSelectedVideo(video)}
            >
              <Picture
                src={video.thumbnail}
                alt={video.title}
                className="w-20 h-14 object-cover rounded"
                priority={true}
              />
              <p className="text-white text-11 font-lato">{video.title}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 aspect-video max-w-4xl">
        <iframe
          src={selectedVideo.url}
          title={selectedVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-xl"
        />
      </div>
    </div>
  )
}

export default MediaVideoPlayer
