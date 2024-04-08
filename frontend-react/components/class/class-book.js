import { useState } from 'react'
import style from '@/styles/class-book.module.scss'
import Image from 'next/image'

export default function ClassBook() {
  const [showOverlay, setShowOverlay] = useState('show-overlay')
  const [showCard, setShowCard] = useState('show-card')

  return (
    <>
      <div
        className={`${style['overlay']} ${style[showOverlay]}`}
        role="presentation"
        onClick={() => {
          setShowOverlay('')
          setShowCard('')
        }}
      ></div>
      <div className={`${style['card']} ${style[showCard]}`}>
        <div className={style['close']}>
          <i>X</i>
        </div>
        <div className={style['img-box']}>
          <div className={style['img-cover']}></div>
          <Image
            src="/img/class/2_20221229164722batp5kE9j10.jpg"
            width={800}
            height={500}
            // objectFit="contain"
            layout="responsive"
            alt=""
          />
        </div>
        <div className={style['content']}>
          <h1>Boxing : Basics 60</h1>
          <div className={style['info']}>
            <div className={style['date']}>
              <div className={style['date-thumbnail']}>
                <div className={style['week-day']}>
                  <span>Mon</span>
                </div>
                <div className={style['day-number']}>
                  <span>25</span>
                </div>
              </div>
              <div className={style['text']}>
                <span className={style['']}>2024年3月25號</span>
                <p>10:00 - 11:00</p>
              </div>
            </div>
            <div className={style['teacher']}>
              <div className={style['avatar']}></div>
              <div className={style['text']}>
                <span>Luciano</span>
                <p>教練</p>
              </div>
            </div>
            <div className={style['place']}>
              <div className={style['place-img']}></div>
              <div className={style['text']}>
                <span>大大健身房</span>
                <p>高雄市前金區XX街2號</p>
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
