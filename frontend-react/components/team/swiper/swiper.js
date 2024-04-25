import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

export default function App() {
  return (
    <>
      <Swiper
        rewind={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src="/img/team/about-us.jpg" alt="" width={800} height={500} />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/img/team/danielle-cerullo.jpg"
            alt=""
            width={800}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/img/team/anastase-maragos.jpg"
            alt=""
            width={800}
            height={500}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/img/team/victor-freitas.jpg"
            alt=""
            width={800}
            height={500}
          />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
