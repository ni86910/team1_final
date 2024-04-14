import { useRef, useEffect, useState } from 'react'
import style from '@/styles/class-schedule.module.scss'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'
import {
  FaCaretDown,
  FaAngleLeft,
  FaAngleRight,
  FaSquareFull,
  FaSearch,
} from 'react-icons/fa'
import { API_SERVER } from '@/configs'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import { useRouter } from 'next/router'
import Link from 'next/link'
import WeekCol from './week-col'
import ClassBook from './class-book'

export default function ClassSchedule({ setContainerHeight, tab }) {
  dayjs.extend(weekday)
  const router = useRouter()
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

  // state 控制 課表是否要出現
  const [show, setShow] = useState(false)

  // 取得section參照
  const sectionRef2 = useRef(null)

  // 用陣列紀錄每一天的格子數
  const [eachDayBoxes, setEachDayBoxes] = useState([])

  // 紀錄一周七天中 最多格子那天 的格子數量
  const [maxCount, setMaxCount] = useState(0)

  // 控制預約頁面是否要出現
  const [popClassBook, setPopClassBook] = useState(false)

  // 控制預約頁面的資料呈現
  const [bookInfo, setBookInfo] = useState({})

  // 紀錄還要產生多少空白boxes
  const [extraBoxesCount, setExtraBoxesCount] = useState(0)

  useEffect(() => {
    console.log('記錄每一天的格子數:', eachDayBoxes)
  }, [eachDayBoxes])

  //當tab跟 show改變時，設定container高度 為當前section(右側section)的高度
  useEffect(() => {
    console.log('right-height:', sectionRef2.current.clientHeight)

    tab === 'right'
      ? setContainerHeight(sectionRef2.current.clientHeight + 50)
      : () => {}
  }, [tab, show, router.query, scheduleData]) // show 要同時設定高度

  // 取得課表資料
  const getScheduleData = async (
    date = router.query.date || dayjs().format('YYYY-MM-DD'),
    gym_name = router.query.gym_name || undefined
  ) => {
    const url = `${API_SERVER}/class/schedule?date=${date}&gym_name=${gym_name}`

    // 開始fetch
    try {
      const r = await fetch(url)
      const data = await r.json()
      // 這裡拿到的是物件
      if (typeof data === 'object' && data) {
        setScheduleData(data)

        // 有從後端拿到資料，則顯示下方課表
        if (scheduleData.gotData) {
          setShow(true)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 查詢字串有更動，就去抓課表資料
  useEffect(() => {
    if (router.isReady && router.query) {
      getScheduleData()
      console.log('後端抓到的資料:', scheduleData)
      console.log('router.query物件:', router.query)
    }
  }, [router.query, router.isReady])

  // 抓到資料後 就顯示下方課表 並產出比對用的陣列
  useEffect(() => {
    if (scheduleData && scheduleData.gotData) {
      setShow(true)
    }
  }, [scheduleData])

  useEffect(() => {
    let i
    let max = eachDayBoxes[0]
    for (i = 0; i < eachDayBoxes.length; i++) {
      if (eachDayBoxes[i] > max) {
        max = eachDayBoxes[i]
      }
    }
    setMaxCount(max)
    console.log('每一天最多課程數:', max)
  }, [eachDayBoxes])

  return (
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
              <div className={style['filter-city']}>
                <span>高雄市</span>
                <FaCaretDown />
              </div>
              <div className={style['filter-store']}>
                <span>高雄鳳山館</span>
                <FaCaretDown />
              </div>
            </div>
            <Link
              href="?date=2024-04-09&gym_name=賽特體適能"
              className={style['search']}
              scroll={false}
            >
              <FaSearch />
            </Link>
          </div>
        </div>
        {!show ? (
          <div>請先選擇地點</div>
        ) : (
          <>
            <div className={style['second-filter']}>
              <div className={style['select-group']}>
                <div className={style['class-category']}>
                  <span>所有類別</span>
                  <FaCaretDown />
                </div>
                <div className={style['class-name']}>
                  <span>選擇課程</span>
                  <FaCaretDown />
                </div>
                <div className={style['class-teacher']}>
                  <span>所有老師</span>
                  <FaCaretDown />
                </div>
              </div>
            </div>

            <div className={style['schedule']}>
              <div className={style['list-head']}>
                <Link
                  href={'/'}
                  className={style['last-week']}
                  onClick={(e) => {
                    e.preventDefault()
                    // 重置比較陣列，避免越積越多
                    setEachDayBoxes([])

                    // 重置空格子數量
                    setExtraBoxesCount(0)

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
                      setEachDayBoxes([])

                      // 重置空格子數量
                      setExtraBoxesCount(0)

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
                <div className={`${style['one-week']} ${style['scrollbar']}`}>
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
                            eachDayBoxes={eachDayBoxes}
                            setEachDayBoxes={setEachDayBoxes}
                            maxCount={maxCount}
                            setPopClassBook={setPopClassBook}
                            setBookInfo={setBookInfo}
                            extraBoxesCount={extraBoxesCount}
                            setExtraBoxesCount={setExtraBoxesCount}
                          />
                        )
                      })}
                  </div>
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
        />
      </section>
    </ScrollSync>
  )
}
