import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { RootState, useAppSelector } from '@/app/redux/store'
import TitleWithLine from '../common/TitleWithLine'

const MediaTestimonialCarousel = () => {
  const { testimonials } = useAppSelector((state: RootState) => state.testimonial)
  const shouldLoop = testimonials.length >= 3

  return (
    <div className={`${testimonials?.length === 0 ? 'hidden' : 'block'} relative w-full mx-auto pb-12 max-w-sm`}>
      <TitleWithLine title="Testimonials" textBlockKey="mediaPageTestimonialTitle" type="MEDIA_PAGE" />
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
