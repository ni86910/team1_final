import { useRef, useEffect } from 'react'
import style from '@/styles/class-schedule.module.scss'
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync'
import {
  FaCaretDown,
  FaAngleLeft,
  FaAngleRight,
  FaSquareFull,
  FaSearch,
} from 'react-icons/fa'

export default function ClassSchedule({ setContainerHeight, tab }) {
  // 取得section參照
  const sectionRef2 = useRef(null)

  //當tab改變時，設定container高度 為當前section(右側section)的高度
  useEffect(() => {
    console.log('right-height:', sectionRef2.current.clientHeight)

    tab === 'right'
      ? setContainerHeight(sectionRef2.current.clientHeight + 'px')
      : () => {}
  }, [tab])

  return (
    <ScrollSync>
      <section
        ref={sectionRef2}
        className={
          tab === 'right'
            ? `${style['schedule-section']} ${style['show']}`
            : `${style['schedule-section']} ${style['hide']}`
        }
        // style={{
        //   left: tab === 'right' ? '0%' : `100%`,
        //   // display: tab === 'right' ? 'flex' : `none`,
        // }}
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
            <a href="#" className={style['search']}>
              <FaSearch />
            </a>
          </div>
        </div>
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
            <div className={style['last-week']}>
              <FaAngleLeft />
              <span>上一周</span>
            </div>
            <div className={style['list-title']}>
              <h3>XX場館</h3>
              <h3>113 年 3 月份 課程表</h3>
            </div>
            <div className={style['next-week']}>
              <span>下一周</span>
              <FaAngleRight />
            </div>
          </div>
          <div className={style['class-type-group']}>
            <div className={`${style['class-type']} ${style['class-type-a']}`}>
              <FaSquareFull />
              <span>進階課程</span>
            </div>
            <div className={`${style['class-type']} ${style['class-type-b']}`}>
              <FaSquareFull />
              <span>營養師課程</span>
            </div>
          </div>
          <ScrollSyncPane>
            <div className={`${style['one-week']} ${style['scrollbar']}`}>
              <ul className={style['week-ul']}>
                <li className={style['week-li']}>
                  <div className={style['date']}>04</div>
                  <div className={style['week']}>星期一</div>
                </li>
                <li className={style['week-li']}>
                  <div className={style['date']}>05</div>
                  <div className={style['week']}>星期二</div>
                </li>
                <li className={style['week-li']}>
                  <div className={style['date']}>06</div>
                  <div className={style['week']}>星期三</div>
                </li>
                <li className={style['week-li']}>
                  <div className={style['date']}>07</div>
                  <div className={style['week']}>星期四</div>
                </li>
                <li className={style['week-li']}>
                  <div className={style['date']}>08</div>
                  <div className={style['week']}>星期五</div>
                </li>
                <li className={`${style['week-li']} ${style['weekend-li']}`}>
                  <div className={style['date']}>09</div>
                  <div className={style['week']}>星期六</div>
                </li>
                <li className={`${style['week-li']} ${style['weekend-li']}`}>
                  <div className={style['date']}>10</div>
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
                <div className={`${style['week-day']} ${style['monday']}`}>
                  <div className={`${style['class-box']} ${style['type-a']}`}>
                    <div className={style['class-box-top']}>
                      <span>活力有氧</span>
                      <br />
                      <span>09:00-10:00</span>
                    </div>
                    <div className={style['class-box-bottom']}>
                      <span>001號教室</span>
                      <br />
                      <span>Alex</span>
                    </div>
                  </div>
                  <div className={style['class-box']}>
                    <div className={style['class-box-top']}>
                      <span>活力有氧</span>
                      <br />
                      <span>09:00-10:00</span>
                    </div>
                    <div className={style['class-box-bottom']}>
                      <span>001號教室</span>
                      <br />
                      <span>Alex</span>
                    </div>
                  </div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                </div>
                <div className={`${style['week-day']} ${style['tuesday']}`}>
                  <div className={style['class-box']}>
                    <div className={style['class-box-top']}>
                      <span>活力有氧</span>
                      <br />
                      <span>09:00-10:00</span>
                    </div>
                    <div className={style['class-box-bottom']}>
                      <span>001號教室</span>
                      <br />
                      <span>Alex</span>
                    </div>
                  </div>
                  <div className={`${style['class-box']} ${style['type-b']}`}>
                    <div className={style['class-box-top']}>
                      <span>活力有氧</span>
                      <br />
                      <span>09:00-10:00</span>
                    </div>
                    <div className={style['class-box-bottom']}>
                      <span>001號教室</span>
                      <br />
                      <span>Alex</span>
                    </div>
                  </div>
                  <div
                    className={`${style['class-box']} ${style['type-a']}`}
                  ></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                </div>
                <div className={`${style['week-day']} ${style['wednesday']}`}>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div
                    className={`${style['class-box']} ${style['type-b']}`}
                  ></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                </div>
                <div className={`${style['week-day']} ${style['thursday']}`}>
                  <div className={style['class-box ']}></div>
                  <div className={style['class-box']}></div>
                  <div
                    className={`${style['class-box']} ${style['type-a']}`}
                  ></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                </div>
                <div className={`${style['week-day']} ${style['friday']}`}>
                  <div
                    className={`${style['class-box']} ${style['type-b']}`}
                  ></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                </div>
                <div className={`${style['week-day']} ${style['saturday']}`}>
                  <div className={style['class-box']}></div>
                  <div
                    className={`${style['class-box']} ${style['type-a']}`}
                  ></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                </div>
                <div className={`${style['week-day']} ${style['sunday']}`}>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div
                    className={`${style['class-box']} ${style['type-b']}`}
                  ></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                  <div className={style['class-box']}></div>
                </div>
              </div>
            </div>
          </ScrollSyncPane>
        </div>
      </section>
    </ScrollSync>
  )
}
