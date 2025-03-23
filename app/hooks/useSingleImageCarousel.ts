import { useState, useEffect } from 'react';

const useSingleImageCarousel = (images: string[], interval = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return images[currentIndex];
};

export default useSingleImageCarousel;
