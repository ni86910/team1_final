import React, { useState, useEffect } from 'react'

export default function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    'https://cdn.pixabay.com/photo/2017/04/27/08/29/man-2264825_1280.jpg',
    'https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg',
    'https://cdn.pixabay.com/photo/2013/03/09/14/38/gym-91849_960_720.jpg',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [currentImage])

  return (
    <div>
      <img src={images[currentImage]} alt="slider" />
    </div>
  )
}
