import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import style from '@/styles/class-page.module.scss'
import { FaBook, FaMagnifyingGlass, FaCaretDown } from 'react-icons/fa6'
import { API_SERVER } from '@/configs/index'
import Image from 'next/image'
import ClassSwiper from '@/components/class/class-swiper'
import Link from 'next/link'

export default function ClassPage() {
  const router = useRouter()

  // 用來接收 fetch資料 的狀態
  const [classInfo, setClassInfo] = useState({
    class_id: 0,
    class_name: '',
    class_description: '',
    class_img: '',
    class_fee: 0,
    class_type: '',
  })

  // fetch時要執行的function
  const getClassData = async (class_id) => {
    const url = `${API_SERVER}/class/${class_id}`

    // 開始fetch
    try {
      const r = await fetch(url)
      const data = await r.json()
      // 這裡拿到的是物件
      if (typeof data === 'object' && data) {
        setClassInfo(data)
        console.log(data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // router.isReady時 就要去fetch資料
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query)
      const { class_id } = router.query
      console.log('class_id:', class_id)
      getClassData(class_id)
    }
  }, [router.isReady, router])
  console.log(classInfo)

  return (
    <>
      {!classInfo ? (
        <div>loading...</div>
      ) : (
        <section className={style['info-section']}>
          <div className={style['img-box']}>
            <Image
              className={style['class-img']}
              src={`http://localhost:3001/imgs/class/class-page/${classInfo.class_img}`}
              alt=""
              fill
            />
          </div>
          <div className={style['control-bar']}>
            <div className={style['shortcut-group']}>
              <div className={style['shortcut']}>
                <Link href="#content">課程介紹</Link>
              </div>
              <div className={style['shortcut']}>
                <Link href="#search-class">課表查詢</Link>
              </div>
              <div className={style['shortcut']}>
                <Link href="#other-class-section">其他課程</Link>
              </div>
            </div>
          </div>
          <div id="content" className={style['content']}>
            <div className={style['text-box']}>
              <h2 className={style['class-name']}>{classInfo.class_name}</h2>
              <p className={style['text']}>{classInfo.class_description}</p>
            </div>
          </div>
          <div id="search-class" className={style['search-class']}>
            <div className={style['search-class-group']}>
              <div className={style['title']}>
                <FaBook />
                <h2>課表查詢</h2>
              </div>
              <div className={style['select-group']}>
                <div className={style['select-city']}>
                  <span>高雄市</span>
                  <FaCaretDown />
                </div>
                <div className={style['select-store']}>
                  <span>大大健身房</span>
                  <FaCaretDown />
                </div>
              </div>
              <div className={style['search-btn']}>
                <a href="#" className={style['search']}>
                  <FaMagnifyingGlass />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section
        id="other-class-section"
        className={style['other-class-section']}
      >
        <div className={style['other-class']}>
          <div className={style['text']}>
            <h2>其他課程</h2>
            <p>點擊查看更多相關課程</p>
          </div>
          <ClassSwiper classInfo={classInfo} />
        </div>
      </section>
    </>
  )
}
