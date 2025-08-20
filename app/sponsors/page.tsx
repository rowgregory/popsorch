'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import Picture from '../components/common/Picture'

const Carousel3D = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Sample data - you can replace with your own content
  const items = [
    {
      id: 1,
      title: 'Mountain Vista',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      description: 'Breathtaking mountain landscapes'
    },
    {
      id: 2,
      title: 'Ocean Waves',
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=400&fit=crop',
      description: 'Serene ocean views'
    },
    {
      id: 3,
      title: 'Forest Path',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
      description: 'Mystical forest adventures'
    },
    {
      id: 4,
      title: 'City Skyline',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
      description: 'Urban architecture marvel'
    },
    {
      id: 5,
      title: 'Desert Dunes',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&h=400&fit=crop',
      description: 'Golden sand landscapes'
    },
    {
      id: 6,
      title: 'Northern Lights',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop',
      description: 'Aurora borealis magic'
    }
  ]

  const totalItems = items.length

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay, totalItems])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
  }

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentIndex(index)
  }

  const getItemPosition = (index: number) => {
    const diff = index - currentIndex
    const normalizedDiff = ((diff % totalItems) + totalItems) % totalItems

    if (normalizedDiff === 0) return 'center'
    if (normalizedDiff === 1 || normalizedDiff === totalItems - 1) return 'adjacent'
    return 'distant'
  }

  const getTransform = (index: number) => {
    const position = getItemPosition(index)
    const diff = index - currentIndex
    const normalizedDiff = ((diff % totalItems) + totalItems) % totalItems

    switch (position) {
      case 'center':
        return {
          x: 0,
          z: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1
        }
      case 'adjacent':
        const isNext = normalizedDiff === 1
        return {
          x: isNext ? 280 : -280,
          z: -200,
          rotateY: isNext ? -45 : 45,
          scale: 0.8,
          opacity: 0.7
        }
      default:
        const isRight = normalizedDiff <= totalItems / 2
        return {
          x: isRight ? 400 : -400,
          z: -400,
          rotateY: isRight ? -60 : 60,
          scale: 0.6,
          opacity: 0.3
        }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Main Carousel Container */}
        <div className="relative h-[500px] overflow-hidden" style={{ perspective: '1200px' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {items.map((item, index) => {
              const transform = getTransform(index)
              const position = getItemPosition(index)

              return (
                <motion.div
                  key={item.id}
                  className="absolute w-80 h-80 cursor-pointer"
                  animate={{
                    x: transform.x,
                    z: transform.z,
                    rotateY: transform.rotateY,
                    scale: transform.scale,
                    opacity: transform.opacity
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  onClick={() => position !== 'center' && goToSlide(index)}
                  whileHover={{
                    scale: position === 'center' ? 1.05 : transform.scale * 1.1
                  }}
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    {/* Image */}
                    <div className="absolute inset-0">
                      <Picture src={item.image} priority={true} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>

                    {/* Center indicator */}
                    {position === 'center' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg"
                      />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevSlide}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Auto-play Toggle */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="text-sm">{isAutoPlay ? 'Pause' : 'Play'}</span>
          </button>
        </div>

        {/* Current Item Info */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
            {items[currentIndex].title}
          </h2>
          <p className="text-white/70 text-lg max-w-md mx-auto">{items[currentIndex].description}</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Carousel3D
