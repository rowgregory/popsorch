import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { RootState, useAppSelector } from '@/app/redux/store'
import Picture from '../common/Picture'

const MediaPhotoCarousel = () => {
  const { photoGalleryImages } = useAppSelector((state: RootState) => state.photoGalleryImage)
  const shouldLoop = photoGalleryImages.length >= 3

  return (
    <div className="relative w-full mx-auto pb-12">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={shouldLoop}
        pagination={{ clickable: true }}
        className="h-[700px] rounded-xl media-swiper"
        grabCursor={true}
      >
        {photoGalleryImages.map((photoGalleryImage, i) => (
          <SwiperSlide key={i}>
            <Picture
              src={photoGalleryImage.imageUrl}
              alt={`Slide ${i}`}
              className="w-full h-full object-cover"
              priority={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MediaPhotoCarousel
