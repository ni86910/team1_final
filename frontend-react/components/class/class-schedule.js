import { useRef, useEffect, useState } from 'react'
import style from '@/styles/class-schedule.module.scss'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'

import {
  FaAngleLeft,
  FaAngleRight,
  FaSquareFull,
  FaMagnifyingGlass,
  FaBrush,
} from 'react-icons/fa6'
import { API_SERVER } from '@/configs'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import { useRouter } from 'next/router'
import Link from 'next/link'
import WeekCol from './week-col'
import ClassBook from './class-book'
import { useClassFav } from '@/context/class-fav-context'
import Head from 'next/head'
import Swal from 'sweetalert2'

export default function ClassSchedule({ setContainerHeight, tab }) {
  dayjs.extend(weekday)
  const router = useRouter()

  const classList = {
    靜態課程: [
      '基礎瑜珈',
      '正位瑜珈',
      '串聯瑜珈',
      '伸展瑜珈',
      '和緩瑜珈',
      '舒緩瑜珈',
      '阿斯坦加瑜珈',
      '哈達瑜珈',
      '流動瑜珈',
      '陰陽瑜珈',
      '舒活瑜珈',
      '順位瑜珈',
      '瑜珈提斯',
      '療癒瑜珈',
    ],
    飛輪課程: [
      'EOXi',
      'E-Cycle-基礎課程',
      'E-Cycle-耐力循環',
      'E-Cycle-間歇循環',
    ],
    心肺訓練課程: [
      'PILOXING',
      '皮瑜塑身',
      '基礎有氧',
      '爵士有氧',
      '混合有氧',
      '活力有氧',
      '舞動有氧',
      '歐式有氧',
      '基礎階梯',
      '運動節奏訓練',
      '高低衝擊有氧',
    ],
    舞蹈課程: [
      'ZUMBA',
      '爵士放克',
      '美式嘻哈',
      '嘻哈放克',
      '流行爵士',
      '自由舞蹈',
      '熱舞派對',
      '韓風MV舞蹈',
    ],
    radical課程: ['活力躍蹦', '極限戰鬥', '勁量槓鈴'],
  }

  // 沒選城市或場館的警告
  const gymCityAlert = () => {
    Swal.fire({
      title: '請先選擇區域及場館',
      confirmButtonColor: '#EB6234',
      icon: 'warning',
    })
  }

  const { toggleBtn, setToggleBtn } = useClassFav()
  // state 接收課表資料
  const [scheduleData, setScheduleData] = useState({
    mondayOfTheWeek: '',
    sundayOfTheWeek: '',
    gymName: '',
    year: '',
    month: '',
    dateNumberArray: [],
    gotData: false,
    rows: [],
  })

  // 參與人數資料
  const [participantData, setParticipantData] = useState({
    class_schedule_id: 0,
    max_participant: 0,
    current_participant: 0,
    message: '',
  })

  // 紀錄目前選擇的縣市
  const [city, setCity] = useState('')

  // 紀錄該縣市裡面有的場館
  const [gymList, setGymList] = useState([])

  // 記錄選中的場館
  const [gymName, setGymName] = useState(router.query.gym_name || '')

  // 取得section參照
  const sectionRef2 = useRef(null)

  // state 控制 課表是否要出現
  const [show, setShow] = useState(false)

  // 控制預約頁面是否要出現
  const [popClassBook, setPopClassBook] = useState(false)

  // 預約頁面的資料呈現
  const [bookInfo, setBookInfo] = useState({})

  // 控制第二層選單的課程類別
  const [classTypeSchedule, setClassTypeSchedule] = useState(0)

  //控制第二層選單的課程名稱
  const [className, setClassName] = useState(0)
  //當tab跟 show改變時，設定container高度 為當前section(右側section)的高度
  useEffect(() => {
    console.log('right-height:', sectionRef2.current.clientHeight)
    tab === 'right'
      ? setContainerHeight(sectionRef2.current.clientHeight + 50)
      : () => {}
  }, [tab, show, scheduleData]) // show 要同時設定高度

  // 取得課表資料
  const getScheduleData = async (
    signal,
    date = router.query.date || dayjs().format('YYYY-MM-DD'),
    gym_name = router.query.gym_name || ''
  ) => {
    const class_type_schedule = router.query.class_type_schedule || ''
    const class_name = router.query.class_name || ''
    const teacher_name = router.query.teacher_name || ''

    const url = `${API_SERVER}/class/schedule?date=${date}&gym_name=${gym_name}&class_type_schedule = ${class_type_schedule}&class_name=${class_name}&teacher_name=${teacher_name}`

    const url2 = `${API_SERVER}/class/schedule${location.search}`

    // 開始fetch
    try {
      const r = await fetch(url2, signal)
      const data = await r.json()
      // 這裡拿到的是物件
      if (typeof data === 'object' && data) {
        setScheduleData(data)

        // 有從後端拿到資料，則顯示下方課表
        if (scheduleData) {
          setShow(true)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 查詢字串有更動，就去抓課表資料
  useEffect(() => {
    const controller = new AbortController() // 取消的控制器
    const signal = controller.signal

    if (router.isReady && router.query) {
      getScheduleData(signal).then((result) => {
        console.log('router.query物件:', router.query)
      })
    }
    return () => {
      controller.abort() // 取消未完成的 ajax
    }
  }, [router.query, router.isReady, router])

  // 抓到資料後 就顯示下方課表
  useEffect(() => {
    if (scheduleData && scheduleData.gotData) {
      setShow(true)
    }
  }, [scheduleData, router.isReady, router])

  // 抓 該城市中的所有場館
  useEffect(() => {
    const url = `${API_SERVER}/class/city?city=${city}`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setGymList(data)
      })
  }, [city])

  /* AbortController範例 避免連續發fetch 回來時間不一定
  useEffect(() => {
    if (!router.isReady) return;
    const controller = new AbortController(); // 取消的控制器
    const signal = controller.signal;

    console.log({ "location.search": location.search });
    fetch(`${AB_LIST}${location.search}`, {
      signal,
      headers: { ...getAuthHeader() },
    })
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        setListData(result);
      })
      .catch((ex) => {
        // 用戶取消時會發生 exception
        console.log({ ex });
      });

    return () => {
      controller.abort(); // 取消未完成的 ajax
    };
  }, [router, render, auth]);
  */

  console.log('後端抓到的資料:', scheduleData)
  console.log('gymList', gymList)
  console.log('router.query', router.query)
  return (
    <>
      <Head>
        <title>課程專區</title>
      </Head>
      <ScrollSync>
        <section
          ref={sectionRef2}
          className={
            tab === 'right'
              ? `${style['schedule-section']} ${style['show']}`
              : `${style['schedule-section']} ${style['hide']}`
          }
        >
          <div className={style['schedule-filter']}>
            <div className={style['text']}>
              <h2 className={style['filter-title']}>選擇區域及場館</h2>
            </div>
            <div className={style['filter']}>
              <div className={style['select-group']}>
                <div className={style['filter-container']}>
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    defaultValue="0"
                    value={city}
                    onChange={(e) => {
                      setGymName(0)
                      setCity(e.target.value)
                    }}
                  >
                    <option value="0">請選擇區域</option>
                    <option value="臺北市">臺北市</option>
                    <option value="新北市">新北市</option>
                    <option value="臺中市">臺中市</option>
                    <option value="臺南市">臺南市</option>
                    <option value="高雄市">高雄市</option>
                  </select>
                </div>
                <div className={style['filter-container']}>
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                    defaultValue="0"
                    disabled={!gymList ? true : false}
                    value={gymName}
                    onChange={(e) => {
                      if (e.target.value !== 0) setGymName(e.target.value)
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
              <Link
                href={`?date=2024-05-07&gym_name=${gymName}`}
                className={style['search']}
                scroll={false}
                onClick={(e) => {
                  e.preventDefault()
                  setClassTypeSchedule(0)
                  setClassName(0)
                  if (!gymName || !city) {
                    gymCityAlert()
                  } else {
                    router.push(
                      {
                        query: {
                          ...router.query,
                          date: '2024-05-07',
                          city: city,
                          gym_name: gymName,
                        },
                      },
                      undefined,
                      { scroll: false }
                    )
                  }
                }}
              >
                <FaMagnifyingGlass />
              </Link>
            </div>
          </div>
          {!show || !scheduleData.gymName ? (
            <></>
          ) : (
            <>
              <div className={style['second-filter']}>
                <div className={style['select-group']}>
                  <div className={style['class-category']}>
                    <select
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      defaultValue={0}
                      value={classTypeSchedule}
                      onChange={(e) => {
                        setClassTypeSchedule(e.target.value)
                        setClassName(0)
                        router.push(
                          {
                            query: {
                              ...router.query,
                              class_type_schedule: e.target.value,
                            },
                          },
                          undefined,
                          { scroll: false }
                        )
                      }}
                    >
                      <option value="0" disabled>
                        選擇類別
                      </option>
                      <option value="靜態課程">靜態課程</option>
                      <option value="飛輪課程">飛輪課程</option>
                      <option value="心肺訓練課程">心肺訓練課程</option>
                      <option value="舞蹈課程">舞蹈課程</option>
                      <option value="radical課程">radical課程</option>
                    </select>
                  </div>
                  <div className={style['class-name']}>
                    <select
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      defaultValue="0"
                      value={className}
                      onChange={(e) => {
                        setClassName(e.target.value)
                        router.push(
                          {
                            query: {
                              ...router.query,
                              class_name: e.target.value,
                            },
                          },
                          undefined,
                          { scroll: false }
                        )
                      }}
                    >
                      <option value="0" disabled>
                        選擇課程
                      </option>

                      {!classList[classTypeSchedule] ? (
                        <></>
                      ) : (
                        classList[classTypeSchedule].map((v, i) => {
                          return (
                            <option key={i} value={v}>
                              {v}
                            </option>
                          )
                        })
                      )}
                    </select>
                  </div>
                </div>
                <Link
                  href={`?date=2024-05-07&gym_name=${gymName}`}
                  className={style['clean']}
                  scroll={false}
                  onClick={(e) => {
                    e.preventDefault()
                    setClassTypeSchedule(0)
                    setClassName(0)
                    router.push(
                      {
                        query: {
                          ...router.query,
                          // date: '2024-05-07',
                          class_name: null,
                          class_type_schedule: null,
                        },
                      },
                      undefined,
                      { scroll: false }
                    )
                  }}
                >
                  <FaBrush />
                </Link>
              </div>

              <div className={style['schedule']}>
                <div className={style['list-head']}>
                  <Link
                    href={'/'}
                    className={style['last-week']}
                    onClick={(e) => {
                      e.preventDefault()

                      // 有指定場館，才執行
                      if (router.query.gym_name && router.isReady) {
                        // 獲得上周一的日期
                        const lastMonday = dayjs(
                          scheduleData.mondayOfTheWeek
                        ).subtract(7, 'day')

                        // 要從dayjs物件轉成指定格式字串
                        const lastMondayStr =
                          dayjs(lastMonday).format('YYYY-MM-DD')

                        // 原本的query物件展開 覆蓋新的date上去
                        router.push(
                          {
                            query: { ...router.query, date: lastMondayStr },
                          },
                          undefined,
                          { scroll: false }
                        )
                      }
                    }}
                    scroll={false}
                  >
                    <FaAngleLeft />
                    <span>上一周</span>
                  </Link>
                  <div className={style['list-title']}>
                    <h3>{scheduleData.gymName}</h3>
                    <h3>{`${scheduleData.year} 年 ${scheduleData.month} 月份 課程表`}</h3>
                  </div>
                  <Link
                    href={'/'}
                    className={style['next-week']}
                    onClick={(e) => {
                      e.preventDefault()
                      // 有指定場館，才執行
                      if (router.query.gym_name && router.isReady) {
                        // 重置比較陣列，避免越積越多

                        // 獲得下周一的日期
                        const nextMonday = dayjs(
                          scheduleData.mondayOfTheWeek
                        ).add(7, 'day')

                        // 要從dayjs物件轉成指定格式字串
                        const nextMondayStr =
                          dayjs(nextMonday).format('YYYY-MM-DD')

                        // 原本的query物件展開 覆蓋新的date上去
                        router.push(
                          {
                            query: { ...router.query, date: nextMondayStr },
                          },
                          undefined,
                          { scroll: false }
                        )
                      }
                    }}
                    scroll={false}
                  >
                    <span>下一周</span>
                    <FaAngleRight />
                  </Link>
                </div>
                <div className={style['class-type-group']}>
                  <div
                    className={`${style['class-type']} ${style['class-type-a']}`}
                  >
                    <FaSquareFull />
                    <span>已額滿</span>
                  </div>
                  <div
                    className={`${style['class-type']} ${style['class-type-b']}`}
                  >
                    <FaSquareFull />
                    <span>已過期</span>
                  </div>
                </div>
                <ScrollSyncPane>
                  <div
                    className={`${style['one-week']} ${style['scrollbar']}`}
                    // {...events}
                    // ref={dragScrollRef}
                  >
                    <ul className={style['week-ul']}>
                      <li className={style['week-li']}>
                        <div className={style['date']}>
                          {scheduleData.dateNumberArray[0]}
                        </div>
                        <div className={style['week']}>星期一</div>
                      </li>
                      <li className={style['week-li']}>
                        <div className={style['date']}>
                          {scheduleData.dateNumberArray[1]}
                        </div>
                        <div className={style['week']}>星期二</div>
                      </li>
                      <li className={style['week-li']}>
                        <div className={style['date']}>
                          {scheduleData.dateNumberArray[2]}
                        </div>
                        <div className={style['week']}>星期三</div>
                      </li>
                      <li className={style['week-li']}>
                        <div className={style['date']}>
                          {scheduleData.dateNumberArray[3]}
                        </div>
                        <div className={style['week']}>星期四</div>
                      </li>
                      <li className={style['week-li']}>
                        <div className={style['date']}>
                          {scheduleData.dateNumberArray[4]}
                        </div>
                        <div className={style['week']}>星期五</div>
                      </li>
                      <li
                        className={`${style['week-li']} ${style['weekend-li']}`}
                      >
                        <div className={style['date']}>
                          {scheduleData.dateNumberArray[5]}
                        </div>
                        <div className={style['week']}>星期六</div>
                      </li>
                      <li
                        className={`${style['week-li']} ${style['weekend-li']}`}
                      >
                        <div className={style['date']}>
                          {scheduleData.dateNumberArray[6]}
                        </div>
                        <div className={style['week']}>星期日</div>
                      </li>
                    </ul>
                  </div>
                </ScrollSyncPane>
                <ScrollSyncPane>
                  <div
                    className={`${style['every-day-chart']} ${style['scrollbar']}`}
                  >
                    {/* 沒拿到任何課程資料 就顯示安排中 */}
                    {!scheduleData.gotData ? (
                      <div className={style['no-class']}>課程安排中...</div>
                    ) : (
                      <div className={style['class-box-list']}>
                        {/* 第一個map 一周七天 建立1個直排*7次 */}
                        {Array(7)
                          .fill(1)
                          .map((v, i) => {
                            return (
                              <WeekCol
                                key={i}
                                scheduleData={scheduleData}
                                i={i}
                                setPopClassBook={setPopClassBook}
                                setBookInfo={setBookInfo}
                                bookInfo={bookInfo}
                                setParticipantData={setParticipantData}
                                participantData={participantData}
                              />
                            )
                          })}
                      </div>
                    )}
                  </div>
                </ScrollSyncPane>
              </div>
            </>
          )}
          <ClassBook
            popClassBook={popClassBook}
            setPopClassBook={setPopClassBook}
            scheduleData={scheduleData}
            bookInfo={bookInfo}
            participantData={participantData}
          />
        </section>
      </ScrollSync>
    </>
  )
}
