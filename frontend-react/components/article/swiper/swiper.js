import React, { useRef, useState, useEffect } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import Link from 'next/link'
import { ARTICLE_ITEM } from '@/configs/index'
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
    fetch(ARTICLE_ITEM, { credentials: 'include' })
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
              <Link href={`/article/${v.article_id}`}>
                <Image
                  src={`/img/article/${v.article_image}`}
                  alt=""
                  width={800}
                  height={500}
                />
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
