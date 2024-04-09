import { useRef } from 'react'
import dayjs from 'dayjs'
import style from '@/styles/class-week-col.module.scss'

export default function WeekCol({ scheduleData, i }) {
  const weekRef = useRef()
  return (
    <div ref={weekRef} className={`${style['week-day']}`}>
      {/* 第二個map 每一直排再去生課程方塊 */}
      {scheduleData.rows.map((v2, i2) => {
        {
          /* classDay 開課時間是"幾號" 並加到比較陣列aa中 */
        }
        const boxesCount = weekRef.current.childNodes.length
        const classDay = dayjs(v2.start_time).format('DD')

        {
          /* aa.push(classDay) */
        }

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
            <div key={i2} className={style['class-box']}>
              <div className={style['class-box-top']}>
                <span>{v2.class_name}</span>
                <br />
                <span>{`${startH}:00-${endH}:00`}</span>
              </div>
              <div className={style['class-box-bottom']}>
                <span>001號教室</span>
                <br />
                <span>{v2.t_name}</span>
              </div>
              <p>{boxesCount}</p>
            </div>
          )
        }
      })}
      {/*空格子 範例 <div className={style['class-box']}></div> */}
      {/* 在這裡補生 有缺的格子 */}

      {<div className={style['class-box']}></div>}
    </div>
  )
}
