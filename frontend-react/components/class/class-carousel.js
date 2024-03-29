import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'

export default function classCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    // <div style={{ width: 800, display: 'flex', justifyContent: 'center' }}>
    <Slider {...settings} style={{ margin: 'auto', width: 800 }}>
      <div>
        <img src="https://placehold.co/600x400" alt=""></img>
      </div>
      <div>
        <img src="https://placehold.co/600x400" alt=""></img>
      </div>
      <div>
        <img src="https://placehold.co/600x400" alt=""></img>
      </div>
      <div>
        <img src="https://placehold.co/600x400" alt=""></img>
      </div>
      <div>
        <img src="https://placehold.co/600x400" alt=""></img>
      </div>
      <div>
        <img src="https://placehold.co/600x400" alt=""></img>
      </div>
    </Slider>
    // </div>
  )
}
