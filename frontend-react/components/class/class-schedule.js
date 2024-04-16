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
import { useDraggable } from 'react-use-draggable-scroll'

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

  // 參與人數資料
  const [participantData, setParticipantData] = useState({
    class_schedule_id: 0,
    max_participant: 0,
    current_participant: 0,
    message: '',
  })

  // 取得要拖曳滾動的元素參照 會出錯QQ
  const dragScrollRef = useRef()
  // const { events } = useDraggable(dragScrollRef)

  // 取得section參照
  const sectionRef2 = useRef(null)

  // state 控制 課表是否要出現
  const [show, setShow] = useState(false)

  // 控制預約頁面是否要出現
  const [popClassBook, setPopClassBook] = useState(false)

  // 預約頁面的資料呈現
  const [bookInfo, setBookInfo] = useState({})

  //當tab跟 show改變時，設定container高度 為當前section(右側section)的高度
  useEffect(() => {
    console.log('right-height:', sectionRef2.current.clientHeight)

    tab === 'right'
      ? setContainerHeight(sectionRef2.current.clientHeight + 50)
      : () => {}
  }, [tab, show, router.query, scheduleData]) // show 要同時設定高度

  // 取得課表資料
  const getScheduleData = async (
    signal,
    date = router.query.date || dayjs().format('YYYY-MM-DD'),
    gym_name = router.query.gym_name || undefined
  ) => {
    const url = `${API_SERVER}/class/schedule?date=${date}&gym_name=${gym_name}`

    // 開始fetch
    try {
      const r = await fetch(url, signal)
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
  }, [router.query, router.isReady])

  // 抓到資料後 就顯示下方課表 並產出比對用的陣列
  useEffect(() => {
    if (scheduleData && scheduleData.gotData) {
      setShow(true)
    }
  }, [scheduleData, router])

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
              href="?date=2024-04-30&gym_name=賽特體適能"
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
                            setParticipantData={setParticipantData}
                            participantData={participantData}
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
          participantData={participantData}
        />
      </section>
    </ScrollSync>
  )
}
