import { useRef, useEffect, useState } from 'react'
import style from '@/styles/class-intro.module.scss'
import { FaSortDown } from 'react-icons/fa6'
import Link from 'next/link'
import { API_SERVER } from '../common/config'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'

export default function ClassIntro({ setContainerHeight, tab }) {
  const router = useRouter()

  // 用狀態接收fetch來的課程介紹資料
  const [introData, setIntroData] = useState()

  // 取得section參照
  const sectionRef = useRef(null)

  //當tab改變時，設定container高度 為當前section(左側section)的高度
  useEffect(() => {
    console.log('left-height:', sectionRef.current.clientHeight)
    tab === 'left'
      ? setContainerHeight(sectionRef.current.clientHeight + 'px')
      : () => {}
  }, [introData, tab])

  // 取得課程介紹資料
  useEffect(() => {
    fetch(`${API_SERVER}/class`, { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setIntroData(data)
      })
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        className={
          tab === 'right'
            ? `${style['intro-section']} ${style['hide']}`
            : style['intro-section']
        }
      >
        <div className={style['category-nav']}>
          <div className={style['categories']}>
            <Link href="?class_type=靜態課程">靜態課程</Link>
            <Link href="?class_type=飛輪課程">飛輪課程</Link>
            <Link href="?class_type=心肺訓練課程">心肺訓練課程</Link>
            <Link href="?class_type=舞蹈課程">舞蹈課程</Link>
            <Link href="?class_type=radical課程">radical課程</Link>
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
          {!introData ? (
            <div>loading...</div>
          ) : (
            introData.map((v, i) => {
              return (
                <div key={i} className={style['class']}>
                  <div className={style['img-box']}>
                    <Image
                      src={`/img/class/class-page/${v['class_img']}`}
                      alt=""
                      // fill={true}
                      height={500}
                      width={650}
                    />
                  </div>
                  <div className={style['class-content']}>
                    <div className={style['class-content-box']}>
                      <h3 className={style['class-name']}>{v['class_name']}</h3>
                      <p className={style['class-info']}>
                        {v['class_description']}
                      </p>
                      <div
                        className={style['learn-more']}
                        onClick={() => {
                          router.push(`/class/${v.class_id}`)
                        }}
                        role="presentation"
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
          {/* 
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
          </div> */}

          {/* <div className={style['class']}>
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
          </div> */}
        </div>
      </section>
    </>
  )
}
