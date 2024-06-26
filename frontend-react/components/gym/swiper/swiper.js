import React, { useRef, useState, useEffect } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import Link from 'next/link'
import { GYM_ITEM } from '@/configs/index'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

export default function App() {
  const [imgData, setImgData] = useState([])

  useEffect(() => {
    fetch(GYM_ITEM, { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setImgData(data)
      })
  }, [])
  return (
    <>
      <Swiper
        rewind={true}
        style={{
          '--swiper-navigation-color': '#EB6234',
          '--swiper-pagination-color': '#EB6234',
        }}
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
        {imgData.map((v, i) => {
          return (
            <SwiperSlide key={i}>
              <Link href={`/gym/${v.gym_id}`}>
                <Image
                  src={`/img/gym/${v.image_path}`}
                  alt=""
                  width={800}
                  height={400}
                />
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
