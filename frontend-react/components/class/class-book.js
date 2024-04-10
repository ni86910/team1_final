import { useEffect, useState } from 'react'
import style from '@/styles/class-book.module.scss'
import Image from 'next/image'
import dayjs from 'dayjs'
import { FaTimes } from 'react-icons/fa'
import Link from 'next/link'

export default function ClassBook({ popClassBook, setPopClassBook, bookInfo }) {
  // 處理預約資料
  bookInfo.year = dayjs(bookInfo.start_time).format('YYYY年M月D號') //年
  bookInfo.day = dayjs(bookInfo.start_time).format('D') //日
  bookInfo.startH = dayjs(bookInfo.start_time).format('HH:00') // start時
  bookInfo.endH = dayjs(bookInfo.end_time).format('HH:00') // end時
  bookInfo.monthWord = dayjs(bookInfo.start_time).format('MMM') // 月份英文

  return (
    <>
      <div
        className={`${style['overlay']} ${
          style[popClassBook ? 'show-overlay' : '']
        }`}
        role="presentation"
        onClick={() => {
          setPopClassBook(false)
        }}
      ></div>
      <div
        className={`${style['card']} ${style[popClassBook ? 'show-card' : '']}`}
      >
        <Link
          href={'#'}
          className={style['close']}
          onClick={(e) => {
            e.preventDefault()
            setPopClassBook(false)
          }}
        >
          <FaTimes />
        </Link>
        <div className={style['img-box']}>
          <div className={style['img-cover']}></div>
          <Image
            src={`http://localhost:3001/imgs/class/class-page/${bookInfo.class_img}`}
            width={800}
            height={500}
            // objectFit="contain"
            layout="responsive"
            alt=""
          />
        </div>
        <div className={style['content']}>
          <h1>{bookInfo.class_name}</h1>
          <div className={style['info']}>
            <div className={style['date']}>
              <div className={style['date-thumbnail']}>
                <div className={style['week-day']}>
                  <span>{bookInfo.monthWord}</span>
                </div>
                <div className={style['day-number']}>
                  <span>{bookInfo.day}</span>
                </div>
              </div>
              <div className={style['text']}>
                <span className={style['']}>{bookInfo.year}</span>
                <p>
                  {bookInfo.startH} - {bookInfo.endH}
                </p>
              </div>
            </div>
            <div className={style['teacher']}>
              <div className={style['avatar']}></div>
              <div className={style['text']}>
                <span>{bookInfo.t_name}</span>
                <p>教練</p>
              </div>
            </div>
            <div className={style['place']}>
              <div className={style['place-img']}></div>
              <div className={style['text']}>
                <span>{bookInfo.gym_name}</span>
                <p>{bookInfo.gym_description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={style['bottom']}>
          <div className={style['button']}>立即預約</div>
        </div>
      </div>
    </>
  )
}
