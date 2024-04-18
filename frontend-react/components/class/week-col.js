import { useRef, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import style from '@/styles/class-week-col.module.scss'
import { useRouter } from 'next/router'
import { API_SERVER } from '@/configs'

export default function WeekCol({
  scheduleData,
  i,
  setPopClassBook,
  setBookInfo,
  setParticipantData,
  participantData,
}) {
  const router = useRouter()
  // 取得單周colum的參照
  const weekRef = useRef()

  // 抓參與人數
  const getMaxParticipant = async (scheduleId) => {
    const url = `${API_SERVER}/class/book/${scheduleId}`
    try {
      const r = await fetch(url)
      const data = await r.json()
      setParticipantData(data)
      console.log(participantData)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div ref={weekRef} className={`${style['week-day']}`}>
        {/* 第二個map 每一直排再去生課程方塊 */}
        {scheduleData.rows.map((v2, i2) => {
          {
            /* classDay 開課時間是"幾號" */
          }
          const classDay = dayjs(v2.start_time).format('DD')
          {
            /* 若開課日跟 一周陣列的對應值相等 則return一個格子 */
          }
          if (classDay === scheduleData.dateNumberArray[i]) {
            {
              /* 開課 跟結束時間 */
            }
            const startH = dayjs(v2.start_time).format('HH')
            const endH = dayjs(v2.end_time).format('HH')

            return (
              <div
                key={i2}
                className={style['class-box']}
                role="presentation"
                onClick={() => {
                  setPopClassBook(true)
                  setBookInfo(v2)
                  getMaxParticipant(v2.class_schedule_id)
                }}
              >
                <div className={style['class-box-top']}>
                  <span>{v2.class_name}</span>
                  <br />
                  <span>{`${startH}:00-${endH}:00`}</span>
                </div>
                <div className={style['class-box-bottom']}>
                  <span>001號教室</span>
                  <br />
                  <span>{v2.teacher_name}</span>
                </div>
              </div>
            )
          }
        })}

        {/* 在這裡補生 有缺的格子 */}
      </div>
      <div className={style['background-col']} style={{ left: `${i * 205}px` }}>
        <div className={style['background-box']}></div>
        <div className={style['background-box']}></div>
        <div className={style['background-box']}></div>
        <div className={style['background-box']}></div>
        <div className={style['background-box']}></div>
        <div className={style['background-box']}></div>
        <div className={style['background-box']}></div>
        <div className={style['background-box']}></div>
        <div className={style['background-box']}></div>
        <div className={style['background-box']}></div>
        <div className={style['background-box']}></div>
        <div className={style['background-box']}></div>
      </div>
    </>
  )
}
