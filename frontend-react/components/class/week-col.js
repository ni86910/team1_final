import { useRef, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import style from '@/styles/class-week-col.module.scss'

export default function WeekCol({
  scheduleData,
  i,
  setEachDayBoxes,
  eachDayBoxes,
  maxCount,
  setPopClassBook,
  setBookInfo,
}) {
  // 取得單周colum的參照
  const weekRef = useRef()

  // 記錄單周colum的子元素數量
  const [boxesCount, setBoxesCount] = useState(0)

  // 紀錄還要產生多少空白boxes
  const [extraBoxesCount, setExtraBoxesCount] = useState(0)

  // 更新單周colum的子元素數量
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

  // 更新extraBoxesCount
  useEffect(() => {
    let result = maxCount - boxesCount

    // result有時會是NaN因此要排除一下
    if (!result) {
      result = 0
    }
    setExtraBoxesCount(result)
    console.log('額外box數量', extraBoxesCount, typeof extraBoxesCount)
  }, [maxCount])

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
            <div
              key={i2}
              className={style['class-box']}
              role="presentation"
              onClick={() => {
                setPopClassBook(true)
                setBookInfo(v2)
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
                <span>{v2.t_name}</span>
              </div>
            </div>
          )
        }
      })}

      {/* 在這裡補生 有缺的格子 */}
      {extraBoxesCount < 0 ? (
        <></>
      ) : (
        Array(extraBoxesCount)
          .fill(1)
          .map((v, i) => {
            return (
              <div
                key={i}
                className={style['class-box-empty']}
                style={{ position: 'relative' }}
              >
                <p>{extraBoxesCount}</p>
              </div>
            )
          })
      )}
    </div>
  )
}
