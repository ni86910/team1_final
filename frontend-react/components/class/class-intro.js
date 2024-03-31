import React from 'react'
import style from '@/styles/class-intro.module.scss'
import { FaSortDown } from 'react-icons/fa'
import Link from 'next/link'

export default function ClassIntro() {
  return (
    <>
      <section className={style['intro-section']}>
        <div className={style['category-nav']}>
          <div className={style['categories']}>
            <Link href="">印度瑜珈</Link>
            <Link href="">強力健身</Link>
            <Link href="">活力有氧</Link>
            <Link href="">空中瑜珈</Link>
            <Link href="">健身</Link>
            <Link href="">活力有氧</Link>
          </div>
          <div className={style['more-btn']}>+</div>
        </div>
        <div className={style['category-intro']}>
          <h2 className={style['category-name']}>靜態課程</h2>
          <p className={style['category-desc']}>
            靜態課程相關介紹，課程並包含完整的瑜珈、皮拉提斯、和緩運動。
          </p>
          <div className={style['select-bar']}>
            <p>查看課程</p>
            <FaSortDown />
          </div>
        </div>
        <div className={style['classes']}>
          <div className={style['class']}>
            <div className={style['img-box']}>
              <img src="./img/class/2_202212291552011if0i26239.jpg" alt="" />
            </div>
            <div className={style['class-content']}>
              <div className={style['class-content-box']}>
                <h3 className={style['class-name']}>基礎瑜珈</h3>
                <p className={style['class-info']}>
                  瑜珈常會接觸體位法（動作）中，特別挑選出適合初學者所練習的動作
                </p>
                <div className={style['learn-more']}>+</div>
              </div>
            </div>
          </div>
          <div className={style['class']}>
            <div className={style['img-box']}>
              <img src="./img/class/2_20221229164722batp5kE9j10.jpg" alt="" />
            </div>
            <div className={style['class-content']}>
              <div className={style['class-content-box']}>
                <h3 className={style['class-name']}>基礎飛輪</h3>
                <p className={style['class-info']}>
                  課程上可以了解飛輪單車騎乘基本4個動作姿勢,結合基礎解剖學,讓每位學員的肌肉能量,關節角度,控制方向,再結合能量系統來設計進階騎乘動作,讓課程達到安全有效的訓練方式
                </p>
                <div className={style['learn-more']}>+</div>
              </div>
            </div>
          </div>
          <div className={style['class']}>
            <div className={style['img-box']}>
              <img src="./img/class/2_202212291552011if0i26239.jpg" alt="" />
            </div>
            <div className={style['class-content']}>
              <div className={style['class-content-box']}>
                <h3 className={style['class-name']}>基礎瑜珈</h3>
                <p className={style['class-info']}>
                  瑜珈常會接觸體位法（動作）中，特別挑選出適合初學者所練習的動作
                </p>
                <div className={style['learn-more']}>+</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
