import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

const testimonials = [
  {
    name: 'Sarah M.',
    review:
      'Absolutely magical performance! The Pops brought so much energy and joy to the stage. It was an unforgettable evening.'
  },
  {
    name: 'James T.',
    review:
      'I’ve seen a lot of shows, but nothing compares to the way The Pops connect with the audience. Truly heartwarming and professional.'
  },
  {
    name: 'Olivia K.',
    review:
      'My entire family loved the show! The talent, the music, the stories — all top notch. Can’t wait to see them again.'
  },
  {
    name: 'Daniel R.',
    review:
      'Their tribute to classic American music gave me goosebumps. The vocals were stunning and the atmosphere electric.'
  },
  {
    name: 'Lena F.',
    review: 'Such a unique and beautiful performance. The Pops deliver something for everyone, and do it with heart.'
  },
  {
    name: 'Tom A.',
    review:
      'A class act from start to finish. You can tell they care deeply about every detail of their show. Highly recommend!'
  }
]

const MediaTestimonialCarousel = () => {
  const shouldLoop = testimonials.length >= 3
  return (
    <div className="relative w-full mx-auto pb-12 max-w-sm">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={shouldLoop}
        pagination={{ clickable: true }}
        className="h-[300px] rounded-xl media-swiper"
        grabCursor={true}
      >
        {testimonials.map((testimonial, i) => (
          <SwiperSlide key={i}>
            <p className="font-lato text-lg mb-5 text-center">{testimonial.review}</p>
            <h1 className="text-2xl font-changa text-center text-blaze">{testimonial.name}</h1>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MediaTestimonialCarousel
