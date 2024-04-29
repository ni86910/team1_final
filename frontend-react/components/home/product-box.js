import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import style from '@/styles/home-product-box.module.scss'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

const aList = [
  'product_acc_01_00_01.webp',
  'product_acc_06_00_01.webp',
  'product_bottle_01_02_00.webp',
  'product_drink_01_00_00.jpg',
  'product_gym_06_02_01.webp',
]

const bList = [
  'product_gym_10_02_00.webp',
  'product_gym_16_00_00.webp',
  'product_protein_04_00_01.webp',
  'product_sup_02_00_03.jpg',
  'product_yoga_02_00_00.webp',
]

export default function ProductBox({ which = true }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={false}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className={style['swiper']}
      >
        {which
          ? aList.map((v, i) => {
              return (
                <SwiperSlide key={i}>
                  <Image alt="" fill src={`/img/products/${v}`} />
                </SwiperSlide>
              )
            })
          : bList.map((v, i) => {
              return (
                <SwiperSlide key={i}>
                  <Image alt="" fill src={`/img/products/${v}`} />
                </SwiperSlide>
              )
            })}
      </Swiper>
    </>
  )
}
