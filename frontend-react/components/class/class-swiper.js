import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import style from '@/styles/class-swiper.module.scss'
// import required modules
import { Pagination, Navigation } from 'swiper/modules'
import { useRouter } from 'next/router'
import { API_SERVER } from '@/configs'
import Image from 'next/image'
import Link from 'next/link'

export default function ClassSwiper({ classInfo }) {
  const router = useRouter()

  const [otherClasses, setOtherClasses] = useState([])

  // 取得課程類別介紹資料
  useEffect(() => {
    if (router.isReady) {
      // 確保能得到pid
      const class_type = classInfo.class_type || '靜態課程'
      // console.log(class_type)
      console.log(router.query.class_type)
      fetch(`${API_SERVER}/class?class_type=${class_type}`, {
        credentials: 'include',
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data)
          setOtherClasses(data)
          // router.push(`?class_type=${class_type}`)
        })
    }
  }, [router.isReady])

  return (
    <>
      {/*  slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper" */}
      <Swiper
        loop={true}
        slidesPerView={'auto'}
        centeredSlides={true}
        spaceBetween={30}
        pagination={false}
        modules={[Pagination, Navigation]}
        navigation={true}
        className={style['swiper']}
        style={{
          '--swiper-navigation-color': '#EB6234',
          '--swiper-pagination-color': '#EB6234',
        }}
      >
        {otherClasses.length == 0 ? (
          <SwiperSlide className={style['swiper-slide']}>
            沒有其他相關課程
          </SwiperSlide>
        ) : (
          otherClasses.map((v, i) => {
            if (v.class_id === classInfo.class_id) {
              return null
            }
            return (
              <SwiperSlide key={i} className={style['swiper-slide']}>
                <Link href={`/class/${v.class_id}`}>
                  <Image
                    alt=""
                    src={`http://localhost:3001/imgs/class/class-page/${v['class_img']}`}
                    fill
                  />
                  {/* <h2>{v.class_name}</h2> */}
                  <div>
                    <h2>{v.class_name}</h2>
                  </div>
                </Link>
              </SwiperSlide>
            )
          })
        )}
      </Swiper>
    </>
  )
}
