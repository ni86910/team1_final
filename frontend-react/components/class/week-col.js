import { useRef, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import style from '@/styles/class-week-col.module.scss'

export default function WeekCol({
  scheduleData,
  i,
  setEachDayBoxes,
  eachDayBoxes,
}) {
  // 取得單周colum的參照
  const weekRef = useRef()

  // 記錄單周colum的子元素數量
  const [boxesCount, setBoxesCount] = useState(0)
  useEffect(() => {
    const newCount = weekRef.current.childNodes.length
    setBoxesCount(newCount)
  }, [])

  // 把每周的子元素數量 存成陣列
  useEffect(() => {
    const nextArray = [...eachDayBoxes]
    // setEachDayBoxes([...nextArray, boxesCount])
    setEachDayBoxes((prevBoxes) => [...prevBoxes, boxesCount])
  }, [boxesCount])

  return (
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
            </div>
          )
        }
      })}

      {/* 在這裡補生 有缺的格子 */}
      {
        <div className={style['class-box']} style={{ position: 'relative' }}>
          <p>扣除此空白格子，此欄共有{boxesCount - 1}個格子</p>
        </div>
      }
    </div>
  )
}
