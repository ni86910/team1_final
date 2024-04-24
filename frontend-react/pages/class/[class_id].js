import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import style from '@/styles/class-page.module.scss'
import { FaBook, FaMagnifyingGlass, FaCaretDown } from 'react-icons/fa6'
import { API_SERVER } from '@/configs/index'
import Image from 'next/image'
import ClassSwiper from '@/components/class/class-swiper'
import Link from 'next/link'
import NickSelect from '@/components/common/nick-select'
import Head from 'next/head'
import { Tab } from 'bootstrap'

export default function ClassPage() {
  const router = useRouter()

  // 紀錄目前選擇的縣市
  const [city, setCity] = useState('')

  // 紀錄該縣市裡面有的場館
  const [gymList, setGymList] = useState([])

  // 記錄選中的場館
  const [gymName, setGymName] = useState('')

  const [position, setPosition] = useState(
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29457.720277696328!2d120.28803630000002!3d22.645769849999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e05acb0d030a1%3A0xeaf475aece122885!2z56Kz5L2Q6bq76YeM6auY6ZuE576O6KGT6aSo5bqX!5e0!3m2!1szh-TW!2stw!4v1712886618960!5m2!1szh-TW!2stw'
  )

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
  console.log('classInfo', classInfo)

  // 抓 該城市中的所有場館
  useEffect(() => {
    const url = `${API_SERVER}/class/city?city=${city}`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setGymList(data)
      })
  }, [city])

  return (
    <>
      <Head>
        <title>課程介紹</title>
      </Head>
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
                <div className={style['filter-container']}>
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    defaultValue="0"
                    onChange={(e) => {
                      setCity(e.target.value)
                    }}
                  >
                    <option value="0" disabled>
                      請選擇區域
                    </option>
                    <option value="臺北市">臺北市</option>
                    <option value="新北市">新北市</option>
                    <option value="臺中市">臺中市</option>
                    <option value="臺南市">臺南市</option>
                    <option value="高雄市">高雄市</option>
                  </select>
                </div>
                <div className={style['filter-container']}>
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    defaultValue="0"
                    disabled={!gymList ? true : false}
                    onChange={(e) => {
                      if (e.target.value !== '0') setGymName(e.target.value)
                    }}
                  >
                    <option value="0" disabled>
                      請選擇場館
                    </option>
                    {!city ? (
                      <></>
                    ) : (
                      gymList.map((v, i) => {
                        return (
                          <option key={i} value={v.gym_name}>
                            {v.gym_name}
                          </option>
                        )
                      })
                    )}
                  </select>
                </div>
              </div>
              <div className={style['search-btn']}>
                <Link
                  href={{
                    pathname: '/class',
                    query: {
                      tab: 'right',
                      date: '2024-05-07',
                      city: city,
                      gym_name: gymName,
                      class_type_schedule: classInfo.class_type,
                      class_name: classInfo.class_name,
                    },
                  }}
                  className={style['search']}
                >
                  {/* ?tab=right&date=2024-05-07&city=臺北市&gym_name=健身工廠+台北信義&class_type_schedule=靜態課程&class_name=基礎瑜珈 */}
                  <FaMagnifyingGlass />
                </Link>
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
